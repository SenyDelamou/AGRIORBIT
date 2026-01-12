import { useAuth } from '../context/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import loginSatellite from '../assets/login_satellite.png';
import GoogleLogin from '../components/GoogleLogin.jsx';
import '../styles/auth.css';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

function Login() {
  const { t } = useLanguage();
  useScrollReveal();
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

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
