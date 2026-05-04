"use client";

import { useState } from "react";

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");

  async function generateText() {
    const res = await fetch("/api/generate-text", {
      method: "POST",
      body: JSON.stringify({
        prompt,
        tier: "main",
      }),
    });

    const data = await res.json();
    setOutput(data.result);
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>AI Studio Dashboard</h2>

      <textarea
        rows={5}
        style={{ width: "100%", marginTop: 20 }}
        placeholder="Enter prompt..."
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button onClick={generateText} style={{ marginTop: 10 }}>
        Generate
      </button>

      <div style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>
        {output}
      </div>
    </div>
  );
}
