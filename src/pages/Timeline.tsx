import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import gamesData from '../data/games.json';
import type { Game } from '../data/types';
import DialogueBox from '../components/ui/DialogueBox';
import PokemonSprite from '../components/ui/PokemonSprite';
import GenerationBadge from '../components/ui/GenerationBadge';
import PokeballButton from '../components/ui/PokeballButton';
import { useSound } from '../hooks/useSound';

export default function Timeline() {
  const { play } = useSound();
  const games = (gamesData as Game[]).slice().sort((a, b) => a.id - b.id);
  const [selectedGame, setSelectedGame] = useState<Game>(games[0]);
  const timelineRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (timelineRef.current) {
      const offset = direction === 'left' ? -350 : 350;
      timelineRef.current.scrollBy({ left: offset, behavior: 'smooth' });
      play('blip');
    }
  };

  const getPlatformIcon = (platform: string) => {
    if (platform.includes('Game Boy Color')) return '🟡 GBC';
    if (platform.includes('Game Boy Advance')) return '🟣 GBA';
    if (platform.includes('Game Boy')) return '⚪ GB';
    if (platform.includes('3DS')) return '🔴 3DS';
    if (platform.includes('DS')) return '⚪ DS';
    if (platform.includes('Switch 2')) return '⚡ SWITCH 2';
    if (platform.includes('Switch')) return '🔴🔵 SWITCH';
    return '🎮 CONSOLE';
  };

  return (
    <div
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '24px 16px 48px',
      }}
    >
      {/* Header Banner */}
      <div
        className="pixel-border"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', margin: 0, color: 'var(--color-pokedex-red)' }}>
            POKÉMON JOURNEY CHRONOLOGY
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', margin: '4px 0 0 0', opacity: 0.8 }}>
            Horizontal chronological expedition from 1996 in Pallet Town to the future of Lumiose City
          </p>
        </div>

        {/* Scroll Controls */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => scroll('left')}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '10px',
              padding: '8px 14px',
              backgroundColor: 'var(--color-bg-primary)',
              border: '2px solid var(--color-border)',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            ◀ SCROLL
          </button>
          <button
            onClick={() => scroll('right')}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '10px',
              padding: '8px 14px',
              backgroundColor: 'var(--color-bg-primary)',
              border: '2px solid var(--color-border)',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            SCROLL ▶
          </button>
        </div>
      </div>

      {/* HORIZONTAL TIMELINE TRACK */}
      <div
        ref={timelineRef}
        className="pixel-border"
        style={{
          backgroundColor: '#1E1E28',
          padding: '36px 24px',
          borderRadius: '12px',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          marginBottom: '28px',
          boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.5)',
          position: 'relative',
        }}
      >
        {/* Glowing Center Trail Line */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '50%',
            height: '6px',
            backgroundColor: '#FFCB05',
            boxShadow: '0 0 10px #FFCB05',
            zIndex: 0,
          }}
        />

        <div style={{ display: 'inline-flex', gap: '28px', position: 'relative', zIndex: 1, padding: '10px 0' }}>
          {games.map((g) => {
            const isSelected = selectedGame.id === g.id;
            const year = g.releaseDates.jp.slice(0, 4);

            return (
              <div
                key={g.id}
                style={{
                  display: 'inline-flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '180px',
                }}
              >
                {/* Console Badge Above Track */}
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '7px',
                    padding: '4px 8px',
                    backgroundColor: '#2A2A3A',
                    color: '#FFF',
                    border: '1px solid #4A4A5A',
                    borderRadius: '4px',
                    marginBottom: '12px',
                    boxShadow: '2px 2px 0px rgba(0,0,0,0.4)',
                  }}
                >
                  {getPlatformIcon(g.platform)}
                </div>

                {/* Node Button */}
                <button
                  onClick={() => { play('select'); setSelectedGame(g); }}
                  style={{
                    width: isSelected ? '64px' : '48px',
                    height: isSelected ? '64px' : '48px',
                    borderRadius: '50%',
                    backgroundColor: g.themeColor,
                    border: isSelected ? '4px solid #FFFFFF' : '3px solid #1B1B1B',
                    boxShadow: isSelected ? '0 0 14px #FFF, 4px 4px 0px rgba(0,0,0,0.5)' : '3px 3px 0px rgba(0,0,0,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    position: 'relative',
                  }}
                  title={g.title}
                >
                  {/* Miniature Mascot Sprite inside node */}
                  {g.mascotPokemon[0] && (
                    <PokemonSprite
                      dexNumber={g.mascotPokemon[0].dexNumber}
                      name={g.mascotPokemon[0].name}
                      size={isSelected ? 44 : 32}
                    />
                  )}
                </button>

                {/* Info Below Track */}
                <div style={{ textAlign: 'center', marginTop: '12px', width: '100%' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '8px', color: '#FFCB05' }}>
                    {year}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '8px',
                      color: isSelected ? '#FFFFFF' : '#A0A0A0',
                      whiteSpace: 'normal',
                      lineHeight: 1.3,
                      marginTop: '4px',
                      maxHeight: '32px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {g.title.replace('Pokémon ', '')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DIALOGUE BOX PREVIEW PANEL */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedGame.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.2 }}
          className="pixel-border"
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            padding: '24px',
            borderRadius: '10px',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left preview info */}
            <div className="md:col-span-8 flex flex-col gap-3">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <GenerationBadge gen={selectedGame.generation} />
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '8px',
                    padding: '3px 8px',
                    backgroundColor: selectedGame.themeColor,
                    color: '#FFF',
                    borderRadius: '4px',
                  }}
                >
                  {selectedGame.region}
                </span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '8px', opacity: 0.7 }}>
                  Japan Release: {selectedGame.releaseDates.jp}
                </span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '16px',
                  margin: 0,
                  color: 'var(--color-text-dark)',
                }}
              >
                {selectedGame.title}
              </h2>

              {/* Dialogue Box Preview */}
              <DialogueBox text={selectedGame.overview} speed={20} />

              <div style={{ marginTop: '8px' }}>
                <Link to={`/games/${selectedGame.slug}`} style={{ textDecoration: 'none' }}>
                  <PokeballButton label={`EXPLORE ${selectedGame.title.toUpperCase()} ▶`} />
                </Link>
              </div>
            </div>

            {/* Right Mascot Big Box */}
            <div
              className="md:col-span-4 flex flex-col items-center justify-center"
              style={{
                backgroundColor: 'var(--color-bg-primary)',
                border: '3px solid var(--color-border)',
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'center',
              }}
            >
              {selectedGame.mascotPokemon[0] && (
                <>
                  <PokemonSprite
                    dexNumber={selectedGame.mascotPokemon[0].dexNumber}
                    name={selectedGame.mascotPokemon[0].name}
                    size={120}
                  />
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '9px', marginTop: '8px' }}>
                    {selectedGame.mascotPokemon[0].name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#666' }}>
                    Featured Mascot of {selectedGame.region}
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
