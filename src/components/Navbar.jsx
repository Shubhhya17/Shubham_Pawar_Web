"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [sticky, setSticky] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use mounted to prevent class mismatch during initial hydration
  const navClass = `navbar ${mounted && sticky ? "sticky" : ""}`;
  const menuClass = `menu ${mounted && menu ? "active" : ""}`;

  return (
    <>
      <nav className={navClass}>
        <div className="max-width">
          <div className="logo">
            <a href="#" suppressHydrationWarning>Portfo<span>lio.</span></a>
          </div>

          <ul className={menuClass}>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#career">My Career</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>

          <div className="menu-btn" onClick={() => setMenu(!menu)}>
            ☰
          </div>
        </div>
      </nav>

      <style jsx global>{`
        .navbar {
          position: fixed;
          width: 100%;
          padding: 20px 0;
          transition: all 0.4s ease;
          z-index: 1000;
        }

        .navbar.sticky {
          background: #dc143c !important; /* Crimson */
          padding: 15px 0;
        }

        .logo a {
          font-size: 28px;
          font-weight: 600;
          color: #fff;
          text-decoration: none;
        }

        .logo a span {
          color: #dc143c;
          transition: 0.3s;
        }
        
        .navbar.sticky .logo a span {
          color: #fff !important;
        }

        .menu li {
          display: inline-block;
          margin-left: 25px;
        }

        .menu li a {
          color: #fff;
          text-decoration: none;
          font-size: 18px;
          font-weight: 500;
        }

        .menu li a:hover {
          color: #dc143c;
        }

        .navbar.sticky .menu li a:hover {
          color: #111;
        }

        @media (max-width: 947px) {
          .menu-btn { display: block; }
          .menu {
            position: fixed;
            height: 100vh;
            width: 100%;
            left: -100%;
            top: 0;
            background: #111;
            text-align: center;
            padding-top: 80px;
            transition: all 0.3s ease;
          }
          .menu.active { left: 0; }
          .menu li { display: block; }
          .menu li a {
            display: inline-block;
            margin: 20px 0;
            font-size: 25px;
          }
        }
      `}</style>
    </>
  );
}