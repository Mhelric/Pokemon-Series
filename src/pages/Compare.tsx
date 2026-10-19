import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import gamesData from '../data/games.json';
import type { Game } from '../data/types';
import PokemonSprite from '../components/ui/PokemonSprite';
import GenerationBadge from '../components/ui/GenerationBadge';
import StatBar from '../components/ui/StatBar';
import PokeballButton from '../components/ui/PokeballButton';
import { useSound } from '../hooks/useSound';

export default function Compare() {
  const { play } = useSound();
  const games = gamesData as Game[];

  const [gameId1, setGameId1] = useState<number>(games[0].id); // Red
  const [gameId2, setGameId2] = useState<number>(games[4].id); // Gold
  const [battleResult, setBattleResult] = useState<string | null>(null);

  const game1 = useMemo(() => games.find((g) => g.id === gameId1) || games[0], [games, gameId1]);
  const game2 = useMemo(() => games.find((g) => g.id === gameId2) || games[1], [games, gameId2]);

  // Calculate battle winner based on total stats
  const totalStats1 = game1.stats.story + game1.stats.graphics + game1.stats.difficulty + game1.stats.replayability;
  const totalStats2 = game2.stats.story + game2.stats.graphics + game2.stats.difficulty + game2.stats.replayability;

  const handleSimulateBattle = () => {
    play('encounter');
    if (totalStats1 > totalStats2) {
      setBattleResult(`${game1.title} emerges victorious with a higher overall editorial rating score (${totalStats1} vs ${totalStats2})!`);
    } else if (totalStats2 > totalStats1) {
      setBattleResult(`${game2.title} wins the duel with exceptional story and replayability power (${totalStats2} vs ${totalStats1})!`);
    } else {
      setBattleResult(`It's an honorable tie between two masterpieces! Both scored ${totalStats1} total rating points!`);
    }
  };

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
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', margin: 0, color: 'var(--color-pokedex-red)' }}>
          VERSUS ARCHIVE: HEAD-TO-HEAD COMPARISON
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', margin: '4px 0 0 0', opacity: 0.8 }}>
          Select any two mainline releases and benchmark features, platforms, starters, and ratings side-by-side
        </p>
      </div>

      {/* SELECTORS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div
          className="pixel-border"
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            padding: '16px',
            borderRadius: '8px',
          }}
        >
          <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '8px', marginBottom: '8px' }}>
            SELECT FIGHTER 1:
          </label>
          <select
            value={gameId1}
            onChange={(e) => { play('blip'); setGameId1(Number(e.target.value)); setBattleResult(null); }}
            style={{
              width: '100%',
              padding: '10px',
              fontFamily: 'var(--font-body)',
              fontSize: '18px',
              backgroundColor: 'var(--color-bg-primary)',
              color: 'var(--color-text-dark)',
              border: '2px solid var(--color-border)',
              borderRadius: '4px',
            }}
          >
            {games.map((g) => (
              <option key={g.id} value={g.id}>{g.title} ({g.region} - Gen {g.generation})</option>
            ))}
          </select>
        </div>

        <div
          className="pixel-border"
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            padding: '16px',
            borderRadius: '8px',
          }}
        >
          <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '8px', marginBottom: '8px' }}>
            SELECT FIGHTER 2:
          </label>
          <select
            value={gameId2}
            onChange={(e) => { play('blip'); setGameId2(Number(e.target.value)); setBattleResult(null); }}
            style={{
              width: '100%',
              padding: '10px',
              fontFamily: 'var(--font-body)',
              fontSize: '18px',
              backgroundColor: 'var(--color-bg-primary)',
              color: 'var(--color-text-dark)',
              border: '2px solid var(--color-border)',
              borderRadius: '4px',
            }}
          >
            {games.map((g) => (
              <option key={g.id} value={g.id}>{g.title} ({g.region} - Gen {g.generation})</option>
            ))}
          </select>
        </div>
      </div>

      {/* COMPARISON BENCHMARK CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* GAME 1 */}
        <div
          className="pixel-border"
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div style={{ backgroundColor: game1.themeColor, color: '#FFF', padding: '16px 20px' }}>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '4px' }}>
              <GenerationBadge gen={game1.generation} />
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '8px', opacity: 0.9 }}>{game1.platform}</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', margin: 0 }}>
              {game1.title}
            </h2>
          </div>

          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Mascot & Starters */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              {game1.mascotPokemon[0] && (
                <div style={{ textAlign: 'center' }}>
                  <PokemonSprite dexNumber={game1.mascotPokemon[0].dexNumber} name={game1.mascotPokemon[0].name} size={80} />
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '7px' }}>{game1.mascotPokemon[0].name}</span>
                </div>
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '8px', color: '#666', marginBottom: '4px' }}>
                  STARTERS:
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {game1.starters.map((s) => (
                    <div key={s.dexNumber} style={{ textAlign: 'center' }}>
                      <PokemonSprite dexNumber={s.dexNumber} name={s.name} size={45} />
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: '6px' }}>{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Spec lines */}
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.6, borderTop: '2px solid var(--color-border)', paddingTop: '12px' }}>
              <div><strong>Region:</strong> {game1.region}</div>
              <div><strong>Release Year:</strong> {game1.releaseDates.jp.slice(0, 4)}</div>
              <div><strong>Champion:</strong> {game1.champion || 'None'}</div>
              <div><strong>Villain:</strong> {game1.villainTeam.name}</div>
            </div>

            {/* Ratings */}
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '8px', marginBottom: '6px' }}>RATINGS:</div>
              <StatBar label="Story" value={game1.stats.story} />
              <StatBar label="Graphics" value={game1.stats.graphics} />
              <StatBar label="Difficulty" value={game1.stats.difficulty} />
              <StatBar label="Replayability" value={game1.stats.replayability} />
            </div>

            {/* Features list */}
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '8px', marginBottom: '6px' }}>CORE FEATURES:</div>
              <ul style={{ margin: 0, paddingLeft: '16px', fontFamily: 'var(--font-body)', fontSize: '15px' }}>
                {game1.features.slice(0, 3).map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* GAME 2 */}
        <div
          className="pixel-border"
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div style={{ backgroundColor: game2.themeColor, color: '#FFF', padding: '16px 20px' }}>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '4px' }}>
              <GenerationBadge gen={game2.generation} />
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '8px', opacity: 0.9 }}>{game2.platform}</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', margin: 0 }}>
              {game2.title}
            </h2>
          </div>

          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Mascot & Starters */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              {game2.mascotPokemon[0] && (
                <div style={{ textAlign: 'center' }}>
                  <PokemonSprite dexNumber={game2.mascotPokemon[0].dexNumber} name={game2.mascotPokemon[0].name} size={80} />
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '7px' }}>{game2.mascotPokemon[0].name}</span>
                </div>
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '8px', color: '#666', marginBottom: '4px' }}>
                  STARTERS:
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {game2.starters.map((s) => (
                    <div key={s.dexNumber} style={{ textAlign: 'center' }}>
                      <PokemonSprite dexNumber={s.dexNumber} name={s.name} size={45} />
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: '6px' }}>{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Spec lines */}
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.6, borderTop: '2px solid var(--color-border)', paddingTop: '12px' }}>
              <div><strong>Region:</strong> {game2.region}</div>
              <div><strong>Release Year:</strong> {game2.releaseDates.jp.slice(0, 4)}</div>
              <div><strong>Champion:</strong> {game2.champion || 'None'}</div>
              <div><strong>Villain:</strong> {game2.villainTeam.name}</div>
            </div>

            {/* Ratings */}
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '8px', marginBottom: '6px' }}>RATINGS:</div>
              <StatBar label="Story" value={game2.stats.story} />
              <StatBar label="Graphics" value={game2.stats.graphics} />
              <StatBar label="Difficulty" value={game2.stats.difficulty} />
              <StatBar label="Replayability" value={game2.stats.replayability} />
            </div>

            {/* Features list */}
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '8px', marginBottom: '6px' }}>CORE FEATURES:</div>
              <ul style={{ margin: 0, paddingLeft: '16px', fontFamily: 'var(--font-body)', fontSize: '15px' }}>
                {game2.features.slice(0, 3).map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* BATTLE SIMULATOR BUTTON & VERDICT */}
      <div
        className="pixel-border"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          padding: '24px',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <PokeballButton
            label="⚔️ RUN HP-BAR SIMULATION BATTLE"
            onClick={handleSimulateBattle}
            variant="primary"
          />
        </div>

        {battleResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              backgroundColor: 'var(--color-bg-primary)',
              border: '3px solid var(--color-pokedex-red)',
              borderRadius: '6px',
              padding: '16px 20px',
              display: 'inline-block',
              maxWidth: '650px',
            }}
          >
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', color: 'var(--color-pokedex-red)', marginBottom: '8px' }}>
              JUDGES' VERDICT:
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', margin: 0, lineHeight: 1.4 }}>
              {battleResult}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
