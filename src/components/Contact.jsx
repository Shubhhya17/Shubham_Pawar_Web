"use client";

import { useState } from "react";
import styles from "../styles/Contact.module.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus({
          submitted: true,
          submitting: false,
          info: { error: false, msg: "Message sent successfully!" },
        });
        setFormData({ name: "", email: "", number: "", subject: "", message: "" });
      } else {
        setStatus({
          submitted: false,
          submitting: false,
          info: { error: true, msg: result.error || "Something went wrong." },
        });
      }
    } catch (error) {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: "Failed to send message." },
      });
    }
  };

  return (
    <section className={styles.contactSection} id="contact">
      <div className="max-width">
        <h2 className="title" data-aos="fade-up">Contact me</h2>
        <div className={styles.contactContent}>
          
          <div className={`${styles.column} ${styles.left}`} data-aos="fade-right">
            <div className={styles.text}>Get in Touch</div>
            <p>
              I am always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision. Feel free to reach out!
            </p>
            <div className={styles.icons}>
              <div className={styles.row}>
                <i className="fas fa-user"></i>
                <div className={styles.info}>
                  <div className={styles.head}>Name</div>
                  <div className={styles.subTitle}>Shubham Pawar</div>
                </div>
              </div>
              <div className={styles.row}>
                <i className="fas fa-map-marker-alt"></i>
                <div className={styles.info}>
                  <div className={styles.head}>Address</div>
                  <div className={styles.subTitle}>Pune, Maharashtra, India</div>
                </div>
              </div>
              <div className={styles.row}>
                <i className="fas fa-envelope"></i>
                <div className={styles.info}>
                  <div className={styles.head}>Email</div>
                  <div className={styles.subTitle}>pawarshubh980@gmail.com</div>
                </div>
              </div>
              <a href="https://wa.me/919403394128" target="_blank" rel="noopener noreferrer" className={styles.whatsappRow}>
                <div className={styles.row}>
                  <i className="fab fa-whatsapp"></i>
                  <div className={styles.info}>
                    <div className={styles.head}>WhatsApp</div>
                    <div className={styles.subTitle}>Get in Touch with WhatsApp</div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div className={`${styles.column} ${styles.right}`} data-aos="fade-left">
            <div className={styles.text}>Message me</div>
            <form onSubmit={handleFormSubmit}>
              <div className={styles.fields}>
                <div className={`${styles.field} ${styles.name}`}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={`${styles.field} ${styles.email}`}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className={styles.fields}>
                <div className={`${styles.field} ${styles.number}`}>
                  <input
                    type="tel"
                    name="number"
                    placeholder="Phone Number"
                    value={formData.number}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={`${styles.field} ${styles.subject}`}>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className={`${styles.field} ${styles.textarea}`}>
                <textarea
                  name="message"
                  cols="30"
                  rows="10"
                  placeholder="Message.."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              
              <div className={styles.buttonArea}>
                <button type="submit" disabled={status.submitting}>
                  {status.submitting ? "Sending..." : "Send message"}
                </button>
              </div>

              {status.info.msg && (
                <p style={{ 
                  marginTop: "15px", 
                  color: status.info.error ? "#ff4d4d" : "#25D366",
                  fontSize: "15px",
                  fontWeight: "600",
                  textAlign: "center"
                }}>
                  {status.info.msg}
                </p>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}