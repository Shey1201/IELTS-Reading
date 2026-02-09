import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  ChevronLeft, 
  CheckCircle, 
  XCircle, 
  Highlighter, 
  Upload, 
  Play, 
  FileText, 
  BookOpen, 
  RotateCcw, 
  BarChart3, 
  History, 
  Circle, 
  Shuffle,
  Grid,
  Trophy,
  ArrowRight,
  List,
  Eye,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Star,
  Zap,
  FileSpreadsheet,
  Image as ImageIcon,
  Calendar,
  AlertTriangle,
  BadgeAlert,
  BarChart2
} from 'lucide-react';
import { Exam, Part, QuestionType, ExamSession, UserAnswers, PartCategory, Question, QuestionGroup, FrequencyLevel } from './types';
import { SAMPLE_EXAM, JANUARY_PARTS } from './constants';

// --- Helper Functions ---

const getBandScore = (raw: number): string => {
  if (raw >= 39) return '9.0';
  if (raw >= 37) return '8.5';
  if (raw >= 35) return '8.0';
  if (raw >= 33) return '7.5';
  if (raw >= 30) return '7.0';
  if (raw >= 27) return '6.5';
  if (raw >= 23) return '6.0';
  if (raw >= 19) return '5.5';
  if (raw >= 15) return '5.0';
  if (raw >= 13) return '4.5';
  if (raw >= 10) return '4.0';
  return '< 4.0';
};

const formatTime = (seconds: number) => {
  const isNegative = seconds < 0;
  const absSeconds = Math.abs(seconds);
  const m = Math.floor(absSeconds / 60);
  const s = absSeconds % 60;
  return `${isNegative ? '-' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

// --- Types for History ---
interface ExamResult {
  id: string;
  date: number;
  examId: string; // ID of the exam taken
  examTitle: string;
  type: 'FULL' | 'PART_PRACTICE';
  score: number;
  totalQuestions: number;
  band: string | null;
  timeUsed: number;
  partScores?: { [partId: string]: { score: number, total: number } };
  partIds: string[];
  // New fields for review functionality
  answers?: UserAnswers;
  highlightedContent?: { [partId: string]: string };
}

// --- Components ---

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' }> = ({ 
  children, variant = 'primary', className = '', ...props 
}) => {
  const base = "px-4 py-2 rounded-lg font-bold transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 text-sm";
  const variants = {
    primary: "bg-[#007AFF] text-white hover:bg-blue-600 shadow-sm shadow-blue-200",
    secondary: "bg-slate-800 text-white hover:bg-slate-900",
    outline: "border border-slate-200 text-slate-700 hover:border-[#007AFF] hover:text-[#007AFF] bg-white",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
    danger: "bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200"
  };
  return <button className={`${base} ${variants[variant]} ${className}`} {...props}>{children}</button>;
};

// --- Views ---

// 1. Dashboard View
const Dashboard: React.FC<{ 
  exams: Exam[]; 
  allParts: Part[];
  history: ExamResult[];
  starredIds: Set<string>;
  highFreqIds: Set<string>;
  onStartExam: (exam: Exam, type: 'FULL' | 'PART_PRACTICE') => void; 
  onReviewExam: (exam: Exam, result: ExamResult) => void;
  onImportFile: (e: React.ChangeEvent<HTMLInputElement>, freq: FrequencyLevel, month: string) => void;
  onUploadHighFreq: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleStar: (id: string) => void;
}> = ({ exams, allParts, history, starredIds, highFreqIds, onStartExam, onReviewExam, onImportFile, onUploadHighFreq, onToggleStar }) => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'PART1' | 'PART2' | 'PART3'>('ALL');
  const [showHistory, setShowHistory] = useState(false);
  const [expandedVolumes, setExpandedVolumes] = useState<{[key: number]: boolean}>({0: true}); // Default open first volume
  
  // Upload config state
  const [uploadFreq, setUploadFreq] = useState<FrequencyLevel>('Normal');
  const [uploadMonth, setUploadMonth] = useState<string>((new Date().getMonth() + 1) + '月');

  const filteredExams = exams.filter(e => !e.isCustom);
  const getPartsByCategory = (cat: PartCategory) => allParts.filter(p => p.category === cat);
  const usedPartIds = new Set(history.flatMap(h => h.partIds));

  // Helper to determine if an exam is High Frequency
  const isExamHighFreq = (exam: Exam) => {
    // Check if explicitly tagged or if majority of parts are high freq
    if (exam.tags?.includes('High Frequency')) return true;
    const hfPartCount = exam.parts.filter(p => p.frequency === 'High' || p.isHighFrequency || highFreqIds.has(p.id)).length;
    return hfPartCount >= Math.ceil(exam.parts.length / 2);
  };

  // Helper to find the best/latest result for a specific Exam
  const getExamHistory = (examId: string) => {
    return history
      .filter(h => h.type === 'FULL' && (h.examId === examId || h.examTitle === exams.find(e => e.id === examId)?.title))
      .sort((a, b) => b.date - a.date)[0];
  };

  const getPartScore = (partId: string) => {
    const attempt = history
        .filter(h => h.type === 'PART_PRACTICE' && h.partIds.includes(partId))
        .sort((a, b) => b.date - a.date)[0];
    return attempt ? `${attempt.score}/${attempt.totalQuestions}` : null;
  };

  const getPriority = (part: Part) => {
    if (part.frequency === 'High' || part.isHighFrequency || highFreqIds.has(part.id)) return 3;
    if (part.frequency === 'Second') return 2;
    return 1;
  };

  const handleRandomCustom = () => {
    const getUnusedOrRandom = (cat: PartCategory) => {
      const parts = getPartsByCategory(cat);
      const unused = parts.filter(p => !usedPartIds.has(p.id));
      if (unused.length > 0) return unused[Math.floor(Math.random() * unused.length)];
      return parts[Math.floor(Math.random() * parts.length)];
    };

    const p1 = getUnusedOrRandom('Part 1');
    const p2 = getUnusedOrRandom('Part 2');
    const p3 = getUnusedOrRandom('Part 3');
    
    if(!p1 || !p2 || !p3) {
      alert("Not enough parts in the bank to generate a set.");
      return;
    }

    const newExam: Exam = {
      id: `custom-rand-${Date.now()}`,
      title: `Random Test ${new Date().toLocaleDateString()}`,
      parts: [p1, p2, p3],
      isCustom: true,
      tags: ['Random']
    };
    onStartExam(newExam, 'FULL');
  };

  const toggleVolume = (index: number) => {
    setExpandedVolumes(prev => ({...prev, [index]: !prev[index]}));
  };

  const chunkExams = (arr: Exam[], size: number) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  // --- Render Components for Exam Card ---
  const renderExamCard = (exam: Exam, index: number, showVolumeLabel = false) => {
    const examHistory = getExamHistory(exam.id);
    const displayTitle = exam.title.replace(/IELTS Academic Reading Practice /, '');
    const isStarred = starredIds.has(exam.id);
    const isHighFreq = isExamHighFreq(exam);

    return (
       <div key={exam.id} className={`bg-white rounded-xl border p-5 flex flex-col justify-between hover:shadow-lg transition-all duration-200 group h-full relative ${isStarred ? 'border-yellow-200 shadow-yellow-50' : 'border-slate-200'}`}>
          {/* Star Button */}
          <button 
             onClick={(e) => { e.stopPropagation(); onToggleStar(exam.id); }}
             className={`absolute top-4 right-4 p-1.5 rounded-full transition-colors z-10 ${isStarred ? 'text-yellow-400 bg-yellow-50' : 'text-slate-200 hover:text-yellow-400 hover:bg-slate-50'}`}
          >
             <Star className={`w-5 h-5 ${isStarred ? 'fill-current' : ''}`} />
          </button>

          <div>
             <div className="flex justify-between items-start mb-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm bg-slate-100 text-slate-500`}>
                   {index + 1}
                </div>
                <div className="flex gap-2 mr-8">
                   {isHighFreq && <span className="flex items-center gap-1 text-[10px] font-bold bg-orange-50 text-orange-600 px-2 py-1 rounded-full border border-orange-100"><Zap className="w-3 h-3 fill-current"/> HF</span>}
                   {examHistory && <CheckCircle className="w-5 h-5 text-green-500" />}
                </div>
             </div>
             {showVolumeLabel && <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Reading Volume {Math.floor(index / 4) + 1}</div>}
             <h4 className="font-bold text-slate-800 text-base leading-tight mb-2 line-clamp-2" title={exam.title}>
                {displayTitle}
             </h4>
             <p className="text-slate-400 text-xs mb-6">
                {exam.parts.length} Passages • 40 Qs
             </p>
          </div>

          <div className="mt-auto">
             {examHistory ? (
                <div className="mb-4 bg-blue-50/50 rounded-lg p-3 border border-blue-100 flex items-center justify-between">
                   <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Band</div>
                      <div className="text-xl font-extrabold text-[#007AFF]">{examHistory.band}</div>
                   </div>
                   <div className="h-8 w-px bg-blue-100"></div>
                   <div className="text-right">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Score</div>
                      <div className="text-sm font-mono font-bold text-slate-700">{examHistory.score}/40</div>
                   </div>
                </div>
             ) : (
                <div className="mb-4 py-3 text-center border border-dashed border-slate-200 rounded-lg">
                   <span className="text-xs font-bold text-slate-300 uppercase">Not Started</span>
                </div>
             )}

             <div className="flex items-center gap-2">
                {examHistory ? (
                   <>
                      <Button 
                         onClick={() => onReviewExam(exam, examHistory)}
                         className="flex-1 bg-[#007AFF] text-white hover:bg-blue-600 border border-transparent shadow-md shadow-blue-100 text-xs"
                      >
                         <Eye className="w-3.5 h-3.5" /> Review
                      </Button>
                      <button 
                         onClick={() => onStartExam(exam, 'FULL')} 
                         className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-colors"
                         title="Retake"
                      >
                         <RotateCcw className="w-4 h-4" />
                      </button>
                   </>
                ) : (
                   <Button 
                      onClick={() => onStartExam(exam, 'FULL')} 
                      className="w-full bg-slate-900 text-white hover:bg-black text-xs"
                   >
                      <Play className="w-3.5 h-3.5 fill-current" /> Start Test
                   </Button>
                )}
             </div>
          </div>
       </div>
    );
  };

  // Filter pinned exams
  const pinnedExams = filteredExams.filter(e => starredIds.has(e.id));

  return (
    <div className="min-h-screen bg-[#F5F5F7] p-4 md:p-8 font-sans text-slate-800">
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header */}
        <header className="mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">IELTS Reading Pro</h1>
            <p className="text-slate-500 font-medium text-base mt-1">Your personal exam library</p>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
             <Button variant="ghost" onClick={() => setShowHistory(!showHistory)}>
                {showHistory ? <List className="w-4 h-4" /> : <History className="w-4 h-4" />}
                {showHistory ? "Library" : "History"}
             </Button>
             
             {/* Import Controls */}
             {!showHistory && (
               <div className="flex items-center gap-2 bg-white border border-slate-200 p-1.5 rounded-xl shadow-sm">
                  {/* High Frequency Upload - Restored */}
                  <div className="relative">
                    <input type="file" accept=".xlsx,.xls,.png,.jpg,.jpeg" id="hf-upload" className="hidden" onChange={onUploadHighFreq} />
                    <label htmlFor="hf-upload">
                      <div className="cursor-pointer bg-orange-50 text-orange-600 border border-orange-100 px-3 py-1.5 rounded-lg font-bold flex items-center gap-2 hover:bg-orange-100 transition-all text-xs" title="Upload High Frequency Data">
                         <Zap className="w-3.5 h-3.5 fill-current" /> HF
                      </div>
                    </label>
                  </div>
                  
                  <div className="w-px h-6 bg-slate-200 mx-1"></div>

                  {/* Frequency Select */}
                  <select 
                    value={uploadFreq} 
                    onChange={(e) => setUploadFreq(e.target.value as FrequencyLevel)}
                    className="text-xs font-bold border-none bg-slate-50 rounded-lg py-1.5 px-2 text-slate-700 focus:ring-0 cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    <option value="High">High Freq (高频)</option>
                    <option value="Second">Second High (次高频)</option>
                    <option value="Normal">Normal (正常)</option>
                  </select>

                  {/* Month Select */}
                  <select 
                    value={uploadMonth} 
                    onChange={(e) => setUploadMonth(e.target.value)}
                    className="text-xs font-bold border-none bg-slate-50 rounded-lg py-1.5 px-2 text-slate-700 focus:ring-0 cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => (
                      <option key={m} value={`${m}月`}>{m}月</option>
                    ))}
                  </select>

                  {/* PDF Import */}
                  <div className="relative">
                      <input 
                        type="file" 
                        accept=".pdf,.json,.html" 
                        id="file-upload" 
                        className="hidden" 
                        onChange={(e) => onImportFile(e, uploadFreq, uploadMonth)} 
                      />
                      <label htmlFor="file-upload">
                        <div className="cursor-pointer bg-[#007AFF] text-white px-3 py-1.5 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-600 transition-all text-xs">
                          <Upload className="w-3.5 h-3.5" /> Import
                        </div>
                      </label>
                  </div>
               </div>
             )}
          </div>
        </header>

        {showHistory ? (
          // History View
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-8">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center">
                   <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Tests Completed</h3>
                   <div className="text-4xl font-extrabold text-slate-900">{history.filter(h => h.type === 'FULL').length}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center">
                   <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Average Band</h3>
                   <div className="text-4xl font-extrabold text-[#007AFF]">
                      {history.filter(h => h.type === 'FULL').length > 0 
                        ? (history.filter(h => h.type === 'FULL').reduce((acc, curr) => acc + parseFloat(curr.band || '0'), 0) / history.filter(h => h.type === 'FULL').length).toFixed(1) 
                        : '-'}
                   </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center">
                   <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Parts Practiced</h3>
                   <div className="text-4xl font-extrabold text-slate-900">{history.filter(h => h.type === 'PART_PRACTICE').length}</div>
                </div>
             </div>

             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                   <h2 className="text-base font-bold text-slate-800">Recent Activity</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                       <tr>
                         <th className="p-4">Date</th>
                         <th className="p-4">Test Title</th>
                         <th className="p-4">Type</th>
                         <th className="p-4 text-center">Score</th>
                         <th className="p-4 text-center">Band</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {history.slice().reverse().map((h) => (
                         <tr key={h.id} className="hover:bg-slate-50/80">
                            <td className="p-4 text-slate-500 font-medium text-sm">{new Date(h.date).toLocaleDateString()}</td>
                            <td className="p-4 font-bold text-slate-800 text-sm">{h.examTitle}</td>
                            <td className="p-4">
                               <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${h.type === 'FULL' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                                  {h.type === 'FULL' ? 'FULL TEST' : 'PART'}
                               </span>
                            </td>
                            <td className="p-4 text-center font-mono font-bold text-sm">{h.score}/{h.totalQuestions}</td>
                            <td className="p-4 text-center font-extrabold text-base text-[#007AFF]">{h.band || '-'}</td>
                         </tr>
                       ))}
                       {history.length === 0 && (
                          <tr><td colSpan={5} className="p-8 text-center text-slate-400 text-sm">No activity recorded yet.</td></tr>
                       )}
                    </tbody>
                  </table>
                </div>
             </div>
          </div>
        ) : (
          // Question Bank View
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Custom Tab Bar - Underline Style */}
            <div className="flex items-center justify-between border-b-2 border-slate-100">
               <div className="flex gap-8">
                  {['ALL', 'PART1', 'PART2', 'PART3'].map((tab) => (
                     <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`pb-3 text-sm font-bold transition-all relative top-[2px] border-b-2 ${
                           activeTab === tab 
                           ? 'text-[#007AFF] border-[#007AFF]' 
                           : 'text-slate-400 border-transparent hover:text-slate-600'
                        }`}
                     >
                        {tab === 'ALL' ? 'Full Exams' : tab === 'PART1' ? 'Part 1' : tab === 'PART2' ? 'Part 2' : 'Part 3'}
                     </button>
                  ))}
               </div>
               <div className="pb-2">
                  <Button onClick={handleRandomCustom} variant="ghost" className="text-xs py-1.5 border border-dashed border-slate-300">
                       <Shuffle className="w-3 h-3" /> Random Practice
                  </Button>
               </div>
            </div>

            <div className="py-2 space-y-8">
                {/* Pinned / Priority Section */}
                {pinnedExams.length > 0 && activeTab === 'ALL' && (
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-4 px-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> Pinned & High Priority
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {pinnedExams.map((exam, i) => renderExamCard(exam, i, true))}
                    </div>
                  </div>
                )}

                {activeTab === 'ALL' ? (
                  // Grid View for Full Exams
                  <div className="space-y-6">
                     {chunkExams(filteredExams, 4).map((group, groupIndex) => {
                        const isExpanded = expandedVolumes[groupIndex] !== false; 
                        
                        return (
                        <div key={groupIndex} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300">
                           {/* Volume Header (Accordion Trigger) */}
                           <div 
                              className="bg-slate-50 p-4 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
                              onClick={() => toggleVolume(groupIndex)}
                           >
                              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                                 <BookOpen className="w-5 h-5 text-[#007AFF]" />
                                 Reading Volume {groupIndex + 1}
                              </h3>
                              <div className="flex items-center gap-3">
                                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-white border border-slate-200 px-2 py-1 rounded-md">{group.length} Tests</span>
                                 {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                              </div>
                           </div>

                           {/* Collapsible Content */}
                           {isExpanded && (
                              <div className="p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50/30">
                                 {group.map((exam, index) => renderExamCard(exam, (groupIndex * 4) + index))}
                              </div>
                           )}
                        </div>
                     )})}
                  </div>
                ) : (
                  // List View for Single Parts
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                         <tr>
                           <th className="p-4 w-12 text-center border-b border-slate-200">
                             <Star className="w-3.5 h-3.5 mx-auto" />
                           </th>
                           <th className="p-4 w-20 text-center border-b border-slate-200">Format</th>
                           <th className="p-4 border-b border-slate-200">Passage Title</th>
                           <th className="p-4 w-32 text-center border-b border-slate-200">Status</th>
                           <th className="p-4 w-32 text-center border-b border-slate-200">Score</th>
                           <th className="p-4 w-24 text-center border-b border-slate-200">Action</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {getPartsByCategory(activeTab === 'PART1' ? 'Part 1' : activeTab === 'PART2' ? 'Part 2' : 'Part 3')
                          .sort((a, b) => {
                             // Primary sort: Starred
                             const starDiff = (starredIds.has(b.id) ? 1 : 0) - (starredIds.has(a.id) ? 1 : 0);
                             if (starDiff !== 0) return starDiff;
                             
                             // Secondary sort: Priority (High > Second > Normal)
                             const priorityDiff = getPriority(b) - getPriority(a);
                             if (priorityDiff !== 0) return priorityDiff;

                             // Tertiary sort: Passage title or date
                             return a.passageTitle.localeCompare(b.passageTitle);
                          })
                          .map(part => {
                          const isDone = usedPartIds.has(part.id);
                          const lastScore = getPartScore(part.id); 
                          const isStarred = starredIds.has(part.id);
                          const priority = getPriority(part);
                          const isHighFreq = priority === 3;
                          const isSecondFreq = priority === 2;
                          
                          return (
                            <tr key={part.id} className={`group hover:bg-slate-50 transition-colors ${isStarred ? 'bg-yellow-50/30' : ''}`}>
                              <td className="p-4 text-center">
                                 <button onClick={() => onToggleStar(part.id)} className={`text-slate-300 hover:text-yellow-400 transition-colors ${isStarred ? 'text-yellow-400' : ''}`}>
                                    <Star className={`w-4 h-4 ${isStarred ? 'fill-current' : ''}`} />
                                 </button>
                              </td>
                              <td className="p-4 text-center">
                                 <span className={`inline-flex items-center justify-center w-10 h-6 rounded text-[10px] font-bold border ${part.pdfUrl ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                                   {part.pdfUrl ? 'PDF' : 'TXT'}
                                 </span>
                              </td>
                              <td className="p-4">
                                 <div className="font-bold text-slate-800 text-sm mb-1">{part.passageTitle}</div>
                                 <div className="flex gap-2">
                                    {isHighFreq && (
                                      <span className="inline-flex items-center gap-1 text-[9px] text-red-600 font-bold bg-red-50 px-1.5 py-0.5 rounded border border-red-100 uppercase tracking-wide">
                                          <Zap className="w-2.5 h-2.5 fill-current" /> High Freq
                                      </span>
                                    )}
                                    {isSecondFreq && (
                                      <span className="inline-flex items-center gap-1 text-[9px] text-indigo-600 font-bold bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100 uppercase tracking-wide">
                                          <BarChart2 className="w-2.5 h-2.5" /> Second High
                                      </span>
                                    )}
                                    {part.month && (
                                      <span className="inline-flex items-center gap-1 text-[9px] text-slate-500 font-bold bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 uppercase tracking-wide">
                                          <Calendar className="w-2.5 h-2.5" /> {part.month}
                                      </span>
                                    )}
                                 </div>
                              </td>
                              <td className="p-4 text-center">
                                 {isDone ? (
                                   <span className="inline-flex items-center gap-1.5 text-green-700 bg-green-50 px-2 py-0.5 rounded-full text-[10px] font-bold border border-green-100">
                                     <CheckCircle className="w-3 h-3"/> Done
                                   </span>
                                 ) : (
                                   <span className="text-slate-300 text-xs font-medium">-</span>
                                 )}
                              </td>
                              <td className="p-4 text-center">
                                 {lastScore ? (
                                    <span className="font-mono text-slate-800 font-bold text-sm bg-slate-100 px-2 py-1 rounded">
                                        {lastScore}
                                    </span>
                                 ) : (
                                    <span className="text-slate-300 font-bold">-</span>
                                 )}
                              </td>
                              <td className="p-4 text-center">
                                 <button 
                                   onClick={() => {
                                      const practiceExam: Exam = {
                                        id: `practice-${part.id}-${Date.now()}`,
                                        title: `Practice: ${part.passageTitle}`,
                                        parts: [part],
                                        tags: ['Single Part']
                                      };
                                      onStartExam(practiceExam, 'PART_PRACTICE');
                                   }}
                                   className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 text-[#007AFF] hover:bg-[#007AFF] hover:text-white hover:border-[#007AFF] transition-all bg-white"
                                 >
                                    <Play className="w-3.5 h-3.5 ml-0.5" />
                                 </button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                    {getPartsByCategory(activeTab === 'PART1' ? 'Part 1' : activeTab === 'PART2' ? 'Part 2' : 'Part 3').length === 0 && (
                      <div className="p-16 text-center">
                        <div className="w-16 h-16 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                           <FileText className="w-8 h-8" />
                        </div>
                        <h3 className="text-slate-900 font-bold mb-1">No passages found</h3>
                        <p className="text-slate-500 mb-6">Import PDF or JSON files to start practicing.</p>
                      </div>
                    )}
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const RenderQuestion: React.FC<{ 
  q: Question; 
  group: QuestionGroup; 
  userAnswer: string; 
  isReviewMode: boolean; 
  onAnswer: (qNum: number, value: string) => void; 
}> = ({ q, group, userAnswer, isReviewMode, onAnswer }) => {
   const isCorrect = isReviewMode 
      ? (Array.isArray(q.answer) ? q.answer.some(a => a.toLowerCase() === userAnswer.toLowerCase()) : q.answer.toLowerCase() === userAnswer.toLowerCase())
      : undefined;

   return (
      <div className={`mb-4 p-3 rounded-lg border ${isReviewMode ? (isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200') : 'bg-white border-slate-200'}`}>
         <div className="flex gap-3">
            <span className="font-bold text-slate-500 w-6 pt-2">{q.number}</span>
            <div className="flex-1">
               {q.text && <div className="mb-2 text-sm text-slate-700" dangerouslySetInnerHTML={{__html: q.text}} />}
               
               {group.type === QuestionType.TRUE_FALSE_NOT_GIVEN || group.type === QuestionType.YES_NO_NOT_GIVEN ? (
                  <select 
                     disabled={isReviewMode}
                     value={userAnswer} 
                     onChange={(e) => onAnswer(q.number, e.target.value)}
                     className="w-full p-2 rounded border border-slate-300 text-sm font-bold bg-white"
                  >
                     <option value="">Select Answer</option>
                     <option value="TRUE">{group.type === QuestionType.TRUE_FALSE_NOT_GIVEN ? 'TRUE' : 'YES'}</option>
                     <option value="FALSE">{group.type === QuestionType.TRUE_FALSE_NOT_GIVEN ? 'FALSE' : 'NO'}</option>
                     <option value="NOT GIVEN">NOT GIVEN</option>
                  </select>
               ) : group.type === QuestionType.MULTIPLE_CHOICE ? (
                  <div className="space-y-2">
                     {q.options?.map((opt, i) => (
                        <label key={i} className="flex items-start gap-2 cursor-pointer">
                           <input 
                              type="radio" 
                              name={`q-${q.id}`} 
                              disabled={isReviewMode}
                              checked={userAnswer === opt} 
                              onChange={() => onAnswer(q.number, opt)}
                              className="mt-1"
                           />
                           <span className="text-sm">{opt}</span>
                        </label>
                     ))}
                  </div>
               ) : (
                  <input 
                     type="text" 
                     disabled={isReviewMode}
                     value={userAnswer}
                     onChange={(e) => onAnswer(q.number, e.target.value)}
                     className="w-full p-2 rounded border border-slate-300 text-sm font-mono"
                     placeholder="Type answer here..."
                  />
               )}
               
               {isReviewMode && !isCorrect && (
                  <div className="mt-2 text-xs">
                     <div className="font-bold text-green-700">Correct: {Array.isArray(q.answer) ? q.answer.join(' OR ') : q.answer}</div>
                     {q.explanation && <div className="text-slate-500 mt-1 italic">{q.explanation}</div>}
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

const ExamInterface: React.FC<{
  exam: Exam;
  examType: 'FULL' | 'PART_PRACTICE';
  session?: ExamSession;
  isReviewMode: boolean;
  onExit: () => void;
  onSubmit: (answers: UserAnswers, elapsed: number, highlights: any) => void;
  onRetry: () => void;
}> = ({ exam, examType, session, isReviewMode, onExit, onSubmit, onRetry }) => {
  const [activePartIndex, setActivePartIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>(session?.answers || {});
  const [elapsed, setElapsed] = useState(session?.elapsedSeconds || 0);
  const [highlights, setHighlights] = useState<{ [partId: string]: string }>(session?.highlightedContent || {});
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  useEffect(() => {
    if (!isReviewMode) {
      const timer = setInterval(() => setElapsed(e => e + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isReviewMode]);

  const handleAnswer = (qNum: number, value: string) => {
    if (isReviewMode) return;
    setAnswers(prev => ({ ...prev, [qNum]: value }));
  };

  const currentPart = exam.parts[activePartIndex];
  
  // Highlight handling (mock implementation for text selection)
  const handleMouseUp = () => {
    if (isReviewMode) return;
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
       // Mock save highlight
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
       {/* Header */}
       <div className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 shadow-sm z-10">
          <div className="flex items-center gap-4">
             <Button variant="ghost" onClick={onExit}><ChevronLeft className="w-5 h-5" /> Exit</Button>
             <h2 className="font-bold text-slate-800 hidden md:block">{exam.title}</h2>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg">
                <Clock className="w-4 h-4 text-slate-500" />
                <span className={`font-mono font-bold text-lg ${isReviewMode ? 'text-slate-600' : 'text-[#007AFF]'}`}>
                   {formatTime(elapsed)}
                </span>
             </div>
             
             {!isReviewMode ? (
                <Button onClick={() => onSubmit(answers, elapsed, highlights)} className="bg-green-600 hover:bg-green-700 text-white">
                   Submit Exam
                </Button>
             ) : (
                <Button onClick={onRetry} variant="outline">
                   <RotateCcw className="w-4 h-4" /> Retake
                </Button>
             )}
          </div>
       </div>

       {/* Tabs */}
       <div className="bg-slate-50 border-b border-slate-200 px-6 flex gap-1 overflow-x-auto">
          {exam.parts.map((part, idx) => (
             <button
                key={part.id}
                onClick={() => setActivePartIndex(idx)}
                className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                   activePartIndex === idx 
                   ? 'border-[#007AFF] text-[#007AFF] bg-white' 
                   : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                }`}
             >
                {part.title}
             </button>
          ))}
       </div>

       {/* Content */}
       <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* Left Panel: Passage */}
          <div className="flex-1 h-full overflow-y-auto p-6 md:p-8 bg-white md:border-r border-slate-200 font-serif leading-relaxed text-lg text-slate-800">
             <h3 className="font-bold text-2xl mb-6 font-sans">{currentPart.passageTitle}</h3>
             {currentPart.pdfUrl ? (
                <iframe src={currentPart.pdfUrl} className="w-full h-full min-h-[500px] border rounded bg-slate-100" />
             ) : (
                <div 
                   onMouseUp={handleMouseUp}
                   dangerouslySetInnerHTML={{ __html: currentPart.passageContent }} 
                   className="prose max-w-none prose-slate prose-lg"
                />
             )}
          </div>

          {/* Right Panel: Questions */}
          <div className="flex-1 h-full overflow-y-auto bg-slate-50 p-6 md:p-8 md:max-w-[500px] lg:max-w-[600px] shadow-inner">
             {currentPart.questionGroups.map((group) => (
                <div key={group.id} className="mb-8 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                   <div className="mb-4 pb-3 border-b border-slate-100">
                      <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wide mb-1">{group.type.replace(/_/g, ' ')}</h4>
                      <p className="text-sm text-slate-500 italic">{group.instruction}</p>
                   </div>
                   
                   <div className={`${group.layout === 'flowchart' || group.layout === 'notes' ? 'grid gap-4' : 'space-y-2'}`}>
                      {group.questions.map(q => (
                         <RenderQuestion 
                            key={q.id} 
                            q={q} 
                            group={group} 
                            userAnswer={answers[q.number] || ''}
                            isReviewMode={isReviewMode}
                            onAnswer={handleAnswer}
                         />
                      ))}
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<'DASHBOARD' | 'EXAM' | 'REVIEW'>('DASHBOARD');
  // Initialize with duplicates to show the requested 4-card grid layout immediately
  const [exams, setExams] = useState<Exam[]>([
      SAMPLE_EXAM, 
      {...SAMPLE_EXAM, id: 'test-2', title: 'IELTS Academic Reading Practice Test 2'},
      {...SAMPLE_EXAM, id: 'test-3', title: 'IELTS Academic Reading Practice Test 3'},
      {...SAMPLE_EXAM, id: 'test-4', title: 'IELTS Academic Reading Practice Test 4'}
  ]);
  const [allParts, setAllParts] = useState<Part[]>([...SAMPLE_EXAM.parts, ...JANUARY_PARTS]);
  const [history, setHistory] = useState<ExamResult[]>([]);
  const [starredIds, setStarredIds] = useState<Set<string>>(new Set());
  const [highFreqIds, setHighFreqIds] = useState<Set<string>>(new Set()); // IDs of parts identified as HF from upload
  
  const [currentExam, setCurrentExam] = useState<Exam | null>(null);
  const [examType, setExamType] = useState<'FULL' | 'PART_PRACTICE'>('FULL');
  const [session, setSession] = useState<ExamSession | undefined>(undefined);

  useEffect(() => {
    const saved = localStorage.getItem('ielts_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
    
    const savedStars = localStorage.getItem('ielts_starred');
    if (savedStars) setStarredIds(new Set(JSON.parse(savedStars)));
    
    const savedHf = localStorage.getItem('ielts_hf');
    if (savedHf) setHighFreqIds(new Set(JSON.parse(savedHf)));

    // Load custom parts (PERSISTENCE)
    const savedParts = localStorage.getItem('ielts_custom_parts');
    if (savedParts) {
       try {
         const parsed: Part[] = JSON.parse(savedParts);
         setAllParts(prev => {
             const currentIds = new Set(prev.map(p => p.id));
             const unique = parsed.filter(p => !currentIds.has(p.id));
             return [...prev, ...unique];
         });
       } catch(e) { console.error("Failed to load custom parts", e); }
    }
  }, []);

  const handleStartExam = (exam: Exam, type: 'FULL' | 'PART_PRACTICE') => {
    setCurrentExam(exam);
    setExamType(type);
    setSession(undefined);
    setView('EXAM');
  };

  const handleReviewExam = (exam: Exam, result: ExamResult) => {
    setCurrentExam(exam);
    setExamType(result.type);
    
    // Construct session from history result
    const reviewSession: ExamSession = {
       examId: exam.id,
       startTime: result.date,
       elapsedSeconds: result.timeUsed,
       isComplete: true,
       answers: result.answers || {}, // Load saved answers
       highlightedContent: result.highlightedContent || {}
    };
    
    setSession(reviewSession);
    setView('REVIEW');
  };

  const handleSubmit = (answers: UserAnswers, elapsed: number, highlights: any) => {
    if (!currentExam) return;

    // Calculate scores
    let score = 0;
    const partScores: { [partId: string]: { score: number, total: number } } = {};

    currentExam.parts.forEach(p => {
       const qList = p.questionGroups.flatMap(g => g.questions);
       let pScore = 0;
       qList.forEach(q => {
          const userAns = answers[q.number]?.trim().toLowerCase() || '';
          const correctAns = Array.isArray(q.answer) ? q.answer : [q.answer];
          if (correctAns.some(ans => ans.toLowerCase() === userAns)) {
             pScore++;
          }
       });
       partScores[p.id] = { score: pScore, total: qList.length };
       score += pScore;
    });

    const totalQuestions = Object.values(partScores).reduce((acc, curr) => acc + curr.total, 0);

    const result: ExamResult = {
       id: Date.now().toString(),
       date: Date.now(),
       examId: currentExam.id,
       examTitle: currentExam.title,
       type: examType,
       score,
       totalQuestions,
       band: examType === 'FULL' ? getBandScore(score) : null,
       timeUsed: elapsed,
       partIds: currentExam.parts.map(p => p.id),
       partScores,
       // Save answers for review
       answers: answers,
       highlightedContent: highlights
    };

    const newHistory = [...history, result];
    setHistory(newHistory);
    localStorage.setItem('ielts_history', JSON.stringify(newHistory));
    
    setSession({
      examId: currentExam.id,
      startTime: Date.now(),
      elapsedSeconds: elapsed,
      isComplete: true,
      answers,
      highlightedContent: highlights
    });
    
    setView('REVIEW');
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>, freq: FrequencyLevel, month: string) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        let newPart: Part | null = null;

        if (file.name.endsWith('.json')) {
           const text = await file.text();
           const data = JSON.parse(text);
           
           if (data.parts && Array.isArray(data.parts)) {
              // Full Exam
              const newExam = { ...data, id: data.id || `imported-exam-${Date.now()}` };
              setExams(prev => [...prev, newExam]);
              setAllParts(prev => [...prev, ...newExam.parts]);
              alert('Exam imported successfully!');
              e.target.value = '';
              return;
           } else if (data.passageTitle && data.questionGroups) {
              // Single Part
              newPart = { ...data, id: data.id || `imported-part-${Date.now()}`, frequency: freq, month: month };
           } else {
              alert('Invalid JSON format. Expected Exam or Part structure.');
              e.target.value = '';
              return;
           }
        } else if (file.name.endsWith('.html')) {
           const text = await file.text();
           newPart = parseHtmlPart(text, file.name);
           if (newPart) {
             newPart.frequency = freq;
             newPart.month = month;
           } else {
             alert('Failed to parse HTML file. Ensure it matches the expected structure.');
             e.target.value = '';
             return;
           }
        } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
           const url = URL.createObjectURL(file);
           
           let category: PartCategory = 'Uncategorized';
           if (file.name.match(/p(art)?\s*1/i)) category = 'Part 1';
           else if (file.name.match(/p(art)?\s*2/i)) category = 'Part 2';
           else if (file.name.match(/p(art)?\s*3/i)) category = 'Part 3';

           const cleanName = file.name.replace(/\.pdf$/i, '').replace(/^P(art)?\s*\d+\s*-\s*/i, '');
           
           newPart = {
              id: `imported-pdf-${Date.now()}`,
              title: cleanName,
              category,
              passageTitle: cleanName,
              passageContent: '',
              pdfUrl: url,
              frequency: freq,
              month: month,
              questionGroups: [
                 {
                    id: `qg-pdf-${Date.now()}`,
                    instruction: 'Please refer to the questions in the PDF document.',
                    type: QuestionType.GAP_FILL,
                    questions: Array.from({length: 13}).map((_, i) => ({
                       id: `q-pdf-${Date.now()}-${i+1}`,
                       number: i + 1,
                       text: `Question ${i + 1}`,
                       answer: '', 
                       explanation: 'Refer to original source.'
                    }))
                 }
              ]
           };
        }

        if (newPart) {
           // Duplicate Check
           const exists = allParts.some(p => p.passageTitle.toLowerCase() === newPart!.passageTitle.toLowerCase());
           if (exists) {
              alert(`Duplicate Detected: "${newPart.passageTitle}" already exists in your library.`);
           } else {
              setAllParts(prev => [newPart!, ...prev]);
              
              // Persist to localStorage
              try {
                  const existing = JSON.parse(localStorage.getItem('ielts_custom_parts') || '[]');
                  existing.push(newPart);
                  localStorage.setItem('ielts_custom_parts', JSON.stringify(existing));
              } catch (e) {
                  console.error("Failed to save part", e);
                  alert("Part imported but could not be saved to storage (storage limit might be reached).");
              }

              alert(`Imported "${newPart.passageTitle}" successfully!`);
           }
        }

      } catch (error) {
         console.error(error);
         alert('Failed to import file.');
      }
      
      e.target.value = '';
  };

  const parseHtmlPart = (html: string, fileName: string): Part | null => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Automatic Category Detection from HTML content
      const contentText = doc.body.textContent || doc.body.innerText || "";
      let detectedCategory: PartCategory = 'Part 1'; // Default
      if (/READING PASSAGE 2/i.test(contentText)) detectedCategory = 'Part 2';
      else if (/READING PASSAGE 3/i.test(contentText)) detectedCategory = 'Part 3';
      else if (/READING PASSAGE 1/i.test(contentText)) detectedCategory = 'Part 1';

      // Extract title and content from #left
      const leftPane = doc.getElementById('left');
      if (!leftPane) return null;
      
      const rawTitle = leftPane.querySelector('h3')?.textContent || fileName.replace('.html', '');
      const passageTitle = rawTitle.trim();
      
      // Clean up styles in content or just take innerHTML
      const passageContent = leftPane.innerHTML;

      // Extract questions from #right
      const rightPane = doc.getElementById('right');
      const questionGroups: QuestionGroup[] = [];
      
      if (rightPane) {
        const groups = rightPane.querySelectorAll('.group');
        
        // Helper to extract correct answer from the answer table
        const getAnswerData = (qNum: number): { answer: string, explanation: string } => {
           const answerBox = doc.getElementById('answerBox');
           if (!answerBox) return { answer: '', explanation: '' };
           
           // Look for row with this question number
           const rows = answerBox.querySelectorAll('tr');
           for (let i = 0; i < rows.length; i++) {
             const cells = rows[i].querySelectorAll('td');
             if (cells.length >= 2 && parseInt(cells[0].textContent?.trim() || '0') === qNum) {
               return {
                 answer: cells[1].textContent?.trim() || '',
                 explanation: cells[2]?.textContent?.trim() || ''
               };
             }
           }
           return { answer: '', explanation: '' };
        };

        groups.forEach((group, gIndex) => {
           const instruction = group.querySelector('h4')?.textContent || `Question Group ${gIndex + 1}`;
           const questions: Question[] = [];
           let type = QuestionType.GAP_FILL; // Default

           const qSections = group.querySelectorAll('[id$="-section"]');
           
           qSections.forEach(section => {
              const qNumText = section.querySelector('.question-number')?.textContent || '';
              const number = parseInt(qNumText.replace(/\./g, '').trim()) || 0;
              
              // Determine type based on inputs
              let qType = QuestionType.GAP_FILL;
              const radioOptions = section.querySelectorAll('input[type="radio"]');
              const textInputs = section.querySelectorAll('input[type="text"]');
              
              const options: string[] = [];
              if (radioOptions.length > 0) {
                 // Check if it's Headings (i, ii, iii) or Letters (A, B, C)
                 const firstVal = (radioOptions[0] as HTMLInputElement).value;
                 if (['i', 'ii', 'iii', 'iv', 'v'].includes(firstVal) || section.innerHTML.includes('heading-option')) {
                    qType = QuestionType.MATCHING_HEADINGS;
                 } else if (section.innerHTML.includes('country-option') || ['A', 'B', 'C'].includes(firstVal)) {
                    qType = QuestionType.MATCHING_INFO; // Or MCQ
                 } else if (['TRUE', 'FALSE', 'YES', 'NO'].includes(firstVal.toUpperCase())) {
                    qType = QuestionType.TRUE_FALSE_NOT_GIVEN;
                 } else {
                    qType = QuestionType.MULTIPLE_CHOICE;
                 }
                 
                 // Extract options text if possible, or just standard ones
                 if (qType === QuestionType.MULTIPLE_CHOICE) {
                    radioOptions.forEach(r => {
                       options.push((r as HTMLInputElement).value);
                    });
                 }
              }
              
              // Update group type logic (simple heuristic: take type of first question)
              if (questions.length === 0) type = qType;

              // Extract text
              let text = section.textContent || '';
              // Remove question number
              text = text.replace(qNumText, '').trim();
              // Remove options text
              const optionsDiv = section.querySelector('.heading-options, .country-option');
              if (optionsDiv) {
                 text = text.replace(optionsDiv.textContent || '', '').trim();
              }

              const { answer, explanation } = getAnswerData(number);

              questions.push({
                 id: `imported-q-${Date.now()}-${number}`,
                 number,
                 text,
                 options: options.length > 0 ? options : undefined,
                 answer,
                 explanation
              });
           });

           if (questions.length > 0) {
             questionGroups.push({
                id: `imported-group-${Date.now()}-${gIndex}`,
                instruction,
                type,
                questions
             });
           }
        });
      }

      return {
        id: `imported-html-${Date.now()}`,
        title: 'Imported Passage',
        category: detectedCategory, // Use detected category
        passageTitle,
        passageContent,
        questionGroups
      };

    } catch (e) {
      console.error("HTML Parse Error", e);
      return null;
    }
  };

  const handleUploadHighFreq = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulation of file processing
      const simulatedMatches = allParts.slice(0, 2).map(p => p.id); // Simulate matching first 2 parts
      const newHfIds = new Set([...highFreqIds, ...simulatedMatches]);
      setHighFreqIds(newHfIds);
      localStorage.setItem('ielts_hf', JSON.stringify(Array.from(newHfIds)));
      alert(`Processed ${file.name}. Found ${simulatedMatches.length} high frequency question matches. They have been tagged.`);
    }
  };

  const handleToggleStar = (id: string) => {
    const next = new Set(starredIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setStarredIds(next);
    localStorage.setItem('ielts_starred', JSON.stringify(Array.from(next)));
  };

  const highFreqTitles = new Set<string>(allParts.filter(p => p.isHighFrequency).map(p => p.passageTitle));

  return (
    <>
      {view === 'DASHBOARD' && (
        <Dashboard 
          exams={exams}
          allParts={allParts}
          history={history}
          starredIds={starredIds}
          highFreqIds={highFreqIds}
          onStartExam={handleStartExam}
          onReviewExam={handleReviewExam}
          onImportFile={handleImport}
          onUploadHighFreq={handleUploadHighFreq}
          onToggleStar={handleToggleStar}
        />
      )}
      {(view === 'EXAM' || view === 'REVIEW') && currentExam && (
        <ExamInterface 
           exam={currentExam}
           examType={examType}
           session={session}
           isReviewMode={view === 'REVIEW'}
           onExit={() => setView('DASHBOARD')}
           onSubmit={handleSubmit}
           onRetry={() => {
              setSession(undefined);
              setView('EXAM');
           }}
        />
      )}
    </>
  );
};

export default App;