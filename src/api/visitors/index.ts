import { getVisitorCount, incrementVisitorCount } from '../../lib/db';

// Fonction pour récupérer le nombre de visiteurs
export async function getVisitors() {
  try {
    const count = await getVisitorCount();
    return { count };
  } catch (error) {
    console.error('Error fetching visitor count:', error);
    return { count: 0, error: 'Failed to fetch visitor count' };
  }
}

// Fonction pour incrémenter le compteur de visiteurs
export async function incrementVisitors() {
  try {
    const count = await incrementVisitorCount();
    return { count };
  } catch (error) {
    console.error('Error incrementing visitor count:', error);
    return { count: 0, error: 'Failed to increment visitor count' };
  }
} 