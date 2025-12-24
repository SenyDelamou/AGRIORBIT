import { useAuth } from '../context/AuthContext';
import '../styles/profile.css';
import { ChartBarIcon, MapIcon, BeakerIcon } from '@heroicons/react/24/outline';

function Profile() {
    const { user } = useAuth();

    if (!user) return null;

    const stats = [
        { label: 'Parcelles suivies', value: '12', icon: MapIcon },
        { label: 'Analyses effectuées', value: '48', icon: ChartBarIcon },
        { label: 'Santé moyenne', value: '94%', icon: BeakerIcon }
    ];

    return (
        <div className="profile-page">
            <div className="user-container">
                <header className="page-header">
                    <h1>Mon Profil</h1>
                    <p>Gérez vos informations et consultez vos activités.</p>
                </header>

                <div className="profile-card">
                    <div className="profile-avatar-large">
                        <img src={user.picture} alt={user.name} />
                    </div>
                    <div className="profile-details">
                        <h2>{user.name}</h2>
                        <p className="email">{user.email}</p>
                        <div className="profile-badges">
                            <span className="badge-premium">Membre Expert</span>
                        </div>
                    </div>
                </div>

                <div className="stats-grid">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="stat-card">
                            <stat.icon className="stat-icon-ui" style={{ width: '24px', opacity: 0.5 }} />
                            <span className="stat-value">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Profile;
