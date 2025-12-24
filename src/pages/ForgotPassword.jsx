import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EnvelopeIcon, ArrowLeftIcon, ShieldCheckIcon, LockClosedIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import '../styles/auth.css';

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(5);
  const otpRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (step === 4 && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (step === 4 && countdown === 0) {
      navigate('/connexion');
    }
    return () => clearInterval(timer);
  }, [step, countdown, navigate]);

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1 && step < 4) setStep(step - 1);
  };

  const handleOtpChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const data = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(data)) return;

    const newOtp = [...otp];
    data.split('').forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);

    const lastIdx = Math.min(data.length, 5);
    if (otpRefs.current[lastIdx]) otpRefs.current[lastIdx].focus();
  };

  return (
    <div className="auth-page-clean auth-centered-wrapper">
      <div className="auth-centered-container">
        <div className="auth-card-clean">
          {step < 4 && (
            <>
              {step === 1 ? (
                <Link to="/connexion" className="back-link-clean">
                  <ArrowLeftIcon />
                  <span>Retour à la connexion</span>
                </Link>
              ) : (
                <button onClick={handleBack} className="back-link-clean btn-reset">
                  <ArrowLeftIcon />
                  <span>Étape précédente</span>
                </button>
              )}
            </>
          )}

          <div className="auth-header-minimal">
            <h1>
              {step === 1 && "Réinitialiser le mot de passe"}
              {step === 2 && "Vérifiez votre email"}
              {step === 3 && "Nouveau mot de passe"}
              {step === 4 && "Succès !"}
            </h1>
            <p>
              {step === 1 && "Entrez votre email pour recevoir un code"}
              {step === 2 && `Nous avons envoyé un code à ${email || 'votre@email.com'}`}
              {step === 3 && "Définissez votre nouveau mot de passe sécurisé"}
              {step === 4 && "Votre mot de passe a été réinitialisé avec succès."}
            </p>
          </div>

          {step < 4 && (
            <div className="stepper-clean">
              <div className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                {step > 1 ? <CheckCircleIcon className="icon-step" /> : '1'}
              </div>
              <div className={`step-line ${step > 1 ? 'active' : ''}`}></div>
              <div className={`step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                {step > 2 ? <CheckCircleIcon className="icon-step" /> : '2'}
              </div>
              <div className={`step-line ${step > 2 ? 'active' : ''}`}></div>
              <div className={`step ${step >= 3 ? 'active' : ''}`}>3</div>
            </div>
          )}

          {step === 4 ? (
            <div className="success-message">
              <div className="success-icon-wrapper">
                <CheckCircleIcon className="success-icon-large" />
              </div>
              <p className="redirection-text">
                Redirection vers la connexion dans <strong>{countdown}</strong> secondes...
              </p>
              <Link to="/connexion" className="button-clean-primary green-vibrant btn-full">
                Aller à la connexion
              </Link>
            </div>
          ) : (
            <form className="auth-form-clean" onSubmit={handleNext}>
              {step === 1 && (
                <div className="clean-input-group">
                  <label htmlFor="email">Adresse email</label>
                  <div className="input-wrapper">
                    <EnvelopeIcon className="input-icon left" />
                    <input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="clean-input-group">
                  <label>Code de vérification</label>
                  <div className="otp-container">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        className="otp-input"
                        maxLength={1}
                        value={digit}
                        ref={(el) => (otpRefs.current[index] = el)}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        onPaste={handleOtpPaste}
                        required
                      />
                    ))}
                  </div>
                  <p className="input-help">Vous n'avez pas reçu le code ? <span className="resend">Renvoyer</span></p>
                </div>
              )}

              {step === 3 && (
                <div className="step-3-group">
                  <div className="clean-input-group">
                    <label htmlFor="password">Nouveau mot de passe</label>
                    <div className="input-wrapper">
                      <LockClosedIcon className="input-icon left" />
                      <input id="password" type="password" placeholder="••••••••" required />
                    </div>
                  </div>
                  <div className="clean-input-group">
                    <label htmlFor="confirm-password">Confirmer le mot de passe</label>
                    <div className="input-wrapper">
                      <LockClosedIcon className="input-icon left" />
                      <input id="confirm-password" type="password" placeholder="••••••••" required />
                    </div>
                  </div>
                </div>
              )}

              <button type="submit" className="button-clean-primary green-vibrant">
                {step === 1 && "Envoyer le code"}
                {step === 2 && "Vérifier le code"}
                {step === 3 && "Réinitialiser"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
