import { Routes, Route } from 'react-router-dom';
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
import Loading from './pages/Loading.jsx';
import Contact from './pages/Contact.jsx';
import { Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext.jsx';
import ToastContainer from './components/ToastContainer.jsx';
import NotificationSimulator from './components/NotificationSimulator.jsx';

function App() {
  return (
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
          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<Register />} />
          <Route path="/mot-de-passe-oublie" element={<ForgotPassword />} />
          <Route path="*" element={<Navigate to="/plateforme" replace />} />
        </Routes>
      </Layout>
      <ToastContainer />
      <NotificationSimulator />
    </ToastProvider>
  );
}

export default App;
