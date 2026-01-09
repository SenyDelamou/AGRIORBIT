import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import '../styles/legal.css';

function LegalNotice() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page">
      <section className="legal-hero">
        <div className="container">
          <h1 className="animate-fade-in-down">Mentions Légales</h1>
          <p className="legal-intro animate-fade-in-up">
            Informations légales et propriété intellectuelle
          </p>
        </div>
      </section>

      <section className="legal-content">
        <div className="container">
          <article className="legal-article">
            <h2>1. Identité et Responsabilité</h2>
            <div className="legal-section">
              <h3>Éditeur du Site</h3>
              <p>
                <strong>Agri Orbit Analytics</strong><br />
                Adresse: [À compléter]<br />
                Email: contact@agri-orbit.com<br />
                Téléphone: [À compléter]<br />
                SIRET: [À compléter]<br />
                Numéro TVA: [À compléter]
              </p>
            </div>

            <div className="legal-section">
              <h3>Directeur de la Publication</h3>
              <p>
                Le responsable de la publication est [Nom du Responsable]
              </p>
            </div>

            <div className="legal-section">
              <h3>Hébergement</h3>
              <p>
                Ce site est hébergé chez :<br />
                <strong>Vercel Inc.</strong><br />
                Website: https://vercel.com<br />
                Les données sont stockées sur des serveurs basés aux États-Unis et respectent les standards de sécurité internationaux.
              </p>
            </div>
          </article>

          <article className="legal-article">
            <h2>2. Propriété Intellectuelle</h2>
            <div className="legal-section">
              <h3>Droits d'Auteur</h3>
              <p>
                Tous les contenus présents sur ce site (textes, images, vidéos, logos, graphiques, 
                etc.) sont la propriété exclusive d'Agri Orbit Analytics ou de ses partenaires. 
                Toute reproduction, représentation, modification ou adaptation sans autorisation 
                préalable est strictement interdite.
              </p>
            </div>

            <div className="legal-section">
              <h3>Marques Déposées</h3>
              <p>
                "Agri Orbit", le logo Agri Orbit et tous les noms de produits associés sont des 
                marques déposées d'Agri Orbit Analytics. Toute utilisation non autorisée est interdite.
              </p>
            </div>

            <div className="legal-section">
              <h3>Licence d'Utilisation</h3>
              <p>
                L'accès au site vous confère une licence limitée, non exclusive et révocable pour 
                utiliser le contenu à des fins personnelles et non commerciales.
              </p>
            </div>
          </article>

          <article className="legal-article">
            <h2>3. Conditions d'Utilisation</h2>
            <div className="legal-section">
              <h3>Acceptation des Conditions</h3>
              <p>
                L'accès et l'utilisation de ce site impliquent votre acceptation de toutes les 
                conditions énoncées dans ces mentions légales. Si vous n'acceptez pas ces conditions, 
                veuillez ne pas utiliser ce site.
              </p>
            </div>

            <div className="legal-section">
              <h3>Restrictions d'Utilisation</h3>
              <p>
                Vous vous engagez à ne pas :
              </p>
              <ul className="legal-list">
                <li>Reproduire, modifier ou adapter le contenu sans autorisation</li>
                <li>Utiliser le site à des fins commerciales ou publicitaires</li>
                <li>Accéder ou utiliser le site de manière qui pourrait l'endommager ou l'affecter</li>
                <li>Utiliser des robots, scrapers ou outils de scraping automatisés</li>
                <li>Transmettre des virus, malwares ou tout code nuisible</li>
                <li>Violer les droits d'auteur ou les droits de propriété intellectuelle</li>
              </ul>
            </div>

            <div className="legal-section">
              <h3>Comptes Utilisateur</h3>
              <p>
                Les utilisateurs sont responsables de la confidentialité de leurs identifiants de 
                connexion. Agri Orbit ne peut être tenue responsable de l'utilisation non autorisée 
                de votre compte.
              </p>
            </div>
          </article>

          <article className="legal-article">
            <h2>4. Contenu Utilisateur</h2>
            <div className="legal-section">
              <h3>Responsabilité</h3>
              <p>
                Vous êtes seul responsable de tout contenu que vous soumettez, téléchargez ou 
                publiez sur le site. Agri Orbit ne contrôle pas le contenu utilisateur et ne peut 
                être tenue responsable de son exactitude ou de sa légalité.
              </p>
            </div>

            <div className="legal-section">
              <h3>Licences de Contenu</h3>
              <p>
                En soumettant du contenu sur le site, vous accordez à Agri Orbit une licence mondiale, 
                non exclusive, perpétuelle et irrévocable pour utiliser, reproduire et distribuer ce contenu.
              </p>
            </div>
          </article>

          <article className="legal-article">
            <h2>5. Limitation de Responsabilité</h2>
            <div className="legal-section">
              <h3>Disclaimer</h3>
              <p>
                Le site est fourni "tel quel" sans garantie d'aucune sorte. Agri Orbit rejette toute 
                responsabilité concernant :
              </p>
              <ul className="legal-list">
                <li>L'exactitude ou la complétude du contenu</li>
                <li>Les dommages directs ou indirects résultant de l'accès au site</li>
                <li>Les pertes de profits ou de revenus</li>
                <li>Les interruptions de service</li>
                <li>Les erreurs ou omissions du site</li>
              </ul>
            </div>

            <div className="legal-section">
              <h3>Limitation de Dégâts</h3>
              <p>
                En aucun cas Agri Orbit ne sera responsable des dommages excédant les frais payés 
                par l'utilisateur au cours de la dernière année.
              </p>
            </div>
          </article>

          <article className="legal-article">
            <h2>6. Liens Externes</h2>
            <div className="legal-section">
              <p>
                Ce site peut contenir des liens vers des sites externes. Agri Orbit n'est pas responsable 
                du contenu, de la précision ou des pratiques de confidentialité de ces sites externes. 
                Les liens sont fournis à titre informatif uniquement.
              </p>
            </div>
          </article>

          <article className="legal-article">
            <h2>7. Cookies et Tracking</h2>
            <div className="legal-section">
              <p>
                Ce site utilise des cookies pour améliorer votre expérience utilisateur. Vous pouvez 
                contrôler l'utilisation des cookies via les paramètres de votre navigateur. Pour plus 
                d'informations, consultez notre Politique de Confidentialité.
              </p>
            </div>
          </article>

          <article className="legal-article">
            <h2>8. Modification des Conditions</h2>
            <div className="legal-section">
              <p>
                Agri Orbit se réserve le droit de modifier ces mentions légales à tout moment sans 
                préavis. Les modifications sont effectives dès leur publication. Votre utilisation continue 
                du site implique votre acceptation des modifications.
              </p>
            </div>
          </article>

          <article className="legal-article">
            <h2>9. Loi Applicable et Juridiction</h2>
            <div className="legal-section">
              <p>
                Ces mentions légales sont régies par la loi française. Tout litige découlant de 
                l'utilisation de ce site sera soumis aux juridictions compétentes de la République 
                Française.
              </p>
            </div>
          </article>

          <article className="legal-article">
            <h2>10. Contact</h2>
            <div className="legal-section">
              <p>
                Pour toute question concernant ces mentions légales, veuillez nous contacter à :<br />
                <strong>Email:</strong> legal@agri-orbit.com<br />
                <strong>Adresse:</strong> [À compléter]
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="legal-footer-cta">
        <div className="container">
          <h2>Besoin d'aide?</h2>
          <p>Consultez nos autres documents juridiques</p>
          <div className="cta-links">
            <a href="/confidentialite" className="button button-secondary">Politique de Confidentialité</a>
            <a href="/securite" className="button button-secondary">Politique de Sécurité</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LegalNotice;
