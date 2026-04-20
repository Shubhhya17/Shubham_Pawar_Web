"use client";

import styles from "../styles/Skills.module.css";

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="max-width">
        <h2 className="title" data-aos="fade-up">My skills</h2>
        <div className={styles.skillsContent}>
          
          <div className={`${styles.column} ${styles.left}`} data-aos="fade-right">
            <div className={styles.text}>My creative skills & experiences.</div>
            <p>
              I have strong hands-on experience in 
              <b> HTML, CSS, JavaScript, React, and Next.js</b>, which allows me to build responsive, scalable, and user-friendly web interfaces.
              <br/><br/>
              I specialize in <b>MERN stack</b> development, focusing on high-performance applications with clean code architecture and premium UI/UX design.
            </p>
            <a href="https://github.com/Shubhhya17" target="_blank" className="btn-animated" data-text="Read more">
              <span className="hover-text" data-text="Read more">Read more</span>
              Read more
            </a>
          </div>

          <div className={`${styles.column} ${styles.right}`} data-aos="fade-left">
            <div className={styles.bars}>
              <div className={styles.info}><span>React</span><span>95%</span></div>
              <div className={`${styles.line} ${styles.react}`}></div>
            </div>
            <div className={styles.bars}>
              <div className={styles.info}><span>Node.js</span><span>85%</span></div>
              <div className={`${styles.line} ${styles.node}`}></div>
            </div>
            <div className={styles.bars}>
              <div className={styles.info}><span>UI/UX (CSS)</span><span>90%</span></div>
              <div className={`${styles.line} ${styles.uiux}`}></div>
            </div>
            <div className={styles.bars}>
              <div className={styles.info}><span>JavaScript</span><span>92%</span></div>
              <div className={`${styles.line} ${styles.js}`}></div>
            </div>
            <div className={styles.bars}>
              <div className={styles.info}><span>Next.js</span><span>90%</span></div>
              <div className={`${styles.line} ${styles.next}`}></div>
            </div>
            <div className={styles.bars}>
              <div className={styles.info}><span>Git & GitHub</span><span>85%</span></div>
              <div className={`${styles.line} ${styles.git}`}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}