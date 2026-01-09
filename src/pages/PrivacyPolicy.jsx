import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import '../styles/legal.css';

function PrivacyPolicy() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page">
      <section className="legal-hero">
        <div className="container">
          <h1 className="animate-fade-in-down">Politique de Confidentialité</h1>
          <p className="legal-intro animate-fade-in-up">
            Votre vie privée et la protection de vos données nous importent
          </p>
        </div>
      </section>

      <section className="legal-content">
        <div className="container">
          <article className="legal-article">
            <h2>1. Responsable du Traitement</h2>
            <div className="legal-section">
              <p>
                <strong>Agri Orbit Analytics</strong> est responsable du traitement de vos données personnelles.
                Pour toute question, contactez-nous à: <strong>privacy@agri-orbit.com</strong>
              </p>
            </div>
          </article>

          <article className="legal-article">
            <h2>2. Données que Nous Collectons</h2>
            <div className="legal-section">
              <h3>Données Fournies Directement</h3>
              <ul className="legal-list">
                <li><strong>Informations de Compte:</strong> Nom, email, numéro de téléphone, mot de passe</li>
                <li><strong>Données de Profil:</strong> Photo de profil, bio, localisation, préférences</li>
                <li><strong>Données de Communication:</strong> Messages, commentaires, avis, feedbacks</li>
                <li><strong>Données de Paiement:</strong> Informations bancaires, adresse de facturation</li>
              </ul>
            </div>

            <div className="legal-section">
              <h3>Données Collectées Automatiquement</h3>
              <ul className="legal-list">
                <li><strong>Données de Navigation:</strong> Adresse IP, type de navigateur, pages visitées</li>
                <li><strong>Cookies:</strong> Préférences, langue, sessions utilisateur</li>
                <li><strong>Données de Dispositif:</strong> Type d'appareil, système d'exploitation</li>
                <li><strong>Données d'Utilisation:</strong> Actions, clics, temps passé, événements</li>
                <li><strong>Données Géolocalisation:</strong> Localisation approximative (si autorisé)</li>
              </ul>
            </div>

            <div className="legal-section">
              <h3>Données Agricoles</h3>
              <ul className="legal-list">
                <li>Données de champs et parcelles agricoles</li>
                <li>Données de récoltes et rendements</li>
                <li>Données météorologiques et d'analyse</li>
                <li>Données de capteurs et d'équipements</li>
              </ul>
            </div>
          </article>

          <article className="legal-article">
            <h2>3. Base Juridique du Traitement</h2>
            <div className="legal-section">
              <p>Nous traitons vos données sur les bases suivantes:</p>
              <ul className="legal-list">
                <li><strong>Consentement:</strong> Quand vous acceptez explicitement</li>
                <li><strong>Contrat:</strong> Pour l'exécution de nos services</li>
                <li><strong>Obligation légale:</strong> Pour respecter les lois</li>
                <li><strong>Intérêts légitimes:</strong> Pour améliorer nos services</li>
                <li><strong>Intérêt public:</strong> Pour des activités dans l'intérêt public</li>
              </ul>
            </div>
          </article>

          <article className="legal-article">
            <h2>4. Finalités du Traitement</h2>
            <div className="legal-section">
              <p>Vos données sont utilisées pour:</p>
              <ul className="legal-list">
                <li>Fournir et améliorer nos services</li>
                <li>Authentifier votre compte et sécuriser vos données</li>
                <li>Vous envoyer des notifications et mises à jour</li>
                <li>Répondre à vos demandes et support client</li>
                <li>Analyser l'utilisation du service</li>
                <li>Prévenir les fraudes et les abus</li>
                <li>Respecter les obligations légales</li>
                <li>Vous envoyer des communications marketing (si consenti)</li>
              </ul>
            </div>
          </article>

          <article className="legal-article">
            <h2>5. Partage de Données</h2>
            <div className="legal-section">
              <h3>Partage avec des Tiers</h3>
              <p>Nous pouvons partager vos données avec:</p>
              <ul className="legal-list">
                <li><strong>Prestataires de Service:</strong> Hébergement, paiement, email (Vercel, Stripe, etc.)</li>
                <li><strong>Partenaires Commerciaux:</strong> Pour des services intégrés (avec consentement)</li>
                <li><strong>Autorités Légales:</strong> Si requis par la loi</li>
                <li><strong>Acquéreurs:</strong> En cas de fusion ou acquisition</li>
              </ul>
            </div>

            <div className="legal-section">
              <h3>Pas de Vente de Données</h3>
              <p>
                Nous ne vendons pas vos données personnelles à des tiers commerciaux pour leur 
                profit direct. Les partages sont limités aux besoins fonctionnels du service.
              </p>
            </div>
          </article>

          <article className="legal-article">
            <h2>6. Sécurité des Données</h2>
            <div className="legal-section">
              <p>
                Nous implémentons des mesures de sécurité techniques et organisationnelles robustes:
              </p>
              <ul className="legal-list">
                <li>Chiffrement SSL/TLS pour les transmissions</li>
                <li>Hachage sécurisé des mots de passe</li>
                <li>Authentification à deux facteurs disponible</li>
                <li>Audit de sécurité régulier</li>
                <li>Contrôle d'accès basé sur les rôles</li>
                <li>Sauvegarde régulière des données</li>
              </ul>
            </div>

            <div className="legal-section">
              <p>
                Cependant, aucune transmission de données sur Internet n'est 100% sécurisée. 
                Nous ne pouvons garantir une sécurité absolue.
              </p>
            </div>
          </article>

          <article className="legal-article">
            <h2>7. Conservation des Données</h2>
            <div className="legal-section">
              <p>
                Nous conservons vos données personnelles aussi longtemps que nécessaire pour 
                fournir nos services, sauf si la loi exige une période plus longue.
              </p>
              <ul className="legal-list">
                <li><strong>Données de Compte:</strong> Tant que votre compte est actif</li>
                <li><strong>Données de Paiement:</strong> Durée légale (généralement 6 ans)</li>
                <li><strong>Cookies:</strong> Selon les paramètres du navigateur</li>
                <li><strong>Données Archivées:</strong> Jusqu'à 1 an après suppression</li>
              </ul>
            </div>
          </article>

          <article className="legal-article">
            <h2>8. Vos Droits</h2>
            <div className="legal-section">
              <p>
                Conformément au RGPD, vous disposez des droits suivants:
              </p>
              <ul className="legal-list">
                <li><strong>Droit d'Accès:</strong> Obtenir une copie de vos données</li>
                <li><strong>Droit de Rectification:</strong> Corriger vos données incorrectes</li>
                <li><strong>Droit à l'Oubli:</strong> Demander la suppression de vos données</li>
                <li><strong>Droit à la Limitation:</strong> Limiter le traitement</li>
                <li><strong>Droit à la Portabilité:</strong> Obtenir vos données dans un format courant</li>
                <li><strong>Droit d'Opposition:</strong> Vous opposer à certains traitements</li>
              </ul>
            </div>

            <div className="legal-section">
              <p>
                Pour exercer ces droits, contactez-nous à: <strong>privacy@agri-orbit.com</strong>
              </p>
            </div>
          </article>

          <article className="legal-article">
            <h2>9. Cookies et Tracking</h2>
            <div className="legal-section">
              <h3>Types de Cookies</h3>
              <ul className="legal-list">
                <li><strong>Essentiels:</strong> Authentification, sécurité</li>
                <li><strong>Fonctionnels:</strong> Préférences, langue, thème</li>
                <li><strong>Analytiques:</strong> Utilisation du service (Google Analytics)</li>
                <li><strong>Marketing:</strong> Publicités personnalisées (optionnel)</li>
              </ul>
            </div>

            <div className="legal-section">
              <p>
                Vous pouvez contrôler les cookies via les paramètres de votre navigateur. 
                Le refus de certains cookies peut affecter la fonctionnalité du site.
              </p>
            </div>
          </article>

          <article className="legal-article">
            <h2>10. Transferts Internationaux</h2>
            <div className="legal-section">
              <p>
                Certaines données peuvent être transférées en dehors de l'UE (notamment vers les États-Unis 
                pour l'hébergement). Ces transferts sont conformes au RGPD via des clauses contractuelles appropriées.
              </p>
            </div>
          </article>

          <article className="legal-article">
            <h2>11. Contact et Réclamations</h2>
            <div className="legal-section">
              <p>
                Pour toute question ou réclamation concernant la confidentialité:
              </p>
              <p>
                <strong>Email:</strong> privacy@agri-orbit.com<br />
                <strong>Adresse:</strong> [À compléter]<br />
                <strong>DPO:</strong> dpo@agri-orbit.com
              </p>
              <p>
                Vous avez également le droit de déposer une réclamation auprès de votre autorité 
                de protection des données locale.
              </p>
            </div>
          </article>

          <article className="legal-article">
            <h2>12. Modifications de Cette Politique</h2>
            <div className="legal-section">
              <p>
                Nous pouvons modifier cette politique à tout moment. Les modifications importantes 
                vous seront notifiées par email. Votre utilisation continue implique votre acceptation.
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
          <h2>Autres Informations Importantes</h2>
          <p>Consultez nos autres documents juridiques</p>
          <div className="cta-links">
            <a href="/mentions-legales" className="button button-secondary">Mentions Légales</a>
            <a href="/securite" className="button button-secondary">Politique de Sécurité</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PrivacyPolicy;
