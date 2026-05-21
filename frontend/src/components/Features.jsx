import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Brain, FileText, MessageSquare, Sparkles } from "lucide-react";

const features = [
  {
    icon: <Brain size={32} />,
    title: "AI Notes Generator",
    desc: "Generate smart summaries instantly from study materials.",
    link: "/notes-generator",
    color: "#7c3aed",
    glow: "rgba(124,58,237,0.3)",
    gradient: "from-purple-600 to-purple-400",
  },
  {
    icon: <FileText size={32} />,
    title: "PDF Analyzer",
    desc: "Upload PDFs and ask AI questions directly.",
    link: "/pdf-upload",
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.3)",
    gradient: "from-cyan-600 to-cyan-400",
  },
  {
    icon: <MessageSquare size={32} />,
    title: "AI Chat Assistant",
    desc: "Get instant explanations for any topic.",
    link: "/dashboard",
    color: "#ec4899",
    glow: "rgba(236,72,153,0.3)",
    gradient: "from-pink-600 to-pink-400",
  },
  {
    icon: <Sparkles size={32} />,
    title: "Quiz Generator",
    desc: "Create MCQs and quizzes automatically.",
    link: "/quiz-generator",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.3)",
    gradient: "from-amber-600 to-amber-400",
  },
];

const Features = () => {
  return (
    <section className="py-32 px-6 bg-[#020008] relative overflow-hidden">

      {/* Background orbs */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-sm text-purple-300"
            style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.3)" }}>
            <Sparkles size={14} /> Powerful Features
          </div>
          <h2 className="text-6xl font-black text-white mb-4">
           
            <span style={{ background: "linear-gradient(135deg, #a78bfa, #22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Powerfull AI Features
            </span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Four powerful AI tools designed to transform how you study
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <Link to={f.link} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl p-6 h-full cursor-pointer relative overflow-hidden group"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(10px)" }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${f.glow} 0%, transparent 70%)` }} />

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 relative"
                  style={{ background: `${f.color}20`, border: `1px solid ${f.color}40`, color: f.color, boxShadow: `0 0 20px ${f.glow}` }}>
                  {f.icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>

                {/* Arrow */}
                <div className="mt-5 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: f.color }}>
                  Explore → 
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;