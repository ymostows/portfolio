import express, { Request, Response } from 'express';
import { handleVisitorsRequest, handleLikesRequest } from '../api';

const router = express.Router();

// Middleware pour extraire l'adresse IP
const getIpAddress = (req: Request) => {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (forwardedFor) {
    return Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor.split(',')[0];
  }
  return req.socket.remoteAddress || 'unknown';
};

// Route pour les visiteurs
router.get('/visitors', async (req: Request, res: Response) => {
  const result = await handleVisitorsRequest('GET');
  res.json(result);
});

router.post('/visitors', async (req: Request, res: Response) => {
  const result = await handleVisitorsRequest('POST');
  res.json(result);
});

// Route pour les likes
router.get('/likes', async (req: Request, res: Response) => {
  const ipAddress = req.query.ip as string || getIpAddress(req);
  const result = await handleLikesRequest('GET', ipAddress);
  res.json(result);
});

router.post('/likes', async (req: Request, res: Response) => {
  const ipAddress = req.body.ip || getIpAddress(req);
  const result = await handleLikesRequest('POST', ipAddress);
  res.json(result);
});

export default router; 