import { Link } from 'react-router-dom';
import '../styles/auth.css';

function ForgotPassword() {
  return (
    <div className="auth-page">
      <div className="container auth-shell glass-panel">
        <div className="auth-header">
          <span className="badge">Réinitialisation</span>
          <h1>Récupérez l’accès à votre cockpit.</h1>
          <p>Entrez l’adresse e-mail associée à votre compte pour recevoir un lien de réinitialisation sécurisé.</p>
        </div>

        <form className="auth-form" aria-label="Mot de passe oublié">
          <div className="form-group">
            <label htmlFor="reset-email">Adresse e-mail</label>
            <input id="reset-email" name="email" type="email" placeholder="nom@exploitation.com" required />
          </div>
          <button type="submit" className="button">Envoyer le lien de réinitialisation</button>
        </form>

        <div className="auth-footer">
          <Link to="/connexion">Retour à la connexion</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
