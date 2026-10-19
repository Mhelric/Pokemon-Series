export default function About() {
  return (
    <div
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '24px 16px 48px',
      }}
    >
      {/* Title */}
      <div
        className="pixel-border"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          padding: '24px',
          borderRadius: '8px',
          marginBottom: '24px',
        }}
      >
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', margin: '0 0 12px 0', color: 'var(--color-pokedex-red)' }}>
          ABOUT THE POKÉDEX OF GAMES
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', lineHeight: 1.6, margin: 0 }}>
          <strong>Pokédex of Games (Main Series Archive)</strong> is an interactive tribute celebrating nearly three decades of Pokémon mainline history. Inspired by the tactical menus, handheld sounds, and unforgettable visual charm of the Game Boy Advance and Nintendo DS eras, this website documents every generation from 1996 to the latest announced titles.
        </p>
      </div>

      {/* Tech Stack & Design Architecture */}
      <div
        className="pixel-border"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          padding: '24px',
          borderRadius: '8px',
          marginBottom: '24px',
        }}
      >
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', margin: '0 0 14px 0' }}>
          ARCHITECTURAL SYSTEM & DESIGN
        </h2>
        <ul style={{ margin: 0, paddingLeft: '20px', fontFamily: 'var(--font-body)', fontSize: '17px', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li><strong>Engine:</strong> React 19, TypeScript, Vite, React Router 7</li>
          <li><strong>Styling & Design Tokens:</strong> Tailwind CSS with custom CSS variables, chunky 4px stepped borders, and retro typography (Press Start 2P & Pixelify Sans)</li>
          <li><strong>Sound Design:</strong> Synthesized procedural 8-bit sound effects powered natively via the Web Audio API without requiring any copyrighted external audio files</li>
          <li><strong>State Persistence:</strong> Zustand store with localStorage synchronization for sound toggles, Day/Night theme palettes, and trainer cartridge collection shelves</li>
          <li><strong>Data Schema:</strong> High-precision typed static dataset covering all 39 mainline games, gym leaders, elite four, and confirmed upcoming titles</li>
        </ul>
      </div>

      {/* Citations & Data Sources */}
      <div
        className="pixel-border"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          padding: '24px',
          borderRadius: '8px',
          marginBottom: '24px',
        }}
      >
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', margin: '0 0 14px 0' }}>
          DATA SOURCES & CITATIONS
        </h2>
        <ul style={{ margin: 0, paddingLeft: '20px', fontFamily: 'var(--font-body)', fontSize: '17px', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>
            <strong>PokéAPI (https://pokeapi.co):</strong> RESTful Pokémon API utilized for real-time canonical monster sprites, species artwork, and elemental type indexes.
          </li>
          <li>
            <strong>Bulbapedia (https://bulbapedia.bulbagarden.net):</strong> Reference encyclopedia consulted for verified Japanese, North American, and European release dates, gym badges, and version-exclusive distributions.
          </li>
          <li>
            <strong>Serebii.net:</strong> Primary archive cross-referenced for battle mechanics, generation evolutions, and DLC release timetables.
          </li>
          <li>
            <strong>Nintendo & The Pokémon Company Official Announcements:</strong> Verified details regarding upcoming releases (including Pokémon Legends: Z-A for Nintendo Switch and Nintendo Switch 2).
          </li>
        </ul>
      </div>

      {/* Legal Disclaimer */}
      <div
        className="pixel-border"
        style={{
          backgroundColor: '#FFF1F0',
          border: '4px solid #D32F2F',
          borderRadius: '8px',
          padding: '24px',
          color: '#5C0000',
        }}
      >
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', margin: '0 0 10px 0', color: '#D32F2F' }}>
          LEGAL DISCLAIMER & FAIR USE
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.5, margin: 0 }}>
          This is an unofficial, non-commercial fan project created out of deep love and admiration for the Pokémon video game series. Pokémon and all related characters, names, graphics, and trademarks are registered trademarks of <strong>Nintendo</strong>, <strong>Game Freak</strong>, <strong>Creatures Inc.</strong>, and <strong>The Pokémon Company</strong>. This website is not affiliated with, sponsored by, or endorsed by Nintendo or The Pokémon Company in any capacity.
        </p>
      </div>
    </div>
  );
}
