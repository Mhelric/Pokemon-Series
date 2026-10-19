import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  soundEnabled: boolean;
  theme: 'day' | 'night';
  toggleSound: () => void;
  toggleTheme: () => void;
  setTheme: (theme: 'day' | 'night') => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      soundEnabled: false,
      theme: 'day',
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'day' ? 'night' : 'day' })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'pokedex-settings',
    }
  )
);
