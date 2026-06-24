import type { Flyer } from "@/config/flyers";
import { SITE } from "@/config/site";

const MAX_ALT_LENGTH = 125;

function truncateAlt(text: string): string {
  const trimmed = text.trim().replace(/\s+/g, " ");
  if (trimmed.length <= MAX_ALT_LENGTH) {
    return trimmed;
  }
  return `${trimmed.slice(0, MAX_ALT_LENGTH - 1)}…`;
}

function applyTemplate(template: string, values: Record<string, string>): string {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, value),
    template,
  );
}

export function buildFlyerAlt(flyer: Flyer): string {
  const parts = [`Flyer: ${flyer.title}`];
  if (flyer.venue) {
    parts.push(flyer.venue);
  }
  if (flyer.year) {
    parts.push(flyer.year);
  }
  return truncateAlt(parts.join(" · "));
}

export function buildMemberAlt(name: string, role: string): string {
  return truncateAlt(`${name}, ${role} — ${SITE.name}`);
}

export function buildInstagramAvatarAlt(username: string, template: string): string {
  return truncateAlt(applyTemplate(template, { username }));
}

export function buildInstagramPostAlt(
  caption: string | null | undefined,
  username: string,
  fallbackTemplate: string,
): string {
  if (caption?.trim()) {
    return truncateAlt(caption.trim());
  }
  return truncateAlt(applyTemplate(fallbackTemplate, { username }));
}
