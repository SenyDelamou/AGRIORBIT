import Hero from '../components/Hero.jsx';
import { solutionsImages } from '../data/heroImages.js';
import '../styles/solutions.css';

const solutionPillars = [
  {
    title: 'Protocoles personnalisés',
    description: 'Recommandations agronomiques adaptées à vos cultures, cycles et contraintes hydriques.'
  },
  {
    title: 'Alertes automatisées',
    description: 'Notifiez vos équipes terrain quand un seuil de stress ou de maladie est franchi.'
  },
  {
    title: 'Partage collaboratif',
    description: 'Diffusez vos rapports auprès des coopératives et conseillers techniques en un clic.'
  }
];

const advisoryPrograms = [
  {
    name: 'Programme Optimisation Irrigation',
    detail: 'Synchronisation NDWI + capteurs terrain pour ajuster les tours d’irrigation et économiser l’eau.'
  },
  {
    name: 'Programme Sentinel Santé',
    detail: 'Veille fongicide et insecticide basée sur l’analyse spectrale multi-sources.'
  },
  {
    name: 'Programme Rendement+ ',
    detail: 'Projection de rendement, calibration fertilisation, suivi du stress thermique et hydrique.'
  }
];

function SolutionsHub() {
  return (
    <div className="solutions-page">
      <Hero
        eyebrow="Solutions agronomiques"
        title="Du diagnostic satellite à l’action agronomique ciblée"
        subtitle="Transformez chaque alerte en plan d’action : protocoles personnalisés, alertes automatisées et partage collaboratif pour sécuriser vos campagnes."
        ctaLabel="Découvrir nos programmes"
        ctaHref="#programmes"
        images={solutionsImages}
      />

      <section className="section solutions-intro">
        <div className="container solutions-intro-card glass-panel">
          <div className="pillars">
            {solutionPillars.map((pillar) => (
              <article key={pillar.title} className="pillar-card surface-card">
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section advisory" id="programmes">
        <div className="container advisory-panel glass-panel">
          <header>
            <span className="badge">Programmes experts</span>
            <h2>Un accompagnement co-construit avec des agronomes de terrain</h2>
            <p>Choisissez un programme et adaptez-le à vos parcelles pour renforcer la résilience de votre exploitation.</p>
          </header>
          <div className="program-list">
            {advisoryPrograms.map((program) => (
              <div key={program.name} className="program-card">
                <h3>{program.name}</h3>
                <p>{program.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section support">
        <div className="container support-panel glass-panel">
          <div>
            <span className="badge">Support agronome</span>
            <h2>Vos décisions sont accompagnées</h2>
            <p>Un réseau d’agronomes consultables à la demande pour valider vos plans d’actions et suivre l’efficacité des interventions.</p>
          </div>
          <div className="support-actions">
            <button type="button" className="button">
              Parler à un expert
            </button>
            <button type="button" className="button secondary">
              Télécharger une fiche technique
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SolutionsHub;
