"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VolumeHistoryPage() {
  const [history, setHistory] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Load History
    try {
        const h = JSON.parse(localStorage.getItem("ielts_suite_history") || "[]");
        setHistory(h);
    } catch (e) {
        console.error(e);
    }
  }, []);

  function formatDate(isoString) {
      if (!isoString) return "-";
      const d = new Date(isoString);
      return d.toLocaleDateString() + " " + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
      <div className="header header-with-back" style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}>
        <button className="back-button" onClick={() => router.push("/volume")} style={{ marginRight: "15px", background: "none", border: "none", fontSize: "24px", cursor: "pointer" }}>
          ←
        </button>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "700" }}>Test History</h1>
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", overflow: "hidden" }}>
          <div style={{ padding: "15px 20px", borderBottom: "1px solid #f1f5f9", fontWeight: "600", color: "#1e293b" }}>
              All Activities
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead style={{ background: "#f8fafc", color: "#64748b", textAlign: "left" }}>
                  <tr>
                      <th style={{ padding: "12px 20px", fontWeight: "600" }}>DATE</th>
                      <th style={{ padding: "12px 20px", fontWeight: "600" }}>TEST TITLE</th>
                      <th style={{ padding: "12px 20px", fontWeight: "600", textAlign: "center" }}>TYPE</th>
                      <th style={{ padding: "12px 20px", fontWeight: "600", textAlign: "center" }}>SCORE</th>
                      <th style={{ padding: "12px 20px", fontWeight: "600", textAlign: "center" }}>BAND</th>
                      <th style={{ padding: "12px 20px", fontWeight: "600", textAlign: "center" }}>ACTION</th>
                  </tr>
              </thead>
              <tbody>
                  {history.length === 0 ? (
                      <tr>
                          <td colSpan={6} style={{ padding: "30px", textAlign: "center", color: "#94a3b8" }}>No history records found</td>
                      </tr>
                  ) : (
                      history.map((item, index) => (
                          <tr key={index} style={{ borderBottom: "1px solid #f1f5f9" }}>
                              <td style={{ padding: "12px 20px", color: "#64748b" }}>{formatDate(item.date).split(' ')[0]}</td>
                              <td style={{ padding: "12px 20px", fontWeight: "500", color: "#1e293b" }}>
                                  IELTS Academic Reading Practice Test {item.testIndex + 1} (Volume {item.volumeIndex + 1})
                              </td>
                              <td style={{ padding: "12px 20px", textAlign: "center" }}>
                                  <span style={{ background: "#1e293b", color: "#fff", fontSize: "11px", padding: "2px 8px", borderRadius: "10px", fontWeight: "600" }}>FULL TEST</span>
                              </td>
                              <td style={{ padding: "12px 20px", textAlign: "center", color: "#64748b" }}>{item.score} / {item.total}</td>
                              <td style={{ padding: "12px 20px", textAlign: "center", color: "#3b82f6", fontWeight: "700" }}>{item.band}</td>
                              <td style={{ padding: "12px 20px", textAlign: "center" }}>
                                  <button 
                                    onClick={() => handleDeleteHistory(index)}
                                    style={{ 
                                        background: "none", 
                                        border: "none", 
                                        color: "#ef4444", 
                                        cursor: "pointer",
                                        fontSize: "14px",
                                        fontWeight: "500"
                                    }}
                                  >
                                    Delete
                                  </button>
                              </td>
                          </tr>
                      ))
                  )}
              </tbody>
          </table>
      </div>
    </div>
  );
}
