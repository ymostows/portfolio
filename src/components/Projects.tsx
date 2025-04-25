import { Github, ExternalLink, Star, Code, GitFork, X, Eye, Laptop, ChevronRight, Flame, Award, Calendar } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useState, useCallback, useRef, useEffect } from 'react';

type LanguageType = "TypeScript" | "C++" | "Docker" | "C" | "React";

type ProjectType = {
  title: string;
  owner: string;
  description: string;
  tech: string[];
  github: string;
  isPublic: boolean;
  language: LanguageType;
  screenshot: string; // URL de la capture d'écran
  isGif?: boolean; // Flag pour indiquer si c'est un GIF
  featured?: boolean;
  year?: string;
  demo?: string;
};

const projects: ProjectType[] = [
  {
    title: "ft_transcendence42",
    owner: "RuddyRisselin",
    description: "The Final Boss of 42's Common Core ft_transcendence is the ultimate web development project at the end of the 42 Common Core. It challenges students to build a real-time, multiplayer Pong web application — and go way beyond. You'll touch every layer of modern fullstack development: frontend, backend, security, DevOps, AI, and more. All while building a product that's complex, beautiful, and fun to use.",
    tech: ["TypeScript","Tailwind CSS", "NodeJS", "SQLite", "Docker"],
    github: "https://github.com/RuddyRisselin/ft_transcendence42",
    isPublic: true,
    language: "TypeScript",
    screenshot: "/gifs/pong-game.gif",
    isGif: true,
    featured: true,
    year: "2025",
    demo: "https://example.com/demo"
  },
  {
    title: "invoicecreator",
    owner: "yourusername",
    description: "InvoiceCreator is a personal project built with React to practice and learn modern web development concepts. It connects to a n8n workflow to fetch invoice information and generates a PDF invoice automatically.",
    tech: ["React", "Workflow n8n", "Tailwind CSS"],
    github: "https://github.com/HeedzZ/invoicecreactor",
    isPublic: true,
    language: "React",
    screenshot: "/gifs/invoice-creator.gif",
    isGif: true,
    featured: true,
    year: "2025",
    demo: "https://invoicecreator-demo.vercel.app"
  },
  {
    title: "webserv",
    owner: "yourusername",
    description: "Webserv is a common core group project from 42 school: building a fully functional HTTP server from scratch in C++98 using low-level sockets, non-blocking I/O, and poll.",
    tech: ["C++", "HTTP", "Networking", "Unix"],
    github: "https://github.com/HeedzZ/webserv",
    isPublic: true,
    language: "C++",
    screenshot: "/gifs/webserv.gif",
    isGif: true,
    featured: true,
    year: "2024"
  },
  {
    title: "inception",
    owner: "yourusername",
    description: "A common core project from 42 school: deploying a Docker-based infrastructure with containerized services including NGINX, WordPress, and MariaDB.",
    tech: ["Docker", "Docker-Compose", "NGINX", "WordPress", "MariaDB"],
    github: "https://github.com/HeedzZ/inception",
    isPublic: true,
    language: "Docker",
    screenshot: "/images/docker-2.png",
    year: "2025"
  },
  {
    title: "c++ pool",
    owner: "yourusername",
    description: "Its a project from 42 school that introduces the basics of C++ and Object-Oriented Programming.",
    tech: ["C++", "OOP", "Data Structures"],
    github: "https://github.com/yourusername/cpp",
    isPublic: true,
    language: "C++",
    screenshot: "/images/cpp-code.jpg",
    year: "2024"
  },
  {
    title: "cube3D",
    owner: "slink7",
    description: "A common core group project from 42 school: creating a 3D raycasting engine inspired by Wolfenstein 3D, featuring texture mapping, collision detection and a 3D rendering. It's also the last C project of the 42 Common Core.",
    tech: ["C", "Graphics", "Mathematics"],
    github: "https://github.com/slink7/cube3D",
    isPublic: true,
    language: "C",
    screenshot: "/gifs/cube3d.gif",
    isGif: true,
    featured: true,
    year: "2024",
    demo: "https://example.com/demo"
  },
  {
    title: "minishell",
    owner: "slink7",
    description: "A common core group project from 42 school: implementing a simple shell similar to Bash, with built-in commands, environment variables, and support for pipes.",
    tech: ["C", "Unix", "Parsing"],
    github: "https://github.com/slink7/minishell",
    isPublic: true,
    language: "C",
    screenshot: "/images/terminal.jpg",
    year: "2024"
  }
];

const getLanguageColor = (language: LanguageType): string => {
  const colors: Record<LanguageType, string> = {
    "TypeScript": "text-emerald-600 dark:text-blue-400 bg-emerald-100 dark:bg-blue-400/10 border-emerald-200 dark:border-blue-400/30",
    "C++": "text-green-600 dark:text-slate-400 bg-green-100 dark:bg-slate-400/10 border-green-200 dark:border-slate-400/30",
    "Docker": "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-400/10 border-amber-200 dark:border-amber-400/30",
    "C": "text-teal-600 dark:text-blue-500 bg-teal-100 dark:bg-blue-500/10 border-teal-200 dark:border-blue-500/30",
    "React": "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-400/10 border-blue-200 dark:border-blue-400/30",
  };
  
  return colors[language] || "text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-400/10 border-gray-200 dark:border-gray-400/30";
};

// Composant pour l'animation au défilement
const FadeInOnScroll = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
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
  
  return (
    <div
      ref={elementRef}
      className="transition-all duration-700"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// Composant pour la carte de projet
const ProjectCard = ({ 
  project, 
  onClick, 
  isFeatured = false 
}: { 
  project: ProjectType, 
  onClick: (project: ProjectType) => void,
  isFeatured?: boolean
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  const handleImageLoad = () => {
    setImagesLoaded(true);
  };
  
  // Effet de parallaxe sur la carte
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 40;
    const rotateY = (centerX - x) / 40;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };
  
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    setIsHovered(false);
  };
  
  return (
    <div 
      ref={cardRef}
      className={`group relative overflow-hidden bg-white/70 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 ${
        isFeatured ? 'md:col-span-2 md:row-span-2' : ''
      }`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.2s ease' }}
    >
      {/* Badge pour les projets en vedette */}
      {project.featured && (
        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-500 dark:from-blue-600 dark:to-indigo-700 text-white text-xs font-medium rounded-full flex items-center gap-1">
          <Flame className="w-3 h-3" />
          Featured
        </div>
      )}
      
      {/* Année du projet */}
      {project.year && (
        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {project.year}
        </div>
      )}
      
      {/* Image de couverture */}
      <div 
        className="aspect-video overflow-hidden relative"
        onClick={() => onClick(project)}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 z-0">
          <Code className="w-10 h-10 text-emerald-500 dark:text-blue-600" />
        </div>
        
        <img 
          src={project.screenshot} 
          alt={project.title} 
          className={`w-full h-full object-cover transition-all duration-500 ${
            imagesLoaded ? 'opacity-100' : 'opacity-0'
          } ${isHovered && !project.isGif ? 'scale-110 blur-[1px]' : 'scale-100'}`}
          onLoad={handleImageLoad}
        />
        
        <div className={`absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-70'
        }`}></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-1">
          <h3 className="text-xl font-bold text-white drop-shadow-md">{project.title}</h3>
          
          <div className="flex items-center gap-3 text-white/90 text-sm">
            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full backdrop-blur-sm bg-white/10 text-xs border ${
              getLanguageColor(project.language).split(' ')[0]
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full bg-current`}></span>
              {project.language}
            </div>
          </div>
        </div>
        
        {/* Boutons d'action superposés */}
        <div className={`absolute inset-0 flex items-center justify-center gap-4 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button 
            className="px-4 py-2 bg-emerald-600/90 dark:bg-blue-700/90 hover:bg-emerald-700 dark:hover:bg-blue-800 text-white rounded-lg transition-colors flex items-center gap-2 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              onClick(project);
            }}
          >
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </button>
          <a 
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-lg transition-colors flex items-center gap-2 backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <Github className="w-4 h-4" />
            <span>Code</span>
          </a>
        </div>
      </div>
      
      <div className="p-5">
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
          {project.description}
        </p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tech.slice(0, isFeatured ? 5 : 3).map(tech => (
            <span 
              key={tech} 
              className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-700 dark:text-gray-300 text-xs"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > (isFeatured ? 5 : 3) && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-700 dark:text-gray-300 text-xs">
              +{project.tech.length - (isFeatured ? 5 : 3)}
            </span>
          )}
        </div>
        
        {/* Lien Github et démo */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
            <Github className="w-3 h-3" />
            {project.owner}
          </div>
          
          {project.demo && (
            <a 
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-600 dark:text-blue-400 text-sm hover:text-emerald-700 dark:hover:text-blue-300 transition-colors"
            >
              <Laptop className="w-3 h-3" />
              <span>Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export function Projects() {
  const { t } = useLanguage();
  const [activeProject, setActiveProject] = useState<ProjectType | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [filterLanguage, setFilterLanguage] = useState<LanguageType | "All">("All");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  
  const filteredProjects = filterLanguage === "All" 
    ? projects 
    : projects.filter(p => p.language === filterLanguage);
  
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );
  
  const openPreview = useCallback((project: ProjectType) => {
    setActiveProject(project);
    setIsPreviewOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);
  
  const closePreview = useCallback(() => {
    setIsPreviewOpen(false);
    document.body.style.overflow = '';
  }, []);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top of projects section
    document.getElementById('projects-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  const totalLanguages = ["All", ...Array.from(new Set(projects.map(p => p.language)))];
  
  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterLanguage]);
  
  // Component for GitHub Link Card
  const GitHubCard = () => (
    <a 
      href="https://github.com/HeedzZ" 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex flex-col items-center justify-center h-full bg-white/70 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-xl transition-all p-8 text-center group"
    >
      <div className="mb-6 p-4 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 dark:from-blue-600 dark:to-indigo-700">
        <Github className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Découvrez mes autres projets</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Consultez mon GitHub pour explorer mes projets plus petits et mes expérimentations techniques
      </p>
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 dark:bg-blue-700 text-white rounded-lg transition-all group-hover:bg-emerald-700 dark:group-hover:bg-blue-800">
        <span>Voir sur GitHub</span>
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </a>
  );
  
  return (
    <section id="projects" className="relative z-30">
      {/* Modal de prévisualisation */}
      {isPreviewOpen && activeProject && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8">
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
            <button 
              onClick={closePreview}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 text-gray-800 dark:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <div className="h-48 md:h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img 
                    src={activeProject.screenshot} 
                    alt={activeProject.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <h2 className="text-3xl font-bold">{activeProject.title}</h2>
                  <div className="flex items-center gap-3 mt-2">
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border backdrop-blur-sm ${getLanguageColor(activeProject.language)}`}>
                      <span className={`w-2 h-2 rounded-full bg-current`}></span>
                      {activeProject.language}
                    </div>
                    {activeProject.year && (
                      <div className="px-3 py-1 bg-gray-100/20 backdrop-blur-sm text-white text-xs font-medium rounded-full flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {activeProject.year}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-2/3">
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">About this project</h3>
                      <p className="text-gray-700 dark:text-gray-300">{activeProject.description}</p>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.tech.map(tech => (
                          <span 
                            key={tech} 
                            className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/3 space-y-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Project Details</h3>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Owner</span>
                          <span className="text-gray-900 dark:text-white font-medium">{activeProject.owner}</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Visibility</span>
                          <span className="text-gray-900 dark:text-white font-medium">{activeProject.isPublic ? "Public" : "Private"}</span>
                        </div>
                        
                        {activeProject.year && (
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Year</span>
                            <span className="text-gray-900 dark:text-white font-medium">{activeProject.year}</span>
                          </div>
                        )}
                        
                        <div className="pt-4 flex flex-col gap-3">
                          <a 
                            href={activeProject.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 dark:bg-blue-700 hover:bg-emerald-700 dark:hover:bg-blue-800 text-white rounded-lg transition-colors w-full justify-center"
                          >
                            <Github className="w-4 h-4" />
                            <span>View on GitHub</span>
                          </a>
                          
                          {activeProject.demo && (
                            <a 
                              href={activeProject.demo} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-colors border border-gray-300 dark:border-gray-600 w-full justify-center"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span>Live Demo</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Conteneur principal */}
      <div className="container relative mx-auto px-6 py-6 rounded-xl bg-white/30 dark:bg-black/30 backdrop-blur-sm shadow-lg dark:shadow-none border border-gray-300 dark:border-white/10">
        <FadeInOnScroll>
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
              {t('Projects')}
            </h2>
            <p className="text-gray-700 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              My showcase of open-source projects and technical experiments.
            </p>
          </div>
        </FadeInOnScroll>
        
        {/* Section des projets vedettes */}
        <FadeInOnScroll delay={100}>
          <div className="mb-6">
            <h3 className="flex items-center text-xl font-bold text-gray-900 dark:text-white mb-3">
              <Award className="w-5 h-5 text-emerald-500 dark:text-blue-500 mr-2" />
              Featured Projects
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.filter(p => p.featured).map((project, idx) => (
                <FadeInOnScroll key={project.title} delay={idx * 100}>
                  <ProjectCard 
                    project={project} 
                    onClick={openPreview}
                    isFeatured 
                  />
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </FadeInOnScroll>
        
        {/* Filtres de langue */}
        <FadeInOnScroll delay={200}>
          <div className="mb-3">
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {totalLanguages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setFilterLanguage(lang as LanguageType | "All")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filterLanguage === lang
                      ? 'bg-emerald-600 dark:bg-blue-700 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
            
            <div id="projects-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProjects.map((project, idx) => (
                <FadeInOnScroll key={project.title} delay={idx * 100}>
                  <ProjectCard project={project} onClick={openPreview} />
                </FadeInOnScroll>
              ))}
              
              {/* GitHub Card */}
              {filterLanguage === "All" && currentPage === totalPages && (
                <FadeInOnScroll delay={currentProjects.length * 100}>
                  <GitHubCard />
                </FadeInOnScroll>
              )}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg border ${
                      currentPage === 1 
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed border-gray-200 dark:border-gray-700' 
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700'
                    }`}
                    aria-label="Previous page"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        currentPage === page
                          ? 'bg-emerald-600 dark:bg-blue-700 text-white font-medium'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                      }`}
                      aria-label={`Page ${page}`}
                      aria-current={currentPage === page ? 'page' : undefined}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button 
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg border ${
                      currentPage === totalPages 
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed border-gray-200 dark:border-gray-700' 
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700'
                    }`}
                    aria-label="Next page"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}