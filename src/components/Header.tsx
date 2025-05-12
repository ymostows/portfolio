import { Moon, Sun, Github, Mail, Linkedin, Globe } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { useState, useEffect } from 'react';

export function Header() {
  const { isDark, toggleTheme, isHeaderVisible } = useTheme();
  const { t, toggleLanguage, language } = useLanguage();
  const [viewportSize, setViewportSize] = useState('md');
  
  useEffect(() => {
    const checkViewportSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setViewportSize('sm');
      } else if (width < 900) {
        setViewportSize('md');
      } else if (width < 1220) {
        setViewportSize('lg');
      } else {
        setViewportSize('xl');
      }
    };
    
    checkViewportSize();
    window.addEventListener('resize', checkViewportSize);
    return () => window.removeEventListener('resize', checkViewportSize);
  }, []);
  
  // Si le header n'est pas visible, ne pas le rendre
  if (!isHeaderVisible) return null;
  
  const isMobile = viewportSize === 'sm' || viewportSize === 'md';
  const isTablet = viewportSize === 'lg';
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 flex justify-center ${isMobile ? 'pt-4' : 'pt-6'}`}>
      <nav className={`w-full max-w-[76rem] mx-2 sm:mx-4 ${isMobile ? 'py-3 px-3 sm:py-4 sm:px-4' : isTablet ? 'py-4 px-5' : 'py-5 px-8'} bg-white/50 dark:bg-black/30 backdrop-blur-sm border border-gray-300 dark:border-white/10 transition-all duration-300 rounded-xl shadow-sm`}>
        {isMobile && (
          // Version mobile optimisée
          <div className="flex items-center justify-between">
            <div className="flex gap-2 sm:gap-3">
              <a
                href="#about"
                className="text-gray-800 hover:text-emerald-700 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors text-xs"
              >
                About
              </a>
              <a
                href="#projects"
                className="text-gray-800 hover:text-emerald-700 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors text-xs"
              >
                Projects
              </a>
              <a
                href="#contact"
                className="text-gray-800 hover:text-emerald-700 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors text-xs"
              >
                Contact
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleLanguage}
                className="rounded-full bg-white/90 hover:bg-emerald-50 dark:bg-white/5 dark:hover:bg-blue-900/20 text-gray-700 hover:text-emerald-800 dark:text-gray-300 dark:hover:text-blue-300 transition-all flex items-center gap-1 border border-gray-300 dark:border-white/10 shadow-sm p-1.5"
                aria-label="Change language"
              >
                <Globe className="w-3.5 h-3.5" />
              </button>
              <a 
                href="https://github.com/ymostows" 
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-full bg-white/90 hover:bg-emerald-50 dark:bg-white/5 dark:hover:bg-blue-900/20 text-gray-700 hover:text-emerald-800 dark:text-gray-300 dark:hover:text-blue-300 transition-all border border-gray-300 dark:border-white/10 shadow-sm p-1.5"
                aria-label="GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/yann-mostowski-485833271/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-full bg-white/90 hover:bg-emerald-50 dark:bg-white/5 dark:hover:bg-blue-900/20 text-gray-700 hover:text-emerald-800 dark:text-gray-300 dark:hover:text-blue-300 transition-all border border-gray-300 dark:border-white/10 shadow-sm p-1.5"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a 
                href="#contact"
                className="rounded-full bg-white/90 hover:bg-emerald-50 dark:bg-white/5 dark:hover:bg-blue-900/20 text-gray-700 hover:text-emerald-800 dark:text-gray-300 dark:hover:text-blue-300 transition-all border border-gray-300 dark:border-white/10 shadow-sm p-1.5"
                aria-label="Contact"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={toggleTheme}
                className="rounded-full bg-white/90 hover:bg-emerald-50 dark:bg-white/5 dark:hover:bg-blue-900/20 text-gray-700 hover:text-emerald-800 dark:text-gray-300 dark:hover:text-blue-300 transition-all group relative border border-gray-300 dark:border-white/10 shadow-sm p-1.5"
                aria-label={t('changeTheme')}
              >
                {isDark ? (
                  <Sun className="w-3.5 h-3.5 text-yellow-500" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-blue-700" />
                )}
              </button>
            </div>
          </div>
        )}
        
        {isTablet && (
          // Version tablette (entre mobile et desktop)
          <div>
            <div className="flex justify-between items-center">
              <div className="flex gap-6">
                <a
                  href="#about"
                  className="text-gray-800 hover:text-emerald-700 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors text-base"
                >
                  About
                </a>
                <a
                  href="#projects"
                  className="text-gray-800 hover:text-emerald-700 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors text-base"
                >
                  Projects
                </a>
                <a
                  href="#contact"
                  className="text-gray-800 hover:text-emerald-700 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors text-base"
                >
                  Contact
                </a>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleLanguage}
                  className="rounded-full bg-white/90 hover:bg-emerald-50 dark:bg-white/5 dark:hover:bg-blue-900/20 text-gray-700 hover:text-emerald-800 dark:text-gray-300 dark:hover:text-blue-300 transition-all border border-gray-300 dark:border-white/10 shadow-sm p-2"
                  aria-label="Change language"
                >
                  <Globe className="w-4 h-4" />
                </button>
                <a 
                  href="https://github.com/ymostows" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/90 hover:bg-emerald-50 dark:bg-white/5 dark:hover:bg-blue-900/20 text-gray-700 hover:text-emerald-800 dark:text-gray-300 dark:hover:text-blue-300 transition-all border border-gray-300 dark:border-white/10 shadow-sm p-2"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/yann-mostowski-485833271/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/90 hover:bg-emerald-50 dark:bg-white/5 dark:hover:bg-blue-900/20 text-gray-700 hover:text-emerald-800 dark:text-gray-300 dark:hover:text-blue-300 transition-all border border-gray-300 dark:border-white/10 shadow-sm p-2"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href="#contact"
                  className="rounded-full bg-white/90 hover:bg-emerald-50 dark:bg-white/5 dark:hover:bg-blue-900/20 text-gray-700 hover:text-emerald-800 dark:text-gray-300 dark:hover:text-blue-300 transition-all border border-gray-300 dark:border-white/10 shadow-sm p-2"
                  aria-label="Contact"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <button
                  onClick={toggleTheme}
                  className="rounded-full bg-white/90 hover:bg-emerald-50 dark:bg-white/5 dark:hover:bg-blue-900/20 text-gray-700 hover:text-emerald-800 dark:text-gray-300 dark:hover:text-blue-300 transition-all border border-gray-300 dark:border-white/10 shadow-sm p-2"
                  aria-label={t('changeTheme')}
                >
                  {isDark ? (
                    <Sun className="w-4 h-4 text-yellow-500" />
                  ) : (
                    <Moon className="w-4 h-4 text-blue-700" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
        
        {!isMobile && !isTablet && (
          // Version desktop complète
          <div className="flex flex-wrap justify-between items-center gap-3">
            {/* Navigation liens - version desktop */}
            <div className="flex flex-row items-center gap-14">
              <a
                href="#about"
                className="text-gray-800 hover:text-emerald-700 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors text-lg"
              >
                About
              </a>
              <a
                href="#projects"
                className="text-gray-800 hover:text-emerald-700 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors text-lg"
              >
                Projects
              </a>
              <a
                href="#contact"
                className="text-gray-800 hover:text-emerald-700 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors text-lg"
              >
                Contact
              </a>
            </div>
            
            {/* Bouton langue et icônes - version desktop */}
            <div className="flex items-center gap-5">
              <button
                onClick={toggleLanguage}
                className="rounded-full bg-white/90 hover:bg-emerald-50 dark:bg-white/5 dark:hover:bg-blue-900/20 text-gray-700 hover:text-emerald-800 dark:text-gray-300 dark:hover:text-blue-300 transition-all flex items-center gap-1 border border-gray-300 dark:border-white/10 shadow-sm p-2.5"
                aria-label="Change language"
              >
                <Globe className="w-5 h-5" />
                <span className="font-medium text-sm">{t('switchToLanguage')}</span>
              </button>
              
              <div className="flex gap-3">
                <a 
                  href="https://github.com/ymostows" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/90 hover:bg-emerald-50 dark:bg-white/5 dark:hover:bg-blue-900/20 text-gray-700 hover:text-emerald-800 dark:text-gray-300 dark:hover:text-blue-300 transition-all border border-gray-300 dark:border-white/10 shadow-sm p-2.5"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/yann-mostowski-485833271/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/90 hover:bg-emerald-50 dark:bg-white/5 dark:hover:bg-blue-900/20 text-gray-700 hover:text-emerald-800 dark:text-gray-300 dark:hover:text-blue-300 transition-all border border-gray-300 dark:border-white/10 shadow-sm p-2.5"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="#contact"
                  className="rounded-full bg-white/90 hover:bg-emerald-50 dark:bg-white/5 dark:hover:bg-blue-900/20 text-gray-700 hover:text-emerald-800 dark:text-gray-300 dark:hover:text-blue-300 transition-all border border-gray-300 dark:border-white/10 shadow-sm p-2.5"
                  aria-label="Contact"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <button
                  onClick={toggleTheme}
                  className="rounded-full bg-white/90 hover:bg-emerald-50 dark:bg-white/5 dark:hover:bg-blue-900/20 text-gray-700 hover:text-emerald-800 dark:text-gray-300 dark:hover:text-blue-300 transition-all group relative border border-gray-300 dark:border-white/10 shadow-sm p-2.5"
                  aria-label={t('changeTheme')}
                >
                  {isDark ? (
                    <Sun className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <Moon className="w-5 h-5 text-blue-700" />
                  )}
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden">
                    {t('changeTheme')}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}