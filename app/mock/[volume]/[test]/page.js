"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { rawConfig, getAllArticles, buildVolumeSets } from "../../../home-page";
import { modifyIframeContent } from "../../../utils/iframe-modifier";

function formatTime(totalSeconds) {
  const abs = Math.abs(totalSeconds);
  const m = String(Math.floor(abs / 60)).padStart(2, "0");
  const s = String(abs % 60).padStart(2, "0");
  return `${m}:${s}`;
}

export default function MockPage({ params }) {
  const router = useRouter();
  const [volumes, setVolumes] = useState([]);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [resultMode, setResultMode] = useState(false);
  const [results, setResults] = useState({
    score: 0,
    total: 0,
    details: [],
    elapsed: 0
  });
  const [seconds, setSeconds] = useState(0);
  const [showTimer, setShowTimer] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [rightTab, setRightTab] = useState('sheet'); // 'sheet', 'analysis'
  const [sheetPart, setSheetPart] = useState(1);
  const [partQuestions, setPartQuestions] = useState({ 0: [], 1: [], 2: [] });
  const [questionStatus, setQuestionStatus] = useState({});
  const [attemptKey, setAttemptKey] = useState(0);
  const draftRef = useRef(null);

  const volumeIndex = Number(params.volume || "0");
  const testIndex = Number(params.test || "0");

  const storageKeyBase = `mock_${volumeIndex}_${testIndex}`;

  function handleScrollToQuestion(qid) {
      // Find which part contains this question
      let targetPart = -1;
      for (const [pIndex, qIds] of Object.entries(partQuestions)) {
          if (qIds.includes(qid)) {
              targetPart = Number(pIndex);
              break;
          }
      }

      if (targetPart !== -1) {
          if (currentPartIndex !== targetPart) {
              setCurrentPartIndex(targetPart);
          }
          const frame = document.getElementById(`iframe-part-${targetPart}`);
          if (frame && frame.contentWindow) {
              frame.contentWindow.postMessage({
                  type: 'IELTS_PARENT_ACTION',
                  subType: 'SCROLL_TO_QUESTION',
                  payload: qid
              }, '*');
          }
      }
  }

  useEffect(() => {
      function handleMessage(e) {
          if (!e.data || !e.data.type || e.data.type !== 'IELTS_TEST_UPDATE') return;
          const { subType, payload } = e.data;
          
          if (subType === 'ANSWER_UPDATE') {
              setQuestionStatus(prev => ({
                  ...prev,
                  [payload.id]: { ...prev[payload.id], answered: payload.hasAnswer }
              }));
      } else if (subType === 'MARKER_UPDATE') {
              setQuestionStatus(prev => ({
                  ...prev,
                  [payload.id]: { ...(prev[payload.id] || {}), marked: payload.marked }
              }));
          } else if (subType === 'INIT_QUESTIONS') {
               // Find which part sent this
               let pIndex = -1;
               for(let i=0; i<3; i++) {
                   const frame = document.getElementById(`iframe-part-${i}`);
                   if (frame && frame.contentWindow === e.source) {
                       pIndex = i;
                       break;
                   }
               }

               if (pIndex !== -1) {
                   setPartQuestions(prev => ({
                       ...prev,
                       [pIndex]: payload
                   }));
               }

               setQuestionStatus(prev => {
                   const next = { ...prev };
                   payload.forEach(qid => {
                       if (!next[qid]) next[qid] = { ...next[qid], answered: false, marked: false };
                   });
                   return next;
               });
          }
      }
      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.performance) {
      const navigation = window.performance.getEntriesByType('navigation')[0];
      if (navigation && navigation.type === 'reload') {
        router.replace('/');
        return;
      }
    }

    const items = getAllArticles(rawConfig);
    const v = buildVolumeSets(items);

    // Initial State Resolution
    // 1. Clear any "ghost" answers from localStorage (PAPER_ID_answers) to ensure
    //    we only load what is explicitly in Draft or History.
    const thisSet = v[volumeIndex]?.[testIndex] || [];
    thisSet.forEach(article => {
        if (article.id) {
            try {
                window.localStorage.removeItem(article.id + "_answers");
            } catch(e) {}
        }
    });

    // 2. Check for Draft
    let foundDraft = false;
    try {
      const saved = window.localStorage.getItem(storageKeyBase + "_draft");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed) {
            draftRef.current = parsed;
            if (typeof parsed.seconds === "number") {
              setSeconds(parsed.seconds);
            }
            foundDraft = true;
        }
      }
    } catch (e) {}

    // 3. If no Draft, check for History (Review Mode)
    if (!foundDraft) {
        try {
            const savedHistory = window.localStorage.getItem(storageKeyBase + "_history");
            if (savedHistory) {
                const parsedHist = JSON.parse(savedHistory);
                if (parsedHist) {
                    setResults({
                        score: parsedHist.score || 0,
                        total: parsedHist.total || 0,
                        details: parsedHist.details || [],
                        elapsed: parsedHist.elapsed || 0
                    });
                    setResultMode(true);
                    setRightTab('sheet');
                }
            }
        } catch(e) {}
    }

    setVolumes(v);
  }, []);

  useEffect(() => {
    if (resultMode || isPaused) return;
    const id = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [resultMode, isPaused]);

  const currentSet = useMemo(() => {
    if (
      volumeIndex < 0 ||
      volumeIndex >= volumes.length ||
      !Array.isArray(volumes[volumeIndex])
    ) {
      return [];
    }
    const v = volumes[volumeIndex];
    if (testIndex < 0 || testIndex >= v.length) return [];
    return v[testIndex];
  }, [volumes, volumeIndex, testIndex]);

  // Ensure fresh start if no draft exists
  useEffect(() => {
      if (currentSet.length > 0 && !draftRef.current) {
          // No draft found, clear any potential lingering answers from single practice
          currentSet.forEach(article => {
              if (article.id) {
                  try {
                      window.localStorage.removeItem(article.id + "_answers");
                  } catch(e) {}
              }
          });
      }
  }, [currentSet]);

  const remaining = 60 * 60 - seconds;
  const isOvertime = remaining < 0;

  function handleIframeLoad(e) {
    if (!e.target || !e.target.contentWindow) return;
    const win = e.target.contentWindow;
    modifyIframeContent(win);
    
    if (resultMode) {
        // In result mode, we need to re-apply user answers AND inline results
        // Reconstruct user answers map from results.details
        if (results.details && results.details.length > 0) {
            const userMap = {};
            const resForThisPart = [];
            
            // Need to know which part this iframe corresponds to.
            // ID is iframe-part-{index}
            const frameId = e.target.id;
            const partIndex = parseInt(frameId.replace('iframe-part-', ''), 10);
            
            if (!isNaN(partIndex)) {
                 results.details.forEach(d => {
                     if (d.part === partIndex + 1) {
                         userMap[d.qKey] = d.userAns;
                         resForThisPart.push({
                             id: d.qKey,
                             userAns: d.userAns,
                             correctAns: d.correctAns,
                             isCorrect: d.isCorrect
                         });
                     }
                 });
                 
                 if (typeof win.applyUserAnswers === "function") {
                     try { win.applyUserAnswers(userMap); } catch(err) {}
                 }
                 if (typeof win.applyInlineResults === "function") {
                     try { setTimeout(() => win.applyInlineResults(resForThisPart), 100); } catch(err) {}
                 }
            }
        }
    } else if (draftRef.current && draftRef.current.answers && typeof win.applyUserAnswers === "function") {
      try {
        win.applyUserAnswers(draftRef.current.answers);
      } catch (err) {}
    } else {
      try {
        win.postMessage(
          {
            type: "IELTS_PARENT_ACTION",
            subType: "RESET_ALL"
          },
          "*"
        );
      } catch (err) {}
    }
  }

  function handleSubmit() {
    if (!currentSet || currentSet.length === 0) return;

    let totalScore = 0;
    let totalQuestions = 0;
    let allDetails = [];

    currentSet.forEach((article, index) => {
      const iframe = document.getElementById(`iframe-part-${index}`);
      if (!iframe || !iframe.contentWindow) return;
      const win = iframe.contentWindow;

      let userAnswers = {};
      let answerKey = win.answerKey || {};

      if (typeof win.extractUserAnswers === "function") {
        userAnswers = win.extractUserAnswers();
      } else {
        const paperId = win.PAPER_ID || article.id;
        if (paperId) {
             try {
                if (typeof win.saveAnswers === "function") win.saveAnswers();
                userAnswers = JSON.parse(window.localStorage.getItem(`${paperId}_answers`) || "{}");
             } catch (e) {}
        }
      }

      let partCorrect = 0;
      let partTotal = 0;

      // Process answers
      const sortedKeys = Object.keys(answerKey).sort((a, b) => {
          const numA = parseInt(String(a).replace(/\D/g, ''), 10);
          const numB = parseInt(String(b).replace(/\D/g, ''), 10);
          return numA - numB;
      });

      sortedKeys.forEach((qKey, keyIndex) => {
        const correctVal = answerKey[qKey];
        const userVal = userAnswers[qKey];
        
        // Check if we should split this question (e.g. q21 with 2 answers -> 21, 22)
        // Criteria: correctVal is array, length > 1, AND next key is NOT the immediate successor
        let shouldSplit = false;
        let splitCount = 1;
        
        const qNum = parseInt(String(qKey).replace("q", ""), 10);
        
        if (Array.isArray(correctVal) && correctVal.length > 1) {
            // Check next key
            const nextKey = sortedKeys[keyIndex + 1];
            const nextNum = nextKey ? parseInt(String(nextKey).replace("q", ""), 10) : -1;
            
            // If next question is not qNum + 1, or doesn't exist, assume these answers cover the gap
            if (nextNum !== qNum + 1) {
                shouldSplit = true;
                splitCount = correctVal.length;
            }
        }

        if (shouldSplit) {
            const userArr = String(userVal || "").split(",").map(s => s.trim()).filter(Boolean);
            const correctArr = correctVal.map(String);
            
            // Determine which user answers match correct answers
            const matchedUserAns = [];
            const unmatchedUserAns = [];
            const correctSet = new Set(correctArr.map(x => x.toUpperCase()));
            
            userArr.forEach(u => {
                if (correctSet.has(u.toUpperCase())) {
                    matchedUserAns.push(u);
                } else {
                    unmatchedUserAns.push(u);
                }
            });

            // Distribute to sub-questions
            for (let i = 0; i < splitCount; i++) {
                partTotal++;
                const subQNum = qNum + i;
                const subCorrect = correctArr[i]; // Assign one correct answer per sub-question (naive but works for list)
                
                // Try to find a matching user answer, or take from unmatched
                let subUser = null;
                let isSubCorrect = false;
                
                // If we have a match for this specific correct answer (if order mattered? No, usually any order)
                // Actually, for "Pick 2", we just need to pair ANY correct user answer with ANY correct key
                // But for display, let's pair them up nicely.
                
                // Simple strategy: 
                // If we have N correct user answers, the first N sub-questions get a correct mark.
                // The remaining get incorrect marks with remaining user answers.
                
                if (matchedUserAns.length > 0) {
                    subUser = matchedUserAns.shift();
                    isSubCorrect = true;
                } else if (unmatchedUserAns.length > 0) {
                    subUser = unmatchedUserAns.shift();
                    isSubCorrect = false;
                } else {
                    subUser = "-";
                    isSubCorrect = false;
                }

                if (isSubCorrect) partCorrect++;

                allDetails.push({
                  part: index + 1,
                  qNum: subQNum,
                  qKey: qKey, // Keep original key for reference
                  userAns: subUser,
                  correctAns: subCorrect, // Display individual correct answer
                  isCorrect: isSubCorrect
                });
            }
        } else {
            // Standard single question processing
            partTotal++;
            let isCorrect = false;
            if (Array.isArray(correctVal)) {
              const userArr = String(userVal || "").split(",").map(s => s.trim()).filter(Boolean);
              
              if (Array.isArray(userVal)) {
                 const s1 = new Set(correctVal.map(x => String(x).toUpperCase()));
                 const s2 = new Set(userVal.map(x => String(x).toUpperCase()));
                 if (s1.size === s2.size && [...s1].every(x => s2.has(x))) isCorrect = true;
              } else {
                 const userStr = String(userVal || "").trim().toUpperCase();
                 if (correctVal.some(cv => String(cv).toUpperCase() === userStr)) {
                     isCorrect = true;
                 }
                 const correctSet = new Set(correctVal.map(v => String(v).toUpperCase()));
                 const userSet = new Set(userArr.map(v => String(v).toUpperCase()));
                 
                 if (correctSet.size > 1) {
                     if (userSet.size === correctSet.size && [...userSet].every(x => correctSet.has(x))) {
                         isCorrect = true;
                     }
                 } else {
                     if (userSet.size === correctSet.size && [...userSet].every(x => correctSet.has(x))) {
                         isCorrect = true;
                     }
                 }
              }
            } else if (
              userVal &&
              String(userVal).toUpperCase() === String(correctVal).toUpperCase()
            ) {
              isCorrect = true;
            }

            if (isCorrect) partCorrect++;

            allDetails.push({
              part: index + 1,
              qNum: isNaN(qNum) ? 0 : qNum,
              qKey,
              userAns: Array.isArray(userVal) ? userVal.join(", ") : userVal || "-",
              correctAns: Array.isArray(correctVal) ? correctVal.join(", ") : correctVal,
              isCorrect
            });
        }
      });

      totalScore += partCorrect;
      totalQuestions += partTotal;
      
      // Apply inline results
      if (typeof win.applyInlineResults === "function") {
          const res = allDetails.filter(d => d.part === index + 1).map(d => ({
              id: d.qKey,
              userAns: d.userAns,
              correctAns: d.correctAns,
              isCorrect: d.isCorrect
          }));
          win.applyInlineResults(res);
      }
    });

    allDetails.sort((a, b) => {
        if (a.part !== b.part) return a.part - b.part;
        return a.qNum - b.qNum;
    });

    setQuestionStatus(prev => {
        const next = { ...prev };
        allDetails.forEach(d => {
            if (!next[d.qKey]) next[d.qKey] = {};
            next[d.qKey].isCorrect = d.isCorrect;
            next[d.qKey].answered = true;
        });
        return next;
    });

    // Save History
    const band = calculateBand(totalScore);
    const historyItem = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        volumeIndex,
        testIndex,
        score: totalScore,
        total: totalQuestions,
        band: band,
        type: "FULL TEST"
    };

    try {
        const historyKey = "ielts_suite_history";
        const existingHistory = JSON.parse(localStorage.getItem(historyKey) || "[]");
        existingHistory.unshift(historyItem);
        localStorage.setItem(historyKey, JSON.stringify(existingHistory));
    } catch (e) {
        console.error("Failed to save history", e);
    }

    setResults({
      score: totalScore,
      total: totalQuestions,
      details: allDetails,
      elapsed: seconds
    });
    setResultMode(true);
    setRightTab('sheet');

    try {
      const historyKey = storageKeyBase + "_history";
      const item = {
        score: totalScore,
        total: totalQuestions,
        band: calculateBand(totalScore),
        elapsed: seconds,
        details: allDetails
      };
      window.localStorage.setItem(historyKey, JSON.stringify(item));
      window.localStorage.removeItem(storageKeyBase + "_draft");
    } catch (e) {}
  }

  // Calculate Band Score (IELTS Academic Reading)
  const calculateBand = (score) => {
      if (score >= 39) return 9.0;
      if (score >= 37) return 8.5;
      if (score >= 35) return 8.0;
      if (score >= 33) return 7.5;
      if (score >= 30) return 7.0;
      if (score >= 27) return 6.5;
      if (score >= 23) return 6.0;
      if (score >= 19) return 5.5;
      if (score >= 15) return 5.0;
      if (score >= 13) return 4.5;
      if (score >= 10) return 4.0;
      if (score >= 8) return 3.5;
      if (score >= 6) return 3.0;
      if (score >= 4) return 2.5;
      if (score >= 2) return 2.0;
      return 1.0;
  };

  const bandScore = calculateBand(results.score);

  // 当右侧视图在结果模式下切换时，通知各个 iframe 以控制题区显示/隐藏
  useEffect(() => {
    if (!resultMode) return;
    const mode = rightTab === 'sheet' ? 'sheet' : 'analysis';
    for (let i = 0; i < 3; i++) {
      const frame = document.getElementById(`iframe-part-${i}`);
      if (frame && frame.contentWindow) {
        frame.contentWindow.postMessage(
          {
            type: 'IELTS_PARENT_ACTION',
            subType: 'SET_VIEW_MODE',
            payload: mode,
          },
          '*'
        );
      }
    }
  }, [resultMode, rightTab]);

  function handleRetake() {
    try {
      window.localStorage.removeItem(storageKeyBase + "_draft");
      if (currentSet && Array.isArray(currentSet)) {
          currentSet.forEach(article => {
              if (article.id) {
                  window.localStorage.removeItem(article.id + "_answers");
                  // Also clear draft for the article if any
                  window.localStorage.removeItem("ielts_draft_" + article.id);
              }
          });
      }
      
      // Force reset iframes via postMessage as well, just in case
      for(let i=0; i<3; i++) {
          const frame = document.getElementById(`iframe-part-${i}`);
          if (frame && frame.contentWindow) {
              frame.contentWindow.postMessage({ type: 'IELTS_PARENT_ACTION', subType: 'RESET_ALL' }, '*');
          }
      }
      
    } catch (e) {}
    setResultMode(false);
    setResults({
      score: 0,
      total: 0,
      details: [],
      elapsed: 0
    });
    setQuestionStatus({});
    setSeconds(0);
    setAttemptKey(k => k + 1);
    setRightTab('sheet');
  }

  function handleSaveExit() {
    try {
      const allAnswers = {};
      if (currentSet && currentSet.length > 0) {
        currentSet.forEach((article, index) => {
          const iframe = document.getElementById(`iframe-part-${index}`);
          if (!iframe || !iframe.contentWindow) return;
          const win = iframe.contentWindow;
          if (typeof win.extractUserAnswers === "function") {
            const partMap = win.extractUserAnswers();
            if (partMap && typeof partMap === "object") {
              Object.keys(partMap).forEach((k) => {
                allAnswers[k] = partMap[k];
              });
            }
          }
        });
      }
      const data = { seconds, answers: allAnswers };
      window.localStorage.setItem(storageKeyBase + "_draft", JSON.stringify(data));
    } catch (e) {}
    router.push('/volume');
  }

  return (
    <div className="mock-page" style={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column", background: "#f5f7fa", overflow: "hidden", boxSizing: "border-box" }}>
       {/* Top Header - Slimmer */}
       <div className="mock-header" style={{ flex: "0 0 50px", height: "50px", minHeight: "50px", width: "100%", padding: "0 20px", display: "flex", alignItems: "center", background: "#fff", borderBottom: "1px solid #e5e7eb", boxSizing: "border-box", zIndex: 10 }}>
          <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", maxWidth: "100%", margin: "0 auto" }}>
            {/* Left: Back Button & Part Info (Red Box 1) */}
            <div style={{ display: "flex", alignItems: "center", flex: "1 1 auto", gap: "20px", overflow: "hidden", marginRight: "20px" }}>
               <button onClick={() => router.push('/volume')} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#666", flex: "0 0 auto" }}>←</button>
               <div style={{ fontWeight: 600, color: "#333", fontSize: "14px", pointerEvents: "none", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Part {currentPartIndex + 1} / 3{currentSet[currentPartIndex]?.title ? ` : ${currentSet[currentPartIndex].title}` : ""}
               </div>
            </div>

            {/* Right: Controls (Red Box 2) */}
            <div style={{ display: "flex", alignItems: "center", gap: "15px", flex: "0 0 auto" }}>
               {!resultMode && (
                   <>
                      <button 
                          className="btn" 
                          style={{ padding: "4px 12px", fontSize: "13px", background: "#f3f4f6", border: "none", borderRadius: "4px" }}
                          onClick={() => setIsPaused(!isPaused)}
                      >
                          {isPaused ? "继续" : "暂停"}
                      </button>
                      {showTimer && (
                          <div style={{ 
                              fontFamily: "monospace", 
                              fontWeight: 600, 
                              color: isOvertime || remaining < 300 ? "#ef4444" : "#374151",
                              background: "#f3f4f6",
                              padding: "4px 8px",
                              borderRadius: "4px"
                          }}>
                              {isOvertime ? `-${formatTime(Math.abs(remaining))}` : formatTime(remaining)}
                          </div>
                      )}
                      <button 
                           onClick={() => setShowTimer(!showTimer)}
                           style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px" }}
                           title={showTimer ? "隐藏计时" : "显示计时"}
                      >
                          {showTimer ? "👁️" : "👁️‍🗨️"}
                      </button>
                      <button 
                          className="btn"
                          style={{ padding: "4px 12px", fontSize: "13px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "4px", cursor: "pointer" }}
                          onClick={handleSaveExit}
                      >
                          保存退出
                      </button>
                      <button 
                          className="btn btn-primary" 
                          style={{ padding: "4px 16px", fontSize: "13px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
                          onClick={handleSubmit}
                      >
                          提交
                      </button>
                   </>
               )}
               {resultMode && (
                   <span style={{ fontSize: "13px", color: "#6b7280" }}>审阅模式</span>
               )}
            </div>
          </div>
       </div>

       <div style={{ flex: 1, display: "flex", overflow: "hidden", width: "100vw", maxWidth: "100vw" }}>
          {/* Main Area */}
          <div style={{ flex: 1, position: "relative", background: "#f5f7f9", display: "flex", overflow: "hidden", minWidth: resultMode ? "55%" : "100%" }}>
             {/* Left: Reading Iframes (always visible) */}
            <div style={{ flex: 1, position: "relative", minWidth: "0", overflow: "hidden" }}>
                 {currentSet.map((article, index) => (
                    <div key={index} style={{ display: currentPartIndex === index ? "block" : "none", width: "100%", height: "100%" }}>
                       <iframe 
                          id={`iframe-part-${index}`}
                          src={`/${article.file}?attempt=${attemptKey}`}
                          style={{ width: "100%", height: "100%", border: "none" }}
                          onLoad={handleIframeLoad}
                       />
                    </div>
                 ))}
                 
                 {isPaused && (
                     <div style={{
                        position: "absolute",
                        top: 0, left: 0, width: "100%", height: "100%",
                         background: "rgba(255,255,255,0.9)",
                         backdropFilter: "blur(4px)",
                         display: "flex", flexDirection: "column",
                         alignItems: "center", justifyContent: "center",
                         zIndex: 50
                     }}>
                         <div style={{ fontSize: "40px", marginBottom: "20px" }}>⏸️</div>
                         <div style={{ fontSize: "20px", fontWeight: "600", color: "#333" }}>Test Paused</div>
                         <button 
                            onClick={() => setIsPaused(false)}
                            style={{ marginTop: "20px", padding: "8px 24px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}
                         >
                            Resume
                         </button>
                     </div>
                 )}
             </div>
             
             {/* Right: Answer Sheet (result mode only, 隐藏中间题区） */}
             {resultMode && rightTab === 'sheet' && (
                <div style={{ width: "420px", maxWidth: "45%", minWidth: "40%", borderLeft: "1px solid #e5e7eb", background: "#fff", overflowY: "auto", padding: "20px" }}>
                      <div style={{ maxWidth: "100%", margin: "0 auto" }}>
                          {/* Stats Header */}
                          <div style={{ padding: "16px", marginBottom: "16px", border: "1px solid #e2e8f0", borderRadius: "8px", background: "#f8fafc" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <div style={{ textAlign: "center", flex: 1 }}>
                                        <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "6px" }}>正确/总题数</div>
                                        <div style={{ fontSize: "24px", fontWeight: "bold", color: "#16a34a" }}>{results.score}<span style={{fontSize: "16px", color: "#94a3b8"}}>/{results.total}</span></div>
                                    </div>
                                    <div style={{ width: "1px", height: "36px", background: "#cbd5e1" }}></div>
                                     <div style={{ textAlign: "center", flex: 1 }}>
                                        <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "6px" }}>Band</div>
                                        <div style={{ fontSize: "24px", fontWeight: "bold", color: "#3b82f6" }}>{bandScore}</div>
                                    </div>
                                    <div style={{ width: "1px", height: "36px", background: "#cbd5e1" }}></div>
                                     <div style={{ textAlign: "center", flex: 1 }}>
                                        <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "6px" }}>用时</div>
                                        <div style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>{formatTime(results.elapsed)}</div>
                                    </div>
                                </div>
                          </div>

                          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", border: "1px solid #e2e8f0", marginTop: "4px" }}>
                              <thead style={{ background: "#f9fafb", color: "#475569" }}>
                                  <tr>
                                      <th style={{ padding: "10px", textAlign: "center", width: "48px", borderBottom: "1px solid #e2e8f0" }}>#</th>
                                      <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>正确答案</th>
                                      <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>我的答案</th>
                                      <th style={{ padding: "10px", textAlign: "center", width: "60px", borderBottom: "1px solid #e2e8f0" }}>状态</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {results.details.filter(r => r.part === sheetPart).map((row, idx) => (
                                      <tr
                                        key={idx}
                                        style={{
                                          borderBottom: "1px solid #f1f5f9",
                                          background: "#ffffff",
                                          cursor: "pointer"
                                        }}
                                        onClick={() => handleScrollToQuestion(row.qKey)}
                                      >
                                          <td style={{ padding: "10px", textAlign: "center", fontWeight: "600", color: "#475569" }}>{row.qNum || row.qKey}</td>
                                          <td style={{ padding: "10px", color: "#111827", fontWeight: "500" }}>{row.correctAns}</td>
                                          <td style={{ padding: "10px", color: row.isCorrect ? "#16a34a" : "#dc2626", fontWeight: "bold" }}>{row.userAns}</td>
                                          <td style={{ padding: "10px", textAlign: "center" }}>
                                              {row.isCorrect ? <span style={{ color: "#16a34a", fontSize: "16px" }}>✓</span> : <span style={{ color: "#dc2626", fontSize: "16px" }}>✕</span>}
                                          </td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                </div>
             )}
          </div>

          {/* Right Navigation Rail - Vertical Tabs (Result Mode Only) */}
          {resultMode && (
             <div style={{ width: "70px", background: "#fff", borderLeft: "1px solid #e5e7eb", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "10px", zIndex: 20 }}>
                <div 
                    onClick={() => setRightTab('sheet')} 
                    style={{ 
                        width: "100%", padding: "15px 0", textAlign: "center", cursor: "pointer", 
                        borderLeft: rightTab === 'sheet' ? "3px solid #3b82f6" : "3px solid transparent", 
                        background: rightTab === 'sheet' ? "#f0f9ff" : "transparent",
                        color: rightTab === 'sheet' ? "#3b82f6" : "#64748b"
                    }}
                >
                   <div style={{ fontSize: "20px", marginBottom: "4px" }}>📊</div>
                   <div style={{ fontSize: "11px", fontWeight: "600" }}>答题卡</div>
                </div>
                <div 
                    onClick={() => setRightTab('analysis')} 
                    style={{ 
                        width: "100%", padding: "15px 0", textAlign: "center", cursor: "pointer", 
                        borderLeft: rightTab === 'analysis' ? "3px solid #3b82f6" : "3px solid transparent", 
                        background: rightTab === 'analysis' ? "#f0f9ff" : "transparent",
                        color: rightTab === 'analysis' ? "#3b82f6" : "#64748b"
                    }}
                >
                    <div style={{ fontSize: "20px", marginBottom: "4px" }}>📝</div>
                    <div style={{ fontSize: "11px", fontWeight: "600" }}>解析</div>
                </div>
             </div>
          )}
       </div>

       {/* Bottom Bar - Part Tabs & Question Navigator */}
       <div className="volume-bottom-bar" style={{
              flex: '0 0 60px',
              height: '60px',
              minHeight: '60px',
              width: '100%',
              background: 'white',
              borderTop: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              padding: '0 24px',
              justifyContent: 'center',
              boxSizing: 'border-box',
              zIndex: 50
          }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '1200px' }}>
                  {/* Part Tabs */}
                  <div style={{ display: 'flex', gap: '8px', marginRight: '20px' }}>
                      {["1", "2", "3"].map((p, i) => (
                          <div 
                             key={i}
                             onClick={() => {
                                 setCurrentPartIndex(i);
                                 setSheetPart(i + 1);
                             }}
                             style={{
                                 padding: '6px 12px',
                                 borderRadius: '4px',
                                 cursor: 'pointer',
                                 fontWeight: '600',
                                 fontSize: '13px',
                                 background: currentPartIndex === i ? '#3b82f6' : '#f3f4f6',
                                 color: currentPartIndex === i ? '#fff' : '#6b7280',
                                 transition: 'all 0.2s'
                             }}
                          >
                              Part {p}
                          </div>
                      ))}
                  </div>

                  {/* Questions for Current Part */}
                  <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '4px 0', flex: 1, justifyContent: 'center' }}>
                      {(() => {
                          const qIds = partQuestions[currentPartIndex] || [];
                          const sortedQIds = [...qIds].sort((a, b) => {
                              const na = parseInt(a.replace(/\D/g, ''), 10);
                              const nb = parseInt(b.replace(/\D/g, ''), 10);
                              if (!isNaN(na) && !isNaN(nb)) return na - nb;
                              return a.localeCompare(b);
                          });

                          return sortedQIds.map(q => {
                              const status = questionStatus[q] || {};
                              let bg = '#f3f4f6';
                              let color = '#6b7280';
                              if (status.isCorrect === true) { bg = '#d1fae5'; color = '#059669'; }
                              else if (status.isCorrect === false) { bg = '#fee2e2'; color = '#dc2626'; }
                              else if (status.answered) { bg = '#dbeafe'; color = '#2563eb'; }
                              
                              return (
                                  <div 
                                      key={q} 
                                      onClick={() => handleScrollToQuestion(q)}
                                      style={{
                                          width: '32px', 
                                          height: '32px', 
                                          borderRadius: '4px', 
                                          background: bg, 
                                          color: color,
                                          display: 'flex', 
                                          alignItems: 'center', 
                                          justifyContent: 'center',
                                          fontSize: '13px',
                                          fontWeight: '600',
                                          cursor: 'pointer',
                                          position: 'relative',
                                          border: status.marked ? '1px solid #ef4444' : 'none',
                                          flexShrink: 0
                                      }}
                                      title={`Question ${q}`}
                                  >
                                      {q.replace(/^\D+/, '')}
                                      {status.marked && (
                                          <div style={{
                                              position: 'absolute',
                                              top: '-4px',
                                              right: '-4px',
                                              width: '8px',
                                              height: '8px',
                                              borderRadius: '50%',
                                              background: '#ef4444'
                                          }} />
                                      )}
                                  </div>
                              );
                          });
                      })()}
                  </div>
                  
                  <div style={{ minWidth: '100px', textAlign: 'right', fontSize: '13px', color: '#6b7280' }}>
                  </div>
              </div>
          </div>
    </div>
  );
}
