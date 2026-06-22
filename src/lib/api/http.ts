/**
 * Minimal JSON fetch helper with Next.js incremental revalidation support.
 *
 * @remarks
 * Wraps the global `fetch` to return typed JSON or `null` on any failure,
 * keeping callers free of try/catch boilerplate.
 */

/**
 * Options for {@link fetchJson}, extending the standard `fetch` init.
 */
interface FetchJsonOptions extends RequestInit {
  /** Next.js ISR revalidation window in seconds (defaults to 3600). */
  revalidate?: number;
}

/**
 * Fetches and parses a JSON resource, returning `null` instead of throwing.
 *
 * @typeParam T - Expected shape of the parsed JSON response.
 * @param url - Resource URL to fetch.
 * @param options - Fetch options plus an optional `revalidate` window.
 * @returns The parsed JSON as `T`, or `null` when the request fails, returns a
 * non-OK status, or the body cannot be parsed.
 * @remarks
 * Network and parsing errors are intentionally swallowed so callers can treat a
 * missing/failed response uniformly via the `null` result.
 */
export async function fetchJson<T>(url: string, options: FetchJsonOptions = {}): Promise<T | null> {
  const { revalidate = 3600, ...init } = options;
  try {
    const response = await fetch(url, { ...init, next: { revalidate } });
    if (!response.ok) {
      return null;
    }
    return (await response.json()) as T;
  } catch {
    return null;
  }
}
