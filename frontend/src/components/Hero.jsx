
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import { Brain, FileText, Sparkles, MessageSquare, Zap, BookOpen } from "lucide-react";

const features = [
  { icon: <Brain size={28} />,        title: "Notes Generator",  desc: "Generate smart summaries instantly from study materials.",   color: "#7c3aed", glow: "rgba(124,58,237,0.25)"  },
  { icon: <FileText size={28} />,     title: "PDF Analyzer",     desc: "Upload PDFs and ask AI questions directly.",                 color: "#06b6d4", glow: "rgba(6,182,212,0.25)"   },
  { icon: <MessageSquare size={28} />,title: "AI Chat Assistant",desc: "Get instant explanations for any topic.",                    color: "#ec4899", glow: "rgba(236,72,153,0.25)"  },
  { icon: <Sparkles size={28} />,     title: "Quiz Generator",   desc: "Create auto-generated MCQs and quizzes.",                   color: "#f59e0b", glow: "rgba(245,158,11,0.25)"  },
  { icon: <BookOpen size={28} />,     title: "Flashcards",       desc: "Turn notes into Q&A flashcards for fast revision.",         color: "#34d399", glow: "rgba(52,211,153,0.25)"  },
  { icon: <Zap size={28} />,          title: "Instant Results",  desc: "Powered by Groq — AI responses in under a second.",         color: "#a78bfa", glow: "rgba(167,139,250,0.25)" },
];

const Hero = () => {
  return (
    <div>

      {/* ── HERO ── */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-[#020008]">

        {/* Orbs */}
        <motion.div animate={{ x: [0,80,0], y: [0,-60,0] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <motion.div animate={{ x: [0,-80,0], y: [0,60,0] }} transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute bottom-20 right-20 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <motion.div animate={{ scale: [1,1.2,1] }} transition={{ repeat: Infinity, duration: 6 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)", filter: "blur(40px)" }} />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />

        <div className="text-center z-10 max-w-5xl mx-auto pt-20">

          {/* Badge */}
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
            className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full text-sm font-medium text-purple-300"
            style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.4)", boxShadow: "0 0 20px rgba(139,92,246,0.2)" }}>
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            ✨ Next-Gen AI Study Platform
          </motion.div>

          {/* Heading */}
          <motion.h1 initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.1 }}
            className="text-7xl font-black leading-tight tracking-tight mb-6"
            style={{ background: "linear-gradient(135deg, #fff 0%, #a78bfa 40%, #22d3ee 80%, #fff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Study Smarter.<br />Score Higher.
          </motion.h1>

          {/* Typewriter */}
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }}
            className="text-2xl text-gray-400 mb-10 h-10">
            <TypeAnimation
              sequence={["📄 Upload notes instantly...", 2000, "🤖 Generate AI summaries...", 2000, "💬 Ask questions from PDFs...", 2000, "🧠 Ace your exams...", 2000]}
              speed={55} repeat={Infinity} />
          </motion.p>

          {/* CTA */}
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }}
            className="flex gap-4 justify-center mb-16">
            <Link to="/dashboard">
              <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}
                className="px-10 py-4 rounded-2xl text-lg font-bold text-white"
                style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)", boxShadow: "0 0 30px rgba(124,58,237,0.5)" }}>
                🚀 Launch AI
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.7 }}
            className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[["10x","Faster Learning","#7c3aed"],["PDF","AI Analyzer","#06b6d4"],["24/7","AI Assistant","#ec4899"]].map(([val,label,color]) => (
              <div key={label} className="rounded-2xl p-5 text-center"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(10px)" }}>
                <div className="text-3xl font-black mb-1" style={{ color }}>{val}</div>
                <div className="text-sm text-gray-500">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 px-6 relative" style={{ background: "#020008" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)", filter: "blur(60px)" }} />

        <div className="max-w-6xl mx-auto">
        </div>
      </section>
    </div>
  );
}

export default Hero;