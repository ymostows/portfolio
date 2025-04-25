import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import Footer from './components/Footer';
import { LanguageProvider } from './hooks/useLanguage';
import { ThemeProvider, useTheme } from './hooks/useTheme';

// Composant wrapper pour appliquer le thème
function AppContent() {
  const { isDark } = useTheme();
  
  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <div className="min-h-screen transition-colors duration-500 bg-[hsl(var(--background))] text-[hsl(var(--foreground))] relative">
        <Header />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-30 pt-2">
          <div className="grid grid-cols-1 gap-3">
            <Hero />
            <About />
            <Projects />
            <Contact />
          </div>
        </main>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
          <Footer />
        </div>
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