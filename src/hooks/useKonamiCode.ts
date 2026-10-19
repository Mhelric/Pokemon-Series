import { useEffect } from 'react';
import { useEasterEggStore } from '../stores/useEasterEggStore';
import { useSound } from './useSound';

const KONAMI = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'b','a',
];

export function useKonamiCode() {
  const showWildPikachu = useEasterEggStore((s) => s.showWildPikachu);
  const { play } = useSound();

  useEffect(() => {
    let sequence: string[] = [];

    const handler = (e: KeyboardEvent) => {
      sequence.push(e.key);
      if (sequence.length > KONAMI.length) {
        sequence = sequence.slice(-KONAMI.length);
      }
      if (sequence.join(',') === KONAMI.join(',')) {
        play('encounter');
        showWildPikachu();
        sequence = [];
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [showWildPikachu, play]);
}
