import { useState } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import Sidebar from "./Sidebar";
import { FileText, Upload, Sparkles, Zap } from "lucide-react";

const extractTextFromPDF = async (file) => {
  const formData = new FormData();
  formData.append("pdf", file);
  const response = await fetch("http://localhost:3001/api/extract-pdf", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data.text;
};

const PDFUpload = () => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;
    setLoading(true);
    toast.loading("Analyzing PDF...", { id: "pdf" });
    try {
      const extractedText = await extractTextFromPDF(file);
      const response = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{
            role: "user",
            content: `Summarize in 3 bullet points:\n\n${extractedText}`,
          }],
        }),
      });
      const data = await response.json();
      const aiText = data.choices?.[0]?.message?.content || data.error?.message || "No response.";
      setSummary(aiText);
      toast.success("Summary Generated!", { id: "pdf" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to analyze PDF", { id: "pdf" });
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
  });

  return (
    <div className="flex h-screen text-white overflow-hidden" style={{ background: "#020008" }}>
      <Sidebar />

      {/* Background orbs */}
      <div className="absolute top-20 right-20 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute bottom-20 left-40 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="flex-1 overflow-y-auto p-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm text-cyan-300 mb-4"
              style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.3)" }}>
              <FileText size={14} /> PDF Analyzer
            </div>
            <h1 className="text-5xl font-black"
              style={{ background: "linear-gradient(135deg, #fff 0%, #a78bfa 50%, #22d3ee 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              AI PDF Analyzer
            </h1>
            <p className="text-gray-400 mt-2">Upload any PDF and get an instant AI summary</p>
          </div>

          {/* Dropzone */}
          <motion.div whileHover={{ scale: 1.01 }} {...getRootProps()}
            className="rounded-3xl p-16 text-center cursor-pointer relative overflow-hidden group"
            style={{ background: "rgba(255,255,255,0.02)", border: "2px dashed rgba(6,182,212,0.4)", backdropFilter: "blur(10px)" }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
              style={{ background: "radial-gradient(circle at 50% 50%, rgba(6,182,212,0.05) 0%, transparent 70%)" }} />
            <input {...getInputProps()} />
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: "rgba(6,182,212,0.15)", border: "1px solid rgba(6,182,212,0.3)" }}>
              <Upload size={28} className="text-cyan-400" />
            </div>
            <p className="text-2xl font-bold text-white mb-2">Drag & Drop PDF Here</p>
            <p className="text-gray-400">or click to upload</p>
            <p className="text-gray-500 text-sm mt-2">⚡ First 5 pages analyzed for speed</p>
          </motion.div>

          {/* Loading */}
          {loading && (
            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }}
              className="mt-8 rounded-2xl p-6 text-center flex items-center justify-center gap-3"
              style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)" }}>
              <Zap size={20} className="text-purple-400" />
              <span className="text-purple-300 font-medium">AI is analyzing your PDF...</span>
            </motion.div>
          )}

          {/* Summary */}
          {summary && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="mt-8 rounded-2xl p-8"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(10px)" }}>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={20} className="text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">AI Summary</h2>
              </div>
              <p className="text-gray-300 leading-8 whitespace-pre-wrap">{summary}</p>
            </motion.div>
          )}

        </motion.div>
      </div>
    </div>
  );
};
export default PDFUpload;