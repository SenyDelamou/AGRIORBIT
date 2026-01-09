import { useLanguage } from '../context/LanguageContext.jsx';
import '../styles/premium.css';

function PremiumBadge({ className = '', labelKey = 'premium_badge' }) {
  const { t } = useLanguage();

  return (
    <span className={`premium-badge ${className}`.trim()}>
      {t(labelKey)}
    </span>
  );
}

export default PremiumBadge;
