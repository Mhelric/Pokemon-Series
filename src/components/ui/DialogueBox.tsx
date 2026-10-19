import { useEffect, useState, useRef } from 'react';
import { useSound } from '../../hooks/useSound';

interface DialogueBoxProps {
  text: string;
  speed?: number;           // ms per character
  onComplete?: () => void;
  showArrow?: boolean;
  autoAdvance?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function DialogueBox({
  text,
  speed = 30,
  onComplete,
  showArrow = true,
  autoAdvance = false,
  className = '',
  style = {},
}: DialogueBoxProps) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const { play } = useSound();
  const indexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    indexRef.current = 0;

    intervalRef.current = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1));
        // Play tick every 2 chars to avoid audio spam
        if (indexRef.current % 2 === 0) play('textTick');
        indexRef.current++;
      } else {
        clearInterval(intervalRef.current!);
        setDone(true);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(intervalRef.current!);
  }, [text, speed]); // eslint-disable-line react-hooks/exhaustive-deps

  // Click/space to skip animation or advance
  const handleAdvance = () => {
    if (!done) {
      clearInterval(intervalRef.current!);
      setDisplayed(text);
      setDone(true);
      onComplete?.();
    }
  };

  return (
    <div
      role="region"
      aria-live="polite"
      aria-label="Dialogue"
      onClick={handleAdvance}
      onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') handleAdvance(); }}
      tabIndex={0}
      className={className}
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        border: '4px solid var(--color-border)',
        borderRadius: '8px',
        boxShadow: '6px 6px 0px rgba(0,0,0,0.25)',
        padding: '16px 20px',
        position: 'relative',
        cursor: done ? 'default' : 'pointer',
        minHeight: '80px',
        ...style,
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '20px',
          lineHeight: 1.6,
          color: 'var(--color-text-dark)',
          margin: 0,
          paddingRight: '20px',
          whiteSpace: 'pre-wrap',
        }}
      >
        {displayed}
        {/* Cursor while typing */}
        {!done && (
          <span
            style={{
              display: 'inline-block',
              width: '2px',
              height: '1em',
              backgroundColor: 'var(--color-text-dark)',
              marginLeft: '2px',
              verticalAlign: 'text-bottom',
              animation: 'blink 0.8s step-end infinite',
            }}
            aria-hidden="true"
          />
        )}
      </p>

      {/* Advance arrow */}
      {showArrow && done && (
        <span
          className="blink"
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '14px',
            fontFamily: 'var(--font-heading)',
            fontSize: '12px',
            color: 'var(--color-text-dark)',
          }}
        >
          ▼
        </span>
      )}
    </div>
  );
}
