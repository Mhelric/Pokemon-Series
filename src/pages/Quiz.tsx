import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import questionsData from '../data/quiz-questions.json';
import gamesData from '../data/games.json';
import type { Game } from '../data/types';
import DialogueBox from '../components/ui/DialogueBox';
import PokemonSprite from '../components/ui/PokemonSprite';
import PokeballButton from '../components/ui/PokeballButton';
import { useSound } from '../hooks/useSound';

interface Option {
  text: string;
  scores: Record<string, number>;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
}

export default function Quiz() {
  const { play } = useSound();
  const questions = questionsData as unknown as Question[];
  const games = gamesData as Game[];

  const [currentStep, setCurrentStep] = useState(0);
  const [tally, setTally] = useState<Record<string, number>>({});
  const [recommendedGame, setRecommendedGame] = useState<Game | null>(null);

  const question = questions[currentStep];

  const handleSelectOption = (opt: Option) => {
    play('select');
    const newTally = { ...tally };
    Object.entries(opt.scores).forEach(([slug, pts]) => {
      newTally[slug] = (newTally[slug] || 0) + pts;
    });
    setTally(newTally);

    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Finish quiz - determine highest scoring game
      let bestSlug = 'pokemon-heartgold';
      let maxScore = -1;
      Object.entries(newTally).forEach(([slug, pts]) => {
        if (pts > maxScore) {
          maxScore = pts;
          bestSlug = slug;
        }
      });
      const match = games.find((g) => g.slug === bestSlug) || games[0];
      setRecommendedGame(match);
      play('encounter');
    }
  };

  const handleRestart = () => {
    play('blip');
    setCurrentStep(0);
    setTally({});
    setRecommendedGame(null);
  };

  return (
    <div
      style={{
        maxWidth: '800px',
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
          POKÉMON ADVENTURE MATCHMAKER
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', margin: '4px 0 0 0', opacity: 0.8 }}>
          Which mainline Pokémon journey is truly made for your soul?
        </p>
      </div>

      {!recommendedGame ? (
        /* QUIZ IN PROGRESS: DIALOGUE BOX STYLE */
        <div>
          {/* Progress Indicator */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontFamily: 'var(--font-heading)', fontSize: '8px' }}>
            <span>QUESTION {currentStep + 1} OF {questions.length}</span>
            <span>{Math.round(((currentStep + 1) / questions.length) * 100)}% COMPLETE</span>
          </div>

          <div
            style={{
              height: '8px',
              backgroundColor: 'rgba(0,0,0,0.1)',
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: '20px',
              border: '1px solid var(--color-border)',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${((currentStep + 1) / questions.length) * 100}%`,
                backgroundColor: 'var(--color-pokedex-red)',
                transition: 'width 0.3s ease',
              }}
            />
          </div>

          {/* Dialogue Box Question Prompt */}
          <div style={{ marginBottom: '24px' }}>
            <DialogueBox text={question.question} speed={20} showArrow={false} />
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {question.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelectOption(opt)}
                style={{
                  padding: '14px 18px',
                  backgroundColor: 'var(--color-bg-secondary)',
                  border: '3px solid var(--color-border)',
                  borderRadius: '6px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: '3px 3px 0px rgba(0,0,0,0.2)',
                  transition: 'transform 0.05s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translate(-2px, -2px)';
                  play('blip');
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = '';
                }}
              >
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', color: 'var(--color-pokedex-red)' }}>
                  ▶
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: 'var(--color-text-dark)', lineHeight: 1.4 }}>
                  {opt.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* QUIZ RESULT: STYLED TRAINER CARD */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="pixel-border-lg"
          style={{
            backgroundColor: '#F5E4C3', // Classic Trainer Card Parchment
            border: '5px solid #4A3000',
            borderRadius: '12px',
            padding: '28px 24px',
            boxShadow: '8px 8px 0px rgba(0,0,0,0.4)',
            color: '#3B2300',
          }}
        >
          {/* Card Title Banner */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '3px dashed #8C5E1E',
              paddingBottom: '12px',
              marginBottom: '20px',
            }}
          >
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '12px', letterSpacing: '1px' }}>
              OFFICIAL TRAINER PASSPORT
            </span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '9px', opacity: 0.8 }}>
              ID No. 96225
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
            {/* Mascot portrait */}
            <div
              className="md:col-span-4 flex flex-col items-center justify-center"
              style={{
                backgroundColor: '#FFF',
                border: '3px solid #8C5E1E',
                borderRadius: '8px',
                padding: '16px',
              }}
            >
              {recommendedGame.mascotPokemon[0] && (
                <PokemonSprite
                  dexNumber={recommendedGame.mascotPokemon[0].dexNumber}
                  name={recommendedGame.mascotPokemon[0].name}
                  size={110}
                />
              )}
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '8px', marginTop: '6px' }}>
                MATCHED PARTNER
              </div>
            </div>

            {/* Match info */}
            <div className="md:col-span-8">
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '8px', color: '#8C5E1E' }}>
                YOUR PERFECT MATCH DESTINATION //
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '20px',
                  color: recommendedGame.themeColor,
                  margin: '4px 0 10px 0',
                }}
              >
                {recommendedGame.title}
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', lineHeight: 1.5, margin: 0 }}>
                {recommendedGame.overview}
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', borderTop: '3px dashed #8C5E1E', paddingTop: '20px' }}>
            <Link to={`/games/${recommendedGame.slug}`} style={{ textDecoration: 'none' }}>
              <PokeballButton label={`EXPLORE ${recommendedGame.title.toUpperCase()}`} variant="primary" />
            </Link>
            <PokeballButton label="RETAKE QUIZ" onClick={handleRestart} variant="secondary" />
          </div>
        </motion.div>
      )}
    </div>
  );
}
