import { useState, useEffect } from 'react';
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
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(interval);
  }, [images.length]);
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
      {/* Premium Cross-fade Background */}
      {images.length > 0 && (
        <div className="hero-backgrounds">
          <div className="hero-overlay" />
          {images.map((img, index) => (
            <div
              key={`${img}-${index}`}
              className={`hero-slide ${index === currentIdx ? 'active' : ''}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
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
