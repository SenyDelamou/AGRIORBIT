import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import '../styles/auth.css';
import { useToast } from '../context/ToastContext.jsx';
import { request } from '../api/client.js';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

const RESEND_COOLDOWN = 45; // seconds

function VerifyEmail() {
  useScrollReveal();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN);
  const [resendJustEnabled, setResendJustEnabled] = useState(false);
  const prevCooldownRef = useRef(RESEND_COOLDOWN);
  const otpRefs = useRef([]);

  const targetEmail = location.state?.email ?? null;
  const displayEmail = targetEmail ?? 'votre@email.com';

  useEffect(() => {
    if (otpRefs.current[0]) {
      otpRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    if (!targetEmail) return;

    request('/auth/verify-email/request', {
      method: 'POST',
      auth: false,
      body: { email: targetEmail }
    }).catch((err) => {
      console.error('Erreur verify-email/request:', err);
    });
  }, [targetEmail]);

  useEffect(() => {
    if (cooldown <= 0) {
      return undefined;
    }
    const timer = window.setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [cooldown]);

  useEffect(() => {
    const prev = prevCooldownRef.current;
    if (prev > 0 && cooldown === 0) {
      setResendJustEnabled(true);
      const t = window.setTimeout(() => setResendJustEnabled(false), 2200);
      return () => window.clearTimeout(t);
    }
    prevCooldownRef.current = cooldown;
    return undefined;
  }, [cooldown]);

  const handleOtpChange = (value, index) => {
    if (isNaN(value)) return;

    const next = [...otp];
    next[index] = value.substring(value.length - 1);
    setOtp(next);

    if (value && index < otp.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (event, index) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (event) => {
    event.preventDefault();
    const data = event.clipboardData.getData('text').slice(0, otp.length);
    if (!/^\d+$/.test(data)) return;

    const next = [...otp];
    data.split('').forEach((char, idx) => {
      next[idx] = char;
    });
    setOtp(next);

    const lastIdx = Math.min(data.length - 1, otp.length - 1);
    otpRefs.current[lastIdx]?.focus();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const code = otp.join('');
    if (code.length !== otp.length) {
      setError('Veuillez saisir les six chiffres du code.');
      return;
    }

    if (!targetEmail) {
      setError('Email manquant. Veuillez recommencer le processus.');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      await request('/auth/verify-email/confirm', {
        method: 'POST',
        auth: false,
        body: { email: targetEmail, code }
      });

      addToast({
        title: 'Code validé',
        message: 'Votre adresse email est désormais vérifiée.',
        type: 'success'
      });
      navigate('/connexion');
    } catch (err) {
      console.error('Erreur verify-email/confirm:', err);
      setError(err?.message || 'Erreur inattendue');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || !targetEmail) return;
    try {
      await request('/auth/verify-email/request', {
        method: 'POST',
        auth: false,
        body: { email: targetEmail }
      });
      addToast({
        title: 'Nouveau code envoyé',
        message: `Un nouveau code de vérification a été envoyé à ${targetEmail}.`,
        type: 'info'
      });
      setCooldown(RESEND_COOLDOWN);
    } catch (err) {
      console.error('Erreur resend verify-email:', err);
      addToast({
        title: 'Erreur',
        message: err?.message || 'Erreur inattendue',
        type: 'error'
      });
    }
  };

  return (
    <div className="auth-page-clean auth-centered-wrapper">
      <div className="auth-centered-container reveal-on-scroll">
        <div className="auth-card-clean hover-lift">
          <button type="button" onClick={() => navigate(-1)} className="back-link-clean btn-reset">
            <ArrowLeftIcon />
            <span>Étape précédente</span>
          </button>

          <div className="auth-header-minimal">
            <h1>Vérifiez votre email</h1>
            <p>Nous avons envoyé un code à {displayEmail}</p>
          </div>

          <div className="stepper-clean">
            <div className="step completed">
              <CheckCircleIcon className="icon-step" />
            </div>
            <div className="step-line active" />
            <div className="step active">2</div>
            <div className="step-line" />
            <div className="step">3</div>
          </div>

          <form className="auth-form-clean" onSubmit={handleSubmit}>
            <div className="clean-input-group">
              <label>Code de vérification</label>
              <div className="otp-container">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    className="otp-input"
                    maxLength={1}
                    value={digit}
                    ref={(el) => {
                      otpRefs.current[index] = el;
                    }}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    onPaste={handleOtpPaste}
                    required
                  />
                ))}
              </div>
              {error && <p className="input-help" style={{ color: '#ef4444' }}>{error}</p>}
              <p className="input-help">
                Vous n'avez pas reçu le code ?{' '}
                <button
                  type="button"
                  className={`btn-reset resend ${cooldown > 0 ? 'is-disabled' : 'is-ready'} ${resendJustEnabled ? 'is-activating' : ''}`}
                  onClick={handleResend}
                  disabled={cooldown > 0}
                >
                  {cooldown > 0 ? `Renvoyer (${cooldown}s)` : 'Renvoyer'}
                </button>
              </p>
            </div>

            <button
              type="submit"
              className={`button-clean-primary green-vibrant ${isVerifying ? 'loading' : ''}`}
              disabled={isVerifying}
            >
              {isVerifying ? 'Validation en cours…' : 'Vérifier le code'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
