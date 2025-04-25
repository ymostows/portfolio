import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import React from 'react';

export type AnimationType = 'matrix' | 'waves' | 'stars' | 'flow';

interface AnimationProps {
  type: AnimationType;
}

// Fonction utilitaire pour limiter la fréquence d'exécution (throttle)
function throttle(callback: Function, delay: number) {
  let lastCall = 0;
  return function(...args: any[]) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      callback(...args);
    }
  };
}

// Détection des performances du système
function hasLowPerformance() {
  // Vérifier si l'appareil a un processeur faible ou est un mobile
  const userAgent = navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
  // Si c'est mobile, on suppose des performances réduites
  if (isMobile) return true;
  
  // Vérifier le nombre de cœurs du processeur si disponible
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    return true;
  }
  
  return false;
}

// Classes pour les animations
class Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  opacity: number;
  
  constructor(canvasWidth: number, canvasHeight: number, isDark: boolean) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.size = Math.random() * 3 + 1.5;
    this.color = isDark 
      ? `hsl(${Math.random() * 60 + 220}, 100%, 80%)`
      : `hsl(${Math.random() * 40 + 180}, 100%, 75%)`;
    this.speedX = (Math.random() - 0.5) * 0.8;
    this.speedY = (Math.random() - 0.5) * 0.8;
    this.opacity = Math.random() * 0.3 + 0.7;
  }
  
  update(canvasWidth: number, canvasHeight: number) {
    this.x += this.speedX;
    this.y += this.speedY;
    
    if (this.x < 0 || this.x > canvasWidth) this.speedX *= -1;
    if (this.y < 0 || this.y > canvasHeight) this.speedY *= -1;
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color.replace(')', `, ${this.opacity})`);
    
    ctx.shadowBlur = 5;
    ctx.shadowColor = this.color;
    
    ctx.fill();
    
    ctx.shadowBlur = 0;
  }
}

class Symbol {
  x: number;
  y: number;
  fontSize: number;
  text: string;
  canvasHeight: number;
  color: string;
  speed: number;
  
  constructor(x: number, y: number, fontSize: number, canvasHeight: number, isDark: boolean) {
    this.x = x;
    this.y = Math.random() * canvasHeight;
    this.fontSize = fontSize;
    this.canvasHeight = canvasHeight;
    this.color = isDark 
      ? 'rgba(136, 138, 246, 1)' // Indigo complètement opaque
      : 'rgba(20, 184, 166, 1)'; // Teal complètement opaque
    this.text = String.fromCharCode(
      Math.floor(Math.random() * 93) + 33
    );
    this.speed = Math.random() * 10 + 5; // Vitesse encore augmentée
  }
  
  update() {
    if (this.y > this.canvasHeight) {
      this.y = 0;
    } else {
      this.y += this.speed;
    }
    
    if (Math.random() > 0.95) {
      this.text = String.fromCharCode(
        Math.floor(Math.random() * 93) + 33
      );
    }
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.font = `${this.fontSize}px monospace`;
    
    // Ajouter un effet de halo plus prononcé
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    
    ctx.fillText(this.text, this.x, this.y);
    
    // Réinitialiser l'effet de halo pour la performance
    ctx.shadowBlur = 0;
  }
}

class Wave {
  amplitude: number;
  period: number;
  phase: number;
  color: string;
  
  constructor(amplitude: number, period: number, phase: number, isDark: boolean, index: number) {
    this.amplitude = amplitude;
    this.period = period;
    this.phase = phase;
    
    if (isDark) {
      const colors = [
        'rgba(99, 102, 241, 0.3)',  // Indigo plus visible
        'rgba(236, 72, 153, 0.25)', // Rose plus visible
        'rgba(67, 56, 202, 0.2)'    // Indigo foncé plus visible
      ];
      this.color = colors[index % colors.length];
    } else {
      const colors = [
        'rgba(20, 184, 166, 0.3)',  // Teal plus visible
        'rgba(245, 158, 11, 0.25)', // Ambre plus visible
        'rgba(14, 165, 233, 0.2)'   // Sky plus visible
      ];
      this.color = colors[index % colors.length];
    }
  }
  
  draw(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, time: number) {
    ctx.beginPath();
    ctx.moveTo(0, canvasHeight / 2);
    
    for (let x = 0; x < canvasWidth; x++) {
      const y = canvasHeight / 2 + 
        this.amplitude * Math.sin((x / this.period) + this.phase + time / 1000);
      ctx.lineTo(x, y);
    }
    
    ctx.lineTo(canvasWidth, canvasHeight);
    ctx.lineTo(0, canvasHeight);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

class Star {
  x: number;
  y: number;
  size: number;
  color: string;
  blinkSpeed: number;
  blinkState: number;
  
  constructor(canvasWidth: number, canvasHeight: number, isDark: boolean) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.size = Math.random() * 2 + 0.8; // Étoiles plus grandes
    this.color = isDark 
      ? 'rgba(255, 255, 255' 
      : 'rgba(20, 184, 166';
    this.blinkSpeed = Math.random() * 0.06 + 0.01; // Vitesse de clignotement ajustée
    this.blinkState = Math.random();
  }
  
  update() {
    this.blinkState += this.blinkSpeed;
    if (this.blinkState > 1) this.blinkState = 0;
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    const opacity = Math.sin(this.blinkState * Math.PI) * 0.6 + 0.4; // Opacité minimale plus élevée
    
    // Ajouter un halo pour plus de brillance
    ctx.shadowBlur = 4;
    ctx.shadowColor = this.color + `, ${opacity * 0.7})`; 
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color + `, ${opacity})`;
    ctx.fill();
    
    // Réinitialiser le flou pour les performances
    ctx.shadowBlur = 0;
  }
}

export function BackgroundAnimation({ type }: AnimationProps) {
  const { isDark } = useTheme();
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  
  // Références pour les animations
  const matrixRef = useRef<HTMLDivElement>(null);
  const wavesRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  
  // Vérifier les performances au premier rendu
  useEffect(() => {
    setIsLowPerformance(hasLowPerformance());
  }, []);
  
  // Définir une classe CSS selon le type d'animation choisi
  let backgroundClass = '';
  let backgroundStyle = {};

  switch (type) {
    case 'matrix':
      backgroundClass = 'bg-matrix';
      backgroundStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        backgroundColor: isDark ? 'rgba(17, 24, 39, 1)' : 'rgba(240, 249, 255, 1)',
      };
      break;
    case 'waves':
      backgroundClass = 'bg-waves';
      backgroundStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        backgroundColor: isDark ? 'rgba(17, 24, 39, 1)' : 'rgba(240, 249, 255, 1)',
      };
      break;
    case 'stars':
      backgroundClass = 'bg-stars';
      backgroundStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        background: isDark ? 
          'linear-gradient(to bottom, #0f172a, #1e293b)' : 
          'linear-gradient(to bottom, #f0f9ff, #e0f2fe)'
      };
      break;
    case 'flow':
      backgroundClass = 'bg-flow';
      backgroundStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        backgroundColor: isDark ? 'rgba(17, 24, 39, 1)' : 'rgba(240, 249, 255, 1)',
      };
      break;
  }
  
  // Animation Matrix
  useEffect(() => {
    if (type !== 'matrix' || !matrixRef.current) return;
    
    const container = matrixRef.current;
    // Ajuster la taille du réseau selon les performances
    const networkSize = Math.max(window.innerWidth, window.innerHeight) * (isLowPerformance ? 1.0 : 1.2);
    
    // Créer un conteneur SVG pour la grille
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.zIndex = '1';
    svg.style.pointerEvents = 'none';
    container.appendChild(svg);
    
    // Paramètres du réseau ajustés selon les performances
    const nodeCount = isLowPerformance ? 30 : 60; // Augmenté le nombre de noeuds
    const maxConnections = isLowPerformance ? 3 : 5; // Augmenté le nombre de connexions max
    const connectionThreshold = networkSize / (isLowPerformance ? 7 : 5); // Augmenté la distance de connexion
    
    // Nœuds et connexions
    const nodes: {x: number, y: number, vx: number, vy: number, el: SVGCircleElement}[] = [];
    const connections: {from: number, to: number, el: SVGLineElement}[] = [];
    
    // Créer les nœuds
    for (let i = 0; i < nodeCount; i++) {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      
      // Mélange de grosses et petites particules
      const isSmall = Math.random() > 0.3; // 70% de petites particules
      const radius = isSmall ? Math.random() * 2 + 1 : Math.random() * 4 + 3;
      
      // Distribuer les nœuds sur toute la fenêtre plutôt que centrés
      const x = Math.random() * networkSize;
      const y = Math.random() * networkSize;
      
      circle.setAttribute('cx', x.toString());
      circle.setAttribute('cy', y.toString());
      circle.setAttribute('r', radius.toString());
      
      // Couleur selon le mode, plus visible dans les deux modes
      const color = isDark ? 'rgba(139, 142, 245, 0.9)' : 'rgba(45, 212, 191, 0.9)';
      circle.setAttribute('fill', color);
      
      // Ajouter un effet de lueur pour plus de visibilité
      circle.setAttribute('filter', 'url(#glow)');
      
      svg.appendChild(circle);
      
      // Données pour l'animation
      nodes.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.6, // Mouvement légèrement plus rapide
        vy: (Math.random() - 0.5) * 0.6,
        el: circle
      });
    }
    
    // Ajouter un filtre pour la lueur
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', 'glow');
    filter.setAttribute('x', '-50%');
    filter.setAttribute('y', '-50%');
    filter.setAttribute('width', '200%');
    filter.setAttribute('height', '200%');
    
    const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    feGaussianBlur.setAttribute('stdDeviation', '2');
    feGaussianBlur.setAttribute('result', 'blur');
    
    const feComposite = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
    feComposite.setAttribute('in', 'SourceGraphic');
    feComposite.setAttribute('in2', 'blur');
    feComposite.setAttribute('operator', 'over');
    
    filter.appendChild(feGaussianBlur);
    filter.appendChild(feComposite);
    defs.appendChild(filter);
    svg.appendChild(defs);
    
    // Créer les connexions
    function updateConnections() {
      // Supprimer les connexions existantes
      connections.forEach(conn => {
        if (svg.contains(conn.el)) {
          svg.removeChild(conn.el);
        }
      });
      connections.length = 0;
      
      // Recréer les connexions basées sur la proximité
      for (let i = 0; i < nodes.length; i++) {
        let connectionsForNode = 0;
        for (let j = i + 1; j < nodes.length; j++) {
          // Calculer la distance
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Créer une connexion si les nœuds sont assez proches
          if (distance < connectionThreshold && connectionsForNode < maxConnections) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', nodes[i].x.toString());
            line.setAttribute('y1', nodes[i].y.toString());
            line.setAttribute('x2', nodes[j].x.toString());
            line.setAttribute('y2', nodes[j].y.toString());
            
            // Opacité basée sur la distance (plus proches = plus opaques)
            // Augmenté l'opacité minimale pour plus de visibilité
            const opacity = 0.4 * (1 - distance / connectionThreshold) + 0.2;
            const color = isDark 
              ? `rgba(139, 142, 245, ${opacity})`
              : `rgba(45, 212, 191, ${opacity})`;
            line.setAttribute('stroke', color);
            line.setAttribute('stroke-width', '1.5'); // Lignes plus épaisses
            
            // Ajouter un effet de lueur douce aux lignes
            line.setAttribute('filter', 'url(#glow)');
            
            svg.appendChild(line);
            connections.push({from: i, to: j, el: line});
            connectionsForNode++;
          }
        }
      }
    }
    
    // Fonction d'animation avec limitation de fréquence
    let lastFrameTime = 0;
    const targetFPS = isLowPerformance ? 20 : 40;
    const frameInterval = 1000 / targetFPS;
    
    const animate = (timestamp: number) => {
      if (timestamp - lastFrameTime < frameInterval) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      
      lastFrameTime = timestamp;
      
      // Mise à jour des positions des nœuds
      nodes.forEach(node => {
        // Déplacement
        node.x += node.vx;
        node.y += node.vy;
        
        // Rebond sur les bords
        if (node.x < 0 || node.x > networkSize) {
          node.vx *= -1;
          node.x = Math.max(0, Math.min(networkSize, node.x));
        }
        if (node.y < 0 || node.y > networkSize) {
          node.vy *= -1;
          node.y = Math.max(0, Math.min(networkSize, node.y));
        }
        
        // Mettre à jour la position dans le SVG
        node.el.setAttribute('cx', node.x.toString());
        node.el.setAttribute('cy', node.y.toString());
      });
      
      // Mettre à jour les connexions
      updateConnections();
      
      animationId = requestAnimationFrame(animate);
    };
    
    updateConnections();
    let animationId = requestAnimationFrame(animate);
    
    // Optimiser le redimensionnement avec throttle
    const handleResize = throttle(() => {
      // Réajuster les positions des nœuds pour les garder dans la fenêtre
      nodes.forEach(node => {
        if (node.x > networkSize) node.x = networkSize * Math.random();
        if (node.y > networkSize) node.y = networkSize * Math.random();
        
        node.el.setAttribute('cx', node.x.toString());
        node.el.setAttribute('cy', node.y.toString());
      });
      
      updateConnections();
    }, 200);
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [type, isDark, isLowPerformance]);
  
  // Animation des vagues complètement refaite
  useEffect(() => {
    if (type !== 'waves' || !wavesRef.current) return;
    
    const container = wavesRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '1';
    canvas.style.pointerEvents = 'none';
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Paramètres des vagues
    const waveColors = isDark 
      ? ['rgba(99, 102, 241, 0.4)', 'rgba(79, 70, 229, 0.35)', 'rgba(67, 56, 202, 0.3)']
      : ['rgba(20, 184, 166, 0.4)', 'rgba(13, 148, 136, 0.35)', 'rgba(15, 118, 110, 0.3)'];
    
    const waves = [
      { amplitude: 35, wavelength: canvas.width * 0.4, speed: 0.5, phase: 0 },
      { amplitude: 25, wavelength: canvas.width * 0.6, speed: 0.7, phase: Math.PI / 3 },
      { amplitude: 20, wavelength: canvas.width * 0.3, speed: 0.9, phase: Math.PI / 1.5 }
    ];
    
    const waveHeight = canvas.height * 0.6; // Position verticale des vagues (60% depuis le haut)
    const waveSpread = 40; // Écart entre les vagues
    
    // Fonction pour dessiner une vague
    function drawWave(color: string, amplitude: number, wavelength: number, speed: number, phase: number, yOffset: number, time: number) {
      if (!ctx) return;
      
      ctx.beginPath();
      ctx.moveTo(0, waveHeight + yOffset);
      
      // Dessiner la courbe de la vague
      for (let x = 0; x < canvas.width; x += 5) {
        const dx = x / wavelength;
        const y = waveHeight + yOffset + Math.sin(dx * 2 * Math.PI + phase + time * speed) * amplitude;
        ctx.lineTo(x, y);
      }
      
      // Compléter le chemin pour remplir sous la vague
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      
      // Remplir avec dégradé
      const gradient = ctx.createLinearGradient(0, waveHeight - amplitude, 0, waveHeight + amplitude * 2);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fill();
    }
    
    // Variables pour l'animation
    let animationTime = 0;
    
    // Fonction d'animation avec limitation de fréquence
    let lastFrameTime = 0;
    const targetFPS = isLowPerformance ? 24 : 40;
    const frameInterval = 1000 / targetFPS;
    
    // Adapter l'incrément de temps selon les performances
    const timeIncrement = isLowPerformance ? 0.01 : 0.02;
    
    // Fonction d'animation
    function animate(timestamp: number) {
      if (timestamp - lastFrameTime < frameInterval) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      
      lastFrameTime = timestamp;
      
      // Incrémenter le temps pour l'animation
      animationTime += timeIncrement;
      
      // Effacer le canvas
      if (!ctx) return; // Vérifier que ctx existe
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Dessiner les vagues dans l'ordre (du fond vers l'avant)
      for (let i = 0; i < waves.length; i++) {
        const wave = waves[i];
        drawWave(
          waveColors[i],
          wave.amplitude,
          wave.wavelength,
          wave.speed,
          wave.phase,
          i * waveSpread,
          animationTime
        );
      }
      
      animationId = requestAnimationFrame(animate);
    }
    
    // Optimiser le redimensionnement avec throttle
    const handleResize = throttle(() => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Mettre à jour les longueurs d'onde lors du redimensionnement
      waves[0].wavelength = canvas.width * 0.4;
      waves[1].wavelength = canvas.width * 0.6;
      waves[2].wavelength = canvas.width * 0.3;
    }, 200);
    
    window.addEventListener('resize', handleResize);
    let animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [type, isDark, isLowPerformance]);
  
  // Animation des étoiles remplacée par un effet de particules lumineuses avec traînées
  useEffect(() => {
    if (type !== 'stars' || !starsRef.current) return;
    
    // S'assurer que le starsRef n'a pas de contenu précédent
    while (starsRef.current.firstChild) {
      starsRef.current.removeChild(starsRef.current.firstChild);
    }
    
    const container = starsRef.current;
    
    // Modifier le style du conteneur pour s'assurer qu'il ne bloque pas le contenu
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.zIndex = '1';
    container.style.pointerEvents = 'none';
    
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '1';
    canvas.style.pointerEvents = 'none';
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Créer un dégradé de fond
    const drawBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      if (isDark) {
        gradient.addColorStop(0, 'rgba(15, 23, 42, 1)');
        gradient.addColorStop(1, 'rgba(30, 41, 59, 1)');
      } else {
        gradient.addColorStop(0, 'rgba(240, 249, 255, 1)');
        gradient.addColorStop(1, 'rgba(224, 242, 254, 1)');
      }
      ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    
    // Interface pour les particules
    interface Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      trail: {x: number, y: number, size: number}[];
      trailLength: number;
      hue: number;
    }
    
    // Particules et paramètres adaptés selon les performances
    const particles: Particle[] = [];
    const maxParticles = isLowPerformance ? 25 : 50;
    const trailLength = isLowPerformance ? 12 : 20; // Augmenté la longueur des traînées
    
    // Référence sûre au contexte pour éviter les erreurs TypeScript
    // Le check ctx === null est déjà fait plus haut, donc on peut utiliser l'opérateur ! ici
    const safeCtx = ctx!;
    
    // Couleurs de base selon le thème
    const baseHue = isDark ? 240 : 180; // Bleu pour sombre, turquoise pour clair
    
    // Fonction pour créer une particule
    function createParticle(): Particle {
      const size = Math.random() * 3.5 + 1.5; // Particules légèrement plus grandes
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      
      // Variation de teinte autour de la couleur de base
      const hueVariation = 40; // ±40 degrés pour plus de variété
      const hue = baseHue + (Math.random() * hueVariation * 2) - hueVariation;
      
      // Couleur avec luminosité et saturation élevées
      const color = `hsla(${hue}, 95%, 75%, 0.9)`; // Augmenté luminosité et opacité
      
      // Vitesse aléatoire mais douce
      const speedFactor = 0.7; // Vitesse légèrement augmentée
      const vx = (Math.random() * 2 - 1) * speedFactor;
      const vy = (Math.random() * 2 - 1) * speedFactor;
      
      // Durée de vie aléatoire mais longue
      const maxLife = Math.random() * 300 + 150; // Durée de vie augmentée
      
      return {
        x,
        y,
        size,
        color,
        vx,
        vy,
        life: 0,
        maxLife,
        trail: [],
        trailLength: Math.floor(Math.random() * 8) + trailLength, // Traînées plus longues
        hue
      };
    }
    
    // Initialiser les particules
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle());
      // Initialiser la vie à une valeur aléatoire pour éviter que toutes les particules
      // ne se réinitialisent en même temps
      particles[i].life = Math.random() * particles[i].maxLife;
    }
    
    // Fonction pour mettre à jour et dessiner une particule
    function updateAndDrawParticle(particle: Particle) {
      // Mettre à jour la position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Augmenter la durée de vie
      particle.life++;
      
      // Ajouter la position actuelle à la traînée plus fréquemment
      if (particle.life % 1 === 0) { // Ajouter un point à chaque frame
        particle.trail.push({
          x: particle.x,
          y: particle.y,
          size: particle.size * 1.2 // Traînées plus larges
        });
        
        // Limiter la longueur de la traînée
        if (particle.trail.length > particle.trailLength) {
          particle.trail.shift();
        }
      }
      
      // Calculer l'opacité basée sur la durée de vie
      const opacityFactor = 1 - particle.life / particle.maxLife;
      
      // Dessiner la traînée avec effet de dégradé
      particle.trail.forEach((point, index) => {
        const trailOpacity = (index / particle.trail.length) * opacityFactor * 0.9; // Plus opaque
        const pointSize = point.size * (index / particle.trail.length);
        
        safeCtx.beginPath();
        safeCtx.arc(point.x, point.y, pointSize, 0, Math.PI * 2);
        safeCtx.fillStyle = particle.color.replace('0.9', String(trailOpacity));
        
        // Ajouter un halo à la traînée
        safeCtx.shadowBlur = pointSize * 3;
        safeCtx.shadowColor = particle.color.replace('0.9', String(trailOpacity * 0.8));
        
        safeCtx.fill();
        safeCtx.shadowBlur = 0;
      });
      
      // Dessiner la particule
      safeCtx.beginPath();
      safeCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      
      // Ajouter un halo lumineux plus intense
      safeCtx.shadowBlur = particle.size * 6;
      safeCtx.shadowColor = particle.color;
      
      // Dessiner avec opacité variable
      const mainOpacity = Math.min(1, opacityFactor * 1.8); // Augmenter l'opacité
      safeCtx.fillStyle = particle.color.replace('0.9', String(mainOpacity));
      safeCtx.fill();
      
      // Réinitialiser le flou pour optimiser les performances
      safeCtx.shadowBlur = 0;
      
      // Vérifier les rebonds sur les bords
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.vx *= -1;
      }
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.vy *= -1;
      }
      
      // Réinitialiser la particule si sa durée de vie est écoulée
      if (particle.life >= particle.maxLife) {
        const newParticle = createParticle();
        // Copier les propriétés vers la particule existante
        Object.assign(particle, newParticle);
        particle.trail = []; // Vider la traînée
      }
    }
    
    // Fonction d'animation avec limitation de fréquence
    let lastFrameTime = 0;
    const targetFPS = isLowPerformance ? 24 : 45; // FPS légèrement augmenté
    const frameInterval = 1000 / targetFPS;
    
    // Fonction d'animation
    function animate(timestamp: number) {
      if (timestamp - lastFrameTime < frameInterval) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      
      lastFrameTime = timestamp;
      
      // Effacer et redessiner le fond
      safeCtx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground();
      
      // Mettre à jour et dessiner toutes les particules
      particles.forEach(updateAndDrawParticle);
      
      // Effet de lueur globale pour le mode sombre
      if (isDark) {
        // Appliquer un flou sur tout le canvas pour un effet de lueur
        safeCtx.globalCompositeOperation = 'lighter';
        safeCtx.filter = 'blur(6px)'; // Augmenté l'effet de flou
        
        // Dessiner des points lumineux additionnels sur certaines particules
        particles.forEach((p, index) => {
          if (index % 2 === 0) {
            safeCtx.beginPath();
            safeCtx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
            safeCtx.fillStyle = p.color.replace('0.9', '0.3'); // Plus visible
            safeCtx.fill();
          }
        });
        
        // Réinitialiser les paramètres
        safeCtx.filter = 'none';
        safeCtx.globalCompositeOperation = 'source-over';
      }
      
      animationId = requestAnimationFrame(animate);
    }
    
    // Optimiser le redimensionnement avec throttle
    const handleResize = throttle(() => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }, 200);
    
    window.addEventListener('resize', handleResize);
    let animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [type, isDark, isLowPerformance]);
  
  // Animation du flux courbe organique
  useEffect(() => {
    if (type !== 'flow' || !flowRef.current) return;
    
    const container = flowRef.current;
    
    // S'assurer que le flowRef n'a pas de contenu précédent
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '1';
    canvas.style.pointerEvents = 'none';
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Paramètres pour la nouvelle animation de formes carrées
    const boxCount = isLowPerformance ? 15 : 30;
    const boxes: Array<{
      x: number,
      y: number,
      size: number,
      color: string,
      rotationSpeed: number,
      angle: number,
      speedX: number,
      speedY: number,
      borderWidth: number,
      borderColor: string,
      borderOnly: boolean
    }> = [];
    
    // Définir les couleurs basées sur le thème
    const fillColors = isDark 
      ? ['rgba(99, 102, 241, 0.2)', 'rgba(79, 70, 229, 0.15)', 'rgba(67, 56, 202, 0.1)']
      : ['rgba(20, 184, 166, 0.2)', 'rgba(16, 148, 136, 0.15)', 'rgba(15, 118, 110, 0.1)'];
    
    const borderColors = isDark 
      ? ['rgba(139, 142, 245, 0.4)', 'rgba(119, 110, 233, 0.35)', 'rgba(107, 96, 212, 0.3)']
      : ['rgba(45, 212, 191, 0.4)', 'rgba(36, 168, 156, 0.35)', 'rgba(35, 138, 130, 0.3)'];
    
    // Créer les formes carrées
    for (let i = 0; i < boxCount; i++) {
      const isSmall = Math.random() > 0.7;
      const size = isSmall 
        ? Math.random() * 40 + 20  // Petites formes: 20-60px
        : Math.random() * 80 + 60; // Grandes formes: 60-140px
      
      const colorIndex = Math.floor(Math.random() * fillColors.length);
      const borderOnly = Math.random() > 0.5; // 50% de chance d'avoir seulement une bordure
      
      boxes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: size,
        color: fillColors[colorIndex],
        rotationSpeed: (Math.random() - 0.5) * 0.01, // Rotation lente
        angle: Math.random() * Math.PI * 2,
        speedX: (Math.random() - 0.5) * 0.2, // Mouvement horizontal lent
        speedY: (Math.random() - 0.5) * 0.2, // Mouvement vertical lent
        borderWidth: Math.random() * 3 + 1,
        borderColor: borderColors[colorIndex],
        borderOnly: borderOnly
      });
    }
    
    // Fonction pour dessiner un carré avec rotation
    const drawSquare = (
      x: number, 
      y: number, 
      size: number, 
      angle: number, 
      fillColor: string, 
      borderColor: string, 
      borderWidth: number,
      borderOnly: boolean
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      
      // Dessiner le carré
      ctx.beginPath();
      ctx.rect(-size/2, -size/2, size, size);
      
      if (!borderOnly) {
        ctx.fillStyle = fillColor;
        ctx.fill();
      }
      
      ctx.lineWidth = borderWidth;
      ctx.strokeStyle = borderColor;
      ctx.stroke();
      
      ctx.restore();
    };
    
    // Fonction d'animation
    const animate = () => {
      if (!ctx) return;
      
      // Effacer le canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Mettre à jour et dessiner chaque carré
      boxes.forEach(box => {
        // Mettre à jour la position
        box.x += box.speedX;
        box.y += box.speedY;
        box.angle += box.rotationSpeed;
        
        // Vérifier les bords et rebondir si nécessaire
        if (box.x < -box.size/2) box.x = canvas.width + box.size/2;
        if (box.x > canvas.width + box.size/2) box.x = -box.size/2;
        if (box.y < -box.size/2) box.y = canvas.height + box.size/2;
        if (box.y > canvas.height + box.size/2) box.y = -box.size/2;
        
        // Dessiner le carré
        drawSquare(
          box.x, 
          box.y, 
          box.size, 
          box.angle,
          box.color,
          box.borderColor,
          box.borderWidth,
          box.borderOnly
        );
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    // Gérer le redimensionnement
    const handleResize = throttle(() => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Repositionner les formes pour qu'elles restent dans le canvas
      boxes.forEach(box => {
        if (box.x > canvas.width) box.x = Math.random() * canvas.width;
        if (box.y > canvas.height) box.y = Math.random() * canvas.height;
      });
    }, 200);
    
    window.addEventListener('resize', handleResize);
    let animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [type, isDark, isLowPerformance]);
  
  // Optimiser le rendu en limitant les changements d'opacité et en utilisant transform pour forcer l'accélération GPU
  return (
    <div className="fixed inset-0 z-0">
      {type === 'matrix' && <div ref={matrixRef} className="fixed inset-0 overflow-hidden" />}
      {type === 'waves' && <div ref={wavesRef} className="fixed inset-0 overflow-hidden" />}
      {type === 'stars' && <div ref={starsRef} className="fixed inset-0 overflow-hidden" />}
      {type === 'flow' && <div ref={flowRef} className="fixed inset-0 overflow-hidden" />}
    </div>
  );
}

export function getAnimationCode(type: AnimationType): string {
  // Renvoyer directement le code complet sans utiliser useState ou useEffect
  return getFullCode(type);
}

function getFullCode(type: AnimationType): string {
  switch (type) {
    case 'matrix':
      return `// Animation style réseau/grille
const nodeCount = 60; // Plus de noeuds
const maxConnections = 5; // Plus de connexions
const connectionThreshold = canvas.width / 5;
const nodes = [];

// Créer un filtre pour la lueur
const svgNS = 'http://www.w3.org/2000/svg';
const svg = document.createElementNS(svgNS, 'svg');
svg.setAttribute('width', '100%');
svg.setAttribute('height', '100%');
svg.style.position = 'absolute';
svg.style.top = '0';
svg.style.left = '0';
document.body.appendChild(svg);

// Ajouter un filtre pour effet de lueur
const defs = document.createElementNS(svgNS, 'defs');
const filter = document.createElementNS(svgNS, 'filter');
filter.setAttribute('id', 'glow');
filter.setAttribute('x', '-50%');
filter.setAttribute('y', '-50%');
filter.setAttribute('width', '200%');
filter.setAttribute('height', '200%');

const feGaussianBlur = document.createElementNS(svgNS, 'feGaussianBlur');
feGaussianBlur.setAttribute('stdDeviation', '2');
feGaussianBlur.setAttribute('result', 'blur');

const feComposite = document.createElementNS(svgNS, 'feComposite');
feComposite.setAttribute('in', 'SourceGraphic');
feComposite.setAttribute('in2', 'blur');
feComposite.setAttribute('operator', 'over');

filter.appendChild(feGaussianBlur);
filter.appendChild(feComposite);
defs.appendChild(filter);
svg.appendChild(defs);

// Créer les nœuds
for (let i = 0; i < nodeCount; i++) {
  const isSmall = Math.random() > 0.3; // 70% de petites particules
  const radius = isSmall ? Math.random() * 2 + 1 : Math.random() * 4 + 3;
  
  nodes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: radius,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Fond
  ctx.fillStyle = isDark 
    ? "rgba(17, 24, 39, 1)"
    : "rgba(240, 249, 255, 1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Effacer le SVG précédent
  while (svg.childNodes.length > 1) { // Garder les defs
    if (svg.lastChild !== defs) {
      svg.removeChild(svg.lastChild);
    }
  }
  
  // Mettre à jour les positions des nœuds
  for (const node of nodes) {
    node.x += node.vx;
    node.y += node.vy;
    
    // Rebond sur les bords
    if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
    if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
    
    // Dessiner le nœud avec SVG pour avoir la lueur
    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', node.x.toString());
    circle.setAttribute('cy', node.y.toString());
    circle.setAttribute('r', node.radius.toString());
    
    // Couleur selon le mode, plus visible
    const color = isDark 
      ? "rgba(139, 142, 245, 0.9)"
      : "rgba(45, 212, 191, 0.9)";
    circle.setAttribute('fill', color);
    circle.setAttribute('filter', 'url(#glow)');
    
    svg.appendChild(circle);
  }
  
  // Dessiner les connexions avec SVG
  for (let i = 0; i < nodes.length; i++) {
    let connections = 0;
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < connectionThreshold && connections < maxConnections) {
        const opacity = 0.4 * (1 - distance / connectionThreshold) + 0.2;
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('x1', nodes[i].x.toString());
        line.setAttribute('y1', nodes[i].y.toString());
        line.setAttribute('x2', nodes[j].x.toString());
        line.setAttribute('y2', nodes[j].y.toString());
        
        const color = isDark 
          ? \`rgba(139, 142, 245, \${opacity})\`
          : \`rgba(45, 212, 191, \${opacity})\`;
        line.setAttribute('stroke', color);
        line.setAttribute('stroke-width', '1.5');
        line.setAttribute('filter', 'url(#glow)');
        
        svg.appendChild(line);
        connections++;
      }
    }
  }
  
  requestAnimationFrame(animate);
}

animate();`;

    case 'waves':
      return `// Animation de vagues
const waveCount = 3;
const waves = [];

// Définir les paramètres des vagues
for (let i = 0; i < waveCount; i++) {
  waves.push({
    amplitude: 35 - i * 5,
    wavelength: canvas.width * (0.4 + i * 0.1),
    speed: 0.5 + i * 0.2,
    phase: Math.PI * i / waveCount
  });
}

const waveHeight = canvas.height * 0.6;
const waveSpread = 40;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Dessiner les vagues
  for (let i = 0; i < waves.length; i++) {
    const wave = waves[i];
    const time = Date.now() * 0.001;
    
    ctx.beginPath();
    ctx.moveTo(0, waveHeight + i * waveSpread);
    
    // Dessiner la courbe
    for (let x = 0; x < canvas.width; x += 5) {
      const dx = x / wave.wavelength;
      const y = waveHeight + i * waveSpread +
                Math.sin(dx * Math.PI * 2 + wave.phase + time * wave.speed) * wave.amplitude;
      ctx.lineTo(x, y);
    }
    
    // Compléter le chemin
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    
    // Remplir avec dégradé
    const gradient = ctx.createLinearGradient(0, waveHeight - wave.amplitude, 0, canvas.height);
    const baseColor = isDark 
      ? \`rgba(\${99 - i * 10}, \${102 - i * 10}, 241, \${0.4 - i * 0.05})\`
      : \`rgba(\${20 - i * 2}, \${184 - i * 10}, \${166 - i * 10}, \${0.4 - i * 0.05})\`;
    
    gradient.addColorStop(0, baseColor);
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.fill();
  }
  
  requestAnimationFrame(animate);
}

animate();`;

    case 'stars':
      return `// Animation de particules lumineuses avec traînées
const particles = [];
const particleCount = 50; // Plus de particules
const trailLength = 20; // Traînées plus longues

// Créer les particules
for (let i = 0; i < particleCount; i++) {
  const baseHue = isDark ? 240 : 180;
  const hueVariation = 40;
  const hue = baseHue + (Math.random() * hueVariation * 2) - hueVariation;
  
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 3.5 + 1.5,
    color: \`hsla(\${hue}, 95%, 75%, 0.9)\`,
    vx: (Math.random() * 2 - 1) * 0.7,
    vy: (Math.random() * 2 - 1) * 0.7,
    life: Math.random() * 300,
    maxLife: Math.random() * 300 + 150,
    trail: [],
    trailLength: Math.floor(Math.random() * 8) + trailLength
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Dessiner le fond
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  if (isDark) {
    gradient.addColorStop(0, 'rgba(15, 23, 42, 1)');
    gradient.addColorStop(1, 'rgba(30, 41, 59, 1)');
  } else {
    gradient.addColorStop(0, 'rgba(240, 249, 255, 1)');
    gradient.addColorStop(1, 'rgba(224, 242, 254, 1)');
  }
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Mettre à jour et dessiner chaque particule
  for (const p of particles) {
    // Mettre à jour la position
    p.x += p.vx;
    p.y += p.vy;
    p.life++;
    
    // Ajouter à la traînée plus fréquemment
    if (p.life % 1 === 0) {
      p.trail.push({x: p.x, y: p.y, size: p.size * 1.2});
      
      if (p.trail.length > p.trailLength) {
        p.trail.shift();
      }
    }
    
    // Calculer l'opacité
    const opacity = 1 - p.life / p.maxLife;
    
    // Dessiner la traînée avec effet de dégradé
    p.trail.forEach((point, index) => {
      const trailOpacity = (index / p.trail.length) * opacity * 0.9;
      const pointSize = point.size * (index / p.trail.length);
      
      ctx.beginPath();
      ctx.arc(point.x, point.y, pointSize, 0, Math.PI * 2);
      ctx.shadowBlur = pointSize * 3;
      ctx.shadowColor = p.color.replace('0.9', String(trailOpacity * 0.8));
      ctx.fillStyle = p.color.replace('0.9', String(trailOpacity));
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    
    // Dessiner la particule
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.shadowBlur = p.size * 6;
    ctx.shadowColor = p.color;
    ctx.fillStyle = p.color.replace('0.9', String(Math.min(1, opacity * 1.8)));
    ctx.fill();
    ctx.shadowBlur = 0;
    
    // Rebond sur les bords
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    
    // Réinitialiser si nécessaire
    if (p.life >= p.maxLife) {
      p.x = Math.random() * canvas.width;
      p.y = Math.random() * canvas.height;
      p.life = 0;
      p.trail = [];
    }
  }
  
  // Effet de lueur globale pour le mode sombre
  if (isDark) {
    ctx.globalCompositeOperation = 'lighter';
    ctx.filter = 'blur(6px)';
    
    particles.forEach((p, index) => {
      if (index % 2 === 0) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace('0.9', '0.3');
        ctx.fill();
      }
    });
    
    ctx.filter = 'none';
    ctx.globalCompositeOperation = 'source-over';
  }
  
  requestAnimationFrame(animate);
}

animate();`;
      
    case 'flow':
      return `// Animation de formes géométriques carrées
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Paramètres pour l'animation
const boxCount = 30;
const boxes = [];

// Définir les couleurs basées sur le thème
const fillColors = isDark 
  ? ['rgba(99, 102, 241, 0.2)', 'rgba(79, 70, 229, 0.15)', 'rgba(67, 56, 202, 0.1)']
  : ['rgba(20, 184, 166, 0.2)', 'rgba(16, 148, 136, 0.15)', 'rgba(15, 118, 110, 0.1)'];

const borderColors = isDark 
  ? ['rgba(139, 142, 245, 0.4)', 'rgba(119, 110, 233, 0.35)', 'rgba(107, 96, 212, 0.3)']
  : ['rgba(45, 212, 191, 0.4)', 'rgba(36, 168, 156, 0.35)', 'rgba(35, 138, 130, 0.3)'];

// Créer les formes carrées
for (let i = 0; i < boxCount; i++) {
  const isSmall = Math.random() > 0.7;
  const size = isSmall 
    ? Math.random() * 40 + 20
    : Math.random() * 80 + 60;
  
  const colorIndex = Math.floor(Math.random() * fillColors.length);
  const borderOnly = Math.random() > 0.5;
  
  boxes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: size,
    color: fillColors[colorIndex],
    rotationSpeed: (Math.random() - 0.5) * 0.01,
    angle: Math.random() * Math.PI * 2,
    speedX: (Math.random() - 0.5) * 0.2,
    speedY: (Math.random() - 0.5) * 0.2,
    borderWidth: Math.random() * 3 + 1,
    borderColor: borderColors[colorIndex],
    borderOnly: borderOnly
  });
}

// Fonction pour dessiner un carré avec rotation
function drawSquare(x, y, size, angle, fillColor, borderColor, borderWidth, borderOnly) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  
  ctx.beginPath();
  ctx.rect(-size/2, -size/2, size, size);
  
  if (!borderOnly) {
    ctx.fillStyle = fillColor;
    ctx.fill();
  }
  
  ctx.lineWidth = borderWidth;
  ctx.strokeStyle = borderColor;
  ctx.stroke();
  
  ctx.restore();
}

function animate() {
  // Effacer le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Mettre à jour et dessiner chaque carré
  boxes.forEach(box => {
    // Mettre à jour la position
    box.x += box.speedX;
    box.y += box.speedY;
    box.angle += box.rotationSpeed;
    
    // Vérifier les bords et rebondir si nécessaire
    if (box.x < -box.size/2) box.x = canvas.width + box.size/2;
    if (box.x > canvas.width + box.size/2) box.x = -box.size/2;
    if (box.y < -box.size/2) box.y = canvas.height + box.size/2;
    if (box.y > canvas.height + box.size/2) box.y = -box.size/2;
    
    // Dessiner le carré
    drawSquare(
      box.x, 
      box.y, 
      box.size, 
      box.angle,
      box.color,
      box.borderColor,
      box.borderWidth,
      box.borderOnly
    );
  });
  
  requestAnimationFrame(animate);
}

animate();`;
  }
  
  return '';
} 