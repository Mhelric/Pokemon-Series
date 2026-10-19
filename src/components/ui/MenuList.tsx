import { useEffect, useRef } from 'react';
import { useSound } from '../../hooks/useSound';

interface MenuItem {
  label: string;
  icon?: string;
  disabled?: boolean;
}

interface MenuListProps {
  items: MenuItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onActiveChange?: (index: number) => void;
  style?: React.CSSProperties;
  className?: string;
}

export default function MenuList({
  items,
  activeIndex,
  onSelect,
  onActiveChange,
  style = {},
  className = '',
}: MenuListProps) {
  const { play } = useSound();
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement) &&
          document.activeElement !== containerRef.current) return;

      if (e.key === 'ArrowDown' || e.key === 's') {
        e.preventDefault();
        const next = (activeIndex + 1) % items.length;
        play('blip');
        onActiveChange?.(next);
      } else if (e.key === 'ArrowUp' || e.key === 'w') {
        e.preventDefault();
        const prev = (activeIndex - 1 + items.length) % items.length;
        play('blip');
        onActiveChange?.(prev);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!items[activeIndex]?.disabled) {
          play('select');
          onSelect(activeIndex);
        }
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, items, onSelect, onActiveChange, play]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="menu"
      aria-label="Menu"
      className={className}
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        border: '4px solid var(--color-border)',
        borderRadius: '8px',
        boxShadow: '6px 6px 0px rgba(0,0,0,0.25)',
        padding: '8px 0',
        outline: 'none',
        ...style,
      }}
    >
      {items.map((item, i) => (
        <button
          key={i}
          role="menuitem"
          disabled={item.disabled}
          onClick={() => {
            if (!item.disabled) {
              play('select');
              onSelect(i);
              onActiveChange?.(i);
            }
          }}
          onMouseEnter={() => {
            if (!item.disabled) {
              play('blip');
              onActiveChange?.(i);
            }
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            width: '100%',
            padding: '10px 20px',
            background: 'none',
            border: 'none',
            cursor: item.disabled ? 'not-allowed' : 'pointer',
            fontFamily: 'var(--font-heading)',
            fontSize: '11px',
            color: item.disabled
              ? 'rgba(128,128,128,0.5)'
              : i === activeIndex
              ? 'var(--color-text-dark)'
              : 'var(--color-text-dark)',
            backgroundColor: i === activeIndex ? 'rgba(0,0,0,0.06)' : 'transparent',
            textAlign: 'left',
            lineHeight: 1.8,
            transition: 'background-color 0.1s',
          }}
          aria-current={i === activeIndex ? true : undefined}
        >
          {/* Cursor */}
          <span
            aria-hidden="true"
            style={{
              width: '14px',
              color: 'var(--color-pokedex-red)',
              fontFamily: 'var(--font-heading)',
              fontSize: '11px',
              visibility: i === activeIndex ? 'visible' : 'hidden',
              animation: i === activeIndex ? 'blink 1s step-end infinite' : 'none',
            }}
          >
            ▶
          </span>
          {item.icon && <span aria-hidden="true">{item.icon}</span>}
          {item.label}
        </button>
      ))}
    </div>
  );
}
