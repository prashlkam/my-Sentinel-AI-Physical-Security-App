// Express server for Azure App Service (Linux / Node runtime).
// Serves the Vite production build and proxies Gemini API calls
// so the API key stays server-side.

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// ---------------------------------------------------------------------------
// Gemini API proxy — keeps the API key on the server
// ---------------------------------------------------------------------------
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post('/api/gemini/chat', async (req, res) => {
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured.' });
  }
  const { prompt, systemInstruction } = req.body;
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'prompt is required.' });
  }
  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: systemInstruction || undefined,
    });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    res.json({ text });
  } catch (err) {
    console.error('Gemini API error:', err);
    res.status(502).json({ error: 'Error communicating with Gemini API.' });
  }
});

// ---------------------------------------------------------------------------
// Serve static assets from the Vite build output
// ---------------------------------------------------------------------------
const distDir = path.join(__dirname, 'dist');
app.use(express.static(distDir));

// SPA fallback — send index.html for any route not matched above
app.get('*', (_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Sentinel Security server listening on port ${PORT}`);
});
