// ========== DATA SCHEMA ==========

export interface PokemonRef {
  name: string;
  dexNumber: number;
}

export interface GymLeader {
  name: string;
  type: string;
  badge?: string;
}

export interface EliteFourMember {
  name: string;
  type: string;
}

export interface VillainTeam {
  name: string;
  leader: string;
  goal: string;
}

export interface DLC {
  name: string;
  releaseDate: string;
}

export interface GameStats {
  story: number;       // 1–10
  graphics: number;    // 1–10
  difficulty: number;  // 1–10
  replayability: number; // 1–10
}

export interface Game {
  id: number;
  slug: string;
  title: string;
  pairedWith: string[];
  generation: number;
  region: string;
  platform: string;
  releaseDates: {
    jp: string;
    na: string;
    eu: string;
  };
  developer: string;
  publisher: string;
  starters: PokemonRef[];
  mascotPokemon: PokemonRef[];
  features: string[];
  gymLeaders: GymLeader[];
  eliteFour: EliteFourMember[];
  champion: string;
  rival: string;
  villainTeam: VillainTeam;
  trivia: string[];
  versionExclusives: string[];
  themeColor: string;
  overview: string;
  stats: GameStats;
  dlc?: DLC[];
  isUpcoming?: boolean;
  lastVerified?: string;
}

export interface Region {
  name: string;
  slug: string;
  realWorldInspiration: string;
  description: string;
  games: string[];
  signaturePokemon: PokemonRef[];
  themeColor: string;
}

export type PokemonType =
  | 'Normal' | 'Fire' | 'Water' | 'Electric' | 'Grass' | 'Ice'
  | 'Fighting' | 'Poison' | 'Ground' | 'Flying' | 'Psychic' | 'Bug'
  | 'Rock' | 'Ghost' | 'Dragon' | 'Dark' | 'Steel' | 'Fairy';

export const TYPE_COLORS: Record<PokemonType, string> = {
  Normal: '#A8A77A',
  Fire: '#EE8130',
  Water: '#6390F0',
  Electric: '#F7D02C',
  Grass: '#7AC74C',
  Ice: '#96D9D6',
  Fighting: '#C22E28',
  Poison: '#A33EA1',
  Ground: '#E2BF65',
  Flying: '#A98FF3',
  Psychic: '#F95587',
  Bug: '#A6B91A',
  Rock: '#B6A136',
  Ghost: '#735797',
  Dragon: '#6F35FC',
  Dark: '#705746',
  Steel: '#B7B7CE',
  Fairy: '#D685AD',
};

export const GENERATION_NAMES: Record<number, string> = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
  6: 'VI',
  7: 'VII',
  8: 'VIII',
  9: 'IX',
};

export const PLATFORM_ICONS: Record<string, string> = {
  'Game Boy': '🎮',
  'Game Boy Color': '🎮',
  'Game Boy Advance': '🎮',
  'Nintendo DS': '📱',
  'Nintendo 3DS': '📱',
  'Nintendo Switch': '🕹️',
  'Nintendo Switch 2': '🕹️',
};
