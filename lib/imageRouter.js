export async function runImageAI(prompt, quality = "fast") {
  const models = {
    fast: "black-forest-labs/flux.2-klein-4b",
    high: "bytedance-seed/seedream-4.5",
  };

  const model = models[quality];

  const res = await fetch("https://openrouter.ai/api/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      prompt,
    }),
  });

  const data = await res.json();
  return data.data?.[0]?.url;
}
