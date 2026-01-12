import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ClearCache() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    // Nettoyer tout le localStorage et sessionStorage
    localStorage.clear();
    sessionStorage.clear();
    
    // Logout du contexte
    logout();
    
    // Message dans la console
    console.log('✅ Cache nettoyé avec succès');
    
    // Redirection après 2 secondes
    setTimeout(() => {
      navigate('/connexion');
    }, 2000);
  }, [navigate, logout]);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
      color: 'white',
      flexDirection: 'column',
      gap: '2rem'
    }}>
      <div style={{ fontSize: '3rem' }}>🧹</div>
      <h1>Nettoyage du cache...</h1>
      <p style={{ color: 'rgba(255,255,255,0.7)' }}>
        Vos données de session ont été supprimées.
      </p>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
        Redirection vers la connexion...
      </p>
    </div>
  );
}

export default ClearCache;
