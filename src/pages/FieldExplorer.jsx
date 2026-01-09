import { useState, useEffect, useRef } from 'react';
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
      solution: 'Apport folaire azoté ciblé sur le quart Nord-Est.',
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
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  // États pour l'IA et les parcelles
  const [importedParcelles, setImportedParcelles] = useState([]);
  const [selectedParcelle, setSelectedParcelle] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: '🤖 Bonjour! Je suis AgriOrbit IA, votre assistant agronomique. Importez vos parcelles et je peux vous aider avec des analyses et recommandations personnalisées.',
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  // Auto-scroll du chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Fonction d'import de parcelles
  const handleImportParcelles = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result;
        const lines = text.split('\n').filter(line => line.trim());
        
        const newParcelles = lines.map((line, idx) => {
          const [nom, culture, surface, ndvi] = line.split(',').map(s => s.trim());
          return {
            id: `P${Date.now()}-${idx}`,
            nom: nom || `Parcelle ${idx + 1}`,
            culture: culture || 'Non spécifiée',
            surface: parseFloat(surface) || 0,
            ndvi: parseFloat(ndvi) || 0.5,
            status: 'imported'
          };
        });

        setImportedParcelles(prev => [...prev, ...newParcelles]);
        setShowImportModal(false);
        
        addMessage('bot', `✅ ${newParcelles.length} parcelle(s) importée(s) avec succès! Quelle est votre question?`);
        showToast(`${newParcelles.length} parcelles importées`, 'success');
      } catch (error) {
        addMessage('bot', '❌ Erreur lors de l\'import. Vérifiez le format du fichier.');
        showToast('Erreur lors de l\'import', 'error');
      }
    };
    reader.readAsText(file);
  };

  // Fonction pour ajouter les messages
  const addMessage = (type, text) => {
    const newMessage = {
      id: Date.now(),
      type,
      text,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, newMessage]);
  };

  // Fonction pour envoyer un message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!currentMessage.trim() || isLoading) return;

    addMessage('user', currentMessage);
    setCurrentMessage('');
    setIsLoading(true);

    // Simuler la réponse de l'IA
    setTimeout(() => {
      const responses = [
        '🌱 Basé sur vos parcelles, je recommande une irrigation dans 3-4 jours.',
        '📊 Vos cultures montrent un NDVI moyen de 0.76 - très bon état!',
        '💧 Le stress hydrique est modéré. Pensez à ajuster vos tours d\'eau.',
        '🧪 Vos analyses de sol montrent un potentiel de rendement de 85 q/ha.',
        '⚠️ Alerte: Risque de maladie détecté dans la zone Nord. Commencez un traitement préventif.',
        '📈 Vos données montrent une tendance positive depuis le dernier scan.',
        '🎯 Je peux vous aider avec les recommandations de fertilisation, irrigation, ou santé des cultures.',
        '✨ Vos parcelles sont en excellent état de développement!'
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addMessage('bot', randomResponse);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="field-explorer-page">
      <Hero
        eyebrow="IA Agronomique"
        title="Assistant IA AgriOrbit"
        subtitle="Importez vos parcelles et discutez avec notre IA pour des recommandations personnalisées"
        ctaLabel="Commencer"
        ctaHref="#ai-section"
        images={explorerImages}
      />

      <section className="section ai-chat-section" id="ai-section">
        <div className="container">
          <div className="ai-container glass-panel">
            {/* Panneau de contrôle des parcelles */}
            <div className="parcelles-panel">
              <div className="panel-header">
                <h2>📊 Vos Parcelles</h2>
                <button
                  onClick={() => setShowImportModal(!showImportModal)}
                  className="import-button"
                >
                  📥 Importer Parcelles
                </button>
              </div>

              {showImportModal && (
                <div className="import-modal glass-panel">
                  <p className="import-help">📋 Format: Nom, Culture, Surface (ha), NDVI</p>
                  <p className="import-example">Exemple: "Nord-Est, Maïs, 12.5, 0.78"</p>
                  <label className="file-input-label">
                    📤 Choisir fichier CSV ou TXT
                    <input
                      type="file"
                      accept=".csv,.txt"
                      onChange={handleImportParcelles}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              )}

              <div className="parcelles-list">
                {importedParcelles.length === 0 ? (
                  <p className="empty-state">Aucune parcelle importée. Commencez par en importer une!</p>
                ) : (
                  importedParcelles.map(parcelle => (
                    <div
                      key={parcelle.id}
                      className={`parcelle-item ${selectedParcelle?.id === parcelle.id ? 'active' : ''}`}
                      onClick={() => setSelectedParcelle(parcelle)}
                    >
                      <div className="parcelle-info">
                        <strong>{parcelle.nom}</strong>
                        <small>{parcelle.culture} • {parcelle.surface} ha</small>
                      </div>
                      <div className="parcelle-ndvi">
                        NDVI: <span className="ndvi-value">{parcelle.ndvi.toFixed(2)}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Chat panel */}
            <div className="chat-panel">
              <div className="chat-header">
                <h2>🤖 AgriOrbit IA</h2>
                <div className="chat-status">
                  {selectedParcelle ? (
                    <span className="active-parcelle">🌾 {selectedParcelle.nom}</span>
                  ) : (
                    <span className="no-parcelle">Aucune parcelle sélectionnée</span>
                  )}
                </div>
              </div>

              <div className="chat-messages">
                {chatMessages.map(msg => (
                  <div
                    key={msg.id}
                    className={`chat-message ${msg.type}`}
                  >
                    <div className="message-content">
                      {msg.type === 'bot' && <span className="message-icon">🤖</span>}
                      {msg.type === 'user' && <span className="message-icon">👤</span>}
                      <div className="message-text">{msg.text}</div>
                    </div>
                    <div className="message-time">
                      {msg.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="chat-message bot loading">
                    <div className="message-content">
                      <span className="message-icon">🤖</span>
                      <div className="typing-indicator">
                        <span></span><span></span><span></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="chat-input-form">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder="Posez une question sur vos parcelles..."
                  disabled={isLoading || importedParcelles.length === 0}
                  className="chat-input"
                />
                <button
                  type="submit"
                  disabled={isLoading || !currentMessage.trim() || importedParcelles.length === 0}
                  className="send-button"
                  title="Envoyer"
                >
                  📤
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      {!isPremium && (
        <section className="section premium-section">
          <div className="container">
            <div className="premium-card glass-panel">
              <div className="premium-header">
                <h2>Accédez à toutes les fonctionnalités</h2>
                <p>Débloquez l’analyse satellite complète, les prédictions IA et les recommandations personnalisées.</p>
              </div>

              <div className="premium-features">
                {[t('premium_feature_point_1'), t('premium_feature_point_2'), t('premium_feature_point_3')].map((item) => (
                  <div key={item} className="premium-feature">
                    <div className="premium-feature-indicator">★</div>
                    <p>{item}</p>
                  </div>
                ))}
              </div>

              <div className="premium-actions">
                <button type="button" className="button" onClick={() => navigate('/premium')}>
                  {t('premium_upgrade_cta')}
                </button>
                <p className="premium-note">{t('premium_trial_hint')}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Zone Form - Premium Only */}
      {isPremium && (
        <section className="section explorer-intro" id="zone-form">
          <div className="container explorer-intro-card glass-panel">
            <div className="intro-text">
              <h2>Analyse Satellite Instantanée</h2>
              <p>Entrez les coordonnées de votre champ pour lancer une lecture multi-spectrale profonde.</p>
            </div>
            <form className="zone-form" aria-label="Lancer l'analyse satellite" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="zone-name">Nom de la parcelle</label>
                <input id="zone-name" type="text" placeholder="Ex : Zone Nord - Maïs" required />
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="lat">Latitude (DD)</label>
                  <input id="lat" type="text" placeholder="14.6937" inputMode="decimal" required />
                </div>
                <div className="form-group">
                  <label htmlFor="lng">Longitude (DD)</label>
                  <input id="lng" type="text" placeholder="-17.4441" inputMode="decimal" required />
                </div>
              </div>
              <button type="submit" className="button">
                Lancer le Scan Profond
              </button>
            </form>
          </div>
        </section>
      )}

      {/* Scanning Animation (Premium) */}
      {isPremium && false /* Remplace par ta logique d'état */ && (
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

      {/* Results Section (Premium) */}
      {isPremium && false /* Remplace par ta logique */ && (
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
                  <div className="gauge-fill" style={{ width: `${mockAnalysisResult.healthScore}%` }}></div>
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

              <button className="button secondary reset-btn">
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

      {/* Autres sections */}
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