import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import '../styles/auth.css'; // On réutilise les styles pour le look premium

function NotFound() {
    const { t } = useLanguage();

    return (
        <div className="not-found-page" style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            background: 'var(--bg-midnight)',
            color: 'white',
            padding: '2rem'
        }}>
            <div className="glass-panel" style={{ padding: '4rem', borderRadius: '32px' }}>
                <h1 style={{ fontSize: '8rem', margin: 0, color: 'var(--color-primary)' }}>404</h1>
                <h2>Oups ! Page introuvable</h2>
                <p style={{ opacity: 0.6, maxWidth: '400px', margin: '1rem auto 2rem' }}>
                    La parcelle que vous recherchez semble avoir été déplacée ou n'existe plus dans notre base de données.
                </p>
                <Link to="/plateforme" className="button-clean-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeftIcon style={{ width: '20px' }} />
                    Retour à l'accueil
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
