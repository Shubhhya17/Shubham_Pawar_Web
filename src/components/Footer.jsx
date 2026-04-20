"use client";

import { useEffect, useState } from "react";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  const [viewCount, setViewCount] = useState(null);

  useEffect(() => {
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
        
        <div className={styles.viewCounter}>
          <i className="fas fa-eye"></i>
          <strong>
            {viewCount !== null ? viewCount.toLocaleString() : "..."}
          </strong> 
          <span> Views</span>
        </div>
      </div>
    </footer>
  );
}