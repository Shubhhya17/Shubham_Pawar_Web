"use client";

import { useEffect, useState } from "react";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    // 1. Increment view count on mount (post to /api/views)
    const updateViews = async () => {
      try {
        const res = await fetch("/api/views", { method: "POST" });
        const data = await res.json();
        if (data.count) setViewCount(data.count);
      } catch (err) {
        console.error("Failed to update view count:", err);
      }
    };

    updateViews();
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <span>
          Created By <a href="#">Shubham Pawar</a> |{" "}
          <span className="far fa-copyright"></span> 2026 All rights reserved.
        </span>
        {viewCount > 0 && (
          <div className={styles.viewCounter}>
            <i className="fas fa-eye"></i>
            <span>{viewCount.toLocaleString()} Views</span>
          </div>
        )}
      </div>
    </footer>
  );
}