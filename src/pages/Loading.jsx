import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/loading.css';

function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/plateforme'), 3200);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="loading-page">
      <div className="loading-card glass-panel">
        <span className="badge">Chargement du projet</span>
        <h1>Agri Orbit Analytics se prépare</h1>
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
        <p className="loading-note">Synchronisation des constellations, veuillez patienter…</p>
        <button type="button" className="button" onClick={() => navigate('/plateforme')}>
          Entrer sur la plateforme
        </button>
      </div>
    </div>
  );
}

export default Loading;
