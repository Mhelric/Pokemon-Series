export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-deep-navy)',
        borderTop: '4px solid var(--color-border)',
        padding: 'var(--space-3) var(--space-2)',
        textAlign: 'center',
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Pokéball divider */}
        <div className="flex items-center justify-center" style={{ gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
          <div style={{ height: '2px', flex: 1, background: 'rgba(255,255,255,0.2)' }} />
          <svg width="24" height="24" viewBox="0 0 64 64" className="pixel-art" aria-hidden="true">
            <circle cx="32" cy="32" r="30" fill="#DC0A2D" stroke="#E8E8E8" strokeWidth="3"/>
            <rect x="2" y="30" width="60" height="4" fill="#E8E8E8"/>
            <circle cx="32" cy="32" r="8" fill="#E8E8E8" stroke="#E8E8E8" strokeWidth="3"/>
          </svg>
          <div style={{ height: '2px', flex: 1, background: 'rgba(255,255,255,0.2)' }} />
        </div>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.6,
            marginBottom: 'var(--space-1)',
          }}
        >
          This is an unofficial, non-commercial fan project. Pokémon and all related names
          are trademarks of Nintendo, Game Freak, Creatures Inc., and The Pokémon Company.
          This site is not affiliated with or endorsed by them.
        </p>

        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '8px',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          POKÉDEX OF GAMES © 2024 — A fan-made archive
        </p>
      </div>
    </footer>
  );
}
