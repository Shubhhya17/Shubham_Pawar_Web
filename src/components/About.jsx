"use client";

export default function About() {
  return (
    <section className="about" id="about">

      <div className="max-width">

        <h2 className="title">About me</h2>

        <div className="about-content">

          {/* Left side image */}

          <div className="column left">

            {/* FIX: Next.js image path */}
            <img src="/images/Pass2.jpg" alt="profile-photo" />

          </div>


          {/* Right side content */}

          <div className="column right">

            <div className="text">
              I have Knowledge in <span className="typing-2"></span>
            </div>

            <p>
              I am a passionate software developer who enjoys building modern,
              responsive, and user-friendly web applications.

              I have hands-on experience with
              <b> HTML, CSS, JavaScript, React, Next.js, and Git/GitHub</b>.

              I have worked on real-world projects where I focused on clean UI,
              smooth user experience, and responsive design.

              I am currently learning the <b>MERN stack</b> to enhance my
              full-stack development skills and gain deeper industry-level
              experience.
            </p>

            {/* CV download */}

            <a
              href="https://www.linkedin.com/in/shubham-pawar1703/"
              target="_blank"
            >
              Download CV
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}