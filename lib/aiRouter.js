export async function runTextAI(prompt, tier = "free") {
  const model = "qwen/qwen3.5-plus-2026-02-15";

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await res.json();

  console.log("AI RESPONSE:", data); // 👈 ADD THIS

  if (!res.ok) {
    return "API Error: " + JSON.stringify(data);
  }

  return data.choices?.[0]?.message?.content || "No response";
}
