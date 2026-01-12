import { useState, useMemo } from 'react';
import Hero from '../components/Hero.jsx';
import { solutionsImages } from '../data/heroImages.js';
import castro from '../assets/castro.png';
import AnimatedCounter from '../components/AnimatedCounter.jsx';
import TechDownload from '../components/TechDownload.jsx';
import '../styles/solutions.css';

const solutionPillars = [
  {
    id: 'protocols',
    title: 'Protocoles personnalisés',
    description: 'Recommandations agronomiques adaptées à vos cultures, cycles et contraintes hydriques.',
    icon: '🧬'
  },
  {
    id: 'alerts',
    title: 'Alertes automatisées',
    description: 'Notifiez vos équipes terrain quand un seuil de stress ou de maladie est franchi.',
    icon: '🚨'
  },
  {
    id: 'collaboration',
    title: 'Partage collaboratif',
    description: 'Diffusez vos rapports auprès des coopératives et conseillers techniques en un clic.',
    icon: '🤝'
  }
];

const advisoryPrograms = [
  {
    id: 1,
    name: 'Programme Optimisation Irrigation',
    detail: 'Synchronisation NDWI + capteurs terrain pour ajuster les tours d\'irrigation et économiser l\'eau.',
    icon: '💧',
    benefits: ['Économise jusqu\'à 30% d\'eau', 'Réduit les coûts énergétiques', 'Améliore le rendement'],
    price: 'À partir de 50€/ha/mois',
    useCases: ['Cultures intensives', 'Zones arides', 'Cultures de rente'],
    resultats: { savings: '30%', accuracy: '95%' },
    bestFor: 'Exploitations avec forte pression hydrique',
    roiMonths: 4
  },
  {
    id: 2,
    name: 'Programme Sentinel Santé',
    detail: 'Veille fongicide et insecticide basée sur l\'analyse spectrale multi-sources.',
    icon: '🌱',
    benefits: ['Détecte les maladies précocement', 'Réduit l\'utilisation de pesticides', 'Prévention ciblée'],
    price: 'À partir de 40€/ha/mois',
    useCases: ['Cultures biologiques', 'Zones humides', 'Cultures sensibles'],
    resultats: { detection: '5 jours avant', reduction: '40%' },
    bestFor: 'Exploitations engagées sur la réduction des intrants',
    roiMonths: 3
  },
  {
    id: 3,
    name: 'Programme Rendement+',
    detail: 'Projection de rendement, calibration fertilisation, suivi du stress thermique et hydrique.',
    icon: '📈',
    benefits: ['Augmente le rendement de 15-25%', 'Optimise la fertilisation', 'Suivi du stress climatique'],
    price: 'À partir de 60€/ha/mois',
    useCases: ['Grandes exploitations', 'Cultures céréalières', 'Optimisation globale'],
    resultats: { yield: '+20%', roi: '3-4 mois' },
    bestFor: 'Groupes et coopératives multi-parcelles',
    roiMonths: 3
  }
];

const testimonials = [
  {
    author: 'Koffi M.',
    role: 'Exploitant agricole, Côte d\'Ivoire',
    content: 'Avec Agri Orbit, j\'ai économisé 28% sur mon eau d\'irrigation et augmenté mon rendement de 18% la première année.',
    rating: 5
  },
  {
    author: 'Amina D.',
    role: 'Responsable exploitation, Sénégal',
    content: 'Les alertes automatisées m\'ont permis de détecter une maladie du mil 4 jours avant les symptômes visibles.',
    rating: 5
  },
  {
    author: 'Bernard K.',
    role: 'Directeur agricole, Burkina Faso',
    content: 'L\'intégration avec nos capteurs terrain est fluide. Nos équipes gagnent 2 heures par jour de saisie manuelle.',
    rating: 4
  }
];

const faqItems = [
  {
    question: 'Combien de temps avant de voir les premiers résultats?',
    answer: 'Généralement 4-6 semaines après l\'activation du programme. Les alertes commencent immédiatement, mais l\'optimisation des recommandations s\'affine avec le temps.'
  },
  {
    question: 'Les données de mes parcelles sont-elles sécurisées?',
    answer: 'Oui, 100% chiffrées avec des serveurs en Europe. Conformité RGPD totale et aucun partage sans autorisation.'
  },
  {
    question: 'Puis-je combiner plusieurs programmes?',
    answer: 'Absolument! Les programmes se renforcent mutuellement. Beaucoup de clients utilisent les 3 en synergie.'
  },
  {
    question: 'Quel type de capteurs compatibles?',
    answer: 'Tous les capteurs IoT standards: Lora, 4G, WiFi. Nous avons des intégrations pré-configurées avec Delaval, Netafim, Sensitech et autres.'
  },
  {
    question: 'Y a-t-il un engagement minimal?',
    answer: 'Non, abonnement mensuel sans engagement. Vous pouvez résilier à tout moment.'
  }
];

const caseStudies = [
  {
    title: 'Économies d\'eau en zone semi-aride',
    location: 'Niger - 500 ha',
    result: '-32% consommation d\'eau',
    timeline: '6 mois',
    description: 'Ferme céréalière ayant optimisé son irrigation via NDWI et capteurs terrain.'
  },
  {
    title: 'Prévention sanitaire réussie',
    location: 'Ghana - 150 ha',
    result: '-45% pesticides',
    timeline: '3 mois',
    description: 'Détection précoce des maladies a permis un traitement ciblé et économe.'
  },
  {
    title: 'Augmentation de rendement significative',
    location: 'Bénin - 80 ha',
    result: '+22% rendement',
    timeline: '1 cycle',
    description: 'Optimisation de la fertilisation et stress thermique grâce au programme Rendement+.'
  }
];

const configuratorObjectives = [
  {
    id: 'water',
    label: 'Économiser l’eau',
    description: 'Réduire la consommation d’eau tout en protégeant le rendement.',
    recommended: [1]
  },
  {
    id: 'pesticides',
    label: 'Réduire les pesticides',
    description: 'Prioriser la détection précoce et la prévention ciblée.',
    recommended: [2]
  },
  {
    id: 'yield',
    label: 'Maximiser le rendement',
    description: 'Mettre l’accent sur la projection de rendement et la fertilisation.',
    recommended: [3]
  },
  {
    id: 'full',
    label: 'Pack complet',
    description: 'Combiner irrigation, santé et rendement pour une approche 360°.',
    recommended: [1, 2, 3]
  }
];

function SolutionsHub() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [selectedProgramFilter, setSelectedProgramFilter] = useState('all');
  const [expandedProgram, setExpandedProgram] = useState(null);
  const [hectares, setHectares] = useState(100);
  const [objective, setObjective] = useState('full');
  const [segment, setSegment] = useState('cooperative');

  const filteredPrograms = selectedProgramFilter === 'all' 
    ? advisoryPrograms 
    : advisoryPrograms.filter(p => p.id === selectedProgramFilter);

  const objectiveConfig = useMemo(
    () => configuratorObjectives.find((o) => o.id === objective) || configuratorObjectives[3],
    [objective]
  );

  const configuratorResult = useMemo(() => {
    const baseHectares = Math.max(1, Number.isNaN(Number(hectares)) ? 1 : Number(hectares));
    const programs = advisoryPrograms.filter((p) =>
      objectiveConfig.recommended.includes(p.id)
    );

    let savingsPerHa = 220;
    let yieldGain = 18;

    if (objective === 'water') {
      savingsPerHa = 180;
      yieldGain = 10;
    } else if (objective === 'pesticides') {
      savingsPerHa = 160;
      yieldGain = 8;
    } else if (objective === 'yield') {
      savingsPerHa = 210;
      yieldGain = 20;
    }

    if (segment === 'agro') {
      savingsPerHa *= 1.15;
      yieldGain *= 1.1;
    } else if (segment === 'institution') {
      savingsPerHa *= 0.9;
    }

    const totalSavings = Math.round(baseHectares * savingsPerHa);
    const avgRoiMonths =
      programs.reduce((sum, p) => sum + (p.roiMonths || 4), 0) / programs.length || 4;

    return {
      programs,
      totalSavings,
      yieldGain: Math.round(yieldGain),
      avgRoiMonths: Math.round(avgRoiMonths)
    };
  }, [hectares, objective, segment, objectiveConfig]);

  return (
    <div className="solutions-page">
      <Hero
        eyebrow="Solutions agronomiques"
        title="Du diagnostic satellite à l'action agronomique ciblée"
        subtitle="Transformez chaque alerte en plan d'action : protocoles personnalisés, alertes automatisées et partage collaboratif pour sécuriser vos campagnes."
        ctaLabel="Découvrir nos programmes"
        ctaHref="#configurateur"
        images={solutionsImages}
      />

      {/* Bandeau KPIs */}
      <section className="section solutions-kpis">
        <div className="container glass-panel solutions-kpis-panel">
          <div className="solutions-kpi-item">
            <span className="solutions-kpi-label">Économies moyennes</span>
            <div className="solutions-kpi-value">
              <AnimatedCounter value="+23" suffix="% " />
              <span className="solutions-kpi-unit">/ campagne</span>
            </div>
            <p>Sur les coûts d’eau, d’énergie et d’intrants.</p>
          </div>
          <div className="solutions-kpi-item">
            <span className="solutions-kpi-label">Gain de rendement</span>
            <div className="solutions-kpi-value">
              <AnimatedCounter value="+18" suffix="% " />
              <span className="solutions-kpi-unit">en moyenne</span>
            </div>
            <p>Grâce aux décisions guidées par les données.</p>
          </div>
          <div className="solutions-kpi-item">
            <span className="solutions-kpi-label">Retour sur investissement</span>
            <div className="solutions-kpi-value">
              <AnimatedCounter value="+4" suffix="x" />
              <span className="solutions-kpi-unit">sur 12 mois</span>
            </div>
            <p>Pour les coopératives et grands comptes.</p>
          </div>
        </div>
      </section>

      {/* Piliers Section */}
      <section className="section solutions-intro">
        <div className="container solutions-intro-card glass-panel">
          <div className="pillars">
            {solutionPillars.map((pillar) => (
              <article key={pillar.id} className="pillar-card surface-card">
                <div className="pillar-icon" aria-hidden="true">{pillar.icon}</div>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Configurateur de programme */}
      <section className="section solutions-configurator" id="configurateur">
        <div className="container configurator-panel glass-panel">
          <header className="configurator-header">
            <span className="badge">Configurateur express</span>
            <h2>En moins d’une minute, estimez l’impact d’Agri Orbit sur votre exploitation</h2>
            <p>Renseignez votre profil, votre surface et votre priorité : nous vous suggérons une combinaison de programmes et un impact financier estimatif.</p>
          </header>

          <div className="configurator-grid">
            <div className="configurator-form">
              <div className="configurator-field">
                <label htmlFor="segment">Profil</label>
                <select
                  id="segment"
                  value={segment}
                  onChange={(e) => setSegment(e.target.value)}
                >
                  <option value="cooperative">Coopérative / Union</option>
                  <option value="agro">Agro-industrie / Groupe</option>
                  <option value="institution">Institution / Projet de développement</option>
                </select>
              </div>

              <div className="configurator-field">
                <label htmlFor="hectares">Surface couverte (ha)</label>
                <input
                  id="hectares"
                  type="number"
                  min="1"
                  step="1"
                  value={hectares}
                  onChange={(e) => setHectares(e.target.value)}
                />
              </div>

              <fieldset className="configurator-fieldset">
                <legend>Priorité principale</legend>
                <div className="objective-grid">
                  {configuratorObjectives.map((obj) => (
                    <button
                      key={obj.id}
                      type="button"
                      className={`objective-card ${objective === obj.id ? 'active' : ''}`}
                      onClick={() => setObjective(obj.id)}
                    >
                      <span className="objective-label">{obj.label}</span>
                      <span className="objective-description">{obj.description}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="configurator-actions">
                <a href="#comparateur" className="button secondary">
                  Voir le comparateur détaillé
                </a>
                <a href="/contact" className="button">
                  Discuter avec un expert
                </a>
              </div>
            </div>

            <aside className="configurator-result surface-card">
              <h3>Impact estimé sur 12 mois</h3>
              <p className="configurator-context">
                Projection basée sur des cas clients en Afrique de l’Ouest. Les montants sont donnés à titre indicatif.
              </p>

              <div className="configurator-stats">
                <div className="configurator-stat">
                  <span className="stat-label">Économies potentielles</span>
                  <div className="stat-main">
                    <span className="stat-main-value">
                      <AnimatedCounter value={String(configuratorResult.totalSavings)} suffix="€" />
                    </span>
                    <span className="stat-main-sub">sur vos charges opérationnelles</span>
                  </div>
                </div>

                <div className="configurator-stat">
                  <span className="stat-label">Gain de rendement</span>
                  <div className="stat-main">
                    <span className="stat-main-value">
                      <AnimatedCounter value={`+${configuratorResult.yieldGain}`} suffix="% " />
                    </span>
                    <span className="stat-main-sub">en moyenne sur les parcelles couvertes</span>
                  </div>
                </div>

                <div className="configurator-stat">
                  <span className="stat-label">Retour sur investissement</span>
                  <div className="stat-main">
                    <span className="stat-main-value">
                      <AnimatedCounter value={String(configuratorResult.avgRoiMonths)} suffix=" mois" />
                    </span>
                    <span className="stat-main-sub">avant amortissement de la solution</span>
                  </div>
                </div>
              </div>

              <div className="configurator-programs">
                <h4>Programmes recommandés</h4>
                <ul>
                  {configuratorResult.programs.map((p) => (
                    <li key={p.id}>
                      <span className="config-program-name">
                        {p.icon} {p.name}
                      </span>
                      <span className="config-program-tag">{p.bestFor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Programmes Experts Section */}
      <section className="section advisory" id="programmes">
        <div className="container advisory-panel glass-panel">
          <header>
            <span className="badge">Programmes experts</span>
            <h2>Un accompagnement co-construit avec des agronomes de terrain</h2>
            <p>Choisissez un programme et adaptez-le à vos parcelles pour renforcer la résilience de votre exploitation.</p>
          </header>

          {/* Filtres */}
          <div className="program-filters">
            <button 
              className={`filter-btn ${selectedProgramFilter === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedProgramFilter('all')}
            >
              Tous les programmes
            </button>
            {advisoryPrograms.map(program => (
              <button 
                key={program.id}
                className={`filter-btn ${selectedProgramFilter === program.id ? 'active' : ''}`}
                onClick={() => setSelectedProgramFilter(program.id)}
              >
                {program.icon} {program.name.split(' ')[program.name.split(' ').length - 1]}
              </button>
            ))}
          </div>

          {/* Liste des Programmes */}
          <div className="program-list">
            {filteredPrograms.map((program) => (
              <div 
                key={program.id} 
                className="program-card"
                onClick={() => setExpandedProgram(expandedProgram === program.id ? null : program.id)}
              >
                <div className="program-header">
                  <div className="program-title-section">
                    <span className="program-icon">{program.icon}</span>
                    <div>
                      <h3>{program.name}</h3>
                      <p className="program-detail">{program.detail}</p>
                    </div>
                  </div>
                  <span className="expand-icon">{expandedProgram === program.id ? '' : '+'}</span>
                </div>

                {expandedProgram === program.id && (
                  <div className="program-expanded">
                    {/* Résultats clés */}
                    <div className="program-results">
                      <h4> Résultats clés</h4>
                      <div className="results-grid">
                        {Object.entries(program.resultats).map(([key, value]) => (
                          <div key={key} className="result-item">
                            <strong>{value}</strong>
                            <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Avantages */}
                    <div className="program-benefits">
                      <h4> Avantages</h4>
                      <ul>
                        {program.benefits.map((benefit, idx) => (
                          <li key={idx}>{benefit}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Cas d'usage */}
                    <div className="program-usecases">
                      <h4> Cas d'usage idéaux</h4>
                      <div className="usecases-tags">
                        {program.useCases.map((useCase, idx) => (
                          <span key={idx} className="tag">{useCase}</span>
                        ))}
                      </div>
                    </div>

                    {/* Tarification */}
                    <div className="program-pricing">
                      <h4> Tarification</h4>
                      <p className="price">{program.price}</p>
                    </div>

                    {/* Actions */}
                    <div className="program-actions">
                      <button className="button primary">
                        Activer ce programme
                      </button>
                      <button className="button secondary">
                        En savoir plus
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparateur de programmes */}
      <section className="section program-comparator" id="comparateur">
        <div className="container glass-panel comparator-panel">
          <header>
            <span className="badge">Comparateur</span>
            <h2>Choisissez le bon niveau d’accompagnement</h2>
            <p>Comparez en un coup d’œil les 3 programmes phares d’Agri Orbit selon vos priorités : eau, santé des cultures, rendement.</p>
          </header>

          <div className="comparator-table-wrapper">
            <table className="comparator-table">
              <thead>
                <tr>
                  <th>Programme</th>
                  <th>Idéal pour</th>
                  <th>Résultat clé</th>
                  <th>ROI moyen</th>
                  <th>Inclut</th>
                </tr>
              </thead>
              <tbody>
                {advisoryPrograms.map((program) => (
                  <tr key={program.id}>
                    <td>
                      <div className="comp-program-name">
                        <span className="comp-program-icon" aria-hidden="true">{program.icon}</span>
                        <div>
                          <strong>{program.name}</strong>
                          <p className="comp-program-detail">{program.detail}</p>
                        </div>
                      </div>
                    </td>
                    <td>{program.bestFor}</td>
                    <td>
                      {Object.entries(program.resultats).map(([key, value]) => (
                        <div key={key} className="comp-result">
                          <span className="comp-result-value">{value}</span>
                          <span className="comp-result-label">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td>{program.roiMonths} mois</td>
                    <td>
                      <ul className="comp-benefits-list">
                        {program.benefits.slice(0, 3).map((benefit, idx) => (
                          <li key={idx}>{benefit}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Cas d'usage Section */}
      <section className="section case-studies">
        <div className="container case-studies-panel glass-panel">
          <header>
            <span className="badge">Cas d'usage</span>
            <h2>Des résultats concrets dans le terrain</h2>
            <p>Découvrez comment les agriculteurs d'Afrique de l'Ouest optimisent leurs exploitations.</p>
          </header>
          <div className="case-studies-grid">
            {caseStudies.map((study, idx) => (
              <div key={idx} className="case-study-card">
                <div className="case-study-result">{study.result}</div>
                <h3>{study.title}</h3>
                <p className="case-study-location">{study.location}</p>
                <p className="case-study-description">{study.description}</p>
                <div className="case-study-timeline"> {study.timeline}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials">
        <div className="container testimonials-panel glass-panel">
          <header>
            <span className="badge">Témoignages</span>
            <h2>Ce que disent nos utilisateurs</h2>
          </header>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="testimonial-card">
                <div className="testimonial-rating">
                  {'★'.repeat(testimonial.rating)}
                </div>
                <p className="testimonial-content">"{testimonial.content}"</p>
                <div className="testimonial-author">
                  <strong>{testimonial.author}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistiques Section */}
      <section className="section statistics">
        <div className="container statistics-panel glass-panel">
          <header>
            <h2>Impact collectif</h2>
          </header>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">+2,450</div>
              <p>Agriculteurs accompagnés</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">25,000</div>
              <p>Hectares optimisés</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">18M€</div>
              <p>Économies générées</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">4.8/5</div>
              <p>Note moyenne utilisateurs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="section support">
        <div className="container support-panel glass-panel">
          <div className="support-header">
            <img
              src={castro}
              alt="Dr. Castro"
              className="support-founder-img"
            />
            <div>
              <span className="badge">Support expert</span>
              <h2>Vos décisions sont accompagnées par le Dr. Castro</h2>
              <p>Bénéficiez de l'expertise directe du fondateur et de son réseau d'agronomes pour valider vos plans d'actions.</p>
            </div>
          </div>
          <div className="support-actions">
            <a href="https://wa.me/22995306612" className="button" target="_blank" rel="noopener noreferrer">
              Parler au Dr. Castro
            </a>
            <a href="#fiche-technique" className="button secondary">
              Voir la fiche technique
            </a>
          </div>
        </div>
      </section>

      {/* Fiche technique & ressources */}
      <section className="section tech-section" id="fiche-technique">
        <div className="container glass-panel tech-panel">
          <div className="tech-intro">
            <span className="badge">Détails techniques</span>
            <h2>Comprenez l’architecture d’Agri Orbit avant de déployer à grande échelle</h2>
            <p>Schémas d’architecture, intégrations possibles (capteurs, API, PowerBI), exigences de connectivité et bonnes pratiques de mise en production.</p>
          </div>
          <div className="tech-widget">
            <TechDownload />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq">
        <div className="container faq-panel glass-panel">
          <header>
            <span className="badge">FAQ</span>
            <h2>Questions fréquemment posées</h2>
          </header>
          <div className="faq-list">
            {faqItems.map((item, idx) => (
              <div 
                key={idx} 
                className="faq-item"
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
              >
                <div className="faq-question">
                  <h3>{item.question}</h3>
                  <span className="faq-toggle">{expandedFaq === idx ? '' : '+'}</span>
                </div>
                {expandedFaq === idx && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section final-cta">
        <div className="container final-cta-panel glass-panel">
          <h2>Prêt à transformer vos parcelles?</h2>
          <p>Commencez avec une consultation gratuite ou testez les programmes pendant 30 jours.</p>
          <div className="cta-buttons">
            <button className="button primary">
              Demander une démonstration
            </button>
            <button className="button secondary">
              Essai gratuit 30 jours
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SolutionsHub;
