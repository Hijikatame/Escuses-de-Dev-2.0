# Utiliser une image Node.js officielle comme image de base
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le package.json et le package-lock.json
COPY package*.json ./

# Installer les dépendances du frontend
RUN npm install

# Copier le reste des fichiers du frontend
COPY . .

# Construire l'application frontend pour la production
RUN npm run build

# Installer un serveur web léger pour servir l'application frontend
RUN npm install -g serve

# Exposer le port sur lequel le serveur web écoutera
EXPOSE 3001

# Commande pour démarrer le serveur web et servir l'application
CMD ["serve", "-s", "build", "-l", "3001"]