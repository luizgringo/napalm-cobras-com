/**
 * Logic layer for the `LinkedText` component: splits raw text into plain and
 * linkable segments based on the configured link labels.
 */

import type { CreditLink } from "@/config/site";

/** A parsed piece of linked text: either plain text or a resolved link. */
export type LinkedSegment =
  /** Plain, non-linked text run. */
  | { kind: "text"; value: string }
  /** Text run that matched a configured label and should be rendered as a link. */
  | { kind: "link"; value: string; href: string };

/**
 * Escapes characters that have special meaning in a regular expression.
 *
 * @param value - The raw string to escape.
 * @returns The string safe for literal use inside a `RegExp`.
 */
function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Splits `text` into ordered segments, marking any run that matches a link label
 * as a link segment carrying its destination href.
 *
 * @param text - The full text to parse.
 * @param links - Optional label/href pairs to match against; when absent the whole text is a single text segment.
 * @returns The ordered list of text and link segments.
 */
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
