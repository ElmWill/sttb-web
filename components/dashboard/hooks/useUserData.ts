import { useState, useCallback } from "react";
import { useFetchWithAccessToken } from "@/functions/useFetchWithAccessToken";
import { BackendApiUrl } from "@/functions/BackendApiUrl";

export interface UseUserDataReturn {
  actions: {
    onCreate: (data: any) => Promise<{ success: boolean; message?: string }>;
  };
  isCreating: boolean;
}

export const useUserData = (): UseUserDataReturn => {
  const { fetchPOST } = useFetchWithAccessToken();
  const [isCreating, setIsCreating] = useState(false);

  const onCreate = useCallback(async (payload: any) => {
    setIsCreating(true);
    try {
      const { data, error, problem } = await fetchPOST<any>(BackendApiUrl.createUser, payload);
      if (error || problem) {
        return { success: false, message: error?.message || problem || "Gagal membuat user." };
      }
      return { success: true, message: "User berhasil dibuat." };
    } catch (err) {
      console.error("Create user failed", err);
      return { success: false, message: "Terjadi kesalahan sistem." };
    } finally {
      setIsCreating(false);
    }
  }, [fetchPOST]);

  return {
    actions: { onCreate },
    isCreating,
  };
};
