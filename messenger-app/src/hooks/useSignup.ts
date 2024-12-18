import { create } from "zustand";
import authService from "../services/auth";
import { AxiosError } from "axios";
import CryptoJS from "crypto-js";
import { getErrorMessage } from "../helpers/error";

interface SignupState {
  loading: boolean;
  error: string | null;
  success: boolean;
  signup: (
    fullName: string,
    username: string,
    password: string
  ) => Promise<void>;
}

const useSignup = create<SignupState>((set) => {
  return {
    loading: false,
    success: false,
    error: null,
    signup: async (fullName: string, username: string, password: string) => {
      set({ loading: true, error: null });
      try {
        const salt = CryptoJS.SHA256(username).toString();
        const hashedPassword = CryptoJS.PBKDF2(password, salt, {
          keySize: 256 / 32,
          iterations: 1000,
        }).toString();

        await authService.post("/auth/register", {
          fullName,
          username,
          password: hashedPassword,
        });
        set({ loading: false, success: true });
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error as AxiosError);
        set({ loading: false, error: errorMessage });
      }
    },
  };
});

export default useSignup;
