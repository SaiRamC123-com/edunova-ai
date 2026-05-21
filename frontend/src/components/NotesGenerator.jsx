import { useState } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import * as pdfjsLib from "pdfjs-dist";
import Sidebar from "./Sidebar";
import { Brain, Upload, Zap, BookOpen, Layers } from "lucide-react";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const NotesGenerator = () => {
  const [manualNotes, setManualNotes] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");

  const extractTextFromPDF = async (file) => {
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = async function () {
        const typedArray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map((item) => item.str);
          text += strings.join(" ");
        }
        resolve(text);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const generateFromText = async (text) => {
    if (!text.trim()) { toast.error("Please enter some notes first!"); return; }
    setLoading(true);
    toast.loading("Generating notes...", { id: "notes" });
    try {
      const response = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{
            role: "user",
            content: `You are a study assistant. Given the following notes, do TWO things:\n1. SUMMARY: Write a clear, concise summary of the key points.\n2. FLASHCARDS: Generate 5 flashcards in this exact format:\nQ: [question]\nA: [answer]\n\nNotes:\n${text}\n\nRespond in this exact format:\nSUMMARY:\n[your summary here]\n\nFLASHCARDS:\nQ: ...\nA: ...\nQ: ...\nA: ...`,
          }],
        }),
      });
      const data = await response.json();
      const aiText = data.choices?.[0]?.message?.content || "No response.";
      const summaryMatch = aiText.match(/SUMMARY:\s*([\s\S]*?)\n\nFLASHCARDS:/);
      const flashcardsMatch = aiText.match(/FLASHCARDS:\n([\s\S]*)/);
      const summary = summaryMatch ? summaryMatch[1].trim() : aiText;
      const flashcardsRaw = flashcardsMatch ? flashcardsMatch[1].trim() : "";
      const flashcards = [];
      const pairs = flashcardsRaw.split(/\nQ: /).filter(Boolean);
      pairs.forEach((pair) => {
        const qPart = pair.startsWith("Q: ") ? pair : "Q: " + pair;
        const q = qPart.match(/Q: (.+)/)?.[1];
        const a = qPart.match(/A: (.+)/)?.[1];
        if (q && a) flashcards.push({ q, a });
      });
      setResult({ summary, flashcards });
      toast.success("Notes Generated!", { id: "notes" });
    } catch (error) {
      console.log(error);
      toast.error("Failed to generate notes", { id: "notes" });
    }
    setLoading(false);
  };

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;
    toast.loading("Reading PDF...", { id: "notes" });
    const text = await extractTextFromPDF(file);
    toast.success("PDF loaded!", { id: "notes" });
    await generateFromText(text);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
  });

  return (
    <div className="flex h-screen text-white overflow-hidden" style={{ background: "#020008" }}>
      <Sidebar />

      <div className="absolute top-20 right-20 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute bottom-20 left-40 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="flex-1 overflow-y-auto p-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm text-purple-300 mb-4"
              style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)" }}>
              <Brain size={14} /> Notes Generator
            </div>
            <h1 className="text-5xl font-black"
              style={{ background: "linear-gradient(135deg, #fff 0%, #a78bfa 50%, #22d3ee 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              AI Notes Generator
            </h1>
            <p className="text-gray-400 mt-2">Transform your notes into summaries and flashcards</p>
          </div>

          {/* Text Input */}
          <div className="mb-6">
            <textarea
              value={manualNotes}
              onChange={(e) => setManualNotes(e.target.value)}
              placeholder="Type or paste your notes here..."
              rows={6}
              className="w-full p-5 rounded-2xl text-white resize-none outline-none"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
            />
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => generateFromText(manualNotes)}
              disabled={loading}
              className="mt-3 w-full p-4 rounded-2xl font-bold text-black text-lg disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)", boxShadow: "0 0 30px rgba(124,58,237,0.3)" }}>
              <span className="flex items-center justify-center gap-2"><Zap size={18} /> Generate from Text</span>
            </motion.button>
          </div>

          {/* Divider */}
          <div className="text-center text-gray-500 font-semibold my-6">— OR —</div>

          {/* PDF Dropzone */}
          <motion.div whileHover={{ scale: 1.01 }} {...getRootProps()}
            className="rounded-2xl p-10 text-center cursor-pointer group"
            style={{ background: "rgba(255,255,255,0.02)", border: "2px dashed rgba(124,58,237,0.4)" }}>
            <input {...getInputProps()} />
            <Upload size={28} className="text-purple-400 mx-auto mb-3" />
            <p className="text-xl font-bold text-white mb-1">Drag & Drop PDF Here</p>
            <p className="text-gray-400 text-sm">or click to upload</p>
          </motion.div>

          {/* Loading */}
          {loading && (
            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }}
              className="mt-8 rounded-2xl p-5 text-center flex items-center justify-center gap-3"
              style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)" }}>
              <Zap size={18} className="text-purple-400" />
              <span className="text-purple-300 font-medium">AI is generating your notes...</span>
            </motion.div>
          )}

          {/* Results */}
          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
              {/* Tabs */}
              <div className="flex gap-3 mb-6">
                {[["summary", "Summary", BookOpen], ["flashcards", `Flashcards (${result.flashcards.length})`, Layers]].map(([tab, label, Icon]) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all"
                    style={activeTab === tab
                      ? { background: "linear-gradient(135deg, #7c3aed, #06b6d4)", color: "white" }
                      : { background: "rgba(255,255,255,0.05)", color: "#9ca3af", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <Icon size={16} /> {label}
                  </button>
                ))}
              </div>

              {activeTab === "summary" && (
                <div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <h2 className="text-2xl font-bold text-cyan-400 mb-4">Summary</h2>
                  <p className="text-gray-300 leading-8 whitespace-pre-wrap">{result.summary}</p>
                </div>
              )}

              {activeTab === "flashcards" && (
                <div className="space-y-4">
                  {result.flashcards.length > 0 ? result.flashcards.map((card, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="rounded-2xl p-6"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <p className="text-cyan-400 font-semibold mb-2">Q: {card.q}</p>
                      <p className="text-gray-300">A: {card.a}</p>
                    </motion.div>
                  )) : <p className="text-gray-400 text-center">No flashcards generated.</p>}
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default NotesGenerator;