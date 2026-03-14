"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// 1. Social Media Data Object
const socialData = [
  {
    id: 1,
    name: "LinkedIn",
    image: "/images/Linkdin.png",
    link: "https://www.linkedin.com/in/shubham-pawar1703",
    description: "Professional networking platform designed for finding job opportunities and showcasing achievements.",
  },
  {
    id: 2,
    name: "GitHub",
    image: "/images/Github.png",
    link: "https://github.com/Shubhhya17",
    description: "GitHub is a web-based platform for version control and collaboration on software development projects.",
  },
  {
    id: 3,
    name: "Instagram",
    image: "/images/Insta.png",
    link: "https://www.instagram.com/shubhhya_/Home",
    description: "Instagram is a social media platform focused on sharing photos and videos with a wide audience.",
  },
  {
    id: 4,
    name: "HackerRank",
    image: "/images/Hack.png",
    link: "https://www.hackerrank.com/profile/shubhpawar1703",
    description: "Competitive coding platform offering challenges and contests to practice coding skills and prepare for interviews.",
  },
  {
    id: 5,
    name: "Facebook",
    image: "/images/Facebook.png",
    link: "https://www.facebook.com", // Added a default link
    description: "Facebook is a social networking platform where users connect with friends, share content, and engage online.",
  },
];

export default function SocialMedia() {
  return (
    <section className="teams" id="social-media">
      <div className="max-width">
        <h2 className="title">Social Media</h2>

        <div className="carousel">
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
            {socialData.map((social) => (
              <SwiperSlide key={social.id}>
                <div className="card">
                  <div className="box">
                    <img src={social.image} alt={social.name} />
                    <a href={social.link} target="_blank" rel="noreferrer">
                      
                      {/* Name in White */}
                      <div className="text" style={{ color: "white" }}>
                        {social.name}
                      </div>

                      {/* Description in White */}
                      <p style={{ color: "white" }}>
                        {social.description}
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