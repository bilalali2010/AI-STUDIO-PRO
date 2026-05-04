export async function runTextAI(prompt, tier = "free") {
  const models = {
    pro: "openai/gpt-4o",
    main: "qwen/qwen2.5-72b-instruct",
    free: "nvidia/nemotron-3-nano-9b-v2:free",
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

  if (!res.ok) {
    return "API Error: " + JSON.stringify(data);
  }

  return data.choices?.[0]?.message?.content || "No response";
}
