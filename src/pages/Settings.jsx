import { useLanguage } from '../context/LanguageContext';
import { useSubscription } from '../context/SubscriptionContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import PremiumBadge from '../components/PremiumBadge.jsx';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import '../styles/profile.css';
import '../styles/premium.css';
import { BellIcon, GlobeAltIcon, ShieldCheckIcon, CreditCardIcon } from '@heroicons/react/24/outline';

function Settings() {
  const { lang, setLang, t } = useLanguage();
  const { plan, isPremium, upgradeToPremium, downgradeToStandard } = useSubscription();
  const { showToast } = useToast();
  useScrollReveal();

  const localeMap = {
    fr: 'fr-FR',
    en: 'en-US'
  };
  const dateFormatter = new Intl.DateTimeFormat(localeMap[lang] ?? 'fr-FR', { dateStyle: 'long' });

  const formatDate = (iso) => {
    if (!iso) {
      return t('premium_not_applicable');
    }
    try {
      return dateFormatter.format(new Date(iso));
    } catch (error) {
      console.warn('Impossible de formater la date de renouvellement simulée.', error);
      return t('premium_not_applicable');
    }
  };

  const subscriptionDesc = isPremium ? t('subscription_desc_premium') : t('subscription_desc_standard');
  const currentPlanLabel = isPremium ? t('premium_premium') : t('premium_standard');
  const renewalLabel = formatDate(plan?.renewalDate);
  const featurePoints = [
    t('premium_feature_point_1'),
    t('premium_feature_point_2'),
    t('premium_feature_point_3')
  ];

  const scrollToPremium = () => {
    const section = document.getElementById('premium-simulation');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleUpgrade = () => {
    upgradeToPremium();
    showToast(t('premium_upgrade_toast'), 'success');
  };

  const handleDowngrade = () => {
    downgradeToStandard();
    showToast(t('premium_downgrade_toast'), 'info');
  };

  const handlePrimaryAction = () => {
    if (isPremium) {
      showToast(t('premium_simulation_hint'), 'info');
      return;
    }
    handleUpgrade();
  };

  const primaryActionLabel = isPremium ? t('premium_manage_cta') : t('premium_upgrade_cta');

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
      desc: subscriptionDesc,
      icon: CreditCardIcon,
      type: 'premium',
      buttonLabel: primaryActionLabel,
      onClick: scrollToPremium
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
          {settings.map((item, idx) => (
            <div key={item.id} className={`setting-item hover-lift reveal-on-scroll`} style={{ animationDelay: `${idx * 0.1}s` }}>
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
                    <option value="pulaar">Pulaar</option>
                  </select>
                </div>
              ) : (
                <button
                  className={`button-clean-primary ${item.type === 'premium' ? 'premium-entry-button' : ''}`.trim()}
                  style={{ padding: '8px 16px', fontSize: '0.8rem' }}
                  type="button"
                  onClick={() => {
                    if (item.onClick) {
                      item.onClick();
                    }
                    if (item.type === 'premium') {
                      handlePrimaryAction();
                    }
                  }}
                >
                  {item.buttonLabel ?? t('change')}
                </button>
              )}
            </div>
          ))}
        </div>

        <section id="premium-simulation" className="premium-locked-shell reveal-on-scroll">
          <div className="surface-card premium-panel hover-lift">
            <div className="premium-upsell">
              <div>
                <PremiumBadge labelKey={isPremium ? 'premium_badge' : 'premium_standard'} />
                <h2>{t('premium_feature_list_title')}</h2>
                <p>{subscriptionDesc}</p>
              </div>

              <div className="premium-plan-grid">
                <div className="premium-mini-card">
                  <span>{t('premium_current_plan')}</span>
                  <strong>{currentPlanLabel}</strong>
                </div>
                <div className="premium-mini-card">
                  <span>{t('premium_next_renewal')}</span>
                  <strong>{renewalLabel}</strong>
                </div>
              </div>

              <div className="premium-feature-grid">
                {featurePoints.map((item) => (
                  <div key={item} className="premium-feature">
                    <div className="premium-feature-indicator">★</div>
                    <p>{item}</p>
                  </div>
                ))}
              </div>

              <div className="premium-divider" />

              <div className="premium-actions">
                <button type="button" className="button" onClick={handlePrimaryAction}>
                  {primaryActionLabel}
                </button>
                {isPremium && (
                  <button type="button" className="button secondary" onClick={handleDowngrade}>
                    {t('premium_downgrade_cta')}
                  </button>
                )}
              </div>

              <p className="premium-note">{t('premium_simulation_hint')}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Settings;
