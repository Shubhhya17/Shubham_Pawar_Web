"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../styles/Experience.module.css";

export default function Experience({ theme }) {
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
      
      const sectionStart = rect.top;
      const sectionHeight = rect.height;
      const triggerPoint = viewportHeight * 0.7;
      
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
    <section className={`experience ${theme}`} id="experience" ref={sectionRef}>
      <div className="max-width">
        <h2 className="title" data-aos="fade-up">Work Experience</h2>
        
        <div className={styles.experienceContainer}>
          {/* Animated Slider Line */}
          <div className={styles.timelineLine}>
            <div 
              className={styles.timelineFill} 
              style={{ height: `${fillHeight}%` }}
            ></div>
          </div>

          <div className={styles.experienceContent}>
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className={`${styles.experienceCard} ${exp.current ? styles.current : ''}`}
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              >
                <div className={styles.cardDot}></div>
                <div className={styles.cardInner}>
                  <div className={styles.cardHeader}>
                    <div className={styles.roleContainer}>
                      <h3>{exp.role}</h3>
                      {exp.current && <span className={styles.currentBadge}>Current</span>}
                    </div>
                    <div className={styles.companyInfo}>
                      <span className={styles.company}>{exp.company}</span>
                      <span className={styles.dot}></span>
                      <span className={styles.period}>{exp.period}</span>
                    </div>
                    <div className={styles.location}>{exp.location}</div>
                  </div>
                  <div className={styles.cardBody}>
                    <p>{exp.description}</p>
                    <div className={styles.skillsContainer}>
                      {exp.skills.map((skill, sIndex) => (
                        <span key={sIndex} className={styles.skillTag}>{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


