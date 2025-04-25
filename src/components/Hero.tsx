import { Github, Terminal, Code, Braces, MousePointer, ChevronsRight, Sparkles, Waves } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { AnimationType, BackgroundAnimation, getAnimationCode } from './HeroAnimations';
import { AnimationControls } from './AnimationControls';

const skills = ['TypeScript', 'React', 'Node.js', 'C++', 'Docker', 'Git'];

// Exemples de code guidés avec des animations - utilisés avec useMemo pour éviter les re-créations
const getCodeExamples = (isDark: boolean) => [
  {
    title: 'Animation React',
    language: 'tsx',
    code: `import { motion } from 'framer-motion';

export const FadeIn = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      Hello World!
    </motion.div>
  );
}`,
    output: `> Animation rendue avec succès !
> Élément apparaît en fondu (0% -> 100% d'opacité)`,
    previewComponent: (isDark: boolean) => (
      <div className="mt-2 p-2 rounded bg-gray-100 dark:bg-gray-800">
        <div className="h-16 w-full flex items-center justify-center">
          <div className="animate-fadeIn text-sm">
          Hello World!
          </div>
        </div>
      </div>
    )
  },
  {
    title: 'Bouton Interactif',
    language: 'tsx',
    code: `import { useState } from 'react';

export const PulseButton = () => {
  const [count, setCount] = useState(0);
  
  return (
    <button 
      onClick={() => setCount(count + 1)}
      className="px-4 py-2 bg-blue-500 
                text-white rounded-md 
                hover:bg-blue-600 
                active:scale-95 transition-all"
    >
      Clics: {count}
    </button>
  );
}`,
    output: `> Bouton interactif créé !
> Compteur: 1 (après un clic)`,
    previewComponent: (isDark: boolean) => (
      <div className="mt-2 p-2 rounded bg-gray-100 dark:bg-gray-800">
        <div className="h-16 w-full flex items-center justify-center">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 active:scale-95 transition-all animate-pulse">
          Clics: 1
        </button>
        </div>
      </div>
    )
  },
  {
    title: 'Carte avec Hover',
    language: 'tsx',
    code: `export const HoverCard = () => {
  return (
    <div className="max-w-xs p-4 bg-white 
                   rounded-lg shadow-md 
                   hover:shadow-lg 
                   hover:scale-105 
                   transition-all duration-300">
      <h3 className="text-lg font-bold">
        Titre de la carte
      </h3>
      <p className="text-gray-600">
        Description de la carte avec effet de survol.
      </p>
    </div>
  );
}`,
    output: `> Carte avec effet de survol créée !
> L'effet s'active au passage de la souris`,
    previewComponent: (isDark: boolean) => (
      <div className="mt-2 p-2 rounded bg-gray-100 dark:bg-gray-800">
        <div className="h-16 w-full flex items-center justify-center">
          <div className={`p-3 ${isDark ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-left transform hover:scale-105`}>
            <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Titre de la carte</h3>
            <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Effet de survol</p>
          </div>
        </div>
      </div>
    )
  },
  {
    title: 'Animation de fond',
    language: 'js',
    code: `// Animation de particules
const particles = [];
const particleCount = 50;

// Créer les particules
for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 1,
    color: isDark 
      ? \`hsl(\${Math.random() * 60 + 220}, 100%, 70%)\`
      : \`hsl(\${Math.random() * 40 + 180}, 100%, 70%)\`,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.5,
    opacity: Math.random() * 0.5 + 0.2
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Mettre à jour et dessiner chaque particule
  for (const p of particles) {
    p.x += p.speedX;
    p.y += p.speedY;
    
    // Rebondir sur les bords
    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    
    // Dessiner la particule
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  }
  
  requestAnimationFrame(animate);
}

animate();`,
    output: `> Animation de fond en cours d'exécution
> Régénération des particules selon le thème actif`,
    previewComponent: (isDark: boolean) => (
      <div className="mt-2 p-2 rounded bg-gray-100 dark:bg-gray-800">
        <div className="h-16 w-full flex items-center justify-center">
        <div className="text-sm">
          {isDark ? "Particules bleues-violettes en mouvement" : "Particules turquoise-vertes en mouvement"}
          </div>
        </div>
      </div>
    )
  }
];

// Classe pour l'animation Matrix
class Symbol {
  x: number;
  y: number;
  fontSize: number;
  text: string;
  canvasHeight: number;
  color: string;
  speed: number;
  opacity: number;
  
  constructor(x: number, y: number, fontSize: number, canvasHeight: number, isDark: boolean) {
    this.x = x;
    this.y = Math.random() * canvasHeight;
    this.fontSize = fontSize;
    this.canvasHeight = canvasHeight;
    this.color = isDark 
      ? `rgba(99, 102, 241, ${Math.random() * 0.4 + 0.6})` // Indigo pour le dark mode
      : `rgba(20, 184, 166, ${Math.random() * 0.4 + 0.6})`;  // Teal pour le light mode
    this.text = String.fromCharCode(
      Math.floor(Math.random() * 93) + 33
    );
    this.speed = Math.random() * 5 + 3;
    this.opacity = Math.random() * 0.8 + 0.2;
  }
  
  update() {
    if (this.y > this.canvasHeight) {
      this.y = 0;
    } else {
      this.y += this.speed;
    }
    
    // Changer le caractère aléatoirement
    if (Math.random() > 0.95) {
      this.text = String.fromCharCode(
        Math.floor(Math.random() * 93) + 33
      );
    }
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color.replace(')', `, ${this.opacity})`);
    ctx.font = `${this.fontSize}px monospace`;
    ctx.fillText(this.text, this.x, this.y);
  }
}

export function Hero() {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  // Memoize code examples to avoid recreations on each render
  const codeExamples = useMemo(() => getCodeExamples(isDark), [isDark]);
  
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [currentCodeIndex, setCurrentCodeIndex] = useState(0);
  const [codeOutput, setCodeOutput] = useState('');
  const [isTypingCode, setIsTypingCode] = useState(false);
  const [isShowingPreview, setIsShowingPreview] = useState(false);
  const [animationType, setAnimationType] = useState<AnimationType>('flow');
  const [showingBackgroundCode, setShowingBackgroundCode] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const animationTimeoutRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  // Fonction d'aide pour annuler tous les timers en cours
  const clearAllTimeouts = useCallback(() => {
    if (animationTimeoutRef.current !== null) {
      clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }
    
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  // Typing effect for skill demonstration
  useEffect(() => {
    const currentSkill = skills[currentSkillIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentSkill.substring(0, displayText.length + 1));
        setTypingSpeed(100);
        
        if (displayText.length === currentSkill.length) {
          setIsDeleting(true);
          setTypingSpeed(1000); // Pause before deleting
        }
      } else {
        setDisplayText(currentSkill.substring(0, displayText.length - 1));
        setTypingSpeed(50);
        
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentSkillIndex((prevIndex) => (prevIndex + 1) % skills.length);
        }
      }
    }, typingSpeed);
    
    return () => clearTimeout(timer);
  }, [currentSkillIndex, displayText, isDeleting, typingSpeed]);
  
  // Type code example with animation - using useCallback to avoid recreation
  const startCodeDemo = useCallback(() => {
    // Éviter les animations superposées
    if (isProcessing) return;
    
    clearAllTimeouts();
    setIsProcessing(true);
    setIsTypingCode(true);
    setIsShowingPreview(false);
    setCodeOutput('');
    setShowingBackgroundCode(false);
    
    // Approche optimisée pour l'écriture de code
    const currentExample = codeExamples[currentCodeIndex];
    
    // On utilise requestAnimationFrame pour une meilleure synchronisation
    let typedCode = '';
    const codeLines = currentExample.code.split('\n');
    let currentLine = 0;
    let charIndex = 0;
    let lastFrameTime = 0;
    const typingInterval = 8; // Millisecondes entre chaque caractère
    
    const typeCodeFrame = (timestamp: number) => {
      if (!lastFrameTime) lastFrameTime = timestamp;
      
      const elapsed = timestamp - lastFrameTime;
      
      if (elapsed >= typingInterval) {
      if (currentLine < codeLines.length) {
        const line = codeLines[currentLine];
        
        if (charIndex < line.length) {
          typedCode += line[charIndex];
          setCodeOutput(typedCode);
          charIndex++;
            lastFrameTime = timestamp;
        } else {
          typedCode += '\n';
          setCodeOutput(typedCode);
          currentLine++;
          charIndex = 0;
            lastFrameTime = timestamp;
        }
          
          animationFrameRef.current = requestAnimationFrame(typeCodeFrame);
      } else {
        // Show result after typing code
          animationTimeoutRef.current = window.setTimeout(() => {
          setCodeOutput(prev => prev + '\n\n' + currentExample.output);
            animationTimeoutRef.current = window.setTimeout(() => {
            setIsTypingCode(false);
            setIsShowingPreview(true);
            setIsProcessing(false);
        }, 300);
          }, 200);
        }
      } else {
        animationFrameRef.current = requestAnimationFrame(typeCodeFrame);
      }
    };
    
    animationFrameRef.current = requestAnimationFrame(typeCodeFrame);
  }, [clearAllTimeouts, codeExamples, currentCodeIndex, isProcessing]);
  
  // Animation de fond - using useCallback to avoid recreation
  const showBackgroundAnimationCode = useCallback((type: AnimationType) => {
    // Interrompre toute animation en cours
    clearAllTimeouts();
    
    // Mettre à jour immédiatement le type d'animation
    setAnimationType(type);
    
    // Mettre à jour l'état
    setIsProcessing(true);
    setShowingBackgroundCode(true);
    setIsTypingCode(true);
    setIsShowingPreview(false);
    setCodeOutput('');
    
    // Afficher le code de l'animation de fond avec requestAnimationFrame
    const animationCode = getAnimationCode(type);
    let typedCode = '';
    const codeLines = animationCode.split('\n');
    let currentLine = 0;
    let charIndex = 0;
    let lastFrameTime = 0;
    const typingInterval = 5; // Plus rapide pour le code d'animation
    
    const typeCodeFrame = (timestamp: number) => {
      if (!lastFrameTime) lastFrameTime = timestamp;
      
      const elapsed = timestamp - lastFrameTime;
      
      if (elapsed >= typingInterval) {
      if (currentLine < codeLines.length) {
        const line = codeLines[currentLine];
        
        if (charIndex < line.length) {
          typedCode += line[charIndex];
          setCodeOutput(typedCode);
          charIndex++;
            lastFrameTime = timestamp;
        } else {
          typedCode += '\n';
          setCodeOutput(typedCode);
          currentLine++;
          charIndex = 0;
            lastFrameTime = timestamp;
        }
          
          animationFrameRef.current = requestAnimationFrame(typeCodeFrame);
      } else {
        // Show result after typing code
          animationTimeoutRef.current = window.setTimeout(() => {
          setCodeOutput(prev => prev + '\n\n' + `> Animation de fond "${type}" activée\n> Adaptation au thème ${isDark ? 'sombre' : 'clair'}`);
            animationTimeoutRef.current = window.setTimeout(() => {
            setIsTypingCode(false);
            setIsShowingPreview(true);
            setIsProcessing(false);
        }, 200);
          }, 100);
        }
      } else {
        animationFrameRef.current = requestAnimationFrame(typeCodeFrame);
      }
    };
    
    animationFrameRef.current = requestAnimationFrame(typeCodeFrame);
  }, [clearAllTimeouts, isDark]);
  
  // Passer à l'exemple de code suivant - using useCallback to avoid recreation
  const nextCodeExample = useCallback(() => {
    // Interrompre toute animation en cours
    clearAllTimeouts();
    
    // Mettre à jour l'état
    setIsProcessing(true);
    setShowingBackgroundCode(false);
    setIsTypingCode(true);
    setIsShowingPreview(false);
    setCodeOutput('');
    
    // Passer à l'exemple de code suivant
    setCurrentCodeIndex(prevIndex => {
      const newIndex = (prevIndex + 1) % codeExamples.length;
      
      // Récupérer le code de l'exemple en utilisant le nouvel index
      const codeExample = codeExamples[newIndex];
      let typedCode = '';
      const codeLines = codeExample.code.split('\n');
      let currentLine = 0;
      let charIndex = 0;
      let lastFrameTime = 0;
      const typingInterval = 8;
      
      const typeCodeFrame = (timestamp: number) => {
        if (!lastFrameTime) lastFrameTime = timestamp;
        
        const elapsed = timestamp - lastFrameTime;
        
        if (elapsed >= typingInterval) {
          if (currentLine < codeLines.length) {
            const line = codeLines[currentLine];
            
            if (charIndex < line.length) {
              typedCode += line[charIndex];
              setCodeOutput(typedCode);
              charIndex++;
              lastFrameTime = timestamp;
            } else {
              typedCode += '\n';
              setCodeOutput(typedCode);
              currentLine++;
              charIndex = 0;
              lastFrameTime = timestamp;
            }
            
            animationFrameRef.current = requestAnimationFrame(typeCodeFrame);
          } else {
            // Show result after typing code
            animationTimeoutRef.current = window.setTimeout(() => {
              setCodeOutput(prev => prev + '\n\n' + codeExample.output);
              animationTimeoutRef.current = window.setTimeout(() => {
                setIsTypingCode(false);
                setIsShowingPreview(true);
                setIsProcessing(false);
              }, 200);
    }, 100);
          }
        } else {
          animationFrameRef.current = requestAnimationFrame(typeCodeFrame);
        }
      };
      
      animationFrameRef.current = requestAnimationFrame(typeCodeFrame);
      
      return newIndex;
    });
  }, [clearAllTimeouts, codeExamples]);
  
  // Start demo on initial load - reduced frequency of updates
  useEffect(() => {
    const timer = setTimeout(() => {
      startCodeDemo();
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      clearAllTimeouts();
    };
  }, [startCodeDemo, clearAllTimeouts]);
  
  // Change code example - optimized with useCallback and the debounce pattern
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [codeOutput]);
  
  // Nettoyage lors du démontage du composant
  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);
  
  return (
    <section 
      id="home" 
      className="relative flex justify-center items-center min-h-screen py-20 pt-28"
    >
      {/* Animation de fond en position fixed pour couvrir toute la page */}
      <BackgroundAnimation type={animationType} />
      
      {/* Conteneur de contenu avec fond légèrement opaque pour contraste */}
      <div className="container relative mx-auto px-6 py-12 md:py-24 z-30 rounded-xl bg-white/30 dark:bg-black/30 backdrop-blur-sm shadow-lg dark:shadow-none border border-gray-300 dark:border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 dark:from-slate-800 dark:via-blue-900 dark:to-slate-900 h-1.5 w-24 mb-8 rounded-full"></div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="block">Welcome to my portfolio</span>
              <span className="text-transparent text-5xl bg-clip-text bg-gradient-to-r from-emerald-500 to-green-600 dark:from-blue-700 dark:to-slate-600">Full-Stack Developer</span>
            </h1>
            
            <p className="text-gray-700 dark:text-gray-400 text-lg md:text-xl mb-8 max-w-lg">
              I'm a full-stack developer with a passion for creating interactive and user-friendly web applications.
            </p>
            
            {/* Typing Effect */}
            <div className="mb-8 font-mono text-xl">
              <span className="text-gray-600 dark:text-gray-400">{'>'} </span>
              <span className="text-emerald-600 dark:text-blue-500">I code </span>
              <span className="text-green-600 dark:text-blue-500 inline-flex">
                {displayText}
                <span className="border-r-2 border-green-600 dark:border-blue-500 ml-1 animate-blink"></span>
              </span>
            </div>
            
            {/* Interactive Skill Modules */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div 
                className="bg-white/70 dark:bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-gray-200 dark:border-white/10 hover:border-emerald-500/30 dark:hover:border-blue-700/30 transition-all group cursor-pointer"
                onClick={() => setAnimationType('matrix')}
              >
                <MousePointer className="w-6 h-6 text-emerald-600 dark:text-blue-600 mb-2" />
                <h3 className="text-gray-900 dark:text-white font-medium mb-1">Interactive Background</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Animated network system in background
                </p>
                <div className="h-1 w-0 bg-gradient-to-r from-emerald-500 to-green-500 dark:from-blue-800 dark:to-slate-800 mt-2 group-hover:w-full transition-all duration-500"></div>
              </div>
              
              <div 
                className="bg-white/70 dark:bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-gray-200 dark:border-white/10 hover:border-teal-500/30 dark:hover:border-blue-700/30 transition-all group cursor-pointer"
                onClick={nextCodeExample}
              >
                <Code className="w-6 h-6 text-teal-600 dark:text-blue-500 mb-2" />
                <h3 className="text-gray-900 dark:text-white font-medium mb-1">Code Demos</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Interactive React code examples
                </p>
                <div className="h-1 w-0 bg-gradient-to-r from-teal-500 to-green-500 dark:from-blue-700 dark:to-slate-800 mt-2 group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <a
                href="#projects"
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 dark:from-blue-800 dark:to-slate-800 text-white font-medium hover:shadow-lg hover:shadow-emerald-500/25 dark:hover:shadow-blue-900/25 transition-all hover:-translate-y-1"
              >
                Explore Examples
              </a>
              <a
                href="https://github.com/yourusername"
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-lg bg-white/20 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/15 text-gray-900 dark:text-white font-medium border border-gray-300 dark:border-white/10 flex items-center gap-2 transition-all hover:-translate-y-1"
              >
                <Github className="w-5 h-5" /> View Source Code
              </a>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-300 dark:border-gray-700/50 rounded-xl p-2 shadow-2xl">
              <div className="flex items-center justify-between gap-1.5 mb-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm font-mono flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> 
                  {showingBackgroundCode 
                    ? `${animationType}.js`
                    : `${codeExamples[currentCodeIndex].title}.${codeExamples[currentCodeIndex].language}`
                  }
                </div>
              </div>
              
              {/* Code Terminal & Animation Controls */}
              <div className="grid grid-cols-1 gap-4">
                {/* Terminal Output - VS Code style */}
                <div 
                  ref={terminalRef}
                  className="font-mono text-sm h-[350px] overflow-y-auto text-gray-300 bg-[#1e1e1e] dark:bg-[#1e1e1e] p-0 rounded border border-gray-700 dark:border-gray-800"
                >
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 border-b border-gray-700">
                    <span className="bg-[#2d2d2d] text-white px-3 py-1 rounded-t mr-1 border-t border-l border-r border-gray-700">App.tsx</span>
                    <span className="px-3 py-1">index.ts</span>
                    <span className="px-3 py-1">style.css</span>
                  </div>
                  
                  <div className="flex">
                    {/* Line numbers */}
                    <div className="p-2 text-right pr-3 border-r border-gray-700 bg-[#1e1e1e] text-gray-500 select-none w-12">
                      {Array.from({ length: codeOutput.split('\n').length + 3 }).map((_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>
                    
                    {/* Code content */}
                    <div className="p-2 pl-4 flex-1">
                  {isShowingPreview ? (
                    <div>
                          <div className="mb-4">
                            {showingBackgroundCode ? (
                              <pre className="whitespace-pre-wrap">
                                <span dangerouslySetInnerHTML={{ 
                                  __html: codeOutput
                                    .replace(/\/\/(.*)/g, match => 
                                      `<span class="text-[#6a9955]">${match}</span>`)
                                    .replace(/import|export|from|const|let|function|return|if|else|for|class|new|this/g, match => 
                                      `<span class="text-[#569cd6]">${match}</span>`)
                                    .replace(/\b\w+\(/g, match => 
                                      `<span class="text-[#dcdcaa]">${match}</span>`)
                                    .replace(/\b(canvas|ctx|document|window|Math)\b/g, match => 
                                      `<span class="text-[#4fc1ff]">${match}</span>`)
                                    .replace(/[{}()[\]=>;,.]/g, match => 
                                      `<span class="text-gray-400">${match}</span>`)
                                    .replace(/".*?"/g, match => 
                                      `<span class="text-[#ce9178]">${match}</span>`)
                                    .replace(/'.*?'/g, match => 
                                      `<span class="text-[#ce9178]">${match}</span>`)
                                    .replace(/\b\d+(\.\d+)?\b/g, match => 
                                      `<span class="text-[#b5cea8]">${match}</span>`)
                                }} />
                              </pre>
                            ) : (
                              <>
                                <div><span className="text-[#569cd6]">import</span> <span className="text-[#9cdcfe]">React</span><span className="text-gray-400">,</span> <span className="text-[#9cdcfe]">{"{"}</span> <span className="text-[#9cdcfe]">useState</span><span className="text-[#9cdcfe]">{"}"}</span> <span className="text-[#569cd6]">from</span> <span className="text-[#ce9178]">'react'</span><span className="text-gray-400">;</span></div>
                                <div className="mt-2"><span className="text-[#569cd6]">function</span> <span className="text-[#dcdcaa]">App</span><span className="text-gray-400">()</span> <span className="text-gray-400">{"{"}</span></div>
                                <div className="ml-4"><span className="text-[#569cd6]">const</span> <span className="text-gray-400">[</span><span className="text-[#9cdcfe]">count</span><span className="text-gray-400">,</span> <span className="text-[#9cdcfe]">setCount</span><span className="text-gray-400">]</span> <span className="text-gray-400">=</span> <span className="text-[#dcdcaa]">useState</span><span className="text-gray-400">(</span><span className="text-[#b5cea8]">0</span><span className="text-gray-400">);</span></div>
                                <div className="mt-2 ml-4"><span className="text-[#569cd6]">return</span> <span className="text-gray-400">(</span></div>
                                <div className="ml-8"><span className="text-gray-400">{"<"}</span><span className="text-[#4ec9b0]">div</span><span className="text-gray-400">{">"}</span></div>
                                <div className="ml-12"><span className="text-gray-400">{"<"}</span><span className="text-[#4ec9b0]">h1</span><span className="text-gray-400">{">"}</span><span className="text-gray-300">Count: {"{"}count{"}"}</span><span className="text-gray-400">{"</"}</span><span className="text-[#4ec9b0]">h1</span><span className="text-gray-400">{">"}</span></div>
                                <div className="ml-12">
                                  <span className="text-gray-400">{"<"}</span>
                                  <span className="text-[#4ec9b0]">button</span> 
                                  <span className="text-[#9cdcfe]">onClick</span>
                                  <span className="text-gray-400">{"{() => "}</span>
                                  <span className="text-[#dcdcaa]">setCount</span>
                                  <span className="text-gray-400">(</span>
                                  <span className="text-[#9cdcfe]">count</span> 
                                  <span className="text-gray-400">+</span> 
                                  <span className="text-[#b5cea8]">1</span>
                                  <span className="text-gray-400">){"}"}</span>
                                  <span className="text-gray-400">{">"}</span>
                                  <span className="text-gray-300">Increment</span>
                                  <span className="text-gray-400">{"</"}</span>
                                  <span className="text-[#4ec9b0]">button</span>
                                  <span className="text-gray-400">{">"}</span>
                                </div>
                                <div className="ml-8"><span className="text-gray-400">{"</"}</span><span className="text-[#4ec9b0]">div</span><span className="text-gray-400">{">"}</span></div>
                                <div className="ml-4"><span className="text-gray-400">{");"}</span></div>
                                <div><span className="text-gray-400">{"}"}</span></div>
                                <div className="mt-2"><span className="text-[#569cd6]">export</span> <span className="text-[#569cd6]">default</span> <span className="text-[#9cdcfe]">App</span><span className="text-gray-400">;</span></div>
                              </>
                            )}
                          </div>
                          
                      {!showingBackgroundCode && (
                            <div className="border-t border-gray-700 pt-3 mt-3">
                              <div className="text-sm font-medium mb-1 text-[#569cd6]">
                            Preview:
                          </div>
                          {codeExamples[currentCodeIndex].previewComponent(isDark)}
                        </div>
                      )}
                    </div>
                  ) : (
                        <div>
                          <div>
                            {showingBackgroundCode ? (
                              <span className="text-[#6a9955]">// Animation code for {animationType}</span>
                            ) : (
                              <><span className="text-[#569cd6]">import</span> <span className="text-[#9cdcfe]">React</span><span className="text-gray-400">,</span> <span className="text-[#9cdcfe]">{"{"}</span> <span className="text-[#9cdcfe]">useState</span><span className="text-[#9cdcfe]">{"}"}</span> <span className="text-[#569cd6]">from</span> <span className="text-[#ce9178]">'react'</span><span className="text-gray-400">;</span></>
                            )}
                          </div>
                          
                          <pre className="whitespace-pre-wrap mt-2 text-xs leading-relaxed">
                            {codeOutput.split('\n').map((line, index) => (
                              <div key={index} className="flex">
                                <span className="inline-block w-8 text-right pr-4 text-gray-500 select-none">{index + 1}</span>
                                <span className="text-gray-300">{line}</span>
                              </div>
                            ))}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Animation Controls */}
                <div className="border-t border-gray-300 dark:border-gray-700 pt-4">
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-3">
                    <Code className="w-4 h-4" /> Animation Controls
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-2">
                    <button
                      onClick={() => showBackgroundAnimationCode('flow')}
                      className={`p-3 rounded-lg transition-all flex items-center gap-2 ${
                        animationType === 'flow'
                          ? 'bg-gradient-to-r from-emerald-600 to-green-600 dark:from-blue-800 dark:to-slate-900 text-white shadow-lg shadow-emerald-500/20 dark:shadow-blue-900/20'
                          : 'bg-white/10 backdrop-blur-sm hover:bg-white/15 text-gray-300 border border-gray-700/50'
                      }`}
                      title="Flow"
                    >
                      <Waves className="w-4 h-4" />
                      <span className="text-sm font-medium">Flow</span>
                    </button>
                    
                    <button
                      onClick={() => showBackgroundAnimationCode('matrix')}
                      className={`p-3 rounded-lg transition-all flex items-center gap-2 ${
                        animationType === 'matrix'
                          ? 'bg-gradient-to-r from-emerald-600 to-green-600 dark:from-blue-800 dark:to-slate-900 text-white shadow-lg shadow-emerald-500/20 dark:shadow-blue-900/20'
                          : 'bg-white/10 backdrop-blur-sm hover:bg-white/15 text-gray-300 border border-gray-700/50'
                      }`}
                      title="Matrix"
                    >
                      <Code className="w-4 h-4" />
                      <span className="text-sm font-medium">Matrix</span>
                    </button>
                    
                    <button
                      onClick={() => showBackgroundAnimationCode('waves')}
                      className={`p-3 rounded-lg transition-all flex items-center gap-2 ${
                        animationType === 'waves'
                          ? 'bg-gradient-to-r from-emerald-600 to-green-600 dark:from-blue-800 dark:to-slate-900 text-white shadow-lg shadow-emerald-500/20 dark:shadow-blue-900/20'
                          : 'bg-white/10 backdrop-blur-sm hover:bg-white/15 text-gray-300 border border-gray-700/50'
                      }`}
                      title="Waves"
                    >
                      <Waves className="w-4 h-4" />
                      <span className="text-sm font-medium">Waves</span>
                    </button>
                    
                    <button
                      onClick={() => showBackgroundAnimationCode('stars')}
                      className={`p-3 rounded-lg transition-all flex items-center gap-2 ${
                        animationType === 'stars'
                          ? 'bg-gradient-to-r from-emerald-600 to-green-600 dark:from-blue-800 dark:to-slate-900 text-white shadow-lg shadow-emerald-500/20 dark:shadow-blue-900/20'
                          : 'bg-white/10 backdrop-blur-sm hover:bg-white/15 text-gray-300 border border-gray-700/50'
                      }`}
                      title="Stars"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span className="text-sm font-medium">Stars</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-4">
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  React + TypeScript
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-gradient-to-br from-emerald-600 via-green-500 to-teal-600 dark:from-blue-800 dark:via-blue-900 dark:to-slate-900 rounded-lg p-4 shadow-xl backdrop-blur-md border border-emerald-500/50 dark:border-blue-700/50 transform rotate-3 hover:rotate-1 transition-transform">
              <div className="font-mono text-sm text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-4 h-4 text-emerald-100" />
                  <span className="text-emerald-100 text-xs">App.tsx</span>
                </div>
                <div><span className="text-emerald-100 dark:text-pink-300">import</span> <span className="text-white dark:text-blue-300">React</span> <span className="text-emerald-100 dark:text-pink-300">from</span> <span className="text-green-100 dark:text-green-300">'react'</span>;</div>
                <div><span className="text-emerald-100 dark:text-pink-300">import</span> <span className="text-white dark:text-cyan-300">{'{'} Header {'}'}</span> <span className="text-emerald-100 dark:text-pink-300">from</span> <span className="text-green-100 dark:text-green-300">'./components'</span>;</div>
              </div>
            </div>
            
            <div className="absolute -bottom-20 -left-6 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 dark:from-blue-700 dark:via-blue-800 dark:to-slate-900 rounded-lg p-4 shadow-xl backdrop-blur-md border border-emerald-500/50 dark:border-blue-700/50 transform -rotate-2 hover:rotate-0 transition-transform">
              <div className="font-mono text-sm text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Braces className="w-4 h-4 text-emerald-100" />
                  <span className="text-emerald-100 text-xs">tsconfig.json</span>
                </div>
                <div><span className="text-white dark:text-gray-300">{'{'}</span></div>
                <div><span className="pl-2 text-emerald-100 dark:text-blue-300">"compilerOptions"</span>: <span className="text-white dark:text-gray-300">{'{'}</span></div>
                <div><span className="pl-4 text-emerald-100 dark:text-blue-300">"target"</span>: <span className="text-green-100 dark:text-green-300">"ES2020"</span>,</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}