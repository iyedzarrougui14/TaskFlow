import { Project } from '../models/project.model';

export const PROJECTS: Project[] = [
  {
    id: 1,
    name: 'Site e-commerce',
    description: 'Création d’une boutique en ligne avec catalogue, panier et paiement sécurisé',
    status: 'En cours',
    tasks: [
      { id: 1, title: 'Concevoir les maquettes du catalogue', priority: 'Moyenne', status: 'Terminé' },
      { id: 2, title: 'Développer le panier d’achat', priority: 'Haute', status: 'En cours' },
      { id: 3, title: 'Intégrer le paiement en ligne', priority: 'Haute', status: 'En attente' },
    ],
  },
  {
    id: 2,
    name: 'Application mobile de livraison',
    description: 'Application permettant de suivre les commandes et les livreurs en temps réel',
    status: 'En cours',
    tasks: [
      { id: 4, title: 'Mettre en place l’authentification', priority: 'Haute', status: 'Terminé' },
      { id: 5, title: 'Afficher la carte de suivi', priority: 'Moyenne', status: 'En cours' },
      { id: 6, title: 'Ajouter les notifications push', priority: 'Basse', status: 'En attente' },
    ],
  },
  {
    id: 3,
    name: 'Migration vers le cloud',
    description: 'Déplacement des serveurs et des bases de données vers une infrastructure cloud',
    status: 'Terminé',
    tasks: [
      { id: 7, title: 'Auditer l’infrastructure existante', priority: 'Moyenne', status: 'Terminé' },
      { id: 8, title: 'Migrer la base de données', priority: 'Haute', status: 'Terminé' },
      { id: 9, title: 'Rédiger la documentation technique', priority: 'Basse', status: 'Terminé' },
    ],
  },
  {
    id: 4,
    name: 'Refonte du site web',
    description: 'Modernisation du site vitrine de l’entreprise (aucune tâche planifiée pour le moment)',
    status: 'En attente',
    tasks: [],
  },
];