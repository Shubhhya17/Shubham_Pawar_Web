"use client";

import { useEffect, useState } from "react";
import Typed from "typed.js";
import styles from "../styles/Home.module.css"

export default function Landing() {
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userNumber: "",
  });

  useEffect(() => {
    const typed = new Typed(".typing", {
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
      const alreadyDone = sessionStorage.getItem("formSubmitted");
      if (!alreadyDone) {
        setShowPopup(true);
      }
    }, 2000);

    return () => {
      typed.destroy();
      clearTimeout(timer);
    };
  }, []);

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
        // Close modal after 3 seconds of showing "Thank You"
        setTimeout(() => setShowPopup(false), 3000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <section className={styles.home} id="home">
        <div className={styles.maxWidth}>
          <div className={styles.homeContent}>
            <div className={styles.text1}>Hello, my name is</div>
            <div className={styles.text2}>Shubham Pawar</div>
            <div className={styles.text3}>
              And I'm a <span className="typing"></span>
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

            {!isSubmitted ? (
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
            ) : (
              /* --- THANK YOU ANIMATION --- */
              <div className={styles.successContainer}>
                <span className={styles.checkmark}>✓</span>
                <h2>Thank You!</h2>
                <p>Your data has been submitted successfully.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}