import { Link } from 'react-router-dom';
import '../styles/hero.css';

function Hero({
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  ctaTo,
  ctaHref = '#',
  ctaOnClick,
  secondaryLabel,
  secondaryTo,
  secondaryHref = '#',
  secondaryOnClick,
  images = []
}) {
  const renderPrimary = () => {
    if (!ctaLabel) return null;
    return ctaTo ? (
      <Link className="button" to={ctaTo} onClick={ctaOnClick}>
        {ctaLabel}
      </Link>
    ) : (
      <a className="button" href={ctaHref} onClick={(e) => {
        if (ctaOnClick) {
          e.preventDefault();
          ctaOnClick();
        }
      }}>
        {ctaLabel}
      </a>
    );
  };

  const renderSecondary = () => {
    if (!secondaryLabel) return null;
    return secondaryTo ? (
      <Link className="button secondary" to={secondaryTo} onClick={secondaryOnClick}>
        {secondaryLabel}
      </Link>
    ) : (
      <a className="button secondary" href={secondaryHref} onClick={(e) => {
        if (secondaryOnClick) {
          e.preventDefault();
          secondaryOnClick();
        }
      }}>
        {secondaryLabel}
      </a>
    );
  };

  return (
    <section className="hero-shell">
      {/* Background Slideshow - Continuous Infinite Loop */}
      {images.length > 0 && (
        <div className="hero-backgrounds">
          <div className="hero-overlay" />
          <div className="hero-carousel-track">
            {[...images, ...images].map((img, index) => (
              <div
                key={`${img}-${index}`}
                className="hero-carousel-slide"
                style={{ backgroundImage: `url(${img})` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container hero-inner">
        {eyebrow && <span className="hero-eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        {(ctaLabel || secondaryLabel) && (
          <div className="hero-actions">
            {renderPrimary()}
            {renderSecondary()}
          </div>
        )}
      </div>
    </section>
  );
}

export default Hero;
