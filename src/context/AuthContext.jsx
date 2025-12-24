import { createContext, useContext, useState, useEffect } from 'react';
import { clearStoredTokens, getStoredTokens, request, setStoredTokens } from '../api/client.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function initializeAuth() {
            try {
                const savedUser = localStorage.getItem('agri_orbit_user');
                if (savedUser) {
                    try {
                        setUser(JSON.parse(savedUser));
                    } catch (error) {
                        console.warn('Impossible de parser le profil local, réinitialisation.', error);
                        localStorage.removeItem('agri_orbit_user');
                    }
                }

                const { accessToken } = getStoredTokens();
                if (accessToken) {
                    try {
                        const data = await request('/users/me');
                        setUser(data.user);
                        localStorage.setItem('agri_orbit_user', JSON.stringify(data.user));
                    } catch (error) {
                        console.error('Impossible de récupérer le profil, nettoyage des tokens.', error);
                        clearStoredTokens();
                        localStorage.removeItem('agri_orbit_user');
                        setUser(null);
                    }
                }
            } finally {
                setLoading(false);
            }
        }

        initializeAuth();
    }, []);

    const login = (userData, tokens) => {
        setUser(userData);
        localStorage.setItem('agri_orbit_user', JSON.stringify(userData));
        if (tokens) {
            setStoredTokens(tokens.accessToken, tokens.refreshToken);
        }
    };

    const updateUser = (newInfo) => {
        const updatedUser = { ...user, ...newInfo };
        setUser(updatedUser);
        localStorage.setItem('agri_orbit_user', JSON.stringify(updatedUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('agri_orbit_user');
        clearStoredTokens();
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
    }
    return context;
}
