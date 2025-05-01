import React from 'react';
import { Heart, ArrowRight, BookOpen } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';

export default function Footer() {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  
  const currentYear = new Date().getFullYear();
  
  // Fonction pour faire défiler vers une section
  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <footer className="w-full py-8 relative" style={{ position: 'relative', zIndex: 50 }}>
      {/* Bordure supérieure avec dégradé */}
      <div className={`absolute top-0 left-0 right-0 h-[1px] ${
        isDark 
          ? 'bg-gradient-to-r from-transparent via-gray-800 to-transparent' 
          : 'bg-gradient-to-r from-transparent via-gray-200 to-transparent'
      }`}></div>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
          {/* Colonne 1: Info & Copyright */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <h3 className={`font-bold text-xl ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Yann Mostowski
              </h3>
            </div>
            
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-xs`}>
              {t('fullStack')} {t('developer')}. {t('footerDescription')}
            </p>
            
            {/* Navigation links */}
            <div className="flex flex-col space-y-2 mt-2">
              <button 
                onClick={() => scrollToSection('home')}
                className={`text-sm group flex items-center gap-1.5 ${
                  isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-emerald-600'
                } transition-colors cursor-pointer`}
                style={{ position: 'relative', zIndex: 51 }}
              >
                <ArrowRight className="w-3.5 h-3.5" />
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className={`text-sm group flex items-center gap-1.5 ${
                  isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-emerald-600'
                } transition-colors cursor-pointer`}
                style={{ position: 'relative', zIndex: 51 }}
              >
                <ArrowRight className="w-3.5 h-3.5" />
                {t('about')}
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className={`text-sm group flex items-center gap-1.5 ${
                  isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-emerald-600'
                } transition-colors cursor-pointer`}
                style={{ position: 'relative', zIndex: 51 }}
              >
                <ArrowRight className="w-3.5 h-3.5" />
                {t('projects')}
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className={`text-sm group flex items-center gap-1.5 ${
                  isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-emerald-600'
                } transition-colors cursor-pointer`}
                style={{ position: 'relative', zIndex: 51 }}
              >
                <ArrowRight className="w-3.5 h-3.5" />
                {t('contact')}
              </button>
            </div>
          </div>
          
          {/* Colonne 2: Technologies */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <h3 className={`font-medium text-base ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {t('technologies')}
              </h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className={`px-2 py-1 text-xs rounded ${
                isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-800'
              }`}>React</span>
              <span className={`px-2 py-1 text-xs rounded ${
                isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-800'
              }`}>TypeScript</span>
              <span className={`px-2 py-1 text-xs rounded ${
                isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-800'
              }`}>TailwindCSS</span>
              <span className={`px-2 py-1 text-xs rounded ${
                isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-800'
              }`}>Framer Motion</span>
              <span className={`px-2 py-1 text-xs rounded ${
                isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-800'
              }`}>Lucide Icons</span>
              <span className={`px-2 py-1 text-xs rounded ${
                isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-800'
              }`}>i18n</span>
            </div>
            
            <button
              onClick={() => scrollToSection('about')}
              className={`text-sm flex items-center gap-1 mt-1 ${
                isDark ? 'text-blue-400 hover:text-blue-300' : 'text-emerald-600 hover:text-emerald-500'
              } cursor-pointer`}
              style={{ position: 'relative', zIndex: 51 }}
            >
              <BookOpen className="w-4 h-4" /> {t('learnMore')}
            </button>
          </div>
        </div>
        
        {/* Footer bottom */}
        <div className={`pt-5 border-t ${
          isDark ? 'border-gray-800' : 'border-gray-200'
        } flex flex-col md:flex-row justify-between items-center`}>
          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-3 md:mb-0`}>
            © {currentYear} Yann Mostowski. {t('allRightsReserved')}
          </p>
          
          <div className="flex items-center gap-1">
            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} flex items-center gap-1`}>
              {t('madeWith')} <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> {t('by')} Yann Mostowski
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
} 