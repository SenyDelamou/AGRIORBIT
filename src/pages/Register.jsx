import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  BuildingOfficeIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import registerVisual from '../assets/register_visual.png';
import '../styles/auth.css';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

function Register() {
  const { t, setLang, lang } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    organisation: '',
    email: '',
    password: '',
    confirmPassword: '',
    language: lang
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    // Simuler la création de compte
    const user = {
      name: `${formData.firstname} ${formData.lastname}`,
      email: formData.email,
      organisation: formData.organisation,
      picture: `https://ui-avatars.com/api/?name=${formData.firstname}+${formData.lastname}&background=random`,
      id: Date.now().toString(),
      provider: 'local',
      preferredLanguage: formData.language
    };

    setLang(formData.language);
    login(user);
    navigate('/plateforme');
  };

  return (
    <div className="auth-page-clean">
      <div className="auth-split-clean">

        {/* Left Side: Professional Visual */}
        <div className="auth-visual-clean" style={{ backgroundImage: `url(${registerVisual})` }}>
          {/* Overlay handled in CSS */}
        </div>

        {/* Right Side: Clean Form */}
        <div className="auth-form-clean-container">
          <div className="auth-form-wrapper registration-wrapper">
            <div className="auth-header-clean">
              <h1>{t('nav_login').replace('Connexion', 'Inscription').replace('Login', 'Register').replace('Ubbital', 'Suɓagol')}</h1>
              <p>{t('hero_subtitle')}</p>
            </div>

            <form className="auth-form-clean" onSubmit={handleSubmit}>
              <div className="form-row-clean">
                <div className="clean-input-group">
                  <label htmlFor="firstname">{t('profile')}</label>
                  <div className="input-wrapper">
                    <UserIcon className="input-icon left" />
                    <input
                      id="firstname"
                      type="text"
                      placeholder="Awa"
                      required
                      value={formData.firstname}
                      onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                    />
                  </div>
                </div>
                <div className="clean-input-group">
                  <label htmlFor="lastname">{t('profile')}</label>
                  <div className="input-wrapper">
                    <UserIcon className="input-icon left" />
                    <input
                      id="lastname"
                      type="text"
                      placeholder="Diallo"
                      required
                      value={formData.lastname}
                      onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="clean-input-group">
                <label htmlFor="organisation">{t('footer_company')}</label>
                <div className="input-wrapper">
                  <BuildingOfficeIcon className="input-icon left" />
                  <input
                    id="organisation"
                    type="text"
                    placeholder="Coopérative AgriSun"
                    value={formData.organisation}
                    onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                  />
                </div>
              </div>

              <div className="clean-input-group">
                <label htmlFor="language">{t('language')}</label>
                <div className="input-wrapper">
                  <GlobeAltIcon className="input-icon left" />
                  <select
                    id="language"
                    className="select-lang-ui"
                    value={formData.language}
                    style={{ paddingLeft: '2.5rem' }}
                    onChange={(e) => {
                      const newLang = e.target.value;
                      setFormData({ ...formData, language: newLang });
                      setLang(newLang); // Update UI language immediately
                    }}
                  >
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                    <option value="pulaar">Pulaar</option>
                  </select>
                </div>
              </div>

              <div className="clean-input-group">
                <label htmlFor="email">Email</label>
                <div className="input-wrapper">
                  <EnvelopeIcon className="input-icon left" />
                  <input
                    id="email"
                    type="email"
                    placeholder="awa.diallo@agrisun.africa"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row-clean">
                <div className="clean-input-group">
                  <label htmlFor="password">{t('logout').replace('Déconnexion', 'Mot de passe').replace('Logout', 'Password').replace('Uddugol', 'Sariya')}</label>
                  <div className="input-wrapper">
                    <LockClosedIcon className="input-icon left" />
                    <input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                </div>
                <div className="clean-input-group">
                  <label htmlFor="confirm-password">{t('change')}</label>
                  <div className="input-wrapper">
                    <LockClosedIcon className="input-icon left" />
                    <input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="form-options-clean">
                <label className="checkbox-clean">
                  <input type="checkbox" required />
                  <span className="text-xs">J'accepte les conditions générales</span>
                </label>
              </div>

              <button type="submit" className="button-clean-primary">
                {t('testi_form_cta').replace('Rédiger un témoignage', 'Créer mon compte').replace('Write a Testimonial', 'Create Account').replace('Winndu miylo maa', 'Fuɗɗu kont')}
                <ArrowRightIcon className="icon-arrow" />
              </button>
            </form>

            <div className="register-redirect">
              {t('nav_login').replace('Connexion', 'Déjà membre ?').replace('Login', 'Already a member?').replace('Ubbital', 'Mbe on njogi kont ?')} <Link to="/connexion">{t('nav_login')}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

