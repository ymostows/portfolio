import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';

// Type pour les données de like
type LikeData = {
  count: number;
  hasLiked: boolean;
};

export default function StatCounter() {
  const { isDark } = useTheme();
  const { language } = useLanguage();

  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [likeData, setLikeData] = useState<LikeData>({ count: 0, hasLiked: false });
  const [loading, setLoading] = useState<boolean>(false);
  const [userIp, setUserIp] = useState<string>('');

  // Fonction pour obtenir l'adresse IP de l'utilisateur (simplifiée)
  const getUserIp = async () => {
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      setUserIp(data.ip);
    } catch (error) {
      console.error('Error fetching IP:', error);
      // Utiliser un identifiant aléatoire en cas d'échec
      setUserIp(`anonymous-${Math.random().toString(36).substring(2, 10)}`);
    }
  };

  // Fonction pour récupérer le nombre de visiteurs
  const fetchVisitorCount = async () => {
    try {
      const res = await fetch('/api/visitors');
      const data = await res.json();
      setVisitorCount(data.count);
    } catch (error) {
      console.error('Error fetching visitor count:', error);
    }
  };

  // Fonction pour récupérer les données de like
  const fetchLikeData = async () => {
    if (!userIp) return;

    try {
      const res = await fetch(`/api/likes?ip=${userIp}`);
      const data = await res.json();
      setLikeData(data);
    } catch (error) {
      console.error('Error fetching like data:', error);
    }
  };

  // Fonction pour incrémenter le compteur de visiteurs
  const incrementVisitorCount = async () => {
    try {
      const res = await fetch('/api/visitors', { method: 'POST' });
      const data = await res.json();
      setVisitorCount(data.count);
    } catch (error) {
      console.error('Error incrementing visitor count:', error);
    }
  };

  // Fonction pour basculer le like
  const handleToggleLike = async () => {
    if (!userIp || loading) return;

    setLoading(true);
    try {
      const res = await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ip: userIp }),
      });
      const data = await res.json();
      setLikeData(data);
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initialisation au chargement du composant
  useEffect(() => {
    getUserIp();
  }, []);

  // Réagir aux changements d'IP
  useEffect(() => {
    if (userIp) {
      fetchLikeData();
      incrementVisitorCount();
    }
  }, [userIp]);

  // Mise à jour périodique des compteurs
  useEffect(() => {
    if (!userIp) return;

    // Rafraîchir les données toutes les 30 secondes
    const interval = setInterval(() => {
      fetchVisitorCount();
      fetchLikeData();
    }, 30000);

    return () => clearInterval(interval);
  }, [userIp]);

  return (
    <div className="flex items-center gap-4">
      {/* Compteur de visiteurs */}
      <div 
        className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm ${
          isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
        }`}
      >
        <span className="font-semibold">{visitorCount}</span>
        <span>{language === 'en' ? 'visitors' : 'visiteurs'}</span>
      </div>

      {/* Bouton de like */}
      <button
        onClick={handleToggleLike}
        disabled={loading}
        className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm transition-all ${
          isDark
            ? likeData.hasLiked
              ? 'bg-blue-900/60 text-blue-300'
              : 'bg-gray-800 text-gray-300 hover:bg-blue-900/40'
            : likeData.hasLiked
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-gray-100 text-gray-700 hover:bg-emerald-50'
        } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        aria-label={language === 'en' ? 'Like' : 'J\'aime'}
      >
        <Heart
          className={`w-4 h-4 ${
            likeData.hasLiked
              ? isDark
                ? 'fill-blue-400 text-blue-400'
                : 'fill-emerald-500 text-emerald-500'
              : ''
          }`}
        />
        <span>{likeData.count}</span>
      </button>
    </div>
  );
} 