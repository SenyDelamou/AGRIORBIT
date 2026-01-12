import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { SparklesIcon, CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import '../styles/test-login.css';

function TestLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState('farmer');

  const testProfiles = {
    farmer: {
      id: 'test_farmer_001',
      name: 'Kouadio Diop',
      email: 'kouadio.diop@agri.com',
      picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kouadio',
      phone: '+229 90 12 34 56',
      location: 'Kita, Mali',
      company: 'SARL Diop Agriculture',
      bio: 'Agriculteur innovant spécialisé en cultures vivrières et maraîchage. Utilise Agri Orbit depuis 2 ans pour optimiser ma production.',
      bannerImage: 'https://images.unsplash.com/photo-1500595046891-cb5ece8f4b63?w=1200&h=300&fit=crop',
      subscription: 'premium',
      fields: 15,
      analyses: 234,
      alerts: 12,
      daysActive: 487
    },
    researcher: {
      id: 'test_researcher_001',
      name: 'Dr. Fatima Ba',
      email: 'fatima.ba@research.edu',
      picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
      phone: '+229 91 23 45 67',
      location: 'Dakar, Sénégal',
      company: 'Centre de Recherche Agricole',
      bio: 'Chercheure en agronomie numérique et télédétection. Focus sur les solutions durables en Afrique de l\'Ouest.',
      bannerImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=300&fit=crop',
      subscription: 'premium',
      fields: 45,
      analyses: 892,
      alerts: 78,
      daysActive: 1240
    },
    startup: {
      id: 'test_startup_001',
      name: 'Marie Camara',
      email: 'marie@agritech.startup',
      picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marie',
      phone: '+229 92 34 56 78',
      location: 'Conakry, Guinée',
      company: 'AgriTech Innovations SARL',
      bio: 'Entrepreneur agritech. Aide les petits agriculteurs à accéder à la technologie pour augmenter leurs rendements de manière durable.',
      bannerImage: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=300&fit=crop',
      subscription: 'premium',
      fields: 8,
      analyses: 156,
      alerts: 24,
      daysActive: 340
    }
  };

  const handleTestLogin = async (profileKey) => {
    setIsLoading(true);
    try {
      const profile = testProfiles[profileKey];
      
      // Simulation d'une API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Login avec les données de test
      login(profile, {
        accessToken: `test_token_${profileKey}_${Date.now()}`,
        refreshToken: `test_refresh_${profileKey}_${Date.now()}`,
        expiresIn: 3600
      });

      showToast(`Bienvenue ${profile.name}! 🎉`, 'success');
      
      // Redirection après 500ms
      setTimeout(() => {
        navigate('/profil');
      }, 500);
    } catch (error) {
      console.error('Erreur lors de la connexion test:', error);
      showToast('Erreur lors de la connexion', 'error');
      setIsLoading(false);
    }
  };

  return (
    <div className="test-login-page">
      <div className="test-login-container">
        {/* Header */}
        <div className="test-login-header">
          <div className="test-header-content">
            <SparklesIcon className="test-header-icon" />
            <h1>🧪 Mode Test - Simulation de Connexion</h1>
            <p>Sélectionnez un profil utilisateur pour tester toutes les fonctionnalités d'Agri Orbit</p>
          </div>
        </div>

        {/* Profiles Grid */}
        <div className="test-profiles-grid">
          {Object.entries(testProfiles).map(([key, profile]) => (
            <div 
              key={key}
              className={`test-profile-card ${selectedProfile === key ? 'selected' : ''} ${isLoading ? 'disabled' : ''}`}
              onClick={() => !isLoading && setSelectedProfile(key)}
            >
              <div className="profile-card-header">
                <img src={profile.picture} alt={profile.name} className="profile-picture" />
                <div className="profile-badge-test">{profile.subscription}</div>
              </div>

              <div className="profile-card-content">
                <h3>{profile.name}</h3>
                <p className="profile-role">{profile.company}</p>
                <p className="profile-location">📍 {profile.location}</p>
                
                <div className="profile-stats-mini">
                  <div className="stat-mini">
                    <span className="stat-number">{profile.fields}</span>
                    <span className="stat-label">Parcelles</span>
                  </div>
                  <div className="stat-mini">
                    <span className="stat-number">{profile.analyses}</span>
                    <span className="stat-label">Analyses</span>
                  </div>
                  <div className="stat-mini">
                    <span className="stat-number">{profile.daysActive}</span>
                    <span className="stat-label">Jours</span>
                  </div>
                </div>

                <p className="profile-bio">{profile.bio}</p>
              </div>

              <div className="profile-card-footer">
                <button 
                  className={`btn-test-connect ${selectedProfile === key ? 'primary' : 'secondary'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTestLogin(key);
                  }}
                  disabled={isLoading}
                >
                  {isLoading && selectedProfile === key ? (
                    <>
                      <span className="spinner"></span>
                      Connexion...
                    </>
                  ) : (
                    <>
                      {selectedProfile === key ? <CheckCircleIcon /> : <ArrowRightIcon />}
                      {selectedProfile === key ? 'Sélectionné' : 'Sélectionner'}
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Features to Test */}
        <div className="test-features-section">
          <h2>✨ Fonctionnalités à Tester</h2>
          <div className="features-grid">
            <div className="feature-item">
              <span className="feature-icon">🖼️</span>
              <h4>Bannière Personnalisée</h4>
              <p>Modifiez la bannière de profil en cliquant sur "Modifier la bannière"</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <h4>8 Onglets Profil</h4>
              <p>Explorez tous les onglets: Profil, Abonnement, Stats, Activité, etc.</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🗺️</span>
              <h4>Localisation Google Maps</h4>
              <p>Visitez la page Contact pour voir la carte interactive et les infos de localisation</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✉️</span>
              <h4>Formulaire de Contact</h4>
              <p>Testez l'envoi de messages et la FAQ dépliable</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎨</span>
              <h4>Solutions Hub Avancée</h4>
              <p>Découvrez les programmes avec filtres et cas d'usage</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔐</span>
              <h4>Authentification Google OAuth</h4>
              <p>Essayez la connexion via Google Sign-In</p>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="test-info-box">
          <h3>💡 Notes Importantes</h3>
          <ul>
            <li>Les données sont stockées localement dans votre navigateur (pas de serveur backend)</li>
            <li>Vous pouvez modifier votre profil, mais les changements ne persistent que pendant la session</li>
            <li>Testez l'upload de bannière - les images sont converties en base64</li>
            <li>La géolocalisation affiche la localisation réelle configurée</li>
            <li>Pour voir les vraies notifications, allez à la page Notifications</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TestLogin;
