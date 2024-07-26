// Importer les modules nécessaires
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// Créer une application Express
const app = express();

// Créer une application cors
app.use(cors());

// Utiliser body-parser pour parser les requêtes JSON
app.use(bodyParser.json());

// Chemin vers le fichier JSON
const excusesFilePath = path.join(__dirname, 'excuses.json');

// Fonction pour lire les excuses à partir du fichier JSON
const readExcusesFromFile = () => {
    const data = fs.readFileSync(excusesFilePath);
    return JSON.parse(data);
};

// Fonction pour écrire les excuses dans le fichier JSON
const writeExcusesToFile = (excuses) => {
    fs.writeFileSync(excusesFilePath, JSON.stringify(excuses, null, 2));
};

// Initialiser la liste des excuses
let excuses = readExcusesFromFile();

// Route pour lister les excuses
app.get('/excuses', (req, res) => {
    res.json(excuses);
});

// Route pour ajouter une nouvelle excuse
app.post('/excuses', express.json(), (req, res) => {
    const { http_code, message } = req.body;
    if (!http_code || !message) {
      return res.status(400).json({ error: 'Invalid data' });
    }
    excuses.push({ http_code, message });
    res.status(201).json({ message: 'Excuse added' });
});

app.get('/:http_code', (req, res) => {
    const http_code = parseInt(req.params.http_code, 10);
    const excuse = excuses.find(exc => exc.http_code === http_code);
    if (excuse) {
      res.send(excuse.message);
    } else {
      res.status(404).send('Not Found');
    }
  });

// Route pour la racine
app.get('/', (req, res) => {
    res.send('Bienvenue sur le générateur d\'excuses de Dev! Allez à /excuses pour voir les excuses.');
});

// Route pour gérer les pages non trouvées
app.use((req, res) => {
    res.status(404).send('Page non trouvée');
});

// Démarrer le serveur sur le port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});