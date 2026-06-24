import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/seo";

const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "Gemini-Deep-Research",
  "FacebookBot",
  "meta-externalagent",
  "Amazonbot",
  "Applebot",
  "Bytespider",
  "cohere-ai",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/" })),
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
