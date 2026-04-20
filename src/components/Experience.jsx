"use client";

import { useEffect, useRef, useState } from "react";

export default function Experience() {
  const [fillHeight, setFillHeight] = useState(0);
  const sectionRef = useRef(null);
  
  const experiences = [
    {
      role: "Software Developer",
      company: "Ideas To Impacts",
      period: "Feb 2026 – Present",
      location: "Pune, India (On-site)",
      description: "Developing Bondsmart.com — a digital investment platform for fixed-income corporate bonds. Focusing on security, scalability, and seamless user experience.",
      skills: ["React.js", "Node.js", "PostgreSQL", "Express.js"],
      current: true,
    },
    {
      role: "Frontend Developer",
      company: "mr.chams",
      period: "Nov 2024 – Nov 2025",
      location: "Hyderabad, India (On-site)",
      description: "Spearheaded frontend development for Zaanvar.com and Rconspace. Built responsive UIs and integrated complex REST APIs for pet marketplaces and ERP platforms.",
      skills: ["Next.js", "React.js", "REST APIs", "GitHub"],
    },
    {
      role: "Full-Stack Developer Intern",
      company: "Aivariant",
      period: "May 2024 – Oct 2024",
      location: "Remote",
      description: "Gained hands-on experience building full-stack web applications. Worked with Java, JavaScript, React, and MySQL for database design and feature delivery.",
      skills: ["Java", "JavaScript", "React", "MySQL"],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate progress based on section visibility
      const sectionStart = rect.top;
      const sectionHeight = rect.height;
      const triggerPoint = viewportHeight * 0.7; // Start filling when section is 70% in view
      
      let progress = 0;
      if (sectionStart < triggerPoint) {
        progress = ((triggerPoint - sectionStart) / (sectionHeight - (viewportHeight - triggerPoint))) * 100;
      }
      
      setFillHeight(Math.min(Math.max(progress, 0), 100));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="experience" id="experience" ref={sectionRef}>
      <div className="max-width">
        <h2 className="title" data-aos="fade-up">Work Experience</h2>
        
        <div className="experience-container">
          {/* Animated Slider Line */}
          <div className="timeline-line">
            <div 
              className="timeline-fill" 
              style={{ height: `${fillHeight}%` }}
            ></div>
          </div>

          <div className="experience-content">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className={`experience-card ${exp.current ? 'current' : ''}`}
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              >
                <div className="card-dot"></div>
                <div className="card-inner">
                  <div className="card-header">
                    <div className="role-container">
                      <h3>{exp.role}</h3>
                      {exp.current && <span className="current-badge">Current</span>}
                    </div>
                    <div className="company-info">
                      <span className="company">{exp.company}</span>
                      <span className="dot"></span>
                      <span className="period">{exp.period}</span>
                    </div>
                    <div className="location">{exp.location}</div>
                  </div>
                  <div className="card-body">
                    <p>{exp.description}</p>
                    <div className="skills-container">
                      {exp.skills.map((skill, sIndex) => (
                        <span key={sIndex} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .experience {
          background: #ffffff;
          color: #111;
          font-family: 'Poppins', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .experience .title::after {
          content: "my journey";
          background: #ffffff;
          color: crimson;
        }

        .experience .title::before {
          background: #111;
        }

        .experience-container {
          position: relative;
          margin-top: 50px;
          padding-left: 50px;
        }

        .timeline-line {
          position: absolute;
          left: 20px;
          top: 0;
          width: 4px;
          height: 100%;
          background: #f0f0f0;
          border-radius: 10px;
        }

        .timeline-fill {
          position: absolute;
          top: 0;
          width: 100%;
          background: crimson;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(220, 20, 60, 0.3);
          transition: height 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67); /* Smooth roller effect */
        }

        .experience-content {
          display: flex;
          flex-direction: column;
          gap: 50px;
        }

        .experience-card {
          position: relative;
          width: 100%;
        }

        .card-dot {
          position: absolute;
          left: -37px;
          top: 30px;
          width: 18px;
          height: 18px;
          background: #fff;
          border: 4px solid #f0f0f0;
          border-radius: 50%;
          z-index: 2;
          transition: all 0.3s ease;
        }

        .experience-card.current .card-dot {
          border-color: crimson;
          background: crimson;
          box-shadow: 0 0 10px rgba(220, 20, 60, 0.5);
        }

        .card-inner {
          background: #ffffff;
          padding: 30px;
          border-radius: 20px;
          border: 1px solid #eee;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        .experience-card:hover .card-inner {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
          border-color: rgba(220, 20, 60, 0.2);
        }

        .experience-card.current .card-inner {
          border-left: 5px solid crimson;
        }

        .role-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 5px;
        }

        .role-container h3 {
          font-size: 24px;
          font-weight: 700;
          color: #111;
        }

        .current-badge {
          background: crimson;
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .company-info {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 5px;
          font-size: 16px;
        }

        .company {
          color: crimson;
          font-weight: 600;
        }

        .dot {
          width: 4px;
          height: 4px;
          background: #ccc;
          border-radius: 50%;
        }

        .period {
          color: #666;
          font-weight: 500;
        }

        .location {
          font-size: 14px;
          color: #999;
          margin-bottom: 20px;
        }

        .card-body p {
          color: #444;
          line-height: 1.8;
          font-size: 15px;
          margin-bottom: 25px;
        }

        .skills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .skill-tag {
          background: #f8f9fa;
          border: 1px solid #eee;
          padding: 6px 16px;
          border-radius: 30px;
          font-size: 12px;
          color: #666;
          transition: all 0.3s ease;
        }

        .experience-card:hover .skill-tag {
          background: rgba(220, 20, 60, 0.1);
          border-color: rgba(220, 20, 60, 0.2);
          color: crimson;
        }

        @media (max-width: 768px) {
          .experience-container {
            padding-left: 35px;
          }
          .timeline-line {
            left: 10px;
          }
          .card-dot {
            left: -32px;
          }
          .role-container {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          .role-container h3 {
            font-size: 20px;
          }
        }
      `}</style>
    </section>
  );
}

