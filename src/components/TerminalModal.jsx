"use client";

import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import styles from "../styles/TerminalModal.module.css";

export default function TerminalModal() {
  const [active, setActive] = useState(false);
  const [inputBuffer, setInputBuffer] = useState("");
  const terminalRef = useRef(null);

  const TRIGGER = "sudo hire-shubham";

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Build buffer
      const key = e.key.toLowerCase();
      if (key.length === 1 || key === " " || key === "-") {
        setInputBuffer(prev => {
          const newBuffer = (prev + (key === " " ? " " : key)).slice(-TRIGGER.length);
          if (newBuffer === TRIGGER) {
            triggerTerminal();
          }
          return newBuffer;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const triggerTerminal = () => {
    setActive(true);
    setInputBuffer("");
    
    // ✨ EPIC HACKER CONFETTI
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#00ff00', '#ffffff']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#00ff00', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const closeTerminal = () => setActive(false);

  const scrollToContact = () => {
    setActive(false);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  if (!active) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.terminal} ref={terminalRef}>
        <div className={styles.header}>
          <div className={styles.dots}>
            <span className={styles.red} onClick={closeTerminal}></span>
            <span className={styles.yellow}></span>
            <span className={styles.green}></span>
          </div>
          <div className={styles.title}>root@shubham: ~</div>
        </div>
        
        <div className={styles.content}>
          <div className={styles.line}><span className={styles.prompt}>$</span> sudo hire-shubham</div>
          <div className={styles.scanning}>[SYSTEM]: Analyzing candidate potential...</div>
          <div className={styles.result}>[SUCCESS]: Access Granted. Elite Developer Found.</div>
          
          <div className={styles.bigText}>ACCESS GRANTED</div>
          
          <p className={styles.desc}>
            Congratulations! You've unlocked the developer secret mode. 
            Shubham is ready to join your team and build digital excellence.
          </p>

          <div className={styles.actions}>
            <button className={styles.hireBtn} onClick={scrollToContact}>
              {"> "} HIRE ME NOW
            </button>
            <button className={styles.cancelBtn} onClick={closeTerminal}>
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
