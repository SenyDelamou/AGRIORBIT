import { useLanguage } from '../context/LanguageContext';
import '../styles/profile.css';
import { BellIcon, GlobeAltIcon, ShieldCheckIcon, CreditCardIcon } from '@heroicons/react/24/outline';

function Settings() {
  const { lang, setLang, t } = useLanguage();

  const settings = [
    {
      id: 'email',
      title: t('email_notif'),
      desc: t('email_notif_desc'),
      icon: BellIcon,
      type: 'toggle'
    },
    {
      id: 'language',
      title: t('language'),
      desc: t('language_desc'),
      icon: GlobeAltIcon,
      type: 'language'
    },
    {
      id: 'privacy',
      title: t('privacy'),
      desc: t('privacy_desc'),
      icon: ShieldCheckIcon,
      type: 'link'
    },
    {
      id: 'subscription',
      title: t('subscription'),
      desc: t('subscription_desc'),
      icon: CreditCardIcon,
      type: 'link'
    }
  ];

  return (
    <div className="settings-page">
      <div className="user-container">
        <header className="page-header">
          <h1>{t('settings')}</h1>
          <p>{t('settings_desc')}</p>
        </header>

        <div className="settings-list">
          {settings.map((item) => (
            <div key={item.id} className="setting-item">
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flex: 1 }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '12px' }}>
                  <item.icon style={{ width: '24px', color: 'var(--accent-neon-green)' }} />
                </div>
                <div className="setting-info">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>

              {item.type === 'language' ? (
                <div className="language-selector">
                  <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                    className="select-lang-ui"
                  >
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                  </select>
                </div>
              ) : (
                <button className="button-clean-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                  {t('change')}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Settings;
