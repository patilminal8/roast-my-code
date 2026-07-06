import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.ANTHROPIC_API_KEY;

app.use(express.json({ limit: "1mb" }));
app.use(express.static(__dirname));

app.post("/api/roast", async (req, res) => {
  if (!API_KEY) {
    return res.status(500).json({
      error: "Server is missing ANTHROPIC_API_KEY. Copy .env.example to .env and add your key."
    });
  }

  const { code, systemPrompt } = req.body || {};
  if (!code || typeof code !== "string") {
    return res.status(400).json({ error: "Missing 'code' in request body." });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: "user", content: `Roast this code:\n\n${code}` }]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: errText });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to reach Claude API." });
  }
});

app.listen(PORT, () => {
  console.log(`Roast My Code running at http://localhost:${PORT}`);
});
