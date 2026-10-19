import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import gamesData from '../data/games.json';
import type { Game } from '../data/types';
import { useCollectionStore } from '../stores/useCollectionStore';
import PokeballButton from '../components/ui/PokeballButton';
import { useSound } from '../hooks/useSound';

export default function Collection() {
  const { play } = useSound();
  const games = gamesData as Game[];

  const ownedSlugs = useCollectionStore((s) => s.ownedGames);
  const playedSlugs = useCollectionStore((s) => s.playedGames);
  const favoriteSlugs = useCollectionStore((s) => s.favoriteGames);

  const ownedGames = useMemo(() => games.filter((g) => ownedSlugs.includes(g.slug)), [games, ownedSlugs]);
  const playedGames = useMemo(() => games.filter((g) => playedSlugs.includes(g.slug)), [games, playedSlugs]);
  const favoriteGames = useMemo(() => games.filter((g) => favoriteSlugs.includes(g.slug)), [games, favoriteSlugs]);

  const progressPercent = Math.round((ownedGames.length / games.length) * 100);

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
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', margin: 0, color: 'var(--color-pokedex-red)' }}>
            TRAINER'S CARTRIDGE SHELF
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', margin: '4px 0 0 0', opacity: 0.8 }}>
            Your personal physical & digital collection tracking progress across all mainline releases
          </p>
        </div>

        {/* Progress Counter */}
        <div
          style={{
            backgroundColor: 'var(--color-bg-primary)',
            border: '2px solid var(--color-border)',
            borderRadius: '6px',
            padding: '8px 16px',
            textAlign: 'right',
          }}
        >
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '9px', color: 'var(--color-pokedex-red)' }}>
            COLLECTION COMPLETION:
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', margin: '2px 0' }}>
            {ownedGames.length} / {games.length} ({progressPercent}%)
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          height: '14px',
          backgroundColor: 'rgba(0,0,0,0.1)',
          borderRadius: '4px',
          overflow: 'hidden',
          marginBottom: '32px',
          border: '2px solid var(--color-border)',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progressPercent}%`,
            backgroundColor: '#4CAF50',
            transition: 'width 0.4s ease',
          }}
        />
      </div>

      {/* ================= CARTRIDGE SHELF VIEW ================= */}
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', marginBottom: '16px' }}>
        OWNED CARTRIDGE RACK ({ownedGames.length} CARTRIDGES)
      </h2>

      {ownedGames.length > 0 ? (
        <div
          className="pixel-border-lg"
          style={{
            backgroundColor: '#8B5A2B', // Wooden Shelf Rack
            padding: '32px 20px 20px',
            borderRadius: '10px',
            marginBottom: '36px',
            boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.4)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
              gap: '16px',
              alignItems: 'flex-end',
            }}
          >
            {ownedGames.map((g) => (
              <Link
                key={g.id}
                to={`/games/${g.slug}`}
                onClick={() => play('select')}
                style={{ textDecoration: 'none' }}
              >
                {/* Physical Cartridge Mockup */}
                <div
                  style={{
                    height: '140px',
                    backgroundColor: g.themeColor,
                    border: '3px solid #1B1B1B',
                    borderRadius: '6px 6px 2px 2px',
                    boxShadow: '3px 4px 0px rgba(0,0,0,0.4)',
                    padding: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    transition: 'transform 0.1s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-8px)';
                    play('blip');
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = '';
                  }}
                >
                  {/* Top Notch of Cartridge */}
                  <div
                    style={{
                      height: '6px',
                      backgroundColor: 'rgba(0,0,0,0.25)',
                      borderRadius: '2px',
                      marginBottom: '6px',
                    }}
                  />
                  {/* Label Sticker */}
                  <div
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '4px',
                      padding: '6px 4px',
                      textAlign: 'center',
                      border: '1px solid rgba(0,0,0,0.2)',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '7px',
                        color: '#1B1B1B',
                        lineHeight: 1.3,
                      }}
                    >
                      {g.title.replace('Pokémon ', '')}
                    </div>
                  </div>
                  {/* Bottom Console imprint */}
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '6px',
                      color: '#FFFFFF',
                      textAlign: 'center',
                      textShadow: '1px 1px 0px rgba(0,0,0,0.6)',
                    }}
                  >
                    {g.platform.split(' ')[0]}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Wooden Shelf Base Lip */}
          <div
            style={{
              height: '14px',
              backgroundColor: '#5C3818',
              borderRadius: '2px',
              marginTop: '16px',
              borderTop: '2px solid rgba(0,0,0,0.3)',
            }}
          />
        </div>
      ) : (
        <div
          className="pixel-border"
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            padding: '36px',
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '36px',
          }}
        >
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', color: '#888', marginBottom: '12px' }}>
            YOUR SHELF IS CURRENTLY EMPTY
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', margin: '0 0 16px 0' }}>
            Visit any game dossier in the Games Browser and click "+ OWN CART" to stock your shelf!
          </p>
          <Link to="/games" style={{ textDecoration: 'none' }}>
            <PokeballButton label="BROWSE GAMES ARCHIVE ▶" />
          </Link>
        </div>
      )}

      {/* ================= FAVORITES & COMPLETED GAUNTLETS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Favorites */}
        <div
          className="pixel-border"
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            padding: '20px',
            borderRadius: '8px',
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', margin: '0 0 12px 0', color: '#DAA520' }}>
            ★ FAVORITE JOURNEYS ({favoriteGames.length})
          </h3>
          {favoriteGames.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {favoriteGames.map((g) => (
                <Link
                  key={g.id}
                  to={`/games/${g.slug}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    backgroundColor: 'var(--color-bg-primary)',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    color: 'var(--color-text-dark)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '8px' }}>{g.title}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#666' }}>{g.region}</span>
                </Link>
              ))}
            </div>
          ) : (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#888', margin: 0 }}>
              No favorites starred yet.
            </p>
          )}
        </div>

        {/* Completed Games */}
        <div
          className="pixel-border"
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            padding: '20px',
            borderRadius: '8px',
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', margin: '0 0 12px 0', color: '#2196F3' }}>
            ✓ COMPLETED ADVENTURES ({playedGames.length})
          </h3>
          {playedGames.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {playedGames.map((g) => (
                <Link
                  key={g.id}
                  to={`/games/${g.slug}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    backgroundColor: 'var(--color-bg-primary)',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    color: 'var(--color-text-dark)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '8px' }}>{g.title}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#666' }}>{g.region}</span>
                </Link>
              ))}
            </div>
          ) : (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#888', margin: 0 }}>
              No games logged as completed yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
