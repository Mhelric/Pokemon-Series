import { useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import gamesData from '../data/games.json';
import type { Game } from '../data/types';
import DialogueBox from '../components/ui/DialogueBox';
import StatBar from '../components/ui/StatBar';
import TypeBadge from '../components/ui/TypeBadge';
import PokemonSprite from '../components/ui/PokemonSprite';
import GenerationBadge from '../components/ui/GenerationBadge';
import PokeballButton from '../components/ui/PokeballButton';
import { useCollectionStore } from '../stores/useCollectionStore';
import { useSound } from '../hooks/useSound';

export default function GameDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { play } = useSound();

  const games = gamesData as Game[];
  const currentIndex = games.findIndex((g) => g.slug === slug);
  const game = games[currentIndex] || games[0];

  const prevGame = currentIndex > 0 ? games[currentIndex - 1] : null;
  const nextGame = currentIndex < games.length - 1 ? games[currentIndex + 1] : null;

  // Collection Store
  const isOwned = useCollectionStore((s) => s.isOwned(game.slug));
  const isPlayed = useCollectionStore((s) => s.isPlayed(game.slug));
  const isFavorite = useCollectionStore((s) => s.isFavorite(game.slug));
  const toggleOwned = useCollectionStore((s) => s.toggleOwned);
  const togglePlayed = useCollectionStore((s) => s.togglePlayed);
  const toggleFavorite = useCollectionStore((s) => s.toggleFavorite);

  // Keyboard navigation: Left/Right arrows for previous/next game
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && prevGame) {
        play('blip');
        navigate(`/games/${prevGame.slug}`);
      } else if (e.key === 'ArrowRight' && nextGame) {
        play('blip');
        navigate(`/games/${nextGame.slug}`);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [prevGame, nextGame, navigate, play]);

  if (!game) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Game Not Found</h2>
        <Link to="/games">Back to Browser</Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '24px 16px 48px',
      }}
    >
      {/* Top Navigation Bar: Back & Prev/Next */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <Link
          to="/games"
          onClick={() => play('back')}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '9px',
            color: 'var(--color-text-dark)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          ◀ RETURN TO ARCHIVE
        </Link>

        <div style={{ display: 'flex', gap: '8px' }}>
          {prevGame && (
            <Link
              to={`/games/${prevGame.slug}`}
              onClick={() => play('blip')}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '8px',
                padding: '6px 10px',
                backgroundColor: 'var(--color-bg-secondary)',
                border: '2px solid var(--color-border)',
                borderRadius: '4px',
                color: 'var(--color-text-dark)',
                textDecoration: 'none',
              }}
            >
              ◀ {prevGame.title}
            </Link>
          )}
          {nextGame && (
            <Link
              to={`/games/${nextGame.slug}`}
              onClick={() => play('blip')}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '8px',
                padding: '6px 10px',
                backgroundColor: 'var(--color-bg-secondary)',
                border: '2px solid var(--color-border)',
                borderRadius: '4px',
                color: 'var(--color-text-dark)',
                textDecoration: 'none',
              }}
            >
              {nextGame.title} ▶
            </Link>
          )}
        </div>
      </div>

      {/* 1. HERO HEADER: Themed Banner */}
      <div
        className="pixel-border-lg"
        style={{
          backgroundColor: game.themeColor,
          color: '#FFFFFF',
          padding: '28px 24px',
          borderRadius: '12px',
          marginBottom: '24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
            <GenerationBadge gen={game.generation} />
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '8px',
                padding: '3px 8px',
                backgroundColor: 'rgba(0,0,0,0.4)',
                borderRadius: '4px',
              }}
            >
              №{String(game.id).padStart(2, '0')}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '8px',
                padding: '3px 8px',
                backgroundColor: 'rgba(0,0,0,0.4)',
                borderRadius: '4px',
              }}
            >
              {game.platform}
            </span>
            {game.isUpcoming && (
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '8px',
                  padding: '3px 8px',
                  backgroundColor: '#E65100',
                  borderRadius: '4px',
                }}
              >
                UPCOMING
              </span>
            )}
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(18px, 4vw, 28px)',
              margin: '0 0 12px 0',
              textShadow: '3px 3px 0px rgba(0,0,0,0.6)',
              lineHeight: 1.4,
            }}
          >
            {game.title}
          </h1>

          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              opacity: 0.95,
            }}
          >
            <div><strong>Region:</strong> {game.region}</div>
            <div><strong>Developer:</strong> {game.developer}</div>
            <div><strong>Publisher:</strong> {game.publisher}</div>
            <div><strong>Japan:</strong> {game.releaseDates.jp}</div>
            <div><strong>North America:</strong> {game.releaseDates.na}</div>
            <div><strong>Europe:</strong> {game.releaseDates.eu}</div>
          </div>
        </div>

        {/* Mascot Big Art Silhouette in background */}
        {game.mascotPokemon[0] && (
          <div
            style={{
              position: 'absolute',
              right: '20px',
              bottom: '-10px',
              opacity: 0.85,
              pointerEvents: 'none',
            }}
          >
            <PokemonSprite
              dexNumber={game.mascotPokemon[0].dexNumber}
              name={game.mascotPokemon[0].name}
              size={180}
            />
          </div>
        )}
      </div>

      {/* 2. COLLECTION CONTROLS: Owned / Played / Favorite */}
      <div
        className="pixel-border"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          padding: '12px 20px',
          borderRadius: '8px',
          marginBottom: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '9px' }}>
          TRAINER COLLECTION LOG:
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => { play('select'); toggleOwned(game.slug); }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '8px',
              padding: '6px 12px',
              backgroundColor: isOwned ? '#4CAF50' : 'rgba(0,0,0,0.08)',
              color: isOwned ? '#FFF' : 'var(--color-text-dark)',
              border: '2px solid var(--color-border)',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {isOwned ? '✓ OWNED' : '+ OWN CART'}
          </button>
          <button
            onClick={() => { play('select'); togglePlayed(game.slug); }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '8px',
              padding: '6px 12px',
              backgroundColor: isPlayed ? '#2196F3' : 'rgba(0,0,0,0.08)',
              color: isPlayed ? '#FFF' : 'var(--color-text-dark)',
              border: '2px solid var(--color-border)',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {isPlayed ? '★ COMPLETED' : '○ UNPLAYED'}
          </button>
          <button
            onClick={() => { play('select'); toggleFavorite(game.slug); }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '8px',
              padding: '6px 12px',
              backgroundColor: isFavorite ? '#FFD700' : 'rgba(0,0,0,0.08)',
              color: isFavorite ? '#1B1B1B' : 'var(--color-text-dark)',
              border: '2px solid var(--color-border)',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {isFavorite ? '♥ FAVORITE' : '♡ FAVORITE'}
          </button>
        </div>
      </div>

      {/* 3. PROFESSOR OAK'S RESEARCH OVERVIEW */}
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', marginBottom: '8px' }}>
          PROFESSOR OAK'S RESEARCH DISPATCH:
        </h2>
        <DialogueBox text={game.overview} speed={25} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN (7 COLS): Starters, Mascots, Features, Gyms & League */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* STARTER & MASCOT POKÉMON */}
          <div
            className="pixel-border"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              padding: '20px',
              borderRadius: '8px',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', margin: '0 0 16px 0' }}>
              STARTER TRIO & MASCOT CREATURES
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '12px' }}>
              {game.starters.map((p) => (
                <div
                  key={p.dexNumber}
                  style={{
                    backgroundColor: 'var(--color-bg-primary)',
                    border: '2px solid var(--color-border)',
                    borderRadius: '6px',
                    padding: '10px',
                    textAlign: 'center',
                  }}
                >
                  <PokemonSprite dexNumber={p.dexNumber} name={p.name} size={70} />
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '7px', marginTop: '6px' }}>
                    {p.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#666' }}>
                    №{String(p.dexNumber).padStart(3, '0')} (Starter)
                  </div>
                </div>
              ))}
              {game.mascotPokemon.map((p) => (
                <div
                  key={p.dexNumber}
                  style={{
                    backgroundColor: 'rgba(255, 203, 5, 0.15)',
                    border: '2px solid var(--color-pikachu-yellow)',
                    borderRadius: '6px',
                    padding: '10px',
                    textAlign: 'center',
                  }}
                >
                  <PokemonSprite dexNumber={p.dexNumber} name={p.name} size={70} />
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '7px', marginTop: '6px' }}>
                    {p.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#886600' }}>
                    №{String(p.dexNumber).padStart(3, '0')} (Legendary)
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* KEY MECHANICS & INNOVATIONS */}
          <div
            className="pixel-border"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              padding: '20px',
              borderRadius: '8px',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', margin: '0 0 12px 0' }}>
              KEY MECHANICAL INNOVATIONS
            </h3>
            <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {game.features.map((feat, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '17px',
                    lineHeight: 1.4,
                  }}
                >
                  {feat}
                </li>
              ))}
            </ul>
          </div>

          {/* GYM LEADERS & ELITE FOUR */}
          {(game.gymLeaders.length > 0 || game.eliteFour.length > 0) && (
            <div
              className="pixel-border"
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                padding: '20px',
                borderRadius: '8px',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', margin: '0 0 14px 0' }}>
                GYM LEADERS & THE INDIGO / REGIONAL LEAGUE
              </h3>

              {/* Gym Leaders */}
              {game.gymLeaders.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '8px', color: '#666', marginBottom: '8px' }}>
                    REGIONAL GYM LEADERS:
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                    {game.gymLeaders.map((leader, i) => (
                      <div
                        key={i}
                        style={{
                          backgroundColor: 'var(--color-bg-primary)',
                          border: '2px solid var(--color-border)',
                          borderRadius: '4px',
                          padding: '6px 8px',
                        }}
                      >
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '8px' }}>{leader.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                          <TypeBadge type={leader.type} size="sm" />
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', opacity: 0.75 }}>
                            {leader.badge}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Elite Four & Champion */}
              {game.eliteFour.length > 0 && (
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '8px', color: '#666', marginBottom: '8px' }}>
                    ELITE FOUR GAUNTLET:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {game.eliteFour.map((e4, i) => (
                      <div
                        key={i}
                        style={{
                          backgroundColor: 'var(--color-bg-primary)',
                          border: '2px solid var(--color-border)',
                          borderRadius: '4px',
                          padding: '6px 10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '8px' }}>{e4.name}</span>
                        <TypeBadge type={e4.type} size="sm" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {game.champion && (
                <div
                  style={{
                    backgroundColor: 'rgba(255, 203, 5, 0.2)',
                    border: '2px dashed var(--color-pikachu-yellow)',
                    borderRadius: '4px',
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '8px' }}>REIGNING CHAMPION:</span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '9px', color: 'var(--color-pokedex-red)' }}>
                    👑 {game.champion}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* RIVAL & VILLAIN TEAM */}
          <div
            className="pixel-border"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              padding: '20px',
              borderRadius: '8px',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', margin: '0 0 12px 0' }}>
              RIVALS & ANTAGONISTS
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <div style={{ backgroundColor: 'var(--color-bg-primary)', padding: '12px', borderRadius: '4px', border: '2px solid var(--color-border)' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '8px', color: '#666' }}>JOURNEY RIVAL:</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', margin: '4px 0' }}>{game.rival}</div>
              </div>
              <div style={{ backgroundColor: 'var(--color-bg-primary)', padding: '12px', borderRadius: '4px', border: '2px solid var(--color-border)' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '8px', color: '#666' }}>VILLAINOUS ORGANIZATION:</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', margin: '4px 0', color: 'var(--color-pokedex-red)' }}>
                  {game.villainTeam.name}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.3 }}>
                  <strong>Leader:</strong> {game.villainTeam.leader}
                  <br />
                  <strong>Goal:</strong> {game.villainTeam.goal}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (5 COLS): Editorial Ratings, Version Exclusives, Trivia & Map */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* EDITORIAL STATS (HP-BAR STYLE) */}
          <div
            className="pixel-border"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              padding: '20px',
              borderRadius: '8px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', margin: 0 }}>
                ARCHIVE STAT RATINGS
              </h3>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', opacity: 0.7 }}>
                Editorial Opinion
              </span>
            </div>
            <StatBar label="Story & Lore" value={game.stats.story} />
            <StatBar label="Graphics & Art" value={game.stats.graphics} />
            <StatBar label="Battle Difficulty" value={game.stats.difficulty} />
            <StatBar label="Replayability" value={game.stats.replayability} />
          </div>

          {/* REGION MAP PLACEHOLDER */}
          <div
            className="pixel-border"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              padding: '20px',
              borderRadius: '8px',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', margin: '0 0 10px 0' }}>
              REGION CARTOGRAPHY: {game.region.toUpperCase()}
            </h3>
            {/* Pixel-Art Canvas/SVG Map Placeholder */}
            <div
              style={{
                width: '100%',
                height: '140px',
                backgroundColor: '#78B880',
                border: '3px solid var(--color-border)',
                borderRadius: '6px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                boxShadow: 'inset 2px 2px 0px rgba(0,0,0,0.2)',
              }}
            >
              {/* Grid Lines */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'radial-gradient(rgba(0,0,0,0.15) 1px, transparent 1px)',
                  backgroundSize: '12px 12px',
                }}
              />
              {/* Geometric Pixel Islands/Routes */}
              <div style={{ position: 'absolute', width: '80px', height: '50px', backgroundColor: '#589860', left: '20%', top: '30%', borderRadius: '4px' }} />
              <div style={{ position: 'absolute', width: '60px', height: '40px', backgroundColor: '#589860', right: '25%', top: '40%', borderRadius: '4px' }} />
              <div style={{ position: 'absolute', width: '40px', height: '30px', backgroundColor: '#589860', right: '15%', top: '20%', borderRadius: '4px' }} />
              {/* Route connecting line */}
              <div style={{ position: 'absolute', width: '120px', height: '4px', backgroundColor: '#C8A870', top: '50%', left: '30%' }} />

              <div
                style={{
                  position: 'relative',
                  backgroundColor: 'rgba(0,0,0,0.75)',
                  color: '#FFF',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '9px',
                }}
              >
                📍 {game.region} Territory
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#666', margin: '8px 0 0 0' }}>
              Stylized cartographic depiction of the {game.region} wilderness and route settlements.
            </p>
          </div>

          {/* VERSION EXCLUSIVES */}
          {game.versionExclusives.length > 0 && (
            <div
              className="pixel-border"
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                padding: '20px',
                borderRadius: '8px',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', margin: '0 0 10px 0' }}>
                VERSION-EXCLUSIVE POKÉMON
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#666', margin: '0 0 10px 0' }}>
                Species only encounterable in {game.title} (requiring trades with companion versions):
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {game.versionExclusives.map((poke, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '7px',
                      padding: '4px 8px',
                      backgroundColor: 'var(--color-bg-primary)',
                      border: '2px solid var(--color-border)',
                      borderRadius: '4px',
                    }}
                  >
                    {poke}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* EXPANSION PASS DLC (IF APPLICABLE) */}
          {game.dlc && game.dlc.length > 0 && (
            <div
              className="pixel-border"
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                padding: '20px',
                borderRadius: '8px',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', margin: '0 0 10px 0' }}>
                EXPANSION PASS ADVENTURES
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {game.dlc.map((d, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: 'var(--color-bg-primary)',
                      padding: '8px 12px',
                      borderRadius: '4px',
                      border: '2px solid var(--color-border)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '8px' }}>{d.name}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#666' }}>{d.releaseDate}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HISTORICAL TRIVIA & FUN FACTS */}
          <div
            className="pixel-border"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              padding: '20px',
              borderRadius: '8px',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', margin: '0 0 12px 0' }}>
              DEVELOPMENT TRIVIA & FUN FACTS
            </h3>
            <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {game.trivia.map((t, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '16px',
                    lineHeight: 1.4,
                  }}
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
