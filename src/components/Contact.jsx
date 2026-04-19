"use client";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus(data.error || "Failed to send message.");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("An error occurred. Please try again.");
    }
  };

  return (
    <section className="contact" id="contact">

      <div className="max-width">

        <h2 className="title" data-aos="fade-up">Contact me</h2>

        <div className="contact-content">

          {/* LEFT SIDE */}

          <div className="column left" data-aos="fade-right">

            <div className="text">Get in Touch</div>

            <p>
            As a Software Engineer, I am seeking opportunities to apply my skills in React, JavaScript, HTML, CSS, and Node.js to develop efficient and scalable web applications. I am passionate about learning new technologies, solving real-world problems, and contributing to impactful software projects.
            </p>

            <div className="icons">

              {/* Name */}

              <div className="row">
                <i className="fas fa-user"></i>

                <div className="info">
                  <div className="head">Name</div>
                  <div className="sub-title">Shubham Pawar</div>
                </div>
              </div>


              {/* Address */}

              <div className="row">
                <i className="fas fa-map-marker-alt"></i>

                <div className="info">
                  <div className="head">Address</div>
                  <div className="sub-title">Maharashtra, India</div>
                </div>
              </div>


              {/* Email */}

              <div className="row">
                <i className="fas fa-envelope"></i>

                <div className="info">
                  <div className="head">Email</div>
                  <div className="sub-title">
                    pawarshubh980@gmail.com
                  </div>
                </div>
              </div>

            </div>

          </div>


          {/* RIGHT SIDE FORM */}

          <div className="column right" data-aos="fade-left">

            <div className="text">Message me</div>

            <form onSubmit={handleSubmit}>

              {status && <div style={{ marginBottom: '15px', color: status === 'Message sent successfully!' ? 'green' : 'red', fontWeight: 'bold' }}>{status}</div>}

              <div className="fields">

                <div className="field name">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="field email">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>


              <div className="field subject">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="field textarea">
                <textarea
                  name="message"
                  placeholder="Message.."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>


              <div className="button-area">
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={status === "Sending..."}
                >
                  {status === "Sending..." ? "Sending..." : "Send Message"}
                </button>
              </div>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
}