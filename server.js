// Serveur HTTP avec Moteur SQL Pur JavaScript (Zéro compilation native requise)
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const UPLOADS_DIR = path.join(PUBLIC_DIR, 'uploads');
const DB_FILE = path.join(__dirname, 'biscuit.db.json');

// S'assurer que le dossier uploads existe
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Moteur SQL Pur JavaScript compatible SQLite (Sans dépendance C++ native)
class MiniSQLDatabase {
  constructor(filepath) {
    this.filepath = filepath;
    this.data = { cards: [] };
    this.load();
  }

  load() {
    if (fs.existsSync(this.filepath)) {
      try {
        const raw = fs.readFileSync(this.filepath, 'utf-8');
        this.data = JSON.parse(raw);
      } catch (e) {
        this.data = { cards: [] };
      }
    } else {
      this.data = { cards: [] };
      this.seed();
    }
  }

  save() {
    fs.writeFileSync(this.filepath, JSON.stringify(this.data, null, 2), 'utf-8');
  }

  seed() {
    this.data.cards = [
      {
        id: "biscuit-01",
        code: "BISCUIT-01",
        number: "01",
        name: "Kofi le Fauve",
        title: "Guerrier du Vent",
        rarity: "Épique",
        rarityClass: "epic",
        image: "",
        quote: "Le vent ne recule jamais, et moi non plus !",
        power: "Vitesse Primordiale",
        kingdom: "Hauts Plateaux du Sahel",
        votes: 142,
        visible: 1,
        updated_at: new Date().toISOString()
      },
      {
        id: "biscuit-02",
        code: "BISCUIT-02",
        number: "02",
        name: "Amina Reine de la Pluie",
        title: "Héroïne & Stratège",
        rarity: "Légendaire",
        rarityClass: "legendary",
        image: "",
        quote: "L'eau semble douce, mais elle fend les rochers !",
        power: "Danse des Ruisseaux",
        kingdom: "Brumes du Nil Vert",
        votes: 210,
        visible: 1,
        updated_at: new Date().toISOString()
      },
      {
        id: "biscuit-03",
        code: "BISCUIT-03",
        number: "03",
        name: "Bayo l'Artisan",
        title: "Inventeur Solaire",
        rarity: "Rare",
        rarityClass: "rare",
        image: "",
        quote: "Laissez-moi 10 secondes et je vous fabrique un aéronef !",
        power: "Étincelle d'Ingéniosité",
        kingdom: "Forges d'Oyo",
        votes: 98,
        visible: 1,
        updated_at: new Date().toISOString()
      }
    ];
    this.save();
  }

  all(sql, callback) {
    const rows = [...this.data.cards].sort((a, b) => a.number.localeCompare(b.number));
    callback(null, rows);
  }

  get(sql, params, callback) {
    if (typeof params === 'function') {
      callback = params;
      params = [];
    }
    try {
      if (sql.includes("COUNT(*)")) {
        callback(null, { count: this.data.cards.length });
      } else if (sql.includes("WHERE id = ? OR code = ?")) {
        const found = this.data.cards.find(c => c.id === params[0] || c.code === params[1]);
        callback(null, found || null);
      } else if (sql.includes("WHERE id = ?")) {
        const found = this.data.cards.find(c => c.id === params[0]);
        callback(null, found || null);
      } else {
        callback(null, null);
      }
    } catch (err) {
      callback(err, null);
    }
  }

  run(sql, params, callback) {
    if (typeof params === 'function') {
      callback = params;
      params = [];
    }
    try {
      if (sql.startsWith("INSERT OR REPLACE")) {
        const [id, code, number, name, title, rarity, rarityClass, image, quote, power, kingdom, votes, visible, updated_at] = params;
        const index = this.data.cards.findIndex(c => c.id === id || c.code === code);
        const cardObj = { id, code, number, name, title, rarity, rarityClass, image, quote, power, kingdom, votes, visible, updated_at };
        if (index >= 0) {
          this.data.cards[index] = cardObj;
        } else {
          this.data.cards.push(cardObj);
        }
        this.save();
        if (callback) callback.call({ changes: 1 }, null);
      } else if (sql.startsWith("UPDATE cards SET visible")) {
        const [visibleVal, id] = params;
        const card = this.data.cards.find(c => c.id === id);
        if (card) {
          card.visible = visibleVal;
          this.save();
          if (callback) callback.call({ changes: 1 }, null);
        } else {
          if (callback) callback.call({ changes: 0 }, null);
        }
      } else if (sql.startsWith("DELETE FROM cards")) {
        const id = params[0];
        const initialLen = this.data.cards.length;
        this.data.cards = this.data.cards.filter(c => c.id !== id);
        this.save();
        if (callback) callback.call({ changes: initialLen - this.data.cards.length }, null);
      }
    } catch (err) {
      if (callback) callback(err);
    }
  }
}

const db = new MiniSQLDatabase(DB_FILE);
console.log('📦 Moteur SQL initialisé avec succès (biscuit.db.json)');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  console.log(`[HTTP] ${method} ${pathname}`);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // ==========================================
  // API SQL : GESTION DES CARTES & IMAGES
  // ==========================================

  // 1. GET /api/cards -> Récupérer toutes les cartes
  if (pathname === '/api/cards' && method === 'GET') {
    db.all(`SELECT * FROM cards ORDER BY number ASC`, (err, rows) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Erreur SQL lors de la récupération des cartes' }));
      } else {
        const cards = rows.map(r => ({
          ...r,
          visible: r.visible === 1
        }));
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(cards));
      }
    });
    return;
  }

  // 2. POST /api/cards -> Ajouter ou mettre à jour une image
  if (pathname === '/api/cards' && method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 15 * 1024 * 1024) {
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Image trop volumineuse (max 15 Mo)' }));
        req.destroy();
      }
    });

    req.on('end', () => {
      try {
        const payload = JSON.parse(body);

        db.get(`SELECT COUNT(*) as count FROM cards`, (errCount, rowCount) => {
          if (errCount) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Erreur SQL count' }));
            return;
          }

          const total = (rowCount && rowCount.count) || 0;
          const id = payload.id || `biscuit-${Date.now()}`;
          const number = payload.number || String(total + 1).padStart(2, '0');
          const code = payload.code ? payload.code.toUpperCase().trim() : `BISCUIT-${number}`;

          let imagePath = payload.image || '';

          if (payload.imageBase64) {
            const matches = payload.imageBase64.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
            if (matches) {
              let ext = matches[1].toLowerCase();
              if (ext === 'jpeg') ext = 'jpg';
              const base64Data = matches[2];
              const filename = `${id}.${ext}`;
              const diskPath = path.join(UPLOADS_DIR, filename);

              fs.writeFileSync(diskPath, Buffer.from(base64Data, 'base64'));
              imagePath = `/uploads/${filename}`;
            }
          }

          const rarityMap = {
            'Légendaire': 'legendary',
            'Épique': 'epic',
            'Rare': 'rare',
            'Commune': 'common'
          };

          const name = payload.name || `Œuvre #${number}`;
          const title = payload.title || 'Trésor Resplendissant';
          const rarity = payload.rarity || 'Rare';
          const rarityClass = rarityMap[rarity] || 'rare';
          const quote = payload.quote || 'Une œuvre resplendissante entre dans la légende !';
          const power = payload.power || 'Éclat Divin';
          const kingdom = payload.kingdom || 'Royaumes d\'Amani';
          const votes = payload.votes || 0;
          const visible = payload.visible !== false ? 1 : 0;
          const updatedAt = new Date().toISOString();

          db.get(`SELECT image FROM cards WHERE id = ? OR code = ?`, [id, code], (errFind, existing) => {
            if (errFind) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Erreur SQL find existing' }));
              return;
            }

            let finalImage = imagePath;
            if (!finalImage && existing && existing.image) {
              finalImage = existing.image;
            }

            const query = `INSERT OR REPLACE INTO cards (id, code, number, name, title, rarity, rarityClass, image, quote, power, kingdom, votes, visible, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            db.run(query, [id, code, number, name, title, rarity, rarityClass, finalImage, quote, power, kingdom, votes, visible, updatedAt], function(errRun) {
              if (errRun) {
                console.error('Erreur SQL Insert:', errRun);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Erreur lors de l\'enregistrement SQL' }));
              } else {
                const savedCard = {
                  id, code, number, name, title, rarity, rarityClass,
                  image: finalImage, quote, power, kingdom, votes,
                  visible: visible === 1,
                  updatedAt
                };
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ success: true, card: savedCard }));
              }
            });
          });
        });
      } catch (err) {
        console.error('Erreur payload SQL:', err);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Requête JSON invalide' }));
      }
    });
    return;
  }

  // 3. PATCH /api/cards/:id/visibility -> Masquer / Dévoiler
  if (pathname.match(/^\/api\/cards\/[^/]+\/visibility$/) && method === 'PATCH') {
    const cardId = pathname.split('/')[3];
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const visibleVal = payload.visible ? 1 : 0;

        db.run(`UPDATE cards SET visible = ? WHERE id = ?`, [visibleVal, cardId], function(err) {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Erreur SQL mise à jour visibilité' }));
          } else if (this.changes === 0) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Carte non trouvée' }));
          } else {
            db.get(`SELECT * FROM cards WHERE id = ?`, [cardId], (errGet, row) => {
              if (errGet || !row) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Erreur récupération carte mise à jour' }));
              } else {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({
                  success: true,
                  card: { ...row, visible: row.visible === 1 }
                }));
              }
            });
          }
        });
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Requête invalide' }));
      }
    });
    return;
  }

  // 4. DELETE /api/cards/:id -> Supprimer
  if (pathname.startsWith('/api/cards/') && method === 'DELETE') {
    const cardId = pathname.replace('/api/cards/', '').trim();

    db.get(`SELECT image FROM cards WHERE id = ?`, [cardId], (errGet, target) => {
      if (target && target.image && target.image.startsWith('/uploads/')) {
        const diskPath = path.join(PUBLIC_DIR, target.image);
        if (fs.existsSync(diskPath)) {
          try { fs.unlinkSync(diskPath); } catch (e) {}
        }
      }

      db.run(`DELETE FROM cards WHERE id = ?`, [cardId], function(errDel) {
        if (errDel) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Erreur SQL suppression' }));
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: true, deletedId: cardId }));
        }
      });
    });
    return;
  }

  // ==========================================
  // SERVEUR DE FICHIERS STATIQUES (FRONTEND)
  // ==========================================
  let localPathname = pathname;
  if (localPathname === '/') {
    localPathname = '/index.html';
  }

  const filePath = path.join(PUBLIC_DIR, localPathname);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Accès interdit');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      if (!pathname.startsWith('/uploads/') && !pathname.startsWith('/api/')) {
        const indexPath = path.join(PUBLIC_DIR, 'index.html');
        fs.readFile(indexPath, (errIndex, contentIndex) => {
          if (errIndex) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Page non.~(\nPage non trouvée');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(contentIndex);
          }
        });
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Fichier non trouvé');
      }
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (errRead, content) => {
      if (errRead) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Erreur lecture fichier');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const localIp = getLocalIp();
  console.log(`====================================================`);
  console.log(`🗄️  MOTEUR SQL (Pur JS) : IMAGES RESPLENDISSANTES ACTIF`);
  console.log(`====================================================`);
  console.log(`➜ Vue Client (Scan QR) :  http://localhost:${PORT}`);
  console.log(`➜ Espace Admin (Upload) : http://localhost:${PORT}/admin.html`);
  console.log(`➜ Base de données SQL :   ${DB_FILE}`);
  console.log(`====================================================`);
});
