import { useCallback } from "react";
import { useFetchWithAccessToken } from "./useFetchWithAccessToken";

export function useSwrFetcherWithAccessToken() {
  const { fetchGET } = useFetchWithAccessToken();

  const fetcher = useCallback(
    async (url: string) => {
      const response = await fetchGET<any>(url);
      if (response.error || response.problem) {
        throw response.error || new Error(response.problem || "Unknown error");
      }
      return response.data;
    },
    [fetchGET]
  );

  return fetcher;
}
