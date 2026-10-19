import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import gamesData from '../data/games.json';
import type { Game } from '../data/types';
import GameCard from '../components/ui/GameCard';
import GenerationBadge from '../components/ui/GenerationBadge';
import PokemonSprite from '../components/ui/PokemonSprite';
import PokeballButton from '../components/ui/PokeballButton';
import { useSound } from '../hooks/useSound';

export default function GamesBrowser() {
  const { play } = useSound();
  const games = gamesData as Game[];

  // Filters & State
  const [search, setSearch] = useState('');
  const [selectedGen, setSelectedGen] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'id-asc' | 'id-desc' | 'year-asc' | 'year-desc' | 'title'>('id-asc');
  const [viewMode, setViewMode] = useState<'pokedex' | 'grid'>('pokedex');
  const [activeGameId, setActiveGameId] = useState<number>(games[0]?.id || 1);

  // Extract unique regions & platforms
  const regions = useMemo(() => Array.from(new Set(games.map((g) => g.region))), [games]);
  const platforms = useMemo(() => Array.from(new Set(games.map((g) => g.platform))), [games]);

  // Filtered & sorted games
  const filteredGames = useMemo(() => {
    return games
      .filter((g) => {
        const matchesSearch =
          g.title.toLowerCase().includes(search.toLowerCase()) ||
          g.region.toLowerCase().includes(search.toLowerCase()) ||
          g.platform.toLowerCase().includes(search.toLowerCase()) ||
          g.mascotPokemon.some((m) => m.name.toLowerCase().includes(search.toLowerCase()));

        const matchesGen = selectedGen === 'all' || g.generation.toString() === selectedGen;
        const matchesRegion = selectedRegion === 'all' || g.region === selectedRegion;
        const matchesPlatform = selectedPlatform === 'all' || g.platform === selectedPlatform;

        return matchesSearch && matchesGen && matchesRegion && matchesPlatform;
      })
      .sort((a, b) => {
        if (sortBy === 'id-asc') return a.id - b.id;
        if (sortBy === 'id-desc') return b.id - a.id;
        if (sortBy === 'year-asc') return (a.releaseDates.jp || '').localeCompare(b.releaseDates.jp || '');
        if (sortBy === 'year-desc') return (b.releaseDates.jp || '').localeCompare(a.releaseDates.jp || '');
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [games, search, selectedGen, selectedRegion, selectedPlatform, sortBy]);

  // Active game in preview
  const activeGame = useMemo(() => {
    return games.find((g) => g.id === activeGameId) || filteredGames[0] || games[0];
  }, [games, activeGameId, filteredGames]);

  return (
    <div
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '24px 16px',
      }}
    >
      {/* Top Banner / Pokédex Header */}
      <div
        className="pixel-border"
        style={{
          backgroundColor: 'var(--color-pokedex-red)',
          color: '#FFF',
          padding: '16px 20px',
          borderRadius: '8px',
          marginBottom: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Blue Sensor Lens Light */}
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#4FD5D6',
              border: '4px solid #FFFFFF',
              boxShadow: '0 0 12px #4FD5D6, inset 2px 2px 4px #FFFFFF',
            }}
          />
          {/* 3 mini LED indicator lights */}
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FF1111', border: '1px solid #1B1B1B' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FFD733', border: '1px solid #1B1B1B' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#00A040', border: '1px solid #1B1B1B' }} />
          </div>
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '14px',
                margin: 0,
                color: 'var(--color-pikachu-yellow)',
                letterSpacing: '1px',
              }}
            >
              MAIN SERIES ARCHIVE
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', margin: 0, opacity: 0.9 }}>
              Cataloging {games.length} mainline titles across 9 generations
            </p>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => { play('select'); setViewMode('pokedex'); }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '8px',
              padding: '6px 12px',
              backgroundColor: viewMode === 'pokedex' ? 'var(--color-deep-navy)' : 'rgba(0,0,0,0.25)',
              color: '#FFF',
              border: '2px solid #1B1B1B',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            📟 POKÉDEX VIEW
          </button>
          <button
            onClick={() => { play('select'); setViewMode('grid'); }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '8px',
              padding: '6px 12px',
              backgroundColor: viewMode === 'grid' ? 'var(--color-deep-navy)' : 'rgba(0,0,0,0.25)',
              color: '#FFF',
              border: '2px solid #1B1B1B',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            ▦ GRID VIEW
          </button>
        </div>
      </div>

      {/* Control / Filter Bar */}
      <div
        className="pixel-border"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          alignItems: 'center',
        }}
      >
        {/* Search */}
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '8px', marginBottom: '4px' }}>
            SEARCH GAMES
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, mascot, region..."
            style={{
              width: '100%',
              padding: '8px 12px',
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              backgroundColor: 'var(--color-bg-primary)',
              color: 'var(--color-text-dark)',
              border: '2px solid var(--color-border)',
              borderRadius: '4px',
            }}
          />
        </div>

        {/* Generation Filter */}
        <div style={{ flex: '0 1 120px' }}>
          <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '8px', marginBottom: '4px' }}>
            GENERATION
          </label>
          <select
            value={selectedGen}
            onChange={(e) => { play('blip'); setSelectedGen(e.target.value); }}
            style={{
              width: '100%',
              padding: '8px',
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              backgroundColor: 'var(--color-bg-primary)',
              color: 'var(--color-text-dark)',
              border: '2px solid var(--color-border)',
              borderRadius: '4px',
            }}
          >
            <option value="all">All Gens</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((gen) => (
              <option key={gen} value={gen.toString()}>Gen {gen}</option>
            ))}
          </select>
        </div>

        {/* Region Filter */}
        <div style={{ flex: '0 1 130px' }}>
          <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '8px', marginBottom: '4px' }}>
            REGION
          </label>
          <select
            value={selectedRegion}
            onChange={(e) => { play('blip'); setSelectedRegion(e.target.value); }}
            style={{
              width: '100%',
              padding: '8px',
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              backgroundColor: 'var(--color-bg-primary)',
              color: 'var(--color-text-dark)',
              border: '2px solid var(--color-border)',
              borderRadius: '4px',
            }}
          >
            <option value="all">All Regions</option>
            {regions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Platform Filter */}
        <div style={{ flex: '0 1 160px' }}>
          <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '8px', marginBottom: '4px' }}>
            CONSOLE
          </label>
          <select
            value={selectedPlatform}
            onChange={(e) => { play('blip'); setSelectedPlatform(e.target.value); }}
            style={{
              width: '100%',
              padding: '8px',
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              backgroundColor: 'var(--color-bg-primary)',
              color: 'var(--color-text-dark)',
              border: '2px solid var(--color-border)',
              borderRadius: '4px',
            }}
          >
            <option value="all">All Consoles</option>
            {platforms.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div style={{ flex: '0 1 150px' }}>
          <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '8px', marginBottom: '4px' }}>
            SORT BY
          </label>
          <select
            value={sortBy}
            onChange={(e) => { play('blip'); setSortBy(e.target.value as any); }}
            style={{
              width: '100%',
              padding: '8px',
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              backgroundColor: 'var(--color-bg-primary)',
              color: 'var(--color-text-dark)',
              border: '2px solid var(--color-border)',
              borderRadius: '4px',
            }}
          >
            <option value="id-asc">Release Order</option>
            <option value="id-desc">Latest First</option>
            <option value="year-asc">Year (Oldest)</option>
            <option value="year-desc">Year (Newest)</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>
      </div>

      {/* ================= POKÉDEX DUAL-PANEL VIEW ================= */}
      {viewMode === 'pokedex' ? (
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
          style={{
            backgroundColor: 'var(--color-pokedex-red)',
            padding: '24px',
            borderRadius: '12px',
            border: '5px solid #1B1B1B',
            boxShadow: '8px 8px 0px rgba(0,0,0,0.4)',
          }}
        >
          {/* LEFT PANEL: Scrollable Game List */}
          <div
            className="lg:col-span-5 flex flex-col"
            style={{
              backgroundColor: '#2C2C34',
              borderRadius: '8px',
              padding: '16px',
              border: '4px solid #1B1B1B',
              height: '620px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '9px',
                color: '#4FD5D6',
                marginBottom: '12px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>REGISTERED ENTRIES</span>
              <span>{filteredGames.length} GAMES</span>
            </div>

            {/* List */}
            <div
              style={{
                overflowY: 'auto',
                flex: 1,
                paddingRight: '6px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              {filteredGames.map((game) => {
                const isActive = activeGame.id === game.id;
                return (
                  <button
                    key={game.id}
                    onClick={() => { play('blip'); setActiveGameId(game.id); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      backgroundColor: isActive ? game.themeColor : '#1E1E24',
                      color: isActive ? '#FFFFFF' : '#D0D0D0',
                      border: isActive ? '3px solid #FFFFFF' : '2px solid #3A3A44',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.1s',
                      boxShadow: isActive ? '3px 3px 0px rgba(0,0,0,0.5)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '8px',
                          color: isActive ? '#FFFFFF' : '#888',
                          width: '24px',
                        }}
                      >
                        №{String(game.id).padStart(2, '0')}
                      </span>
                      <div>
                        <div
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '9px',
                            lineHeight: 1.4,
                            textShadow: isActive ? '1px 1px 0px rgba(0,0,0,0.6)' : 'none',
                          }}
                        >
                          {game.title}
                        </div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', opacity: 0.8 }}>
                          {game.region} • {game.releaseDates.jp.slice(0, 4)}
                        </div>
                      </div>
                    </div>
                    {isActive && (
                      <span className="blink" style={{ fontFamily: 'var(--font-heading)', fontSize: '10px' }}>
                        ▶
                      </span>
                    )}
                  </button>
                );
              })}

              {filteredGames.length === 0 && (
                <div style={{ padding: '32px', textAlign: 'center', color: '#888' }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontSize: '10px' }}>NO GAMES FOUND</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px' }}>Try relaxing your search filters</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL: Pokédex Detail Screen */}
          <div
            className="lg:col-span-7 flex flex-col"
            style={{
              backgroundColor: '#52A36B',
              borderRadius: '8px',
              padding: '20px',
              border: '4px solid #1B1B1B',
              boxShadow: 'inset 4px 4px 0px rgba(0,0,0,0.3)',
              height: '620px',
              color: '#0A2612',
              position: 'relative',
              overflowY: 'auto',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGame.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
              >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '8px', color: '#1B4725' }}>
                      №{String(activeGame.id).padStart(2, '0')} // GENERATION {activeGame.generation}
                    </span>
                    <h2
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '16px',
                        margin: '4px 0',
                        color: '#0A2612',
                        lineHeight: 1.4,
                      }}
                    >
                      {activeGame.title}
                    </h2>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      <GenerationBadge gen={activeGame.generation} />
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '8px',
                          padding: '3px 8px',
                          backgroundColor: '#1E462A',
                          color: '#FFF',
                          borderRadius: '4px',
                        }}
                      >
                        {activeGame.platform}
                      </span>
                      {activeGame.isUpcoming && (
                        <span
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '8px',
                            padding: '3px 8px',
                            backgroundColor: '#E65100',
                            color: '#FFF',
                            borderRadius: '4px',
                          }}
                        >
                          UPCOMING
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Mascot Sprite Box */}
                  {activeGame.mascotPokemon[0] && (
                    <div
                      style={{
                        backgroundColor: '#86C59A',
                        border: '3px solid #1E462A',
                        borderRadius: '6px',
                        padding: '6px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <PokemonSprite
                        dexNumber={activeGame.mascotPokemon[0].dexNumber}
                        name={activeGame.mascotPokemon[0].name}
                        size={80}
                      />
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: '7px', marginTop: '4px' }}>
                        {activeGame.mascotPokemon[0].name}
                      </span>
                    </div>
                  )}
                </div>

                {/* Professor Oak Intro Box */}
                <div
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    padding: '12px 14px',
                    borderRadius: '6px',
                    border: '2px solid #1E462A',
                    marginBottom: '16px',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '8px', color: '#1E462A', marginBottom: '4px' }}>
                    PROFESSOR'S NOTES:
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', margin: 0, lineHeight: 1.4 }}>
                    {activeGame.overview}
                  </p>
                </div>

                {/* Quick Specs Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '10px',
                    marginBottom: '16px',
                  }}
                >
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.5)', padding: '8px 12px', borderRadius: '4px' }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '7px', opacity: 0.8 }}>REGION</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '18px', fontWeight: 'bold' }}>{activeGame.region}</div>
                  </div>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.5)', padding: '8px 12px', borderRadius: '4px' }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '7px', opacity: 0.8 }}>RELEASE DATE</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '18px', fontWeight: 'bold' }}>
                      {activeGame.releaseDates.na !== 'N/A' ? activeGame.releaseDates.na : activeGame.releaseDates.jp}
                    </div>
                  </div>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.5)', padding: '8px 12px', borderRadius: '4px' }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '7px', opacity: 0.8 }}>DEVELOPER</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '18px', fontWeight: 'bold' }}>{activeGame.developer}</div>
                  </div>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.5)', padding: '8px 12px', borderRadius: '4px' }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '7px', opacity: 0.8 }}>CHAMPION</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '18px', fontWeight: 'bold' }}>{activeGame.champion || 'None'}</div>
                  </div>
                </div>

                {/* Starters Trio */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '8px', color: '#1E462A', marginBottom: '8px' }}>
                    CHOOSE YOUR PARTNER:
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {activeGame.starters.map((s) => (
                      <div
                        key={s.dexNumber}
                        style={{
                          flex: 1,
                          backgroundColor: '#86C59A',
                          border: '2px solid #1E462A',
                          borderRadius: '6px',
                          padding: '6px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <PokemonSprite dexNumber={s.dexNumber} name={s.name} size={56} />
                        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '7px', marginTop: '2px' }}>
                          {s.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action: Open Full Archive Dossier */}
                <div style={{ marginTop: 'auto', paddingTop: '12px' }}>
                  <Link to={`/games/${activeGame.slug}`} style={{ textDecoration: 'none' }}>
                    <PokeballButton
                      label="OPEN FULL ARCHIVE DOSSIER ▶"
                      fullWidth
                      variant="primary"
                    />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      ) : (
        /* ================= GRID VIEW ================= */
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '20px',
          }}
        >
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} view="grid" />
          ))}
        </div>
      )}
    </div>
  );
}
