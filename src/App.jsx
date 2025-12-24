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
import ToastContainer from './components/ToastContainer.jsx';
import NotificationSimulator from './components/NotificationSimulator.jsx';
import ChatWidget from './components/ChatWidget.jsx';

function App() {
  const location = useLocation();
  const authPaths = ['/connexion', '/inscription', '/mot-de-passe-oublie'];
  const hideChat = authPaths.includes(location.pathname) || location.pathname === '/';

  return (
    <AuthProvider>
      <ToastProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Loading />} />
            <Route path="/plateforme" element={<Home />} />
            <Route path="/explorateur" element={<FieldExplorer />} />
            <Route path="/analyses" element={<AnalyticsSuite />} />
            <Route path="/solutions" element={<SolutionsHub />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profil" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/parametres" element={<Settings />} />
            <Route path="/connexion" element={<Login />} />
            <Route path="/inscription" element={<Register />} />
            <Route path="/mot-de-passe-oublie" element={<ForgotPassword />} />
            <Route path="*" element={<Navigate to="/plateforme" replace />} />
          </Routes>
        </Layout>
        <ToastContainer />
        <NotificationSimulator />
        {!hideChat && <ChatWidget />}
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
