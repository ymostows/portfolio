import React from 'react';
import { Heart } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';

export default function Footer() {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`w-full rounded-b-lg py-5 relative mt-6 ${
      isDark 
        ? 'bg-black/30 border border-white/10 backdrop-blur-sm dark:shadow-none'
        : 'bg-white/30 border border-gray-300 backdrop-blur-sm'
    }`} style={{ position: 'relative', zIndex: 50 }}>
      {/* Bordure supérieure */}
      <div className={`absolute top-0 left-0 right-0 h-[1px] ${
        isDark 
          ? 'bg-gray-800' 
          : 'bg-gray-200'
      }`}></div>
      
      <div className="container mx-auto px-6">
        {/* Footer compact */}
        <div className={`pt-3 flex flex-col md:flex-row justify-between items-center gap-4`}>
          <div className="flex items-center gap-2">
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              © {currentYear} Yann Mostowski. {t('allRightsReserved')}
            </p>
          </div>
          
          <div className="flex items-center space-x-4 md:space-x-6">
            <a href="#home" className={`text-sm ${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-emerald-600'} transition-colors`}>Home</a>
            <a href="#about" className={`text-sm ${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-emerald-600'} transition-colors`}>{t('about')}</a>
            <a href="#projects" className={`text-sm ${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-emerald-600'} transition-colors`}>{t('projects')}</a>
            <a href="#contact" className={`text-sm ${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-emerald-600'} transition-colors`}>{t('contact')}</a>
          </div>
          
          <div className="flex items-center">
            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} flex items-center gap-1`}>
              {t('madeWith')} <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> {t('by')} Yann
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
} 