"use client";

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="max-width">

        <h2 className="title">My skills</h2>

        <div className="skills-content">

          {/* Left Side Text */}

          <div className="column left">

            <div className="text">
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

          <div className="column right">

            {/* React */}

            <div className="bars">
              <div className="info">
                <span>React</span>
                <span>80%</span>
              </div>
              <div className="line Java"></div>
            </div>


            {/* Next.js */}

            <div className="bars">
              <div className="info">
                <span>Next.js</span>
                <span>80%</span>
              </div>
              <div className="line HTML"></div>
            </div>


            {/* JavaScript */}

            <div className="bars">
              <div className="info">
                <span>JavaScript</span>
                <span>70%</span>
              </div>
              <div className="line CSS"></div>
            </div>


            {/* CSS */}

            <div className="bars">
              <div className="info">
                <span>CSS</span>
                <span>80%</span>
              </div>
              <div className="line JavaScript"></div>
            </div>


            {/* Node */}

            <div className="bars">
              <div className="info">
                <span>Node</span>
                <span>60%</span>
              </div>
              <div className="line Bootstrap"></div>
            </div>


            {/* MongoDB */}

            <div className="bars">
              <div className="info">
                <span>Mongo</span>
                <span>70%</span>
              </div>
              <div className="line React"></div>
            </div>


            {/* GitHub */}

            <div className="bars">
              <div className="info">
                <span>Git & GitHub</span>
                <span>80%</span>
              </div>
              <div className="line GitHub"></div>
            </div>


            {/* MySQL */}

            <div className="bars">
              <div className="info">
                <span>MySQL</span>
                <span>70%</span>
              </div>
              <div className="line MySQL"></div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}