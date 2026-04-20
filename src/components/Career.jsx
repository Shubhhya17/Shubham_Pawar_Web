"use client";

import { useEffect, useRef, useState } from "react";

export default function Career() {
  const [fillHeight, setFillHeight] = useState(0);
  const [activeIndices, setActiveIndices] = useState([]);
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate progress more accurately based on section visibility
      const sectionStart = rect.top;
      const sectionHeight = rect.height;
      const viewScroll = viewportHeight / 2; // Midpoint as trigger
      
      let progress = 0;
      if (sectionStart < viewScroll) {
        progress = ((viewScroll - sectionStart) / sectionHeight) * 100;
      }
      
      setFillHeight(Math.min(Math.max(progress, 0), 100));

      // Dynamic dot activation
      const newActiveIndices = [];
      itemRefs.current.forEach((ref, index) => {
        if (ref) {
          const itemRect = ref.getBoundingClientRect();
          if (itemRect.top < viewScroll + 50) {
            newActiveIndices.push(index);
          }
        }
      });
      setActiveIndices(newActiveIndices);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const milestones = [
    {
      year: "2021",
      title: "Diploma in Engineering",
      subtitle: "Foundation of my technical journey.",
      description: "Solving complex challenges with software and AI. My diploma journey shaped my adaptability, discipline, and technical acumen.",
      image: "/images/wall1.jpg"
    },
    {
      year: "2024",
      title: "Dr. Rajendra Gode Institute",
      degree: "BE in Computer Science & Engineering",
      cgpa: "2021-2024 (CGPA : 8.3)",
      gridItems: [
        {
          desc: "Graduating with a BE in Computer Science & Engineering marks the first major milestone. These years were transformative, equipping me with expertise in software development and AI.",
          img: "/images/wall1.jpg"
        },
        {
          desc: "From hands-on projects to real-world problem-solving, I honed my analytical skills, strengthening my passion for innovation.",
          img: "/images/wall1.jpg"
        }
      ]
    },
    {
      year: "May '24",
      role: "Full-Stack Developer Intern",
      company: "Aivariant",
      meta: "May 2024 – Oct 2024 · 6 months · Full-time",
      tags: ["Java", "JavaScript", "React", "MySQL"],
      description: "Gained hands-on experience building full-stack web applications. Delivered features end-to-end, from database design to responsive UI."
    },
    {
      year: "Nov '24",
      role: "Frontend Developer",
      company: "mr.chams",
      meta: "Nov 2024 – Nov 2025 · 1 yr 1 mo · Full-time · Hyderabad",
      tags: ["Next.js", "React.js", "REST APIs", "GitHub"],
      description: "Spearheaded frontend development for Zaanvar.com and Rconspace. Built pixel-perfect, responsive UIs and integrated complex REST APIs."
    },
    {
      year: "Feb '26",
      role: "Software Developer",
      company: "Ideas To Impacts",
      meta: "Feb 2026 – Present · Full-time · Pune",
      tags: ["React.js", "Node.js", "PostgreSQL", "Express.js"],
      description: "Working as a Software Developer building Bondsmart.com — a digital investment platform for fixed-income corporate bonds.",
      current: true
    }
  ];

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
            {milestones.map((item, index) => (
              <div 
                key={index} 
                className="timeline-item" 
                data-aos="fade-up"
                ref={el => itemRefs.current[index] = el}
              >
                <div className={`timeline-dot ${activeIndices.includes(index) ? 'active' : ''}`}></div>
                <div className="timeline-year">{item.year}</div>
                
                <div className="timeline-content">
                  {/* Experience Card */}
                  {item.role ? (
                    <div className={`exp-card ${item.current ? 'current' : ''}`}>
                      <div className="exp-header">
                        <div className="exp-role">{item.role}</div>
                        <div className="exp-company">{item.company}</div>
                        <div className="exp-meta">{item.meta}</div>
                        {item.current && <span className="current-badge">Current</span>}
                      </div>
                      <div className="exp-body">
                        <p>{item.description}</p>
                        <div className="exp-tags">
                          {item.tags.map(tag => <span key={tag}>{tag}</span>)}
                        </div>
                      </div>
                    </div>
                  ) : item.gridItems ? (
                    /* College/Education Grid */
                    <div className="edu-content">
                        <div className="college-header">
                            <h3>{item.title}</h3>
                            <h4>({item.degree})</h4>
                            <p className="cgpa">{item.cgpa}</p>
                        </div>
                        {item.gridItems.map((grid, gIdx) => (
                            <div key={gIdx} className={`timeline-grid ${gIdx % 2 !== 0 ? 'reverse' : ''}`}>
                                <div className="grid-image">
                                    <img src={grid.img} alt="Education" />
                                </div>
                                <div className="grid-desc">
                                    <p>{grid.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                  ) : (
                    /* Diploma/Simple Milestone */
                    <div className="milestone-content">
                      <div className="timeline-card">
                        <div className="card-info">
                          <h3>{item.title}</h3>
                          <p>{item.subtitle}</p>
                        </div>
                        <div className="card-image">
                          <img src={item.image} alt={item.title} />
                        </div>
                      </div>
                      <div className="timeline-desc">
                        <p>{item.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .career {
          background: #0a0a0a;
          color: #fff;
          font-family: 'Poppins', sans-serif;
          overflow: hidden;
        }

        .career .title::after {
          content: "my journey";
          background: #0a0a0a;
        }

        .career .title::before {
            background: #fff;
        }

        .timeline-container {
          position: relative;
          max-width: 1100px;
          margin: 0 auto;
          padding: 80px 0;
        }

        .timeline-line {
          position: absolute;
          left: 170px;
          top: 0;
          width: 2px;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }

        .timeline-fill {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          background: linear-gradient(to bottom, transparent, crimson, crimson);
          box-shadow: 0 0 15px crimson;
          border-radius: 2px;
          transition: height 0.1s ease-out;
        }

        .timeline-item {
          display: flex;
          margin-bottom: 100px;
          position: relative;
          z-index: 1;
        }

        .timeline-dot {
          position: absolute;
          left: 161px;
          top: 15px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #1a1a1a;
          border: 3px solid #333;
          z-index: 2;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .timeline-dot.active {
          border-color: crimson;
          background: crimson;
          transform: scale(1.3);
          box-shadow: 0 0 15px crimson;
        }

        .timeline-year {
          width: 140px;
          font-size: 32px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.3);
          text-align: right;
          margin-right: 60px;
          line-height: 1;
          font-family: 'Ubuntu', sans-serif;
          transition: color 0.4s;
          padding-top: 10px;
        }

        .timeline-item:hover .timeline-year,
        .timeline-item .timeline-dot.active + .timeline-year {
          color: crimson;
        }

        .timeline-content {
          flex: 1;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          transition: transform 0.3s, border-color 0.3s;
        }

        .timeline-item:hover .timeline-content {
          transform: translateY(-5px);
          border-color: rgba(220, 20, 60, 0.3);
        }

        .exp-card.current {
          border-left: 4px solid crimson;
          background: rgba(220, 20, 60, 0.05);
        }

        .exp-role {
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 5px;
        }

        .exp-company {
          font-size: 18px;
          font-weight: 600;
          color: crimson;
          margin-bottom: 8px;
        }

        .exp-meta {
          font-size: 13px;
          color: #888;
          margin-bottom: 15px;
        }

        .current-badge {
          display: inline-block;
          background: crimson;
          color: #fff;
          font-size: 10px;
          padding: 3px 10px;
          border-radius: 20px;
          font-weight: 700;
          text-transform: uppercase;
          margin-top: 5px;
        }

        .exp-body p {
          color: #ccc;
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .exp-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .exp-tags span {
          background: rgba(255, 255, 255, 0.05);
          color: #ddd;
          font-size: 12px;
          padding: 5px 15px;
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .college-header h3 {
          color: crimson;
          font-size: 20px;
          margin-bottom: 5px;
        }

        .college-header h4 {
          color: #eee;
          font-size: 16px;
          margin-bottom: 5px;
        }

        .cgpa {
          color: #888;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .timeline-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 20px;
        }

        .grid-image img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: 15px;
        }

        .grid-desc {
          display: flex;
          align-items: center;
          color: #ccc;
          font-size: 14px;
          line-height: 1.6;
        }

        .timeline-card {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
        }

        .card-info h3 {
          font-size: 20px;
          margin-bottom: 10px;
        }

        .card-info p {
          color: #888;
          font-size: 14px;
        }

        .card-image img {
          width: 200px;
          height: 120px;
          object-fit: cover;
          border-radius: 10px;
        }

        .timeline-desc {
          color: #ccc;
          font-size: 14px;
          line-height: 1.7;
          padding-top: 15px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        @media (max-width: 947px) {
          .timeline-line { left: 30px; }
          .timeline-dot { left: 21px; }
          .timeline-year {
            position: absolute;
            top: -35px;
            left: 60px;
            text-align: left;
            font-size: 24px;
            width: auto;
          }
          .timeline-item {
            flex-direction: column;
            padding-left: 60px;
          }
          .timeline-content {
            padding: 20px;
          }
          .timeline-grid {
            grid-template-columns: 1fr;
          }
          .timeline-grid.reverse {
            display: flex;
            flex-direction: column-reverse;
          }
          .timeline-card {
            flex-direction: column;
          }
          .card-image img {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}