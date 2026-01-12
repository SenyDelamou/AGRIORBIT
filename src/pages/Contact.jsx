import { useState } from 'react';
import Hero from '../components/Hero.jsx';
import TechDownload from '../components/TechDownload.jsx';
import { aboutImages } from '../data/heroImages.js';
import {
  EnvelopeIcon, PhoneIcon, MapPinIcon, ClockIcon, GlobeAltIcon,
  SparklesIcon, CheckCircleIcon, ChatBubbleLeftRightIcon,
  CheckIcon, XMarkIcon, CalendarIcon, UsersIcon, BuildingOfficeIcon,
  LinkIcon, DocumentTextIcon, ShieldCheckIcon
} from '@heroicons/react/24/outline';
import castro from '../assets/castro.png';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import { useToast } from '../context/ToastContext';
import '../styles/contact.css';

const CONTACT_METHODS = [
  { icon: EnvelopeIcon, label: 'Email Professionnel', value: 'samakedelamou858@gmail.com', link: 'mailto:samakedelamou858@gmail.com', time: 'Réponse sous 24h' },
  { icon: PhoneIcon, label: 'WhatsApp Direct', value: '+229 95 30 66 12', link: 'https://wa.me/22995306612', time: 'Réponse immédiate' },
  { icon: MapPinIcon, label: 'Siège Social', value: 'Labé, Guinée', link: 'https://maps.google.com/?q=Université+de+Labé+Guinée', time: 'Rendez-vous possible' },
  { icon: GlobeAltIcon, label: 'Zoom Meeting', value: 'Sur rendez-vous', link: '#', time: 'Planifiez un appel' }
];

const FAQ_ITEMS = [
  { q: 'Quel est le délai de réponse?', a: 'Nous répondons à tous les messages dans les 24 heures ouvrables.' },
  { q: 'Puis-je programmer une démonstration?', a: 'Oui, contactez-nous et nous organiserons une démo adaptée à vos besoins.' },
  { q: 'Y a-t-il un support technique 24/7?', a: 'Notre support prioritaire clients Premium est disponible 24/7.' },
  { q: 'Comment devenir partenaire?', a: 'Envoyez-nous une proposition de collaboration détaillée.' },
  { q: 'Quels types de projets acceptez-vous?', a: 'Agriculture, recherche, gouvernance, humanitaire et impact climatique.' }
];

const TEAM_MEMBERS = [
  { name: 'Dr. Castro Hounmenou', role: 'Fondateur & Directeur', specialty: 'Observation Terrestre', img: castro },
  { name: 'Jean Kamara', role: 'Ingénieur Agronome', specialty: 'Modélisation', img: castro },
  { name: 'Aminata Diallo', role: 'Responsable Client', specialty: 'Support & Partenariats', img: castro },
  { name: 'Moussa Ba', role: 'Lead Développeur', specialty: 'Infrastructure', img: castro }
];

const SUCCESS_STORIES = [
  { title: 'Sahel Agriculture Project', region: 'Mali, Burkina', impact: '+35% rendement', year: '2024' },
  { title: 'Delta Water Initiative', region: 'Niger, Sénégal', impact: '-28% eau', year: '2024' },
  { title: 'Climate Resilience Program', region: 'Côte d\'Ivoire', impact: '+450 fermiers', year: '2023' }
];

const RESPONSE_TIMES = [
  { category: 'Message Contact', time: '< 24h', icon: '' },
  { category: 'Demo Request', time: '< 48h', icon: '' },
  { category: 'Support Ticket', time: '< 2h', icon: '' },
  { category: 'Partnership', time: '< 72h', icon: '' }
];

function Contact() {
  useScrollReveal();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', company: '', message: '' });
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Veuillez remplir tous les champs obligatoires', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Message envoyé avec succès! Nous vous recontacterons sous peu.', 'success');
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', company: '', message: '' });
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="contact-page">
      <Hero
        eyebrow="Contactez-nous"
        title="Parlons de votre projet d'agriculture de précision"
        subtitle="Agri Orbit est une initiative scientifique et technologique. Pour toute collaboration ou support, Dr Castro Hounmenou et son équipe sont à votre écoute."
        images={aboutImages}
      />

      {/* Quick Contact Methods */}
      <section className="section quick-contact">
        <div className="container">
          <div className="quick-contact-grid">
            {CONTACT_METHODS.map((method, idx) => {
              const Icon = method.icon;
              return (
                <a key={idx} href={method.link} className="quick-contact-card glass-panel reveal-on-scroll" target={method.link.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer">
                  <Icon className="quick-contact-icon" />
                  <div className="quick-contact-content">
                    <p className="quick-contact-label">{method.label}</p>
                    <p className="quick-contact-value">{method.value}</p>
                    <span className="quick-contact-time">{method.time}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Response Times */}
      <section className="section response-times">
        <div className="container">
          <div className="section-header-center">
            <span className="badge">Engagement de Service</span>
            <h2>Temps de réponse garantis</h2>
          </div>
          <div className="response-times-grid">
            {RESPONSE_TIMES.map((item, idx) => (
              <div key={idx} className="response-card glass-panel">
                <div className="response-icon">{item.icon}</div>
                <h3>{item.category}</h3>
                <p className="response-time">{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="section contact-content">
        <div className="container contact-grid">
          {/* Contact Details */}
          <div className="contact-details reveal-on-scroll">
            <div className="section-header">
              <span className="badge">Coordonnées</span>
              <h2>Informations Professionnelles</h2>
              <p>Directeur de projet & Chercheur à l'Université de Labé. Expert en observation de la Terre et modélisation agricole.</p>
            </div>

            <div className="info-cards">
              {CONTACT_METHODS.map((method, idx) => {
                const Icon = method.icon;
                return (
                  <div key={idx} className="info-card glass-panel hover-lift" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <Icon className="info-icon" />
                    <div className="info-text">
                      <span className="info-label">{method.label}</span>
                      <a href={method.link} className="info-value" target={method.link.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer">
                        {method.value}
                      </a>
                      <span className="info-time">{method.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dr. Profile */}
            <div className="dr-profile glass-panel">
              <div className="dr-profile-header">
                <img src={castro} alt="Dr. Castro Hounmenou" className="dr-profile-img" />
                <div className="dr-profile-meta">
                  <div className="profile-badge">Dr. Castro Hounmenou</div>
                  <span className="profile-role">Fondateur & Visionnaire</span>
                  <span className="profile-status"> Disponible pour discuter</span>
                </div>
              </div>
              <p>Passionné par l'innovation agricole en Afrique, il pilote le développement d'Agri Orbit pour transformer les données satellitaires en solutions concrètes pour les producteurs.</p>
              <div className="profile-stats">
                <div className="stat"><strong>20+</strong> ans d'expérience</div>
                <div className="stat"><strong>500+</strong> agriculteurs aidés</div>
                <div className="stat"><strong>15</strong> publications</div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrapper glass-panel hover-lift">
            <h3>Envoyez-nous un message</h3>
            {submitted ? (
              <div className="success-message">
                <CheckCircleIcon />
                <h4>Message envoyé avec succès!</h4>
                <p>Nous vous recontacterons très bientôt.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Nom complet *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Votre nom"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Téléphone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+229 XX XXX XXXX"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">Entreprise</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      placeholder="Votre entreprise"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Sujet *</label>
                  <select id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required>
                    <option value="">Sélectionnez un sujet</option>
                    <option value="collaboration">Collaboration scientifique</option>
                    <option value="demo">Demande de démonstration</option>
                    <option value="support">Support technique</option>
                    <option value="partnership">Partenariat</option>
                    <option value="investment">Investissement</option>
                    <option value="other">Autre demande</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    placeholder="Décrivez votre demande en détail..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <button type="submit" className="button-primary">
                  Envoyer le message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section team-section">
        <div className="container">
          <div className="section-header-center">
            <span className="badge">Notre Équipe</span>
            <h2>Rencontrez nos experts</h2>
            <p>Des professionnels dédiés à l'innovation agricole</p>
          </div>

          <div className="team-grid">
            {TEAM_MEMBERS.map((member, idx) => (
              <div key={idx} className="team-card glass-panel reveal-on-scroll">
                <img src={member.img} alt={member.name} className="team-avatar" />
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-specialty">{member.specialty}</p>
                <div className="team-socials">
                  <a href="#" className="social-icon">in</a>
                  <a href="#" className="social-icon">@</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section success-stories">
        <div className="container">
          <div className="section-header-center">
            <span className="badge">Réalisations</span>
            <h2>Projets d'impact</h2>
            <p>Découvrez comment nous transformons l'agriculture en Afrique</p>
          </div>

          <div className="success-grid">
            {SUCCESS_STORIES.map((story, idx) => (
              <div key={idx} className="success-card glass-panel reveal-on-scroll">
                <div className="success-header">
                  <span className="success-year">{story.year}</span>
                  <span className="success-impact">{story.impact}</span>
                </div>
                <h3>{story.title}</h3>
                <p className="success-region"> {story.region}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq-section">
        <div className="container">
          <div className="section-header-center">
            <span className="badge">FAQ</span>
            <h2>Questions fréquemment posées</h2>
          </div>

          <div className="faq-list">
            {FAQ_ITEMS.map((item, idx) => (
              <div key={idx} className="faq-item glass-panel">
                <button
                  className="faq-question"
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                >
                  <span>{item.q}</span>
                  <span className="faq-toggle">{expandedFaq === idx ? '' : '+'}</span>
                </button>
                {expandedFaq === idx && (
                  <div className="faq-answer">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-card glass-panel">
            <h2>Prêt à discuter?</h2>
            <p>Qu'il s'agisse d'une question, d'une collaboration ou d'un partenariat, nous sommes là pour vous.</p>
            <div className="cta-buttons">
              <a href="https://wa.me/22995306612" className="button-primary" target="_blank" rel="noopener noreferrer">
                Démarrer sur WhatsApp
              </a>
              <a href="mailto:samakedelamou858@gmail.com" className="button-outline">
                Envoyer un email
              </a>
            </div>
          </div>
        </div>
      </section>

      <TechDownload />
    </div>
  );
}

export default Contact;
