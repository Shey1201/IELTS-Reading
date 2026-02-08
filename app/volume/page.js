"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  rawConfig,
  getAllArticles,
  getScore,
  buildVolumeSets
} from "../home-page";

export default function VolumePage() {
  const [volumes, setVolumes] = useState([]);
  const [openVolumes, setOpenVolumes] = useState({});
  const [history, setHistory] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const items = getAllArticles(rawConfig);
    const v = buildVolumeSets(items);
    setVolumes(v);
    
    // Default open all volumes
    if (v.length > 0) {
      const allOpen = {};
      v.forEach((_, index) => {
        allOpen[index] = true;
      });
      setOpenVolumes(allOpen);
    }

    // Load History
    try {
        const h = JSON.parse(localStorage.getItem("ielts_suite_history") || "[]");
        setHistory(h);
    } catch (e) {
        console.error(e);
    }
  }, []);

  function toggleVolume(index) {
    setOpenVolumes(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  }

  function handleStartTest(volumeIndex, testIndex) {
    const url = `/mock/${volumeIndex}/${testIndex}`;
    window.location.href = url;
  }

  function handleResetTest(volumeIndex, testIndex) {
    try {
      const keyHistory = `mock_${volumeIndex}_${testIndex}_history`;
      const keyDraft = `mock_${volumeIndex}_${testIndex}_draft`;
      localStorage.removeItem(keyHistory);
      localStorage.removeItem(keyDraft);
    } catch (e) {}
    setHistory(prev => {
      const next = prev.filter(
        (h) => !(h.volumeIndex === volumeIndex && h.testIndex === testIndex)
      );
      try {
        localStorage.setItem("ielts_suite_history", JSON.stringify(next));
      } catch (e) {}
      return next;
    });
    
    // Directly enter the test page
    const url = `/mock/${volumeIndex}/${testIndex}`;
    window.location.href = url;
  }

  // Calculate Stats
  const totalTests = volumes.reduce((acc, vol) => acc + vol.length, 0);
  const completedCount = history.reduce((acc, h) => {
      const key = `${h.volumeIndex}-${h.testIndex}`;
      if (!acc.has(key)) acc.add(key);
      return acc;
  }, new Set()).size;

  const testsCompletedDisplay = `${completedCount} / ${totalTests}`;

  const averageBand = history.length > 0 
      ? (history.reduce((sum, item) => sum + (parseFloat(item.band) || 0), 0) / history.length).toFixed(1)
      : "0.0";
  // Assuming parts practiced could be derived or just 0 for now as requested by user image if not tracked
  const partsPracticed = 0; 


  function formatDate(isoString) {
      if (!isoString) return "-";
      const d = new Date(isoString);
      return d.toLocaleDateString() + " " + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function getTags(vIndex, tIndex) {
      if (vIndex < 0 || vIndex >= volumes.length) return [];
      const set = volumes[vIndex][tIndex];
      if (!set || set.length === 0) return [];
      
      // Check if any article in this set is "High Frequency" or "Next High"
      // We need to look up the article in rawConfig
      const tags = new Set();
      
      set.forEach(article => {
          // Find article in rawConfig
          Object.values(rawConfig.passages).forEach(vol => {
              if (vol.levels) {
                  Object.entries(vol.levels).forEach(([levelName, levelData]) => {
                       if (levelData.articles.some(a => a.id === article.id)) {
                           if (levelName === "高频") tags.add({ text: "高频", color: "#f56565" });
                           if (levelName === "次高频") tags.add({ text: "次高频", color: "#ed8936" });
                       }
                  });
              }
          });
      });
      
      // De-duplicate by text
      const uniqueTags = [];
      const seen = new Set();
      tags.forEach(t => {
          if(!seen.has(t.text)) {
              seen.add(t.text);
              uniqueTags.push(t);
          }
      });
      return uniqueTags;
  }

  function getTestStats(vIndex, tIndex) {
      const key = `mock_${vIndex}_${tIndex}_history`;
      try {
          const raw = localStorage.getItem(key);
          if (!raw) return null;
          const parsed = JSON.parse(raw);
          if (!parsed) return null;
          return {
              score: parsed.score,
              total: parsed.total,
              band: parsed.band
          };
      } catch (e) {
          return null;
      }
  }

  function hasDraft(vIndex, tIndex) {
      const key = `mock_${vIndex}_${tIndex}_draft`;
      try {
          return !!localStorage.getItem(key);
      } catch (e) {
          return false;
      }
  }

  function handleDeleteHistory(index) {
    const newHistory = [...history];
    newHistory.splice(index, 1);
    setHistory(newHistory);
    if (typeof window !== "undefined") {
      localStorage.setItem("ielts_suite_history", JSON.stringify(newHistory));
    }
  }

  return (
    <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <div className="header header-with-back" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
            <button className="back-button" onClick={() => router.push("/")} style={{ marginRight: "15px", background: "none", border: "none", fontSize: "24px", cursor: "pointer" }}>
            ←
            </button>
        </div>
        <button 
            onClick={() => router.push("/volume/history")}
            style={{ 
                padding: "8px 16px", 
                background: "#f1f5f9", 
                color: "#475569", 
                border: "none", 
                borderRadius: "6px", 
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px"
            }}
        >
            History
        </button>
      </div>

      {/* Dashboard Cards */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
          <div style={{ flex: 1, background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", textAlign: "center" }}>
              <div style={{ color: "#64748b", fontSize: "12px", fontWeight: "600", letterSpacing: "1px", marginBottom: "5px" }}>TESTS COMPLETED</div>
              <div style={{ fontSize: "36px", fontWeight: "700", color: "#1e293b" }}>{testsCompletedDisplay}</div>
          </div>
          <div style={{ flex: 1, background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", textAlign: "center" }}>
              <div style={{ color: "#64748b", fontSize: "12px", fontWeight: "600", letterSpacing: "1px", marginBottom: "5px" }}>AVERAGE BAND</div>
              <div style={{ fontSize: "36px", fontWeight: "700", color: "#3b82f6" }}>{averageBand}</div>
          </div>
          <div style={{ flex: 1, background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", textAlign: "center" }}>
              <div style={{ color: "#64748b", fontSize: "12px", fontWeight: "600", letterSpacing: "1px", marginBottom: "5px" }}>PARTS PRACTICED</div>
              <div style={{ fontSize: "36px", fontWeight: "700", color: "#1e293b" }}>{partsPracticed}</div>
          </div>
      </div>

      {/* Volume List */}
      {volumes.length === 0 ? (
        <p>可用文章数量不足，无法生成套卷。</p>
      ) : (
        volumes.map((volume, vIndex) => (
          <div key={vIndex} className="volume-section" style={{ marginBottom: "20px" }}>
            <h2 
              className="volume-section-title" 
              onClick={() => toggleVolume(vIndex)}
              style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f1f5f9", padding: "10px 15px", borderRadius: "8px", margin: "0 0 10px 0", fontSize: "16px" }}
            >
              <span>Volume {vIndex + 1}</span>
              <span style={{ fontSize: "16px", color: "#666" }}>
                {openVolumes[vIndex] ? "▲" : "▼"}
              </span>
            </h2>
            {openVolumes[vIndex] && (
              <div className="volume-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px" }}>
                {volume.map((set, tIndex) => {
                  const tags = getTags(vIndex, tIndex);
                  const stats = getTestStats(vIndex, tIndex);
                  return (
                    <div key={tIndex} className="volume-card" style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden", transition: "all 0.2s" }}>
                      <div className="volume-card-header" style={{ padding: "15px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ fontWeight: "600", fontSize: "16px" }}>Test {tIndex + 1}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                           {tags.map((tag, idx) => (
                               <span key={idx} style={{ fontSize: "10px", color: "#fff", background: tag.color, padding: "2px 6px", borderRadius: "4px" }}>
                                   {tag.text}
                               </span>
                           ))}
                           {stats ? (
                             <>
                               <button
                                  disabled={set.length === 0}
                                  onClick={() => handleStartTest(vIndex, tIndex)}
                                  title="查看"
                                  style={{
                                      padding: '6px',
                                      borderRadius: '4px',
                                      border: '1px solid #e2e8f0',
                                      background: '#eff6ff',
                                      color: '#3b82f6',
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      width: '32px',
                                      height: '32px'
                                  }}
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                               </button>
                               <button
                                  disabled={set.length === 0}
                                  onClick={() => handleResetTest(vIndex, tIndex)}
                                  title="重置"
                                  style={{
                                      padding: '6px',
                                      borderRadius: '4px',
                                      border: '1px solid #e2e8f0',
                                      background: '#fff',
                                      color: '#64748b',
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      width: '32px',
                                      height: '32px'
                                  }}
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"></path><path d="M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                               </button>
                             </>
                           ) : (
                             <button
                              disabled={set.length === 0}
                              onClick={() => handleStartTest(vIndex, tIndex)}
                              title="开始"
                              style={{
                                  padding: '6px',
                                  borderRadius: '4px',
                                  border: 'none',
                                  background: '#3b82f6',
                                  color: '#fff',
                                  cursor: 'pointer',
                                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: '32px',
                                  height: '32px'
                              }}
                             >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                             </button>
                           )}
                        </div>
                      </div>
                      
                      {stats && (
                          <div style={{ padding: "10px 15px", background: "#f8fafc", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#64748b" }}>
                              <span>Score: <b style={{ color: "#333" }}>{stats.score}/{stats.total}</b></span>
                              <span>Band: <b style={{ color: "#3b82f6" }}>{stats.band}</b></span>
                          </div>
                      )}
                      
                      <div className="volume-card-body" style={{ padding: "15px" }}>
                        {set.map(article => (
                          <div
                            key={article.id}
                            style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "8px", color: "#475569" }}
                          >
                            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginRight: "10px" }}>
                              {article.passageKey} · {article.title}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="volume-card-footer" style={{ padding: "12px 15px", background: "#f8fafc", borderTop: "1px solid #f1f5f9", textAlign: "right", fontSize: "12px", color: "#94a3b8" }}>
                        套卷包含 {set.length} 篇文章
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
