export async function runTextAI(prompt, tier = "free") {
  const models = {
    pro: "openai/gpt-oss-120b",
    main: "qwen/qwen3.5-plus-2026-02-15",
    free: "nvidia/nemotron-nano-9b-v2:free",
  };

  const model =
    tier === "pro"
      ? models.pro
      : tier === "main"
      ? models.main
      : models.free;

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
  return data.choices?.[0]?.message?.content || "Error generating response";
}
