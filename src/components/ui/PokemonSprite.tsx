import { useState } from 'react';
import { getSpriteUrl } from '../../utils/pokeapi';
import PokeballLoader from './PokeballLoader';

interface PokemonSpriteProps {
  dexNumber: number;
  name: string;
  size?: number;
  shiny?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function PokemonSprite({
  dexNumber,
  name,
  size = 96,
  shiny = false,
  className = '',
  style = {},
}: PokemonSpriteProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const url = getSpriteUrl(dexNumber, shiny);

  if (error) {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.1)',
          border: '2px solid var(--color-border)',
          borderRadius: '4px',
          fontFamily: 'var(--font-heading)',
          fontSize: '8px',
          color: 'var(--color-text-dark)',
          textAlign: 'center',
          padding: '4px',
          ...style,
        }}
        aria-label={`${name} sprite unavailable`}
      >
        ?
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: size, height: size, ...style }} className={className}>
      {loading && (
        <div style={{ position: 'absolute', inset: 0 }}>
          <PokeballLoader size={Math.min(size, 48)} />
        </div>
      )}
      <img
        src={url}
        alt={name}
        width={size}
        height={size}
        className="pixel-art"
        style={{
          imageRendering: 'pixelated',
          width: size,
          height: size,
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.2s',
          filter: shiny ? 'drop-shadow(0 0 6px gold)' : undefined,
        }}
        onLoad={() => setLoading(false)}
        onError={() => { setLoading(false); setError(true); }}
      />
    </div>
  );
}
