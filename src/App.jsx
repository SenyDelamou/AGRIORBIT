import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import FieldExplorer from './pages/FieldExplorer.jsx';
import AnalyticsSuite from './pages/AnalyticsSuite.jsx';
import SolutionsHub from './pages/SolutionsHub.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import Loading from './pages/Loading.jsx';
import Contact from './pages/Contact.jsx';
import Profile from './pages/Profile.jsx';
import Notifications from './pages/Notifications.jsx';
import Settings from './pages/Settings.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';
import ToastContainer from './components/ToastContainer.jsx';
import NotificationSimulator from './components/NotificationSimulator.jsx';
import ChatWidget from './components/ChatWidget.jsx';

import { ProtectedRoute, GuestRoute } from './components/ProtectedRoute.jsx';

import { ScrollToTop } from './hooks/useWebLogic.js';
import NotFound from './pages/NotFound.jsx';

function App() {
  const location = useLocation();
  const authPaths = ['/connexion', '/inscription', '/mot-de-passe-oublie'];
  const hideChat = authPaths.includes(location.pathname) || location.pathname === '/';

  return (
    <AuthProvider>
      <LanguageProvider>
        <ToastProvider>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<Loading />} />
              <Route path="/plateforme" element={<Home />} />
              <Route
                path="/explorateur"
                element={<ProtectedRoute><FieldExplorer /></ProtectedRoute>}
              />
              <Route path="/analyses" element={<AnalyticsSuite />} />
              <Route path="/solutions" element={<SolutionsHub />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/profil"
                element={<ProtectedRoute><Profile /></ProtectedRoute>}
              />
              <Route
                path="/notifications"
                element={<ProtectedRoute><Notifications /></ProtectedRoute>}
              />
              <Route
                path="/parametres"
                element={<ProtectedRoute><Settings /></ProtectedRoute>}
              />
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
          <ToastContainer />
          <NotificationSimulator />
          {!hideChat && <ChatWidget />}
        </ToastProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
