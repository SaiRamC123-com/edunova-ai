import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import Sidebar from "./Sidebar";
import { FaMicrophone } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Brain, FileText, Sparkles, MessageSquare, Zap } from "lucide-react";

const stats = [
  { label: "Chats Today", value: "12", color: "#06b6d4", glow: "rgba(6,182,212,0.3)" },
  { label: "PDFs Analyzed", value: "5", color: "#a78bfa", glow: "rgba(167,139,250,0.3)" },
  { label: "Quizzes Done", value: "3", color: "#34d399", glow: "rgba(52,211,153,0.3)" },
  { label: "Notes Created", value: "8", color: "#f59e0b", glow: "rgba(245,158,11,0.3)" },
];

const quickActions = [
  { icon: <Brain size={24} />, label: "Notes Generator", link: "/notes-generator", color: "#7c3aed", glow: "rgba(124,58,237,0.4)" },
  { icon: <FileText size={24} />, label: "PDF Analyzer", link: "/pdf-upload", color: "#06b6d4", glow: "rgba(6,182,212,0.4)" },
  { icon: <Sparkles size={24} />, label: "Quiz Generator", link: "/quiz-generator", color: "#f59e0b", glow: "rgba(245,158,11,0.4)" },
];

const createNewChat = () => {};

const AIChat = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const bottomRef = useRef(null);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = "en-US";

  const startListening = () => {
    recognition.start();
    recognition.onstart = () => toast.success("Listening...");
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setPrompt(transcript);
      toast.success("Voice Captured");
    };
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!prompt) return;
    setShowChat(true);
    const userMessage = { role: "user", content: prompt };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setLoading(true);
    setPrompt("");
    try {
      const response = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = await response.json();
      const aiText = data.choices?.[0]?.message?.content || data.error?.message || "No response.";
      setMessages((prev) => [...prev, { role: "assistant", content: aiText }]);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen text-white overflow-hidden" style={{ background: "#020008" }}>
      <Sidebar createNewChat={createNewChat} chatHistory={[]} setMessages={setMessages} />

      {/* Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div className="absolute bottom-0 left-40 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Header */}
        <div className="p-6 flex justify-between items-center"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", backdropFilter: "blur(20px)" }}>
          <div>
            <h1 className="text-2xl font-black"
              style={{ background: "linear-gradient(135deg, #fff, #a78bfa, #22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              StudyNova AI
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">Your AI Study Assistant</p>
          </div>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-black"
            style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}>S</div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">

          {/* Stats */}
          {!showChat && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-gray-500 text-sm font-semibold mb-4 uppercase tracking-wider">Your Stats</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-5 rounded-2xl"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <p className="text-4xl font-black mb-1" style={{ color: stat.color }}>{stat.value}</p>
                    <p className="text-gray-500 text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Quick Actions */}
          {!showChat && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <p className="text-gray-500 text-sm font-semibold mb-4 uppercase tracking-wider">Quick Actions</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickActions.map((action, i) => (
                  <Link to={action.link} key={i}>
                    <motion.div whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      className="p-5 rounded-2xl flex items-center gap-4 cursor-pointer"
                      style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${action.color}40`, boxShadow: `0 0 20px ${action.glow}` }}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: `${action.color}20`, color: action.color }}>
                        {action.icon}
                      </div>
                      <span className="font-semibold text-white">{action.label}</span>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* Welcome */}
          {!showChat && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="rounded-2xl p-8 text-center"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <MessageSquare size={40} className="text-cyan-400 mx-auto mb-3" />
              <h2 className="text-xl font-bold mb-1">Start a Conversation</h2>
              <p className="text-gray-500 text-sm">Ask me anything about your studies below 👇</p>
            </motion.div>
          )}

          {/* Chat Messages */}
          {showChat && (
            <div className="space-y-5">
              {messages.map((msg, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className={`max-w-3xl p-5 rounded-2xl ${msg.role === "user" ? "ml-auto text-white" : ""}`}
                  style={msg.role === "user"
                    ? { background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }
                    : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <ReactMarkdown
                    components={{
                      code({ inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <SyntaxHighlighter style={tomorrow} language={match[1]} PreTag="div" {...props}>
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code className="bg-black/30 px-2 py-1 rounded">{children}</code>
                        );
                      },
                    }}
                  >{msg.content}</ReactMarkdown>
                </motion.div>
              ))}
              {loading && (
                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }}
                  className="flex items-center gap-3 p-5 rounded-2xl w-48"
                  style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)" }}>
                  <Zap size={16} className="text-purple-400" />
                  <span className="text-purple-300 text-sm">AI is thinking...</span>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-5 flex gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", backdropFilter: "blur(20px)" }}>
          <input type="text" value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask anything about your studies..."
            className="flex-1 p-4 rounded-2xl text-white outline-none"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
          />
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            className="px-7 rounded-2xl font-semibold text-black"
            style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}>
            Send
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={startListening}
            className="px-5 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #ec4899, #7c3aed)" }}>
            <FaMicrophone size={18} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;