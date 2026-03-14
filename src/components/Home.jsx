"use client";

import { useEffect, useState } from "react";
import Typed from "typed.js";

export default function Home() {
  // State to control popup visibility
  const [showPopup, setShowPopup] = useState(false);
  // State to store form data
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userNumber: "",
  });

  useEffect(() => {
    // 1. Typed.js Initialization
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

    // 2. Show Popup after 2 seconds delay
    const timer = setTimeout(() => {
        // Only show if the user hasn't filled it in this session
        const isSubmitted = sessionStorage.getItem("formSubmitted");
        if (!isSubmitted) {
            setShowPopup(true);
        }
    }, 2000);

    return () => {
      typed.destroy();
      clearTimeout(timer);
    };
  }, []);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("User Data:", formData);
  //   // You can send this data to an API or Email here
    
  //   sessionStorage.setItem("formSubmitted", "true"); // Don't show again in this session
  //   setShowPopup(false); // Close popup
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    const data = await res.json();
  
    console.log("API Response:", data);
  
    setShowPopup(false);
  };
  return (
    <>
      <section
        className="home"
        id="home"
        style={{
          backgroundImage: "url('/images/wall1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="max-width">
          <div className="home-content">
            <div className="text-1">Hello, my name is</div>
            <div className="text-2">Shubham Pawar</div>
            <div className="text-3">
              And I'm a <span className="typing"></span>
            </div>
          </div>
        </div>
      </section>

      {/* --- POPUP MODAL --- */}
      {showPopup && (
        <div style={modalOverlayStyle}>
          <div style={modalBoxStyle}>
            <button 
                onClick={() => setShowPopup(false)} 
                style={closeBtnStyle}
            >
              &times;
            </button>
            <h2 style={{ color: "#111", marginBottom: "20px" }}>Welcome!</h2>
            <p style={{ color: "#333", marginBottom: "20px" }}>Please let us know who you are:</p>
            
            <form onSubmit={handleSubmit} style={formStyle}>
              <input
                type="text"
                name="userName"
                placeholder="Your Name"
                required
                onChange={handleChange}
                style={inputStyle}
              />
              <input
                type="email"
                name="userEmail"
                placeholder="Your Email"
                required
                onChange={handleChange}
                style={inputStyle}
              />
              <input
                type="tel"
                name="userNumber"
                placeholder="Phone Number"
                required
                onChange={handleChange}
                style={inputStyle}
              />
              <button type="submit" style={submitBtnStyle}>
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// --- Inline Styles for the Popup ---

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalBoxStyle = {
  backgroundColor: "white",
  padding: "40px",
  borderRadius: "10px",
  width: "90%",
  maxWidth: "400px",
  textAlign: "center",
  position: "relative",
  boxShadow: "0px 0px 20px rgba(0,0,0,0.5)",
};

const closeBtnStyle = {
  position: "absolute",
  top: "10px",
  right: "15px",
  fontSize: "25px",
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "#333",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const inputStyle = {
  padding: "12px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "16px",
  outline: "none",
  color: "#333"
};

const submitBtnStyle = {
  padding: "12px",
  backgroundColor: "crimson",
  color: "white",
  border: "none",
  borderRadius: "5px",
  fontSize: "16px",
  cursor: "pointer",
  transition: "0.3s",
};