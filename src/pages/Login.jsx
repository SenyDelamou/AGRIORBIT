import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import castro from '../assets/castro.png';
import '../styles/auth.css';

function Login() {
  const googleButtonRef = useRef(null);
  const [googleReady, setGoogleReady] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    /* Google Auth Logic kept intact */
    if (!googleClientId || !googleButtonRef.current) return;
    const scriptId = 'google-identity-services';
    const handleCredentialResponse = (response) => {
      console.info('Google credential reçu', response.credential);
    };
    const renderGoogleButton = () => {
      if (!window.google?.accounts?.id) return;
      window.google.accounts.id.initialize({
        client_id: googleClientId, callback: handleCredentialResponse
      });
      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: 'outline', size: 'large', width: '100%', shape: 'pill', text: 'continue_with'
      });
      setGoogleReady(true);
    };
    const existingScript = document.getElementById(scriptId);
    if (existingScript) { renderGoogleButton(); } else {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true; script.defer = true; script.id = scriptId;
      script.onload = renderGoogleButton; document.head.appendChild(script);
    }
  }, [googleClientId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.info('Tentative de connexion...');
  };

  return (
    <div className="auth-page-clean">
      <div className="auth-split-clean">

        {/* Left Side: Professional Visual */}
        <div className="auth-visual-clean" style={{ backgroundImage: `url(${castro})` }}>
          {/* Overlay handled in CSS */}
        </div>

        {/* Right Side: Clean Form */}
        <div className="auth-form-clean-container">
          <div className="auth-form-wrapper">
            <div className="auth-header-clean">
              <h1>Connexion</h1>
              <p>Authentification sécurisée</p>
            </div>

            <form className="auth-form-clean" onSubmit={handleSubmit}>
              <div className="clean-input-group">
                <label htmlFor="email">Email</label>
                <div className="input-wrapper">
                  <EnvelopeIcon className="input-icon left" />
                  <input id="email" type="email" placeholder="votre@email.com" required />
                </div>
              </div>

              <div className="clean-input-group">
                <label htmlFor="password">Mot de passe</label>
                <div className="input-wrapper">
                  <LockClosedIcon className="input-icon left" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className="input-icon-btn right"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeSlashIcon className="icon-sm" /> : <EyeIcon className="icon-sm" />}
                  </button>
                </div>
              </div>

              <div className="form-options-clean">
                <label className="checkbox-clean">
                  <input type="checkbox" />
                  <span>Se souvenir de moi</span>
                </label>
                <Link to="/mot-de-passe-oublie" className="forgot-link">Mot de passe oublié ?</Link>
              </div>

              <button type="submit" className="button-clean-primary">
                Se connecter
                <ArrowRightIcon className="icon-arrow" />
              </button>
            </form>

            <div className="social-clean">
              {googleClientId && (
                <>
                  <div className="divider-text">ou</div>
                  <div ref={googleButtonRef} />
                </>
              )}
            </div>

            <div className="register-redirect">
              Pas encore de compte ? <Link to="/inscription">Créer un compte</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
