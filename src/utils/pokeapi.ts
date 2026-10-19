// ========== POKEAPI CLIENT ==========
// Fetches Pokémon sprites and data from PokéAPI with localStorage caching

const POKEAPI_BASE = 'https://pokeapi.co/api/v2';
const CACHE_PREFIX = 'pokeapi_cache_';
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

interface CachedData<T> {
  data: T;
  timestamp: number;
}

function getCached<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const cached: CachedData<T> = JSON.parse(raw);
    if (Date.now() - cached.timestamp > CACHE_TTL) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return cached.data;
  } catch {
    return null;
  }
}

function setCache<T>(key: string, data: T): void {
  try {
    const cached: CachedData<T> = { data, timestamp: Date.now() };
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(cached));
  } catch {
    // localStorage full or unavailable — silently fail
  }
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  official_artwork: string | null;
}

export interface PokemonData {
  id: number;
  name: string;
  sprites: PokemonSprites;
  types: string[];
}

export async function fetchPokemon(nameOrId: string | number): Promise<PokemonData | null> {
  const key = `pokemon_${nameOrId}`;
  const cached = getCached<PokemonData>(key);
  if (cached) return cached;

  try {
    const response = await fetch(`${POKEAPI_BASE}/pokemon/${nameOrId}`);
    if (!response.ok) return null;

    const json = await response.json();
    const data: PokemonData = {
      id: json.id,
      name: json.name,
      sprites: {
        front_default: json.sprites?.front_default ?? null,
        front_shiny: json.sprites?.front_shiny ?? null,
        official_artwork:
          json.sprites?.other?.['official-artwork']?.front_default ?? null,
      },
      types: json.types?.map((t: { type: { name: string } }) => t.type.name) ?? [],
    };

    setCache(key, data);
    return data;
  } catch {
    return null;
  }
}

export function getSpriteUrl(dexNumber: number, shiny = false): string {
  if (shiny) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${dexNumber}.png`;
  }
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dexNumber}.png`;
}

export function getOfficialArtwork(dexNumber: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dexNumber}.png`;
}
