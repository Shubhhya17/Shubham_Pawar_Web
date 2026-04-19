"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function About() {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["React", "Next.js", "Node.js", "MongoDB", "Javascript", "Prisma", "Database","CSS", "Github"],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section className="about" id="about">
      <div className="max-width">
        <h2 className="title">About me</h2>

        <div className="about-content">
          {/* Left side image */}
          <div className="column left">
            <img src="/images/Pass2.jpg" alt="profile-photo" />
          </div>

          {/* Right side content */}
          <div className="column right">
            <div className="text">
              I have Knowledge in <span ref={el}></span>
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