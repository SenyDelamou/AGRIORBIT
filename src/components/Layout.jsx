import { useState, useEffect, useRef } from 'react';
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
  ArrowRightOnRectangleIcon,
  UserIcon,
  Cog6ToothIcon,
  BellIcon,
  ListBulletIcon,
  QuestionMarkCircleIcon,
  ChartPieIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
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

function UserProfile({ user, logout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { t } = useLanguage();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuSections = [
    {
      label: t('Personnel'), // We can add a translation for sections if needed, but let's stick to keys
      items: [
        { label: t('profile'), icon: UserIcon, to: '/profil' },
        { label: t('nav_explorer'), icon: ListBulletIcon, to: '/explorateur' },
        { label: t('nav_analytics'), icon: ChartPieIcon, to: '/analyses' },
      ]
    },
    {
      label: t('System'),
      items: [
        { label: t('notifications'), icon: BellIcon, to: '/notifications', badge: 3 },
        { label: t('settings'), icon: Cog6ToothIcon, to: '/parametres' },
      ]
    },
    {
      label: t('Assistance'),
      items: [
        { label: t('footer_help'), icon: QuestionMarkCircleIcon, to: '#' },
      ]
    }
  ];

  return (
    <div className="user-profile-nav" ref={dropdownRef}>
      <button
        className={`profile-btn ${dropdownOpen ? 'active' : ''}`}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-label="Menu utilisateur"
      >
        <img src={user.picture} alt={user.name} className="profile-img" />
      </button>

      {dropdownOpen && (
        <div className="profile-dropdown">
          <div className="dropdown-user-info">
            <div className="info-avatar">
              <img src={user.picture} alt="" />
            </div>
            <div className="info-text">
              <span className="user-name">{user.name}</span>
              <span className="user-email">{user.email}</span>
            </div>
          </div>

          <div className="dropdown-content">
            {menuSections.map((section, sIdx) => (
              <div key={sIdx} className="dropdown-section">
                <span className="section-label">{section.label}</span>
                {section.items.map((item, iIdx) => (
                  <Link
                    key={iIdx}
                    to={item.to}
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <item.icon className="item-icon" />
                    <span className="item-label">{item.label}</span>
                    {item.badge && <span className="item-badge">{item.badge}</span>}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          <div className="dropdown-footer">
            <button onClick={logout} className="logout-btn">
              <ArrowRightOnRectangleIcon className="logout-icon" />
              {t('logout')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Renamed menuOpen to mobileMenuOpen
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { t } = useLanguage(); // Added t for Layout
  const location = useLocation();

  const navLinks = [
    { to: '/plateforme', label: t('nav_home'), Icon: HomeIcon },
    { to: '/explorateur', label: t('nav_explorer'), Icon: GlobeAltIcon },
    { to: '/analyses', label: t('nav_analytics'), Icon: ChartBarIcon },
    { to: '/solutions', label: t('nav_solutions'), Icon: DocumentTextIcon },
    { to: '/a-propos', label: t('nav_about'), Icon: InformationCircleIcon },
    { to: '/contact', label: t('nav_contact'), Icon: PhoneIcon }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) { // Changed menuOpen to mobileMenuOpen
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]); // Changed menuOpen to mobileMenuOpen

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
                <span className="brand-subtitle">{t('brand_subtitle')}</span>
              </div>
            </Link>

            {/* Zone 2: Navigation (Center) */}
            <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}> {/* Changed menuOpen to mobileMenuOpen */}
              <div className="mobile-menu-header">
                <Link to="/plateforme" className="brand" onClick={() => setMobileMenuOpen(false)}> {/* Changed setMenuOpen to setMobileMenuOpen */}
                  <div className="brand-logo-wrapper">
                    <img src={logo} alt="Agri Orbit" className="brand-logo" />
                  </div>
                </Link>
                <button className="menu-close" onClick={() => setMobileMenuOpen(false)}> {/* Changed setMenuOpen to setMobileMenuOpen */}
                  <XMarkIcon className="icon" />
                </button>
              </div>

              <div className="nav-group">
                {navLinks.map((link, index) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)} // Changed setMenuOpen to setMobileMenuOpen
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
                {!user ? (
                  <NavLink
                    to="/connexion"
                    onClick={() => setMobileMenuOpen(false)} // Changed setMenuOpen to setMobileMenuOpen
                    className="login-pill"
                  >
                    <ArrowRightOnRectangleIcon className="nav-icon" />
                    <span>{t('nav_login')}</span>
                  </NavLink>
                ) : (
                  <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="login-pill"> {/* Changed setMenuOpen to setMobileMenuOpen */}
                    <ArrowRightOnRectangleIcon className="nav-icon" />
                    <span>{t('nav_logout')}</span>
                  </button>
                )}
                <ThemeToggle />
              </div>
            </nav>

            {/* Zone 3: Actions (Right) */}
            <div className="desktop-actions">
              {!user ? (
                <NavLink
                  to="/connexion"
                  className="login-pill"
                >
                  <ArrowRightOnRectangleIcon className="nav-icon" />
                  <span>{t('nav_login')}</span>
                </NavLink>
              ) : (
                <UserProfile user={user} logout={logout} />
              )}
              <ThemeToggle />
            </div>

            <div className="mobile-utility">
              {user && (
                <UserProfile user={user} logout={logout} />
              )}
              <button
                className="menu-toggle"
                aria-label={t('menu_toggle_label')}
                onClick={() => setMobileMenuOpen(true)}
              >
                <Bars3Icon className="icon" />
              </button>
            </div>
          </div>
        </header>
      )}

      <main className={hideChrome ? 'auth-main' : undefined}>{children}</main>

      {!hideChrome && (
        <footer className="footer-shell">
          <div className="container footer-cta">
            <div className="cta-content">
              <h3>{t('footer_cta_heading')}</h3>
              <p>{t('footer_cta_text')}</p>
            </div>
            <Link to="/contact" className="button">{t('footer_cta_button')}</Link>
          </div>

          <div className="container footer-inner">
            <div className="footer-brand">
              <div className="brand-lockup">
                <span className="brand-logo">AO</span>
                <span className="brand-name">Agri Orbit</span>
              </div>
              <p className="footer-tagline">
                {t('footer_tagline')}
              </p>
              <div className="social-links">
                <a href="#" aria-label="LinkedIn"><i className="social-icon">in</i></a>
                <a href="#" aria-label="Twitter"><i className="social-icon">X</i></a>
                <a href="#" aria-label="YouTube"><i className="social-icon">YT</i></a>
              </div>
            </div>

            <div className="footer-links-grid">
              <div className="footer-col">
                <h4>{t('footer_platform')}</h4>
                <Link to="/explorateur">{t('footer_carto')}</Link>
                <Link to="/analyses">{t('footer_ia')}</Link>
                <Link to="/solutions">{t('footer_reports')}</Link>
              </div>
              <div className="footer-col">
                <h4>{t('footer_company')}</h4>
                <Link to="/a-propos">{t('nav_about')}</Link>
                <Link to="#">{t('footer_careers')}</Link>
                <Link to="#">{t('footer_blog')}</Link>
              </div>
              <div className="footer-col">
                <h4>{t('footer_help')}</h4>
                <Link to="/contact">{t('nav_contact')}</Link>
                <Link to="#">{t('footer_doc')}</Link>
                <Link to="#">{t('footer_status')}</Link>
              </div>
            </div>
          </div>

          <div className="container footer-meta">
            <span>© {new Date().getFullYear()} Agri Orbit Analytics. {t('footer_rights')}</span>
            <div className="footer-meta-links">
              <Link to="#">{t('footer_legal')}</Link>
              <Link to="#">{t('footer_privacy')}</Link>
              <Link to="#">{t('footer_security')}</Link>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default Layout;

