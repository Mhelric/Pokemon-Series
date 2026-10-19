import { useCallback } from 'react';
import { useSettingsStore } from '../stores/useSettingsStore';
import SoundEngine from '../utils/soundEngine';

export function useSound() {
  const soundEnabled = useSettingsStore((s) => s.soundEnabled);

  const play = useCallback(
    (sound: keyof typeof SoundEngine) => {
      if (soundEnabled && typeof SoundEngine[sound] === 'function') {
        (SoundEngine[sound] as () => void)();
      }
    },
    [soundEnabled]
  );

  return { play, soundEnabled };
}
