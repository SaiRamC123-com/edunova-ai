import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="w-72 bg-white/5 border-r border-white/10 backdrop-blur-xl p-6 hidden md:flex flex-col"
    >
      <h1 className="text-3xl font-bold text-cyan-400">
        StudyNova
      </h1>

      <Link to="/dashboard">
        <button className="mt-10 w-full bg-cyan-500 hover:bg-cyan-600 p-4 rounded-2xl transition">
          + New Chat
        </button>
      </Link>

      <div className="mt-10 space-y-4 text-gray-400">
        <Link to="/dashboard">
          <div className="bg-white/5 p-4 rounded-xl hover:bg-white/10 cursor-pointer transition">
            AI Chat
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default Sidebar;