import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MagneticButton from './MagneticButton.jsx';
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

  // Parallax Effect Logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20; // -10 to 10
      const y = (e.clientY / window.innerHeight - 0.5) * 20; // -10 to 10
      document.documentElement.style.setProperty('--mouse-x', `${x}px`);
      document.documentElement.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  const renderPrimary = () => {
    if (!ctaLabel) return null;
    return (
      <MagneticButton className="button" to={ctaTo} onClick={ctaOnClick}>
        {ctaLabel}
      </MagneticButton>
    );
  };

  const renderSecondary = () => {
    if (!secondaryLabel) return null;
    return (
      <MagneticButton
        className="button secondary"
        to={secondaryTo}
        onClick={(e) => {
          if (secondaryHref.startsWith('#')) {
            // Internal anchor scroll
            const el = document.querySelector(secondaryHref);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
          if (secondaryOnClick) secondaryOnClick(e);
        }}
      >
        {secondaryLabel}
      </MagneticButton>
    );
  };

  return (
    <section className="hero-shell">
      {/* Premium Cross-fade Background */}
      {images.length > 0 && (
        <div className="hero-backgrounds">
          <div className="hero-overlay" />
          <div className="hero-parallax-layer">
            {images.map((img, index) => (
              <div
                key={`${img}-${index}`}
                className={`hero-slide ${index === currentIdx ? 'active' : ''}`}
              >
                <div
                  className="hero-image"
                  style={{ backgroundImage: `url(${img})` }}
                />
              </div>
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
