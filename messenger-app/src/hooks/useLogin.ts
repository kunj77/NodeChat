import { create } from 'zustand';
import authService from '../services/auth';
import { AxiosError } from 'axios';
import CryptoJS from 'crypto-js';
import { getErrorMessage } from '../helpers/error';
import { User } from '../types';

interface LoginState {
    loading: boolean;
    success: boolean;
    error: string | null;
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
  }

const useLogin = create<LoginState>((set) => {
  return {
    loading: false,
    success: false,
    error: null,
    user: null,
    login: async (username: string, password: string) => {
      set({ loading: true, error: null });
    try {
        const salt = CryptoJS.SHA256(username).toString();
        const hashedPassword = CryptoJS.PBKDF2(password, salt, { keySize: 256/32, iterations: 1000 }).toString();
        
        const response = await authService.post('/auth/login', { username, password: hashedPassword });
        const { token } = response.data;
        localStorage.setItem('authToken', token);
        set({ loading: false, success: true, user: response.data.user });
    } catch (error: unknown) {
        const errorMessage = getErrorMessage(error as AxiosError);
        set({ loading: false, error: errorMessage });
    }
    },
  };
});

export default useLogin;