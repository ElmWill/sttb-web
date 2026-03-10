export async function tryFetchJson<T>(
  url: string,
  options?: RequestInit
): Promise<{ data: T | null; error: any | null; problem: string | null }> {
  try {
    const response = await fetch(url, options);
    
    let data = null;
    if (response.status !== 204) {
      const text = await response.text();
      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          data = text as any;
        }
      }
    }

    if (!response.ok) {
      return { data, error: data, problem: `HTTP ${response.status} ${response.statusText}` };
    }

    return { data: data as T, error: null, problem: null };
  } catch (err: any) {
    return { data: null, error: err, problem: err.message || "Network request failed" };
  }
}
