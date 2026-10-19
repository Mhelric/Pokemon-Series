import { motion } from 'framer-motion';

export default function PokeballLoader({ size = 64 }: { size?: number }) {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ minHeight: '50vh', gap: 'var(--space-2)' }}
      role="status"
      aria-label="Loading"
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        className="pixel-art"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        {/* Bottom half (white) */}
        <circle cx="32" cy="32" r="30" fill="#F5F5F5" stroke="#1B1B1B" strokeWidth="4" />
        {/* Top half (red) */}
        <path d="M2 32a30 30 0 0 1 60 0" fill="#DC0A2D" stroke="#1B1B1B" strokeWidth="4" />
        {/* Center line */}
        <rect x="2" y="30" width="60" height="4" fill="#1B1B1B" />
        {/* Center button */}
        <circle cx="32" cy="32" r="8" fill="#F5F5F5" stroke="#1B1B1B" strokeWidth="4" />
        <circle cx="32" cy="32" r="4" fill="#F5F5F5" stroke="#1B1B1B" strokeWidth="2" />
      </motion.svg>
      <p
        className="blink"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '10px',
          color: 'var(--color-text-dark)',
        }}
      >
        Loading...
      </p>
    </div>
  );
}
