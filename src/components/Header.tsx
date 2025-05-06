import { Moon, Sun, Github, Mail, Linkedin, Globe } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { useState, useEffect } from 'react';

export function Header() {
  const { isDark, toggleTheme } = useTheme();
  const { t, toggleLanguage, language } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4">
      <nav className={`w-full max-w-5xl mx-4 px-8 py-5 ${isMobile ? 'py-3 px-4 mx-2' : ''} bg-white/50 dark:bg-black/30 backdrop-blur-sm border border-gray-300 dark:border-white/10 transition-all duration-300 rounded-xl shadow-sm`}>
        <div className="flex flex-wrap justify-between items-center gap-3">
          {/* Navigation liens */}
          <div className="flex items-center gap-3 md:gap-8 flex-wrap justify-center">
            <a
              href="#about"
              className={`text-gray-800 hover:text-emerald-700 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors ${isMobile ? 'text-xs' : 'text-base'}`}
            >
              About
            </a>
            <a
              href="#projects"
              className={`text-gray-800 hover:text-emerald-700 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors ${isMobile ? 'text-xs' : 'text-base'}`}
            >
              Projects
            </a>
            <a
              href="#contact"
              className={`text-gray-800 hover:text-emerald-700 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors ${isMobile ? 'text-xs' : 'text-base'}`}
            >
              Contact
            </a>
          </div>
          
          {/* Bouton langue et icônes */}
          <div className="flex items-center gap-2 md:gap-3 flex-wrap justify-center">
            <button
              onClick={toggleLanguage}
              className={`rounded-full bg-white/90 hover:bg-emerald-50 dark:bg-white/5 dark:hover:bg-blue-900/20 text-gray-700 hover:text-emerald-800 dark:text-gray-300 dark:hover:text-blue-300 transition-all flex items-center gap-1 border border-gray-300 dark:border-white/10 shadow-sm ${isMobile ? 'p-1.5' : 'p-2'}`}
              aria-label="Change language"
            >
              <Globe className={isMobile ? "w-3 h-3" : "w-4 h-4"} />
              <span className={`text-xs font-medium ${isMobile ? 'hidden' : 'inline'}`}>{t('switchToLanguage')}</span>
            </button>
            
            <div className={`flex ${isMobile ? 'gap-1' : 'gap-2'}`}>
              <a 
                href="https://github.com/HeedzZ" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`rounded-full bg-white/90 hover:bg-emerald-50 dark:bg-white/5 dark:hover:bg-blue-900/20 text-gray-700 hover:text-emerald-800 dark:text-gray-300 dark:hover:text-blue-300 transition-all border border-gray-300 dark:border-white/10 shadow-sm ${isMobile ? 'p-1.5' : 'p-2'}`}
                aria-label="GitHub"
              >
                <Github className={isMobile ? "w-3.5 h-3.5" : "w-4 h-4"} />
              </a>
              <a 
                href="https://www.linkedin.com/in/yann-mostowski-485833271/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`rounded-full bg-white/90 hover:bg-emerald-50 dark:bg-white/5 dark:hover:bg-blue-900/20 text-gray-700 hover:text-emerald-800 dark:text-gray-300 dark:hover:text-blue-300 transition-all border border-gray-300 dark:border-white/10 shadow-sm ${isMobile ? 'p-1.5' : 'p-2'}`}
                aria-label="LinkedIn"
              >
                <Linkedin className={isMobile ? "w-3.5 h-3.5" : "w-4 h-4"} />
              </a>
              <a 
                href="#contact"
                className={`rounded-full bg-white/90 hover:bg-emerald-50 dark:bg-white/5 dark:hover:bg-blue-900/20 text-gray-700 hover:text-emerald-800 dark:text-gray-300 dark:hover:text-blue-300 transition-all border border-gray-300 dark:border-white/10 shadow-sm ${isMobile ? 'p-1.5' : 'p-2'}`}
                aria-label="Contact"
              >
                <Mail className={isMobile ? "w-3.5 h-3.5" : "w-4 h-4"} />
              </a>
              <button
                onClick={toggleTheme}
                className={`rounded-full bg-white/90 hover:bg-emerald-50 dark:bg-white/5 dark:hover:bg-blue-900/20 text-gray-700 hover:text-emerald-800 dark:text-gray-300 dark:hover:text-blue-300 transition-all group relative border border-gray-300 dark:border-white/10 shadow-sm ${isMobile ? 'p-1.5' : 'p-2'}`}
                aria-label={t('changeTheme')}
              >
                {isDark ? (
                  <Sun className={`${isMobile ? "w-3.5 h-3.5" : "w-4 h-4"} text-yellow-500`} />
                ) : (
                  <Moon className={`${isMobile ? "w-3.5 h-3.5" : "w-4 h-4"} text-blue-700`} />
                )}
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
                  {t('changeTheme')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}