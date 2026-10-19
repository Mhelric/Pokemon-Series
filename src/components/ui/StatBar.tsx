import { useEffect, useRef, useState } from 'react';

interface StatBarProps {
  value: number;       // 0–10
  label: string;
  maxValue?: number;
  animated?: boolean;
  showNumber?: boolean;
}

function getBarColor(pct: number): string {
  if (pct > 0.5) return '#44CC44';   // green
  if (pct > 0.25) return '#FFCC00';  // yellow
  return '#CC2222';                   // red
}

export default function StatBar({
  value,
  label,
  maxValue = 10,
  animated = true,
  showNumber = true,
}: StatBarProps) {
  const pct = Math.min(Math.max(value / maxValue, 0), 1);
  const [width, setWidth] = useState(0);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (!animated || animatedRef.current) {
      setWidth(pct * 100);
      return;
    }
    // Animate on mount
    const frame = requestAnimationFrame(() => {
      setWidth(pct * 100);
      animatedRef.current = true;
    });
    return () => cancelAnimationFrame(frame);
  }, [pct, animated]);

  const color = getBarColor(pct);

  return (
    <div style={{ marginBottom: '10px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '4px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '8px',
            color: 'var(--color-text-dark)',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </span>
        {showNumber && (
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '8px',
              color: 'var(--color-text-dark)',
            }}
          >
            {value}/{maxValue}
          </span>
        )}
      </div>

      {/* Bar track */}
      <div
        role="meter"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={maxValue}
        style={{
          height: '16px',
          backgroundColor: 'rgba(0,0,0,0.15)',
          border: '2px solid var(--color-border)',
          borderRadius: '3px',
          overflow: 'hidden',
          boxShadow: 'inset 2px 2px 0px rgba(0,0,0,0.2)',
        }}
      >
        {/* HP-style segmented fill */}
        <div
          style={{
            height: '100%',
            width: `${width}%`,
            backgroundColor: color,
            transition: animated ? 'width 0.8s ease-out' : 'none',
            position: 'relative',
            boxShadow: `inset 0 2px 0px rgba(255,255,255,0.3)`,
          }}
        >
          {/* Segment lines for pixel feel */}
          {Array.from({ length: maxValue }).map((_, i) => (
            <div
              key={i}
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: `${(i / maxValue) * 100}%`,
                top: 0,
                bottom: 0,
                width: '2px',
                backgroundColor: 'rgba(0,0,0,0.2)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
