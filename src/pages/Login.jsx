import { useAuth } from '../context/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import loginSatellite from '../assets/login_satellite.png';
import '../styles/auth.css';

function Login() {
  const googleButtonRef = useRef(null);
  const [googleReady, setGoogleReady] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!googleClientId || !googleButtonRef.current) return;

    const handleCredentialResponse = (response) => {
      // Décoder le token Google
      const payload = JSON.parse(atob(response.credential.split('.')[1]));

      const user = {
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        id: payload.sub,
        provider: 'google'
      };

      // Optionnel : afficher les infos sur la page (exemple)
      console.log("Utilisateur connecté :", user);

      // Connecter l'utilisateur dans l'application
      login(user);

      // Envoyer l'email de bienvenue via votre backend sécurisé
      fetch('/api/send-welcome-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          name: user.name
        }),
      })
        .then(res => res.json())
        .then(data => {
          console.log('Réponse backend :', data);
          if (data.success) {
            console.log("Email de bienvenue envoyé !");
          }
        })
        .catch(err => {
          console.error('Erreur envoi email :', err);
        });

      const origin = location.state?.from?.pathname || '/plateforme';
      navigate(origin);
    };

    const renderGoogleButton = () => {
      if (!window.google?.accounts?.id) {
        // Retry if script not yet fully loaded
        setTimeout(renderGoogleButton, 100);
        return;
      }
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleCredentialResponse
      });
      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: 'filled_black', size: 'large', width: '400', shape: 'pill', text: 'continue_with'
      });
      setGoogleReady(true);
    };

    renderGoogleButton();
  }, [googleClientId, login, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.info('Tentative de connexion...');
  };

  return (
    <div className="auth-page-clean">
      <div className="auth-split-clean">

        {/* Left Side: Professional Visual */}
        <div className="auth-visual-clean" style={{ backgroundImage: `url(${loginSatellite})` }}>
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
              <div className="divider-text">ou continuer avec</div>
              {googleClientId ? (
                <div ref={googleButtonRef} className="google-btn-wrapper" />
              ) : (
                // Fallback visual for demo if no ID provided
                <button type="button" className="google-fallback-btn">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <span>Google</span>
                </button>
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
