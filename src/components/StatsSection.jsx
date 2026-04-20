"use client";

import { useEffect, useState } from "react";
import styles from "../styles/StatsSection.module.css";

// ── Icons (SVG) ─────────────────────────────────────────────────────────────
const IconGitHub = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);

const IconEye = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

export default function StatsSection() {
    const [viewCount, setViewCount] = useState(null);

    useEffect(() => {
        const fetchViews = async () => {
            try {
                const res = await fetch("/api/views");
                const data = await res.json();
                if (data.count) setViewCount(data.count);
            } catch (err) {
                console.error("Failed to fetch views:", err);
            }
        };
        fetchViews();
    }, []);

    return (
        <section className={styles.statsSection} id="stats">
            <div className="max-width">
                <h2 className="title" data-aos="fade-up">Activity & Metrics</h2>

                <div className={styles.statsContainer}>
                    {/* GitHub Info */}
                    <div className={styles.statCard} data-aos="fade-right">
                        <div className={styles.header}>
                            <IconGitHub />
                            <h3>GitHub Stats</h3>
                        </div>
                        <div className={styles.githubContent}>
                            <img
                                src="https://github-readme-stats.vercel.app/api?username=Shubhhya17&show_icons=true&theme=radical&hide_border=true&bg_color=111&title_color=dc143c&icon_color=dc143c&text_color=eee"
                                alt="GitHub Stats"
                                className={styles.statsImg}
                            />
                        </div>
                    </div>

                    {/* View Count Card */}
                    <div className={styles.statCard} data-aos="fade-left">
                        <div className={styles.header}>
                            <IconEye />
                            <h3>Site Analytics</h3>
                        </div>
                        <div className={styles.viewsContent}>
                            <p className={styles.viewLabel}>Total Portfolio Reach</p>
                            <h2 className={styles.viewCountBold}>
                                {viewCount !== null ? viewCount.toLocaleString() : "..."}
                            </h2>
                            <p className={styles.viewSub}>Visitors Engaged with this Portfolio</p>
                        </div>
                    </div>
                </div>

                <div className={styles.githubLanguages} data-aos="fade-up">
                    <img
                        src="https://github-readme-stats.vercel.app/api/top-langs/?username=Shubhhya17&layout=compact&theme=radical&hide_border=true&bg_color=111&title_color=dc143c&icon_color=dc143c&text_color=eee"
                        alt="Top Languages"
                        className={styles.statsImg}
                    />
                </div>
            </div>
        </section>
    );
}
