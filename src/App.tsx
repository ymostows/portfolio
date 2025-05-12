import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import Footer from './components/Footer';
import { LanguageProvider } from './hooks/useLanguage';
import { ThemeProvider, useTheme } from './hooks/useTheme';
import { useEffect, useState } from 'react';

// Composant wrapper pour appliquer le thème
function AppContent() {
  const { isDark } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  
  // Détection du mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <div className="min-h-screen transition-colors duration-500 bg-[hsl(var(--background))] text-[hsl(var(--foreground))] relative">
        <Header />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 pt-2">
          <div className="flex flex-col space-y-12">
            <section className="w-full">
              <Hero />
            </section>
            <section className="w-full">
              <About />
            </section>
            <section className="w-full">
              <Projects />
            </section>
            <section className="w-full">
              <Contact />
            </section>
            <section className="w-full">
              <Footer />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className="min-h-screen">
          <AppContent />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;