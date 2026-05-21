import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Sparkles, Zap, BookOpen } from "lucide-react";

const QuizGenerator = () => {
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState("");
  const [loading, setLoading] = useState(false);

  const generateQuiz = async () => {
    if (!topic) return;
    setLoading(true);
    toast.loading("Generating Quiz...", { id: "quiz" });
    try {
      const response = await fetch("https://edunova-ai-8r0m.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{
            role: "user",
            content: `Generate 5 MCQs with answers about: ${topic}\n\nFormat clearly.`,
          }],
        }),
      });
      const data = await response.json();
      const aiText = data.choices?.[0]?.message?.content || data.error?.message || "No response.";
      setQuiz(aiText);
      toast.success("Quiz Ready!", { id: "quiz" });
    } catch (error) {
      console.log(error);
      toast.error("Failed to generate quiz", { id: "quiz" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen text-white p-10 relative overflow-hidden" style={{ background: "#020008" }}>

      {/* Orbs */}
      <div className="absolute top-20 right-20 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute bottom-20 left-20 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }} className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm text-amber-300 mb-4"
            style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)" }}>
            <Sparkles size={14} /> Quiz Generator
          </div>
          <h1 className="text-5xl font-black"
            style={{ background: "linear-gradient(135deg, #fff 0%, #fbbf24 50%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            AI Quiz Generator
          </h1>
          <p className="text-gray-400 mt-2">Enter any topic and get 5 MCQs instantly</p>
        </div>

        {/* Input */}
        <div className="flex gap-3 mb-8">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generateQuiz()}
            placeholder="Enter topic... (e.g. Photosynthesis, World War 2)"
            className="flex-1 p-4 rounded-2xl text-white outline-none"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
          />
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            onClick={generateQuiz}
            className="px-8 py-4 rounded-2xl font-bold text-black flex items-center gap-2"
            style={{ background: "linear-gradient(135deg, #f59e0b, #7c3aed)", boxShadow: "0 0 25px rgba(245,158,11,0.3)" }}>
            <Zap size={18} /> Generate
          </motion.button>
        </div>

        {/* Loading */}
        {loading && (
          <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }}
            className="rounded-2xl p-5 text-center flex items-center justify-center gap-3 mb-6"
            style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.3)" }}>
            <Zap size={18} className="text-amber-400" />
            <span className="text-amber-300 font-medium">AI is generating questions...</span>
          </motion.div>
        )}

        {/* Quiz Result */}
        {quiz && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-8"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(10px)" }}>
            <div className="flex items-center gap-2 mb-5">
              <BookOpen size={20} className="text-amber-400" />
              <h2 className="text-2xl font-bold text-white">Your Quiz</h2>
            </div>
            <p className="text-gray-300 whitespace-pre-wrap leading-8">{quiz}</p>
          </motion.div>
        )}

      </motion.div>
    </div>
  );
};

export default QuizGenerator;