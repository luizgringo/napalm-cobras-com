/**
 * JsonLd module — renders a JSON-LD structured data `<script>` tag for SEO.
 */

/**
 * Serializes structured data to a string that is safe to embed inside an inline
 * `<script>` tag.
 *
 * @param data - The structured data object to serialize.
 * @returns The JSON string with characters that could break out of the script
 * context escaped.
 * @remarks
 * Escapes `<` (prevents `</script>` breakout / XSS) and the line/paragraph
 * separators U+2028/U+2029 (invalid raw inside JS string literals). This is
 * defense-in-depth for fields sourced from external APIs (e.g. event data).
 */
function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/**
 * Injects one or more JSON-LD structured data blocks into the document.
 *
 * Server Component: serializes `data` and writes it via `dangerouslySetInnerHTML`.
 * Each schema object is emitted as its own `<script>` tag so crawlers that do
 * not expand `@graph` still detect Organization, WebPage and FAQPage types.
 *
 * @param props - Component props.
 * @param props.data - A single schema object or an array of schema objects.
 * @returns One or more `<script type="application/ld+json">` elements.
 *
 * @remarks The payload is escaped by {@link serializeJsonLd} so external-sourced
 * values cannot break out of the `<script>` context.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: structured data injection (escaped)
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(item) }}
        />
      ))}
    </>
  );
}
