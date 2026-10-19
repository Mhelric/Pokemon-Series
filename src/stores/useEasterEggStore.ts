import { create } from 'zustand';

interface EasterEggState {
  logoClickCount: number;
  shinyMode: boolean;
  wildPikachuVisible: boolean;
  incrementLogoClick: () => void;
  resetLogoClicks: () => void;
  setShinyMode: (v: boolean) => void;
  showWildPikachu: () => void;
  hideWildPikachu: () => void;
}

export const useEasterEggStore = create<EasterEggState>()((set) => ({
  logoClickCount: 0,
  shinyMode: false,
  wildPikachuVisible: false,
  incrementLogoClick: () =>
    set((state) => {
      const newCount = state.logoClickCount + 1;
      return {
        logoClickCount: newCount,
        shinyMode: newCount >= 5 ? true : state.shinyMode,
      };
    }),
  resetLogoClicks: () => set({ logoClickCount: 0 }),
  setShinyMode: (v) => set({ shinyMode: v }),
  showWildPikachu: () => set({ wildPikachuVisible: true }),
  hideWildPikachu: () => set({ wildPikachuVisible: false }),
}));
