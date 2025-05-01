import { Github, Terminal, Code, Braces, MousePointer, ChevronsRight, Sparkles, Waves } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { AnimationType, BackgroundAnimation, getAnimationCode } from './HeroAnimations';
import { AnimationControls } from './AnimationControls';

// Fonction pour la coloration syntaxique - style VS Code
const syntaxHighlight = (code: string): string => {
  // Simplement échapper le HTML et retourner le code sans coloration
  return code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

// Animation code content (hardcoded for simplicity)
const getAnimationCodeContent = (type: AnimationType): string => {
  switch(type) {
    case 'squares':
      return `// Particle animation
const particles = [];
const particleCount = 50;

// Create particles
for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 1,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.5,
    opacity: Math.random() * 0.5 + 0.2
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Update and draw each particle
  for (const p of particles) {
    p.x += p.speedX;
    p.y += p.speedY;
    
    // Bounce off edges
    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    
    // Draw the particle
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, ' + p.opacity + ')';
    ctx.fill();
  }
  
  requestAnimationFrame(animate);
}

animate();`;
    case 'matrix':
      return `// Matrix Animation
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
      ? \`rgba(99, 102, 241, \${Math.random() * 0.4 + 0.6})\` // Indigo for dark mode
      : \`rgba(20, 184, 166, \${Math.random() * 0.4 + 0.6})\`;  // Teal for light mode
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
    
    // Randomly change character
    if (Math.random() > 0.95) {
      this.text = String.fromCharCode(
        Math.floor(Math.random() * 93) + 33
      );
    }
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color.replace(')', \`, \${this.opacity})\`);
    ctx.font = \`\${this.fontSize}px monospace\`;
    ctx.fillText(this.text, this.x, this.y);
  }
}

// Initialization and animation
const symbols: Symbol[] = [];
const fontSize = 14;
const columns = Math.floor(canvas.width / fontSize);

for (let i = 0; i < columns; i++) {
  symbols.push(new Symbol(i * fontSize, 0, fontSize, canvas.height, isDark));
}

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  symbols.forEach(symbol => {
    symbol.update();
    symbol.draw(ctx);
  });
  
  requestAnimationFrame(animate);
}

animate();`;
    case 'waves':
      return `// Ripples Animation
class Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  color: string;
  opacity: number;
  
  constructor(x: number, y: number, isDark: boolean) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.maxRadius = Math.random() * 50 + 50;
    this.speed = Math.random() * 2 + 1;
    this.color = isDark 
      ? \`rgba(99, 102, 241, \${Math.random() * 0.4 + 0.6})\` // Indigo for dark mode
      : \`rgba(20, 184, 166, \${Math.random() * 0.4 + 0.6})\`;  // Teal for light mode
    this.opacity = 1;
  }
  
  update() {
    this.radius += this.speed;
    this.opacity = 1 - (this.radius / this.maxRadius);
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    if (this.opacity <= 0) return;
    
    ctx.strokeStyle = this.color.replace(')', \`, \${this.opacity})\`);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();
  }
  
  isFinished(): boolean {
    return this.radius >= this.maxRadius;
  }
}

// Initialization and animation
const ripples: Ripple[] = [];

function createRipple(e: MouseEvent) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  ripples.push(new Ripple(x, y, isDark));
}

canvas.addEventListener('click', createRipple);

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ripples.forEach((ripple, index) => {
    ripple.update();
    ripple.draw(ctx);
    
    if (ripple.isFinished()) {
      ripples.splice(index, 1);
    }
  });
  
  requestAnimationFrame(animate);
}

animate();`;
    case 'stars':
      return `// Particles Animation
class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  maxSize: number;
  minSize: number;
  growing: boolean;
  
  constructor(mode: 'dark' | 'light') {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.color = mode === 'dark' ? '#ffffff' : '#000000';
    this.opacity = Math.random() * 0.5 + 0.1;
    this.maxSize = Math.random() * 5 + 2;
    this.minSize = Math.random() * 2 + 1;
    this.growing = true;
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    if (this.x < 0 || this.x > window.innerWidth) this.speedX *= -1;
    if (this.y < 0 || this.y > window.innerHeight) this.speedY *= -1;

    if (this.growing) {
      this.size += 0.05;
      if (this.size >= this.maxSize) {
        this.growing = false;
      }
    } else {
      this.size -= 0.05;
      if (this.size <= this.minSize) {
        this.growing = true;
      }
    }
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

class ParticleAnimation {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  particles: Particle[];
  mode: 'dark' | 'light';
  
  constructor(mode: 'dark' | 'light') {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
    this.particles = [];
    this.mode = mode;

    this.init();
  }
  
  init() {
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.zIndex = '-1';
    document.body.appendChild(this.canvas);

    this.resize();
    window.addEventListener('resize', () => this.resize());

    for (let i = 0; i < 100; i++) {
      this.particles.push(new Particle(this.mode));
    }

    this.animate();
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      particle.update();
      particle.draw(this.ctx);
    });

    requestAnimationFrame(() => this.animate());
  }
  
  destroy() {
    window.removeEventListener('resize', () => this.resize());
    document.body.removeChild(this.canvas);
  }
}`;
    default:
      return `// Default animation
console.log("Default animation")`;
  }
};

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
    ctx.fillStyle = 'rgba(255, 255, 255, ' + p.opacity + ')';
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
      ? `rgba(99, 102, 241, ${Math.random() * 0.4 + 0.6})` // Indigo for dark mode
      : `rgba(20, 184, 166, ${Math.random() * 0.4 + 0.6})`;  // Teal for light mode
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
    
    // Randomly change character
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
  const [animationType, setAnimationType] = useState<AnimationType>('squares');
  const [animationCode, setAnimationCode] = useState('');
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

  // Charger le code d'animation depuis le fichier importé
  const loadAnimationCode = useCallback(async (type: AnimationType) => {
    try {
      // Utiliser directement les fichiers importés
      return getAnimationCodeContent(type);
    } catch (error) {
      console.error('Erreur lors du chargement du code d\'animation:', error);
      return `// Erreur lors du chargement du fichier ${type}.txt\n// Vérifiez que le fichier existe dans le dossier src/animations/`;
    }
  }, []);

  // Animation de fond - using useCallback to avoid recreation
  const showBackgroundAnimationCode = useCallback(async (type: AnimationType) => {
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
    
    // Charger le code depuis le fichier
    const code = await loadAnimationCode(type);
    setAnimationCode(code);
    
    // Afficher le code de l'animation de fond
    let typedCode = '';
    const codeLines = code.split('\n');
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
          // Show result after typing code - Correction ici pour éviter l'effacement
          setCodeOutput(typedCode); // On conserve le texte tapé
          setAnimationCode(typedCode); // On sauvegarde également le texte complet
          
          // Pas de setTimeout ici, on change directement l'état
          setIsTypingCode(false);
          setIsShowingPreview(true);
          setIsProcessing(false);
        }
      } else {
        animationFrameRef.current = requestAnimationFrame(typeCodeFrame);
      }
    };
    
    animationFrameRef.current = requestAnimationFrame(typeCodeFrame);
  }, [clearAllTimeouts, loadAnimationCode]);
  
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
  
  // Start animation on initial load
  useEffect(() => {
    // Chargement immédiat de l'animation par défaut (squares)
    showBackgroundAnimationCode('squares');
    
    return () => {
      clearAllTimeouts();
    };
  }, [showBackgroundAnimationCode, clearAllTimeouts]);
  
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
      <div className="container relative mx-auto px-6 py-12 md:py-18 z-30 rounded-xl bg-white/30 dark:bg-black/30 backdrop-blur-sm shadow-lg dark:shadow-none border border-gray-300 dark:border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 pt-8">
              <span className="block">{t('welcome')}</span>
              <span className="text-transparent text-5xl bg-clip-text bg-gradient-to-r from-emerald-500 to-green-600 dark:from-blue-700 dark:to-slate-600">{t("iAmA")} {t("fullStack")} {t("developer")}</span>
            </h1>
            
            <p className="text-gray-700 dark:text-gray-400 text-lg md:text-xl mb-8 max-w-lg">
              {t('heroDescription')}
            </p>
            
            {/* Typing Effect */}
            <div className="mb-8 font-mono text-xl">
              <span className="text-gray-600 dark:text-gray-400">{'>'} </span>
              <span className="text-emerald-600 dark:text-blue-500">{t('iCode')} </span>
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
                <h3 className="text-gray-900 dark:text-white font-medium mb-1">{t('interactiveBackground')}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {t('animatedNetwork')}
                </p>
                <div className="h-1 w-0 bg-gradient-to-r from-emerald-500 to-green-500 dark:from-blue-800 dark:to-slate-800 mt-2 group-hover:w-full transition-all duration-500"></div>
              </div>
              
              <div 
                className="bg-white/70 dark:bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-gray-200 dark:border-white/10 hover:border-teal-500/30 dark:hover:border-blue-700/30 transition-all group cursor-pointer"
                onClick={nextCodeExample}
              >
                <Code className="w-6 h-6 text-teal-600 dark:text-blue-500 mb-2" />
                <h3 className="text-gray-900 dark:text-white font-medium mb-1">{t('codeDemos')}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {t('interactiveReact')}
                </p>
                <div className="h-1 w-0 bg-gradient-to-r from-teal-500 to-green-500 dark:from-blue-700 dark:to-slate-800 mt-2 group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <a
                href="#projects"
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 dark:from-blue-800 dark:to-slate-800 text-white font-medium hover:shadow-lg hover:shadow-emerald-500/25 dark:hover:shadow-blue-900/25 transition-all hover:-translate-y-1"
              >
                {t('exploreExamples')}
              </a>
              <a
                href="https://github.com/yourusername"
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-lg bg-white/20 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/15 text-gray-900 dark:text-white font-medium border border-gray-300 dark:border-white/10 flex items-center gap-2 transition-all hover:-translate-y-1"
              >
                <Github className="w-5 h-5" /> {t('viewSourceCode')}
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
                    ? `${animationType}.tsx`
                    : `${codeExamples[currentCodeIndex].title}.${codeExamples[currentCodeIndex].language}`
                  }
                </div>
              </div>
              
              {/* Code Terminal & Animation Controls */}
              <div className="grid grid-cols-1 gap-4">
                {/* Terminal Output - VS Code style */}
                <div 
                  ref={terminalRef}
                  className={`font-mono text-sm h-[350px] overflow-y-auto ${
                    isDark 
                      ? "text-gray-300 bg-[#1e1e1e]" 
                      : "text-gray-800 bg-[#f5f5f5]"
                  } p-0 rounded border ${isDark ? "border-gray-700" : "border-gray-300"}`}
                >
                  <div className={`flex items-center text-xs ${isDark ? "text-gray-500 dark:text-gray-400 border-gray-700" : "text-gray-600 border-gray-300"} border-b`}>
                    <span className={`${isDark ? "bg-[#2d2d2d] text-white" : "bg-[#e8e8e8] text-gray-800"} px-3 py-1 rounded-t mr-1 border-t border-l border-r ${isDark ? "border-gray-700" : "border-gray-300"}`}>
                      {showingBackgroundCode ? `${animationType}.tsx` : `${codeExamples[currentCodeIndex].title}.${codeExamples[currentCodeIndex].language}`}
                    </span>
                  </div>
                  
                  <div className="flex">
                    {/* Numéros de ligne */}
                    <div className={`p-2 text-right pr-3 border-r ${
                      isDark 
                        ? "border-gray-700 bg-[#1e1e1e] text-gray-500" 
                        : "border-gray-300 bg-[#f5f5f5] text-gray-600"
                    } select-none w-12`}>
                      {(isShowingPreview 
                        ? (showingBackgroundCode ? animationCode : codeExamples[currentCodeIndex].code) 
                        : (codeOutput || (showingBackgroundCode ? animationCode : '')))
                        .split('\n')
                        .map((_, i: number) => (
                          <div key={i} className="leading-relaxed">{i + 1}</div>
                        ))}
                    </div>
                    
                    {/* Code content */}
                    <div className="p-2 pl-4 flex-1">
                      {isShowingPreview ? (
                        <div>
                          <div className="mb-4">
                            <pre className={`whitespace-pre-wrap font-mono ${isDark ? "text-gray-300" : "text-gray-800"}`}>
                              {showingBackgroundCode ? animationCode : codeExamples[currentCodeIndex].code}
                            </pre>
                          </div>
                          
                          {!showingBackgroundCode && (
                            <div className={`border-t ${isDark ? "border-gray-700" : "border-gray-300"} pt-3 mt-3`}>
                              <div className={`text-sm font-medium mb-1 ${isDark ? "text-[#569cd6]" : "text-[#0e5aa7]"}`}>
                                {t('preview')}:
                              </div>
                              {codeExamples[currentCodeIndex].previewComponent(isDark)}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          <pre className={`whitespace-pre-wrap leading-relaxed relative z-10 font-mono ${isDark ? "text-gray-300" : "text-gray-800"}`}>
                            {codeOutput || (showingBackgroundCode ? animationCode : '')}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Animation Controls */}
                <div className={`border-t ${isDark ? "border-gray-700" : "border-gray-300"} pt-4`}>
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-3">
                    <Code className="w-4 h-4" /> {t('animationControls')}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-2">
                    <button
                      onClick={() => showBackgroundAnimationCode('squares')}
                      className={`p-3 rounded-lg transition-all flex items-center gap-2 ${
                        animationType === 'squares'
                          ? 'bg-gradient-to-r from-emerald-600 to-green-600 dark:from-blue-800 dark:to-slate-900 text-white shadow-lg shadow-emerald-500/20 dark:shadow-blue-900/20'
                          : isDark
                            ? 'bg-white/10 backdrop-blur-sm hover:bg-white/15 text-gray-300 border border-gray-700/50'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
                      }`}
                      title={t('animatedSquares')}
                    >
                      <Waves className="w-4 h-4" />
                      <span className="text-sm font-medium">{t('squares')}</span>
                    </button>
                    
                    <button
                      onClick={() => showBackgroundAnimationCode('matrix')}
                      className={`p-3 rounded-lg transition-all flex items-center gap-2 ${
                        animationType === 'matrix'
                          ? 'bg-gradient-to-r from-emerald-600 to-green-600 dark:from-blue-800 dark:to-slate-900 text-white shadow-lg shadow-emerald-500/20 dark:shadow-blue-900/20'
                          : isDark
                            ? 'bg-white/10 backdrop-blur-sm hover:bg-white/15 text-gray-300 border border-gray-700/50'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
                      }`}
                      title={t('matrixRain')}
                    >
                      <Code className="w-4 h-4" />
                      <span className="text-sm font-medium">{t('matrix')}</span>
                    </button>
                    
                    <button
                      onClick={() => showBackgroundAnimationCode('waves')}
                      className={`p-3 rounded-lg transition-all flex items-center gap-2 ${
                        animationType === 'waves'
                          ? 'bg-gradient-to-r from-emerald-600 to-green-600 dark:from-blue-800 dark:to-slate-900 text-white shadow-lg shadow-emerald-500/20 dark:shadow-blue-900/20'
                          : isDark
                            ? 'bg-white/10 backdrop-blur-sm hover:bg-white/15 text-gray-300 border border-gray-700/50'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
                      }`}
                      title={t('fluidWaves')}
                    >
                      <Waves className="w-4 h-4" />
                      <span className="text-sm font-medium">{t('waves')}</span>
                    </button>
                    
                    <button
                      onClick={() => showBackgroundAnimationCode('stars')}
                      className={`p-3 rounded-lg transition-all flex items-center gap-2 ${
                        animationType === 'stars'
                          ? 'bg-gradient-to-r from-emerald-600 to-green-600 dark:from-blue-800 dark:to-slate-900 text-white shadow-lg shadow-emerald-500/20 dark:shadow-blue-900/20'
                          : isDark
                            ? 'bg-white/10 backdrop-blur-sm hover:bg-white/15 text-gray-300 border border-gray-700/50'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
                      }`}
                      title={t('luminousParticles')}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span className="text-sm font-medium">{t('particles')}</span>
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