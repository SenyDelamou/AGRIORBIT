<!-- Exemples d'Utilisation - Design Premium AgriOrbit -->

## 🎨 Exemples d'Utilisation

### 1️⃣ Sections avec Titre Premium

```jsx
<section className="section">
  <div className="container">
    <div className="section-header">
      <span className="tag">NOUVEAU DESIGN</span>
      <h2 className="gradient-text">AgriOrbit Premium</h2>
      <p className="text-muted">Expérience visuelle de haut niveau</p>
    </div>
  </div>
</section>
```

### 2️⃣ Grille de Cartes Premium

```jsx
<div className="grid grid-3 gap-4">
  <div className="surface-card p-4 hover-lift">
    <h3>Carte 1</h3>
    <p className="text-muted">Description</p>
    <button className="button mt-2">Action</button>
  </div>
  
  <div className="surface-card p-4 hover-lift">
    <h3>Carte 2</h3>
    <p className="text-muted">Description</p>
    <button className="button mt-2">Action</button>
  </div>
  
  <div className="surface-card p-4 hover-lift">
    <h3>Carte 3</h3>
    <p className="text-muted">Description</p>
    <button className="button mt-2">Action</button>
  </div>
</div>
```

### 3️⃣ Hero Section Premium

```jsx
<section className="hero-shell">
  <div className="hero-overlay" />
  <div className="hero-inner">
    <span className="hero-eyebrow">✨ Premium Design</span>
    <h1 className="animate-slide-in-down">
      Bienvenue sur AgriOrbit
    </h1>
    <p className="animate-slide-in-up">
      Découvrez une nouvelle expérience d'analyse agricole
    </p>
    <div className="hero-actions">
      <button className="button">Commencer</button>
      <button className="button secondary">En savoir plus</button>
    </div>
  </div>
</section>
```

### 4️⃣ Formulaire Premium

```jsx
<form className="glass-panel p-4">
  <div className="form-group">
    <label htmlFor="email">Email</label>
    <input
      id="email"
      type="email"
      placeholder="votre@email.com"
      className="transition-smooth"
    />
  </div>
  
  <div className="form-group">
    <label htmlFor="message">Message</label>
    <textarea
      id="message"
      placeholder="Votre message..."
      className="transition-smooth"
      rows="5"
    />
  </div>
  
  <button className="button w-full">Envoyer</button>
</form>
```

### 5️⃣ Badges & Chips

```jsx
<div className="tag-cloud gap-2">
  <span className="badge">🌾 Agriculture</span>
  <span className="badge success">✓ Actif</span>
  <span className="badge error">⚠ Alerte</span>
  <span className="chip">Premium</span>
  <span className="chip">2024</span>
</div>
```

### 6️⃣ Features avec Icônes Glow

```jsx
<div className="grid grid-2 gap-4">
  <div className="feature-card glass-panel p-4">
    <div className="neon-glow-blue mb-3">🛰️</div>
    <h3>Satellite</h3>
    <p className="text-muted">Données satellites temps réel</p>
  </div>
  
  <div className="feature-card glass-panel p-4">
    <div className="neon-glow mb-3">📊</div>
    <h3>Analytics</h3>
    <p className="text-muted">Analyse avancée des données</p>
  </div>
</div>
```

### 7️⃣ Tableau Premium

```jsx
<div className="glass-panel p-4 overflow-auto">
  <table>
    <thead>
      <tr>
        <th>Champ</th>
        <th>Zone</th>
        <th>Rendement</th>
        <th>Statut</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Champ Nord</td>
        <td>25 ha</td>
        <td>85%</td>
        <td><span className="badge success">✓ Bon</span></td>
      </tr>
      <tr>
        <td>Champ Sud</td>
        <td>20 ha</td>
        <td>72%</td>
        <td><span className="badge">📊 Normal</span></td>
      </tr>
    </tbody>
  </table>
</div>
```

### 8️⃣ Progress Bar Premium

```jsx
<div className="glass-panel p-4">
  <h3>Croissance</h3>
  <div className="progress-bar mt-2">
    <div className="progress-fill" style={{ width: '75%' }}></div>
  </div>
</div>
```

### 9️⃣ Card avec Animations Staggered

```jsx
<div className="grid grid-2 gap-4">
  {items.map((item, i) => (
    <div key={i} className="surface-card p-4" style={{
      animation: `slideInUp 0.6s var(--ease-out-expo) ${i * 0.1}s both`
    }}>
      <h3>{item.title}</h3>
      <p className="text-muted">{item.description}</p>
      <div className="flex-between mt-3">
        <span className="badge">{item.tag}</span>
        <button className="button button-sm">→</button>
      </div>
    </div>
  ))}
</div>
```

### 🔟 Hero avec Chips Snapshot

```jsx
<div className="hero-followup">
  <div className="container">
    <div className="hero-followup-grid">
      <div className="hero-chips">
        <span className="chip">🌾 Cultures</span>
        <span className="chip">📊 Données</span>
        <span className="chip">🎯 Optimisation</span>
      </div>
      
      <div className="hero-snapshot">
        <strong>98,500+</strong>
        <p>Hectares Analysés</p>
      </div>
    </div>
  </div>
</div>
```

### 1️⃣1️⃣ Modal/Dialog Premium

```jsx
<div className="modal-overlay">
  <div className="modal">
    <div className="modal-header">
      <h2>Confirmation</h2>
    </div>
    <div className="modal-body">
      <p className="text-secondary">
        Êtes-vous sûr de vouloir continuer?
      </p>
    </div>
    <div className="modal-footer">
      <button className="button secondary">Annuler</button>
      <button className="button">Confirmer</button>
    </div>
  </div>
</div>
```

### 1️⃣2️⃣ Loading Skeleton

```jsx
<div className="skeleton skeleton-block mb-4"></div>
<div className="skeleton skeleton-text"></div>
<div className="skeleton skeleton-text"></div>
<div className="skeleton skeleton-avatar mt-4"></div>
```

### 1️⃣3️⃣ Divider avec Texte

```jsx
<div className="divider-text">
  <span>Ou</span>
</div>
```

### 1️⃣4️⃣ Blockquote Premium

```jsx
<blockquote>
  "AgriOrbit a transformé la façon dont nous gérons nos cultures.
   Les insights donnés par les satellites sont incroyables."
  <strong className="block mt-2">- Jean Dupont, Agriculteur</strong>
</blockquote>
```

### 1️⃣5️⃣ Code Block Premium

```jsx
<pre>
  <code>
{`const data = {
  fields: ['Nord', 'Sud', 'Est'],
  satellite: 'Sentinel-2',
  updated: new Date()
}`}
  </code>
</pre>
```

### 1️⃣6️⃣ Stats Section

```jsx
<div className="grid grid-4 gap-4 text-center">
  <div className="glass-panel p-4 hover-lift">
    <div className="text-3xl font-bold gradient-text">98K+</div>
    <p className="text-muted mt-2">Hectares</p>
  </div>
  
  <div className="glass-panel p-4 hover-lift">
    <div className="text-3xl font-bold gradient-text">256</div>
    <p className="text-muted mt-2">Utilisateurs</p>
  </div>
  
  <div className="glass-panel p-4 hover-lift">
    <div className="text-3xl font-bold gradient-text">99.5%</div>
    <p className="text-muted mt-2">Précision</p>
  </div>
  
  <div className="glass-panel p-4 hover-lift">
    <div className="text-3xl font-bold gradient-text">24/7</div>
    <p className="text-muted mt-2">Support</p>
  </div>
</div>
```

### 1️⃣7️⃣ Profile Card

```jsx
<div className="profile-card">
  <img src="avatar.jpg" alt="User" className="profile-avatar" />
  <h3>Jean Dupont</h3>
  <p className="text-muted">Agriculteur Premium</p>
  <div className="tag-cloud justify-center mt-3">
    <span className="chip">Blé</span>
    <span className="chip">Maïs</span>
  </div>
  <button className="button w-full mt-4">Contacter</button>
</div>
```

### 1️⃣8️⃣ Dropdown Menu

```jsx
<div className="dropdown">
  <button className="button">Options ▼</button>
  <div className="dropdown-menu">
    <div className="dropdown-item">Éditer</div>
    <div className="dropdown-item">Partager</div>
    <div className="dropdown-item text-alert">Supprimer</div>
  </div>
</div>
```

### 1️⃣9️⃣ Toast Notification

```jsx
<div className="toast success">
  <span>✓</span>
  <span>Sauvegarde réussie!</span>
</div>

<div className="toast error">
  <span>✕</span>
  <span>Une erreur s'est produite</span>
</div>

<div className="toast info">
  <span>ℹ</span>
  <span>Information mise à jour</span>
</div>
```

### 2️⃣0️⃣ Footer Premium

```jsx
<footer className="glass-panel mt-20 p-8 text-center">
  <p className="text-muted mb-4">
    © 2024 AgriOrbit. Tous droits réservés.
  </p>
  <div className="flex-center gap-3">
    <a href="#" className="link-premium">Twitter</a>
    <span className="separator-dot"></span>
    <a href="#" className="link-premium">LinkedIn</a>
    <span className="separator-dot"></span>
    <a href="#" className="link-premium">Contact</a>
  </div>
</footer>
```

---

## 🎯 Combinaisons Recommandées

### Carte Premium Complète
```jsx
<div className="surface-card p-6 hover-lift">
  <span className="badge mb-3">NEW</span>
  <h3 className="text-xl font-bold mb-2">Titre</h3>
  <p className="text-muted mb-4">Description détaillée</p>
  <button className="button w-full">Action</button>
</div>
```

### Hero Premium Complet
```jsx
<section className="hero-shell">
  <div className="hero-overlay" />
  <div className="hero-inner">
    <span className="hero-eyebrow animate-slide-in-down">🎯 Premium</span>
    <h1 className="neon-glow animate-slide-in-down">Titre Principal</h1>
    <p className="text-secondary animate-slide-in-up">Sous-titre</p>
    <div className="hero-actions animate-slide-in-up">
      <button className="button">Primaire</button>
      <button className="button secondary">Secondaire</button>
    </div>
  </div>
</section>
```

---

**Plus d'exemples disponibles dans les pages du projet!** 🚀
