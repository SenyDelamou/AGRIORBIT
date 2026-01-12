# 🧪 Mode Test - Simulation de Connexion

## Accès à la Page de Test

Visitez l'URL suivante pour accéder à la page de simulation de connexion:

```
http://localhost:5173/test-connexion
```

## Profils de Test Disponibles

### 1. **Kouadio Diop** - Agriculteur (Kita, Mali)
- **Email**: kouadio.diop@agri.com
- **Téléphone**: +229 90 12 34 56
- **Entreprise**: SARL Diop Agriculture
- **Profil**: Agriculteur innovant avec 15 parcelles et 234 analyses
- **Abonnement**: Premium
- **Activité**: 487 jours sur la plateforme

### 2. **Dr. Fatima Ba** - Chercheure (Dakar, Sénégal)
- **Email**: fatima.ba@research.edu
- **Téléphone**: +229 91 23 45 67
- **Entreprise**: Centre de Recherche Agricole
- **Profil**: Experte en agronomie numérique et télédétection
- **Abonnement**: Premium
- **Activité**: 45 parcelles, 892 analyses, 1240 jours

### 3. **Marie Camara** - Entrepreneur (Conakry, Guinée)
- **Email**: marie@agritech.startup
- **Téléphone**: +229 92 34 56 78
- **Entreprise**: AgriTech Innovations SARL
- **Profil**: Fondatrice agritech, focus petits agriculteurs
- **Abonnement**: Premium
- **Activité**: 8 parcelles, 156 analyses, 340 jours

## Fonctionnalités à Tester

### ✨ Nouvelles Fonctionnalités

1. **🖼️ Bannière de Profil Personnalisée**
   - Cliquez sur "Modifier la bannière" en haut du profil
   - Téléchargez une image (JPG, PNG, WebP)
   - Testez avec différentes images pour voir l'effet

2. **8 Onglets du Profil**
   - **Profil**: Informations personnelles modifiables
   - **Abonnement**: Détails du plan Premium
   - **Statistiques**: Graphiques et metriques
   - **Activité**: Timeline des actions récentes
   - **Intégrations**: Services intégrés disponibles
   - **Préférences**: Notifications, langue, theme
   - **Sécurité**: Mot de passe, 2FA, sessions
   - **Données**: Export/suppression de données

3. **🗺️ Localisation Google Maps (Page Contact)**
   - Visitez `/contact` pour voir la carte interactive
   - Affiche la localisation réelle (Labé, Guinée)
   - Informations de contact complètes
   - Horaires d'ouverture

4. **✉️ Formulaire de Contact Avancé**
   - 8 sections complètes
   - Formulaire avec validation
   - FAQ dépliable
   - Équipe professionnelle
   - Histoires de réussite

5. **🔐 Authentification Google OAuth**
   - Teste avec le bouton "Se connecter avec Google"
   - Fallback offline en développement
   - Gestion d'erreurs CORS

6. **🎨 Solutions Hub Premium**
   - Programmes avec filtres
   - Cas d'usage détaillés
   - Témoignages avec ratings
   - FAQ interactif

## Flux de Test Recommandé

### Étape 1: Sélection du Profil (2 min)
1. Accédez à `/test-connexion`
2. Lisez les 3 profils disponibles
3. Sélectionnez celui qui vous intéresse
4. Cliquez sur le bouton de connexion

### Étape 2: Exploration du Profil (5 min)
1. Attendez la redirection vers `/profil`
2. Observez la bannière personnalisée avec overlay dégradé
3. Testez les 8 onglets:
   - Modifiez votre bio
   - Consultez les statistiques
   - Explorez les intégrations
4. **Essentiellement**: Cliquez sur "Modifier la bannière"
   - Uploader une image
   - Observez la conversion base64
   - Acceptez/Annulez l'upload

### Étape 3: Exploration du Contact (3 min)
1. Allez à `/contact`
2. Consultez la section localisation
3. Testez la carte Google Maps
4. Remplissez le formulaire de contact
5. Explorez la section équipe et FAQ

### Étape 4: Exploration des Solutions (3 min)
1. Allez à `/solutions`
2. Testez les filtres par programme
3. Consultez les cas d'usage
4. Lisez les témoignages
5. Explorez la FAQ

### Étape 5: Test de la Déconnexion (1 min)
1. Allez à `/parametres`
2. Consultez les paramètres utilisateur
3. Revisitez `/test-connexion` pour changer de profil

## Notes Importantes

### ⚠️ Limitations

- **Pas de backend**: Les données sont stockées localement dans le navigateur
- **Persistance limitée**: Les modifications ne survivent pas au refresh (sauf la bannière en base64)
- **Notifications simulées**: Basées sur les données mock
- **API indisponible**: Les appels API retourneront des erreurs (fallback offline en place)

### 💾 Stockage des Données

- Les données utilisateur sont stockées dans `localStorage` et `sessionStorage`
- La bannière est convertie en base64 et stockée localement
- Les données sont perdues au fermeture du navigateur (sauf localStorage)

### 🔧 Pour les Développeurs

Pour modifier les profils de test:
1. Éditez `src/pages/TestLogin.jsx`
2. Modifiez l'objet `testProfiles`
3. Reloadez la page

Pour ajouter des données utilisateur:
1. Modifiez les données dans `handleTestLogin()`
2. Ou enrichissez le contexte `AuthContext.jsx`

## Troubleshooting

### ❌ La page ne charge pas
- Vérifiez que vous êtes sur `localhost:5173/test-connexion`
- Clearez le cache (Ctrl+F5)
- Vérifiez la console pour les erreurs

### ❌ La bannière n'apparaît pas
- Vérifiez que l'URL Unsplash est accessible
- Testez l'upload manuel d'une image locale
- Vérifiez la taille du fichier (max 5MB)

### ❌ Les onglets ne s'affichent pas
- Vérifiez le login a bien réussi
- Consultez la console pour les erreurs React
- Vérifiez que le contexte AuthContext est rempli

### ❌ Google OAuth ne fonctionne pas
- Vérifiez que `VITE_GOOGLE_CLIENT_ID` est défini dans `.env`
- Testez le fallback offline
- Vérifiez les headers CORS dans GoogleLogin.jsx

## Ressources Additionnelles

- **Variables CSS**: Voir `CSS_VARIABLES.css` pour les couleurs
- **Composants**: Tous les composants sont dans `src/components/`
- **Pages**: Toutes les pages sont dans `src/pages/`
- **Styles**: Tous les styles sont dans `src/styles/`
- **Contextes**: Tous les contextes sont dans `src/context/`

---

**Happy Testing! 🚀**
