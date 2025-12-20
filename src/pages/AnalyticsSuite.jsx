import Hero from '../components/Hero.jsx';
import { analyticsImages } from '../data/heroImages.js';
import '../styles/analytics.css';

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

function AnalyticsSuite() {
  return (
    <div className="analytics-page">
      <Hero
        eyebrow="Suite analytique"
        title="Des tableaux de bord IA au service de vos cultures"
        subtitle="Fusionnez imagerie satellite, météo et historiques agronomiques pour générer projections fiables, alertes ciblées et plans d’actions."
        ctaLabel="Découvrir les modules"
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

      <section className="section export">
        <div className="container export-panel glass-panel">
          <div>
            <h2>Automatisez vos exports et reporting</h2>
            <p>Générez des rapports PDF, des exports shapefile et poussez vos indicateurs vers vos outils existants (Power BI, QGIS, Farm Management System).</p>
          </div>
          <div className="export-actions">
            <button type="button" className="button">
              Exporter en PDF
            </button>
            <button type="button" className="button secondary">
              Connecter Power BI
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AnalyticsSuite;
