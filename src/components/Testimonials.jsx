"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import styles from "../styles/Testimonials.module.css";

const testimonials = [
  {
    name: "John Doe",
    position: "CEO, Tech Solutions",
    text: "Shubham is an exceptional developer. His attention to detail and ability to translate complex requirements into beautiful, functional code is outstanding.",
    avatar: "https://i.pravatar.cc/150?u=1",
    rating: 5
  },
  {
    name: "Sarah Smith",
    position: "Project Manager, Creative Agency",
    text: "Working with Shubham was a breeze. He delivered our project ahead of schedule and the quality of the UI/UX was beyond our expectations.",
    avatar: "https://i.pravatar.cc/150?u=2",
    rating: 5
  },
  {
    name: "Michael Chen",
    position: "Lead Architect, Innovate Inc",
    text: "Shubham has a deep understanding of React and Next.js. He implemented high-performance features that significantly boosted our site speed.",
    avatar: "https://i.pravatar.cc/150?u=3",
    rating: 5
  }
];

export default function Testimonials({ theme }) {
  return (
    <section className={`${styles.testimonialsSection} ${theme}`} id="testimonials">
      <div className="max-width">
        <h2 className="title" data-aos="fade-up">Testimonials</h2>
        
        <div className={styles.carousel} data-aos="zoom-in">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={3}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              600: { slidesPerView: 2 },
              1000: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <div className={styles.card}>
                  <div className={styles.box}>
                    <img src={item.avatar} alt={item.name} />
                    <div className={styles.text}>{item.name}</div>
                    <p className={styles.position}>{item.position}</p>
                    <p className={styles.feedback}>"{item.text}"</p>
                    <div className={styles.stars}>
                      {"★".repeat(item.rating)}
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
