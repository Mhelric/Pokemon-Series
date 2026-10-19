import { motion, AnimatePresence } from 'framer-motion';
import { useEasterEggStore } from '../../stores/useEasterEggStore';
import DialogueBox from '../ui/DialogueBox';
import PokemonSprite from '../ui/PokemonSprite';
import PokeballButton from '../ui/PokeballButton';

export default function WildPikachu() {
  const visible = useEasterEggStore((s) => s.wildPikachuVisible);
  const hideWildPikachu = useEasterEggStore((s) => s.hideWildPikachu);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0,0,0,0.85)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px',
          }}
          onClick={hideWildPikachu}
        >
          {/* Battle-style flash bars */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: '30%',
              left: 0, right: 0,
              height: '80px',
              backgroundColor: '#FFCB05',
              opacity: 0.15,
              transformOrigin: 'left',
            }}
          />

          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            style={{ marginBottom: '24px', textAlign: 'center' }}
          >
            <p style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '10px',
              color: '#FFFFFF',
              marginBottom: '16px',
              textShadow: '2px 2px 0px rgba(0,0,0,0.5)',
            }}>
              A wild PIKACHU appeared!
            </p>
            <PokemonSprite dexNumber={25} name="Pikachu" size={128} />
          </motion.div>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ width: '100%', maxWidth: '400px', marginBottom: '24px' }}
          >
            <DialogueBox
              text="Pika pika! You found the secret! The Konami Code still works in the year 2024! ⚡"
              speed={25}
              showArrow={false}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <PokeballButton
              label="RUN AWAY"
              onClick={hideWildPikachu}
              variant="secondary"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
