import { Link } from 'react-router-dom';
import type { Game } from '../../data/types';
import GenerationBadge from './GenerationBadge';
import { useCollectionStore } from '../../stores/useCollectionStore';
import { useSound } from '../../hooks/useSound';

interface GameCardProps {
  game: Game;
  view?: 'grid' | 'list';
}

export default function GameCard({ game, view = 'grid' }: GameCardProps) {
  const { play } = useSound();
  const isFavorite = useCollectionStore((s) => s.isFavorite(game.slug));
  const toggleFavorite = useCollectionStore((s) => s.toggleFavorite);

  const isGrid = view === 'grid';

  return (
    <div
      style={{
        display: isGrid ? 'flex' : 'flex',
        flexDirection: isGrid ? 'column' : 'row',
        alignItems: isGrid ? 'stretch' : 'center',
        backgroundColor: 'var(--color-bg-secondary)',
        border: '3px solid var(--color-border)',
        borderRadius: '8px',
        boxShadow: '4px 4px 0px rgba(0,0,0,0.2)',
        overflow: 'hidden',
        transition: 'transform 0.1s, box-shadow 0.1s',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translate(-2px, -2px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '6px 6px 0px rgba(0,0,0,0.2)';
        play('blip');
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = '';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '4px 4px 0px rgba(0,0,0,0.2)';
      }}
    >
      {/* Cover Art Placeholder */}
      <Link
        to={`/games/${game.slug}`}
        onClick={() => play('select')}
        style={{ textDecoration: 'none', display: 'block', flexShrink: 0 }}
        aria-label={`View ${game.title}`}
      >
        <div
          style={{
            width: isGrid ? '100%' : '100px',
            height: isGrid ? '140px' : '80px',
            backgroundColor: game.themeColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Stylized placeholder with game color and title */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(135deg, ${game.themeColor} 0%, rgba(0,0,0,0.4) 100%)`,
            }}
          />
          {/* Pokéball watermark */}
          <svg
            width={isGrid ? '80' : '50'}
            height={isGrid ? '80' : '50'}
            viewBox="0 0 64 64"
            style={{ opacity: 0.15, position: 'relative' }}
            aria-hidden="true"
          >
            <circle cx="32" cy="32" r="30" fill="#FFF" />
            <path d="M2 32a30 30 0 0 1 60 0" fill="#000" />
            <rect x="2" y="29" width="60" height="6" fill="#000" />
            <circle cx="32" cy="32" r="8" fill="#FFF" />
          </svg>
          <span
            style={{
              position: 'absolute',
              fontFamily: 'var(--font-heading)',
              fontSize: isGrid ? '8px' : '7px',
              color: '#FFFFFF',
              textShadow: '1px 1px 0px rgba(0,0,0,0.8)',
              textAlign: 'center',
              padding: '4px',
              lineHeight: 1.8,
            }}
          >
            {game.title.replace('Pokémon ', '')}
          </span>
        </div>
      </Link>

      {/* Info */}
      <div style={{ padding: isGrid ? '10px' : '8px 12px', flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '4px' }}>
          <Link
            to={`/games/${game.slug}`}
            onClick={() => play('select')}
            style={{ textDecoration: 'none' }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: isGrid ? '8px' : '9px',
                color: 'var(--color-text-dark)',
                margin: '0 0 6px 0',
                lineHeight: 1.8,
              }}
            >
              {game.title}
            </h3>
          </Link>

          {/* Favorite star */}
          <button
            onClick={(e) => {
              e.preventDefault();
              play('select');
              toggleFavorite(game.slug);
            }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              padding: '0',
              flexShrink: 0,
              lineHeight: 1,
            }}
          >
            {isFavorite ? '★' : '☆'}
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '6px' }}>
          <GenerationBadge gen={game.generation} />
        </div>

        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'rgba(128,128,128,0.9)',
            lineHeight: 1.4,
          }}
        >
          <div>{game.region} • {game.platform}</div>
          <div>{game.releaseDates.na !== 'N/A' ? `NA: ${game.releaseDates.na}` : `JP: ${game.releaseDates.jp}`}</div>
        </div>
      </div>
    </div>
  );
}
