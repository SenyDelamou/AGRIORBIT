import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import '../styles/auth.css';

function Login() {
  const googleButtonRef = useRef(null);
  const [googleReady, setGoogleReady] = useState(false);
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!googleClientId || !googleButtonRef.current) {
      return;
    }

    const scriptId = 'google-identity-services';

    const handleCredentialResponse = (response) => {
      // TODO: envoyer response.credential à votre backend pour vérification côté serveur
      console.info('Google credential reçu', response.credential);
    };

    const renderGoogleButton = () => {
      if (!window.google?.accounts?.id) {
        return;
      }
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleCredentialResponse
      });
      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: 'outline',
        size: 'large',
        width: '100%',
        shape: 'pill',
        text: 'continue_with'
      });
      setGoogleReady(true);
    };

    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      renderGoogleButton();
    } else {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.id = scriptId;
      script.onload = renderGoogleButton;
      document.head.appendChild(script);
    }

    return () => {
      window.google?.accounts.id.cancel();
    };
  }, [googleClientId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.info('Tentative de connexion...');
    // Logique de redirection ou feedback utilisateur ici
  };

  return (
    <div className="auth-page">
      <div className="container auth-shell glass-panel">
        <div className="auth-header">
          <span className="badge">Connexion sécurisée</span>
          <h1>Accédez à votre tour de contrôle agritech.</h1>
          <p>Connectez-vous pour suivre vos parcelles, gérer vos analyses et collaborer avec vos équipes.</p>
        </div>

        <form className="auth-form" aria-label="Connexion" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login-email">Adresse e-mail</label>
            <input id="login-email" type="email" name="email" placeholder="nom@exploitation.com" required />
          </div>
          <div className="form-group">
            <div className="label-row">
              <label htmlFor="login-password">Mot de passe</label>
              <Link to="/mot-de-passe-oublie">Mot de passe oublié ?</Link>
            </div>
            <input id="login-password" type="password" name="password" placeholder="••••••••" required />
          </div>
          <div className="form-group checkbox">
            <input id="remember" type="checkbox" name="remember" />
            <label htmlFor="remember">Se souvenir de moi sur cet appareil</label>
          </div>
          <button type="submit" className="button">Se connecter</button>
        </form>

        <div className="divider">
          <span>ou</span>
        </div>

        <div className="social-login">
          {googleClientId ? (
            <div ref={googleButtonRef} aria-label="Connexion Google" />
          ) : (
            <p className="social-hint">Ajoutez <code>VITE_GOOGLE_CLIENT_ID</code> pour activer la connexion Google.</p>
          )}
          {!googleReady && googleClientId && <span className="tag">Chargement de Google…</span>}
        </div>

        <div className="auth-footer">
          <span className="tag">Nouveau sur Agri Orbit ?</span>
          <Link to="/inscription">Créer un compte</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
