import { useSound } from '../../hooks/useSound';

interface PokeballButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export default function PokeballButton({
  label,
  onClick,
  variant = 'primary',
  disabled = false,
  type = 'button',
  fullWidth = false,
  style = {},
  className = '',
}: PokeballButtonProps) {
  const { play } = useSound();

  const colors = {
    primary: {
      bg: 'var(--color-pokedex-red)',
      text: '#FFFFFF',
      shadow: '#8B0000',
    },
    secondary: {
      bg: 'var(--color-deep-navy)',
      text: '#FFFFFF',
      shadow: '#0A0A1A',
    },
    danger: {
      bg: '#333333',
      text: '#FFFFFF',
      shadow: '#111111',
    },
  };

  const c = colors[variant];

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={() => {
        if (!disabled) {
          play('select');
          onClick?.();
        }
      }}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '10px 20px',
        fontFamily: 'var(--font-heading)',
        fontSize: '10px',
        color: c.text,
        backgroundColor: disabled ? '#888888' : c.bg,
        border: '3px solid rgba(0,0,0,0.4)',
        borderRadius: '6px',
        boxShadow: disabled
          ? '3px 3px 0px rgba(0,0,0,0.2)'
          : `4px 4px 0px ${c.shadow}`,
        cursor: disabled ? 'not-allowed' : 'pointer',
        width: fullWidth ? '100%' : undefined,
        textDecoration: 'none',
        transition: 'transform 0.05s, box-shadow 0.05s',
        lineHeight: 1.6,
        ...style,
      }}
      onMouseDown={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.transform = 'translate(2px, 2px)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = `2px 2px 0px ${c.shadow}`;
        }
      }}
      onMouseUp={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.transform = '';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = `4px 4px 0px ${c.shadow}`;
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = '';
        (e.currentTarget as HTMLButtonElement).style.boxShadow = disabled
          ? '3px 3px 0px rgba(0,0,0,0.2)'
          : `4px 4px 0px ${c.shadow}`;
      }}
    >
      {/* Mini Pokéball icon */}
      <svg width="14" height="14" viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="30" fill="#FFF" stroke="rgba(255,255,255,0.6)" strokeWidth="3"/>
        <path d="M2 32a30 30 0 0 1 60 0" fill={variant === 'primary' ? '#FF6666' : '#6699CC'}
          stroke="rgba(255,255,255,0.4)" strokeWidth="3"/>
        <rect x="2" y="29" width="60" height="6" fill="rgba(0,0,0,0.3)"/>
        <circle cx="32" cy="32" r="7" fill="#FFF" stroke="rgba(0,0,0,0.3)" strokeWidth="3"/>
      </svg>
      {label}
    </button>
  );
}
