import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr';

type LanguageContextType = {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
};

type TranslationSet = {
  en: string;
  fr: string;
};

type TranslationMap = {
  [key: string]: TranslationSet;
};

const translations: TranslationMap = {
  // Header
  'about': {
    en: 'About',
    fr: 'À propos'
  },
  'projects': {
    en: 'Projects',
    fr: 'Projets'
  },
  'contact': {
    en: 'Contact',
    fr: 'Contact'
  },
  'changeTheme': {
    en: 'Change theme',
    fr: 'Changer de thème'
  },
  
  // Hero
  'welcome': {
    en: 'Welcome to my portfolio',
    fr: 'Bienvenue sur mon portfolio'
  },
  'iAmA': {
    en: 'I\'m a',
    fr: 'Je suis'
  },
  'developer': {
    en: 'Developer',
    fr: 'Développeur'
  },
  'fullStack': {
    en: 'Full-Stack',
    fr: 'Full-Stack'
  },
  'heroDescription': {
    en: 'I enjoy crafting complete web applications that are both interactive and intuitive.',
    fr: "J'aime concevoir des applications web complètes, à la fois interactives et intuitives."
  },
  'iCode': {
    en: 'I code',
    fr: 'Je code'
  },
  'interactiveBackground': {
    en: 'Interactive Background',
    fr: 'Fond Interactif'
  },
  'animatedNetwork': {
    en: 'Animated network system in background',
    fr: 'Système de réseau animé en arrière-plan'
  },
  'codeDemos': {
    en: 'Code Demos',
    fr: 'Démos de Code'
  },
  'interactiveReact': {
    en: 'Interactive React code examples',
    fr: 'Exemples de code React interactifs'
  },
  'showAnimationCode': {
    en: 'Show Animation Code',
    fr: 'Voir le Code d\'Animation'
  },
  'sourceCode': {
    en: 'Source Code',
    fr: 'Code Source'
  },
  'seeAnimationCode': {
    en: 'View animation implementation',
    fr: 'Voir l\'implémentation de l\'animation'
  },
  'exploreExamples': {
    en: 'My projects',
    fr: 'Mes projets'
  },
  'viewSourceCode': {
    en: 'View Source Code',
    fr: 'Voir le Code Source'
  },
  'preview': {
    en: 'Preview',
    fr: 'Aperçu'
  },
  'animationControls': {
    en: 'Animation Controls',
    fr: 'Contrôles d\'Animation'
  },
  'animatedSquares': {
    en: 'Animated squares',
    fr: 'Carrés animés'
  },
  'squares': {
    en: 'Squares',
    fr: 'Carrés'
  },
  'matrixRain': {
    en: 'Matrix-style character rain',
    fr: 'Pluie de caractères style Matrix'
  },
  'matrix': {
    en: 'Matrix',
    fr: 'Matrix'
  },
  'fluidWaves': {
    en: 'Fluid waves',
    fr: 'Vagues fluides'
  },
  'waves': {
    en: 'Waves',
    fr: 'Vagues'
  },
  'luminousParticles': {
    en: 'Luminous particles',
    fr: 'Particules lumineuses'
  },
  'particles': {
    en: 'Particles',
    fr: 'Particules'
  },
  'myProjects': {
    en: 'My projects',
    fr: 'Mes projets'
  },

  // About
  'aboutMe': {
    en: 'About Me',
    fr: 'À propos de moi'
  },
  'personalDescription': {
    en: 'I am a passionate developer who loves creating modern web applications. My journey at École 42 has given me a solid foundation, and I enjoy combining different technologies to build elegant and efficient solutions that solve real problems.',
    fr: 'Passionné par le développement, j\'aime créer des applications web modernes et intuitives. Mon parcours à l\'École 42 m\'a donné une solide formation, et j\'apprécie particulièrement combiner différentes technologies pour concevoir des solutions élégantes qui répondent à de vrais besoins.'
  },
  'location': {
    en: 'Location',
    fr: 'Localisation'
  },
  'experience': {
    en: 'Experience',
    fr: 'Expérience'
  },
  'education': {
    en: 'Education',
    fr: 'Formation'
  },
  'yearsExperience': {
    en: 'year',
    fr: 'ans'
  },
  'locationValue': {
    en: 'Paris, France',
    fr: 'Paris, France'
  },
  'downloadCV': {
    en: 'Download CV',
    fr: 'Télécharger CV'
  },
  'technologiesMastered': {
    en: 'Technologies Mastered',
    fr: 'Technologies maîtrisées'
  },
  'aboutDescription': {
    en: "Here's an overview of my skills. I'd like to point out that the skill bars are more for visual style than accuracy. I mainly wanted to use this design, and I just tried to rate myself as honestly as possible.",
    fr: "Voici un aperçu de mes compétences. Je tiens à préciser que les barres de niveau sont à prendre avec du recul. J'ai surtout voulu utiliser ce style de design, et j'ai simplement essayé de m'auto-évaluer du mieux possible."
  },
  'beginner': {
    en: 'Beginner',
    fr: 'Débutant'
  },
  'intermediate': {
    en: 'Intermediate',
    fr: 'Intermédiaire'
  },
  'advanced': {
    en: 'Advanced',
    fr: 'Avancé'
  },
  'expert': {
    en: 'Expert',
    fr: 'Expert'
  },
  'mastery': {
    en: 'Mastery',
    fr: 'Maîtrise'
  },
  'technologiesPlural': {
    en: 'technologies',
    fr: 'technologies'
  },
  'technologiesSingular': {
    en: 'technology',
    fr: 'technologie'
  },
  'clickForMore': {
    en: 'Click for more info',
    fr: 'Cliquez pour plus d\'infos'
  },
  'goBack': {
    en: 'Go back',
    fr: 'Retourner'
  },
  'school42': {
    en: 'School 42',
    fr: 'École 42'
  },
  'school42Period': {
    en: '2018 - 2022',
    fr: '2018 - 2022'
  },
  'school42Description': {
    en: 'Digital Technology Architect',
    fr: 'Architecte des technologies numériques'
  },
  'baccalaureate': {
    en: 'General Baccalaureate',
    fr: 'Baccalauréat Général'
  },
  'baccalaureatePeriod': {
    en: '2022 - 2023',
    fr: '2022 - 2023'
  },
  'baccalaureateDescription': {
    en: 'Mathematics and Computer Science specialties\nJean Pierre Timbaud High School',
    fr: 'Spécialités Mathématiques et Informatique\nLycée Jean Pierre Timbaud'
  },
  'professionalGoals': {
    en: 'Professional Goals',
    fr: 'Objectifs professionnels'
  },
  'goalsDescription': {
    en: 'Develop my skills in full-stack development, be versatile and adapt to new technologies, then eventually specialize in a specific area.',
    fr: 'Développer mes compétences en développement full-stack, être polyvalent et m\'adapter à des nouvelles technologies puis par la suite me spécialiser dans un domaine.'
  },
  'codingInstructor': {
    en: 'Freelance Coding Instructor',
    fr: 'Formateur Freelance en Programmation'
  },
  'magicMakers': {
    en: 'Magic Makers – Remote & On-Site (Paris) • 2024 - Currently',
    fr: 'Magic Makers – À distance & Sur site (Paris) • 2024 - Actuellement'
  },
  'instructorDesc1': {
    en: '• Teach web development, Python, and Unity basics to teenagers',
    fr: '• Enseigne le développement web, Python et les bases d\'Unity aux adolescents'
  },
  'instructorDesc2': {
    en: '• Conduct workshops both online and in-person',
    fr: '• Anime des ateliers en ligne et en présentiel'
  },
  'freelanceWebDev': {
    en: 'Freelance Web Developer',
    fr: 'Développeur Web Freelance'
  },
  'selfEmployed': {
    en: 'Self-employed – Remote • 2024 - Currently',
    fr: 'Auto-entrepreneur – À distance • 2024 - Actuellement'
  },
  'freelanceDesc1': {
    en: '• Develop websites and web applications for small clients',
    fr: '• Développe des sites web et des applications web pour des petits clients'
  },
  'freelanceDesc2': {
    en: '• Use modern web technologies like TypeScript, React, Node.js and Docker',
    fr: '• Utilise des technologies web modernes comme TypeScript, React, Node.js et Docker'
  },
  'exploreSkills': {
    en: 'Explore my skills',
    fr: 'Explorez mes compétences'
  },
  'selectCategory': {
    en: 'Select a category in the bar above to discover my technical skills and level of experience',
    fr: 'Sélectionnez une catégorie dans la barre ci-dessus pour découvrir mes compétences techniques et mon niveau d\'expérience'
  },
  'exploration': {
    en: 'Exploration',
    fr: 'Exploration'
  },
  'explorationDesc': {
    en: 'I am discovering this technology and starting to use it in simple projects.',
    fr: 'Je découvre cette technologie et commence à l\'utiliser dans des projets simples.'
  },
  'regularPractice': {
    en: 'Regular Practice',
    fr: 'Pratique régulière'
  },
  'practiceDesc': {
    en: 'I use it actively in my projects and can solve common problems.',
    fr: 'Je l\'utilise activement dans mes projets et peux résoudre les problèmes courants.'
  },
  'solidExperience': {
    en: 'Solid Experience',
    fr: 'Expérience solide'
  },
  'experienceDesc': {
    en: 'I master advanced concepts and can implement complex solutions.',
    fr: 'Je maîtrise les concepts avancés et peux implémenter des solutions complexes.'
  },
  'confirmedExpertise': {
    en: 'Confirmed Expertise',
    fr: 'Expertise confirmée'
  },
  'expertiseDesc': {
    en: 'I can optimize performance and share my knowledge with others.',
    fr: 'Je peux optimiser les performances et partager mes connaissances avec d\'autres.'
  },
  'deepMastery': {
    en: 'Deep Mastery',
    fr: 'Maîtrise approfondie'
  },
  'masteryDesc': {
    en: 'I can innovate and create advanced solutions in this field.',
    fr: 'Je peux innover et créer des solutions avancées dans ce domaine.'
  },
  'present': {
    en: 'Present',
    fr: 'Présent'
  },

  // Projects
  'featuredProjects': {
    en: 'Featured Projects',
    fr: 'Projets en Vedette'
  },
  'all': {
    en: 'All',
    fr: 'Tous'
  },
  'code': {
    en: 'Code',
    fr: 'Code'
  },
  'demo': {
    en: 'Demo',
    fr: 'Démo'
  },
  'featured': {
    en: 'Featured',
    fr: 'En vedette'
  },
  'discoverOtherProjects': {
    en: 'Discover my other projects',
    fr: 'Découvrez mes autres projets'
  },
  'checkGitHub': {
    en: 'Check out my GitHub to explore my smaller projects and technical experiments',
    fr: 'Consultez mon GitHub pour explorer mes projets plus petits et mes expérimentations techniques'
  },
  'viewOnGitHub': {
    en: 'View on GitHub',
    fr: 'Voir sur GitHub'
  },
  'aboutProject': {
    en: 'About this project',
    fr: 'À propos de ce projet'
  },
  'technologies': {
    en: 'Technologies',
    fr: 'Technologies'
  },
  'projectDetails': {
    en: 'Project Details',
    fr: 'Détails du projet'
  },
  'owner': {
    en: 'Owner',
    fr: 'Propriétaire'
  },
  'visibility': {
    en: 'Visibility',
    fr: 'Visibilité'
  },
  'public': {
    en: 'Public',
    fr: 'Public'
  },
  'private': {
    en: 'Private',
    fr: 'Privé'
  },
  'year': {
    en: 'Year',
    fr: 'Année'
  },
  'liveDemo': {
    en: 'Live Demo',
    fr: 'Démo en ligne'
  },
  'clickForInfo': {
    en: 'Click for info',
    fr: 'Cliquez pour infos'
  },
  
  // Contact
  'contactTitle': {
    en: 'Contact',
    fr: 'Contact'
  },
  'contactDescription': {
    en: 'Interested in a collaboration? Let\'s discuss your project.',
    fr: 'Intéressé par une collaboration ? Discutons de votre projet.'
  },
  'sendMeMessage': {
    en: 'Send me a message',
    fr: 'Envoyez-moi un message'
  },
  'name': {
    en: 'Name',
    fr: 'Nom'
  },
  'yourName': {
    en: 'Your name',
    fr: 'Votre nom'
  },
  'subject': {
    en: 'Subject',
    fr: 'Sujet'
  },
  'subjectPlaceholder': {
    en: 'Subject of your message',
    fr: 'Sujet de votre message'
  },
  'message': {
    en: 'Message',
    fr: 'Message'
  },
  'messagePlaceholder': {
    en: 'Your message...',
    fr: 'Votre message...'
  },
  'send': {
    en: 'Send message',
    fr: 'Envoyer le message'
  },
  'contactInfo': {
    en: 'Contact Information',
    fr: 'Coordonnées'
  },
  'currentAvailability': {
    en: 'Current Availability',
    fr: 'Disponibilité actuelle'
  },
  'availableForFreelance': {
    en: 'Available for freelance projects',
    fr: 'Disponible pour missions freelance'
  },
  'lookingForOpportunities': {
    en: 'Actively looking for new collaboration opportunities on innovative technical projects.',
    fr: 'Je recherche activement de nouvelles opportunités de collaboration sur des projets techniques innovants.'
  },
  
  // Footer
  'allRightsReserved': {
    en: 'All rights reserved.',
    fr: 'Tous droits réservés.'
  },
  'madeWith': {
    en: 'Made with',
    fr: 'Fait avec'
  },
  'by': {
    en: 'by',
    fr: 'par'
  },
  'navigation': {
    en: 'Navigation',
    fr: 'Navigation'
  },
  'quickLinks': {
    en: 'Quick Links',
    fr: 'Liens Rapides'
  },
  'learnMore': {
    en: 'Learn more',
    fr: 'En savoir plus'
  },
  'footerDescription': {
    en: 'Creating modern web experiences with cutting-edge technologies.',
    fr: 'Création d\'expériences web modernes avec des technologies de pointe.'
  },
  
  // Language
  'switchToLanguage': {
    en: 'FR',
    fr: 'EN'
  },

  // Skill levels
  'levelBeginner': {
    en: 'Beginner',
    fr: 'Débutant'
  },
  'levelIntermediate': {
    en: 'Intermediate',
    fr: 'Intermédiaire'
  },
  'levelAdvanced': {
    en: 'Advanced',
    fr: 'Avancé'
  },
  'levelExpert': {
    en: 'Expert',
    fr: 'Expert'
  },
  'levelMastery': {
    en: 'Mastery',
    fr: 'Maîtrise'
  },
  
  // Skill categories
  'frontEndCategory': {
    en: 'Front End',
    fr: 'Front End'
  },
  'backEndCategory': {
    en: 'Back End',
    fr: 'Back End'
  },
  'lowLevelCategory': {
    en: 'Low Level Languages',
    fr: 'Langages Bas Niveau'
  },
  'devOpsCategory': {
    en: 'DevOps',
    fr: 'DevOps'
  },
  'databasesCategory': {
    en: 'Databases',
    fr: 'Bases de données'
  },
  'toolsCategory': {
    en: 'Tools',
    fr: 'Outils'
  },
  
  // Skills experience
  'typescriptExp': {
    en: 'I built a web application with this technology.',
    fr: 'J\'ai construit une application web avec cette technologie.'
  },
  'javascriptExp': {
    en: 'I mainly use it with Node.js and Next.js, but I know the language well.',
    fr: 'Je l\'utilise principalement avec Node.js et Next.js, mais je connais bien le langage.'
  },
  'reactExp': {
    en: 'All my recent projects, including this portfolio, are built with it.',
    fr: 'Tous mes projets récents, y compris ce portfolio, sont construits avec.'
  },
  'htmlCssExp': {
    en: 'I learned it at school and apply these concepts daily.',
    fr: 'Je l\'ai appris à l\'école et j\'applique ces concepts quotidiennement.'
  },
  'tailwindExp': {
    en: 'I use it in all my web projects and find it very useful.',
    fr: 'Je l\'utilise dans tous mes projets web et le trouve très utile.'
  },
  'nodejsExp': {
    en: 'I built a web application with this technology.',
    fr: 'J\'ai construit une application web avec cette technologie.'
  },
  'nextjsExp': {
    en: 'I use it for all my web projects and find it very useful.',
    fr: 'Je l\'utilise pour tous mes projets web et le trouve très utile.'
  },
  'pythonExp': {
    en: 'I learned it at school and did many projects with it, but nothing related to web development. I also teach private lessons in Digital and Computer Science. And my courses at Magic Makers are based on Python.',
    fr: 'Je l\'ai appris à l\'école et j\'ai fait beaucoup de projets avec, mais rien lié au développement web. Je fais aussi des cours particuliers de NSI (Numérique et Sciences Informatiques). Et mes cours chez Magic Makers sont basés sur Python.'
  },
  'cExp': {
    en: 'It\'s the first language we learn at 42 school and there are many projects that use it.',
    fr: 'C\'est le premier langage que nous apprenons à l\'école 42 et il y a beaucoup de projets qui l\'utilisent.'
  },
  'cppExp': {
    en: 'It\'s the second language we learn at 42 school and there are many projects that use it.',
    fr: 'C\'est le deuxième langage que nous apprenons à l\'école 42 et il y a beaucoup de projets qui l\'utilisent.'
  },
  'dockerExp': {
    en: 'Used in 2 projects and I really enjoy structuring my projects with it.',
    fr: 'Utilisé dans 2 projets et j\'aime beaucoup structurer mes projets avec.'
  },
  'gitExp': {
    en: 'Since I\'ve been at 42 school, I\'ve used it for all my projects.',
    fr: 'Depuis que je suis à l\'école 42, je l\'utilise pour tous mes projets.'
  },
  'linuxExp': {
    en: 'I love this operating system and use it a lot.',
    fr: 'J\'aime ce système d\'exploitation et je l\'utilise beaucoup.'
  },
  'sqliteExp': {
    en: 'Used in many of my projects.',
    fr: 'Utilisé dans beaucoup de mes projets.'
  },
  'mariadbExp': {
    en: 'Used in 1 project.',
    fr: 'Utilisé dans 1 projet.'
  },
  'bashExp': {
    en: 'I use it for all my projects.',
    fr: 'Je l\'utilise pour tous mes projets.'
  },
  'n8nExp': {
    en: 'I\'ve used it a few times recently in my web projects.',
    fr: 'Je l\'ai utilisé quelques fois récemment dans mes projets web.'
  },
  
  // UI text
  'presentTime': {
    en: 'Currently',
    fr: 'Actuellement'
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'en' ? 'fr' : 'en'));
  };

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key "${key}" not found.`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 