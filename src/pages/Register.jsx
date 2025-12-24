import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  BuildingOfficeIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import loginSatellite from '../assets/login_satellite.png';
import '../styles/auth.css';

function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.info('Tentative d’inscription...');
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
          <div className="auth-form-wrapper registration-wrapper">
            <div className="auth-header-clean">
              <h1>Inscription</h1>
              <p>Rejoignez l'observatoire AgriOrbit</p>
            </div>

            <form className="auth-form-clean" onSubmit={handleSubmit}>
              <div className="form-row-clean">
                <div className="clean-input-group">
                  <label htmlFor="firstname">Prénom</label>
                  <div className="input-wrapper">
                    <UserIcon className="input-icon left" />
                    <input id="firstname" type="text" placeholder="Awa" required />
                  </div>
                </div>
                <div className="clean-input-group">
                  <label htmlFor="lastname">Nom</label>
                  <div className="input-wrapper">
                    <UserIcon className="input-icon left" />
                    <input id="lastname" type="text" placeholder="Diallo" required />
                  </div>
                </div>
              </div>

              <div className="clean-input-group">
                <label htmlFor="organisation">Organisation</label>
                <div className="input-wrapper">
                  <BuildingOfficeIcon className="input-icon left" />
                  <input id="organisation" type="text" placeholder="Coopérative AgriSun" />
                </div>
              </div>

              <div className="clean-input-group">
                <label htmlFor="email">Email professionnel</label>
                <div className="input-wrapper">
                  <EnvelopeIcon className="input-icon left" />
                  <input id="email" type="email" placeholder="awa.diallo@agrisun.africa" required />
                </div>
              </div>

              <div className="form-row-clean">
                <div className="clean-input-group">
                  <label htmlFor="password">Mot de passe</label>
                  <div className="input-wrapper">
                    <LockClosedIcon className="input-icon left" />
                    <input id="password" type="password" placeholder="••••••••" required />
                  </div>
                </div>
                <div className="clean-input-group">
                  <label htmlFor="confirm-password">Confirmer</label>
                  <div className="input-wrapper">
                    <LockClosedIcon className="input-icon left" />
                    <input id="confirm-password" type="password" placeholder="••••••••" required />
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
                Créer mon compte
                <ArrowRightIcon className="icon-arrow" />
              </button>
            </form>

            <div className="register-redirect">
              Déjà membre ? <Link to="/connexion">Se connecter</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
