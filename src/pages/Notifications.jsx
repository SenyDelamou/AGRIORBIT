import '../styles/profile.css';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import { BellIcon, ExclamationTriangleIcon, CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const notifications = [
    {
        id: 1,
        type: 'warning',
        title: 'Alerte Stress Hydrique',
        message: 'La parcelle B-12 présente des signes de manque d\'eau.',
        time: 'Il y a 2 heures',
        icon: ExclamationTriangleIcon,
        color: '#f59e0b'
    },
    {
        id: 2,
        type: 'success',
        title: 'Analyse Terminée',
        message: 'Votre rapport d\'analyse de sol pour "Zone Nord" est prêt.',
        time: 'Il y a 5 heures',
        icon: CheckCircleIcon,
        color: '#10b981'
    },
    {
        id: 3,
        type: 'info',
        title: 'Mise à jour système',
        message: 'De nouvelles cartes satellites sont disponibles.',
        time: 'Hier',
        icon: InformationCircleIcon,
        color: '#3b82f6'
    }
];

function Notifications() {
    useScrollReveal();
    return (
        <div className="notifications-page">
            <div className="user-container">
                <header className="page-header">
                    <h1>Notifications</h1>
                    <p>Restez informé de l'état de vos exploitations.</p>
                </header>

                <div className="settings-list">
                    {notifications.map((notif, idx) => (
                        <div key={notif.id} className={`setting-item hover-lift reveal-on-scroll`} style={{ animationDelay: `${idx * 0.1}s` }}>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <div style={{
                                    background: `${notif.color}20`,
                                    padding: '12px',
                                    borderRadius: '12px',
                                    color: notif.color
                                }}>
                                    <notif.icon style={{ width: '24px' }} />
                                </div>
                                <div className="setting-info">
                                    <h3>{notif.title}</h3>
                                    <p>{notif.message}</p>
                                </div>
                            </div>
                            <span style={{ fontSize: '0.8rem', color: '#475569' }}>{notif.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Notifications;
