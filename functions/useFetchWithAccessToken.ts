import { useSession } from "next-auth/react";
import { useCallback } from "react";

export type FetchResponse<T> = {
  data: T | null;
  error: any | null;
  problem: string | null;
};

export function useFetchWithAccessToken() {
  const { data: session } = useSession();

  const createRequest = useCallback(
    async <T>(url: string, options: RequestInit = {}): Promise<FetchResponse<T>> => {
      try {
        const headers = new Headers(options.headers || {});
        
        // Append access token if available
        // Note: adjust 'session?.accessToken' depending on actual NextAuth configuration
        const token = (session as any)?.accessToken;
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }

        const isJson = options.body && typeof options.body === "string" && options.body.startsWith("{");
        if (isJson && !headers.has("Content-Type")) {
          headers.set("Content-Type", "application/json");
        }

        const response = await fetch(url, { ...options, headers });

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
    },
    [session]
  );

  const fetchGET = useCallback(
    <T>(url: string, headers?: HeadersInit) => createRequest<T>(url, { method: "GET", headers }),
    [createRequest]
  );

  const fetchPOST = useCallback(
    <T>(url: string, body?: any, headers?: HeadersInit) =>
      createRequest<T>(url, { method: "POST", headers, body: JSON.stringify(body) }),
    [createRequest]
  );

  const fetchPUT = useCallback(
    <T>(url: string, body?: any, headers?: HeadersInit) =>
      createRequest<T>(url, { method: "PUT", headers, body: JSON.stringify(body) }),
    [createRequest]
  );

  const fetchDELETE = useCallback(
    <T>(url: string, headers?: HeadersInit) => createRequest<T>(url, { method: "DELETE", headers }),
    [createRequest]
  );

  return { fetchGET, fetchPOST, fetchPUT, fetchDELETE };
}
