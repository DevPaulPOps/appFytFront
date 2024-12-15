# 🏃 Find Your Team (FYT) - Frontend

Application web permettant aux passionnés de sport de trouver des partenaires d'entraînement à proximité.

[![TypeScript](https://img.shields.io/badge/TypeScript-68%25-blue)]("")
[![Angular](https://img.shields.io/badge/Angular-Latest-red)]("")
[![CI/CD](https://img.shields.io/badge/CI%2FCD-Google%20Cloud-blue)]("")

## 🎯 Fonctionnalités

- **🗺️ Recherche Géolocalisée**

  - Trouvez des partenaires d'entraînement à proximité
  - Visualisation sur carte interactive
  - Filtrage par distance et sport

- **🤝 Gestion des Événements Sportifs**

  - Création et rejoindre des sessions
  - Chat intégré entre participants
  - Système de profils utilisateurs

- **🔐 Authentification & Sécurité**
  - Système d'authentification complet
  - Gestion des profils utilisateurs
  - Protection des routes

## 🏗️ Architecture

```sh
src/
├── app/
│   ├── components/         # Composants Angular
│   │   ├── auth/          # Authentification
│   │   ├── chat/          # Messagerie
│   │   ├── event/         # Gestion événements
│   │   └── map-and-list/  # Carte interactive
│   ├── models/            # Interfaces & Types
│   └── services/          # Services Angular
├── environments/          # Configuration
├── assets/               # Ressources statiques
└── scss/                # Styles globaux
```

## 🛠️ Stack Technique

- **Frontend Core**:

  - Angular 17
  - TypeScript 5.2
  - Material UI 17.2
  - PrimeNG 17.12

- **Cartographie & UI**:

  - Leaflet 1.9.4
  - Bootstrap 5.3.3
  - Flex Layout
  - Swiper 11.0

- **Authentification & Chat**:

  - Auth0 Angular 2.2.3
  - Stream Chat Angular 4.66

- **DevOps**:
  - Docker
  - Terraform
  - Google Cloud Platform
  - CI/CD avec Cloud Build

## 🚀 Installation

1. **Prérequis**

   ```bash
   node -v     # >= 16
   npm -v      # >= 8
   @angular/cli # 17.0.8
   ```

2. **Installation**

   ```bash
   # Cloner le projet
   git clone git@github.com:DevPaulPOps/appFytFront.git
   cd appFytFront

   # Installation des dépendances
   npm install
   ```

3. **Configuration**

   ```bash
   # Configuration des variables d'environnement
   cp src/environments/environment.ts.example src/environments/environment.ts
   # Éditer environment.ts avec vos paramètres
   ```

## 💻 Développement

```bash
# Démarrer en mode développement
npm start

# Lancer les tests
npm test

# Build production
npm run build
```

## 📜 Scripts Disponibles

```bash
# Développement
npm start          # Démarre le serveur de développement
npm run watch      # Mode watch avec rebuild automatique

# Tests
npm test          # Lance les tests unitaires avec Karma

# Production
npm run build     # Build de production
```

## 🐳 Docker

```bash
# Build de l'image
docker build -t fyt-frontend .

# Lancer le conteneur
docker run -p 80:80 fyt-frontend
```

## ☁️ Déploiement

Le projet utilise Google Cloud Platform pour le déploiement :

- Cloud Build pour la CI/CD
- Cloud Run pour l'hébergement
- Artifact Registry pour les images Docker

Configuration dans `cloudbuild.yaml` et `terraform/`.

## 📝 API Backend

L'application nécessite le backend FYT disponible sur [GitHub](https://github.com/wevii/Back_Fyt).

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit (`git commit -m 'feat: Add amazing feature'`)
4. Push (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

---

_Développé avec ❤️ pour la communauté sportive_
