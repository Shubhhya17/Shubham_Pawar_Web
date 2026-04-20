"use client";

import styles from "../styles/Career.module.css";

const careerData = [
  {
    type: "job",
    date: "Feb 2026 – Present",
    title: "Software Developer",
    company: "Ideas To Impacts",
    location: "Pune, India",
    desc: "Spearheading development of Bondsmart.com — a production-level digital bond investment platform. Scaling backend APIs and refining security-critical investment flows.",
    tech: ["Node.js", "React.js", "PostgreSQL", "Express.js", "Prisma"],
  },
  {
    type: "job",
    date: "Nov 2024 – Nov 2025",
    title: "Frontend Developer",
    company: "mr.chams",
    location: "Hyderabad, India",
    desc: "Built high-performance, responsive web interfaces for Zaanvar.com and Rconspace Construction ERP. Optimized UX and integrated real-time REST data streams.",
    tech: ["Next.js", "React.js", "Tailwind CSS", "REST APIs", "GitHub"],
  },
  {
    type: "job",
    date: "May 2024 – Oct 2024",
    title: "Full-Stack Developer Intern",
    company: "Aivariant",
    location: "Remote",
    desc: "Completed an intensive internship focusing on full-stack Java and React ecosystems. Built feature-rich internal modules and optimized database queries.",
    tech: ["Java", "React.js", "Spring Boot", "MySQL", "JavaScript"],
  },
  {
    type: "edu",
    date: "2021 – 2024",
    title: "BE in Computer Science & Engineering",
    company: "Dr. Rajendra Gode Institute",
    location: "Amravati, MH",
    desc: "Graduated with 8.3 CGPA. Specialised in algorithms, database management, and web architectures.",
    tech: ["Data Structures", "DBMS", "OS", "Cloud Computing"],
  },
  {
    type: "edu",
    date: "2018 – 2021",
    title: "Diploma in Engineering",
    company: "Sant Gadge Baba University",
    location: "Maharashtra, India",
    desc: "Foundation in computer systems and programming logic.",
    tech: ["C Language", "Networking", "Computer Hardware"],
  },
];

export default function Career() {
  return (
    <section className={styles.careerSection} id="career">
      <div className="max-width">
        <h2 className="title" data-aos="fade-up">Career & Education</h2>

        <div className={styles.timelineContainer}>
          <div className={styles.timelineLine}></div>

          {careerData.map((item, index) => (
            <div
              key={index}
              className={styles.timelineItem}
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            >
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <span className={styles.timelineDate}>{item.date}</span>
                <h3>{item.title}</h3>
                <h4>
                  {item.type === "job" ? "💼" : "🎓"} {item.company} |{" "}
                  {item.location}
                </h4>
                <p>{item.desc}</p>
                <div className={styles.techStack}>
                  {item.tech.map((t, i) => (
                    <span key={i} className={styles.techItem}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}