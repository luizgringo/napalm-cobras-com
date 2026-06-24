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
 * Injects a JSON-LD structured data block into the document for search engines.
 *
 * Server Component: serializes `data` and writes it via `dangerouslySetInnerHTML`.
 *
 * @param props - Component props.
 * @param props.data - The structured data object serialized into the script tag.
 * @returns A `<script type="application/ld+json">` element.
 *
 * @remarks The payload is escaped by {@link serializeJsonLd} so external-sourced
 * values cannot break out of the `<script>` context.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const payload = Array.isArray(data)
    ? {
        "@context": "https://schema.org",
        "@graph": data.map(({ "@context": _context, ...rest }) => rest),
      }
    : data;

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: structured data injection (escaped)
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(payload) }}
    />
  );
}
