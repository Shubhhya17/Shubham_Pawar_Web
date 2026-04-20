"use client";

import { useState, useRef, useEffect } from "react";
import styles from "../styles/ChatBot.module.css";

// ── Icons (SVG) ─────────────────────────────────────────────────────────────
const IconBot = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" />
  </svg>
);
const IconSend = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const IconClose = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconMic = ({size=20}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
  </svg>
);

// ── Utils ───────────────────────────────────────────────────────────────────
function renderText(text) {
  if (!text) return "";
  // Basic markdown support for **bold**
  return text.split(/\*\*(.*?)\*\*/g).map((p, i) => i % 2 === 1 ? <strong key={i}>{p}</strong> : <span key={i}>{p}</span>);
}

const QUICK_REPLIES = [
  "Who is Shubham?",
  "What are your projects?",
  "Technical skills?",
  "How can I hire you?",
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("chat"); // 'chat' or 'voice'
  const [messages, setMessages] = useState([
    { role: "bot", text: "👋 Hi! I'm Shubham's AI Assistant. How can I help you today?", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const bottomRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, typing]);

  useEffect(() => {
    const SpeechRecognition = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.onresult = (e) => {
        const t = e.results[0][0].transcript;
        send(t);
      };
      recognitionRef.current.onend = () => setListening(false);
    }
  }, []);

  const speak = (text) => {
    if (mode === "chat") return;
    const u = new SpeechSynthesisUtterance(text.replace(/\*\*/g, ''));
    const voices = window.speechSynthesis.getVoices();
    u.voice = voices.find(v => v.name.includes("Female") || v.name.includes("Google US English")) || voices[0];
    window.speechSynthesis.speak(u);
  };

  const send = async (textOverride) => {
    const trimmed = (textOverride || input).trim();
    if (!trimmed || typing) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage = { role: "user", text: trimmed, time: userTime };
    
    setMessages(p => [...p, newMessage]);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch("/api/chat", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ 
          message: trimmed,
          history: messages.slice(-10) // Send context
        }) 
      });
      
      const data = await res.json();
      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      if (res.ok) {
        setMessages(p => [...p, { role: "bot", text: data.reply, time: botTime }]);
        speak(data.reply);
      } else {
        console.error("ChatBot API Error:", data.error);
        throw new Error(data.error || "Unknown error");
      }
    } catch (err) {
      console.error("ChatBot Fetch Error:", err);
      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const fallback = `Assistant is offline (Error: ${err.message}). I'm Shubham's AI assistant—please try again after a moment or check the console for details.`;
      setMessages(p => [...p, { role: "bot", text: fallback, time: botTime }]);
    } finally { 
      setTyping(false); 
    }
  };

  return (
    <>
      <button 
        className={`${styles.chatbotTrigger} ${open ? styles.active : ""}`} 
        onClick={() => setOpen(!open)}
        aria-label="Toggle Chatbot"
      >
        {open ? <IconClose /> : <IconBot />}
      </button>

      {open && (
        <div className={styles.chatbotWindow}>
          <div className={styles.chatbotHeader}>
            <div className={styles.chatbotHeaderTop}>
              <div className={styles.chatbotHeaderMain}>
                <div className={styles.chatbotAvatar}><IconBot /></div>
                <div>
                  <div className={styles.chatbotName}>AI Assistant</div>
                  <div className={styles.chatbotStatus}>Online</div>
                </div>
              </div>
              <div className={styles.modeToggle}>
                <button className={`${styles.modeBtn} ${mode === "chat" ? styles.modeBtnActive : ""}`} onClick={() => setMode("chat")}>Chat</button>
                <button className={`${styles.modeBtn} ${mode === "voice" ? styles.modeBtnActive : ""}`} onClick={() => setMode("voice")}>Voice</button>
              </div>
            </div>
          </div>

          <div className={styles.chatbotMessages}>
            {mode === "chat" ? (
              <>
                {messages.map((msg, i) => (
                  <div key={i} className={`${styles.chatbotMsg} ${styles[msg.role]}`}>
                    <div className={styles.chatbotBubble}>
                      {renderText(msg.text)}
                      <span className={styles.msgTime}>{msg.time}</span>
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className={`${styles.chatbotMsg} ${styles.bot}`}>
                    <div className={styles.chatbotBubble}>
                      <div className={styles.typingDots}><span/><span/><span/></div>
                    </div>
                  </div>
                )}
                
                {/* Quick Replies */}
                <div className={styles.quickReplies}>
                  {QUICK_REPLIES.map((q, i) => (
                    <button key={i} className={styles.quickReplyBtn} onClick={() => send(q)}>
                      {q}
                    </button>
                  ))}
                </div>
                <div ref={bottomRef} />
              </>
            ) : (
              <div className={styles.assistantPulse}>
                <div className={`${styles.pulseMic} ${listening ? styles.listening : ""}`} onClick={() => { setListening(true); recognitionRef.current?.start(); }}>
                  <IconMic size={32} />
                </div>
                <p className={styles.pulseText}>{listening ? "Listening..." : "Tap to Speak to Assistant"}</p>
                <div className={styles.voiceLastMsg}>
                  {messages.filter(m => m.role === 'bot').slice(-1).map((msg, i) => (
                    <div key={i} className={styles.chatbotBubble} style={{textAlign: 'center'}}>{renderText(msg.text)}</div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {mode === "chat" && (
            <div className={styles.chatbotInputRow}>
              <input 
                className={styles.chatbotInput} 
                value={input} 
                onChange={e => setInput(e.target.value)} 
                onKeyDown={e => e.key === "Enter" && send()} 
                placeholder="Ask me anything..." 
              />
              <button className={styles.chatbotSend} onClick={() => send()} disabled={!input.trim() || typing}>
                <IconSend />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
