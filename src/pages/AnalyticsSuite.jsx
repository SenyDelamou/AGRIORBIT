import Hero from '../components/Hero.jsx';
import { analyticsImages } from '../data/heroImages.js';
import castro from '../assets/castro.png';
import '../styles/analytics.css';
import { useLanguage } from '../context/LanguageContext.jsx';

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
    ndvi: 0.78,
    stress: 'Modéré',
    rendement: 82,
    humidite: 65,
    sante: '92%'
  },
  {
    id: 'P002',
    nom: 'Centre',
    surface: 8.3,
    culture: 'Blé',
    ndvi: 0.72,
    stress: 'Faible',
    rendement: 78,
    humidite: 72,
    sante: '96%'
  },
  {
    id: 'P003',
    nom: 'Sud-Ouest',
    surface: 15.7,
    culture: 'Soja',
    ndvi: 0.81,
    stress: 'Nul',
    rendement: 85,
    humidite: 68,
    sante: '98%'
  },
  {
    id: 'P004',
    nom: 'Est',
    surface: 11.2,
    culture: 'Orge',
    ndvi: 0.65,
    stress: 'Élevé',
    rendement: 72,
    humidite: 58,
    sante: '78%'
  },
  {
    id: 'P005',
    nom: 'Ouest',
    surface: 9.8,
    culture: 'Colza',
    ndvi: 0.74,
    stress: 'Faible',
    rendement: 80,
    humidite: 71,
    sante: '94%'
  }
];
function AnalyticsSuite() {
  const { t } = useLanguage();

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

      <section className="section parcelles-kpis">
        <div className="container">
          <header className="section-header">
            <span className="tag">Parcelles connectées</span>
            <h2>KPIs des parcelles en temps réel</h2>
            <p>Surveillance continue des indicateurs de santé, rendement et conditions hydrologiques de vos parcelles.</p>
          </header>
          <div className="parcelles-table-wrapper glass-panel">
            <table className="parcelles-table">
              <thead>
                <tr>
                  <th>ID Parcelle</th>
                  <th>Nom</th>
                  <th>Surface (ha)</th>
                  <th>Culture</th>
                  <th>NDVI</th>
                  <th>Stress hydrique</th>
                  <th>Rendement (q/ha)</th>
                  <th>Humidité (%)</th>
                  <th>Santé générale</th>
                </tr>
              </thead>
              <tbody>
                {parcellesKPIs.map((parcelle) => (
                  <tr key={parcelle.id} className={`kpi-row stress-${parcelle.stress.toLowerCase().replace(/[é ]/g, '')}`}>
                    <td className="id-cell">{parcelle.id}</td>
                    <td className="nom-cell">{parcelle.nom}</td>
                    <td className="num-cell">{parcelle.surface}</td>
                    <td className="culture-cell">{parcelle.culture}</td>
                    <td className="num-cell ndvi-cell">
                      <span className="ndvi-value">{parcelle.ndvi}</span>
                    </td>
                    <td className="stress-cell">
                      <span className={`stress-badge stress-${parcelle.stress.toLowerCase().replace(/[é ]/g, '')}`}>
                        {parcelle.stress}
                      </span>
                    </td>
                    <td className="num-cell rendement-cell">{parcelle.rendement}</td>
                    <td className="num-cell humidite-cell">
                      <span className={`humidite-bar ${parcelle.humidite > 70 ? 'high' : parcelle.humidite > 60 ? 'medium' : 'low'}`}>
                        {parcelle.humidite}%
                      </span>
                    </td>
                    <td className="sante-cell">
                      <span className="sante-badge">{parcelle.sante}</span>
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
