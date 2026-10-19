import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import regionsData from '../data/regions.json';
import gamesData from '../data/games.json';
import type { Region, Game } from '../data/types';
import PokemonSprite from '../components/ui/PokemonSprite';
import PokeballButton from '../components/ui/PokeballButton';
import { useSound } from '../hooks/useSound';

export default function Regions() {
  const { play } = useSound();
  const regions = regionsData as Region[];
  const games = gamesData as Game[];
  const [selectedRegion, setSelectedRegion] = useState<Region>(regions[0]);

  // Find games set in this region
  const regionGames = games.filter((g) => selectedRegion.games.includes(g.slug));

  return (
    <div
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '24px 16px 48px',
      }}
    >
      {/* Header */}
      <div
        className="pixel-border"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '24px',
        }}
      >
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', margin: 0, color: 'var(--color-pokedex-red)' }}>
          REGIONAL CARTOGRAPHY & GEOGRAPHY
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', margin: '4px 0 0 0', opacity: 0.8 }}>
          Discover the real-world geographic inspirations, native ecology, and games set across each continent
        </p>
      </div>

      {/* REGION SELECTION PILLS */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '24px',
        }}
      >
        {regions.map((r) => {
          const isSelected = selectedRegion.slug === r.slug;
          return (
            <button
              key={r.slug}
              onClick={() => { play('select'); setSelectedRegion(r); }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '8px',
                padding: '8px 16px',
                backgroundColor: isSelected ? r.themeColor : 'var(--color-bg-secondary)',
                color: isSelected ? '#FFFFFF' : 'var(--color-text-dark)',
                border: isSelected ? '3px solid #1B1B1B' : '2px solid var(--color-border)',
                borderRadius: '6px',
                cursor: 'pointer',
                boxShadow: isSelected ? '3px 3px 0px rgba(0,0,0,0.3)' : 'none',
                transition: 'all 0.1s',
              }}
            >
              {r.name.toUpperCase()}
            </button>
          );
        })}
      </div>

      {/* SELECTED REGION CARD & DETAILS */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedRegion.slug}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
        >
          {/* LEFT COLUMN (7 COLS): Region Overview & Native Ecosystem */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div
              className="pixel-border-lg"
              style={{
                backgroundColor: selectedRegion.themeColor,
                color: '#FFF',
                padding: '24px',
                borderRadius: '10px',
              }}
            >
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '9px', opacity: 0.85, marginBottom: '6px' }}>
                CONTINENTAL DOSSIER //
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '24px',
                  margin: '0 0 12px 0',
                  textShadow: '2px 2px 0px rgba(0,0,0,0.5)',
                }}
              >
                {selectedRegion.name} Region
              </h2>
              <div
                style={{
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  display: 'inline-block',
                  marginBottom: '16px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '9px',
                }}
              >
                🌍 Real-World Inspiration: {selectedRegion.realWorldInspiration}
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', lineHeight: 1.5, margin: 0 }}>
                {selectedRegion.description}
              </p>
            </div>

            {/* Signature Regional Pokémon */}
            <div
              className="pixel-border"
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                padding: '20px',
                borderRadius: '8px',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', margin: '0 0 12px 0' }}>
                SIGNATURE BIODIVERSITY OF {selectedRegion.name.toUpperCase()}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {selectedRegion.signaturePokemon.map((poke) => (
                  <div
                    key={poke.dexNumber}
                    style={{
                      backgroundColor: 'var(--color-bg-primary)',
                      border: '2px solid var(--color-border)',
                      borderRadius: '6px',
                      padding: '12px',
                      textAlign: 'center',
                    }}
                  >
                    <PokemonSprite dexNumber={poke.dexNumber} name={poke.name} size={70} />
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '8px', marginTop: '6px' }}>
                      {poke.name}
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#666' }}>
                      №{String(poke.dexNumber).padStart(3, '0')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (5 COLS): Games set here */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div
              className="pixel-border"
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                padding: '20px',
                borderRadius: '8px',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', margin: '0 0 12px 0' }}>
                CANON GAMES EXPLORING {selectedRegion.name.toUpperCase()}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {regionGames.map((g) => (
                  <Link
                    key={g.id}
                    to={`/games/${g.slug}`}
                    onClick={() => play('select')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      backgroundColor: 'var(--color-bg-primary)',
                      border: '2px solid var(--color-border)',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      color: 'var(--color-text-dark)',
                      transition: 'transform 0.1s',
                    }}
                  >
                    <div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '9px' }}>{g.title}</div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#666' }}>
                        {g.platform} • {g.releaseDates.jp.slice(0, 4)}
                      </div>
                    </div>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '8px', color: g.themeColor }}>
                      VIEW ▶
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Stylized Map Viewport */}
            <div
              className="pixel-border"
              style={{
                backgroundColor: '#6EA874',
                padding: '24px',
                borderRadius: '8px',
                textAlign: 'center',
                boxShadow: 'inset 4px 4px 0px rgba(0,0,0,0.25)',
              }}
            >
              <div style={{ fontSize: '36px', marginBottom: '8px' }}>🗺️</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', color: '#1B381F', marginBottom: '4px' }}>
                TOPOGRAPHIC ARCHIVE
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#1B381F', margin: 0 }}>
                {selectedRegion.name} has hosted {regionGames.length} major Pokémon journeys throughout history.
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
