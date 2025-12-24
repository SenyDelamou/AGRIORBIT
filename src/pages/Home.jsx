import { useState } from 'react';
import Hero from '../components/Hero.jsx';
import { homeImages } from '../data/heroImages.js';
import castro from '../assets/castro.png';
import '../styles/home.css';
import ChatWidget from '../components/ChatWidget.jsx';

const capabilityCards = [
  {
    title: 'Cartographie temps réel',
    kpi: '+4 constellations',
    description:
      'Synchronisez vos parcelles avec Sentinel, PlanetScope et Landsat pour visualiser en continu l’évolution de vos cultures.'
  },
  {
    title: 'Modélisation de rendement',
    kpi: 'Précision 95%',
    description:
      'Couplez historiques météo, données sols et imagerie multi-spectrale pour simuler vos récoltes et sécuriser vos campagnes.'
  },
  {
    title: 'Surveillance sanitaire proactive',
    kpi: '-12 j d’alerte',
    description:
      'Détectez stress hydrique, maladies foliaires et carences nutritionnelles avant les premiers symptômes terrain.'
  }
];

const workflowSteps = [
  {
    step: '01',
    title: 'Importer une zone',
    description: 'Saisissez les coordonnées ou chargez un fichier GeoJSON/KML pour définir vos limites de parcelle.'
  },
  {
    step: '02',
    title: 'Analyser les images',
    description: 'Notre moteur fusionne imagerie satellite, météo et historique cultural pour bâtir des tableaux interactifs.'
  },
  {
    step: '03',
    title: 'Décider & agir',
    description: 'Accédez aux recommandations agronomiques et partagez-les avec vos coopératives ou techniciens terrain.'
  }
];

const insightHighlights = [
  {
    metric: '+37%',
    label: 'de rendement moyen sur trois saisons pilotes'
  },
  {
    metric: '12 h',
    label: 'entre détection satellite et diagnostic terrain'
  },
  {
    metric: '98%',
    label: 'de précision sur les alertes sanitaires croisées'
  }
];

const testimonial = {
  quote:
    'Grâce à Agri Orbit, nos équipes terrain anticipent les stress hydriques et ajustent les intrants avant même d’observer un symptôme. Le pilotage est enfin aligné entre la coopérative et les exploitants.',
  name: 'Fatou Ndiaye',
  role: 'Directrice Innovation, Coopérative AgriSun',
  metrics: [
    { label: 'Économie d’intrants', value: '-18%' },
    { label: 'Alertes pertinentes', value: '92%' },
    { label: 'Adoption terrain', value: '120 exploitants' }
  ]
};

const whyChoose = [
  {
    title: 'Intégration API ouverte',
    description:
      'Connectez vos ERP agricoles, outils BI et plateformes coopératives via des APIs sécurisées et documentées.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: 'Gouvernance des données',
    description:
      'Infrastructure hébergée dans l’UE, chiffrement de bout en bout, conformité RGPD et audit trail complet.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: 'Accompagnement agronome',
    description:
      'Équipe d’agronomes data pour cadrer vos cas d’usage, former les équipes terrain et suivre la performance dans le temps.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  }
];

function TestimonialForm() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    quote: '',
    metric: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.info('Témoignage soumis :', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="section testimonial-form-section">
        <div className="container glass-panel form-success">
          <div className="success-icon">✓</div>
          <h2>Merci pour votre confiance !</h2>
          <p>Votre témoignage a été transmis à nos équipes agronomiques. Il sera examiné avant d'être publié sur la plateforme.</p>
          <button type="button" className="button" onClick={() => setSubmitted(false)}>Rédiger un autre avis</button>
        </div>
      </section>
    );
  }

  if (!showForm) {
    return (
      <section className="section testimonial-form-section">
        <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
          <header className="section-header" style={{ margin: '0 auto 2rem' }}>
            <span className="tag">Votre avis nous intéresse</span>
            <h2>Vous utilisez Agri Orbit ?</h2>
            <p>Partagez votre expérience et aidez d'autres exploitants à franchir le pas de l'agriculture de précision.</p>
          </header>
          <button className="button" onClick={() => setShowForm(true)}>
            Rédiger un témoignage
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="section testimonial-form-section">
      <div className="container glass-panel">
        <header className="section-header">
          <span className="tag">Partagez votre expérience</span>
          <h2>Devenez un ambassadeur Agri Orbit</h2>
          <p>Votre retour terrain est précieux. Partagez l'impact de nos analyses satellite sur votre exploitation.</p>
        </header>

        <form className="testimonial-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="t-name">Prénom & Nom</label>
              <input
                id="t-name"
                type="text"
                required
                placeholder="Ex: Jean Dupont"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="t-role">Rôle / Organisation</label>
              <input
                id="t-role"
                type="text"
                required
                placeholder="Ex: Exploitant Maïs, Coopérative X"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="t-quote">Votre témoignage</label>
            <textarea
              id="t-quote"
              required
              rows="4"
              placeholder="Décrivez comment Agri Orbit a changé votre quotidien..."
              value={formData.quote}
              onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="t-metric">Métrique d'impact (Optionnel)</label>
            <input
              id="t-metric"
              type="text"
              placeholder="Ex: +15% de rendement, -20% d'intrants..."
              value={formData.metric}
              onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
            />
          </div>

          <button type="submit" className="button">
            Publier mon témoignage
          </button>
        </form>
      </div>
    </section>
  );
}

function Home() {
  return (
    <div className="home-page">
      <Hero
        eyebrow="Plateforme d’orchestration agronomique"
        title="Supervisez vos cultures avec l’observation spatiale et l’intelligence prédictive"
        subtitle="Agri Orbit consolide imagerie satellite, données sols et météo pour fournir des tableaux de bord opérationnels et prêts pour la décision."
        ctaLabel="Explorer la plateforme"
        ctaTo="/explorateur"
        secondaryLabel="Planifier une démonstration"
        secondaryHref="#demo"
        images={homeImages}
      />

      <section className="section hero-followup">
        <div className="container hero-followup-grid">
          <div className="hero-chips surface-card">
            <span className="chip">Partenaires ESA Copernicus</span>
            <span className="chip">ISO 27001 en cours</span>
            <span className="chip">Infrastructure UE</span>
          </div>
          <div className="hero-snapshot surface-card">
            <strong>NDVI 0.78</strong>
            <p>Vigueur optimale parcelle maïs hybride / périmètre Delta.</p>
          </div>
        </div>
      </section>

      <section className="section capabilities">
        <div className="container">
          <header className="section-header">
            <span className="tag">Ce que vous pouvez faire</span>
            <h2>Un cockpit décisionnel pour piloter vos cultures</h2>
            <p>
              Une console unifiée qui fédère cartographie, analytics, plans d’actions et reporting pour vos équipes agronomiques, coopératives et investisseurs.
            </p>
          </header>
          <div className="grid capability-grid">
            {capabilityCards.map((card) => (
              <article key={card.title} className="capability-card surface-card">
                <div className="card-meta">
                  <span className="chip">{card.kpi}</span>
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section workflow">
        <div className="container glass-panel workflow-panel">
          <div className="workflow-intro">
            <span className="badge">Méthodologie</span>
            <h2>Une chaîne complète, de la donnée à l’action terrain</h2>
            <p>
              Chaque étape est automatisée et documentée : choisissez vos parcelles, laissez l’IA analyser, recevez les alertes et planifiez les interventions avec vos équipes sur
              le terrain.
            </p>
          </div>
          <div className="workflow-steps">
            {workflowSteps.map((item) => (
              <div key={item.step} className="workflow-step surface-card">
                <span className="step-index">{item.step}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-founder">
        <div className="container glass-panel home-founder-panel">
          <div className="home-founder-image">
            <img
              src={castro}
              alt="Dr. Castro Hounmenou"
              className="founder-portrait"
            />
            <div className="founder-badge">Le Visionnaire</div>
          </div>
          <div className="home-founder-content">
            <span className="tag">L'Origine du Projet</span>
            <h2>Une idée née de la science et de la passion</h2>
            <p>
              "Agri Orbit n’est pas qu’une plateforme technologique, c’est une promesse faite à l’agriculture de demain. Mon idée était de mettre la puissance de l'observation spatiale au service direct des producteurs pour sécuriser notre souveraineté alimentaire."
            </p>
            <div className="founder-signature">
              <strong>Dr. Castro Hounmenou</strong>
              <span>Fondateur & Directeur de Projet</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section insights">
        <div className="container insights-panel glass-panel">
          <div>
            <span className="badge">Impact mesuré</span>
            <h2>Un pilotage basé sur des indicateurs fiables</h2>
            <p>
              Nos tableaux de bord sont calibrés avec les retours de coopératives et de stations agronomiques partenaires pour délivrer des KPIs fiables et actionnables.
            </p>
          </div>
          <div className="insight-metrics">
            {insightHighlights.map((highlight) => (
              <div key={highlight.metric} className="metric-card surface-card">
                <strong>{highlight.metric}</strong>
                <span>{highlight.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section testimonial">
        <div className="container testimonial-panel glass-panel">
          <div className="testimonial-content">
            <span className="badge">Témoignage client</span>
            <blockquote>
              <p>{testimonial.quote}</p>
            </blockquote>
            <div className="testimonial-author">
              <div className="avatar" aria-hidden="true">FN</div>
              <div>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}</span>
              </div>
            </div>
          </div>
          <div className="testimonial-metrics">
            {testimonial.metrics.map((item) => (
              <div key={item.label} className="surface-card metric-tile">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialForm />

      <section className="section why-us">
        <div className="container why-panel glass-panel">
          <header className="section-header">
            <span className="tag">Pourquoi nous choisir</span>
            <h2>Une plateforme pensée pour les organisations agricoles exigeantes</h2>
            <p>Nous combinons excellence technologique, gouvernance des données et expertise agronomique pour garantir un déploiement durable.</p>
          </header>
          <div className="grid why-grid">
            {whyChoose.map((reason) => (
              <article key={reason.title} className="why-card surface-card">
                <div className="why-icon">
                  {reason.icon}
                </div>
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section demo" id="demo">
        <div className="container demo-panel glass-panel">
          <div>
            <h2>Prêt à connecter vos parcelles ?</h2>
            <p>Profitez d’une session guidée de 30 minutes avec un agronome data analyst pour découvrir la lecture satellitaire appliquée à vos cultures.</p>
          </div>
          <a className="button" href="mailto:contact@agriorbit.ai">Planifier une démo</a>
        </div>
      </section>

      <ChatWidget />
    </div>
  );
}

export default Home;
