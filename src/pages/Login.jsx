import { useAuth } from '../context/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import loginSatellite from '../assets/login_satellite.png';
import '../styles/auth.css';
import { useLanguage } from '../context/LanguageContext.jsx';

function Login() {
  const { t } = useLanguage();
  const googleButtonRef = useRef(null);
  const [googleReady, setGoogleReady] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!googleClientId || !googleButtonRef.current) return;

    const handleCredentialResponse = (response) => {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

      // Appeler le backend pour valider le token Google
      fetch(`${apiUrl}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential }),
      })
        .then(res => {
          if (!res.ok) throw new Error('Erreur d\'authentification Google');
          return res.json();
        })
        .then(data => {
          console.log('Connexion réussie :', data);

          // Connecter l'utilisateur avec les données renvoyées par le backend
          login(data.user);

          // Stocker les tokens (si vous voulez les utiliser plus tard)
          if (data.accessToken) {
            localStorage.setItem('agri_orbit_token', data.accessToken);
          }

          const origin = location.state?.from?.pathname || '/plateforme';
          navigate(origin);
        })
        .catch(err => {
          console.error('Erreur Google Auth :', err);
          alert("Erreur lors de la connexion avec Google. Veuillez réessayer.");
        });
    };


    const renderGoogleButton = () => {
      if (!window.google?.accounts?.id) {
        setTimeout(renderGoogleButton, 100);
        return;
      }
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleCredentialResponse
      });
      setGoogleReady(true);
    };

    renderGoogleButton();
  }, [googleClientId, login, navigate]);

  const handleGoogleClick = () => {
    if (!googleReady) return;
    // Trigger the Google Select account prompt
    window.google.accounts.id.prompt();
  };

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
              <h1>{t('login_title')}</h1>
              <p>{t('login_subtitle')}</p>
            </div>

            <form className="auth-form-clean" onSubmit={handleSubmit}>
              <div className="clean-input-group">
                <label htmlFor="email">{t('email_label')}</label>
                <div className="input-wrapper">
                  <EnvelopeIcon className="input-icon left" />
                  <input id="email" type="email" placeholder={t('email_placeholder')} required />
                </div>
              </div>

              <div className="clean-input-group">
                <label htmlFor="password">{t('password_label')}</label>
                <div className="input-wrapper">
                  <LockClosedIcon className="input-icon left" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t('password_placeholder')}
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
                  <span>{t('remember_me')}</span>
                </label>
                <Link to="/mot-de-passe-oublie" className="forgot-link">{t('forgot_password')}</Link>
              </div>

              <button type="submit" className="button-clean-primary">
                {t('login_submit')}
                <ArrowRightIcon className="icon-arrow" />
              </button>
            </form>

            <div className="social-clean">
              <div className="divider-text">{t('or_continue_with')}</div>
              <button
                type="button"
                className="google-custom-btn"
                onClick={handleGoogleClick}
                disabled={!googleReady}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="google-icon-wrapper">
                  <svg className="google-icon-svg" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </div>
                <span>Google</span>
              </button>
            </div>

            <div className="register-redirect">
              {t('no_account')} <Link to="/inscription">{t('create_account_link')}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
