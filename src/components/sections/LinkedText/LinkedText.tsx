import type { CreditLink } from "@/config/site";

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function LinkedText({
  text,
  links,
  linkClassName,
}: {
  text: string;
  links?: CreditLink[];
  linkClassName?: string;
}) {
  if (!links || links.length === 0) {
    return <>{text}</>;
  }

  const pattern = new RegExp(`(${links.map((link) => escapeRegExp(link.label)).join("|")})`, "g");
  const segments = text.split(pattern);

  return (
    <>
      {segments.map((segment, index) => {
        const link = links.find((item) => item.label === segment);
        if (!link) {
          return segment;
        }
        return (
          <a
            key={`${link.href}-${index}`}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className={linkClassName}
          >
            {segment}
          </a>
        );
      })}
    </>
  );
}
