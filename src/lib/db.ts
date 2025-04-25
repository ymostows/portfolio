import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { join } from 'path';

// Chemin vers la base de données
const dbPath = join(process.cwd(), 'database.sqlite');

// Fonction pour ouvrir la connexion à la base de données
export async function openDB() {
  return open({
    filename: dbPath,
    driver: sqlite3.Database
  });
}

// Fonction pour initialiser la base de données
export async function initDB() {
  const db = await openDB();
  
  // Création des tables si elles n'existent pas
  await db.exec(`
    CREATE TABLE IF NOT EXISTS visitors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      count INTEGER DEFAULT 0,
      last_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS likes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ip_address TEXT UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  
  // Insérer un compteur initial si la table est vide
  const visitors = await db.get('SELECT count FROM visitors WHERE id = 1');
  if (!visitors) {
    await db.run('INSERT INTO visitors (id, count) VALUES (1, 0)');
  }
  
  return db;
}

// Fonction pour incrémenter le compteur de visiteurs
export async function incrementVisitorCount() {
  const db = await initDB();
  await db.run('UPDATE visitors SET count = count + 1, last_visit = CURRENT_TIMESTAMP WHERE id = 1');
  const result = await db.get('SELECT count FROM visitors WHERE id = 1');
  return result?.count || 0;
}

// Fonction pour obtenir le nombre de visiteurs
export async function getVisitorCount() {
  const db = await initDB();
  const result = await db.get('SELECT count FROM visitors WHERE id = 1');
  return result?.count || 0;
}

// Fonction pour basculer un like
export async function toggleLike(ipAddress: string) {
  const db = await initDB();
  
  // Vérifier si l'utilisateur a déjà liké
  const hasLiked = await db.get('SELECT * FROM likes WHERE ip_address = ?', [ipAddress]);
  
  if (hasLiked) {
    // Retirer le like
    await db.run('DELETE FROM likes WHERE ip_address = ?', [ipAddress]);
  } else {
    // Ajouter le like
    await db.run('INSERT INTO likes (ip_address) VALUES (?)', [ipAddress]);
  }
  
  // Compter le total des likes
  const result = await db.get('SELECT COUNT(*) as count FROM likes');
  
  return { 
    count: result?.count || 0, 
    hasLiked: !hasLiked 
  };
}

// Fonction pour obtenir le nombre de likes
export async function getLikeCount(ipAddress: string) {
  const db = await initDB();
  const result = await db.get('SELECT COUNT(*) as count FROM likes');
  const hasLiked = await db.get('SELECT * FROM likes WHERE ip_address = ?', [ipAddress]);
  
  return { 
    count: result?.count || 0, 
    hasLiked: !!hasLiked 
  };
} 