import { Link } from 'react-router-dom';
import '../styles/auth.css';

function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.info('Tentative d’inscription...');
    // Logique de redirection ou feedback utilisateur ici
  };

  return (
    <div className="auth-page">
      <div className="container auth-shell glass-panel">
        <div className="auth-header">
          <span className="badge">Inscription</span>
          <h1>Bâtissez votre observatoire agronomique.</h1>
          <p>Créez votre compte pour connecter vos parcelles, accéder aux analyses satellites et collaborer avec votre équipe.</p>
        </div>

        <form className="auth-form" aria-label="Création de compte" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="register-firstname">Prénom</label>
              <input id="register-firstname" name="firstname" type="text" placeholder="Awa" required />
            </div>
            <div className="form-group">
              <label htmlFor="register-lastname">Nom</label>
              <input id="register-lastname" name="lastname" type="text" placeholder="Diallo" required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="register-organisation">Organisation</label>
            <input id="register-organisation" name="organisation" type="text" placeholder="Coopérative AgriSun" />
          </div>
          <div className="form-group">
            <label htmlFor="register-email">Adresse e-mail professionnelle</label>
            <input id="register-email" name="email" type="email" placeholder="awa.diallo@agrisun.africa" required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="register-password">Mot de passe</label>
              <input id="register-password" name="password" type="password" placeholder="••••••••" required />
            </div>
            <div className="form-group">
              <label htmlFor="register-password-confirm">Confirmer</label>
              <input id="register-password-confirm" name="password-confirm" type="password" placeholder="••••••••" required />
            </div>
          </div>
          <div className="form-group checkbox">
            <input id="terms" name="terms" type="checkbox" required />
            <label htmlFor="terms">J’accepte les conditions générales et la politique de confidentialité.</label>
          </div>
          <button type="submit" className="button">Créer mon compte</button>
        </form>

        <div className="auth-footer">
          <span className="tag">Déjà membre ?</span>
          <Link to="/connexion">Se connecter</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
