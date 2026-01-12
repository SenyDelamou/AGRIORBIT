import { useAuth } from '../context/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import loginSatellite from '../assets/login_satellite.png';
import GoogleLogin from '../components/GoogleLogin.jsx';
import '../styles/auth.css';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import { useToast } from '../context/ToastContext.jsx';

function Login() {
  const { t } = useLanguage();
  useScrollReveal();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!email || !password) {
      showToast('Veuillez remplir tous les champs', 'error');
      return;
    }

    if (!email.includes('@')) {
      showToast('Veuillez entrer une adresse email valide', 'error');
      return;
    }

    if (password.length < 6) {
      showToast('Le mot de passe doit contenir au moins 6 caractères', 'error');
      return;
    }

    setIsLoading(true);

    try {
      // Simulation d'une API call (2 secondes de délai)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Créer un utilisateur mock pour la démo (en prod, ce serait une vraie réponse API)
      const mockUser = {
        id: `user_${Date.now()}`,
        email,
        name: email.split('@')[0],
        picture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        phone: '+229 XX XX XX XX',
        location: 'Afrique de l\'Ouest',
        company: 'Mon Entreprise',
        bio: 'Utilisateur de la plateforme Agri Orbit',
        bannerImage: 'https://images.unsplash.com/photo-1500595046891-cb5ece8f4b63?w=1200&h=300&fit=crop',
        subscription: 'premium',
        fields: 5,
        analyses: 42,
        alerts: 3,
        daysActive: 30
      };

      // Login
      login(mockUser, {
        accessToken: `token_${Date.now()}`,
        refreshToken: `refresh_${Date.now()}`,
        expiresIn: 3600
      });

      showToast(`Bienvenue ${mockUser.name}! 🎉`, 'success');

      // Réinitialiser le loading et rediriger
      setIsLoading(false);
      setTimeout(() => {
        navigate('/plateforme');
      }, 300);

    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      showToast('Erreur lors de la connexion. Veuillez réessayer.', 'error');
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page-clean">
      <div className="auth-split-clean">

        {/* Left Side: Professional Visual */}
        <div className="auth-visual-clean" style={{ backgroundImage: `url(${loginSatellite})` }}>
          {/* Overlay handled in CSS */}
        </div>

        {/* Right Side: Clean Form */}
        <div className="auth-form-clean-container reveal-on-scroll">
          <div className="auth-form-wrapper hover-lift">
            <div className="auth-header-clean">
              <h1>{t('login_title')}</h1>
              <p>{t('login_subtitle')}</p>
            </div>

            <form className="auth-form-clean" onSubmit={handleSubmit}>
              <div className="clean-input-group">
                <label htmlFor="email">{t('email_label')}</label>
                <div className="input-wrapper">
                  <EnvelopeIcon className="input-icon left" />
                  <input 
                    id="email" 
                    type="email" 
                    placeholder={t('email_placeholder')} 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required 
                  />
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    className="input-icon-btn right"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeSlashIcon className="icon-sm" /> : <EyeIcon className="icon-sm" />}
                  </button>
                </div>
              </div>

              <div className="form-options-clean">
                <label className="checkbox-clean">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={isLoading}
                  />
                  <span>{t('remember_me')}</span>
                </label>
                <Link to="/mot-de-passe-oublie" className="forgot-link">{t('forgot_password')}</Link>
              </div>

              <button type="submit" className="button-clean-primary" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="spinner-inline"></span>
                    Connexion...
                  </>
                ) : (
                  <>
                    {t('login_submit')}
                    <ArrowRightIcon className="icon-arrow" />
                  </>
                )}
              </button>
            </form>

            <div className="social-clean">
              <div className="divider-text">{t('or_continue_with')}</div>
              <GoogleLogin className="auth-google-btn" text="Google" />
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
