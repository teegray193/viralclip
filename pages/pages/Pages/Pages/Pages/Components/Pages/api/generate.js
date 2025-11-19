{
  "name": "viralclip",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "@supabase/auth-helpers-nextjs": "^0.7.2",
    "axios": "^1.6.0",
    "next": "14.1.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "stripe": "^export default function Home() {
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>ViralClip</h1>
      <p>Create viral videos, captions, and thumbnails using AI.</p>
      <a href="/login">
        <button style={{ padding: "10px 20px", marginTop: "20px" }}>
          Get Started
        </button>
      </a>
    </div>
  );
}import { supabase } from "../lib/supabaseClient";

export default function Login() {
  async function signIn() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>
      <button onClick={signIn}>Login with Google</button>
    </div>
  );
}import ScriptGenerator from "../components/ScriptGenerator";

export default function Dashboard() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <ScriptGenerator />
    </div>
  );
}import { useState } from "react";

export default function ScriptGenerator() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  async function generate() {
    const r = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await r.json();
    setResult(data.text);
  }

  return (
    <div>
      <h2>AI Script Generator</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your video idea..."
        rows={4}
        style={{ width: "100%" }}
      />

      <button onClick={generate} style={{ marginTop: 20 }}>
        Generate Script
      </button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Result</h3>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { prompt } = req.body;

  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await r.json();
  const text = data?.choices?.[0]?.message?.content || "Error";

  res.status(200).json({ text });
}
