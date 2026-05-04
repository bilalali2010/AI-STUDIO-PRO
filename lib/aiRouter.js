export async function runTextAI(prompt) {
  const models = [
    "nousresearch/hermes-3-llama-3.1-405b:free",
    "openai/gpt-4o-mini",
    "mistralai/mistral-7b-instruct",
  ];

  for (let model of models) {
    try {
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

      if (res.ok && data.choices?.[0]?.message?.content) {
        return data.choices[0].message.content;
      }
    } catch (err) {
      console.log("Model failed:", model);
    }
  }

  return "All models failed. Try again.";
}
