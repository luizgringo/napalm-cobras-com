import type { CreditLink } from "@/config/site";
import { buildLinkedSegments } from "./LinkedText.hooks";

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
