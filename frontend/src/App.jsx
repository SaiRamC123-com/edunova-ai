import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";

import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import PDFUpload from "./components/PDFUpload";
import QuizGenerator from "./components/QuizGenerator";
import AIChat from "./components/AIChat";
import NotesGenerator from "./components/NotesGenerator";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <div id="about" className="py-20 px-6 bg-[#020617] text-center border-t border-white/10">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          About StudyGenix
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-8">
          StudyGenix is an AI-powered study platform that helps students learn faster with smart summaries, PDF analysis, quiz generation, and an intelligent chat assistant.
        </p>
      </div>
    </>
  );
};


const App = () => {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<AIChat />} />

      <Route path="/pdf-upload" element={<PDFUpload />} />

      <Route path="/quiz-generator" element={<QuizGenerator />} />
      
      <Route path="/notes-generator" element={<NotesGenerator />} />

    </Routes>
  );
};

export default App;