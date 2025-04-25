import { Code, Database, Terminal, Server, Cpu, Layers, BarChart, ArrowRight, MapPin, Award, GraduationCap, FileDown, Mail, ExternalLink } from 'lucide-react';
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

const skills: SkillCategory[] = [
  {
    key: 'frontEnd',
    icon: <Code className="w-5 h-5 text-white" />,
    techs: [
      { name: "TypeScript", experience: "I built a web app using it.", level: 2 },
      { name: "JavaScript", experience: "I mostly use it on the backend with Node.js and Next.js, but I know the language.", level: 2 },
      { name: "React", experience: "All my recent projects, including this portfolio, are built with it.", level: 3 },
      { name: "HTML/CSS", experience: "I learned it in college and still apply these concepts today.", level: 3 },
      { name: "TailwindCSS", experience: "I use it in all my web projects and find it very useful.", level: 3 },      
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
      { name: "Node.js", experience: "I've built a web app using it.", level: 2 },
      { name: "Next.js", experience: "I use it for all my web projects and find it very useful.", level: 2 },
      { name: "Python", experience: "I've learned it in college and i've done a lot of projects with it but nothing related to web development.", level: 3 }
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
      { name: "C", experience: "It's the first language we learn at 42 school and there is a lot of projects that use it.", level: 3 },
      { name: "C++", experience: "It's the second language we learn at 42 school and there is a lot of projects that use it.", level: 3 }
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
      { name: "Docker", experience: "Used in 2 projects and i really like it.", level: 2 },
      { name: "Git", experience: "Since i'm at 42 school, i use it for all my projects.", level: 3 },
      { name: "Linux", experience: "I like this OS and i use it a lot.", level: 3 }
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
      { name: "SQLite", experience: "Used in a lot of my projects.", level: 2 },
      { name: "MariaDB", experience: "Used in 1 project.", level: 1 }
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
      { name: "Bash", experience: "I use it for all my projects.", level: 3 },
      { name: "n8n", experience: "I've used it a few times recently in my web projects.", level: 1 }
    ],
    lightGradient: "from-emerald-600 via-green-500 to-emerald-400",
    darkGradient: "from-blue-700 to-indigo-800",
    lightColor: "bg-emerald-500",
    darkColor: "bg-blue-700"
  }
];

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
  
  // Conversion du niveau numérique en description qualitative
  const getLevelLabel = (level: number) => {
    switch(level) {
      case 1: return "Débutant";
      case 2: return "Intermédiaire";
      case 3: return "Avancé";
      case 4: return "Expert";
      case 5: return "Maîtrise";
      default: return "Intermédiaire";
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
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const { isDark } = useTheme();
  const categoryRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const contentRef = useRef<HTMLDivElement>(null);
  const [showBio, setShowBio] = useState(false);
  
  const toggleCategory = (key: string) => {
    setExpandedCategory(expandedCategory === key ? null : key);
    
    // Faire défiler jusqu'au contenu si on ouvre une catégorie
    if (expandedCategory !== key && contentRef.current) {
      setTimeout(() => {
        contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  };
  
  const selectedCategory = skills.find(s => s.key === expandedCategory);
  
  return (
    <section id="about" className="relative z-40">
      <div className="container relative mx-auto px-6 py-6 rounded-xl bg-white/30 dark:bg-black/30 backdrop-blur-sm shadow-lg dark:shadow-none border border-gray-300 dark:border-white/10">
        
        {/* Section À propos de moi - style uniforme */}
        <AnimatedElement>
          <div className="mb-4">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t('aboutMe')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            {/* Carte de profil - côté gauche */}
            <div className="flip-card-container cursor-pointer aspect-[4/3] w-full h-full" onClick={() => setShowBio(!showBio)}>
              <div className={`flip-card ${showBio ? 'flipped' : ''}`}>
                
                {/* Recto - Photo et infos de base */}
                <div className="flip-card-front">
                  <div className={`h-full rounded-2xl ${isDark ? 'bg-gray-900' : 'bg-white'} shadow-md overflow-hidden border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                    <div className="flex flex-col items-center justify-center h-full relative py-6">
                      <div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden mb-5">
                        <img 
                          src="/images/profile/avatar.jpg" 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-2 text-center`}>Yann Mostowski</h3>
                      <div className={`${isDark ? 'text-blue-300' : 'text-emerald-600'} text-center mb-5`}>
                        Full-Stack Developer
                      </div>
                      
                      <div className="flex flex-col items-center gap-2">
                        <div className={`flex items-center gap-2 ${isDark ? 'text-white/80' : 'text-gray-600'} text-sm`}>
                          <Award className="w-4 h-4" />
                          <span>1 {t('yearsExperience')}</span>
                        </div>
                        
                        <div className={`flex items-center gap-2 ${isDark ? 'text-white/80' : 'text-gray-600'} text-sm`}>
                          <MapPin className="w-4 h-4" />
                          <span>{t('locationValue')}</span>
                        </div>
                        
                        <div className="flex gap-2 mt-2">
                          <span className={`${isDark ? 'bg-blue-600/20 text-blue-300' : 'bg-emerald-100 text-emerald-700'} px-2 py-0.5 rounded text-xs`}>Français</span>
                          <span className={`${isDark ? 'bg-blue-600/20 text-blue-300' : 'bg-emerald-100 text-emerald-700'} px-2 py-0.5 rounded text-xs`}>English</span>
                        </div>
                      </div>
                      
                      {/* Icône du curseur dans le coin */}
                      <div className="absolute bottom-4 right-4 pointer-events-none">
                        <div className="relative">
                          {/* Cercles d'ondes animés */}
                          <div className={`absolute -inset-4 rounded-full border ${isDark ? 'border-white/20' : 'border-gray-700/20'} animate-ping`}></div>
                          <div className={`absolute -inset-3 rounded-full border ${isDark ? 'border-white/30' : 'border-gray-700/30'} animate-ping`} style={{ animationDelay: '0.5s' }}></div>
                          <div className={`absolute -inset-2 rounded-full border ${isDark ? 'border-white/40' : 'border-gray-700/40'} animate-ping`} style={{ animationDelay: '1s' }}></div>
                          
                          {/* Icône du curseur */}
                          <svg className={`w-6 h-6 relative z-10 cursor-animation ${isDark ? 'text-white' : 'text-gray-800'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path>
                            <path d="M13 13l6 6"></path>
                          </svg>
                        </div>
                      </div>
                      
                      {/* Texte d'information centré */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
                        <span className={`text-xs ${isDark ? 'text-white/80 bg-black/20' : 'text-gray-700 bg-gray-200/70'} px-2 py-0.5 rounded-full backdrop-blur-sm whitespace-nowrap`}>Cliquez pour plus d'infos</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Verso - Biographie détaillée */}
                <div className="flip-card-back">
                  <div className={`h-full ${isDark ? 'bg-gray-900' : 'bg-white'} rounded-2xl shadow-md p-5 flex flex-col border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                    <div className={`flex-1 overflow-auto ${isDark ? 'text-white/80' : 'text-gray-600'} custom-scrollbar`}>
                      <p className="mb-5">
                        {t('personalDescription')}
                      </p>
                      
                      <div className={`p-3 rounded-lg ${isDark ? 'border border-blue-600/30 bg-blue-600/10' : 'border border-emerald-200 bg-emerald-50'} mb-3`}>
                        <div className="flex items-start">
                          <GraduationCap className={`w-5 h-5 mr-2 ${isDark ? 'text-blue-400' : 'text-emerald-600'} mt-0.5 flex-shrink-0`} />
                          <div>
                            <div className={`font-medium ${isDark ? 'text-blue-300' : 'text-emerald-700'}`}>École 42</div>
                            <div className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-500'}`}>2023 - Présent</div>
                            <div className="text-sm mt-1">{t('school42Description')}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`p-3 rounded-lg ${isDark ? 'border border-blue-600/30 bg-blue-600/10' : 'border border-emerald-200 bg-emerald-50'}`}>
                        <div className="flex items-start">
                          <GraduationCap className={`w-5 h-5 mr-2 ${isDark ? 'text-blue-400' : 'text-emerald-600'} mt-0.5 flex-shrink-0`} />
                          <div>
                            <div className={`font-medium ${isDark ? 'text-blue-300' : 'text-emerald-700'}`}>Baccalauréat Général</div>
                            <div className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-500'}`}>2022 - 2023</div>
                            <div className="text-sm mt-1">
                              Spécialités Mathématiques et Informatique<br/>
                              Lycée Jean Pierre Timbaud
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`flex items-center justify-end ${isDark ? 'text-white/70' : 'text-gray-500'} pt-3 border-t ${isDark ? 'border-white/10' : 'border-gray-200'} mt-3`}>
                      <div className={`${isDark ? 'text-blue-300' : 'text-emerald-600'} flex items-center text-sm`}>
                        <span>Retourner</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Carte d'expérience - côté droit */}
            <div className={`rounded-2xl ${isDark ? 'bg-gray-900' : 'bg-white'} shadow-md p-5 h-full border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
              <div className="flex items-center gap-3 mb-5">
                <div className={`${isDark ? 'bg-blue-900/50 text-blue-400' : 'bg-emerald-100 text-emerald-600'} p-1.5 rounded-lg`}>
                  <Award className="w-4 h-4" />
                </div>
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{t('experience')}</h3>
              </div>
              
              <div className="space-y-6 relative">
                {/* Ligne verticale */}
                <div className={`absolute left-[9px] top-2 bottom-0 w-0.5 ${isDark ? 'bg-blue-600/50' : 'bg-emerald-500/50'}`}></div>
                
                {/* Freelance Coding Instructor */}
                <div className="relative pl-7">
                  <div className={`absolute left-0 top-1 w-[16px] h-[16px] rounded-full ${isDark ? 'border-2 border-gray-900 bg-blue-600' : 'border-2 border-white bg-emerald-500'} z-10`}></div>
                  <div className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Freelance Coding Instructor</div>
                  <div className={`text-sm ${isDark ? 'text-blue-400' : 'text-emerald-600'} mb-1`}>Magic Makers – Remote & On-Site (Paris) • 2024 - Présent</div>
                  <div className={`text-xs ${isDark ? 'text-white/70' : 'text-gray-600'} space-y-1`}>
                    <div>• Teach web development, Python, and Unity basics to teenagers</div>
                    <div>• Conduct workshops both online and in-person</div>
                  </div>
                </div>
                
                {/* Freelance Web Developer */}
                <div className="relative pl-7">
                  <div className={`absolute left-0 top-1 w-[16px] h-[16px] rounded-full ${isDark ? 'border-2 border-gray-900 bg-blue-600' : 'border-2 border-white bg-emerald-500'} z-10`}></div>
                  <div className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Freelance Web Developer</div>
                  <div className={`text-sm ${isDark ? 'text-blue-400' : 'text-emerald-600'} mb-1`}>Self-employed – Remote • 2024 - Présent</div>
                  <div className={`text-xs ${isDark ? 'text-white/70' : 'text-gray-600'} space-y-1`}>
                    <div>• Develop websites and web applications for small clients</div>
                    <div>• Use modern web technologies like TypeScript, React, Node.js and Docker</div>
                  </div>
                </div>
              </div>
              
              {/* Objectifs professionnels */}
              <div className={`mt-6 pt-5 border-t ${isDark ? 'border-gray-700/50' : 'border-gray-200'}`}>
                <div className={`text-sm font-medium ${isDark ? 'text-blue-400' : 'text-emerald-600'} mb-2`}>Objectifs professionnels</div>
                <p className={`text-xs ${isDark ? 'text-white/80' : 'text-gray-600'}`}>
                  Développer mes compétences en développement full-stack et participer à des projets innovants.
                </p>
              </div>
            </div>
          </div>
        </AnimatedElement>
        
        <AnimatedElement>
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('technologiesMastered')}
            </h2>
            <p className="text-gray-700 dark:text-gray-400 text-lg max-w-2xl">
              {t('aboutDescription')}
            </p>
          </div>
        </AnimatedElement>
        
        {/* Section des compétences - redesign amélioré */}
        <div className="mb-8">
          <AnimatedElement>
            {/* Conteneur principal */}
            <div className="rounded-xl overflow-hidden shadow-lg">
              {/* Barre de navigation des catégories */}
              <div className={`flex flex-wrap ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-t-xl p-1.5`}>
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
                            ? 'hover:bg-gray-700 text-gray-300'
                            : 'hover:bg-gray-100 text-gray-700'
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
              
              {/* Zone de contenu */}
              <div 
                ref={contentRef}
                className={`border border-t-0 ${isDark ? 'border-gray-700' : 'border-gray-200'} rounded-b-xl overflow-hidden ${
                  expandedCategory 
                    ? isDark 
                      ? 'bg-gradient-to-br from-gray-800 to-gray-900'
                      : 'bg-gradient-to-br from-white to-gray-100'
                    : isDark
                      ? 'bg-gray-800'
                      : 'bg-white'
                }`}
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
                        {selectedCategory.techs.length} {selectedCategory.techs.length > 1 ? 'technologies' : 'technologie'}
                  </div>
                </div>
                
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {selectedCategory.techs.map((tech, i) => (
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
                            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>{tech.experience}</p>
                            
                            {/* Barre de progression avec contexte */}
                            <div className="space-y-2">
                              <div className="flex justify-between items-center text-xs">
                                <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Niveau de maîtrise</span>
                                <span className={`font-medium ${
                                  isDark 
                                    ? 'text-blue-300' 
                                    : 'text-emerald-600'
                                }`}>
                                  {Math.round((tech.level / 5) * 100)}%
                                </span>
                              </div>
                              <div className={`relative h-2 w-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                                <div 
                                  className={`absolute top-0 left-0 h-full rounded-full ${
                                    isDark 
                                      ? `bg-gradient-to-r ${selectedCategory.darkGradient}` 
                                      : `bg-gradient-to-r ${selectedCategory.lightGradient}`
                                  }`}
                                  style={{ 
                                    width: `${(tech.level / 5) * 100}%`,
                                    animation: `growWidth 1.5s cubic-bezier(0.26, 0.86, 0.44, 0.985) forwards ${0.3 + i * 0.1}s`,
                                  }}
                                />
                              </div>
                              
                              {/* Échelle de compétence */}
                              <div className="flex justify-between pt-1 px-1">
                                <span className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Débutant</span>
                                <span className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Intermédiaire</span>
                                <span className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Maîtrise</span>
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
                      <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-2`}>Explorez mes compétences</h3>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-md`}>
                        Sélectionnez une catégorie dans la barre ci-dessus pour découvrir mes compétences techniques et mon niveau d'expérience
                      </p>
            </div>
                </div>
                )}
                </div>
                </div>
              </AnimatedElement>
            </div>
      </div>
    </section>
  );
}

// Style pour les animations
const styleElement = document.createElement('style');
styleElement.textContent = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes growWidth {
  from {
    width: 0%;
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

/* Styles pour la carte qui se retourne */
.flip-card-container {
  width: 100%;
  height: 100%;
  perspective: 1000px;
}

.flip-card {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-card.flipped {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-front {
  z-index: 1;
}

.flip-card-back {
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