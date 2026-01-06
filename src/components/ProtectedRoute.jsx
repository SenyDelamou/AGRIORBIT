import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

/**
 * Composant de protection des routes.
 * Redirige vers la page de connexion si l'utilisateur n'est pas authentifié.
 * Gère également l'état de chargement initial de l'auth.
 */
export const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!user) {
        // Rediriger vers la page de connexion tout en gardant en mémoire la page demandée
        return <Navigate to="/connexion" state={{ from: location }} replace />;
    }

    return children;
};

/**
 * Composant pour les routes accessibles uniquement aux utilisateurs NON connectés (ex: Login, Register).
 * Redirige vers la plateforme si l'utilisateur est déjà connecté.
 */
export const GuestRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (user) {
        return <Navigate to="/plateforme" replace />;
    }

    return children;
};
