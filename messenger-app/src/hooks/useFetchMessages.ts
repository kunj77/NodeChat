import { create } from "zustand";
import chatService from "../services/chat";
import { AxiosError } from "axios";
import { getErrorMessage } from "../helpers/error";
import { Message } from "../types";

interface UserMessageListState {
  loading: boolean;
  success: boolean;
  error: string | null;
  getAll: (sender: string, receiver: string) => Promise<Message[]>;
}

const useFetchMessages = create<UserMessageListState>((set) => {
  return {
    loading: false,
    success: false,
    error: null,
    getAll: async (sender: string, receiver: string) => {
      set({ loading: true, error: null });
      try {
        const response = await chatService.get(
          `/chat/messages?sender=${sender}&receiver=${receiver}`
        );
        set({ loading: false, success: true });
        return response.data;
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error as AxiosError);
        set({ loading: false, error: errorMessage });
        throw error;
      }
    },
  };
});

export default useFetchMessages;
