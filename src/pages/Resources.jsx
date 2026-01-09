import Hero from '../components/Hero.jsx';
import TechDownload from '../components/TechDownload.jsx';
import { aboutImages } from '../data/heroImages.js';
import { DocumentTextIcon, CommandLineIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import '../styles/resources.css';

function Resources() {
  const resourceCards = [
    {
      icon: <DocumentTextIcon className="resource-icon" />,
      title: "Fiche Technique Complète",
      description: "Documentation complète couvrant l'architecture, les features, les données, la conformité et les intégrations API.",
      category: "Documentation"
    },
    {
      icon: <CodeBracketIcon className="resource-icon" />,
      title: "Documentation API",
      description: "Guides d'intégration détaillés pour les développeurs avec exemples de code et endpoints complets.",
      category: "Développement"
    },
    {
      icon: <CommandLineIcon className="resource-icon" />,
      title: "Guides de Déploiement",
      description: "Instructions étape par étape pour déployer AgriOrbit dans votre infrastructure personnalisée.",
      category: "DevOps"
    }
  ];

  return (
    <div className="resources-page">
      <Hero
        eyebrow="Ressources"
        title="Découvrez nos ressources techniques"
        subtitle="Accédez à la documentation complète, aux guides API et aux outils d'intégration pour tirer le meilleur parti d'Agri Orbit."
        images={aboutImages}
      />

      <section className="section resources-overview">
        <div className="container">
          <div className="resources-grid">
            {resourceCards.map((resource, idx) => (
              <div key={idx} className="resource-card glass-panel">
                <div className="resource-icon-wrapper">
                  {resource.icon}
                </div>
                <div className="resource-category">{resource.category}</div>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TechDownload />

      <section className="section resources-additional">
        <div className="container">
          <div className="resources-header">
            <span className="tag">Support</span>
            <h2>Besoin d'aide supplémentaire ?</h2>
            <p>Notre équipe technique est disponible 24/7 pour répondre à vos questions.</p>
          </div>

          <div className="support-grid">
            <div className="support-card glass-panel">
              <div className="support-number">01</div>
              <h3>Documentation Complète</h3>
              <p>Consultez notre base de connaissances exhaustive avec tutoriels, FAQ et bonnes pratiques.</p>
            </div>
            <div className="support-card glass-panel">
              <div className="support-number">02</div>
              <h3>Support Technique 24/7</h3>
              <p>Contactez notre équipe d'experts pour une assistance technique immédiate et personnalisée.</p>
            </div>
            <div className="support-card glass-panel">
              <div className="support-number">03</div>
              <h3>Communauté Active</h3>
              <p>Rejoignez notre communauté de développeurs pour partager des expériences et des solutions.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Resources;
