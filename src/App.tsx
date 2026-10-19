import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useSettingsStore } from './stores/useSettingsStore';
import { useEasterEggStore } from './stores/useEasterEggStore';
import { useKonamiCode } from './hooks/useKonamiCode';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PokeballLoader from './components/ui/PokeballLoader';
import WildPikachu from './components/easter-eggs/WildPikachu';

// Lazy-loaded pages
const TitleScreen = lazy(() => import('./pages/TitleScreen'));
const GamesBrowser = lazy(() => import('./pages/GamesBrowser'));
const GameDetail = lazy(() => import('./pages/GameDetail'));
const Timeline = lazy(() => import('./pages/Timeline'));
const Regions = lazy(() => import('./pages/Regions'));
const Starters = lazy(() => import('./pages/Starters'));
const Compare = lazy(() => import('./pages/Compare'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Collection = lazy(() => import('./pages/Collection'));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  const theme = useSettingsStore((s) => s.theme);
  const location = useLocation();
  const logoClickCount = useEasterEggStore((s) => s.logoClickCount);
  const shinyMode = useEasterEggStore((s) => s.shinyMode);
  const resetLogoClicks = useEasterEggStore((s) => s.resetLogoClicks);

  // Activate Konami code listener
  useKonamiCode();

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Shiny sparkle mode
  useEffect(() => {
    if (shinyMode) {
      document.documentElement.classList.add('shiny-mode');
      const timer = setTimeout(() => {
        document.documentElement.classList.remove('shiny-mode');
        resetLogoClicks();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [shinyMode, resetLogoClicks]);

  const isTitle = location.pathname === '/';

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-dark)' }}
    >
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {!isTitle && <Header />}

      <main id="main-content" className="flex-1">
        <Suspense fallback={<PokeballLoader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<TitleScreen />} />
              <Route path="/games" element={<GamesBrowser />} />
              <Route path="/games/:slug" element={<GameDetail />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/regions" element={<Regions />} />
              <Route path="/starters" element={<Starters />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>

      {!isTitle && <Footer />}

      {/* Global Easter Eggs */}
      <WildPikachu />
    </div>
  );
}
