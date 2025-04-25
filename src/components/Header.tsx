import { Moon, Sun, Github, Mail, Linkedin, Menu, X, Globe } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { useState } from 'react';

export function Header() {
  const { isDark, toggleTheme } = useTheme();
  const { t, toggleLanguage, language } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4">
      <nav className="w-full max-w-5xl mx-4 px-8 py-5 bg-white/50 dark:bg-black/30 backdrop-blur-sm border border-gray-300 dark:border-white/10 transition-all duration-300 rounded-xl shadow-sm">
        <div className="flex justify-center items-center relative">
          {/* Mobile menu button - now positioned absolutely to the left */}
          <button 
            className="md:hidden text-gray-700 hover:text-emerald-700 dark:text-gray-300 dark:hover:text-blue-400 transition-colors absolute left-0"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <div className={`
            ${isMenuOpen ? 'flex flex-col absolute top-16 left-0 right-0 bg-white/80 dark:bg-white/5 backdrop-blur-sm border-b border-gray-300 dark:border-white/10 p-4 gap-4 shadow-lg' : 'hidden'} 
            md:flex md:static md:flex-row md:items-center md:justify-between md:bg-transparent md:border-0 md:p-0 md:gap-16 md:shadow-none
            transition-all duration-300 w-full
          `}>
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-14">
              <a
                href="#about"
                className="text-gray-800 hover:text-emerald-700 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors text-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#projects"
                className="text-gray-800 hover:text-emerald-700 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors text-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </a>
              <a
                href="#contact"
                className="text-gray-800 hover:text-emerald-700 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors text-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </div>
            
            <div className="flex items-center gap-5 mt-4 md:mt-0">
              <button
                onClick={toggleLanguage}
                className="p-2.5 rounded-full bg-white/90 hover:bg-emerald-50 dark:bg-white/5 dark:hover:bg-blue-900/20 text-gray-700 hover:text-emerald-800 dark:text-gray-300 dark:hover:text-blue-300 transition-all flex items-center gap-2 border border-gray-300 dark:border-white/10 shadow-sm"
                aria-label="Change language"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{t('switchToLanguage')}</span>
              </button>
              
              <a 
                href="https://github.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/90 hover:bg-emerald-50 dark:bg-white/5 dark:hover:bg-blue-900/20 text-gray-700 hover:text-emerald-800 dark:text-gray-300 dark:hover:text-blue-300 transition-all border border-gray-300 dark:border-white/10 shadow-sm"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com/in/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/90 hover:bg-emerald-50 dark:bg-white/5 dark:hover:bg-blue-900/20 text-gray-700 hover:text-emerald-800 dark:text-gray-300 dark:hover:text-blue-300 transition-all border border-gray-300 dark:border-white/10 shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:your.email@example.com"
                className="p-2.5 rounded-full bg-white/90 hover:bg-emerald-50 dark:bg-white/5 dark:hover:bg-blue-900/20 text-gray-700 hover:text-emerald-800 dark:text-gray-300 dark:hover:text-blue-300 transition-all border border-gray-300 dark:border-white/10 shadow-sm"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full bg-white/90 hover:bg-emerald-50 dark:bg-white/5 dark:hover:bg-blue-900/20 text-gray-700 hover:text-emerald-800 dark:text-gray-300 dark:hover:text-blue-300 transition-all group relative border border-gray-300 dark:border-white/10 shadow-sm"
                aria-label={t('changeTheme')}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-blue-700" />
                )}
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
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