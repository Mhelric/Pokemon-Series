import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSettingsStore } from '../../stores/useSettingsStore';
import { useEasterEggStore } from '../../stores/useEasterEggStore';
import { useSound } from '../../hooks/useSound';

const NAV_ITEMS = [
  { path: '/games', label: 'GAMES' },
  { path: '/timeline', label: 'TIMELINE' },
  { path: '/regions', label: 'REGIONS' },
  { path: '/starters', label: 'STARTERS' },
  { path: '/compare', label: 'COMPARE' },
  { path: '/quiz', label: 'QUIZ' },
  { path: '/collection', label: 'COLLECTION' },
  { path: '/about', label: 'ABOUT' },
];

export default function Header() {
  const location = useLocation();
  const { play } = useSound();
  const { soundEnabled, toggleSound, theme, toggleTheme } = useSettingsStore();
  const incrementLogoClick = useEasterEggStore((s) => s.incrementLogoClick);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <header
      style={{
        backgroundColor: 'var(--color-pokedex-red)',
        borderBottom: '4px solid #1B1B1B',
        boxShadow: '0 4px 0px rgba(0,0,0,0.3)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        className="max-w-7xl mx-auto flex items-center justify-between"
        style={{ padding: '8px 16px' }}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 no-underline"
          onClick={() => {
            play('select');
            incrementLogoClick();
          }}
          aria-label="Pokédex of Games — Home"
        >
          <svg width="32" height="32" viewBox="0 0 64 64" className="pixel-art" aria-hidden="true">
            <circle cx="32" cy="32" r="30" fill="#F5F5F5" stroke="#1B1B1B" strokeWidth="4" />
            <path d="M2 32a30 30 0 0 1 60 0" fill="#DC0A2D" stroke="#1B1B1B" strokeWidth="4" />
            <rect x="2" y="30" width="60" height="4" fill="#1B1B1B" />
            <circle cx="32" cy="32" r="8" fill="#F5F5F5" stroke="#1B1B1B" strokeWidth="4" />
            <circle cx="32" cy="32" r="4" fill="#F5F5F5" stroke="#1B1B1B" strokeWidth="2" />
          </svg>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '9px',
              color: 'var(--color-pikachu-yellow)',
              textShadow: '2px 2px 0px rgba(0,0,0,0.5)',
              letterSpacing: '1px',
            }}
          >
            POKÉDEX OF GAMES
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center" style={{ gap: '4px' }}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => play('blip')}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '7px',
                padding: '6px 8px',
                color: isActive(item.path)
                  ? 'var(--color-pikachu-yellow)'
                  : 'var(--color-pokeball-white)',
                backgroundColor: isActive(item.path) ? 'rgba(0,0,0,0.3)' : 'transparent',
                borderRadius: '4px',
                textDecoration: 'none',
              }}
              aria-current={location.pathname === item.path ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center" style={{ gap: '8px' }}>
          {/* Day/Night Toggle */}
          <button
            onClick={() => { play('select'); toggleTheme(); }}
            style={{
              background: theme === 'day' ? '#FFD733' : '#2C2C54',
              border: '2px solid #1B1B1B',
              borderRadius: '20px',
              width: '48px',
              height: '24px',
              position: 'relative',
              cursor: 'pointer',
              flexShrink: 0,
            }}
            aria-label={`Switch to ${theme === 'day' ? 'night' : 'day'} mode`}
          >
            <span
              style={{
                position: 'absolute',
                top: '2px',
                left: theme === 'day' ? '2px' : '26px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: '#FFF',
                border: '2px solid #1B1B1B',
                transition: 'left 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '9px',
                lineHeight: 1,
              }}
            >
              {theme === 'day' ? '☀' : '🌙'}
            </span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => toggleSound()}
            style={{
              background: 'rgba(0,0,0,0.2)',
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: '4px',
              padding: '4px 8px',
              color: 'var(--color-pokeball-white)',
              fontFamily: 'var(--font-heading)',
              fontSize: '12px',
              cursor: 'pointer',
            }}
            aria-label={soundEnabled ? 'Mute sounds' : 'Unmute sounds'}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>

          {/* Mobile menu button */}
          <button
            className="lg:hidden"
            style={{
              background: 'rgba(0,0,0,0.2)',
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: '4px',
              padding: '4px 8px',
              color: 'var(--color-pokeball-white)',
              fontFamily: 'var(--font-heading)',
              fontSize: '9px',
              cursor: 'pointer',
            }}
            onClick={() => { play('select'); setMobileOpen((v) => !v); }}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? '✕' : '☰'} MENU
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <nav
          style={{
            backgroundColor: 'rgba(0,0,0,0.95)',
            padding: '8px 16px 16px',
            borderTop: '2px solid rgba(255,255,255,0.2)',
          }}
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => { play('blip'); setMobileOpen(false); }}
              style={{
                display: 'block',
                fontFamily: 'var(--font-heading)',
                fontSize: '10px',
                padding: '10px 12px',
                color: isActive(item.path)
                  ? 'var(--color-pikachu-yellow)'
                  : 'var(--color-pokeball-white)',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                textDecoration: 'none',
              }}
            >
              {isActive(item.path) ? '▶ ' : '   '}
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
