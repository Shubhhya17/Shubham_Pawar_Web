"use client";

import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import styles from "../styles/About.module.css";

export default function About() {
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

  return (
    <section className="about" id="about">
      <div className="max-width">
        <h2 className="title" data-aos="fade-up">About me</h2>

        <div className={styles.aboutContent}>
          {/* Left side image */}
          <div className={`${styles.column} ${styles.left}`} data-aos="fade-right">
            <img src="/images/Pass2.jpg" alt="profile-photo" />
          </div>

          {/* Right side content */}
          <div className={`${styles.column} ${styles.right}`} data-aos="fade-left">
            <div className={styles.text}>
              I have Knowledge in <span><span ref={el}></span></span>
            </div>

            <p>
              I am a passionate software developer who enjoys building modern,
              responsive, and user-friendly web applications. I have hands-on
              experience with HTML, CSS, JavaScript, React, Next.js, and
              Git/GitHub, and I focus on writing clean, maintainable, and
              efficient code.
              <br />
              <br />
              I have worked on real-world projects where I prioritized intuitive
              UI design, seamless user experience, and fully responsive layouts
              across devices. I enjoy solving problems, learning new
              technologies, and continuously improving my development skills.
              <br />
              Currently, I am expanding my expertise by learning the MERN stack
              to strengthen my full-stack development capabilities and gain
              deeper, industry-level experience. I am always eager to take on new
              challenges and contribute to impactful projects.
            </p>

            {/* CV download */}
            <a
              href="https://www.linkedin.com/in/shubham-pawar1703/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}