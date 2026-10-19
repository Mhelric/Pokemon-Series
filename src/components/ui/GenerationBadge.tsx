import { GENERATION_NAMES } from '../../data/types';

interface GenerationBadgeProps {
  gen: number;
  style?: React.CSSProperties;
}

const GEN_COLORS: Record<number, string> = {
  1: '#FF1111',
  2: '#DAA520',
  3: '#00A040',
  4: '#5A7FBF',
  5: '#444444',
  6: '#025DA6',
  7: '#F5A623',
  8: '#00BFFF',
  9: '#F04030',
};

export default function GenerationBadge({ gen, style = {} }: GenerationBadgeProps) {
  const color = GEN_COLORS[gen] ?? '#888888';
  const label = GENERATION_NAMES[gen] ?? String(gen);

  return (
    <span
      aria-label={`Generation ${label}`}
      style={{
        display: 'inline-block',
        backgroundColor: color,
        color: '#FFFFFF',
        fontFamily: 'var(--font-heading)',
        fontSize: '8px',
        padding: '3px 8px',
        borderRadius: '4px',
        border: '2px solid rgba(0,0,0,0.3)',
        boxShadow: '2px 2px 0px rgba(0,0,0,0.2)',
        textShadow: '1px 1px 0px rgba(0,0,0,0.4)',
        ...style,
      }}
    >
      GEN {label}
    </span>
  );
}
