# 🎮 POKÉDEX OF GAMES (Main Series Archive)

> An authentic, retro-styled multi-page fan website documenting every mainline Pokémon game from 1996 to the present day. Built with Vite, React, TypeScript, Tailwind CSS, and Framer Motion.

---

## 🌟 Key Features

- **Classic Game Boy & DS UI Aesthetics**:
  - Chunky 4px stepped borders, retro pixel shadows, and custom fonts (*Press Start 2P* & *Pixelify Sans*).
  - Procedural **8-bit Web Audio API sound engine** for menu blips, select sounds, text-ticks, and battle whooshes — without external audio assets.
  - Interactive **DialogueBox** featuring typewriter character reveal and blinking advance arrows.
  - Authentic **HP-Bar Stat Meters** (green → yellow → red) rating Story, Graphics, Difficulty, and Replayability.
  - **Pokédex Device Dual-Screen View** on the Games Browser with live filters (Generation, Region, Console, Search, Sort).
  - Interactive **Starters Table** with 3 clickable Poké Balls and "Do you choose this Pokémon?" prompt modal.
  - **Horizontal Journey Chronology Timeline** scrolling from 1996 through upcoming releases.
  - **Versus Comparison Benchmarking** with simulated HP-bar battle animations.
  - **Matchmaker Personality Quiz** recommending your ideal game inside an official Trainer Passport Card.
  - **Trainer Cartridge Shelf** tracking owned, played, and starred games in `localStorage`.
  - **Day / Night Theme Toggle** swapping palettes between daytime and nocturnal game worlds.
  - **Easter Eggs**:
    - **Konami Code** (`↑ ↑ ↓ ↓ ← → ← → B A`): Triggers a wild Pikachu encounter with dialogue box!
    - **Shiny Sparkle Mode**: Click the Pokéball logo 5 times in the header to trigger site-wide prismatic shiny sparkles!
    - **MissingNo. 404 Page**: Glitched retro dialogue encounter.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Language**: [TypeScript 5+](https://www.typescriptlang.org/)
- **Routing**: [React Router 7](https://reactrouter.com/) (fully code-split with `React.lazy`)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with `persist` middleware
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom CSS Design Tokens
- **Data & API**: Static verified JSON schema (`games.json`, `regions.json`, `quiz-questions.json`) + [PokéAPI](https://pokeapi.co) with `localStorage` caching

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js (v18+)** and **npm** installed on your machine.

### 2. Installation
Clone the repository or navigate to the project directory:

```bash
cd Pokemon-Series
npm install
```

### 3. Running the Development Server
To launch the hot-reloading dev server:

```powershell
powershell -ExecutionPolicy Bypass -Command "npx vite"
```
Or simply:
```bash
npm run dev
```

Open your browser at **`http://localhost:5173/`**.

---

## 🏗️ Production Build & Verification

To compile the production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npx vite preview
```

---

## 🌐 Deployment Instructions

The project is pre-configured with relative base paths (`base: './'`), making it 100% ready for static hosting on any platform:

### Vercel
1. Push code to GitHub.
2. Import repository in [Vercel](https://vercel.com).
3. Framework Preset: **Vite**.
4. Deploy!

### Netlify
1. Drag and drop the `dist/` directory onto Netlify Drop, or link your git repo.
2. Build command: `npm run build`.
3. Publish directory: `dist`.

### GitHub Pages
1. Run `npm run build`.
2. Push the contents of the `dist/` folder to your `gh-pages` branch.

---

## 📝 Data Maintenance & Update Guide

All game archives live in:
- `src/data/games.json`
- `src/data/regions.json`
- `src/data/quiz-questions.json`

### Adding a New Mainline Game:
1. Open `src/data/games.json`.
2. Append a new object complying with the `Game` interface in `src/data/types.ts`:
```json
{
  "id": 40,
  "slug": "pokemon-new-game",
  "title": "Pokémon New Title",
  "pairedWith": [],
  "generation": 10,
  "region": "NewRegion",
  "platform": "Nintendo Switch 2",
  "releaseDates": { "jp": "2026-11-20", "na": "2026-11-20", "eu": "2026-11-20" },
  "developer": "Game Freak",
  "publisher": "Nintendo",
  "starters": [ ... ],
  "mascotPokemon": [ ... ],
  "features": [ ... ],
  "gymLeaders": [ ... ],
  "eliteFour": [ ... ],
  "champion": "ChampionName",
  "rival": "RivalName",
  "villainTeam": { "name": "TeamName", "leader": "LeaderName", "goal": "Goal" },
  "trivia": [ ... ],
  "versionExclusives": [ ... ],
  "themeColor": "#HEXCOLOR",
  "overview": "Professor Oak style intro text",
  "stats": { "story": 8, "graphics": 9, "difficulty": 7, "replayability": 9 }
}
```
3. The Games Browser, Timeline, Starters, Compare, and Collection pages will dynamically ingest the new entry without any code changes!

---

## ⚖️ Legal Disclaimer

This is an unofficial, non-commercial fan project. Pokémon and Pokémon character names are trademarks of Nintendo, Game Freak, Creatures Inc., and The Pokémon Company.
