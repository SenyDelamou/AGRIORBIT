import '../styles/profile.css';
import { BellIcon, GlobeAltIcon, ShieldCheckIcon, CreditCardIcon } from '@heroicons/react/24/outline';

const settings = [
  {
    title: 'Notifications par email',
    desc: 'Recevoir un résumé hebdomadaire de mes parcelles.',
    icon: BellIcon,
    type: 'toggle'
  },
  {
    title: 'Langue de l\'interface',
    desc: 'Français (Sénégal)',
    icon: GlobeAltIcon,
    type: 'select'
  },
  {
    title: 'Confidentialité des données',
    desc: 'Gérer qui peut voir vos rapports d\'analyse.',
    icon: ShieldCheckIcon,
    type: 'link'
  },
  {
    title: 'Abonnement',
    desc: 'Plan Expert - Renouvellement le 12 Janvier 2026.',
    icon: CreditCardIcon,
    type: 'link'
  }
];

function Settings() {
  return (
    <div className="settings-page">
      <div className="user-container">
        <header className="page-header">
          <h1>Paramètres</h1>
          <p>Configurez votre expérience sur Agri Orbit.</p>
        </header>

        <div className="settings-list">
          {settings.map((item, idx) => (
            <div key={idx} className="setting-item">
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '12px' }}>
                  <item.icon style={{ width: '24px', color: 'var(--accent-neon-green)' }} />
                </div>
                <div className="setting-info">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
              <button className="button-clean-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                Modifier
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Settings;
