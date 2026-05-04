import { runTextAI } from "@/lib/aiRouter";

export async function POST(req) {
  const { prompt, tier } = await req.json();

  const result = await runTextAI(prompt, tier);

  return Response.json({ result });
}
