# WEB

## Démarrer le projet en local

### Prérequis

- Node.js 18
- Git

### Installation

```bash
git clone https://github.com/NathanPradelle/clean-code-web.git
cd clean-code-web
npm install
npm run dev
npm run test (pour les tests)
```

## Branching strategy

Ce dépôt utilise une stratégie inspirée de GitFlow :

- `main` : branche **stable** (versions finales / rendu)
- `develop` : branche **d’intégration** (travail en cours)
- `feature/*` : branches de développement de fonctionnalités
- `fix/*` : branches de correction (optionnel)
- `chore/*` : maintenance/outillage (optionnel)

✅ Règle : **aucun push direct sur `main` et `develop`**   
✅ Tout passe par des Pull Requests (PR).

## Architecture du projet

Le frontend est développé avec **React + TypeScript** et suit une organisation **feature-first**, orientée lisibilité et maintenabilité.  
L’objectif est de regrouper le code par **fonctionnalité métier** plutôt que par type technique.

Cette approche permet :
- une meilleure compréhension du code
- une évolution plus simple des fonctionnalités
- une cohérence avec les principes de Clean Code

---

### Arborescence principale

```txt
src/
├── api/
├── features/
├── shared/
└── main.tsx / App.tsx
```

### Description des dossiers
```api/``` — Accès à l’API backend
Contient tout ce qui concerne la communication avec l’API :
- client HTTP générique
- fonctions d’appel aux endpoints
- types de réponse
Exemples :
- configuration de l’URL de l’API
- appels fetch centralisés
Ce dossier permet d’isoler complètement la logique réseau du reste de l’application.

```features/``` — Fonctionnalités métier
Chaque fonctionnalité de l’application possède son propre dossier.   
Exemple :
```features/
├── health/
│   ├── pages/
│   ├── hooks/
│   └── components/
├── cards/
├── quiz/
└── tags/
```
Chaque feature peut contenir :
- ```pages/``` : pages complètes (routées)
- ```components/``` : composants spécifiques à la feature
- ```hooks/``` : hooks React liés à la feature
Une feature est autonome et ne dépend pas des autres.

```shared/``` — Éléments transverses
Contient les éléments réutilisables dans toute l’application :
- composants UI génériques
- utilitaires
- types communs
```
shared/
├── components/
├── utils/
└── types/
```
Aucune logique métier spécifique ne doit se trouver ici.  

## Bonnes pratiques de développement

Ce projet suit volontairement des règles strictes afin de garantir un code propre et cohérent.

Règles générales:
- ❌ Pas de commentaires
- ✅ Une responsabilité par fichier (Single Responsibility Principle)

## Nommage

- Composants React : PascalCase.tsx
- Fichiers non composants : kebab-case.ts
- Hooks : useNomDuHook
- Dossiers : nom de la feature en kebab-case

## Imports

Utilisation de l’alias @/ pour éviter les chemins relatifs complexes
Ordre des imports strictement contrôlé par ESLint

## Qualité du code

Avant chaque push :
- npm run lint
- npm run format
