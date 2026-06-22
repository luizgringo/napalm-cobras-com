import type { CreditLink } from "@/config/site";

export type LinkedSegment =
  | { kind: "text"; value: string }
  | { kind: "link"; value: string; href: string };

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function buildLinkedSegments(text: string, links?: CreditLink[]): LinkedSegment[] {
  if (!links || links.length === 0) {
    return [{ kind: "text", value: text }];
  }

  const pattern = new RegExp(`(${links.map((link) => escapeRegExp(link.label)).join("|")})`, "g");

  return text.split(pattern).map((segment) => {
    const matchedLink = links.find((link) => link.label === segment);
    return matchedLink
      ? { kind: "link", value: segment, href: matchedLink.href }
      : { kind: "text", value: segment };
  });
}
