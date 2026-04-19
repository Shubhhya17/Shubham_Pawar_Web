"use client";

import { useEffect, useRef, useState } from "react";

export default function Career() {
  const [fillHeight, setFillHeight] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const start = viewportHeight / 1.5;
      const end = viewportHeight / 3;
      
      let progress = 0;
      if (rect.top < start) {
        progress = ((start - rect.top) / (rect.height + start - end)) * 100;
      }
      
      setFillHeight(Math.min(Math.max(progress, 0), 100));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="career" id="career" ref={sectionRef}>
      <div className="max-width">
        <h2 className="title" data-aos="fade-up">My Career</h2>

        <div className="timeline-container">
          <div className="timeline-line">
            <div 
                className="timeline-fill" 
                style={{ height: `${fillHeight}%` }}
            ></div>
          </div>

          <div className="timeline-items">
            {/* 2021 Milestone */}
            <div className="timeline-item" data-aos="fade-right">
              <div className="timeline-dot"></div>
              <div className="timeline-year">2021</div>
              <div className="timeline-content">
                <div className="timeline-card">
                  <div className="card-info">
                    <h3>Diploma in Engineering</h3>
                    <p>Foundation of my technical journey.</p>
                  </div>
                  <div className="card-image">
                    <img src="/images/wall1.jpg" alt="Academy building" />
                  </div>
                </div>
                <div className="timeline-desc" data-aos="fade-left">
                    <p>
                        Solving complex challenges with software and AI. My diploma journey shaped my adaptability, 
                        discipline, and technical acumen, preparing me for the next phase in my learning and career.
                    </p>
                </div>
              </div>
            </div>

            {/* 2024 Milestone */}
            <div className="timeline-item" data-aos="fade-right">
              <div className="timeline-dot"></div>
              <div className="timeline-year">2024</div>
              <div className="timeline-content">
                <div className="college-header">
                    <h3>Dr. Rajendra Gode Institute of Technology &amp; Research, Amravati</h3>
                    <h4>(BE in Computer Science &amp; Engineering)</h4>
                    <p className="cgpa">2021-2024 (CGPA : 8.3)</p>
                </div>
                
                <div className="timeline-grid">
                    <div className="grid-image" data-aos="zoom-in">
                         <img src="/images/wall1.jpg" alt="College Building" />
                    </div>
                    <div className="grid-desc" data-aos="fade-left">
                        <p>
                            Graduating with a BE in Computer Science &amp; Engineering marks the first major milestone in my 
                            professional journey. These years have been transformative, equipping me with expertise in 
                            software development, AI, and backend technologies.
                        </p>
                    </div>
                </div>

                <div className="timeline-grid reverse">
                    <div className="grid-desc" data-aos="fade-right">
                        <p>
                            From hands-on projects to real-world problem-solving, I have honed my technical and analytical 
                            skills. This phase has not only shaped my knowledge but also strengthened my adaptability 
                            and passion for innovation.
                        </p>
                    </div>
                    <div className="grid-image" data-aos="zoom-in">
                         <img src="/images/wall1.jpg" alt="Project presentation" />
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* === Career section: white background, matches portfolio pattern === */
        .career {
          background: #fff;
          color: #111;
          font-family: 'Poppins', sans-serif;
        }

        /* Title underline dot — matches other sections */
        .career .title::after {
          content: "my journey";
          background: #fff;
        }

        .timeline-container {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: 50px 0;
        }

        /* === Vertical line background track === */
        .timeline-line {
          position: absolute;
          left: 150px;
          top: 0;
          width: 4px;
          height: 100%;
          background: #eee;
          border-radius: 2px;
        }

        /* === RED fill slider === */
        .timeline-fill {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          background: crimson;
          box-shadow: 0 0 12px rgba(220, 20, 60, 0.5);
          border-radius: 2px;
          transition: height 0.08s ease-out;
        }

        .timeline-items {
          position: relative;
        }

        .timeline-item {
          display: flex;
          margin-bottom: 120px;
          position: relative;
        }

        /* === Dot on the line === */
        .timeline-dot {
          position: absolute;
          left: 142px;
          top: 12px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
          border: 4px solid #ccc;
          z-index: 2;
          transition: border-color 0.3s, transform 0.3s;
        }

        .timeline-item:hover .timeline-dot {
          border-color: crimson;
          transform: scale(1.2);
        }

        /* === Year label — crimson to match portfolio accent === */
        .timeline-year {
          width: 120px;
          font-size: 40px;
          font-weight: 700;
          color: crimson;
          text-align: right;
          margin-right: 60px;
          line-height: normal;
          font-family: 'Ubuntu', sans-serif;
        }

        .timeline-content {
          flex: 1;
        }

        .timeline-card {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
        }

        /* === Cards: dark background like about/skills sections === */
        .card-info {
          background: #111;
          color: #fff;
          padding: 20px;
          border-radius: 10px;
          flex: 1;
          border-left: 4px solid crimson;
        }

        .card-info h3 {
          color: #fff;
          margin-bottom: 8px;
          font-size: 18px;
        }

        .card-info p {
          color: #ccc;
          font-size: 14px;
        }

        .card-image img, .grid-image img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 10px;
        }

        .card-image {
          width: 300px;
        }

        .timeline-desc {
          background: #f5f5f5;
          border-left: 3px solid crimson;
          padding: 20px;
          border-radius: 6px;
          font-size: 15px;
          color: #333;
          line-height: 1.7;
        }

        /* === College header === */
        .college-header {
          margin-bottom: 20px;
        }

        .college-header h3 {
          color: crimson;
          margin-bottom: 5px;
          font-weight: 600;
          font-size: 18px;
        }

        .college-header h4 {
          font-size: 16px;
          font-weight: 500;
          color: #444;
          margin-bottom: 4px;
        }

        .cgpa {
          font-size: 14px;
          color: #666;
          margin-bottom: 20px;
        }

        .timeline-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .grid-desc {
          background: #111;
          color: #ddd;
          padding: 20px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          font-size: 15px;
          line-height: 1.6;
        }

        /* === Responsive === */
        @media (max-width: 947px) {
          .timeline-line { left: 20px; }
          .timeline-dot { left: 12px; }
          .timeline-year {
            width: auto;
            margin-right: 0;
            position: absolute;
            top: -40px;
            left: 50px;
            font-size: 30px;
          }
          .timeline-item {
            flex-direction: column;
            padding-left: 50px;
            padding-top: 50px;
          }
          .timeline-card { flex-direction: column; }
          .card-image { width: 100%; }
          .timeline-grid { grid-template-columns: 1fr; }
          .timeline-grid.reverse {
            display: flex;
            flex-direction: column-reverse;
          }
        }
      `}</style>
    </section>
  );
}