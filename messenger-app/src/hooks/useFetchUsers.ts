import { create } from 'zustand';
import chatService from '../services/chat';
import { AxiosError } from 'axios';
import { getErrorMessage } from '../helpers/error';
import { User } from '../types';


interface UserListState {
    loading: boolean;
    success: boolean;
    error: string | null;
    getAll: () => Promise<User[]>;
  }

const useFetchUsers = create<UserListState>((set) => {
  return {
    loading: false,
    success: false,
    error: null,
    getAll: async () => {
      set({ loading: true, error: null });
      try {
        const response = await chatService.get('/chat/users');
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

export default useFetchUsers;