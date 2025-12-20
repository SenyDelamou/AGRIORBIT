import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const intervalId = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(intervalId);
  }, [images]);

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
      {/* Background Slideshow */}
      {images.length > 0 && (
        <div className="hero-backgrounds">
          <div className="hero-overlay" /> {/* Gradient overlay always on top */}
          {images.map((img, index) => (
            <div
              key={img}
              className={`hero-slide ${index === currentImageIndex ? 'active' : ''}`}
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
