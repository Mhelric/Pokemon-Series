# 🔴 POKÉDEX OF GAMES (Main Series Archive)

<p align="center">
  <img src="public/favicon.svg" width="100" height="100" alt="Pokédex of Games Logo" />
</p>

<p align="center">
  <strong>An authentic, retro-styled interactive encyclopedia documenting every mainline Pokémon game from 1996 through the future.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.3-61DAFB?logo=react&logoColor=black&style=for-the-badge" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white&style=for-the-badge" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white&style=for-the-badge" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white&style=for-the-badge" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-14.3-black?logo=framer&logoColor=white&style=for-the-badge" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white&style=for-the-badge" alt="Vercel" />
</p>

---

## 🌟 Overview & Aesthetic

**Pokédex of Games** is built to look, sound, and feel like it **IS** a Pokémon game. Designed with a blend of Game Boy Advance and Nintendo DS-era UI nostalgia, every page incorporates:

- **Chunky 4px Stepped Pixel Borders & Stepped Shadows** (no smooth modern drop-shadows).
- **Authentic Google Pixel Fonts**: *Press Start 2P* for retro labels/headers and *Pixelify Sans* for crisp, readable body text.
- **Synthesized 8-Bit Web Audio API Sound Engine**: Procedurally generated menu blips, select confirmation chimes, cancel sounds, dialogue text-ticks, and battle whooshes — **zero external audio file dependencies**.
- **Professor Oak Dialogue Boxes**: Typewriter character animations with blinking `▼` advance cursors and click-to-skip functionality.
- **HP-Bar Stat Meters**: Segmented green-to-yellow-to-red meters evaluating Story, Graphics, Difficulty, and Replayability.
- **Day / Night Cycle**: Instant theme toggle altering palettes between sunny overworld daylight and nocturnal deep-navy shades.
- **Live Sprite Feeds**: Direct integration with [PokéAPI](https://pokeapi.co) caching official sprites in `localStorage`.

---

## 🗺️ Archive Pages & Features

### 1. 📺 Title Screen (`/`)
- Faux classic Game Boy start screen with animated starry night skies, grass silhouettes, and rocking Pokéball.
- Click anywhere or press <kbd>Enter</kbd> / <kbd>Space</kbd> to reveal the in-game Start Menu with a blinking `▶` cursor and keyboard navigation (<kbd>↑</kbd>/<kbd>↓</kbd>/<kbd>Enter</kbd>).

### 2. 📟 Games Browser (`/games`)
- **Pokédex Dual-Screen View**:
  - **Left Screen**: Scrollable electronic cartridge directory of all 39 mainline games.
  - **Right Screen**: Stylized LCD monitor displaying live specs, starter trios, mascot sprites, and Professor Oak's research summary.
- **Grid View Mode**: Switch seamlessly to responsive cartridge-style cards.
- **Live Search & Multi-Filters**: Filter simultaneously by **Generation (Gen 1–9)**, **Region**, **Console/Platform**, and **Search query** (title, mascot, region).
- **Flexible Sorting**: Sort by Release Order, Newest First, Chronological Year, or Title A-Z.

### 3. 📖 Game Detail Dossiers (`/games/:slug`)
Every game page dynamically adopts that game's **canonical version accent color** and provides:
1. **Header**: Full release chronology across Japan, North America, and Europe, developer, publisher, and platform specs.
2. **Overview**: Flavor narrative written in Professor Oak's classic field journal tone inside an interactive DialogueBox.
3. **Region Cartography**: Stylized pixel-art topographic map placeholder of the game's setting.
4. **Starter & Mascot Gallery**: High-res sprites with Dex numbers and type affiliations.
5. **Key Mechanics**: Historical innovations introduced in that title (e.g. Physical/Special split, Mega Evolution, Terastallization).
6. **League Gauntlet**: Full breakdown of all 8 Gym Leaders (with badges and types), Elite Four members, and reigning Champion.
7. **Rival & Villain Team**: Profiles detailing journey rivals and villainous syndicates (leaders & motives).
8. **Development Trivia**: Verified historical facts, glitches, and CoroCoro lore.
9. **Editorial Ratings**: Segmented HP-bar ratings for Story, Visuals, Difficulty, and Replayability.
10. **Version Exclusives**: Breakdown of Pokémon requiring trades with companion versions.
11. **DLC Adventures**: Detailed release info for expansion passes (The Isle of Armor, The Crown Tundra, The Teal Mask, The Indigo Disk).
12. **Navigation**: Seamless previous/next game navigation via on-screen buttons or <kbd>←</kbd> / <kbd>→</kbd> arrow keys.

### 4. 📅 Timeline Journey (`/timeline`)
- A horizontally scrolling chronological track from 1996 in Pallet Town to the future of Lumiose City.
- Nodes feature hardware console badges (`GB`, `GBC`, `GBA`, `DS`, `3DS`, `Switch`, `Switch 2`), sprite nodes, and live dialogue previews.

### 5. 🗺️ Regional Geography (`/regions`)
- Explore all 10 major territories: **Kanto**, **Johto**, **Hoenn**, **Sinnoh**, **Hisui**, **Unova**, **Kalos**, **Alola**, **Galar**, and **Paldea**.
- Includes real-world geographic inspirations (e.g. Iberian Peninsula, Hokkaido, France, Hawaii, New York), native biodiversity sprites, and canon games set there.

### 6. ⭐ Choose Your Starter (`/starters`)
- Step into the Pokémon Laboratory: three Poké Balls rest on a wooden table.
- Click any ball to inspect the partner with an authentic **"Do you choose this Pokémon?" YES/NO** prompt modal.
- Includes complete evolution trios across all 9 generations.

### 7. ⚔️ Head-to-Head Compare (`/compare`)
- Select any two mainline releases to benchmark features, platforms, starters, and editorial stats side-by-side.
- Features a **Simulated HP-Bar Battle Judge** calculating a battle verdict based on feature sets and ratings.

### 8. ❓ Matchmaker Personality Quiz (`/quiz`)
- An 8-question personality assessment in dialogue box format determining your Pokémon playstyle.
- Culminates in a personalized **Trainer Card Passport** recommending your ideal game destination.

### 9. 📦 Trainer Cartridge Shelf (`/collection`)
- Interactive wooden shelf displaying your real-world collection.
- Mark any game as **Owned**, **Completed**, or **Favorited** to populate your shelf with authentic pixel cartridges and track your live completion percentage.

### 10. ℹ️ About & Citations (`/about`)
- Architectural documentation, data source citations ([PokéAPI](https://pokeapi.co), Bulbapedia, Serebii), and non-commercial fair-use disclaimers.

---

## 🥚 Easter Eggs & Secrets

- **Wild Pikachu Encounter**: Enter the classic **Konami Code** on your keyboard anywhere on the site:
  $$\uparrow\ \uparrow\ \downarrow\ \downarrow\ \leftarrow\ \rightarrow\ \leftarrow\ \rightarrow\ \text{B}\ \text{A}$$
- **Shiny Sparkle Mode**: Click the Pokéball icon in the top-left header **5 times** in succession to trigger site-wide rainbow shiny sparkles!
- **MissingNo. 404**: Navigate to any invalid route (e.g. `/missingno`) to encounter the glitched wild MissingNo. dialogue box.

---

## 💻 Tech Stack & Architecture

| Layer | Technology |
|---|---|
| **Core Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Bundler** | [Vite 8](https://vitejs.dev/) with Rollup chunk splitting |
| **Routing** | [React Router 7](https://reactrouter.com/) (all pages lazy-loaded via `React.lazy` & `Suspense`) |
| **Animations** | [Framer Motion 14](https://www.framer.com/motion/) |
| **Global State** | [Zustand 5](https://github.com/pmndrs/zustand) with `persist` middleware (`localStorage`) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + Custom CSS Design Tokens |
| **Sound Synthesis** | Web Audio API Oscillator & Gain Nodes (Zero external audio files) |
| **External API** | [PokéAPI](https://pokeapi.co) with TTL memory & `localStorage` caching |
| **Hosting** | [Vercel](https://vercel.com) (configured with SPA rewrites via `vercel.json`) |

---

## ⚡ Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/Mhelric/Pokemon-Series.git
cd Pokemon-Series
npm install
```

### 2. Run Locally
```powershell
powershell -ExecutionPolicy Bypass -Command "npx vite"
```
Or with standard npm:
```bash
npm run dev
```
Open **`http://localhost:5173/`** in your browser.

### 3. Production Build
```bash
npm run build
npx vite preview
```

---

## 🌐 Deployment Configuration

The repository includes a [`vercel.json`](./vercel.json) file configured for Single Page Application routing:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Whenever commits are pushed to the `main` branch, Vercel automatically deploys the updated build!

---

## 📜 Legal Disclaimer

This is an unofficial, non-commercial fan project created under fair use for educational and archival purposes. Pokémon and all related character names, logos, and trademarks are registered trademarks of **Nintendo**, **Game Freak**, **Creatures Inc.**, and **The Pokémon Company**. This project is not affiliated with or endorsed by them in any capacity.
