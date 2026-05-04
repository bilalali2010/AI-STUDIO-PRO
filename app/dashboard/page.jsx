"use client";
import { useState } from "react";

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateText() {
    setLoading(true);
    setOutput("");

    const res = await fetch("/api/generate-text", {
      method: "POST",
      body: JSON.stringify({
        prompt,
        tier: "main",
      }),
    });

    const data = await res.json();
    setOutput(data.result);
    setLoading(false);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>🚀 AI Studio Pro</h1>

      <textarea
        rows={5}
        style={{ width: "100%", marginTop: 20 }}
        placeholder="Write your prompt here..."
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button onClick={generateText} style={{ marginTop: 10 }}>
        {loading ? "Generating..." : "Generate"}
      </button>

      <div style={{ marginTop: 20 }}>
        <h3>Result:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
}
