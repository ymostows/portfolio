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
  'developer': {
    en: 'Developer',
    fr: 'Développeur'
  },
  'fullStack': {
    en: 'Full-Stack',
    fr: 'Full-Stack'
  },
  'heroDescription': {
    en: 'Passionate developer creating elegant solutions with modern technologies.',
    fr: 'Développeur passionné créant des solutions élégantes avec des technologies modernes.'
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
    en: 'I am a passionate developer specialized in building modern web applications. With a background from 42 School, I combine low-level programming skills with modern web technologies to create elegant and efficient solutions.',
    fr: 'Je suis un développeur passionné spécialisé dans la création d\'applications web modernes. Avec une formation à l\'École 42, je combine des compétences en programmation bas niveau avec des technologies web modernes pour créer des solutions élégantes et efficaces.'
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
    en: 'Here’s an overview of my skills. I’d like to point out that the skill bars are more for visual style than accuracy. I mainly wanted to use this design, and I just tried to rate myself as honestly as possible.',
    fr: 'Voici un aperçu de mes compétences. Je tiens à préciser que les barres de niveau sont à prendre avec du recul. J’ai surtout voulu utiliser ce style de design, et j’ai simplement essayé de m’auto-évaluer du mieux possible.'
  },
  'frontEnd': {
    en: 'Front-end',
    fr: 'Front-end'
  },
  'backEnd': {
    en: 'Back-end',
    fr: 'Back-end'
  },
  'lowLevelLanguages': {
    en: 'Low-level Languages',
    fr: 'Langages bas niveau'
  },
  'databases': {
    en: 'Databases',
    fr: 'Bases de données'
  },
  'tools': {
    en: 'Tools',
    fr: 'Outils'
  },
  'professionalExperience': {
    en: 'Professional Experience',
    fr: 'Expérience professionnelle'
  },
  'fullStackDeveloper': {
    en: 'Full-Stack Developer',
    fr: 'Développeur Full-Stack'
  },
  'companyXYZ': {
    en: 'Company XYZ • 2022 - Present',
    fr: 'Entreprise XYZ • 2022 - Présent'
  },
  'fullStackDescription': {
    en: 'Web application development with React, TypeScript and Node.js. Docker infrastructure and CI/CD setup.',
    fr: 'Développement d\'applications Web avec React, TypeScript et Node.js. Mise en place d\'infrastructures Docker et CI/CD.'
  },
  'cppDeveloper': {
    en: 'C++ Developer',
    fr: 'Développeur C++'
  },
  'companyABC': {
    en: 'Company ABC • 2020 - 2022',
    fr: 'Entreprise ABC • 2020 - 2022'
  },
  'cppDescription': {
    en: 'Embedded systems development and performance optimization.',
    fr: 'Développement de systèmes embarqués et optimisation de performances.'
  },
  'school42Student': {
    en: 'School 42 Student',
    fr: 'Étudiant à l\'École 42'
  },
  'school42Period': {
    en: '2018 - 2022',
    fr: '2018 - 2022'
  },
  'school42Description': {
    en: 'Digital Technology Architect',
    fr: 'Architecte des technologies numériques'
  },

  // Projects
  'githubProjects': {
    en: 'GitHub Projects',
    fr: 'Projets GitHub'
  },
  'projectsDescription': {
    en: 'My open source projects and contributions that demonstrate my technical skills',
    fr: 'Mes projets et contributions open source qui démontrent mes compétences techniques'
  },
  'public': {
    en: 'Public',
    fr: 'Public'
  },
  'private': {
    en: 'Private',
    fr: 'Privé'
  },
  'viewCode': {
    en: 'View code',
    fr: 'Voir le code'
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
  
  // Language
  'switchToLanguage': {
    en: 'FR',
    fr: 'EN'
  }
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