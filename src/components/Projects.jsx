"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// 1. Define the project data in an array of objects
const projectsData = [
  {
    id: 1,
    title: "Chatting Application",
    image: "/images/Chat.png",
    description: "A Java-based real-time chat application implementing socket programming for seamless communication.",
    link: "#", // Add a link if available
  },
  {
    id: 2,
    title: "Hotel Management",
    image: "/images/Hotel.png",
    description: "Hotel management system ensures streamlined operations and guest management with intuitive UI and database integration.",
    link: "https://github.com/Shubhhya17/Java_Logic_Practice",
  },
  {
    id: 3,
    title: "Myntra Clone",
    image: "/images/Mintra.png",
    description: "A Myntra clone developed using HTML, CSS, and JavaScript replicates the website's design and functionality.",
    link: "https://github.com/Shubhhya17/Weather_App",
  },
  {
    id: 4,
    title: "Research Paper",
    image: "/images/paper.jpg",
    description: "This paper presents a thorough analysis of recent literature on text summarization systems.",
    link: "https://ijcrt.org/viewfulltext.php?&p_id=IJCRT2303312",
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
                    
                    {/* Project Name in white */}
                    <div className="text" style={{ color: "white" }}>
                      {project.title}
                    </div>

                    <a href={project.link} target="_blank" rel="noreferrer">
                      {/* Description in white */}
                      <p style={{ color: "white" }}>
                        {project.description}
                      </p>
                    </a>
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