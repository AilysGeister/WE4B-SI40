# Composant Choose Seats - Réservation de Sièges

## Description
Ce composant permet aux utilisateurs de choisir leurs sièges de cinéma pour une séance donnée. Il affiche un plan des sièges avec les prix dynamiques et gère la réservation.

## Structure

```
src/app/reservation/
├── choose-seats/
│   ├── choose-seats.component.ts      (logique du composant)
│   ├── choose-seats.component.html    (template)
│   ├── choose-seats.component.css     (styles)
│   └── choose-seats.component.spec.ts (tests)
├── programme.service.ts             (service API)
├── reservation.module.ts              (module Angular)
└── reservation-routing.module.ts      (routing)
```

## Utilisation

### Navigation vers le composant
Pour naviguer vers la page de réservation, utilisez:

```typescript
this.router.navigate(['/reservation/choose-seats', userId, programmeId, reservationId]);
```

**Paramètres:**
- `userId`: ID de l'utilisateur connecté
- `programmeId`: ID de la programmation/séance
- `reservationId`: ID de la réservation en cours

### Exemple:
```typescript
import { Router } from '@angular/router';

constructor(private router: Router) {}

goToChooseSeats(userId: number, programmeId: number, reservationId: number) {
  this.router.navigate(['/reservation/choose-seats', userId, programmeId, reservationId]);
}
```

## Fonctionnalités

### 1. Affichage des informations de la séance
- Date et heure de la séance
- Titre du film
- Nombre de sièges sélectionnés

### 2. Plan des sièges
- Disposition en rangées de 5 sièges
- Différenciation entre classe 1 et classe 2
- États des sièges:
  - **Sélectionnés** (vert) : sièges choisis par l'utilisateur
  - **Réservés** (rouge) : déjà réservés par d'autres
  - **Disponibles** (noir) : libres à la réservation

### 3. Gestion des prix
- Calcul automatique des prix selon la classe
- Prix classe 1 : prix du film × 1.5
- Prix classe 2 : prix du film
- Affichage du détail et total

### 4. Soumission de la réservation
- Envoi des sièges sélectionnés à l'API
- Redirection après validation

## API Utilisées

### 1. Récupérer un objet
```
GET http://localhost:8000/api/{objectType}/{id}
```
Utilisé pour:
- `/programme/{id}` - Détails de la programmation
- `/room/{id}` - Détails de la salle
- `/reservation/{id}` - Détails de la réservation

### 2. Créer une réservation
```
POST http://localhost:8000/api/reservation/create
```
**Payload:**
```json
{
  "programme": 1,
  "seatIds": [1, 2, 3],
  "userId": 1,
  "basket": null
}
```

## Styles

Le composant utilise:
- **Bootstrap Colors** pour la cohérence:
  - Bleu: `#007bff` (sièges sélectionnables, titres)
  - Vert: `#28a745` (classe 1, sièges sélectionnés)
  - Rouge: `#dc3545` (sièges réservés)
  - Gris: `#6c757d` (classe 2)

- **Responsive Design**: S'adapte aux écrans mobiles et desktop

## Interactions Utilisateur

### Sélection de sièges
1. Cliquer sur un siège disponible pour le sélectionner (fond vert)
2. Cliquer à nouveau pour désélectionner
3. Les sièges réservés ne peuvent pas être cliqués

### Calcul des prix
Les prix se mettent à jour en temps réel lors de la sélection:
- Affichage du nombre de sièges par classe
- Affichage du prix unitaire et total

### Soumission
Cliquer sur "Enregistrer la réservation" pour:
- Valider qu'au moins un siège est sélectionné
- Envoyer les données à l'API
- Rediriger vers l'accueil en cas de succès
- Afficher un message d'erreur en cas d'échec

## Gestion des Erreurs

Le composant gère:
- Erreurs de chargement du programme
- Erreurs de chargement de la salle
- Erreurs de chargement de la réservation
- Erreurs lors de la création de la réservation

Affiche un message d'erreur à l'utilisateur en cas de problème.

## Points d'intégration

Pour intégrer ce composant dans votre application:

1. **Le module est déjà enregistré** avec lazy loading dans `app-routing.module.ts`
2. **Le service de réservation** est fourni au niveau racine
3. **Naviguer** vers le composant via la route:
   ```typescript
   /reservation/choose-seats/:userId/:programmeId/:reservationId
   ```

## Améliorations futures possibles

- [ ] Mode "Multi-sélection" avec limite de sièges
- [ ] Affichage des numéros de rangée
- [ ] Zoom/Pan du plan des sièges
- [ ] Aperçu avant/après des sièges
- [ ] Intégration avec un système de panier
- [ ] Persistence locale des sièges sélectionnés
- [ ] Animation de transition
