import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Composant utilitaire qui remonte en haut de la page à chaque changement de route.
 * C'est un standard pour les Single Page Applications (SPA).
 */
export const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

/**
 * Hook pour gérer dynamiquement le titre du document (l'onglet du navigateur).
 */
export const useDocumentTitle = (title) => {
    useEffect(() => {
        const baseTitle = 'Agri Orbit';
        document.title = title ? `${title} | ${baseTitle}` : baseTitle;
    }, [title]);
};

/**
 * Hook pour gérer dynamiquement la description meta pour le SEO.
 */
export const useMetaDescription = (description) => {
    useEffect(() => {
        const meta = document.querySelector('meta[name="description"]');
        if (meta) {
            meta.setAttribute('content', description || 'Plateforme d’orchestration agronomique');
        }
    }, [description]);
};
