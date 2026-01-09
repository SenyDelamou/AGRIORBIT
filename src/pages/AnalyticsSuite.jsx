import Hero from '../components/Hero.jsx';
import { analyticsImages } from '../data/heroImages.js';
import castro from '../assets/castro.png';
import '../styles/analytics.css';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useState, useMemo } from 'react';

const analyticsModules = [
  {
    title: 'Indices végétatifs dynamiques',
    description: 'NDVI, SAVI, EVI recalculés à chaque nouvelle acquisition satellite et corrélés aux pratiques culturales.'
  },
  {
    title: 'Modèles de rendement prédictif',
    description: 'Projection de rendement par parcelle grâce à des réseaux bayésiens nourris d’historiques climatiques.'
  },
  {
    title: 'Alertes sanitaires intelligentes',
    description: 'Détection proactive des maladies foliaires et du stress hydrique selon les signatures spectrales et les anomalies météo.'
  }
];

const timelineEvents = [
  {
    date: 'Semaine 12',
    title: 'Stress hydrique léger détecté',
    detail: 'Recommandation : ajuster l’irrigation nocturne + 10 mm.'
  },
  {
    date: 'Semaine 14',
    title: 'Traitement fongicide conseillé',
    detail: 'Probabilité de mildiu estimée à 62 % sur la zone nord.'
  },
  {
    date: 'Semaine 16',
    title: 'Rendement estimé',
    detail: 'Projection : 82 q/ha (+12 % vs moyenne historique).'
  }
];
const parcellesKPIs = [
  {
    id: 'P001',
    nom: 'Nord-Est',
    surface: 12.5,
    culture: 'Maïs',
    stade: 'Floraison',
    ndvi: 0.78,
    evi: 0.64,
    stress: 'Modéré',
    rendement: 82,
    potentiel: 95,
    humidite: 65,
    temperature: 24.5,
    precipitations: 45,
    ph: 6.8,
    azote: 180,
    phosphore: 45,
    potassium: 220,
    sante: '92%',
    derniereScan: '2 h',
    tendance: 'stable',
    risqueMaladie: 'Faible',
    recommandation: 'Vérifier irrigation'
  },
  {
    id: 'P002',
    nom: 'Centre',
    surface: 8.3,
    culture: 'Blé',
    stade: 'Montaison',
    ndvi: 0.72,
    evi: 0.58,
    stress: 'Faible',
    rendement: 78,
    potentiel: 88,
    humidite: 72,
    temperature: 22.8,
    precipitations: 52,
    ph: 7.2,
    azote: 165,
    phosphore: 50,
    potassium: 210,
    sante: '96%',
    derniereScan: '45 min',
    tendance: 'hausse',
    risqueMaladie: 'Très faible',
    recommandation: 'Conditions optimales'
  },
  {
    id: 'P003',
    nom: 'Sud-Ouest',
    surface: 15.7,
    culture: 'Soja',
    stade: 'Gousses',
    ndvi: 0.81,
    evi: 0.69,
    stress: 'Nul',
    rendement: 85,
    potentiel: 92,
    humidite: 68,
    temperature: 25.2,
    precipitations: 48,
    ph: 6.5,
    azote: 195,
    phosphore: 48,
    potassium: 240,
    sante: '98%',
    derniereScan: '30 min',
    tendance: 'hausse',
    risqueMaladie: 'Nul',
    recommandation: 'Excellent potentiel'
  },
  {
    id: 'P004',
    nom: 'Est',
    surface: 11.2,
    culture: 'Orge',
    stade: 'Maturité',
    ndvi: 0.65,
    evi: 0.52,
    stress: 'Élevé',
    rendement: 72,
    potentiel: 80,
    humidite: 58,
    temperature: 26.8,
    precipitations: 35,
    ph: 7.4,
    azote: 145,
    phosphore: 42,
    potassium: 190,
    sante: '78%',
    derniereScan: '1 h 15',
    tendance: 'baisse',
    risqueMaladie: 'Modéré',
    recommandation: 'Augmenter irrigation'
  },
  {
    id: 'P005',
    nom: 'Ouest',
    surface: 9.8,
    culture: 'Colza',
    stade: 'Siliques',
    ndvi: 0.74,
    evi: 0.60,
    stress: 'Faible',
    rendement: 80,
    potentiel: 89,
    humidite: 71,
    temperature: 23.5,
    precipitations: 50,
    ph: 6.9,
    azote: 170,
    phosphore: 46,
    potassium: 215,
    sante: '94%',
    derniereScan: '50 min',
    tendance: 'stable',
    risqueMaladie: 'Faible',
    recommandation: 'Suivi régulier'
  }
];
function AnalyticsSuite() {
  const { t } = useLanguage();
  const [filterCulture, setFilterCulture] = useState('');
  const [sortBy, setSortBy] = useState('nom');
  const [searchTerm, setSearchTerm] = useState('');

  // Calcul des statistiques globales
  const stats = useMemo(() => {
    const filtered = parcellesKPIs.filter(p => 
      (!filterCulture || p.culture === filterCulture) &&
      (p.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
       p.id.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    return {
      totalParcelles: parcellesKPIs.length,
      totalSurface: parcellesKPIs.reduce((sum, p) => sum + p.surface, 0),
      rendementMoyen: Math.round(parcellesKPIs.reduce((sum, p) => sum + p.rendement, 0) / parcellesKPIs.length),
      santeMoyenne: Math.round(parcellesKPIs.reduce((sum, p) => sum + parseInt(p.sante), 0) / parcellesKPIs.length),
      ndviMoyen: (parcellesKPIs.reduce((sum, p) => sum + p.ndvi, 0) / parcellesKPIs.length).toFixed(2),
      cultures: [...new Set(parcellesKPIs.map(p => p.culture))],
      stressCount: {
        nul: parcellesKPIs.filter(p => p.stress === 'Nul').length,
        faible: parcellesKPIs.filter(p => p.stress === 'Faible').length,
        modere: parcellesKPIs.filter(p => p.stress === 'Modéré').length,
        eleve: parcellesKPIs.filter(p => p.stress === 'Élevé').length
      }
    };
  }, []);

  // Parcelles filtrées et triées
  const parcellesFiltered = useMemo(() => {
    let filtered = parcellesKPIs.filter(p => 
      (!filterCulture || p.culture === filterCulture) &&
      (p.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
       p.id.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return filtered.sort((a, b) => {
      switch(sortBy) {
        case 'nom':
          return a.nom.localeCompare(b.nom);
        case 'rendement':
          return b.rendement - a.rendement;
        case 'sante':
          return parseInt(b.sante) - parseInt(a.sante);
        case 'ndvi':
          return b.ndvi - a.ndvi;
        default:
          return 0;
      }
    });
  }, [filterCulture, searchTerm, sortBy]);

  return (
    <div className="analytics-page">
      <Hero
        eyebrow={t('analytics_hero_eyebrow')}
        title={t('analytics_hero_title')}
        subtitle={t('analytics_hero_subtitle')}
        ctaLabel={t('hero_cta')}
        ctaHref="#modules"
        images={analyticsImages}
      />

      <section className="section analytics-overview">
        <div className="container analytics-hero-card glass-panel">
          <div className="hero-chart" role="img" aria-label="Visualisation de l’évolution NDVI">
            <div className="chart-header">
              <span>NDVI vs NDWI</span>
              <span className="tag">Avril - Juin</span>
            </div>
            <div className="chart-lines">
              <span className="line ndvi" />
              <span className="line ndwi" />
            </div>
            <div className="chart-footer">
              <span>NDVI 0.78</span>
              <span>NDWI 0.63</span>
              <span>Tendance : +4 %</span>
            </div>
          </div>
          <div className="analytics-intro">
            <h2>Une vision temps réel de vos indicateurs agronomiques</h2>
            <p>Visualisez les dérives, comparez les campagnes précédentes et partagez vos tableaux de bord avec vos partenaires en un clic.</p>
          </div>
        </div>
      </section>

      <section className="section analytics-modules" id="modules">
        <div className="container">
          <header className="section-header">
            <span className="tag">Modules clés</span>
            <h2>Une lecture croisée de vos parcelles</h2>
            <p>Combinez indices végétatifs, anomalies et projections pour bâtir une stratégie culturalisée par micro-zone.</p>
          </header>
          <div className="grid module-grid">
            {analyticsModules.map((module) => (
              <article key={module.title} className="module-card glass-panel">
                <h3>{module.title}</h3>
                <p>{module.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section parcelles-kpis" id="dashboard">
        <div className="container">
          {/* Dashboard Header avec Statistiques Globales */}
          <header className="section-header">
            <span className="tag">Tableau de bord</span>
            <h2>Dashboard agronomique en temps réel</h2>
            <p>Suivi complet de toutes vos parcelles avec indicateurs de performance, alertes et recommandations.</p>
          </header>

          {/* Statistiques Globales */}
          <div className="dashboard-stats-grid">
            <div className="stat-card glass-panel">
              <div className="stat-header">
                <span className="stat-icon">📊</span>
                <span className="stat-label">Parcelles actives</span>
              </div>
              <div className="stat-value">{stats.totalParcelles}</div>
              <div className="stat-detail">Connectées et surveillées</div>
            </div>

            <div className="stat-card glass-panel">
              <div className="stat-header">
                <span className="stat-icon">🌾</span>
                <span className="stat-label">Surface totale</span>
              </div>
              <div className="stat-value">{stats.totalSurface.toFixed(1)} ha</div>
              <div className="stat-detail">Exploitée en AgriOrbit</div>
            </div>

            <div className="stat-card glass-panel">
              <div className="stat-header">
                <span className="stat-icon">📈</span>
                <span className="stat-label">Rendement moyen</span>
              </div>
              <div className="stat-value">{stats.rendementMoyen} q/ha</div>
              <div className="stat-detail">Projection à maturité</div>
            </div>

            <div className="stat-card glass-panel">
              <div className="stat-header">
                <span className="stat-icon">💚</span>
                <span className="stat-label">Santé moyenne</span>
              </div>
              <div className="stat-value">{stats.santeMoyenne}%</div>
              <div className="stat-detail">Indicateur global</div>
            </div>

            <div className="stat-card glass-panel">
              <div className="stat-header">
                <span className="stat-icon">🌱</span>
                <span className="stat-label">NDVI moyen</span>
              </div>
              <div className="stat-value">{stats.ndviMoyen}</div>
              <div className="stat-detail">Indice végétatif</div>
            </div>

            <div className="stat-card glass-panel">
              <div className="stat-header">
                <span className="stat-icon">⚠️</span>
                <span className="stat-label">Stress hydrique</span>
              </div>
              <div className="stress-indicators">
                <span className="stress-indicator nul">{stats.stressCount.nul} Nul</span>
                <span className="stress-indicator faible">{stats.stressCount.faible} Faible</span>
                <span className="stress-indicator modere">{stats.stressCount.modere} Modéré</span>
                <span className="stress-indicator eleve">{stats.stressCount.eleve} Élevé</span>
              </div>
            </div>
          </div>

          {/* Contrôles de filtrage et recherche */}
          <div className="dashboard-controls glass-panel">
            <div className="control-group">
              <label htmlFor="search-parcelle">Rechercher parcelle</label>
              <input
                id="search-parcelle"
                type="text"
                placeholder="ID ou nom..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="control-group">
              <label htmlFor="filter-culture">Filtrer par culture</label>
              <select
                id="filter-culture"
                value={filterCulture}
                onChange={(e) => setFilterCulture(e.target.value)}
                className="filter-select"
              >
                <option value="">Toutes les cultures</option>
                {stats.cultures.map(culture => (
                  <option key={culture} value={culture}>{culture}</option>
                ))}
              </select>
            </div>

            <div className="control-group">
              <label htmlFor="sort-by">Trier par</label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="nom">Nom (A-Z)</option>
                <option value="rendement">Rendement (↓)</option>
                <option value="sante">Santé (↓)</option>
                <option value="ndvi">NDVI (↓)</option>
              </select>
            </div>

            <div className="control-results">
              Affichage: <strong>{parcellesFiltered.length}</strong> / {stats.totalParcelles} parcelles
            </div>
          </div>
          <div className="parcelles-table-wrapper glass-panel">
            <table className="parcelles-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Parcelle</th>
                  <th>Surface (ha)</th>
                  <th>Culture</th>
                  <th>Stade</th>
                  <th>NDVI / EVI</th>
                  <th>Stress</th>
                  <th>Rendement / Potentiel (q/ha)</th>
                  <th>Humidité (%)</th>
                  <th>Température (°C)</th>
                  <th>Précipitations (mm)</th>
                  <th>pH Sol</th>
                  <th>Azote (N)</th>
                  <th>Phosphore (P)</th>
                  <th>Potassium (K)</th>
                  <th>Santé</th>
                  <th>Dernier scan</th>
                  <th>Tendance</th>
                  <th>Risque maladie</th>
                  <th>Recommandation</th>
                </tr>
              </thead>
              <tbody>
                {parcellesFiltered.map((parcelle) => (
                  <tr key={parcelle.id} className={`kpi-row stress-${parcelle.stress.toLowerCase().replace(/[é ]/g, '')}`}>
                    <td className="id-cell">{parcelle.id}</td>
                    <td className="nom-cell">{parcelle.nom}</td>
                    <td className="num-cell">{parcelle.surface}</td>
                    <td className="culture-cell">{parcelle.culture}</td>
                    <td className="stade-cell">{parcelle.stade}</td>
                    <td className="indice-cell">
                      <div className="indices-group">
                        <span className="indice-ndvi">{parcelle.ndvi}</span>
                        <span className="indice-evi">{parcelle.evi}</span>
                      </div>
                    </td>
                    <td className="stress-cell">
                      <span className={`stress-badge stress-${parcelle.stress.toLowerCase().replace(/[é ]/g, '')}`}>
                        {parcelle.stress}
                      </span>
                    </td>
                    <td className="rendement-cell">
                      <div className="rendement-group">
                        <span className="rendement-current">{parcelle.rendement}</span>
                        <span className="rendement-potential">{parcelle.potentiel}</span>
                      </div>
                    </td>
                    <td className="humidite-cell">
                      <span className={`humidite-bar ${parcelle.humidite > 70 ? 'high' : parcelle.humidite > 60 ? 'medium' : 'low'}`}>
                        {parcelle.humidite}%
                      </span>
                    </td>
                    <td className="temp-cell">
                      <span className="temp-value">{parcelle.temperature}°</span>
                    </td>
                    <td className="num-cell">{parcelle.precipitations}</td>
                    <td className="ph-cell">
                      <span className={`ph-badge ${parcelle.ph > 7 ? 'alcalin' : parcelle.ph < 6.5 ? 'acide' : 'neutre'}`}>
                        {parcelle.ph}
                      </span>
                    </td>
                    <td className="nutrient-cell">{parcelle.azote}</td>
                    <td className="nutrient-cell">{parcelle.phosphore}</td>
                    <td className="nutrient-cell">{parcelle.potassium}</td>
                    <td className="sante-cell">
                      <span className="sante-badge">{parcelle.sante}</span>
                    </td>
                    <td className="scan-cell">
                      <span className="scan-time">{parcelle.derniereScan}</span>
                    </td>
                    <td className="tendance-cell">
                      <span className={`tendance-badge tendance-${parcelle.tendance}`}>
                        {parcelle.tendance === 'hausse' && '📈 Hausse'}
                        {parcelle.tendance === 'baisse' && '📉 Baisse'}
                        {parcelle.tendance === 'stable' && '➡️ Stable'}
                      </span>
                    </td>
                    <td className="risque-cell">
                      <span className={`risque-badge risque-${parcelle.risqueMaladie.toLowerCase().replace(/[é ]/g, '')}`}>
                        {parcelle.risqueMaladie}
                      </span>
                    </td>
                    <td className="recommandation-cell">
                      <span className="recommandation-text" title={parcelle.recommandation}>
                        {parcelle.recommandation}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section timeline">
        <div className="container glass-panel timeline-panel">
          <header>
            <span className="badge">Chronologie intelligente</span>
            <h2>Une narration claire des événements agronomiques</h2>
          </header>
          <div className="timeline-grid">
            {timelineEvents.map((event) => (
              <div key={event.title} className="timeline-event">
                <span className="event-date">{event.date}</span>
                <div>
                  <h3>{event.title}</h3>
                  <p>{event.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section analytics-expert">
        <div className="container expert-insight-panel glass-panel">
          <div className="expert-content">
            <span className="badge">{t('founder_tag')}</span>
            <h2>{t('analytics_expert_title')}</h2>
            <p>{t('founder_quote')}</p>
            <div className="expert-signature">
              <strong>Dr. Castro Hounmenou</strong>
              <span>{t('founder_signature')}</span>
            </div>
          </div>
          <div className="expert-image">
            <img
              src={castro}
              alt="Dr. Castro"
              className="expert-portrait"
            />
          </div>
        </div>
      </section>

      <section className="section export">
        <div className="container export-panel glass-panel">
          <div>
            <h2>{t('analytics_export_title')}</h2>
            <p>{t('demo_desc')}</p>
          </div>
          <div className="export-actions">
            <button type="button" className="button">
              {t('hero_cta')}
            </button>
            <button type="button" className="button secondary">
              {t('hero_secondary')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AnalyticsSuite;
