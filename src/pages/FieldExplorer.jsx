import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import PremiumBadge from '../components/PremiumBadge.jsx';
import { explorerImages } from '../data/heroImages.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useSubscription } from '../context/SubscriptionContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { useDocumentTitle, useMetaDescription } from '../hooks/useWebLogic.js';
import '../styles/fieldExplorer.css';

const sampleZones = [
  {
    name: 'Bloc A - Sorgho',
    coordinates: '14.6937° N, 17.4441° W',
    area: '42 ha',
    moisture: '68%',
    ndvi: 0.74
  },
  {
    name: 'Bloc B - Riz irrigé',
    coordinates: '14.7511° N, 17.4670° W',
    area: '27 ha',
    moisture: '61%',
    ndvi: 0.81
  }
];

const spectralLayers = [
  {
    name: 'NDVI',
    description: 'Suivi de la vigueur végétative pour la prise de décision sur l’irrigation et la fertilisation.'
  },
  {
    name: 'NDWI',
    description: 'Mesure de l’humidité foliaire pour détecter le stress hydrique et déclencher les tours d’eau.'
  },
  {
    name: 'Bande thermique',
    description: 'Surveillance des îlots de chaleur et repérage des zones de germination insuffisante.'
  }
];

const futureInsights = [
  {
    title: 'Précision Yield',
    status: 'Bêta',
    description: 'Estimation prédictive du rendement final à partir de l’accumulation de biomasse et du stress hydrique.',
    icon: '📊'
  },
  {
    title: 'Risk Weather Index',
    status: 'Prévu',
    description: 'Simulation d’impact des aléas climatiques extrêmes sur le cycle phénologique de la culture.',
    icon: '⚡'
  },
  {
    title: 'AI Pest Detection',
    status: 'En R&D',
    description: 'Identification automatique des signatures spectrales liées aux attaques de ravageurs.',
    icon: '🛰️'
  }
];

const analysisMapImage = 'C:/Users/DataVista/.gemini/antigravity/brain/d4117359-a170-4d96-adc3-6e745a092a8d/satellite_field_analysis_1766239891409.png';
const userBanner = 'C:/Users/DataVista/.gemini/antigravity/brain/d4117359-a170-4d96-adc3-6e745a092a8d/uploaded_image_1766239849610.png';

const mockAnalysisResult = {
  crop: 'Sorgho (Sorghum bicolor)',
  stage: 'Floraison / Remplissage des grains',
  yield: '4.8 tonnes / ha (Estimation)',
  healthStatus: 'Critique - Stress Hydrique Détecté',
  healthScore: 64,
  recommendations: [
    {
      issue: 'Stress Hydrique',
      solution: 'Déclencher un tour d’irrigation d’appoint (intervalles de 4 jours).',
      impact: 'Sécurise +0.5t/ha'
    },
    {
      issue: 'Vigueur Hétérogène',
      solution: 'Apport folaire azoté azote ciblé sur le quart Nord-Est.',
      impact: 'Uniformise la maturité'
    }
  ]
};

function FieldExplorer() {
  const { t } = useLanguage();
  const { isPremium } = useSubscription();
  const { showToast } = useToast();
  useDocumentTitle(t('title_explorer'));
  useMetaDescription(t('cap_card1_desc'));
  const [analysisState, setAnalysisState] = useState('idle'); // 'idle', 'scanning', 'results'
  const [formVisible, setFormVisible] = useState(true);
  const navigate = useNavigate();

  const handleLockedAccess = () => {
    showToast(t('premium_locked_toast'), 'warning');
    navigate('/parametres');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isPremium) {
      handleLockedAccess();
      return;
    }
    setAnalysisState('scanning');
    setFormVisible(false);

    // Simulate satellite scanning process
    setTimeout(() => {
      setAnalysisState('results');
    }, 4500);
  };

  const resetAnalysis = () => {
    setAnalysisState('idle');
    setFormVisible(true);
  };

  return (
    <div className="field-explorer-page">
      <Hero
        eyebrow="Explorateur de parcelles"
        title="Importez vos zones, laissez les satellites orchestrer la veille"
        subtitle="Importez vos coordonnées ou fichiers GeoJSON, planifiez les revisites et laissez nos satellites orchestrer la veille multi-spectrale de vos cultures."
        ctaLabel={isPremium ? (analysisState === 'results' ? "Nouvelle Analyse" : "Créer une zone") : t('premium_upgrade_cta')}
        ctaHref={isPremium ? (analysisState === 'results' ? "#" : "#zone-form") : "/parametres"}
        ctaOnClick={isPremium ? (analysisState === 'results' ? resetAnalysis : undefined) : (e) => { e.preventDefault(); handleLockedAccess(); }}
        images={explorerImages}
      />

      {!isPremium && (
        <section className="premium-locked-shell">
          <div className="surface-card premium-panel">
            <div className="premium-upsell">
              <div>
                <PremiumBadge />
                <h2>{t('premium_locked_explorer_title')}</h2>
                <p>{t('premium_locked_explorer_desc')}</p>
              </div>
              <div className="premium-feature-grid">
                {[t('premium_feature_point_1'), t('premium_feature_point_2'), t('premium_feature_point_3')].map((item) => (
                  <div key={item} className="premium-feature">
                    <div className="premium-feature-indicator">★</div>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
              <div className="premium-actions">
                <button type="button" className="button" onClick={handleLockedAccess}>
                  {t('premium_upgrade_cta')}
                </button>
                <p className="premium-note">{t('premium_trial_hint')}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {isPremium && analysisState === 'idle' && (
        <section className="section explorer-intro" id="zone-form">
          <div className="container explorer-intro-card glass-panel">
            <div className="intro-text">
              <h2>Analyse Satellite Instantanée</h2>
              <p>Entrez les coordonnées de votre champ pour lancer une lecture multi-spectrale profonde par nos constellations partenaires.</p>
            </div>
            <form className="zone-form" aria-label="Lancer l'analyse satellite" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="zone-name">Nom de la parcelle</label>
                <input id="zone-name" name="zone-name" type="text" placeholder="Ex : Zone Nord - Maïs" required />
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="lat">Latitude (DD)</label>
                  <input id="lat" name="lat" type="text" placeholder="14.6937" inputMode="decimal" required />
                </div>
                <div className="form-group">
                  <label htmlFor="lng">Longitude (DD)</label>
                  <input id="lng" name="lng" type="text" placeholder="-17.4441" inputMode="decimal" required />
                </div>
              </div>
              <button type="submit" className="button">
                Lancer le Scan Profond
              </button>
            </form>
          </div>
        </section>
      )}

      {isPremium && analysisState === 'scanning' && (
        <section className="section explorer-scanning">
          <div className="container scanning-container glass-panel">
            <div className="satellite-animation">
              <div className="scanner-line"></div>
              <div className="pulse-ring"></div>
              <div className="satellite-icon">🛰️</div>
            </div>
            <div className="scanning-status">
              <h2>Orchestration Satellite en cours...</h2>
              <ul className="scanning-steps">
                <li>Vérification de la couverture Sentinel-2...</li>
                <li>Extraction des données multi-spectrales...</li>
                <li>Calcul des indices de vigueur (NDVI)...</li>
                <li>Analyse morphologique de la culture...</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {isPremium && analysisState === 'results' && (
        <section className="section explorer-results animate-fade-in">
          <div className="container result-dashboard">
            <div className="result-main glass-panel">
              <div className="result-brand-bar">
                <img src={userBanner} alt="Agri Orbit Analytics" className="brand-image" />
              </div>
              <header className="result-header">
                <span className="badge">Rapport d'analyse validé</span>
                <h2>Identification : {mockAnalysisResult.crop}</h2>
                <div className="result-meta">
                  <span>Stade : <strong>{mockAnalysisResult.stage}</strong></span>
                  <span>Rendement estimé : <strong>{mockAnalysisResult.yield}</strong></span>
                </div>
              </header>

              <div className="health-gauge">
                <div className="gauge-header">
                  <h3>Indice de Santé Culture</h3>
                  <span className="score">{mockAnalysisResult.healthScore}%</span>
                </div>
                <div className="gauge-bar">
                  <div className="gauge-fill" style={{ width: `${mockAnalysisResult.healthScore}%`, background: mockAnalysisResult.healthScore < 70 ? 'var(--accent-alert)' : 'var(--accent-satellite-green)' }}></div>
                </div>
                <p className="health-status-desc">{mockAnalysisResult.healthStatus}</p>
              </div>

              <div className="solutions-grid">
                <h3>Actions & Solutions Recommandées</h3>
                {mockAnalysisResult.recommendations.map((rec, i) => (
                  <div key={i} className="solution-item surface-card">
                    <div className="solution-header">
                      <strong>{rec.issue}</strong>
                      <span className="impact-tag">{rec.impact}</span>
                    </div>
                    <p>{rec.solution}</p>
                  </div>
                ))}
              </div>

              <button onClick={resetAnalysis} className="button secondary reset-btn">
                Nouvelle analyse de parcelle
              </button>
            </div>

            <div className="result-sidebar grid">
              <div className="spectral-preview glass-panel">
                <h4>Lecture Multi-spectrale (NDVI)</h4>
                <div className="analysis-map-container">
                  <img src={analysisMapImage} alt="Carte d'analyse satellite" className="analysis-map-img" />
                  <div className="map-labels">
                    <span className="label-item">Vigueur Elevée</span>
                    <span className="label-item">Zone Critique</span>
                  </div>
                </div>
                <p>Détection d'hétérogénéité marquée sur la bordure Est.</p>
              </div>

              <div className="future-prompt glass-panel">
                <h4>Prédiction Future Orbit</h4>
                <p>Nos algorithmes prévoient une maturité physiologique dans <strong>14 jours</strong>.</p>
                <Link to="/solutions" className="text-link">Voir tous les services d'aide →</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section explorer-content">
        <div className="container grid explorer-grid">
          <div className="map-preview glass-panel" role="img" aria-label="Représentation satellite d’une parcelle">
            <div className="map-overlay">
              <span className="tag">Aperçu multi-spectral</span>
              <strong>NDVI 0.78</strong>
              <p>Détection de zones à vigueur hétérogène - surveillance recommandée.</p>
            </div>
          </div>
          <div className="layers-panel glass-panel">
            <h2>Choisissez les couches d’analyse</h2>
            <p>Combinez des bandes multi-spectrales pour obtenir des vues ciblées selon vos cultures et stades phénologiques.</p>
            <ul className="layer-list">
              {spectralLayers.map((layer) => (
                <li key={layer.name}>
                  <span>{layer.name}</span>
                  <p>{layer.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section zone-summary">
        <div className="container glass-panel">
          <header className="section-header">
            <span className="tag">Zones synchronisées</span>
            <h2>Vue synthétique de vos parcelles</h2>
            <p>Un tableau vivant qui agrège les indicateurs clés pour prioriser les interventions agronomiques.</p>
          </header>
          <div className="zone-table" role="table">
            <div className="table-row header" role="row">
              <span role="columnheader">Zone</span>
              <span role="columnheader">Coordonnées</span>
              <span role="columnheader">Surface</span>
              <span role="columnheader">Humidité</span>
              <span role="columnheader">NDVI</span>
            </div>
            {sampleZones.map((zone) => (
              <div key={zone.name} className="table-row" role="row">
                <span role="cell">{zone.name}</span>
                <span role="cell">{zone.coordinates}</span>
                <span role="cell">{zone.area}</span>
                <span role="cell">{zone.moisture}</span>
                <span role="cell" aria-label={`Indice NDVI ${zone.ndvi}`}>
                  {zone.ndvi}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section explorer-simulation">
        <div className="container">
          <header className="section-header">
            <span className="tag">Simulations Future Orbit</span>
            <h2>Évolutions & Intelligence Prédictive</h2>
            <p>Découvrez les modules d’analyse avancée actuellement en phase de test et de validation agronomique.</p>
          </header>
          <div className="grid simulation-grid">
            {futureInsights.map((insight) => (
              <div key={insight.title} className="simulation-card glass-panel">
                <div className="card-header">
                  <span className="insight-icon">{insight.icon}</span>
                  <span className="chip">{insight.status}</span>
                </div>
                <h3>{insight.title}</h3>
                <p>{insight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default FieldExplorer;
