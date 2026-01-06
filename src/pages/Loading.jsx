import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../styles/loading.css';

function Loading() {
  const navigate = useNavigate();
  const steps = [
    'Initialisation des couches satellites',
    'Synchronisation météo et sols',
    'Préparation des tableaux de bord',
    'Chargement des alertes et notifications'
  ];
  const [stepIndex, setStepIndex] = useState(0);
  const [percent, setPercent] = useState(12);

  useEffect(() => {
    const timer = setTimeout(() => navigate('/plateforme'), 3800);
    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % steps.length);
      setPercent((prev) => (prev >= 96 ? 22 : prev + 18));
    }, 900);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="loading-page">
      <div className="loading-card glass-panel">
        <img src={logo} alt="Agri Orbit" className="loading-logo" />
        <span className="badge">Chargement du projet</span>
        <p>
          Une initiative portée par <strong>Dr Castro Hounmenou</strong>, Université de Labé. Nous initialisons les modules d'observation et les couches d'analyse.
        </p>
        <div className="loading-indicator" role="status" aria-live="polite">
          <div className="orbit-ring ring-1"></div>
          <div className="orbit-ring ring-2"></div>
          <div className="orbit-ring ring-3"></div>
          <div className="loading-core">
            <div className="core-pulse"></div>
          </div>
          <div className="satellite-track track-1">
            <span className="satellite" />
          </div>
          <div className="satellite-track track-2">
            <span className="satellite" />
          </div>
        </div>
        <div className="loading-progress" aria-label="Progression du chargement">
          <div className="progress-track">
            <div className="progress-bar" style={{ width: `${percent}%` }} />
          </div>
          <div className="progress-meta">
            <span>{steps[stepIndex]}</span>
            <span>{percent}%</span>
          </div>
        </div>
        <p className="loading-note">Synchronisation des constellations, veuillez patienter…</p>
        <button type="button" className="button" onClick={() => navigate('/plateforme')}>
          Entrer sur la plateforme
        </button>
      </div>
    </div>
  );
}

export default Loading;
