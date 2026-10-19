import type { PokemonType } from '../../data/types';
import { TYPE_COLORS } from '../../data/types';

interface TypeBadgeProps {
  type: PokemonType | string;
  size?: 'sm' | 'md' | 'lg';
}

export default function TypeBadge({ type, size = 'md' }: TypeBadgeProps) {
  const color = TYPE_COLORS[type as PokemonType] ?? '#A8A8A8';

  const fontSizes: Record<string, string> = {
    sm: '7px',
    md: '9px',
    lg: '11px',
  };
  const paddings: Record<string, string> = {
    sm: '2px 6px',
    md: '3px 8px',
    lg: '5px 12px',
  };

  // Determine text color (dark or light) based on bg luminance
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  const textColor = luminance > 0.55 ? '#1B1B1B' : '#FFFFFF';

  return (
    <span
      role="img"
      aria-label={`${type} type`}
      style={{
        display: 'inline-block',
        backgroundColor: color,
        color: textColor,
        fontFamily: 'var(--font-heading)',
        fontSize: fontSizes[size],
        padding: paddings[size],
        borderRadius: '4px',
        border: '2px solid rgba(0,0,0,0.25)',
        boxShadow: '2px 2px 0px rgba(0,0,0,0.2)',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        userSelect: 'none',
      }}
    >
      {type}
    </span>
  );
}
