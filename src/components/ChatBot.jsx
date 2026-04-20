"use client";

import { useState, useRef, useEffect } from "react";
import styles from "../styles/ChatBot.module.css";
import confetti from "canvas-confetti";

// ── Icons (SVG) ─────────────────────────────────────────────────────────────
const IconBot = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
);

const IconSend = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const IconClose = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconMic = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
  </svg>
);

const IconCalendar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

// ── Portfolio knowledge base (SMART FALLBACK) ────────────────────────────────
const KB = [
  {
    keys: ["name", "who are you", "who is shubham", "introduce", "yourself", "hi", "hello", "hey"],
    answer: "👋 Hey there! I'm **Shubham's AI Personal Assistant**. I'm here to help you get to know him better and manage his schedule. \n\nWhat can I do for you today? Would you like to see his **projects** or **book a meeting**?",
  },
  {
    keys: ["free", "availability", "available", "when", "time", "meeting", "schedule", "appointment"],
    answer: "📅 Shubham is usually free for meetings between **10 AM and 5 PM**. I can definitely pencil you in for a quick call. \n\nShall I open the booking form for you?",
  },
  {
    keys: ["skills", "technology", "tech stack", "languages", "know what", "tools", "react", "node", "javascript"],
    answer: "💻 Shubham is a wizard with **React, Next.js, and Node.js**. He specializes in building high-performance web applications and robust APIs. \n\nWould you like to know about a specific project he built with these?",
  },
  {
    keys: ["experience", "years", "working", "job", "career", "company"],
    answer: "💼 He has **2+ years of professional experience**, currently building Fintech solutions at **Ideas To Impacts**. \n\nWould you like to see his full work history or projects?",
  },
  {
    keys: ["projects", "built", "work", "bondsmart", "zaanvar", "rconspace"],
    answer: "🚀 I manage all his project logs! Highlights include **Bondsmart.com** (Corporate Bonds), **Zaanvar.com** (Pet adoption), and **Rconspace** (Construction ERP). \n\nWhich one would you like to hear more about?",
  },
];

const HUMAN_FALLBACKS = [
  "🤔 I'll have to check with Shubham on that one! While I'm at it, would you like to see his **projects** or **schedule a quick sync**?",
  "😄 I'm specialized in Shubham's professional life. Want to hear about his work at **Ideas To Impacts** or maybe **book a meeting** with him?",
  "✨ I might not have that specific detail, but I do know he's free between **10 AM and 5 PM** if you'd like to chat with him directly. Shall I schedule a call?",
  "👋 Good question! I'm mostly here to help with his **career info and scheduling**. What would you like to know about his tech journey?",
];

function getLocalReply(userInput) {
  const input = userInput.toLowerCase().trim();
  for (const entry of KB) {
    if (entry.keys.some((k) => input.includes(k))) return entry.answer;
  }
  return HUMAN_FALLBACKS[Math.floor(Math.random() * HUMAN_FALLBACKS.length)];
}

function renderText(text) {
  if (!text) return "";
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((p, i) =>
    i % 2 === 1 ? <strong key={i}>{p}</strong> : <span key={i}>{p}</span>
  );
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "👋 Hi! I'm Shubham's AI Assistant. I can tell you about his work or help you schedule a meeting. What's on your mind?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [listening, setListening] = useState(false);
  const bottomRef = useRef(null);
  const recognitionRef = useRef(null);

  // Booking Form State
  const [bookingData, setBookingData] = useState({ name: "", email: "", date: "", time: "", reason: "" });
  const [bookingStatus, setBookingStatus] = useState("idle");

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, showBooking]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = "en-US";
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setListening(false);
        // Automatically send after voice capture
        setTimeout(() => send(transcript), 500);
      };
      recognitionRef.current.onend = () => setListening(false);
      recognitionRef.current.onerror = () => setListening(false);
    }
  }, []);

  const toggleListening = () => {
    if (listening) {
      recognitionRef.current?.stop();
    } else {
      setListening(true);
      recognitionRef.current?.start();
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text.replace(/\*\*/g, ''));
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(v => v.name.includes("Female") || v.name.includes("Google US English") || v.name.includes("Microsoft Zira"));
    if (femaleVoice) utterance.voice = femaleVoice;
    window.speechSynthesis.speak(utterance);
  };

  const send = async (textOverride) => {
    const textToSend = textOverride || input;
    const trimmed = textToSend.trim();
    if (!trimmed || typing) return;

    if (!textOverride) {
      setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
      setInput("");
    }
    
    setTyping(true);

    const bookingIntents = ["meeting", "schedule", "appointment", "book", "pencil", "when free", "when shubham free"];
    const isBookingIntent = bookingIntents.some(i => trimmed.toLowerCase().includes(i));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();
      if (res.ok && data.reply) {
        setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
        speak(data.reply); // Voice response
        if (isBookingIntent || data.reply.toLowerCase().includes("schedule") || data.reply.toLowerCase().includes("pencil")) {
          setTimeout(() => setShowBooking(true), 1200);
        }
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      const fallback = getLocalReply(trimmed);
      setMessages((prev) => [...prev, { role: "bot", text: fallback }]);
      speak(fallback); // Voice response
      if (isBookingIntent) {
        setTimeout(() => setShowBooking(true), 1200);
      }
    } finally {
      setTyping(false);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingStatus("sending");
    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      if (res.ok) {
        setBookingStatus("success");
        const count = 150;
        const defaults = { origin: { y: 0.7 }, zIndex: 9999, colors: ['#dc143c', '#ffffff', '#ff0000'] };
        confetti({ ...defaults, particleCount: count });
        
        setTimeout(() => {
          setShowBooking(false);
          setMessages(prev => [...prev, { role: "bot", text: `✅ I've penciled you in for **${bookingData.date}** at **${bookingData.time}**. Shubham will receive your request immediately!` }]);
          setBookingStatus("idle");
          setBookingData({ name: "", email: "", date: "", time: "", reason: "" });
        }, 1500);
      } else {
        setBookingStatus("error");
      }
    } catch (err) {
      setBookingStatus("error");
    }
  };

  return (
    <>
      <button className={`${styles.chatbotTrigger} ${open ? styles.active : ""}`} onClick={() => setOpen((o) => !o)}>
        {open ? <IconClose /> : <IconBot />}
      </button>

      {open && (
        <div className={styles.chatbotWindow}>
          <div className={styles.chatbotHeader}>
            <div className={styles.chatbotHeaderMain}>
              <div className={styles.chatbotAvatar}><IconBot /></div>
              <div>
                <div className={styles.chatbotName}>Shubham's Assistant</div>
                <div className={styles.chatbotStatus}>Ready to assist</div>
              </div>
            </div>
            <button className={styles.chatbotClose} onClick={() => setOpen(false)}><IconClose /></button>
          </div>

          <div className={styles.chatbotMessages}>
            {messages.map((msg, i) => (
              <div key={i} className={`${styles.chatbotMsg} ${styles[msg.role]}`}>
                <div className={styles.chatbotBubble}>
                  {msg.text.split("\n").map((line, li) => (
                    <p key={li}>{renderText(line)}</p>
                  ))}
                </div>
              </div>
            ))}
            
            {showBooking && (
              <div className={styles.bookingCard}>
                <div className={styles.bookingHeader}><IconCalendar /><span>Request a Meeting</span><button onClick={() => setShowBooking(false)}>✕</button></div>
                <form onSubmit={handleBookingSubmit} className={styles.bookingForm}>
                  <input placeholder="Your Name" value={bookingData.name} required onChange={e => setBookingData({...bookingData, name: e.target.value})} />
                  <input type="email" placeholder="Email Address" value={bookingData.email} required onChange={e => setBookingData({...bookingData, email: e.target.value})} />
                  <div className={styles.bookingRow}>
                    <input type="date" value={bookingData.date} required onChange={e => setBookingData({...bookingData, date: e.target.value})} />
                    <input type="time" value={bookingData.time} required onChange={e => setBookingData({...bookingData, time: e.target.value})} />
                  </div>
                  <textarea placeholder="Reason/Subject" value={bookingData.reason} onChange={e => setBookingData({...bookingData, reason: e.target.value})} />
                  <button type="submit" disabled={bookingStatus === "sending"}>
                    {bookingStatus === "sending" ? "Booking..." : bookingStatus === "success" ? "Success!" : "Pencil me in"}
                  </button>
                </form>
              </div>
            )}

            {typing && (
              <div className={`${styles.chatbotMsg} ${styles.bot}`}>
                <div className={`${styles.chatbotBubble} ${styles.typingDots}`}><span /><span /><span /></div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className={styles.chatbotInputRow}>
            <button className={`${styles.micBtn} ${listening ? styles.listening : ""}`} onClick={toggleListening} type="button">
              <IconMic />
            </button>
            <input className={styles.chatbotInput} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Type or use Mic..." />
            <a className={styles.chatbotSend} onClick={() => send()} disabled={typing}><IconSend /></a>
          </div>
        </div>
      )}
    </>
  );
}
