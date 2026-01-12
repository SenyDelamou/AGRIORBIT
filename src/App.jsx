import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/Layout.jsx';
const Home = lazy(() => import('./pages/Home.jsx'));
const FieldExplorer = lazy(() => import('./pages/FieldExplorer.jsx'));
const AnalyticsSuite = lazy(() => import('./pages/AnalyticsSuite.jsx'));
const SolutionsHub = lazy(() => import('./pages/SolutionsHub.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Register = lazy(() => import('./pages/Register.jsx'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword.jsx'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail.jsx'));
const Loading = lazy(() => import('./pages/Loading.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Profile = lazy(() => import('./pages/Profile.jsx'));
const Notifications = lazy(() => import('./pages/Notifications.jsx'));
const Settings = lazy(() => import('./pages/Settings.jsx'));
const LegalNotice = lazy(() => import('./pages/LegalNotice.jsx'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'));
const SecurityPolicy = lazy(() => import('./pages/SecurityPolicy.jsx'));
const Resources = lazy(() => import('./pages/Resources.jsx'));
import { ToastProvider } from './context/ToastContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';
import { SubscriptionProvider } from './context/SubscriptionContext.jsx';
import ToastContainer from './components/ToastContainer.jsx';
import NotificationSimulator from './components/NotificationSimulator.jsx';
import ChatWidget from './components/ChatWidget.jsx';

import { GuestRoute } from './components/ProtectedRoute.jsx';

import { ScrollToTop } from './hooks/useWebLogic.js';
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function App() {
  const location = useLocation();
  const authPaths = ['/connexion', '/inscription', '/mot-de-passe-oublie', '/verification-email'];
  const hideChat = authPaths.includes(location.pathname) || location.pathname === '/' || location.pathname === '/loading';

  return (
    <AuthProvider>
      <LanguageProvider>
        <SubscriptionProvider>
          <ToastProvider>
          <ScrollToTop />
          <Layout>
            <Suspense fallback={<div className="page-loader" aria-busy="true" aria-live="polite">Chargement…</div>}>
              <Routes>
                <Route path="/" element={<Navigate to="/plateforme" replace />} />
                <Route path="/loading" element={<Loading />} />
                <Route path="/plateforme" element={<Home />} />
                <Route path="/explorateur" element={<FieldExplorer />} />
                <Route path="/analyses" element={<AnalyticsSuite />} />
                <Route path="/solutions" element={<SolutionsHub />} />
                <Route path="/a-propos" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/profil" element={<Profile />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/parametres" element={<Settings />} />
                <Route
                  path="/connexion"
                  element={<GuestRoute><Login /></GuestRoute>}
                />
                <Route
                  path="/inscription"
                  element={<GuestRoute><Register /></GuestRoute>}
                />
                <Route
                  path="/mot-de-passe-oublie"
                  element={<GuestRoute><ForgotPassword /></GuestRoute>}
                />
                <Route
                  path="/verification-email"
                  element={<GuestRoute><VerifyEmail /></GuestRoute>}
                />
                <Route path="/mentions-legales" element={<LegalNotice />} />
                <Route path="/confidentialite" element={<PrivacyPolicy />} />
                <Route path="/securite" element={<SecurityPolicy />} />
                <Route path="/ressources" element={<Resources />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Layout>
          <ToastContainer />
          <NotificationSimulator />
          {!hideChat && <ChatWidget currentPath={location.pathname} />}
        </ToastProvider>
        </SubscriptionProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
