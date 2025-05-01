import { useState } from 'react';
import { Braces, Code, Sparkles, Waves } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { AnimationType } from './HeroAnimations';

interface AnimationControlsProps {
  onSelectAnimation: (type: AnimationType) => void;
}

export function AnimationControls({ onSelectAnimation }: AnimationControlsProps) {
  const [selectedAnimation, setSelectedAnimation] = useState<AnimationType>('squares');
  const { t } = useLanguage();

  const animations: {
    type: AnimationType;
    name: string;
    icon: React.ReactNode;
  }[] = [
    { 
      type: 'squares', 
      name: 'Carrés',
      icon: <Waves className="w-4 h-4" />
    },
    { 
      type: 'matrix', 
      name: 'Matrix',
      icon: <Code className="w-4 h-4" />
    },
    { 
      type: 'waves', 
      name: 'Vagues',
      icon: <Waves className="w-4 h-4" />
    },
    { 
      type: 'stars', 
      name: 'Particules',
      icon: <Sparkles className="w-4 h-4" />
    }
  ];

  const handleSelectAnimation = (type: AnimationType) => {
    setSelectedAnimation(type);
    onSelectAnimation(type);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-1">
        <Code className="w-4 h-4" /> Animation Controls
      </div>
      
      <div className="flex space-x-2">
        {animations.map((anim) => (
          <button
            key={anim.type}
            onClick={() => handleSelectAnimation(anim.type)}
            className={`p-2 rounded-lg border ${
              selectedAnimation === anim.type
                ? 'bg-indigo-100 text-indigo-600 border-indigo-300 dark:bg-indigo-900/50 dark:text-indigo-300 dark:border-indigo-700'
                : 'bg-gray-100 text-gray-600 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700'
            } transition-colors`}
            title={anim.name}
          >
            {anim.icon}
          </button>
        ))}
      </div>
    </div>
  );
} 