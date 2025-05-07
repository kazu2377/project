import { create } from 'zustand';
import { supabase } from './supabase';
import { User, Problem, UserProgress } from './types';

interface AppState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  currentProblem: Problem | null;
  userProgress: UserProgress[];
  theme: 'light' | 'dark';
  setUser: (user: User | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setCurrentProblem: (problem: Problem | null) => void;
  setUserProgress: (progress: UserProgress[]) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  logout: () => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  currentProblem: null,
  userProgress: [],
  theme: 'light',
  
  setUser: (user) => set({ user }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setCurrentProblem: (problem) => set({ currentProblem: problem }),
  setUserProgress: (progress) => set({ userProgress: progress }),
  setTheme: (theme) => set({ theme }),
  
  logout: async () => {
    await supabase.auth.signOut();
    set({
      user: null,
      isAuthenticated: false,
      currentProblem: null,
      userProgress: [],
    });
  },
}));