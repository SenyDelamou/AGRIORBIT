import Hero from '../components/Hero.jsx';
import TechDownload from '../components/TechDownload.jsx';
import { aboutImages } from '../data/heroImages.js';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import castro from '../assets/castro.png';
import '../styles/contact.css';

function Contact() {
    const contactInfo = [
        {
            icon: <EnvelopeIcon className="icon" />,
            label: 'Email Professionnel',
            value: 'samakedelamou858@gmail.com',
            link: 'mailto:samakedelamou858@gmail.com'
        },
        {
            icon: <PhoneIcon className="icon" />,
            label: 'Téléphone / WhatsApp',
            value: '+229 95 30 66 12',
            link: 'tel:+22995306612'
        },
        {
            icon: <MapPinIcon className="icon" />,
            label: 'Bureau',
            value: 'Université de Labé, République de Guinée',
            link: 'https://maps.google.com/?q=Université+de+Labé+Guinée'
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        alert('Message envoyé ! Nous vous recontacterons sous peu.');
    };

    return (
        <div className="contact-page">
            <Hero
                eyebrow="Contactez-nous"
                title="Parlons de votre projet d'agriculture de précision"
                subtitle="Agri Orbit est une initiative scientifique et technologique. Pour toute collaboration ou support, Dr Castro Hounmenou et son équipe sont à votre écoute."
                images={aboutImages}
            />

            <section className="section contact-content">
                <div className="container contact-grid">
                    {/* Contact Details */}
                    <div className="contact-details">
                        <header className="section-header">
                            <span className="tag">Coordonnées</span>
                            <h2>Informations Professionnelles</h2>
                            <p>Directeur de projet & Chercheur à l'Université de Labé. Expert en observation de la Terre et modélisation agricole.</p>
                        </header>

                        <div className="info-cards">
                            {contactInfo.map((info, idx) => (
                                <div key={idx} className="info-card glass-panel">
                                    <div className="info-icon">{info.icon}</div>
                                    <div className="info-text">
                                        <span className="info-label">{info.label}</span>
                                        <a href={info.link} className="info-value" target="_blank" rel="noopener noreferrer">
                                            {info.value}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="dr-profile glass-panel">
                            <div className="dr-profile-header">
                                <img
                                    src={castro}
                                    alt="Dr. Castro Hounmenou"
                                    className="dr-profile-img"
                                />
                                <div className="dr-profile-meta">
                                    <div className="profile-badge">Dr. Castro Hounmenou</div>
                                    <span className="profile-role">Fondateur & Visionnaire</span>
                                </div>
                            </div>
                            <p>Passionné par l'innovation agricole en Afrique, il pilote le développement d'Agri Orbit pour transformer les données satellitaires en solutions concrètes pour les producteurs.</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="contact-form-wrapper glass-panel">
                        <h3>Envoyez-nous un message</h3>
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">Nom complet</label>
                                <input type="text" id="name" name="name" placeholder="Votre nom" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" placeholder="votre@email.com" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Sujet</label>
                                <select id="subject" name="subject" required>
                                    <option value="">Sélectionnez un sujet</option>
                                    <option value="collaboration">Collaboration scientifique</option>
                                    <option value="support">Support technique</option>
                                    <option value="demo">Demande de démonstration</option>
                                    <option value="other">Autre demande</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" name="message" rows="5" placeholder="Votre message..." required></textarea>
                            </div>
                            <button type="submit" className="button">Envoyer le message</button>
                        </form>
                    </div>
                </div>
            </section>

            <TechDownload />
        </div>
    );
}

export default Contact;
