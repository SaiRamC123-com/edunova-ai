const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
const multer = require('multer');
const pdfParse = require('pdf-parse');
const upload = multer();

app.post('/api/extract-pdf', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const pdfParse = require('pdf-parse');
    const data = await pdfParse(req.file.buffer);
    res.json({ text: data.text.slice(0, 3000) });
  } catch (err) {
    // ✅ Handle password-protected PDFs
    if (err.message.includes('No password given') || err.message.includes('password')) {
      return res.status(400).json({ 
        error: 'This PDF is password-protected. Please upload an unlocked PDF.' 
      });
    }
    console.error('PDF extraction error:', err.message);
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/chat", async (req, res) => {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "groq-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 1000,
        messages: req.body.messages,
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));