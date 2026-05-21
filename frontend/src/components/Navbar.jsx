import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [dark, setDark] = useState(true);

  // Apply theme to <html> tag
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.background = "#020008";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.background = "#f8fafc";
    }
  }, [dark]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
      style={{
        background: dark ? "rgba(2,0,8,0.8)" : "rgba(255,255,255,0.8)",
        backdropFilter: "blur(20px)",
        borderBottom: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.08)",
      }}
    >
      {/* Logo */}
      <h1
        className="text-2xl font-black"
        style={{
          background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        StudyGenix AI
      </h1>

      {/* Nav links + toggle */}
      <div className="flex gap-6 items-center">
        <button
          onClick={() => scrollTo("features")}
          className="font-medium transition"
          style={{ color: dark ? "#9ca3af" : "#4b5563" }}
          onMouseEnter={e => e.target.style.color = "#06b6d4"}
          onMouseLeave={e => e.target.style.color = dark ? "#9ca3af" : "#4b5563"}
        >
          Features
        </button>
        <button
          onClick={() => scrollTo("about")}
          className="font-medium transition"
          style={{ color: dark ? "#9ca3af" : "#4b5563" }}
          onMouseEnter={e => e.target.style.color = "#06b6d4"}
          onMouseLeave={e => e.target.style.color = dark ? "#9ca3af" : "#4b5563"}
        >
          About
        </button>

        {/* Dark/Light toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setDark(!dark)}
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
          style={{
            background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
            border: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.12)",
            color: dark ? "#fbbf24" : "#7c3aed",
          }}
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </motion.button>

        {/* Get Started */}
        <Link to="/dashboard">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2 rounded-xl font-bold text-white text-sm"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              boxShadow: "0 0 20px rgba(124,58,237,0.3)",
            }}
          >
            Get Started
          </motion.button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;