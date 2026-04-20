"use client";

import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>
        Created By <a href="#">Shubham Pawar</a> |{" "}
        <span className="far fa-copyright"></span> 2026 All rights reserved.
      </span>
    </footer>
  );
}