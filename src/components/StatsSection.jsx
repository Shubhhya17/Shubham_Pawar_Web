"use client";

import { useEffect, useState } from "react";
import styles from "../styles/StatsSection.module.css";

const IconGitHub = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const IconEye = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

export default function StatsSection({ theme }) {
  const [viewCount, setViewCount] = useState(null);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const res = await fetch("/api/views");
        const data = await res.json();
        if (data.count) setViewCount(data.count);
      } catch (err) { console.error("Failed to fetch views:", err); }
    };
    fetchViews();
  }, []);

  const themeStr = "&theme=radical&hide_border=true&bg_color=0d0d0d&title_color=dc143c&icon_color=dc143c&text_color=eee";

  return (
    <section className={`${styles.statsSection} ${theme}`} id="stats">
      <div className="max-width">
        <h2 className={`${styles.title} title`} data-aos="fade-up">Open Source & Community Impact</h2>

        {/* Top Row: GitHub Stats (Side by Side) */}
        <div className={styles.statsRow} data-aos="fade-up">
          <div className={styles.statCardSmall}>
            <div className={styles.header}><IconGitHub /><span>Shubhhya17</span></div>
            <img 
              src={`https://github-readme-stats.vercel.app/api?username=Shubhhya17&show_icons=true${themeStr}`} 
              alt="Personal Stats" 
              className={styles.statsImg}
            />
          </div>
          <div className={styles.statCardSmall}>
            <div className={styles.header}><IconGitHub /><span>Frontend2-Bondsmart</span></div>
            <img 
              src={`https://github-readme-stats.vercel.app/api?username=frontend2-bondsmart&show_icons=true${themeStr}`} 
              alt="Company Stats" 
              className={styles.statsImg}
            />
          </div>
        </div>

        {/* Bottom Row: Languages and Views (Side by Side) */}
        <div className={styles.statsRow} data-aos="fade-up">
           <div className={styles.statCardSmall}>
             <img 
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=Shubhhya17&layout=compact${themeStr}`} 
              alt="Top Langs" 
              className={styles.statsImg}
            />
           </div>
           <div className={`${styles.statCardSmall} ${styles.viewCard}`}>
             <div className={styles.viewBox}>
               <div className={styles.viewHeader}>
                 <IconEye />
                 <span>Portfolio Analytics</span>
               </div>
               <div className={styles.viewMain}>
                 <span className={styles.boldViews}>{viewCount !== null ? viewCount.toLocaleString() : "..."}</span>
                 <span className={styles.viewLabel}>Total Portfolio Views</span>
               </div>
               <div className={styles.viewSubtext}>
                 Updated in real-time from our private database
               </div>
             </div>
           </div>
        </div>

      </div>
    </section>
  );
}
