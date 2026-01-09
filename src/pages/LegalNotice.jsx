import { useEffect, useMemo, useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import {
  DocumentTextIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  EnvelopeIcon,
  BuildingLibraryIcon,
  SparklesIcon,
  ArrowUpIcon,
  ShareIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import PremiumBadge from '../components/PremiumBadge.jsx';
import '../styles/legal.css';

function LegalNotice() {
  const { lang, t } = useLanguage();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const contentRef = useRef(null);

  // Meta tags for SEO
  useEffect(() => {
    document.title = 'Mentions Légales - Agri Orbit Analytics';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Mentions légales, propriété intellectuelle et conditions d\'utilisation d\'Agri Orbit Analytics');
    }
  }, []);

  // Scroll to top functionality
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initial scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const localeMap = {
    fr: 'fr-FR',
    en: 'en-US'
  };
  const dateFormatter = useMemo(
    () => new Intl.DateTimeFormat(localeMap[lang] ?? 'fr-FR', { dateStyle: 'long' }),
    [lang]
  );
  const copyToClipboard = async (value) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        return true;
      }
      const textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    } catch (error) {
      console.warn('Impossible de copier le texte dans le presse-papiers.', error);
      return false;
    }
  };

  // Copy to clipboard functionality
  const handleCopySection = async (cardId, title) => {
    const text = `${title} — Agri Orbit Analytics`;
    const copied = await copyToClipboard(text);
    if (copied) {
      setCopiedId(cardId);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Share functionality
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
        title: 'Mentions Légales',
        text: 'Consultez les mentions légales d\'Agri Orbit Analytics',
        url: window.location.href
      });
      } catch (error) {
        console.warn('Partage abandonné ou non supporté.', error);
      }
    } else {
      const copied = await copyToClipboard(window.location.href);
      if (copied) {
        setCopiedId('url');
        setTimeout(() => setCopiedId(null), 2000);
      }
    }
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const legalCards = useMemo(() => ([
    {
      id: 1,
      badge: 'IDENTITÉ',
      title: 'Éditeur du Site',
      description: 'Agri Orbit Analytics - Informations professionnelles, contact et responsabilité légale de la plateforme.',
      icon: BuildingLibraryIcon,
      color: 'blue'
    },
    {
      id: 2,
      badge: 'RESPONSABILITÉ',
      title: 'Directeur de Publication',
      description: 'Responsable officiel de la publication du site et de ses contenus. Réclamations et signalements.',
      icon: ShieldCheckIcon,
      color: 'green'
    },
    {
      id: 3,
      badge: 'HÉBERGEMENT',
      title: 'Infrastructure',
      description: 'Hébergement chez Vercel Inc. Serveurs sécurisés conformes aux standards internationaux.',
      icon: DocumentTextIcon,
      color: 'blue'
    },
    {
      id: 4,
      badge: 'PROPRIÉTÉ',
      title: 'Droits d\'Auteur',
      description: 'Tous les contenus (textes, images, vidéos, logos) sont protégés et propriété exclusive.',
      icon: LockClosedIcon,
      color: 'green'
    },
    {
      id: 5,
      badge: 'MARQUES',
      title: 'Marques Déposées',
      description: 'Agri Orbit et logos associés sont des marques déposées. Utilisation interdite sans autorisation.',
      icon: SparklesIcon,
      color: 'blue'
    },
    {
      id: 6,
      badge: 'LICENCE',
      title: 'Conditions d\'Utilisation',
      description: 'Licence limitée et révocable pour l\'accès au site. Respect des conditions obligatoires.',
      icon: CheckCircleIcon,
      color: 'green'
    },
    {
      id: 7,
      badge: 'RESPONSABILITÉ',
      title: 'Limitation de Responsabilité',
      description: 'Agri Orbit Analytics ne peut être tenu responsable des dommages indirects ou pertes de données.',
      icon: ExclamationTriangleIcon,
      color: 'blue'
    },
    {
      id: 8,
      badge: 'MODIFICATIONS',
      title: 'Révision des Mentions',
      description: 'Nous nous réservons le droit de modifier ces mentions à tout moment sans préavis.',
      icon: DocumentTextIcon,
      color: 'green'
    },
    {
      id: 9,
      badge: 'JURIDIQUE',
      title: 'Juridiction',
      description: 'Ces mentions sont régies par la loi française. Tribunaux compétents définis selon le droit.',
      icon: BuildingLibraryIcon,
      color: 'blue'
    },
    {
      id: 10,
      badge: 'CONTACT',
      title: 'Coordonnées Légales',
      description: 'Pour toute question légale, contactez-nous directement. Support disponible 24/7.',
      icon: EnvelopeIcon,
      color: 'green'
    }
  ]), []);
  const sectionIds = useMemo(() => legalCards.map((card) => `section-${card.id}`), [legalCards]);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.target.offsetTop - b.target.offsetTop);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-55% 0px -35% 0px',
        threshold: 0.2
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  const metaCards = [
    {
      title: t('legal_meta_last_update'),
      value: dateFormatter.format(new Date())
    },
    {
      title: t('legal_notice_meta_compliance'),
      value: t('legal_notice_meta_compliance_value')
    },
    {
      title: t('legal_meta_scope'),
      value: t('legal_notice_meta_scope_value')
    }
  ];

  return (
    <div className="legal-page premium-legal" ref={contentRef}>
      {/* Table of Contents */}
      <nav className="legal-toc" aria-label="Table of contents">
        <div className="container">
          <h2 className="toc-title">{t('legal_notice_nav_title')}</h2>
          <div className="toc-grid">
            {legalCards.map((card) => (
              <button
                key={`toc-${card.id}`}
                className={`toc-link ${activeSection === `section-${card.id}` ? 'active' : ''}`}
                onClick={() => scrollToSection(`section-${card.id}`)}
                aria-label={t('legal_notice_nav_aria', { section: card.title })}
              >
                {card.title}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section className="legal-hero premium">
        <div className="container">
          <div className="legal-hero-meta animate-fade-in-down">
            <PremiumBadge />
            <span className="legal-kicker">{t('legal_notice_kicker')}</span>
          </div>
          <h1 className="animate-fade-in-down">{t('legal_notice_title')}</h1>
          <p className="legal-intro animate-fade-in-up">
            {t('legal_notice_intro')}
          </p>
          
          {/* Share Button */}
          <button
            className="share-button animate-fade-in-up"
            onClick={handleShare}
            aria-label={t('legal_notice_share_aria')}
            title={t('legal_notice_share_title')}
          >
            {copiedId === 'url' ? (
              <CheckIcon className="share-icon" aria-hidden="true" />
            ) : (
              <ShareIcon className="share-icon" aria-hidden="true" />
            )}
            <span>{copiedId === 'url' ? t('legal_notice_share_copied') : t('legal_notice_share')}</span>
          </button>

          <div className="legal-meta-grid animate-fade-in-up">
            {metaCards.map(({ title, value }) => (
              <div 
                key={title} 
                className="meta-card"
                role="status"
                aria-label={`${title}: ${value}`}
              >
                <span className="meta-title">{title}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="legal-content">
        <div className="container">
          <div className="legal-cards-grid">
            {legalCards.map((card, idx) => {
              const IconComponent = card.icon;
              return (
                <article
                  key={card.id}
                  id={`section-${card.id}`}
                  className={`legal-card legal-card-${card.color}`}
                  style={{ animationDelay: `${idx * 0.08}s` }}
                  role="region"
                  aria-label={card.title}
                >
                  <div className="card-badge">{card.badge}</div>
                  
                  <div className="card-icon-wrapper">
                    <IconComponent className="card-icon" aria-hidden="true" />
                  </div>
                  
                  <h2 className="card-title">{card.title}</h2>
                  <p className="card-description">{card.description}</p>
                  
                  {/* Copy to clipboard button */}
                  <button
                    className={`copy-button ${copiedId === card.id ? 'copied' : ''}`}
                    onClick={() => handleCopySection(card.id, card.title)}
                    aria-label={t('legal_notice_copy_aria', { section: card.title })}
                    title={t('legal_notice_copy_title')}
                  >
                    {copiedId === card.id ? (
                      <CheckIcon className="copy-icon" aria-hidden="true" />
                    ) : (
                      <DocumentTextIcon className="copy-icon" aria-hidden="true" />
                    )}
                  </button>
                  
                  <div className="card-hover-effect"></div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="legal-details">
        <div className="container">
          <div className="details-grid">
            <div className="detail-section" id="section-editor">
              <h3>Éditeur du Site</h3>
              <p>
                <strong>Agri Orbit Analytics</strong><br />
                Adresse: Université de Labé, République de Guinée<br />
                Email: <a href="mailto:contact@agri-orbit.com">contact@agri-orbit.com</a><br />
                Téléphone: <a href="tel:[À compléter]">[À compléter]</a><br />
                SIRET: [À compléter]<br />
                Numéro TVA: [À compléter]
              </p>
            </div>

            <div className="detail-section" id="section-ip">
              <h3>Propriété Intellectuelle</h3>
              <p>
                Tous les contenus présents sur ce site (textes, images, vidéos, logos, graphiques) sont la propriété exclusive d'Agri Orbit Analytics ou de ses partenaires. Toute reproduction sans autorisation préalable est strictement interdite.
              </p>
            </div>

            <div className="detail-section" id="section-hosting">
              <h3>Hébergement</h3>
              <p>
                Ce site est hébergé chez :<br />
                <strong>Vercel Inc.</strong><br />
                Les données sont stockées sur des serveurs basés aux États-Unis et respectent les standards de sécurité internationaux.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          className="back-to-top animate-fade-in-up"
          onClick={scrollToTop}
          aria-label={t('legal_notice_back_to_top_aria')}
          title={t('legal_notice_back_to_top_title')}
        >
          <ArrowUpIcon className="arrow-icon" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

export default LegalNotice;
