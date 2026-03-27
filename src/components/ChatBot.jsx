"use client";
import { useState } from "react";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi 👋 How can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Error getting response 😢" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <div style={chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.role === "user" ? "right" : "left",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                background: msg.role === "user" ? "#dc143c" : "#eee",
                color: msg.role === "user" ? "#fff" : "#000",
                padding: "8px 12px",
                borderRadius: "10px",
                display: "inline-block",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}

        {loading && <p>Typing...</p>}
      </div>

      <div style={inputBox}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type message..."
          style={inputStyle}
        />
        <button onClick={sendMessage} style={btn}>
          Send
        </button>
      </div>
    </div>
  );
}

// styles
const container = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  width: "300px",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
};

const chatBox = {
  height: "300px",
  overflowY: "auto",
  padding: "10px",
};

const inputBox = {
  display: "flex",
  borderTop: "1px solid #ccc",
};

const inputStyle = {
  flex: 1,
  padding: "10px",
  border: "none",
  outline: "none",
};

const btn = {
  background: "crimson",
  color: "#fff",
  border: "none",
  padding: "10px",
  cursor: "pointer",
};