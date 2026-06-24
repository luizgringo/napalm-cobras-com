import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { generateLlmsTxt } from "@/lib/aeo-content";

export async function GET() {
  let body: string;

  try {
    body = await readFile(join(process.cwd(), "public", "llms.txt"), "utf-8");
  } catch {
    body = generateLlmsTxt();
  }

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
