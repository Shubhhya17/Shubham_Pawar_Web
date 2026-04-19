"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// 1. Define the project data in an array of objects
const projectsData = [
  {
    id: 1,
    title: "Bondsmart.com",
    image: "/images/Chat.png",
    description: "A digital investment platform for fixed-income securities. Users can invest in listed and high-yield corporate bonds in India with a secure, transparent experience.",
    tech: "Node.js · React.js · PostgreSQL · Express.js",
    link: "#",
    badge: "Feb 2026 – Present",
  },
  {
    id: 2,
    title: "Rconspace",
    image: "/images/Hotel.png",
    description: "An AI-powered ERP platform for the construction & real estate industry — cloud-based project management, progress tracking, and workflow optimisation.",
    tech: "React.js · Node.js · REST APIs",
    link: "#",
    badge: "Nov 2024 – Nov 2025",
  },
  {
    id: 3,
    title: "Zaanvar.com",
    image: "/images/Mintra.png",
    description: "A pet-focused digital platform connecting pet owners and vendors. Includes pet adoption, sales, and care solutions. Built the pet selling & vendor management modules.",
    tech: "Next.js · REST APIs · GitHub",
    link: "#",
    badge: "Nov 2024 – Nov 2025",
  },
  {
    id: 4,
    title: "Chatting Application",
    image: "/images/Chat.png",
    description: "A Java-based real-time chat application implementing socket programming for seamless peer-to-peer communication.",
    tech: "Java · Socket Programming",
    link: "#",
    badge: "Academic",
  },
  {
    id: 5,
    title: "Hotel Management",
    image: "/images/Hotel.png",
    description: "Hotel management system ensures streamlined operations and guest management with an intuitive UI and database integration.",
    tech: "Java · MySQL",
    link: "https://github.com/Shubhhya17/Java_Logic_Practice",
    badge: "Academic",
  },
  {
    id: 6,
    title: "Myntra Clone",
    image: "/images/Mintra.png",
    description: "A Myntra clone developed using HTML, CSS, and JavaScript that replicates the popular e-commerce website's design and functionality.",
    tech: "HTML · CSS · JavaScript",
    link: "https://github.com/Shubhhya17/Weather_App",
    badge: "Academic",
  },
  {
    id: 7,
    title: "Research Paper",
    image: "/images/paper.jpg",
    description: "A published research paper presenting a thorough analysis of recent literature on text summarization systems.",
    tech: "NLP · AI",
    link: "https://ijcrt.org/viewfulltext.php?&p_id=IJCRT2303312",
    badge: "Published",
  },
];

export default function Projects() {
  return (
    <section className="teams" id="projects">
      <div className="max-width">
        <h2 className="title" data-aos="fade-up">Projects</h2>

        <div className="carousel" data-aos="zoom-in">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={3}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              600: { slidesPerView: 2 },
              1000: { slidesPerView: 3 },
            }}
          >
            {/* 2. Map through the project data */}
            {projectsData.map((project) => (
              <SwiperSlide key={project.id}>
                <div className="card">
                  <div className="box">
                    <img src={project.image} alt={project.title} />

                    {/* Badge */}
                    {project.badge && (
                      <span style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "crimson",
                        color: "#fff",
                        fontSize: "10px",
                        padding: "3px 8px",
                        borderRadius: "20px",
                        fontWeight: 600,
                        letterSpacing: "0.5px",
                      }}>
                        {project.badge}
                      </span>
                    )}

                    {/* Project Name */}
                    <div className="text" style={{ color: "white", fontWeight: 700 }}>
                      {project.title}
                    </div>

                    {/* Description */}
                    <p style={{ color: "#e0e0e0", fontSize: "13px", lineHeight: "1.5", margin: "6px 0" }}>
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    {project.tech && (
                      <p style={{ color: "crimson", fontSize: "11px", fontWeight: 600, marginTop: "6px" }}>
                        🛠 {project.tech}
                      </p>
                    )}

                    {/* Link */}
                    {project.link && project.link !== "#" && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: "inline-block",
                          marginTop: "10px",
                          color: "#fff",
                          fontSize: "12px",
                          border: "1px solid crimson",
                          borderRadius: "4px",
                          padding: "4px 10px",
                          textDecoration: "none",
                          transition: "background 0.2s",
                        }}
                      >
                        View Project →
                      </a>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}