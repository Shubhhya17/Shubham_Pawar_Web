"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import styles from "../styles/Certificates.module.css";

// 1. Certificate Data Object
const certificatesData = [
  { 
    id: 1,
    title: "Java",
    image: "/images/Java.png",
    link: "/Doc/java.pdf",
    description: "Java is a versatile object-oriented programming language known for platform independence and wide usage in software development.",
  },
  {
    id: 2,
    title: "C Language",
    image: "/images/C.png",
    link: "/Doc/c.pdf",
    description: "C is a powerful and widely used procedural programming language known for efficiency and system-level programming.",
  },
  {
    id: 3,
    title: "HTML & CSS",
    image: "/images/Web.png",
    link: "/Doc/Front.pdf",
    description: "Web development includes creating and maintaining websites and applications using HTML and CSS.",
  },
  {
    id: 4,
    title: "JavaScript",
    image: "/images/js.png",
    link: "#", // Added a placeholder link
    description: "JavaScript is a high-level interpreted language used to add interactivity and dynamic behaviour to websites.",
  },
  {
    id: 5,
    title: "Database",
    image: "/images/db.png",
    link: "/Doc/sql.pdf",
    description: "A database is a structured collection of data used for efficient storage, retrieval and management.",
  },
];

export default function Certificates({ theme }) {
  return (
    <section className={`teams ${theme}`} id="certificates">
      <div className="max-width">
        <h2 className="title" data-aos="fade-up">Certificates & Achievements</h2>

        <div className={styles.carousel} data-aos="fade-up">
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
            {/* 2. Map through the data object */}
            {certificatesData.map((cert) => (
              <SwiperSlide key={cert.id}>
                <div 
                  className={styles.card}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
                    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
                  }}
                >
                  <div className={styles.glare}></div>
                  <div className={styles.box}>
                    <div className={styles.imageContainer}>
                      <img src={cert.image} alt={cert.title} />
                      <div className={styles.overlay}></div>
                    </div>
                    <div className={styles.content}>
                      <a href={cert.link} target="_blank" rel="noreferrer" className={styles.certLink}>
                        <div className={styles.text}>
                          {cert.title}
                        </div>
                        <p className={styles.description}>
                          {cert.description}
                        </p>
                        <div className={styles.viewBadge}>
                          Verify Certificate <i className="fas fa-external-link-alt"></i>
                        </div>
                      </a>
                    </div>
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