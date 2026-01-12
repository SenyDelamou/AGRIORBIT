import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Debug() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('DEBUG - État du contexte:', {
      user,
      loading,
      userExists: !!user,
      userEmail: user?.email || 'N/A'
    });
  }, [user, loading]);

  return (
    <div style={{
      padding: '3rem 2rem',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1>🐛 Page de Debug</h1>
        
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '2rem',
          borderRadius: '10px',
          marginTop: '2rem',
          fontFamily: 'monospace'
        }}>
          <h3>État du Contexte Authentification:</h3>
          <pre>{JSON.stringify({ user, loading }, null, 2)}</pre>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/connexion')}
            style={{
              padding: '0.8rem 1.5rem',
              background: '#4fac00',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            ➜ Aller à /connexion
          </button>
          <button
            onClick={() => navigate('/plateforme')}
            style={{
              padding: '0.8rem 1.5rem',
              background: '#4facea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            ➜ Aller à /plateforme (Accueil)
          </button>
          <button
            onClick={() => navigate('/profil')}
            style={{
              padding: '0.8rem 1.5rem',
              background: '#9e33d3',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            ➜ Aller à /profil
          </button>
          <button
            onClick={() => navigate('/nettoyer-cache')}
            style={{
              padding: '0.8rem 1.5rem',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🧹 Nettoyer le cache
          </button>
        </div>

        <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
          <p>Ouvrez la console du navigateur (F12) pour voir les logs détaillés.</p>
        </div>
      </div>
    </div>
  );
}

export default Debug;
