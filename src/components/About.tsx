import { Code, Database, Terminal, Server, Cpu, Layers, BarChart, ArrowRight, MapPin, Award, GraduationCap, FileDown, Mail, ExternalLink, ChevronDown, ChevronRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';
import { useEffect, useRef, useState } from 'react';

type Skill = {
  name: string;
  experience: string;
  level: number; // Sur 5
};

type SkillCategory = {
  key: string;
  icon: JSX.Element;
  techs: Skill[];
  lightGradient: string;
  darkGradient: string;
  lightColor: string;
  darkColor: string;
};

interface AnimatedElementProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  className?: string;
}

const AnimatedElement: React.FC<AnimatedElementProps> = ({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);
  
  const getTransform = () => {
    switch (direction) {
      case 'left': return 'translateX(-30px)';
      case 'right': return 'translateX(30px)';
      case 'down': return 'translateY(-30px)';
      case 'up':
      default: return 'translateY(30px)';
    }
  };
  
  const style = {
    transform: isVisible ? 'translate(0)' : getTransform(),
    opacity: isVisible ? 1 : 0,
    transition: `transform 0.6s ease-out ${delay}s, opacity 0.6s ease-out ${delay}s`,
  };
  
  return (
    <div ref={elementRef} style={style} className={className}>
      {children}
    </div>
  );
};

// Composant de niveau de compétence
const SkillLevel = ({ level, lightColor, darkColor }: { level: number, lightColor: string, darkColor: string }) => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  
  // Conversion du niveau numérique en description qualitative
  const getLevelLabel = (level: number) => {
    switch(level) {
      case 1: return t('levelBeginner');
      case 2: return t('levelIntermediate');
      case 3: return t('levelAdvanced');
      case 4: return t('levelExpert');
      case 5: return t('levelMastery');
      default: return t('levelIntermediate');
    }
  };
  
  return (
    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
      isDark 
        ? level >= 4 ? 'bg-blue-500/20 text-blue-300' : 'bg-indigo-500/20 text-indigo-300'
        : level >= 4 ? 'bg-emerald-500/20 text-emerald-700' : 'bg-green-500/20 text-green-700'
    }`}>
      {getLevelLabel(level)}
    </div>
  );
};

// Génère un ID aléatoire pour les dégradés SVG
const generateId = () => `gradient-${Math.random().toString(36).substr(2, 9)}`;

export function About() {
  const { t } = useLanguage();
  const [expandedCategory, setExpandedCategory] = useState<string | null>('frontEnd');
  const { isDark } = useTheme();
  const categoryRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const contentRef = useRef<HTMLDivElement>(null);
  const [showBio, setShowBio] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Détection du mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleCategory = (key: string) => {
    setExpandedCategory(expandedCategory === key ? null : key);
    
    // Faire défiler jusqu'au contenu si on ouvre une catégorie
    if (expandedCategory !== key && contentRef.current) {
      setTimeout(() => {
        contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  };
  
  const skills: SkillCategory[] = [
    {
      key: 'frontEnd',
      icon: <Code className="w-5 h-5 text-white" />,
      techs: [
        { name: "TypeScript", experience: t('typescriptExp'), level: 2 },
        { name: "JavaScript", experience: t('javascriptExp'), level: 2 },
        { name: "React", experience: t('reactExp'), level: 3 },
        { name: "HTML/CSS", experience: t('htmlCssExp'), level: 3 },
        { name: "TailwindCSS", experience: t('tailwindExp'), level: 3 },      
      ],
      lightGradient: "from-emerald-600 via-green-500 to-emerald-400",
      darkGradient: "from-blue-700 to-indigo-800",
      lightColor: "bg-emerald-500",
      darkColor: "bg-blue-700"
    },
    {
      key: 'backEnd',
      icon: <Server className="w-5 h-5 text-white" />,
      techs: [
        { name: "Node.js", experience: t('nodejsExp'), level: 2 },
        { name: "Next.js", experience: t('nextjsExp'), level: 2 },
        { name: "Python", experience: t('pythonExp'), level: 3 }
      ],
      lightGradient: "from-emerald-600 via-green-500 to-emerald-400",
      darkGradient: "from-blue-700 to-indigo-800",
      lightColor: "bg-emerald-500",
      darkColor: "bg-blue-700"
    },
    {
      key: 'lowLevelLanguages',
      icon: <Cpu className="w-5 h-5 text-white" />,
      techs: [
        { name: "C", experience: t('cExp'), level: 3 },
        { name: "C++", experience: t('cppExp'), level: 3 }
      ],
      lightGradient: "from-emerald-600 via-green-500 to-emerald-400",
      darkGradient: "from-blue-700 to-indigo-800",
      lightColor: "bg-emerald-500",
      darkColor: "bg-blue-700"
    },
    {
      key: 'devOps',
      icon: <Layers className="w-5 h-5 text-white" />,
      techs: [
        { name: "Docker", experience: t('dockerExp'), level: 2 },
        { name: "Git", experience: t('gitExp'), level: 3 },
        { name: "Linux", experience: t('linuxExp'), level: 3 }
      ],
      lightGradient: "from-emerald-600 via-green-500 to-emerald-400",
      darkGradient: "from-blue-700 to-indigo-800",
      lightColor: "bg-emerald-500",
      darkColor: "bg-blue-700"
    },
    {
      key: 'databases',
      icon: <Database className="w-5 h-5 text-white" />,
      techs: [
        { name: "SQLite", experience: t('sqliteExp'), level: 2 },
        { name: "MariaDB", experience: t('mariadbExp'), level: 1 }
      ],
      lightGradient: "from-emerald-600 via-green-500 to-emerald-400",
      darkGradient: "from-blue-700 to-indigo-800",
      lightColor: "bg-emerald-500",
      darkColor: "bg-blue-700"
    },
    {
      key: 'tools',
      icon: <Terminal className="w-5 h-5 text-white" />,
      techs: [
        { name: "Bash", experience: t('bashExp'), level: 3 },
        { name: "n8n", experience: t('n8nExp'), level: 1 }
      ],
      lightGradient: "from-emerald-600 via-green-500 to-emerald-400",
      darkGradient: "from-blue-700 to-indigo-800",
      lightColor: "bg-emerald-500",
      darkColor: "bg-blue-700"
    }
  ];
  
  const selectedCategory = skills.find(s => s.key === expandedCategory);
  
  return (
    <section id="about" className="relative z-40 pt-0">
      <div className={`container relative mx-auto my-auto px-3 sm:px-6 py-4 sm:py-6 rounded-xl backdrop-blur-sm shadow-lg dark:shadow-none border ${
          isDark 
            ? 'bg-black/30 border-white/10'
            : 'bg-white/30 border-gray-300'
        }`}>
        
        {/* Section À propos de moi - style uniforme */}
        <AnimatedElement>
          <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-8">
            <div className={`${isDark ? 'bg-blue-900/50 text-blue-400' : 'bg-emerald-100 text-emerald-600'} p-1.5 sm:p-2 rounded-lg`}>
              <Code className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {t('aboutMe')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-10">
            {/* Carte de profil - côté gauche - RECONSTRUITE AVEC DIV SÉPARÉS POUR ÉVITER LES PROBLÈMES DE FLOU */}
            <div className="relative w-full aspect-square sm:aspect-[4/3]">
              {/* Face avant */}
              <div 
                className={`w-full h-full absolute inset-0 transition-all duration-500 ease-out cursor-pointer ${showBio ? 'opacity-0 rotate-y-180 pointer-events-none' : 'opacity-100 rotate-y-0'}`} 
                onClick={() => setShowBio(true)}
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className={`h-full rounded-2xl ${isDark ? 'bg-gray-900/70' : 'bg-white/70'} shadow-md border ${isDark ? 'border-gray-700/50' : 'border-gray-300/70'}`}>
                  <div className="flex flex-col items-center justify-center h-full relative py-4 sm:py-6">
                    <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-white overflow-hidden mb-3 sm:mb-5">
                      <img 
                        src="/images/profile/avatar.jpg" 
                        alt="Profile" 
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    
                    <h3 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-1 sm:mb-2 text-center`}>Yann Mostowski</h3>
                    <div className={`${isDark ? 'text-blue-300' : 'text-emerald-600'} text-center mb-3 sm:mb-5 text-sm sm:text-base`}>
                      Full-Stack Developer
                    </div>
                    
                    <div className="flex flex-col items-center gap-1.5 sm:gap-2 mb-8">
                      <div className={`flex items-center gap-1.5 sm:gap-2 ${isDark ? 'text-white/80' : 'text-gray-600'} text-xs sm:text-sm`}>
                        <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>1 {t('yearsExperience')}</span>
                      </div>
                      
                      <div className={`flex items-center gap-1.5 sm:gap-2 ${isDark ? 'text-white/80' : 'text-gray-600'} text-xs sm:text-sm`}>
                        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>{t('locationValue')}</span>
                      </div>
                      
                      <div className="flex gap-2 mt-1.5 sm:mt-2">
                        <span className={`${isDark ? 'bg-blue-600/20 text-blue-300' : 'bg-emerald-100 text-emerald-700'} px-2 py-0.5 rounded text-xs`}>Français</span>
                        <span className={`${isDark ? 'bg-blue-600/20 text-blue-300' : 'bg-emerald-100 text-emerald-700'} px-2 py-0.5 rounded text-xs`}>English B2</span>
                      </div>
                    </div>
                    
                    {/* Texte d'information centré */}
                    <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
                      <span className={`text-xs ${isDark ? 'text-white/90 bg-black/40' : 'text-gray-700 bg-gray-200/90'} px-2 py-0.5 rounded-full backdrop-blur-sm whitespace-nowrap shadow-sm`}>{t('clickForInfo')}</span>
                    </div>
                    
                    {/* Icône du curseur dans le coin */}
                    <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 pointer-events-none">
                      <div className="relative">
                        {/* Cercles d'ondes animés */}
                        <div className={`absolute -inset-3 sm:-inset-4 rounded-full border ${isDark ? 'border-white/20' : 'border-gray-700/20'} animate-ping`}></div>
                        <div className={`absolute -inset-2 sm:-inset-3 rounded-full border ${isDark ? 'border-white/30' : 'border-gray-700/30'} animate-ping`} style={{ animationDelay: '0.5s' }}></div>
                        <div className={`absolute -inset-1 sm:-inset-2 rounded-full border ${isDark ? 'border-white/40' : 'border-gray-700/40'} animate-ping`} style={{ animationDelay: '1s' }}></div>
                        
                        {/* Icône du curseur */}
                        <svg className={`w-5 h-5 sm:w-6 sm:h-6 relative cursor-animation ${isDark ? 'text-white' : 'text-gray-800'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path>
                          <path d="M13 13l6 6"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Face arrière */}
              <div 
                className={`w-full h-full absolute inset-0 transition-all duration-500 ease-out cursor-pointer ${showBio ? 'opacity-100 rotate-y-0' : 'opacity-0 rotate-y-180 pointer-events-none'}`} 
                onClick={() => setShowBio(false)}
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className={`h-full ${isDark ? 'bg-gray-900/70' : 'bg-white/70'} rounded-2xl shadow-md p-3 sm:p-5 flex flex-col border ${isDark ? 'border-gray-700/50' : 'border-gray-300/70'}`}>
                  <div className={`flex-1 overflow-auto ${isDark ? 'text-white/80' : 'text-gray-600'} custom-scrollbar text-xs sm:text-sm`}>
                    <p className="mb-3 sm:mb-5">
                      {t('personalDescription')}
                    </p>
                    
                    <div className={`p-2 sm:p-3 rounded-lg ${isDark ? 'border border-blue-600/30 bg-blue-600/10' : 'border border-emerald-200 bg-emerald-50'} mb-2 sm:mb-3`}>
                      <div className="flex items-start">
                        <GraduationCap className={`w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 ${isDark ? 'text-blue-400' : 'text-emerald-600'} mt-0.5 flex-shrink-0`} />
                        <div>
                          <div className={`font-medium ${isDark ? 'text-blue-300' : 'text-emerald-700'} text-xs sm:text-sm`}>{t('school42')}</div>
                          <div className={`text-xs ${isDark ? 'text-white/70' : 'text-gray-500'}`}>2023 - {t('presentTime')}</div>
                          <div className="text-xs mt-1">{t('school42Description')}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`p-2 sm:p-3 rounded-lg ${isDark ? 'border border-blue-600/30 bg-blue-600/10' : 'border border-emerald-200 bg-emerald-50'}`}>
                      <div className="flex items-start">
                        <GraduationCap className={`w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 ${isDark ? 'text-blue-400' : 'text-emerald-600'} mt-0.5 flex-shrink-0`} />
                        <div>
                          <div className={`font-medium ${isDark ? 'text-blue-300' : 'text-emerald-700'} text-xs sm:text-sm`}>{t('baccalaureate')}</div>
                          <div className={`text-xs ${isDark ? 'text-white/70' : 'text-gray-500'}`}>2022 - 2023</div>
                          <div className="text-xs mt-1">
                            {t('baccalaureateDescription')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`flex items-center justify-end ${isDark ? 'text-white/70' : 'text-gray-500'} pt-2 sm:pt-3 border-t ${isDark ? 'border-gray-700/50' : 'border-gray-300/70'} mt-2 sm:mt-3`}>
                    <div className={`${isDark ? 'text-blue-300' : 'text-emerald-600'} flex items-center text-xs sm:text-sm`}>
                      <span>{t('goBack')}</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Carte d'expérience - côté droit */}
            <div className={`rounded-2xl ${isDark ? 'bg-gray-900/70' : 'bg-white/70'} shadow-md p-3 sm:p-5 h-full border ${isDark ? 'border-gray-700/50' : 'border-gray-300/70'}`}>
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-5">
                <div className={`${isDark ? 'bg-blue-900/50 text-blue-400' : 'bg-emerald-100 text-emerald-600'} p-1 sm:p-1.5 rounded-lg`}>
                  <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <h3 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{t('experience')}</h3>
              </div>
              
              <div className="space-y-4 sm:space-y-6 relative">
                {/* Ligne verticale */}
                <div className={`absolute left-[7px] sm:left-[9px] top-2 bottom-0 w-0.5 ${isDark ? 'bg-blue-600/50' : 'bg-emerald-500/50'}`}></div>
                
                {/* Freelance Coding Instructor */}
                <div className="relative pl-5 sm:pl-7">
                  <div className={`absolute left-0 top-1 w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] rounded-full ${isDark ? 'border-2 border-gray-900 bg-blue-600' : 'border-2 border-white bg-emerald-500'} z-10`}></div>
                  <div className={`text-sm sm:text-base font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{t('codingInstructor')}</div>
                  <div className={`text-xs sm:text-sm ${isDark ? 'text-blue-400' : 'text-emerald-600'} mb-0.5 sm:mb-1`}>{t('magicMakers')}</div>
                  <div className={`text-xs ${isDark ? 'text-white/70' : 'text-gray-600'} space-y-0.5 sm:space-y-1`}>
                    <div>{t('instructorDesc1')}</div>
                    <div>{t('instructorDesc2')}</div>
                  </div>
                </div>
                
                {/* Freelance Web Developer */}
                <div className="relative pl-5 sm:pl-7">
                  <div className={`absolute left-0 top-1 w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] rounded-full ${isDark ? 'border-2 border-gray-900 bg-blue-600' : 'border-2 border-white bg-emerald-500'} z-10`}></div>
                  <div className={`text-sm sm:text-base font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{t('freelanceWebDev')}</div>
                  <div className={`text-xs sm:text-sm ${isDark ? 'text-blue-400' : 'text-emerald-600'} mb-0.5 sm:mb-1`}>{t('selfEmployed')}</div>
                  <div className={`text-xs ${isDark ? 'text-white/70' : 'text-gray-600'} space-y-0.5 sm:space-y-1`}>
                    <div>{t('freelanceDesc1')}</div>
                    <div>{t('freelanceDesc2')}</div>
                  </div>
                </div>
              </div>
              
              {/* Objectifs professionnels */}
              <div className={`mt-4 sm:mt-6 pt-3 sm:pt-5 border-t ${isDark ? 'border-gray-700/50' : 'border-gray-200'}`}>
                <div className={`text-xs sm:text-sm font-medium ${isDark ? 'text-blue-400' : 'text-emerald-600'} mb-1 sm:mb-2`}>{t('professionalGoals')}</div>
                <p className={`text-xs ${isDark ? 'text-white/80' : 'text-gray-600'}`}>
                  {t('goalsDescription')}
                </p>
              </div>
            </div>
          </div>
        </AnimatedElement>
        
        <AnimatedElement>
          <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-8">
            <div className={`${isDark ? 'bg-blue-900/50 text-blue-400' : 'bg-emerald-100 text-emerald-600'} p-1.5 sm:p-2 rounded-lg`}>
              <Layers className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {t('technologiesMastered')}
            </h2>
          </div>
        </AnimatedElement>
        
        {/* Section des compétences - NOUVELLE VERSION ADAPTÉE POUR MOBILE */}
        <div className="mb-8">
          <AnimatedElement>
            {/* Conteneur principal */}
            <div className={`rounded-xl overflow-hidden shadow-lg ${
              isDark 
                ? 'bg-gray-900/50 border border-gray-800/50 backdrop-blur-sm'
                : 'bg-white/50 border border-gray-200/50 backdrop-blur-sm'
            }`}>
              {/* Version Desktop: Affichage sous forme d'onglets */}
              {!isMobile && (
                <>
                  {/* Barre de navigation des catégories - VERSION DESKTOP */}
                  <div className={`flex flex-wrap ${
                    isDark 
                      ? 'bg-gray-800/80 border-gray-700/50'
                      : 'bg-white/80 border-gray-200/50'
                  } border rounded-t-xl p-1.5`}>
                    {skills.map((skill) => {
                      const isSelected = expandedCategory === skill.key;
                      return (
                        <button
                          key={skill.key} 
                          ref={el => categoryRefs.current[skill.key] = el}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg m-1 transition-all ${
                            isSelected
                              ? isDark 
                                ? `bg-gradient-to-r ${skill.darkGradient} text-white shadow-md` 
                                : `bg-gradient-to-r ${skill.lightGradient} text-white shadow-md`
                              : isDark 
                                ? 'hover:bg-gray-700/50 text-gray-300'
                                : 'hover:bg-gray-100/50 text-gray-700'
                          }`}
                          onClick={() => toggleCategory(skill.key)}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? 'bg-white/20'
                              : isDark 
                                ? `bg-gradient-to-r ${skill.darkGradient} text-white`
                                : `bg-gradient-to-r ${skill.lightGradient} text-white`
                          }`}>
                            {skill.icon}
                          </div>
                          <span className="font-medium">{t(skill.key)}</span>
                          <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
                            isSelected ? 'rotate-90' : ''
                          }`} />
                        </button>
                      );
                    })}
                  </div>
                  
                  {/* Zone de contenu - VERSION DESKTOP */}
                  <div 
                    ref={contentRef}
                    className={`border border-t-0 ${
                      isDark 
                        ? 'border-gray-800/50 bg-gray-900/30'
                        : 'border-gray-200/50 bg-white/30'
                    } rounded-b-xl overflow-hidden backdrop-blur-sm`}
                  >
                    {expandedCategory && selectedCategory ? (
                      <div className="p-6 md:p-8">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} flex items-center gap-2`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              isDark 
                                ? `bg-gradient-to-r ${selectedCategory.darkGradient} text-white`
                                : `bg-gradient-to-r ${selectedCategory.lightGradient} text-white`
                            }`}>
                              {selectedCategory.icon}
                            </div>
                            {t(selectedCategory.key)}
                          </h3>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                            isDark
                              ? 'bg-blue-600/20 text-blue-300'
                              : 'bg-emerald-600/20 text-emerald-700'
                          }`}>
                            {selectedCategory.techs.length} {selectedCategory.techs.length > 1 ? t('technologiesPlural') : t('technologiesSingular')}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {selectedCategory && selectedCategory.techs.map((tech, i) => (
                            <div 
                              key={tech.name} 
                              className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border`}
                              style={{
                                animation: `fadeInUp 0.5s ease forwards ${0.1 + i * 0.1}s`,
                                opacity: 0,
                                transform: 'translateY(20px)'
                              }}
                            >
                              {/* En-tête avec dégradé */}
                              <div className={`h-2 w-full bg-gradient-to-r ${
                                isDark 
                                  ? selectedCategory.darkGradient
                                  : selectedCategory.lightGradient
                              }`} />
                              
                              {/* Contenu */}
                              <div className="p-5">
                                <div className="flex justify-between items-center mb-3">
                                  <h4 className={`font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'} text-lg`}>{tech.name}</h4>
                                  <SkillLevel 
                                    level={tech.level} 
                                    lightColor={selectedCategory.lightColor}
                                    darkColor={selectedCategory.darkColor}
                                  />
                                </div>
                                
                                {/* Description de l'expérience */}
                                <div className="space-y-2">
                                  <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                    <div className="flex items-start gap-2">
                                      <div className={`w-2 h-2 rounded-full mt-2 ${
                                        isDark ? 'bg-blue-400' : 'bg-emerald-500'
                                      }`} />
                                      <div>
                                        <span className="font-medium">{t('exploration')}</span>
                                        <p className="text-xs mt-1">{tech.experience}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-4 p-12 text-center">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                          isDark 
                            ? 'bg-blue-600/20 text-blue-300'
                            : 'bg-emerald-600/20 text-emerald-700'
                        }`}>
                          <Layers className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-2`}>{t('exploreSkills')}</h3>
                          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-md`}>
                            {t('selectCategory')}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
              
              {/* Version Mobile: Affichage sous forme d'accordéon */}
              {isMobile && (
                <div className="p-3">
                  {skills.map((skill) => {
                    const isSelected = expandedCategory === skill.key;
                    return (
                      <div 
                        key={skill.key}
                        className={`mb-2 rounded-lg overflow-hidden ${
                          isDark 
                            ? 'bg-gray-800/80 border border-gray-700/50'
                            : 'bg-white/80 border border-gray-200/50'
                        }`}
                      >
                        {/* Entête de l'accordéon */}
                        <button
                          onClick={() => toggleCategory(skill.key)}
                          className={`w-full flex items-center justify-between p-3 ${
                            isSelected
                              ? isDark 
                                ? `bg-gradient-to-r ${skill.darkGradient} text-white` 
                                : `bg-gradient-to-r ${skill.lightGradient} text-white`
                              : ''
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                              isSelected
                                ? 'bg-white/20'
                                : isDark 
                                  ? `bg-gradient-to-r ${skill.darkGradient} text-white`
                                  : `bg-gradient-to-r ${skill.lightGradient} text-white`
                            }`}>
                              {skill.icon}
                            </div>
                            <span className={`font-medium text-sm ${
                              isSelected 
                                ? 'text-white' 
                                : isDark 
                                  ? 'text-gray-200' 
                                  : 'text-gray-700'
                            }`}>{t(skill.key)}</span>
                          </div>
                          {isSelected ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>
                        
                        {/* Contenu de l'accordéon */}
                        {isSelected && skill && skill.techs.map((tech) => (
                          <div 
                            key={tech.name}
                            className={`p-3 border-t ${
                              isDark 
                                ? 'border-gray-700/50'
                                : 'border-gray-200/50'
                            }`}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <h4 className={`font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'} text-sm`}>{tech.name}</h4>
                              <SkillLevel 
                                level={tech.level} 
                                lightColor={skill.lightColor}
                                darkColor={skill.darkColor}
                              />
                            </div>
                            <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                              {tech.experience}
                            </p>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}

// Ajouter ces styles personnalisés à la feuille de style CSS
const styleElement = document.createElement('style');
styleElement.textContent = `
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes growWidth {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

@keyframes clickHint {
  0% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 0.8;
    transform: scale(1);
  }
}

@keyframes cursorClick {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.92);
  }
}

.cursor-animation {
  animation: cursorClick 1.5s infinite ease-in-out;
}

.click-hint {
  animation: clickHint 2s infinite ease-in-out;
}

.tech-card {
  opacity: 0;
  transform: translateY(20px);
}

/* Styles pour l'animation de la carte */
.rotate-y-0 {
  transform: rotateY(0deg);
}

.rotate-y-180 {
  transform: rotateY(180deg);
}

/* Barre de défilement personnalisée */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
`;
document.head.appendChild(styleElement);