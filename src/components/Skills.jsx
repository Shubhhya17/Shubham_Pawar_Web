"use client";

import styles from "../styles/Skills.module.css";

export default function Skills({ theme }) {
  const mainStack = [
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "Node.js", icon: "🟢" },
    { name: "Express", icon: "🚂" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "MongoDB", icon: "🍃" }
  ];

  return (
    <section className={`skills ${theme}`} id="skills">
      <div className="max-width">
        <h2 className="title" data-aos="fade-up">Technical Arsenal</h2>
        
        <div className={styles.bentoGrid}>
          {/* Main Card: Full Stack Expertise */}
          <div className={`${styles.bentoItem} ${styles.stackCard}`} data-aos="fade-up">
            <div className={styles.cardHeader}>
              <span className={styles.cardTag}>Core Stack</span>
              <h3>Full Stack Expertise</h3>
            </div>
            <div className={styles.stackIcons}>
              {mainStack.map((skill, i) => (
                <div key={i} className={styles.stackIconItem}>
                  <span className={styles.icon}>{skill.icon}</span>
                  <span className={styles.name}>{skill.name}</span>
                </div>
              ))}
            </div>
            <p className={styles.cardDesc}>
              Shifting the boundaries of web development by engineering high-performance,
              scalable MERN applications with a focus on modern user experiences.
            </p>
          </div>

          {/* Side Card: UI/UX & Design */}
          <div className={`${styles.bentoItem} ${styles.uiCard}`} data-aos="fade-up" data-aos-delay="100">
             <div className={styles.cardHeader}>
              <span className={styles.cardTag}>Creative</span>
              <h3>UI/UX & Performance</h3>
            </div>
             <div className={styles.skillTags}>
                <span>Clean CSS</span>
                <span>Responsive</span>
                <span>Optimized</span>
                <span>Modern Animation</span>
             </div>
          </div>

          {/* Bottom Card: Engineering Philosophy */}
          <div className={`${styles.bentoItem} ${styles.philosophyCard}`} data-aos="fade-up" data-aos-delay="200">
             <div className={styles.cardHeader}>
                <span className={styles.cardTag}>Approach</span>
                <h3>Engineering Excellence</h3>
             </div>
             <p>Focusing on clean, maintainable architecture and industry-level best practices in every line of code.</p>
          </div>

           {/* Small Card: Git/Tools */}
           <div className={`${styles.bentoItem} ${styles.toolsCard}`} data-aos="fade-up" data-aos-delay="300">
             <div className={styles.cardHeader}>
                <span className={styles.cardTag}>Tools</span>
                <h3>Dev Ecosystem</h3>
             </div>
             <div className={styles.toolsList}>
                <span>Git</span>
                <span>Docker</span>
                <span>Vercel</span>
                <span>Postman</span>
             </div>
          </div>
        </div>

        <div className={styles.ctaWrapper} data-aos="zoom-in">
           <a href="https://github.com/Shubhhya17" target="_blank" className="btn-animated" data-text="View GitHub">
              <span className="hover-text" data-text="View GitHub">View GitHub</span>
              View GitHub
            </a>
        </div>
      </div>
    </section>
  );
}