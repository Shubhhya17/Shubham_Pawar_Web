"use client";

import { useEffect, useState } from "react";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  const [sticky, setSticky] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use mounted to prevent class mismatch during initial hydration
  const navClass = `${styles.navbar} ${mounted && sticky ? styles.sticky : ""}`;
  const menuClass = `${styles.menu} ${mounted && menu ? styles.active : ""}`;

  return (
    <>
      <nav className={navClass}>
        <div className={styles.maxWidth}>
          <div className={styles.logo}>
            <a href="#" suppressHydrationWarning>Portfo<span>lio.</span></a>
          </div>

          <ul className={menuClass}>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>

          <div className={styles.menuBtn} onClick={() => setMenu(!menu)}>
            ☰
          </div>
        </div>
      </nav>
    </>
  );
}