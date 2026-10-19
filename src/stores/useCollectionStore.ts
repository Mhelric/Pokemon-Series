import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CollectionState {
  ownedGames: string[];   // game slugs
  playedGames: string[];
  favoriteGames: string[];
  toggleOwned: (slug: string) => void;
  togglePlayed: (slug: string) => void;
  toggleFavorite: (slug: string) => void;
  isOwned: (slug: string) => boolean;
  isPlayed: (slug: string) => boolean;
  isFavorite: (slug: string) => boolean;
}

export const useCollectionStore = create<CollectionState>()(
  persist(
    (set, get) => ({
      ownedGames: [],
      playedGames: [],
      favoriteGames: [],
      toggleOwned: (slug) =>
        set((state) => ({
          ownedGames: state.ownedGames.includes(slug)
            ? state.ownedGames.filter((s) => s !== slug)
            : [...state.ownedGames, slug],
        })),
      togglePlayed: (slug) =>
        set((state) => ({
          playedGames: state.playedGames.includes(slug)
            ? state.playedGames.filter((s) => s !== slug)
            : [...state.playedGames, slug],
        })),
      toggleFavorite: (slug) =>
        set((state) => ({
          favoriteGames: state.favoriteGames.includes(slug)
            ? state.favoriteGames.filter((s) => s !== slug)
            : [...state.favoriteGames, slug],
        })),
      isOwned: (slug) => get().ownedGames.includes(slug),
      isPlayed: (slug) => get().playedGames.includes(slug),
      isFavorite: (slug) => get().favoriteGames.includes(slug),
    }),
    {
      name: 'pokedex-collection',
    }
  )
);
