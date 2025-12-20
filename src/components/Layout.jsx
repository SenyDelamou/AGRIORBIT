import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  HomeIcon,
  GlobeAltIcon,
  ChartBarIcon,
  DocumentTextIcon,
  InformationCircleIcon,
  PhoneIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext.jsx';
import logo from '../assets/logo.png';
import '../styles/layout.css';

const navLinks = [
  { to: '/plateforme', label: 'Accueil', Icon: HomeIcon },
  { to: '/explorateur', label: 'Explorateur', Icon: GlobeAltIcon },
  { to: '/analyses', label: 'Analyses', Icon: ChartBarIcon },
  { to: '/solutions', label: 'Solutions', Icon: DocumentTextIcon },
  { to: '/a-propos', label: 'À propos', Icon: InformationCircleIcon },
  { to: '/contact', label: 'Contact', Icon: PhoneIcon }
];

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="theme-switch-wrapper">
      <SunIcon className={`switch-icon sun ${theme === 'light' ? 'active' : ''}`} />
      <button
        className={`theme-switch ${theme}`}
        onClick={toggleTheme}
        aria-label="Changer de thème"
      >
        <div className="switch-handle" />
      </button>
      <MoonIcon className={`switch-icon moon ${theme === 'dark' ? 'active' : ''}`} />
    </div>
  );
}

function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const authPaths = ['/connexion', '/inscription', '/mot-de-passe-oublie'];
  const hideChrome = authPaths.includes(location.pathname) || location.pathname === '/';

  return (
    <div className="app-shell">
      {!hideChrome && (
        <header className={`nav-shell ${scrolled ? 'scrolled' : ''}`}>
          <div className="container nav-inner">
            {/* Zone 1: Brand (Left) */}
            <Link to="/plateforme" className="brand">
              <div className="brand-logo-wrapper">
                <img src={logo} alt="Agri Orbit" className="brand-logo" />
              </div>
              <div className="brand-info">
                <span className="brand-name">Agri Orbit</span>
                <span className="brand-subtitle">DATA & AGRONOMIE AU SERVICE DU TERRAIN</span>
              </div>
            </Link>

            {/* Zone 2: Navigation (Center) */}
            <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
              <div className="mobile-menu-header">
                <Link to="/plateforme" className="brand" onClick={() => setMenuOpen(false)}>
                  <div className="brand-logo-wrapper">
                    <img src={logo} alt="Agri Orbit" className="brand-logo" />
                  </div>
                </Link>
                <button className="menu-close" onClick={() => setMenuOpen(false)}>
                  <XMarkIcon className="icon" />
                </button>
              </div>

              <div className="nav-group">
                {navLinks.map((link, index) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) => (isActive ? 'nav-pill active' : 'nav-pill')}
                    style={{ '--index': index }}
                  >
                    <link.Icon className="nav-icon" />
                    <span>{link.label}</span>
                  </NavLink>
                ))}
              </div>

              {/* Mobile-only actions inside the menu */}
              <div className="mobile-actions">
                <NavLink
                  to="/connexion"
                  onClick={() => setMenuOpen(false)}
                  className="login-pill"
                >
                  <ArrowRightOnRectangleIcon className="nav-icon" />
                  <span>Connexion</span>
                </NavLink>
                <ThemeToggle />
              </div>
            </nav>

            {/* Zone 3: Actions (Right) */}
            <div className="desktop-actions">
              <NavLink
                to="/connexion"
                className="login-pill"
              >
                <ArrowRightOnRectangleIcon className="nav-icon" />
                <span>Connexion</span>
              </NavLink>
              <ThemeToggle />
            </div>

            <button
              className="menu-toggle"
              aria-label="Ouvrir le menu"
              onClick={() => setMenuOpen(true)}
            >
              <Bars3Icon className="icon" />
            </button>
          </div>
        </header>
      )}

      <main className={hideChrome ? 'auth-main' : undefined}>{children}</main>

      {!hideChrome && (
        <footer className="footer-shell">
          <div className="container footer-cta glass-panel">
            <div className="cta-content">
              <h3>Prêt à optimiser vos terres ?</h3>
              <p>Rejoignez les innovateurs qui transforment l'agriculture avec la data.</p>
            </div>
            <Link to="/contact" className="button">Démarrer maintenant</Link>
          </div>

          <div className="container footer-inner">
            <div className="footer-brand">
              <img src={logo} alt="Agri Orbit" className="footer-logo" />
              <p>Data & agronomie au service du terrain pour une agriculture de précision durable.</p>
              <div className="social-links">
                <a href="#" aria-label="LinkedIn"><i className="social-icon">in</i></a>
                <a href="#" aria-label="Twitter"><i className="social-icon">X</i></a>
                <a href="#" aria-label="YouTube"><i className="social-icon">YT</i></a>
              </div>
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
                <Link to="/a-propos">À propos</Link>
                <Link to="#">Carrières</Link>
                <Link to="#">Blog</Link>
              </div>
              <div>
                <span className="footer-heading">Aide</span>
                <Link to="/contact">Contact</Link>
                <Link to="#">Documentation</Link>
                <Link to="#">État du système</Link>
              </div>
            </div>
          </div>
          <div className="container footer-meta">
            <span>© {new Date().getFullYear()} Agri Orbit Analytics. Tous droits réservés.</span>
            <div className="footer-meta-links">
              <Link to="#">Mentions Légales</Link>
              <Link to="#">Confidentialité</Link>
              <Link to="#">Sécurité</Link>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default Layout;
