import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import '../styles/layout.css';

const navLinks = [
  { to: '/plateforme', label: 'Accueil' },
  { to: '/explorateur', label: 'Explorateur' },
  { to: '/analyses', label: 'Analyses' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/a-propos', label: 'Mission' }
];

function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const authPaths = ['/connexion', '/inscription', '/mot-de-passe-oublie'];
  const hideChrome = authPaths.includes(location.pathname) || location.pathname === '/';

  return (
    <div className="app-shell">
      {!hideChrome && (
        <header className="nav-shell">
          <div className="container nav-inner">
            <Link to="/plateforme" className="brand">
              <span className="brand-mark">AO</span>
              <div>Agri Orbit</div>
            </Link>

            <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
              <div className="nav-group">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) => (isActive ? 'active' : undefined)}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
              <div className="nav-auth">
                <NavLink
                  to="/connexion"
                  onClick={() => setMenuOpen(false)}
                  className="ghost-link"
                >
                  Connexion
                </NavLink>
                <Link className="cta-link" to="/inscription" onClick={() => setMenuOpen(false)}>
                  Commencer
                </Link>
              </div>
            </nav>

            <button
              className="menu-toggle"
              aria-label="Ouvrir le menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <XMarkIcon className="icon" /> : <Bars3Icon className="icon" />}
            </button>
          </div>
        </header>
      )}

      <main className={hideChrome ? 'auth-main' : undefined}>{children}</main>

      {!hideChrome && (
        <footer className="footer-shell">
          <div className="container footer-inner">
            <div className="footer-brand">
              <span className="brand-mark">AO</span>
              <strong>Agri Orbit Analytics</strong>
              <p>Intelligence spatiale pour une agriculture de précision durable.</p>
            </div>
            <div className="footer-links">
              <div>
                <span className="footer-heading">Plateforme</span>
                <Link to="/explorateur">Cartographie</Link>
                <Link to="/analyses">Modèles IA</Link>
                <Link to="/solutions">Rapports</Link>
              </div>
              <div>
                <span className="footer-heading">Société</span>
                <Link to="/a-propos">Notre Mission</Link>
                <Link to="#">Carrières</Link>
                <Link to="#">Blog</Link>
              </div>
              <div>
                <span className="footer-heading">Aide</span>
                <a href="mailto:contact@agriorbit.ai">Contact</a>
                <Link to="#">Documentation</Link>
                <Link to="#">État du système</Link>
              </div>
            </div>
          </div>
          <div className="container footer-meta">
            <span>© {new Date().getFullYear()} Agri Orbit Analytics. Tous droits réservés.</span>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <Link to="#">Mentions Légales</Link>
              <Link to="#">Confidentialité</Link>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default Layout;
