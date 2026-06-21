interface FetchJsonOptions extends RequestInit {
  revalidate?: number;
}

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
