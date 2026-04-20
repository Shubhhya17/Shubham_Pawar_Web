"use client";

import { useState, useRef, useEffect } from "react";
import styles from "../styles/ChatBot.module.css";

// ── Portfolio knowledge base ──────────────────────────────────────────────────
const KB = [
  {
    keys: ["name", "who are you", "who is shubham", "introduce", "yourself"],
    answer:
      "👋 I'm **Shubham Pawar** — a passionate **Full Stack Developer** from Maharashtra, India. I specialise in React, Next.js, Node.js and PostgreSQL. Currently working as a Software Developer at **Ideas To Impacts**, building Bondsmart.com.",
  },
  {
    keys: ["skills", "technology", "tech stack", "languages", "know what", "tools"],
    answer:
      "💻 Shubham's skills include:\n• **Frontend:** React.js, Next.js, HTML, CSS, JavaScript\n• **Backend:** Node.js, Express.js, Java, Spring Framework\n• **Database:** PostgreSQL, MongoDB, MySQL\n• **Others:** Git, GitHub, REST APIs, Redux, Microservices",
  },
  {
    keys: ["react"],
    answer: "⚛️ React.js — 80% proficiency. Shubham has strong hands-on experience building component-based UIs with React, used across Bondsmart, Zaanvar, and Rconspace.",
  },
  {
    keys: ["next", "nextjs", "next.js"],
    answer: "▲ Next.js — 80% proficiency. Shubham uses Next.js for SSR/SSG web applications. He built Zaanvar.com using Next.js.",
  },
  {
    keys: ["javascript", "js"],
    answer: "🟨 JavaScript — 70% proficiency. Core language for all of Shubham's frontend and backend work.",
  },
  {
    keys: ["css"],
    answer: "🎨 CSS — 80% proficiency. Shubham builds fully responsive, pixel-perfect layouts.",
  },
  {
    keys: ["node", "nodejs"],
    answer: "🟢 Node.js — 60% proficiency. Shubham uses Node.js for backend REST APIs, including the Bondsmart platform.",
  },
  {
    keys: ["postgresql", "postgres"],
    answer: "🐘 PostgreSQL — Used in production on Bondsmart.com for storing bond investment data securely.",
  },
  {
    keys: ["mongodb", "mongo"],
    answer: "🍃 MongoDB — 70% proficiency. Used for NoSQL database management in MERN projects.",
  },
  {
    keys: ["github", "git"],
    answer: "🐙 Git & GitHub — 80% proficiency. Shubham uses Git for version control across all projects.",
  },
  {
    keys: ["mysql", "sql"],
    answer: "🗄️ MySQL — 70% proficiency. Shubham has experience with relational database design. Also used during intern at Aivariant.",
  },
  {
    keys: ["java", "spring"],
    answer: "☕ Java — Shubham has strong Java foundations from his BE and internship at Aivariant. He also has experience with Spring Framework and Hibernate.",
  },
  {
    keys: ["education", "study", "college", "degree", "cgpa", "university", "diploma"],
    answer:
      "🎓 Education:\n• **Diploma in Engineering** (2021)\n• **BE in Computer Science & Engineering** — Dr. Rajendra Gode Institute of Technology & Research, Amravati (2021–2024, CGPA: 8.3)\n  University: Sant Gadge Baba Amravati University",
  },
  {
    keys: ["cgpa", "marks", "grade", "score", "percentage"],
    answer: "📊 Shubham completed his BE in CSE with a **CGPA of 8.3** from Dr. Rajendra Gode Institute, Amravati.",
  },
  // ── Experience ────────────────────────────────────────────────────────────────
  {
    keys: ["experience", "years", "working", "professional", "job", "career", "work history"],
    answer:
      "💼 Shubham has **2+ years of professional experience**:\n\n1. 🏢 **Software Developer** — Ideas To Impacts *(Feb 2026 – Present, Pune)*\n   Building Bondsmart.com — a digital bond investment platform.\n\n2. 🏢 **Frontend Developer** — mr.chams *(Nov 2024 – Nov 2025, Hyderabad)*\n   Built Zaanvar.com & Rconspace using React.js, Next.js & REST APIs.\n\n3. 🏢 **Full-Stack Developer Intern** — Aivariant *(May 2024 – Oct 2024)*\n   Gained hands-on experience in Java, JavaScript, React & MySQL.",
  },
  {
    keys: ["ideas to impacts", "current job", "bondsmart company", "current company"],
    answer:
      "🏢 **Ideas To Impacts** — Shubham's current employer (Feb 2026 – Present).\nHe works as a **Software Developer** in Pune, building Bondsmart.com — a digital fixed-income investment platform for corporate bonds in India.",
  },
  {
    keys: ["mr chams", "mr.chams", "mrcham"],
    answer:
      "🏢 **mr.chams** — Shubham worked here as a **Frontend Developer** (Nov 2024 – Nov 2025) in Hyderabad. He built Zaanvar.com (pet marketplace) and Rconspace (construction ERP) using Next.js, React.js, and REST APIs.",
  },
  {
    keys: ["aivariant", "intern", "internship"],
    answer:
      "🏢 **Aivariant** — Shubham's first professional role as a **Full-Stack Developer Intern** (May 2024 – Oct 2024). He gained hands-on experience with Java, JavaScript, React, and MySQL.",
  },
  // ── Projects ──────────────────────────────────────────────────────────────────
  {
    keys: ["project", "work", "portfolio", "built", "created", "developed", "what did shubham build"],
    answer:
      "🚀 Shubham's key projects:\n\n• **Bondsmart.com** — Digital bond investment platform (Node.js, React, PostgreSQL, Express)\n• **Rconspace** — AI-powered Construction ERP (React.js, Node.js, REST APIs)\n• **Zaanvar.com** — Pet marketplace with adoption & vendor management (Next.js, REST APIs)\n• **Chatting App** — Real-time Java socket application\n• **Myntra Clone** — HTML/CSS/JS e-commerce clone\n• **Research Paper** — Published on text summarization systems",
  },
  {
    keys: ["bondsmart"],
    answer:
      "💹 **Bondsmart.com** — A digital investment platform for fixed-income securities, allowing users to invest in listed and high-yield corporate bonds in India. Shubham built it at Ideas To Impacts using **Node.js, React.js, PostgreSQL, and Express.js**.",
  },
  {
    keys: ["rconspace"],
    answer:
      "🏗️ **Rconspace** — An AI-powered ERP platform for the construction and real estate industry. It provides cloud-based project management, progress tracking, and workflow optimization. Shubham worked on it at mr.chams using **React.js, Node.js, and REST APIs**.",
  },
  {
    keys: ["zaanvar"],
    answer:
      "🐾 **Zaanvar.com** — A pet-focused digital platform connecting pet owners and vendors. Features include pet adoption, sales, and care solutions. Shubham built the pet selling & vendor management modules at mr.chams using **Next.js and REST APIs**.",
  },
  // ── Contact ───────────────────────────────────────────────────────────────────
  {
    keys: ["contact", "email", "reach", "hire", "connect", "message"],
    answer:
      "📬 You can contact Shubham at:\n• **Email:** pawarshubh980@gmail.com\n• **LinkedIn:** linkedin.com/in/shubham-pawar1703\n• **GitHub:** github.com/Shubhhya17\n• **Location:** Pune / Maharashtra, India",
  },
  {
    keys: ["github profile", "github link", "code", "repository"],
    answer: "🐙 Shubham's GitHub: **github.com/Shubhhya17** — check out his repositories there!",
  },
  {
    keys: ["linkedin"],
    answer: "🔗 LinkedIn: **linkedin.com/in/shubham-pawar1703**",
  },
  {
    keys: ["location", "address", "from", "city", "state", "india", "pune"],
    answer: "📍 Shubham is currently based in **Pune, Maharashtra, India**.",
  },
  {
    keys: ["freelance", "freelancer", "hire me", "available"],
    answer:
      "✅ Shubham is **open to work** and available for full-time, contract, and freelance opportunities in frontend/full-stack development. You can reach him via the Contact section!",
  },
  {
    keys: ["mern", "full stack", "fullstack"],
    answer:
      "🔧 Shubham is a **Full Stack Developer** with experience in the MERN Stack (MongoDB, Express, React, Node.js) and also works with PostgreSQL and Next.js in production environments.",
  },
  {
    keys: ["certificate", "certification", "course", "achievement"],
    answer:
      "🏆 Shubham holds various certifications — check the **Certificates** section of this portfolio for details.",
  },
  {
    keys: ["social", "twitter", "instagram", "social media"],
    answer: "🌐 Check the **Social** section of Shubham's portfolio for all social media links.",
  },
  {
    keys: ["hello", "hi", "hey", "hii", "good morning", "good afternoon", "greet"],
    answer:
      "👋 Hello! I'm Shubham's portfolio assistant. Ask me anything about Shubham — his skills, experience, projects, education, or contact info!",
  },
  {
    keys: ["thank", "thanks", "awesome", "great", "cool"],
    answer: "😊 You're welcome! Feel free to ask me anything else about Shubham.",
  },
  {
    keys: ["salary", "ctc", "package", "compensation"],
    answer: "💼 For salary or compensation discussions, please contact Shubham directly at **pawarshubh890@gmail.com** or reach out via LinkedIn.",
  },
  {
    keys: ["open to work", "looking for job", "job search", "opportunity"],
    answer: "🟢 Yes! Shubham is **Open to Work** and actively looking for exciting opportunities in full-stack or frontend development. Drop him a message via the Contact section!",
  },
];

// Funny fallback responses for unknown / random questions
const FUNNY_REPLIES = [
  // ── Original 8 ───────────────────────────────────────────────────────────────
  "😄 Sir is currently busy with some very *important* work — that's exactly why I'm here! Ask me something about his skills or projects instead! 🚀",
  "🤭 Shubham is in a meeting with his keyboard and some serious code right now. I'm holding the fort! Try asking: **'What are his skills?'**",
  "😂 That's classified information! What I *can* tell you is that Shubham is a brilliant developer. Want to know about his projects?",
  "🙈 Oops! That went right over my digital head. I'm Shubham's portfolio bot — I only know about his skills, projects, and experience. Ask me those!",
  "🤖 Beep boop… question not found in my Shubham-database! Try: **'What technologies does he use?'** or **'Tell me about his experience'**",
  "😅 I wish I could help, but Shubham only programmed me to know about *him* — and trust me, there's a lot to know! Ask away about his work.",
  "🎯 Nice try, but I'm strictly a portfolio assistant! Ask me about Shubham's projects like **Bondsmart** or **Zaanvar** — those are way more interesting!",
  "😆 Shubham said: *'If they ask something weird, just smile and redirect!'* — so... what would you like to know about his tech stack? 😊",

  // ── 20 New ones ───────────────────────────────────────────────────────────────
  "🔍 I searched all 1,024 memory cells and found nothing on that topic! But I *do* know everything about Shubham — want his skills or projects?",
  "🧑‍💻 Error 404: Answer not found. But don't worry — I'm 200 OK on questions about Shubham's work experience and projects! Give it a try!",
  "🎪 *Drumroll please* — nope, that's outside my expertise. But I can tell you that Shubham literally built **Bondsmart.com** in production. Ask me about that!",
  "📡 Signal lost on that question... Reconnecting to Shubham's portfolio... Done! Now ask me about his skills or experience! 😄",
  "🤷 I'm just a humble bot, not Google! But what I DO know is that Shubham has 2+ years of experience as a Full Stack Developer. Ask me more!",
  "🎭 *Dramatically checks notes* ...nothing here on that topic. But there's a LOT about Shubham's work at **Ideas To Impacts**. Want to know?",
  "🧠 My neural circuits are firing but... no result! This bot only runs on Shubham-data. Try: **'What are his projects?'** and watch me shine! ✨",
  "🐣 Oh, you caught me still learning! I'm trained only on Shubham's portfolio — his skills, jobs, and projects are my entire universe 🌍",
  "😎 Bold question! Shubham would probably answer that himself, but he's coding away at the moment. Ask me about his tech stack instead!",
  "🎮 Achievement unlocked: *Asked the bot something it can't answer!* 🏆 Now try the real challenge — ask me about **Rconspace** or **Zaanvar.com**!",
  "🌀 *Buffering...* I searched the Shubham-verse and came up empty! But his **CGPA of 8.3** and 2+ years of experience? That I know cold! 😄",
  "🐧 Waddle waddle... I slipped on that one! I'm only programmed to talk about Shubham — his career, skills, and killer projects. Go ahead, ask!",
  "🕵️ *Puts on detective hat* ...no clues found for that query! But I CAN tell you Shubham is currently building **Bondsmart.com** at Ideas To Impacts!",
  "🎸 That question just played a wrong note in my circuits! Let me tune back in — ask me about Shubham's **MERN Stack** skills or his **PostgreSQL** experience!",
  "🌮 Even I want to take a break from that question! How about we talk about something tasty — like how Shubham went from intern to full-time dev in 6 months? 🔥",
  "🤡 Honk honk! Wrong chatbot, buddy! I'm the *serious* one — specialising in Shubham Pawar's career, projects, and skills. Let's talk about those!",
  "🦄 That question is as rare as a unicorn — and I have no answer for it! But Shubham's journey from **Aivariant intern** to **Software Developer** is pretty magical too!",
  "😴 Zzz... that question put my servers to sleep! Wake me up with something about Shubham — like his **React.js**, **Node.js**, or **Next.js** skills!",
  "🎩 *Tips hat* Wonderful question, but alas — not in my repertoire! Now, if you'd like to know about Shubham's experience at **mr.chams** or **Ideas To Impacts**, I'm all ears!",
  "🚀 Houston, we have a problem — that's outside my data! But Shubham's full-stack journey? I have the complete mission logs. Ask away, astronaut! 🌙",
];

function getReply(userInput) {
  const input = userInput.toLowerCase().trim();
  for (const entry of KB) {
    if (entry.keys.some((k) => input.includes(k))) {
      return entry.answer;
    }
  }
  // Funny fallback — pick one randomly so it feels fresh every time
  return FUNNY_REPLIES[Math.floor(Math.random() * FUNNY_REPLIES.length)];
}

// ── Render markdown-style bold text ──────────────────────────────────────────
function renderText(text) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((p, i) =>
    i % 2 === 1 ? <strong key={i}>{p}</strong> : <span key={i}>{p}</span>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "👋 Hi! I'm Shubham's AI assistant. Ask me anything about him — skills, projects, education, or contact!" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    // Simulate a short think-time for realism
    setTimeout(() => {
      const reply = getReply(trimmed);
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
      setTyping(false);
    }, 600);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* === Floating Trigger Button === */}
      <button
        className={styles.chatbotTrigger}
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle AI assistant"
        title="Chat with Shubham's AI"
      >
        {open ? "✕" : "🤖"}
      </button>

      {/* === Chat Window === */}
      {open && (
        <div className={styles.chatbotWindow}>
          {/* Header */}
          <div className={styles.chatbotHeader}>
            <div className={styles.chatbotAvatar}>SP</div>
            <div>
              <div className={styles.chatbotName}>Shubham's AI</div>
              <div className={styles.chatbotStatus}>● Online</div>
            </div>
            <button className={styles.chatbotClose} onClick={() => setOpen(false)}>✕</button>
          </div>

          {/* Messages */}
          <div className={styles.chatbotMessages}>
            {messages.map((msg, i) => (
              <div key={i} className={`${styles.chatbotMsg} ${styles[msg.role]}`}>
                {msg.role === "bot" && <div className={styles.chatbotBotIcon}>🤖</div>}
                <div className={styles.chatbotBubble}>
                  {msg.text.split("\n").map((line, li) => (
                    <p key={li}>{renderText(line)}</p>
                  ))}
                </div>
              </div>
            ))}
            {typing && (
              <div className={`${styles.chatbotMsg} ${styles.bot}`}>
                <div className={styles.chatbotBotIcon}>🤖</div>
                <div className={`${styles.chatbotBubble} ${styles.typingDots}`}>
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick suggestions */}
          <div className={styles.chatbotSuggestions}>
            {["Skills", "Education", "Projects", "Contact"].map((s) => (
              <button
                key={s}
                className={styles.chatbotChip}
                onClick={() => {
                  setInput(s);
                  setTimeout(() => {
                    setMessages((prev) => [...prev, { role: "user", text: s }]);
                    setInput("");
                    setTyping(true);
                    setTimeout(() => {
                      setMessages((prev) => [...prev, { role: "bot", text: getReply(s) }]);
                      setTyping(false);
                    }, 600);
                  }, 0);
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className={styles.chatbotInputRow}>
            <input
              className={styles.chatbotInput}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about Shubham..."
            />
            <button className={styles.chatbotSend} onClick={send}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}