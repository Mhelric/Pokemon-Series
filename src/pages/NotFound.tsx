import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function NotFound() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col items-center justify-center"
      style={{
        minHeight: '70vh',
        padding: 'var(--space-4)',
        textAlign: 'center',
      }}
    >
      {/* MissingNo-style glitch box */}
      <div
        className="pixel-border"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          padding: 'var(--space-4)',
          maxWidth: '500px',
          width: '100%',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '48px',
            marginBottom: 'var(--space-2)',
            color: 'var(--color-pokedex-red)',
          }}
        >
          ???
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '12px',
            marginBottom: 'var(--space-2)',
            lineHeight: 1.8,
          }}
        >
          A wild MissingNo. appeared!
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '20px',
            marginBottom: 'var(--space-3)',
            lineHeight: 1.5,
          }}
        >
          The page you're looking for doesn't exist.
          It might have been moved, deleted, or perhaps
          it was never real... like MissingNo. itself.
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-heading)',
            fontSize: '10px',
            padding: '12px 24px',
            backgroundColor: 'var(--color-pokedex-red)',
            color: 'var(--color-pokeball-white)',
            border: '3px solid var(--color-border)',
            borderRadius: '4px',
            textDecoration: 'none',
            boxShadow: '4px 4px 0px rgba(0,0,0,0.3)',
          }}
        >
          ▶ GO HOME
        </Link>
      </div>
    </motion.div>
  );
}
