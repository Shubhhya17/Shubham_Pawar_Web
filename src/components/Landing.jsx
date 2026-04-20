"use client";

import { useEffect, useState, useRef } from "react";
import Typed from "typed.js";
import styles from "../styles/Home.module.css";

export default function Landing() {
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userNumber: "",
  });
  const [mounted, setMounted] = useState(false);
  const typingRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.fillStyle = `rgba(220, 20, 60, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !typingRef.current) return;

    const typed = new Typed(typingRef.current, {
      strings: [
        "Software Engineer",
        "LinkedIn Top Voice",
        "Full Stack Developer",
        "Coder & Programmer",
        "Professional Blogger",
        "Freelance Developer",
      ],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
    });

    const timer = setTimeout(() => {
      try {
        const alreadyDone = sessionStorage.getItem("formSubmitted");
        if (!alreadyDone) {
          setShowPopup(true);
        }
      } catch (error) {
        setShowPopup(true);
      }
    }, 1500);

    return () => {
      typed.destroy();
      clearTimeout(timer);
    };
  }, [mounted]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSubmitted(true);
        sessionStorage.setItem("formSubmitted", "true");
        setTimeout(() => setShowPopup(false), 3000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <section className={styles.home} id="home">
        <canvas 
          ref={canvasRef} 
          style={{ 
            position: "absolute", 
            top: 0, 
            left: 0, 
            width: "100%", 
            height: "100%", 
            pointerEvents: "none",
            zIndex: 0
          }} 
        />
        <div className={styles.maxWidth} style={{ position: "relative", zIndex: 1 }}>
          <div className={styles.homeContent}>
            <div className={styles.text1} data-aos="fade-down" data-aos-delay="100">
              Hello, my name is
            </div>
            <h1 className={styles.text2} data-aos="fade-up" data-aos-delay="200">
              Shubham Pawar
            </h1>
            <div className={styles.text3} data-aos="fade-up" data-aos-delay="300">
              And I'm a <span ref={typingRef}></span>
            </div>
          </div>
        </div>
      </section>

      {/* --- POPUP MODAL --- */}
      {showPopup && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <button
              onClick={() => setShowPopup(false)}
              className={styles.closeBtn}
            >
              &times;
            </button>

            {isSubmitted ? (
              <div className={styles.successContainer}>
                <span className={styles.checkmark}>✓</span>
                <h2>Thank You!</h2>
                <p>Your data has been submitted successfully.</p>
              </div>
            ) : (
              <>
                <h2>Welcome!</h2>
                <p>Please let us know who you are:</p>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <input
                    type="text"
                    name="userName"
                    placeholder="Your Name"
                    required
                    onChange={handleChange}
                    className={styles.input}
                  />
                  <input
                    type="email"
                    name="userEmail"
                    placeholder="Your Email"
                    required
                    onChange={handleChange}
                    className={styles.input}
                  />
                  <input
                    type="tel"
                    name="userNumber"
                    placeholder="Phone Number"
                    required
                    onChange={handleChange}
                    className={styles.input}
                  />
                  <button type="submit" className={styles.submitBtn}>
                    Submit
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}