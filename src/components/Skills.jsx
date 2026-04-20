"use client";

import styles from "../styles/Skills.module.css";

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="max-width">

        <h2 className="title" data-aos="fade-up">My skills</h2>

        <div className={styles.skillsContent}>

          {/* Left Side Text */}

          <div className={`${styles.column} ${styles.left}`} data-aos="fade-right">
            <div className={styles.text}>
              My creative skills & experiences.
            </div>

            <p>
              I have strong hands-on experience in 
              <b> HTML, CSS, JavaScript, React, and Next.js</b>, 
              which allows me to build responsive, scalable, and 
              user-friendly web interfaces.

              I am comfortable working with modern UI layouts,
              component-based architecture, and reusable code patterns.

              I also have experience using 
              <b> Git and GitHub</b> for version control.

              Currently I am learning the <b>MERN stack</b> to expand
              my skills toward full-stack development.
            </p>

            <a
              href="https://github.com/Shubhhya17"
              target="_blank"
            >
              Read more
            </a>
          </div>


          {/* Right Side Skill Bars */}

          <div className={`${styles.column} ${styles.right}`} data-aos="fade-left">

            {/* React */}
            <div className={styles.bars}>
              <div className={styles.info}>
                <span>React</span>
                <span>80%</span>
              </div>
              <div className={`${styles.line} ${styles.React}`}></div>
            </div>

            {/* Next.js */}
            <div className={styles.bars}>
              <div className={styles.info}>
                <span>Next.js</span>
                <span>80%</span>
              </div>
              <div className={`${styles.line} ${styles.Nextjs}`}></div>
            </div>

            {/* JavaScript */}
            <div className={styles.bars}>
              <div className={styles.info}>
                <span>JavaScript</span>
                <span>70%</span>
              </div>
              <div className={`${styles.line} ${styles.JavaScript}`}></div>
            </div>

            {/* CSS */}
            <div className={styles.bars}>
              <div className={styles.info}>
                <span>CSS</span>
                <span>80%</span>
              </div>
              <div className={`${styles.line} ${styles.CSS}`}></div>
            </div>

            {/* Node */}
            <div className={styles.bars}>
              <div className={styles.info}>
                <span>Node</span>
                <span>60%</span>
              </div>
              <div className={`${styles.line} ${styles.Nodejs}`}></div>
            </div>

            {/* MongoDB */}
            <div className={styles.bars}>
              <div className={styles.info}>
                <span>Mongo</span>
                <span>70%</span>
              </div>
              <div className={`${styles.line} ${styles.MongoDB}`}></div>
            </div>

            {/* GitHub */}
            <div className={styles.bars}>
              <div className={styles.info}>
                <span>Git & GitHub</span>
                <span>80%</span>
              </div>
              <div className={`${styles.line} ${styles.GitHub}`}></div>
            </div>

            {/* MySQL */}
            <div className={styles.bars}>
              <div className={styles.info}>
                <span>MySQL</span>
                <span>70%</span>
              </div>
              <div className={`${styles.line} ${styles.MySQL}`}></div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}