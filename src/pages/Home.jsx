import { useState } from 'react';
import Hero from '../components/Hero.jsx';
import { homeImages } from '../data/heroImages.js';
import castro from '../assets/castro.png';
import '../styles/home.css';
import AnimatedCounter from '../components/AnimatedCounter.jsx';
import GlowCard from '../components/GlowCard.jsx';
import MagneticButton from '../components/MagneticButton.jsx';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useDocumentTitle, useMetaDescription } from '../hooks/useWebLogic.js';

function TestimonialForm() {
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    quote: '',
    metric: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="section testimonial-form-section">
        <div className="container glass-panel form-success">
          <div className="success-icon">✓</div>
          <h2>{t('testi_form_success_title')}</h2>
          <p>{t('testi_form_success_desc')}</p>
          <MagneticButton type="button" className="button" onClick={() => setSubmitted(false)}>
            {t('testi_form_cta')}
          </MagneticButton>
        </div>
      </section>
    );
  }

  if (!showForm) {
    return (
      <section className="section testimonial-form-section">
        <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
          <header className="section-header" style={{ margin: '0 auto 2rem' }}>
            <span className="tag">{t('testi_form_tag')}</span>
            <h2>{t('testi_form_title')}</h2>
            <p>{t('testi_form_desc')}</p>
          </header>
          <MagneticButton className="button" to="#" onClick={(e) => { e.preventDefault(); setShowForm(true); }}>
            {t('testi_form_cta')}
          </MagneticButton>
        </div>
      </section>
    );
  }

  return (
    <section className="section testimonial-form-section">
      <div className="container glass-panel">
        <header className="section-header">
          <span className="tag">{t('testi_form_tag')}</span>
          <h2>Devenez un ambassadeur Agri Orbit</h2>
          <p>{t('testi_form_desc')}</p>
        </header>

        <form className="testimonial-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="t-name">Prénom & Nom</label>
              <input
                id="t-name"
                type="text"
                required
                placeholder="Ex: Jean Dupont"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="t-role">Rôle / Organisation</label>
              <input
                id="t-role"
                type="text"
                required
                placeholder="Ex: Exploitant Maïs, Coopérative X"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="t-quote">Votre témoignage</label>
            <textarea
              id="t-quote"
              required
              rows="4"
              placeholder="..."
              value={formData.quote}
              onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
            ></textarea>
          </div>

          <button type="submit" className="button">
            {t('testi_form_submit')}
          </button>
        </form>
      </div>
    </section>
  );
}

function Home() {
  useScrollReveal();
  const { t } = useLanguage();
  useDocumentTitle(t('nav_home'));
  useMetaDescription(t('hero_subtitle'));

  const capabilityCards = [
    {
      title: t('cap_card1_title'),
      kpi: '+4 constellations',
      description: t('cap_card1_desc')
    },
    {
      title: t('cap_card2_title'),
      kpi: 'Précision 95%',
      description: t('cap_card2_desc')
    },
    {
      title: t('cap_card3_title'),
      kpi: '-12 j d’alerte',
      description: t('cap_card3_desc')
    }
  ];

  const workflowSteps = [
    {
      step: '01',
      title: t('methodo_step1'),
      description: t('methodo_step1_desc')
    },
    {
      step: '02',
      title: t('methodo_step2'),
      description: t('methodo_step2_desc')
    },
    {
      step: '03',
      title: t('methodo_step3'),
      description: t('methodo_step3_desc')
    }
  ];

  const insightHighlights = [
    { metric: '+37%', label: t('impact_metric1') },
    { metric: '12 h', label: t('impact_metric2') },
    { metric: '98%', label: t('impact_metric3') }
  ];

  const whyChoose = [
    {
      title: t('why_us_title_1', 'Intégration API ouverte'), // Placeholder keys if not in context yet
      description: t('why_us_desc_1', 'Connectez vos ERP agricoles, outils BI et plateformes coopératives via des APIs sécurisées et documentées.'),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: t('why_us_title_2', 'Gouvernance des données'),
      description: t('why_us_desc_2', 'Infrastructure hébergée dans l’UE, chiffrement de bout en bout, conformité RGPD et audit trail complet.'),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: t('why_us_title_3', 'Accompagnement agronome'),
      description: t('why_us_desc_3', 'Équipe d’agronomes data pour cadrer vos cas d’usage, former les équipes terrain et suivre la performance dans le temps.'),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];

  const testimonial = {
    quote: t('testi_quote', 'Grâce à Agri Orbit, nos équipes terrain anticipent les stress hydriques et ajustent les intrants avant même d’observer un symptôme. Le pilotage est enfin aligné entre la coopérative et les exploitants.'),
    name: 'Fatou Ndiaye',
    role: t('testi_role', 'Directrice Innovation, Coopérative AgriSun'),
    metrics: [
      { label: t('testi_metric1'), value: '-18%' },
      { label: t('testi_metric2'), value: '92%' },
      { label: t('testi_metric3'), value: '120 exploitants' }
    ]
  };

  return (
    <div className="home-page">
      <Hero
        eyebrow={t('hero_eyebrow')}
        title={t('hero_title')}
        subtitle={t('hero_subtitle')}
        ctaLabel={t('hero_cta')}
        ctaTo="/explorateur"
        secondaryLabel={t('hero_secondary')}
        secondaryHref="#demo"
        images={homeImages}
      />

      <section className="section hero-followup">
        <div className="container hero-followup-grid reveal-on-scroll">
          <div className="hero-chips surface-card hover-lift">
            <span className="chip">{t('hero_chip_esa')}</span>
            <span className="chip">{t('hero_chip_iso')}</span>
            <span className="chip">{t('hero_chip_eu')}</span>
          </div>
          <div className="hero-snapshot surface-card hover-lift">
            <strong>NDVI 0.78</strong>
            <p>{t('hero_ndvi_status')}</p>
          </div>
        </div>
      </section>

      <section className="section capabilities reveal-on-scroll">
        <div className="container">
          <header className="section-header">
            <span className="tag">{t('cap_tag')}</span>
            <h2>{t('cap_title')}</h2>
            <p>{t('cap_desc')}</p>
          </header>
          <div className="grid capability-grid">
            {capabilityCards.map((card) => (
              <GlowCard key={card.title} className="capability-card surface-card hover-lift">
                <div className="card-meta">
                  <span className="chip">
                    <AnimatedCounter value={card.kpi} />
                  </span>
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section workflow reveal-on-scroll">
        <div className="container glass-panel workflow-panel">
          <div className="workflow-intro">
            <span className="badge">{t('methodo_tag')}</span>
            <h2>{t('methodo_title')}</h2>
            <p>{t('methodo_desc')}</p>
          </div>
          <div className="workflow-steps">
            {workflowSteps.map((item) => (
              <div key={item.step} className="workflow-step surface-card hover-lift">
                <span className="step-index">{item.step}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-founder">
        <div className="container glass-panel home-founder-panel">
          <a href="https://portofolio-seven-lac-92.vercel.app/" target="_blank" rel="noopener noreferrer" className="home-founder-image">
            <img src={castro} alt="Dr. Castro Hounmenou" className="founder-portrait" loading="lazy" />
            <div className="founder-badge">{t('founder_badge')}</div>
          </a>
          <div className="home-founder-content">
            <span className="tag">{t('founder_tag')}</span>
            <h2>{t('founder_title')}</h2>
            <p>{t('founder_quote')}</p>
            <a href="https://portofolio-seven-lac-92.vercel.app/" target="_blank" rel="noopener noreferrer" className="founder-signature">
              <strong>Dr. Castro Hounmenou</strong>
              <span>{t('founder_signature')}</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section insights reveal-on-scroll">
        <div className="container insights-panel glass-panel">
          <div>
            <span className="badge">{t('impact_tag')}</span>
            <h2>{t('impact_title')}</h2>
            <p>{t('impact_desc')}</p>
          </div>
          <div className="insight-metrics">
            {insightHighlights.map((highlight) => (
              <div key={highlight.metric} className="metric-card surface-card hover-lift">
                <strong>
                  <AnimatedCounter value={highlight.metric} />
                </strong>
                <span>{highlight.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section testimonial reveal-on-scroll">
        <div className="container testimonial-panel glass-panel">
          <div className="testimonial-content">
            <span className="badge">{t('testi_tag')}</span>
            <blockquote>
              <p>{testimonial.quote}</p>
            </blockquote>
            <div className="testimonial-author">
              <div className="avatar" aria-hidden="true">FN</div>
              <div>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}</span>
              </div>
            </div>
          </div>
          <div className="testimonial-metrics">
            {testimonial.metrics.map((item) => (
              <div key={item.label} className="surface-card metric-tile hover-lift">
                <strong>
                  <AnimatedCounter value={item.value} />
                </strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialForm />

      <section className="section why-us reveal-on-scroll">
        <div className="container why-panel glass-panel">
          <header className="section-header">
            <span className="tag">{t('why_us_tag', 'Pourquoi nous choisir')}</span>
            <h2>{t('why_us_title', 'Une plateforme pensée pour les organisations agricoles exigeantes')}</h2>
            <p>{t('why_us_desc', 'Nous combinons excellence technologique, gouvernance des données et expertise agronomique pour garantir un déploiement durable.')}</p>
          </header>
          <div className="grid why-grid">
            {whyChoose.map((reason) => (
              <article key={reason.title} className="why-card surface-card hover-lift">
                <div className="why-icon">{reason.icon}</div>
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section demo" id="demo">
        <div className="container demo-panel glass-panel">
          <div>
            <h2>{t('demo_title', 'Prêt à connecter vos parcelles ?')}</h2>
            <p>{t('demo_desc', 'Profitez d’une session guidée de 30 minutes avec un agronome data analyst pour découvrir la lecture satellitaire appliquée à vos cultures.')}</p>
          </div>
          <MagneticButton className="button" onClick={() => window.location.href = "mailto:contact@agriorbit.ai"}>
            {t('hero_secondary')}
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}

export default Home;
