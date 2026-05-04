import { runImageAI } from "@/lib/imageRouter";

export async function POST(req) {
  const { prompt, quality } = await req.json();

  const image = await runImageAI(prompt, quality);

  return Response.json({ image });
}
