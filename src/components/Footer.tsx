import React from 'react';
import { Github, Mail, MapPin, Heart } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';

export default function Footer() {
  const { isDark } = useTheme();
  const { language, t } = useLanguage();
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} py-8 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-6">
          {/* Colonne 1: Info & Copyright */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className={`font-bold text-lg mb-3 ${isDark ? 'text-blue-300' : 'text-emerald-600'}`}>
              Yann Mostowski
            </h3>
            <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-xs text-center md:text-left`}>
              {language === 'en' 
                ? 'Freelance web developer passionate about creating engaging digital experiences.' 
                : 'Développeur web freelance passionné par la création d\'expériences numériques engageantes.'}
            </p>
            <p className="text-sm opacity-75">
              © {currentYear} Yann Mostowski. {language === 'en' ? 'All rights reserved.' : 'Tous droits réservés.'}
            </p>
          </div>
          
          {/* Colonne 2: Navigation */}
          <div className="flex flex-col items-center">
            <h3 className={`font-bold text-lg mb-3 ${isDark ? 'text-blue-300' : 'text-emerald-600'}`}>
              {language === 'en' ? 'Navigation' : 'Navigation'}
            </h3>
            <div className="flex flex-col space-y-2">
              <a 
                href="#about" 
                className={`text-sm ${isDark ? 'text-gray-300 hover:text-blue-300' : 'text-gray-600 hover:text-emerald-600'} transition-colors hover:translate-x-1 transform flex items-center gap-1`}
              >
                <span>→</span> {t('about')}
              </a>
              <a 
                href="#projects" 
                className={`text-sm ${isDark ? 'text-gray-300 hover:text-blue-300' : 'text-gray-600 hover:text-emerald-600'} transition-colors hover:translate-x-1 transform flex items-center gap-1`}
              >
                <span>→</span> {t('projects')}
              </a>
              <a 
                href="#contact" 
                className={`text-sm ${isDark ? 'text-gray-300 hover:text-blue-300' : 'text-gray-600 hover:text-emerald-600'} transition-colors hover:translate-x-1 transform flex items-center gap-1`}
              >
                <span>→</span> {t('contact')}
              </a>
            </div>
          </div>
          
          {/* Colonne 3: Contact */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className={`font-bold text-lg mb-3 ${isDark ? 'text-blue-300' : 'text-emerald-600'}`}>
              {language === 'en' ? 'Connect' : 'Connectez-vous'}
            </h3>
            <div className="flex space-x-3 mb-4">
              <a 
                href="https://github.com/heedzlinux" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-2.5 rounded-full ${isDark ? 'bg-gray-800 hover:bg-blue-500 text-gray-300 hover:text-white border-gray-700' : 'bg-gray-100 hover:bg-emerald-500 text-gray-600 hover:text-white border-gray-200'} 
                transition-all border hover:shadow-md`}
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="mailto:contact@yannmostowski.com" 
                className={`p-2.5 rounded-full ${isDark ? 'bg-gray-800 hover:bg-blue-500 text-gray-300 hover:text-white border-gray-700' : 'bg-gray-100 hover:bg-emerald-500 text-gray-600 hover:text-white border-gray-200'} 
                transition-all border hover:shadow-md`}
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href="https://maps.app.goo.gl/QXHXND7U3UWA1C6L6" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-2.5 rounded-full ${isDark ? 'bg-gray-800 hover:bg-blue-500 text-gray-300 hover:text-white border-gray-700' : 'bg-gray-100 hover:bg-emerald-500 text-gray-600 hover:text-white border-gray-200'} 
                transition-all border hover:shadow-md`}
                aria-label="Location"
              >
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} flex flex-col md:flex-row justify-between items-center">
          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-3 md:mb-0`}>
            {language === 'en' ? 'Designed and developed with modern web technologies' : 'Conçu et développé avec des technologies web modernes'}
          </p>
          <div className="flex items-center">
            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} flex items-center gap-1`}>
              {language === 'en' ? 'Made with' : 'Fait avec'} <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> {language === 'en' ? 'by' : 'par'} Yann Mostowski
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
} 