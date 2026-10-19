import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect, useCallback, useState } from 'react';
import { useSound } from '../hooks/useSound';
import MenuList from '../components/ui/MenuList';

const MENU_ITEMS = [
  { label: 'GAMES', path: '/games', icon: '🎮' },
  { label: 'TIMELINE', path: '/timeline', icon: '📅' },
  { label: 'REGIONS', path: '/regions', icon: '🗺️' },
  { label: 'STARTERS', path: '/starters', icon: '⭐' },
  { label: 'COMPARE', path: '/compare', icon: '⚔️' },
  { label: 'QUIZ', path: '/quiz', icon: '❓' },
  { label: 'COLLECTION', path: '/collection', icon: '📦' },
  { label: 'ABOUT', path: '/about', icon: 'ℹ️' },
];

// Pixel star positions for background
const STARS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 3,
}));

export default function TitleScreen() {
  const navigate = useNavigate();
  const { play } = useSound();
  const [phase, setPhase] = useState<'title' | 'menu'>('title');
  const [menuIndex, setMenuIndex] = useState(0);

  const handleStart = useCallback(() => {
    play('select');
    setPhase('menu');
  }, [play]);

  const handleMenuSelect = useCallback((i: number) => {
    play('select');
    navigate(MENU_ITEMS[i].path);
  }, [navigate, play]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (phase === 'title' && (e.key === 'Enter' || e.key === ' ')) {
        handleStart();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [phase, handleStart]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0D0D2B 0%, #1A1A2E 40%, #2D1B4E 70%, #4A1040 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
      onClick={phase === 'title' ? handleStart : undefined}
    >
      {/* Animated star field */}
      {STARS.map((star) => (
        <motion.div
          key={star.id}
          style={{
            position: 'absolute',
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            backgroundColor: '#FFFFFF',
            borderRadius: '50%',
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 2 + star.delay,
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}

      {/* Pixel grass silhouette at bottom */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '80px',
          background: 'linear-gradient(180deg, transparent, #0D2B0D)',
        }}
      />

      {/* Animated Pokéball logo */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
        style={{ marginBottom: '32px', zIndex: 1 }}
      >
        <motion.svg
          width="100"
          height="100"
          viewBox="0 0 64 64"
          className="pixel-art"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <circle cx="32" cy="32" r="30" fill="#F5F5F5" stroke="#1B1B1B" strokeWidth="4" />
          <path d="M2 32a30 30 0 0 1 60 0" fill="#DC0A2D" stroke="#1B1B1B" strokeWidth="4" />
          <rect x="2" y="30" width="60" height="4" fill="#1B1B1B" />
          <circle cx="32" cy="32" r="8" fill="#F5F5F5" stroke="#1B1B1B" strokeWidth="4" />
          <circle cx="32" cy="32" r="4" fill="#F5F5F5" stroke="#1B1B1B" strokeWidth="2" />
        </motion.svg>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{ zIndex: 1, textAlign: 'center', marginBottom: '48px' }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(18px, 5vw, 32px)',
            color: '#FFCB05',
            textShadow: '3px 3px 0px #B8860B, 6px 6px 0px rgba(0,0,0,0.4)',
            lineHeight: 1.8,
            margin: 0,
          }}
        >
          POKÉDEX<br />OF GAMES
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            color: 'rgba(255,255,255,0.5)',
            margin: '8px 0 0 0',
          }}
        >
          Main Series Archive
        </p>
      </motion.div>

      {/* Phase: Title or Menu */}
      <AnimatePresence mode="wait">
        {phase === 'title' ? (
          <motion.div
            key="press-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ zIndex: 1, textAlign: 'center' }}
          >
            <p
              className="blink"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(10px, 2.5vw, 14px)',
                color: '#FFFFFF',
                textShadow: '2px 2px 0px rgba(0,0,0,0.5)',
              }}
            >
              PRESS START
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'rgba(255,255,255,0.35)',
                marginTop: '16px',
              }}
            >
              Click / tap / press Enter to continue
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
            style={{ zIndex: 1, width: '100%', maxWidth: '320px', padding: '0 16px' }}
          >
            <MenuList
              items={MENU_ITEMS}
              activeIndex={menuIndex}
              onActiveChange={setMenuIndex}
              onSelect={handleMenuSelect}
              style={{
                backgroundColor: 'rgba(0,0,0,0.85)',
                border: '4px solid #FFCB05',
                boxShadow: '8px 8px 0px rgba(0,0,0,0.5)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
