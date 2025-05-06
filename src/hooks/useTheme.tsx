import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  isHeaderVisible: boolean;
  hideHeader: () => void;
  showHeader: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Initialize theme state based on local storage or system preference
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) return savedTheme;
    
    // Toujours retourner 'dark' au lieu d'utiliser la préférence système
    return 'dark';
  });
  
  // État pour la visibilité du header
  const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true);
  
  // Update document class when theme changes
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    
    // Sauvegarder le thème dans localStorage
    localStorage.setItem('theme', theme);

    // Appliquer les couleurs CSS personnalisées
    if (theme === 'light') {
      // Palette émeraude-vert pour le mode clair
      root.style.setProperty('--color-primary-50', 'rgb(236, 253, 245)');  // Emerald 50
      root.style.setProperty('--color-primary-100', 'rgb(209, 250, 229)'); // Emerald 100
      root.style.setProperty('--color-primary-200', 'rgb(167, 243, 208)'); // Emerald 200
      root.style.setProperty('--color-primary-300', 'rgb(110, 231, 183)'); // Emerald 300
      root.style.setProperty('--color-primary-400', 'rgb(52, 211, 153)');  // Emerald 400
      root.style.setProperty('--color-primary-500', 'rgb(16, 185, 129)');  // Emerald 500
      root.style.setProperty('--color-primary-600', 'rgb(5, 150, 105)');   // Emerald 600
      root.style.setProperty('--color-primary-700', 'rgb(4, 120, 87)');    // Emerald 700
      root.style.setProperty('--color-primary-800', 'rgb(6, 95, 70)');     // Emerald 800
      root.style.setProperty('--color-primary-900', 'rgb(6, 78, 59)');     // Emerald 900
      root.style.setProperty('--color-accent-300', 'rgb(134, 239, 172)');  // Green 300
      root.style.setProperty('--color-accent-400', 'rgb(74, 222, 128)');   // Green 400
      root.style.setProperty('--color-accent-500', 'rgb(34, 197, 94)');    // Green 500
    } else {
      // Palette bleu marine - slate pour le mode sombre
      root.style.setProperty('--color-primary-50', 'rgb(240, 249, 255)');  // Blue 50
      root.style.setProperty('--color-primary-100', 'rgb(224, 242, 254)'); // Blue 100
      root.style.setProperty('--color-primary-200', 'rgb(186, 230, 253)'); // Blue 200
      root.style.setProperty('--color-primary-300', 'rgb(125, 211, 252)'); // Blue 300
      root.style.setProperty('--color-primary-400', 'rgb(56, 189, 248)');  // Blue 400
      root.style.setProperty('--color-primary-500', 'rgb(14, 165, 233)');  // Blue 500
      root.style.setProperty('--color-primary-600', 'rgb(2, 132, 199)');   // Blue 600
      root.style.setProperty('--color-primary-700', 'rgb(3, 105, 161)');   // Blue 700
      root.style.setProperty('--color-primary-800', 'rgb(7, 89, 133)');    // Blue 800
      root.style.setProperty('--color-primary-900', 'rgb(12, 74, 110)');   // Blue 900
      root.style.setProperty('--color-accent-300', 'rgb(148, 163, 184)');  // Slate 300
      root.style.setProperty('--color-accent-400', 'rgb(100, 116, 139)');  // Slate 400
      root.style.setProperty('--color-accent-500', 'rgb(71, 85, 105)');    // Slate 500
    }

    // Appliquer les couleurs aux variables CSS standard
    document.documentElement.style.setProperty('--primary', theme === 'light' ? '158 84% 39%' : '206 84% 48%');
    document.documentElement.style.setProperty('--accent', theme === 'light' ? '142 70% 45%' : '215 25% 65%');
    document.documentElement.style.setProperty('--border', theme === 'light' ? '160 50% 90%' : '210 30% 30%');
    document.documentElement.style.setProperty('--ring', theme === 'light' ? '158 84% 39%' : '206 84% 48%');
  }, [theme]);
  
  // Définition des couleurs de notre palette
  const colors = {
    light: {
      // Émeraude et vert
      primary: 'rgb(16, 185, 129)',        // Emerald 500
      primaryLight: 'rgb(52, 211, 153)',   // Emerald 400
      primaryDark: 'rgb(5, 150, 105)',     // Emerald 600  
      accent: 'rgb(34, 197, 94)',          // Green 500
      accentLight: 'rgb(74, 222, 128)',    // Green 400
      accentDark: 'rgb(22, 163, 74)',      // Green 600
      muted: 'rgb(240, 253, 244)',         // Green 50
      surface: 'rgb(255, 255, 255)',       // Blanc
      text: 'rgb(15, 23, 42)',             // Slate 900
    },
    dark: {
      // Bleu marine et slate
      primary: 'rgb(14, 165, 233)',        // Blue 500
      primaryLight: 'rgb(56, 189, 248)',   // Blue 400
      primaryDark: 'rgb(2, 132, 199)',     // Blue 600
      accent: 'rgb(71, 85, 105)',          // Slate 500
      accentLight: 'rgb(100, 116, 139)',   // Slate 400
      accentDark: 'rgb(51, 65, 85)',       // Slate 600
      muted: 'rgb(30, 41, 59)',            // Slate 800
      surface: 'rgb(15, 23, 42)',          // Slate 900
      text: 'rgb(241, 245, 249)',          // Slate 100
    }
  };
  
  // Fonction pour basculer entre les modes clair et sombre
  const toggleTheme = () => setTheme((prevTheme: Theme) => 
    prevTheme === 'light' ? 'dark' : 'light'
  );
  
  // Fonctions pour gérer la visibilité du header
  const hideHeader = () => setIsHeaderVisible(false);
  const showHeader = () => setIsHeaderVisible(true);
  
  // Écouter les changements de préférence système
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem('theme')) return; // Respecter la préférence manuelle
      setTheme(e.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return (
    <ThemeContext.Provider value={{ 
      isDark: theme === 'dark', 
      toggleTheme,
      isHeaderVisible,
      hideHeader,
      showHeader
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
