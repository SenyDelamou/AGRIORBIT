import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import '../styles/legal.css';

function SecurityPolicy() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page">
      <section className="legal-hero">
        <div className="container">
          <h1 className="animate-fade-in-down">Politique de Sécurité</h1>
          <p className="legal-intro animate-fade-in-up">
            Nous mettons en priorité la sécurité et la protection de vos données
          </p>
        </div>
      </section>

      <section className="legal-content">
        <div className="container">
          <article className="legal-article">
            <h2>1. Introduction</h2>
            <div className="legal-section">
              <p>
                Agri Orbit Analytics s'engage à maintenir les plus hauts standards de sécurité pour 
                protéger les données et les systèmes de ses utilisateurs. Cette politique décrit nos 
                pratiques de sécurité, mesures de contrôle et procédures.
              </p>
            </div>
          </article>

          <article className="legal-article">
            <h2>2. Architecture de Sécurité</h2>
            <div className="legal-section">
              <h3>Infrastructure Sécurisée</h3>
              <ul className="legal-list">
                <li>Hébergement sur Vercel avec infrastructure mondialement distribuée</li>
                <li>Centres de données certifiés ISO 27001, SOC 2 Type II</li>
                <li>Redondance et résilience à plusieurs niveaux</li>
                <li>Pare-feu DDoS protection intégré</li>
                <li>Monitoring 24/7 des intrusions</li>
              </ul>
            </div>

            <div className="legal-section">
              <h3>Chiffrement</h3>
              <ul className="legal-list">
                <li><strong>En Transit:</strong> TLS 1.2+ pour toutes les connexions HTTPS</li>
                <li><strong>Au Repos:</strong> AES-256 pour le stockage des données sensibles</li>
                <li><strong>Clés de Chiffrement:</strong> Gestion sécurisée avec rotation régulière</li>
                <li><strong>Certificats SSL/TLS:</strong> Certificats émeteurs de confiance</li>
              </ul>
            </div>
          </article>

          <article className="legal-article">
            <h2>3. Authentification et Autorisation</h2>
            <div className="legal-section">
              <h3>Mécanismes d'Authentification</h3>
              <ul className="legal-list">
                <li><strong>Mots de Passe:</strong> Hachage avec bcrypt, salt aléatoire</li>
                <li><strong>2FA/MFA:</strong> Authentification à deux facteurs disponible</li>
                <li><strong>OAuth 2.0:</strong> Intégration sécurisée des services tiers</li>
                <li><strong>Sessions:</strong> Tokens JWT sécurisés avec expiration</li>
                <li><strong>Lockout:</strong> Protection contre les attaques par force brute</li>
              </ul>
            </div>

            <div className="legal-section">
              <h3>Contrôle d'Accès</h3>
              <ul className="legal-list">
                <li>Contrôle d'accès basé sur les rôles (RBAC)</li>
                <li>Principe du moindre privilège appliqué</li>
                <li>Audit des accès et des modifications</li>
                <li>Révocation immédiate des accès</li>
              </ul>
            </div>
          </article>

          <article className="legal-article">
            <h2>4. Protection des Données</h2>
            <div className="legal-section">
              <h3>Stockage des Données</h3>
              <ul className="legal-list">
                <li>Base de données PostgreSQL sécurisée</li>
                <li>Backup automatique quotidien avec chiffrement</li>
                <li>Réplication en plusieurs zones géographiques</li>
                <li>Tests de restauration réguliers</li>
              </ul>
            </div>

            <div className="legal-section">
              <h3>Données Sensibles</h3>
              <ul className="legal-list">
                <li>Mots de passe: Jamais stockés en clair</li>
                <li>Données de Paiement: Conformité PCI DSS 3.2.1</li>
                <li>Informations Médicales: Conformité HIPAA si applicable</li>
                <li>Données Biométriques: Chiffrement renforcé</li>
              </ul>
            </div>
          </article>

          <article className="legal-article">
            <h2>5. Protection des Applications</h2>
            <div className="legal-section">
              <h3>Sécurité du Code</h3>
              <ul className="legal-list">
                <li>Scan de sécurité du code (SAST) avant déploiement</li>
                <li>Dépendances: Vérification des vulnérabilités connues (OWASP)</li>
                <li>Révision de code: Tous les changements révisés</li>
                <li>Tests de pénétration: Audits trimestriels</li>
              </ul>
            </div>

            <div className="legal-section">
              <h3>Protection Contre les Attaques</h3>
              <ul className="legal-list">
                <li><strong>Injection SQL:</strong> Requêtes paramétrées, ORM</li>
                <li><strong>XSS:</strong> Sanitization, Content Security Policy</li>
                <li><strong>CSRF:</strong> Tokens CSRF, Same-Site cookies</li>
                <li><strong>CORS:</strong> Politique d'origine croisée restrictive</li>
                <li><strong>Rate Limiting:</strong> Limitation du débit par IP/utilisateur</li>
              </ul>
            </div>
          </article>

          <article className="legal-article">
            <h2>6. Gestion des Identifiants</h2>
            <div className="legal-section">
              <h3>Clés API et Tokens</h3>
              <ul className="legal-list">
                <li>Rotation automatique tous les 90 jours</li>
                <li>Révocation immédiate en cas de compromission</li>
                <li>Logging de tous les accès API</li>
                <li>Limites de débit par clé API</li>
              </ul>
            </div>

            <div className="legal-section">
              <h3>Secrets d'Infrastructure</h3>
              <ul className="legal-list">
                <li>Stockage dans un gestionnaire de secrets (Vault)</li>
                <li>Jamais dans le code source ou les logs</li>
                <li>Rotation régulière des secrets</li>
                <li>Audit d'accès aux secrets</li>
              </ul>
            </div>
          </article>

          <article className="legal-article">
            <h2>7. Logging et Monitoring</h2>
            <div className="legal-section">
              <h3>Monitoring</h3>
              <ul className="legal-list">
                <li>Surveillance 24/7 de tous les systèmes</li>
                <li>Alertes automatiques pour événements suspects</li>
                <li>Analyse comportementale des utilisateurs</li>
                <li>Détection d'anomalies en temps réel</li>
              </ul>
            </div>

            <div className="legal-section">
              <h3>Logging</h3>
              <ul className="legal-list">
                <li>Tous les événements importants consignés</li>
                <li>Logs immuables (append-only)</li>
                <li>Conservation: 90 jours minimum, 2 ans pour données sensibles</li>
                <li>Chiffrement et sécurisation des logs</li>
              </ul>
            </div>
          </article>

          <article className="legal-article">
            <h2>8. Gestion des Incidents</h2>
            <div className="legal-section">
              <h3>Procédure de Réponse</h3>
              <p>
                En cas de violation de sécurité ou d'incident:
              </p>
              <ul className="legal-list">
                <li><strong>Détection:</strong> Identification immédiate du problème</li>
                <li><strong>Confinement:</strong> Isolation de l'incident</li>
                <li><strong>Éradication:</strong> Suppression de la cause racine</li>
                <li><strong>Récupération:</strong> Restauration des services</li>
                <li><strong>Notification:</strong> Alerter les utilisateurs affectés sous 72h</li>
              </ul>
            </div>

            <div className="legal-section">
              <h3>Contact Incident</h3>
              <p>
                <strong>Email Urgent:</strong> security@agri-orbit.com<br />
                <strong>Numéro:</strong> [À compléter]<br />
                <strong>Équipe:</strong> Disponible 24/7
              </p>
            </div>
          </article>

          <article className="legal-article">
            <h2>9. Conformité et Certifications</h2>
            <div className="legal-section">
              <h3>Standards Respectés</h3>
              <ul className="legal-list">
                <li><strong>RGPD:</strong> Conformité complète</li>
                <li><strong>CCPA:</strong> Respect des droits de confidentialité Californiens</li>
                <li><strong>ISO 27001:</strong> Systèmes de gestion de la sécurité</li>
                <li><strong>SOC 2 Type II:</strong> Contrôles de fiabilité</li>
                <li><strong>OWASP:</strong> Top 10 des vulnérabilités Web</li>
              </ul>
            </div>

            <div className="legal-section">
              <h3>Audits Externes</h3>
              <ul className="legal-list">
                <li>Audit de sécurité annuel par tiers indépendant</li>
                <li>Tests de pénétration trimestriels</li>
                <li>Scan de vulnérabilités hebdomadaires</li>
                <li>Rapports disponibles sur demande</li>
              </ul>
            </div>
          </article>

          <article className="legal-article">
            <h2>10. Sécurité des Employés</h2>
            <div className="legal-section">
              <h3>Formation et Sensibilisation</h3>
              <ul className="legal-list">
                <li>Formation à la sécurité obligatoire pour tous les employés</li>
                <li>Recyclage annuel requis</li>
                <li>Simulation de phishing pour tester la vigilance</li>
                <li>Politique d'utilisation acceptable stricte</li>
              </ul>
            </div>

            <div className="legal-section">
              <h3>Accès et Prérequis</h3>
              <ul className="legal-list">
                <li>Vérification des antécédents pour tous les employés</li>
                <li>NDA/Accord de confidentialité obligatoire</li>
                <li>Principe du moindre privilège appliqué</li>
                <li>Révocation immédiate à la séparation</li>
              </ul>
            </div>
          </article>

          <article className="legal-article">
            <h2>11. Sécurité Physique</h2>
            <div className="legal-section">
              <ul className="legal-list">
                <li>Centre de données avec contrôle d'accès biométrique</li>
                <li>Surveillance vidéo 24/7</li>
                <li>Systèmes électriques redondants</li>
                <li>Systèmes de refroidissement automatisés</li>
                <li>Protection contre l'incendie et les inondations</li>
              </ul>
            </div>
          </article>

          <article className="legal-article">
            <h2>12. Responsabilité de l'Utilisateur</h2>
            <div className="legal-section">
              <p>
                Les utilisateurs sont responsables de:
              </p>
              <ul className="legal-list">
                <li>Garder leur mot de passe secret et sécurisé</li>
                <li>Ne pas partager leur compte</li>
                <li>Signaler les activités suspectes immédiatement</li>
                <li>Mettre à jour leurs coordonnées</li>
                <li>Utiliser une connexion Internet sécurisée</li>
              </ul>
            </div>
          </article>

          <article className="legal-article">
            <h2>13. Coordonnées de Sécurité</h2>
            <div className="legal-section">
              <p>
                Pour signaler un problème de sécurité:
              </p>
              <p>
                <strong>Email:</strong> security@agri-orbit.com<br />
                <strong>Responsable Sécurité:</strong> [Nom et titre]<br />
                <strong>Hotline Sécurité:</strong> 24h/24, 7j/7
              </p>
              <p>
                Les rapports de sécurité sont traités avec confidentialité et reçoivent une 
                réponse dans les 48 heures.
              </p>
            </div>
          </article>

          <article className="legal-article">
            <h2>14. Mises à Jour de Cette Politique</h2>
            <div className="legal-section">
              <p>
                Nous mettons à jour cette politique régulièrement pour refléter les nouvelles 
                menaces et meilleures pratiques en matière de sécurité.
              </p>
              <p>
                <strong>Dernière mise à jour:</strong> {new Date().toLocaleDateString('fr-FR')}
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="legal-footer-cta">
        <div className="container">
          <h2>Avez-vous des préoccupations de sécurité?</h2>
          <p>Contactez notre équipe de sécurité immédiatement</p>
          <div className="cta-links">
            <a href="mailto:security@agri-orbit.com" className="button">Signaler une Vulnérabilité</a>
            <a href="/mentions-legales" className="button button-secondary">Mentions Légales</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SecurityPolicy;
