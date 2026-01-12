import Hero from '../components/Hero.jsx';
import { aboutImages } from '../data/heroImages.js';
import castro from '../assets/castro.png';
import '../styles/about.css';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

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
  useScrollReveal();

  return (
    <div className="about-page">
      <Hero
        eyebrow={t('about_mission_eyebrow')}
        title={t('about_mission_title')}
        subtitle={t('about_mission_subtitle')}
        ctaLabel={t('hero_cta')}
        ctaHref="#presentation"
        images={aboutImages}
      />

      {/* Présentation Section */}
      <section className="section about-presentation reveal-on-scroll" id="presentation">
        <div className="container">
          <div className="presentation-card glass-panel hover-lift">
            <div className="presentation-header">
              <span className="tag animate-fade-in-down">À propos de nous</span>
              <h2 className="animate-fade-in-up">Agri Orbit: L'intelligence artificielle au service de l'agriculture</h2>
            </div>
            <div className="presentation-content">
              <p className="lead">
                Agri Orbit Analytics est une plateforme technologique innovante qui combine l'intelligence 
                artificielle, l'imagerie satellite et l'expertise agronomique pour transformer l'agriculture 
                moderne. Nous mettons la technologie au service des agriculteurs pour optimiser leurs rendements, 
                réduire leurs coûts et cultiver de manière durable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Histoire Section */}
      <section className="section about-histoire">
        <div className="container">
          <div className="histoire-card glass-panel">
            <div className="histoire-header">
              <span className="tag">Notre parcours</span>
              <h2>Une histoire d'innovation et de passion</h2>
            </div>
            <div className="timeline-container">
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>2020 - La Vision</h3>
                  <p>
                    Agri Orbit naît d'un constat: l'agriculture africaine et méditerranéenne manque d'outils 
                    technologiques accessibles pour optimiser les cultures. Notre équipe de fondateurs, 
                    composée d'agronomes et d'ingénieurs IA, décide de créer une solution.
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>2021 - Le Lancement</h3>
                  <p>
                    Premiers tests en Tunisie et au Maroc sur les cultures de blé, d'olive et de datte. 
                    Les résultats dépassent nos attentes: +15% de rendement en moyenne, -20% de coûts d'intrants.
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>2023 - L'Expansion</h3>
                  <p>
                    Expansion à 18 pays, partenariats avec l'ESA et des agences spatiales. 
                    120 000 hectares sous suivi intelligent. Reconnaissance internationale.
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>Aujourd'hui - L'Avenir</h3>
                  <p>
                    Agri Orbit continue d'innover en intégrant la blockchain pour la traçabilité, 
                    les drones pour les observations micro-locales, et des modèles IA prédictifs toujours plus précis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* Mission Section */}
      <section className="section about-mission-vision">
        <div className="container">
            <div className="mission-vision-grid">
            <div className="mv-card glass-panel hover-lift reveal-on-scroll">
              <div className="mv-icon mission-icon">🎯</div>
              <h3>Notre Mission</h3>
              <p>
                Révolutionner l'agriculture en mettant à disposition des agriculteurs des outils intelligents, 
                accessibles et fiables pour:
              </p>
              <ul className="mv-list">
                <li>Maximiser les rendements avec précision</li>
                <li>Réduire les coûts d'exploitation</li>
                <li>Cultiver de manière durable</li>
                <li>S'adapter aux changements climatiques</li>
                <li>Améliorer la traçabilité des produits</li>
              </ul>
            </div>

            <div className="mv-card glass-panel hover-lift reveal-on-scroll">
              <div className="mv-icon vision-icon">🌱</div>
              <h3>Notre Vision</h3>
              <p>
                Un monde où chaque agriculteur, peu importe sa localisation ou la taille de son exploitation, 
                a accès à des technologies de pointe pour cultiver intelligent.
              </p>
              <ul className="mv-list">
                <li>Agriculture inclusive et équitable</li>
                <li>Technologie accessible à tous</li>
                <li>Durabilité environnementale</li>
                <li>Prosperité économique durable</li>
                <li>Communauté agricole connectée</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-founder">
        <div className="container founder-panel glass-panel">
          <a href="https://portofolio-seven-lac-92.vercel.app/" target="_blank" rel="noopener noreferrer" className="founder-image-container">
            <img
              src={castro}
              alt="Dr. Castro"
              className="founder-img"
            />
            <span className="founder-label">{t('founder_badge')}</span>
          </a>
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
            {values.map((value, idx) => (
              <article key={value.title} className={`value-card hover-lift reveal-on-scroll`} style={{ animationDelay: `${idx * 0.15}s` }}>
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
