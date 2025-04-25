import { getLikeCount, toggleLike } from '../../lib/db';

// Fonction pour récupérer le nombre de likes
export async function getLikes(ipAddress: string) {
  try {
    const result = await getLikeCount(ipAddress);
    return result;
  } catch (error) {
    console.error('Error fetching like count:', error);
    return { count: 0, hasLiked: false, error: 'Failed to fetch like count' };
  }
}

// Fonction pour basculer un like (ajouter ou retirer)
export async function toggleUserLike(ipAddress: string) {
  try {
    const result = await toggleLike(ipAddress);
    return result;
  } catch (error) {
    console.error('Error toggling like:', error);
    return { count: 0, hasLiked: false, error: 'Failed to toggle like' };
  }
} 