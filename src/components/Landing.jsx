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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !typingRef.current) return;

    const typed = new Typed(typingRef.current, {
      strings: [
        "Frontend Developer",
        "MERN Stack Developer",
        "Web Developer",
        "Freelancer",
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
        <div className={styles.maxWidth} style={{ position: "relative", zIndex: 1 }}>
          <div className={styles.homeContent}>
            <div className={styles.text1} data-aos="fade-down" data-aos-delay="100">
              Hello, my name is
            </div>
            <div className={styles.text2} data-aos="fade-up" data-aos-delay="200">
              Shubham Pawar
            </div>
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