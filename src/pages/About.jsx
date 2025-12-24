import Hero from '../components/Hero.jsx';
import { aboutImages } from '../data/heroImages.js';
import castro from '../assets/castro.png';
import '../styles/about.css';
import { useLanguage } from '../context/LanguageContext.jsx';

const values = [
  {
    title: 'Agronomie augmentée',
    description: 'Nous combinons observations terrain, expertise agronome et calculs IA pour fiabiliser chaque indicateur de culture.'
  },
  {
    title: 'Ouverture des données',
    description: 'Interfaçage via API et exports standards pour intégrer votre ERP agricole, vos FMS ou outils de reporting.'
  },
  {
    title: 'Résilience climatique',
    description: 'Modélisation des scénarios climatiques extrêmes pour adapter les pratiques culturales et réduire les risques.'
  }
];

const partners = [
  'ESA Copernicus',
  'Planet Labs',
  'CNES Theia',
  'INRAE',
  'Coopératives partenaires'
];

function About() {
  const { t } = useLanguage();

  return (
    <div className="about-page">
      <Hero
        eyebrow={t('about_mission_eyebrow')}
        title={t('about_mission_title')}
        subtitle={t('about_mission_subtitle')}
        ctaLabel={t('hero_cta')}
        ctaHref="#valeurs"
        images={aboutImages}
      />

      <section className="section about-hero">
        <div className="container about-hero-card glass-panel">
          <div className="mission-stats">
            <div className="stat-card">
              <strong>120k ha</strong>
              <span>{t('about_stat_ha')}</span>
            </div>
            <div className="stat-card">
              <strong>18</strong>
              <span>{t('about_stat_countries')}</span>
            </div>
            <div className="stat-card">
              <strong>24 h</strong>
              <span>{t('about_stat_time')}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-founder">
        <div className="container founder-panel glass-panel">
          <div className="founder-image-container">
            <img
              src={castro}
              alt="Dr. Castro"
              className="founder-img"
            />
            <span className="founder-label">{t('founder_badge')}</span>
          </div>
          <div className="founder-content">
            <span className="badge">{t('founder_tag')}</span>
            <h2>{t('about_founder_vision')}</h2>
            <p>{t('founder_quote')}</p>
          </div>
        </div>
      </section>

      <section className="section about-values" id="valeurs">
        <div className="container values-panel glass-panel">
          <header className="section-header">
            <span className="tag">Ce qui nous guide</span>
            <h2>Une vision agritech responsable</h2>
            <p>Des choix produits orientés vers la sobriété des intrants, la résilience face aux stress climatiques et la performance économique durable.</p>
          </header>
          <div className="values-grid">
            {values.map((value) => (
              <article key={value.title} className="value-card">
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-tech">
        <div className="container tech-panel glass-panel">
          <div>
            <span className="badge">Technologie</span>
            <h2>Une plateforme hybride satellite + IA</h2>
            <p>
              Notre pipeline data ingère les constellations Sentinel, PlanetScope et Landsat, croise les données météo et sols, puis entraîne des modèles de machine learning
              supervisés par nos agronomes partenaires.
            </p>
          </div>
          <ul className="tech-list">
            <li>
              <strong>Analyse spectrale</strong>
              <span>Indices NDVI, NDWI, EVI, NDRE recalculés à chaque passage satellite.</span>
            </li>
            <li>
              <strong>Prévision de rendement</strong>
              <span>Modèles de séries temporelles et réseaux bayésiens calibrés sur 10 années de données culture.</span>
            </li>
            <li>
              <strong>Détection de maladies</strong>
              <span>Apprentissage supervisé sur 52 pathologies, couplé à la météo locale et au stade cultural.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="section about-partners">
        <div className="container partners-panel glass-panel">
          <header>
            <span className="badge">Partenariats</span>
            <h2>Un écosystème international</h2>
            <p>Nous collaborons avec des constellations satellite, des laboratoires de recherche et des coopératives pour enrichir nos analyses.</p>
          </header>
          <div className="partners-strip" role="list">
            {partners.map((partner) => (
              <span key={partner} role="listitem">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
