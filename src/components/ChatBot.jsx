"use client";

import { useState, useRef, useEffect } from "react";

// ── Portfolio knowledge base ──────────────────────────────────────────────────
const KB = [
  {
    keys: ["name", "who are you", "who is shubham", "introduce", "yourself"],
    answer:
      "👋 I'm **Shubham Pawar** — a passionate **MERN Stack & Frontend Developer** from Maharashtra, India. I love building modern, responsive web applications.",
  },
  {
    keys: ["skills", "technology", "tech stack", "languages", "know what", "tools"],
    answer:
      "💻 Shubham's skills include:\n• **Frontend:** React, Next.js, HTML, CSS, JavaScript\n• **Backend:** Node.js, Express\n• **Database:** MongoDB, MySQL, Prisma\n• **Others:** Git, GitHub, REST APIs",
  },
  {
    keys: ["react"],
    answer: "⚛️ React — 80% proficiency. Shubham has strong hands-on experience building component-based UIs with React.",
  },
  {
    keys: ["next", "nextjs", "next.js"],
    answer: "▲ Next.js — 80% proficiency. Shubham uses Next.js for SSR/SSG web applications.",
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
    answer: "🟢 Node.js — 60% proficiency. Shubham uses Node.js for backend REST APIs.",
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
    keys: ["mysql"],
    answer: "🗄️ MySQL — 70% proficiency. Shubham has experience with relational database design.",
  },
  {
    keys: ["education", "study", "college", "degree", "cgpa", "university", "diploma"],
    answer:
      "🎓 Education:\n• **Diploma in Engineering** (2021)\n• **BE in Computer Science & Engineering** — Dr. Rajendra Gode Institute of Technology & Research, Amravati (2021–2024, CGPA: 8.3)",
  },
  {
    keys: ["cgpa", "marks", "grade", "score", "percentage"],
    answer: "📊 Shubham completed his BE in CSE with a **CGPA of 8.3** from Dr. Rajendra Gode Institute, Amravati.",
  },
  {
    keys: ["project", "work", "portfolio", "built", "created", "developed"],
    answer:
      "🚀 Shubham has worked on multiple web projects involving React, Next.js, Node.js and MongoDB showcased in the Projects section of this portfolio.",
  },
  {
    keys: ["contact", "email", "reach", "hire", "connect", "message"],
    answer:
      "📬 You can contact Shubham at:\n• **Email:** pawarshubh980@gmail.com\n• **LinkedIn:** linkedin.com/in/shubham-pawar1703\n• **Location:** Maharashtra, India",
  },
  {
    keys: ["github profile", "github link", "code"],
    answer: "🐙 Shubham's GitHub: **github.com/Shubhhya17** — check out his repositories there!",
  },
  {
    keys: ["linkedin"],
    answer: "🔗 LinkedIn: **linkedin.com/in/shubham-pawar1703**",
  },
  {
    keys: ["location", "address", "from", "city", "state", "india"],
    answer: "📍 Shubham is based in **Maharashtra, India**.",
  },
  {
    keys: ["experience", "years", "working", "professional"],
    answer:
      "💼 Shubham is a fresher developer with strong academic and project experience in React, Next.js, and the MERN stack, actively looking for opportunities.",
  },
  {
    keys: ["freelance", "freelancer", "hire me", "available"],
    answer:
      "✅ Yes! Shubham is available as a **Freelancer** and is open to full-time and contract opportunities in frontend/full-stack development.",
  },
  {
    keys: ["mern", "full stack", "fullstack"],
    answer:
      "🔧 Shubham is currently learning and building with the **MERN Stack** (MongoDB, Express, React, Node.js) to become a full-stack developer.",
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
      "👋 Hello! I'm Shubham's portfolio assistant. Ask me anything about Shubham — his skills, education, projects, contact info, or career!",
  },
  {
    keys: ["thank", "thanks", "awesome", "great", "cool"],
    answer: "😊 You're welcome! Feel free to ask me anything else about Shubham.",
  },
];

function getReply(userInput) {
  const input = userInput.toLowerCase().trim();
  for (const entry of KB) {
    if (entry.keys.some((k) => input.includes(k))) {
      return entry.answer;
    }
  }
  return "🤔 I can only answer questions about Shubham Pawar's portfolio — skills, education, projects, contact info, and career. Try asking something like *'What are his skills?'* or *'How to contact him?'*";
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
        className="chatbot-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle AI assistant"
        title="Chat with Shubham's AI"
      >
        {open ? "✕" : "🤖"}
      </button>

      {/* === Chat Window === */}
      {open && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-avatar">SP</div>
            <div>
              <div className="chatbot-name">Shubham's AI</div>
              <div className="chatbot-status">● Online</div>
            </div>
            <button className="chatbot-close" onClick={() => setOpen(false)}>✕</button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg ${msg.role}`}>
                {msg.role === "bot" && <div className="chatbot-bot-icon">🤖</div>}
                <div className="chatbot-bubble">
                  {msg.text.split("\n").map((line, li) => (
                    <p key={li}>{renderText(line)}</p>
                  ))}
                </div>
              </div>
            ))}
            {typing && (
              <div className="chatbot-msg bot">
                <div className="chatbot-bot-icon">🤖</div>
                <div className="chatbot-bubble typing-dots">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick suggestions */}
          <div className="chatbot-suggestions">
            {["Skills", "Education", "Projects", "Contact"].map((s) => (
              <button
                key={s}
                className="chatbot-chip"
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
          <div className="chatbot-input-row">
            <input
              className="chatbot-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about Shubham..."
            />
            <button className="chatbot-send" onClick={send}>➤</button>
          </div>
        </div>
      )}

      <style jsx global>{`
        /* === Trigger button === */
        .chatbot-trigger {
          position: fixed;
          bottom: 80px;
          right: 28px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: crimson;
          color: #fff;
          border: none;
          font-size: 24px;
          cursor: pointer;
          z-index: 9999;
          box-shadow: 0 4px 20px rgba(220, 20, 60, 0.5);
          transition: transform 0.3s, box-shadow 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .chatbot-trigger:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 28px rgba(220, 20, 60, 0.7);
        }

        /* === Chat window === */
        .chatbot-window {
          position: fixed;
          bottom: 148px;
          right: 28px;
          width: 340px;
          max-height: 500px;
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.18);
          z-index: 9999;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: chatSlideIn 0.3s ease;
        }
        @keyframes chatSlideIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)  scale(1); }
        }

        /* === Header === */
        .chatbot-header {
          background: crimson;
          color: #fff;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .chatbot-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          flex-shrink: 0;
        }
        .chatbot-name {
          font-weight: 700;
          font-size: 15px;
        }
        .chatbot-status {
          font-size: 11px;
          opacity: 0.85;
          color: #aaffaa;
        }
        .chatbot-close {
          margin-left: auto;
          background: none;
          border: none;
          color: #fff;
          font-size: 18px;
          cursor: pointer;
          opacity: 0.8;
        }
        .chatbot-close:hover { opacity: 1; }

        /* === Messages === */
        .chatbot-messages {
          flex: 1;
          overflow-y: auto;
          padding: 14px 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .chatbot-messages::-webkit-scrollbar { width: 4px; }
        .chatbot-messages::-webkit-scrollbar-thumb { background: #ddd; border-radius: 2px; }

        .chatbot-msg {
          display: flex;
          align-items: flex-end;
          gap: 6px;
        }
        .chatbot-msg.user {
          flex-direction: row-reverse;
        }
        .chatbot-bot-icon {
          font-size: 20px;
          flex-shrink: 0;
          line-height: 1;
        }

        .chatbot-bubble {
          max-width: 78%;
          padding: 10px 14px;
          border-radius: 16px;
          font-size: 14px;
          line-height: 1.5;
          word-break: break-word;
        }
        .chatbot-bubble p { margin: 2px 0; }

        .chatbot-msg.bot .chatbot-bubble {
          background: #f3f4f6;
          color: #111;
          border-bottom-left-radius: 4px;
        }
        .chatbot-msg.user .chatbot-bubble {
          background: crimson;
          color: #fff;
          border-bottom-right-radius: 4px;
        }

        /* === Typing dots === */
        .typing-dots {
          display: flex;
          gap: 5px;
          align-items: center;
          padding: 12px 16px;
        }
        .typing-dots span {
          width: 8px;
          height: 8px;
          background: #aaa;
          border-radius: 50%;
          display: inline-block;
          animation: typingBounce 1.2s infinite;
        }
        .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typingBounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }

        /* === Quick suggestions === */
        .chatbot-suggestions {
          display: flex;
          gap: 6px;
          padding: 6px 12px;
          overflow-x: auto;
          flex-shrink: 0;
        }
        .chatbot-suggestions::-webkit-scrollbar { display: none; }
        .chatbot-chip {
          background: #fff0f3;
          border: 1px solid crimson;
          color: crimson;
          border-radius: 20px;
          padding: 4px 12px;
          font-size: 12px;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s;
        }
        .chatbot-chip:hover { background: crimson; color: #fff; }

        /* === Input === */
        .chatbot-input-row {
          display: flex;
          border-top: 1px solid #eee;
          padding: 10px 12px;
          gap: 8px;
          flex-shrink: 0;
        }
        .chatbot-input {
          flex: 1;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 8px 12px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
        }
        .chatbot-input:focus { border-color: crimson; }
        .chatbot-send {
          background: crimson;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 8px 14px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .chatbot-send:hover { background: #b01030; }

        @media (max-width: 400px) {
          .chatbot-window { width: calc(100vw - 20px); right: 10px; }
        }
      `}</style>
    </>
  );
}