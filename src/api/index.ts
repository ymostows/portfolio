import { getVisitors, incrementVisitors } from './visitors';
import { getLikes, toggleUserLike } from './likes';

// Fonction pour gérer les requêtes API pour les visiteurs
export async function handleVisitorsRequest(method: string) {
  if (method === 'GET') {
    return await getVisitors();
  } else if (method === 'POST') {
    return await incrementVisitors();
  }
  return { error: 'Method not allowed', status: 405 };
}

// Fonction pour gérer les requêtes API pour les likes
export async function handleLikesRequest(method: string, ipAddress: string) {
  if (method === 'GET') {
    return await getLikes(ipAddress);
  } else if (method === 'POST') {
    return await toggleUserLike(ipAddress);
  }
  return { error: 'Method not allowed', status: 405 };
} 