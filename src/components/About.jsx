"use client";

import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import styles from "../styles/About.module.css";

export default function About({ theme }) {
  const el = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !el.current) return;
    
    const typed = new Typed(el.current, {
      strings: ["React", "Next.js", "Node.js", "MongoDB", "Javascript", "Prisma", "Database", "CSS", "Github"],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, [mounted]);

  const metricsData = [
    { label: "Experience", value: "2+ Years", icon: "fas fa-code-branch" },
    { label: "Projects", value: "15+ Shipped", icon: "fas fa-rocket" },
    { label: "Availability", value: "Open for Hire", icon: "fas fa-calendar-check" },
  ];

  return (
    <section className={`about ${theme}`} id="about">
      <div className="max-width">
        <h2 className="title" data-aos="fade-up">About Me</h2>

        <div className={styles.aboutContent}>
          {/* Left: 3D Portrait Frame */}
          <div 
            className={styles.left} 
            data-aos="fade-right"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const rotateX = ((y - centerY) / centerY) * -8;
              const rotateY = ((x - centerX) / centerX) * 8;

              e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
              e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
              e.currentTarget.style.setProperty("--rotate-x", `${rotateX}deg`);
              e.currentTarget.style.setProperty("--rotate-y", `${rotateY}deg`);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.setProperty("--rotate-x", `0deg`);
              e.currentTarget.style.setProperty("--rotate-y", `0deg`);
            }}
          >
            <div className={styles.portraitWrapper}>
              <div className={styles.glare}></div>
              <img src="/images/Pass2.jpg" alt="Shubham Pawar - Full Stack Developer" className={styles.portraitImg} />
              <div className={styles.frameDecoration}></div>
            </div>
          </div>

          {/* Right side content */}
          <div className={`${styles.column} ${styles.right}`} data-aos="fade-left">
            <div className={styles.text}>
              Engineering Specialist in <span className={styles.typedText}><span ref={el}></span></span>
            </div>

            <div className={styles.bioContainer}>
              <p className={styles.bioText}>
                I am a passionate <span className={styles.highlight}>Software Developer</span> who thrives at the intersection of robust engineering and 
                intuitive user experience. With a focus on <span className={styles.highlight}>modern architecture</span> and 
                performance optimization, I build applications that are not just functional, but cinematic.
              </p>
              
              <p className={styles.bioText}>
                My development philosophy centers on writing <span className={styles.highlight}>clean, maintainable code</span> while 
                continuously evolving through the MERN stack ecosystem to solve complex, high-scale challenges.
              </p>
            </div>

            {/* Life Metrics Bento */}
            <div className={styles.metricsGrid} data-aos="fade-up">
              {metricsData.map((metric, index) => (
                <div key={index} className={styles.metricCard}>
                  <i className={metric.icon}></i>
                  <div className={styles.metricInfo}>
                    <span className={styles.mValue}>{metric.value}</span>
                    <span className={styles.mLabel}>{metric.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Premium CTA */}
            <div className={styles.ctaArea} data-aos="fade-up">
              <a
                href="https://www.linkedin.com/in/shubham-pawar1703/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cvButton}
              >
                <span>Download CV Portfolio</span>
                <i className="fas fa-download"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}