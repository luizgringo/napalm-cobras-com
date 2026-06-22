/**
 * Server component that renders a string while turning configured labels into
 * external anchors.
 *
 * @remarks The text-to-segments parsing logic is encapsulated in the
 * {@link buildLinkedSegments} helper in `LinkedText.hooks.ts`.
 */

import type { CreditLink } from "@/config/site";
import { buildLinkedSegments } from "./LinkedText.hooks";

/**
 * Renders `text`, replacing any substring matching a configured link label with
 * an external anchor.
 *
 * @param props - Component props.
 * @param props.text - The full text to render.
 * @param props.links - Optional label/href pairs to linkify within the text.
 * @param props.linkClassName - Optional class applied to the generated anchors.
 * @returns A fragment of interleaved text and anchor nodes.
 * @remarks Server component.
 */
export function LinkedText({
  text,
  links,
  linkClassName,
}: {
  text: string;
  links?: CreditLink[];
  linkClassName?: string;
}) {
  const segments = buildLinkedSegments(text, links);

  return (
    <>
      {segments.map((segment, index) => {
        if (segment.kind === "text") {
          return segment.value;
        }
        return (
          <a
            key={`${segment.href}-${index}`}
            href={segment.href}
            target="_blank"
            rel="noreferrer"
            className={linkClassName}
          >
            {segment.value}
          </a>
        );
      })}
    </>
  );
}
