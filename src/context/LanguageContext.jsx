import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
    fr: {
        // Navbar
        nav_home: 'Accueil',
        nav_explorer: 'Explorateur',
        nav_analytics: 'Analyses',
        nav_solutions: 'Solutions',
        nav_about: 'À propos',
        nav_contact: 'Contact',
        nav_login: 'Connexion',
        nav_logout: 'Déconnexion',
        brand_subtitle: 'DATA & AGRONOMIE AU SERVICE DU TERRAIN',

        // Home - Hero
        hero_eyebrow: 'Plateforme d’orchestration agronomique',
        hero_title: 'Supervisez vos cultures avec l’observation spatiale et l’intelligence prédictive',
        hero_subtitle: 'Agri Orbit consolide imagerie satellite, données sols et météo pour fournir des tableaux de bord opérationnels et prêts pour la décision.',
        hero_cta: 'Explorer la plateforme',
        hero_secondary: 'Planifier une démonstration',
        hero_chip_esa: 'Partenaires ESA Copernicus',
        hero_chip_iso: 'ISO 27001 en cours',
        hero_chip_eu: 'Infrastructure UE',
        hero_ndvi_status: 'Vigueur optimale parcelle maïs hybride / périmètre Delta.',

        // Home - Capabilities
        cap_tag: 'Ce que vous pouvez faire',
        cap_title: 'Un cockpit décisionnel pour piloter vos cultures',
        cap_desc: 'Une console unifiée qui fédère cartographie, analytics, plans d’actions et reporting pour vos équipes agronomiques, coopératives et investisseurs.',
        cap_card1_title: 'Cartographie temps réel',
        cap_card1_desc: 'Synchronisez vos parcelles avec Sentinel, PlanetScope et Landsat pour visualiser en continu l’évolution de vos cultures.',
        cap_card2_title: 'Modélisation de rendement',
        cap_card2_desc: 'Couplez historiques météo, données sols et imagerie multi-spectrale pour simuler vos récoltes et sécuriser vos campagnes.',
        cap_card3_title: 'Surveillance sanitaire proactive',
        cap_card3_desc: 'Détectez stress hydrique, maladies foliaires et carences nutritionnelles avant les premiers symptômes terrain.',

        // Home - Methodology
        methodo_tag: 'Méthodologie',
        methodo_title: 'Une chaîne complète, de la donnée à l’action terrain',
        methodo_desc: 'Chaque étape est automatisée et documentée : choisissez vos parcelles, laissez l’IA analyser, recevez les alertes et planifiez les interventions avec vos équipes sur le terrain.',
        methodo_step1: 'Importer une zone',
        methodo_step1_desc: 'Saisissez les coordonnées ou chargez un fichier GeoJSON/KML pour définir vos limites de parcelle.',
        methodo_step2: 'Analyser les images',
        methodo_step2_desc: 'Notre moteur fusionne imagerie satellite, météo et historique cultural pour bâtir des tableaux interactifs.',
        methodo_step3: 'Décider & agir',
        methodo_step3_desc: 'Accédez aux recommandations agronomiques et partagez-les avec vos coopératives ou techniciens terrain.',

        // Home - Founder
        founder_tag: 'L\'Origine du Projet',
        founder_title: 'Une idée née de la science et de la passion',
        founder_quote: '"Agri Orbit n’est pas qu’une plateforme technologique, c’est une promesse faite à l’agriculture de demain. Mon idée était de mettre la puissance de l\'observation spatiale au service direct des producteurs pour sécuriser notre souveraineté alimentaire."',
        founder_badge: 'Le Visionnaire',
        founder_signature: 'Fondateur & Directeur de Projet',

        // Home - Impact
        impact_tag: 'Impact mesuré',
        impact_title: 'Un pilotage basé sur des indicateurs fiables',
        impact_desc: 'Nos tableaux de bord sont calibrés avec les retours de coopératives et de stations agronomiques partenaires pour délivrer des KPIs fiables et actionnables.',
        impact_metric1: 'de rendement moyen sur trois saisons pilotes',
        impact_metric2: 'entre détection satellite et diagnostic terrain',
        impact_metric3: 'de précision sur les alertes sanitaires croisées',

        // Home - Testimonials
        testi_tag: 'Témoignage client',
        testi_metric1: 'Économie d’intrants',
        testi_metric2: 'Alertes pertinentes',
        testi_metric3: 'Adoption terrain',
        testi_form_tag: 'Votre avis nous intéresse',
        testi_form_title: 'Vous utilisez Agri Orbit ?',
        testi_form_desc: 'Partagez votre expérience et aidez d\'autres exploitants à franchir le pas de l\'agriculture de précision.',
        testi_form_cta: 'Rédiger un témoignage',
        testi_form_submit: 'Publier mon témoignage',
        testi_form_success_title: 'Merci pour votre confiance !',
        testi_form_success_desc: 'Votre témoignage a été transmis à nos équipes agronomiques. Il sera examiné avant d\'être publié sur la plateforme.',

        // Footer
        footer_tagline: 'Data & agronomie au service du terrain pour une agriculture de précision durable.',
        footer_platform: 'Plateforme',
        footer_carto: 'Cartographie',
        footer_ia: 'Modèles IA',
        footer_reports: 'Rapports',
        footer_company: 'Société',
        footer_careers: 'Carrières',
        footer_help: 'Aide',
        footer_doc: 'Documentation',
        footer_status: 'État du système',
        footer_legal: 'Mentions Légales',
        footer_privacy: 'Confidentialité',
        footer_security: 'Sécurité',
        footer_rights: 'Tous droits réservés.',

        // Settings
        settings: 'Paramètres',
        settings_desc: 'Configurez votre expérience sur Agri Orbit.',
        profile: 'Mon Profil',
        profile_desc: 'Gérez vos informations et consultez vos activités.',
        notifications: 'Notifications',
        notifications_desc: 'Restez informé de l\'état de vos exploitations.',
        language: 'Langue de l\'interface',
        language_desc: 'Choisissez votre langue préférée.',
        email_notif: 'Notifications par email',
        email_notif_desc: 'Recevoir un résumé hebdomadaire de mes parcelles.',
        privacy: 'Confidentialité des données',
        privacy_desc: 'Gérer qui peut voir vos rapports d\'analyse.',
        subscription: 'Abonnement',
        subscription_desc: 'Plan Expert - Renouvellement le 12 Janvier 2026.',
        logout: 'Déconnexion',
        change: 'Modifier',
        select_lang: 'Sélectionner la langue',
        title_explorer: 'Explorateur de Champs',
        title_analytics: 'Analyses Agrologiques',
        title_about: 'À propos de nous',
        title_contact: 'Contactez-nous',
        title_solutions: 'Centre de Solutions',
        title_notifications: 'Vos Alertes'
    },
    en: {
        // Navbar
        nav_home: 'Home',
        nav_explorer: 'Explorer',
        nav_analytics: 'Analytics',
        nav_solutions: 'Solutions',
        nav_about: 'About',
        nav_contact: 'Contact',
        nav_login: 'Login',
        nav_logout: 'Logout',
        brand_subtitle: 'DATA & AGRONOMY FOR FIELD EXCELLENCE',

        // Home - Hero
        hero_eyebrow: 'Agronomic Orchestration Platform',
        hero_title: 'Supervise your crops with spatial observation and predictive intelligence',
        hero_subtitle: 'Agri Orbit consolidates satellite imagery, soil and weather data to provide operational, decision-ready dashboards.',
        hero_cta: 'Explore Platform',
        hero_secondary: 'Schedule a Demo',
        hero_chip_esa: 'ESA Copernicus Partners',
        hero_chip_iso: 'ISO 27001 in progress',
        hero_chip_eu: 'EU Infrastructure',
        hero_ndvi_status: 'Optimal vigor hybrid corn plot / Delta perimeter.',

        // Home - Capabilities
        cap_tag: 'What you can do',
        cap_title: 'A decision cockpit to drive your crops',
        cap_desc: 'A unified console that combines mapping, analytics, action plans, and reporting for your agronomic teams, cooperatives, and investors.',
        cap_card1_title: 'Real-time Mapping',
        cap_card1_desc: 'Sync your plots with Sentinel, PlanetScope, and Landsat to continuously visualize crop evolution.',
        cap_card2_title: 'Yield Modeling',
        cap_card2_desc: 'Combine weather history, soil data, and multi-spectral imagery to simulate harvests and secure seasons.',
        cap_card3_title: 'Proactive Health Monitoring',
        cap_card3_desc: 'Detect water stress, leaf diseases, and nutritional deficiencies before the first field symptoms.',

        // Home - Methodology
        methodo_tag: 'Methodology',
        methodo_title: 'A complete chain, from data to field action',
        methodo_desc: 'Every step is automated and documented: choose your plots, let AI analyze, receive alerts, and plan interventions with your field teams.',
        methodo_step1: 'Import a Zone',
        methodo_step1_desc: 'Enter coordinates or load a GeoJSON/KML file to define your plot boundaries.',
        methodo_step2: 'Analyze Images',
        methodo_step2_desc: 'Our engine merges satellite imagery, weather, and crop history to build interactive dashboards.',
        methodo_step3: 'Decide & Act',
        methodo_step3_desc: 'Access agronomic recommendations and share them with your cooperatives or field technicians.',

        // Home - Founder
        founder_tag: 'Project Origin',
        founder_title: 'An idea born from science and passion',
        founder_quote: '"Agri Orbit is not just a technology platform; it\'s a promise made to the agriculture of tomorrow. My idea was to put the power of spatial observation directly at the service of producers to secure our food sovereignty."',
        founder_badge: 'The Visionary',
        founder_signature: 'Founder & Project Director',

        // Home - Impact
        impact_tag: 'Measured Impact',
        impact_title: 'Management based on reliable indicators',
        impact_desc: 'Our dashboards are calibrated with feedback from partner cooperatives and agronomic stations to deliver reliable and actionable KPIs.',
        impact_metric1: 'average yield increase over three pilot seasons',
        impact_metric2: 'between satellite detection and field diagnosis',
        impact_metric3: 'accuracy on cross-referenced health alerts',

        // Home - Testimonials
        testi_tag: 'Client Testimonial',
        testi_metric1: 'Input Savings',
        testi_metric2: 'Relevant Alerts',
        testi_metric3: 'Field Adoption',
        testi_form_tag: 'Your opinion matters',
        testi_form_title: 'Using Agri Orbit?',
        testi_form_desc: 'Share your experience and help other farmers take the step towards precision agriculture.',
        testi_form_cta: 'Write a Testimonial',
        testi_form_submit: 'Publish my testimonial',
        testi_form_success_title: 'Thank you for your trust!',
        testi_form_success_desc: 'Your testimonial has been sent to our agronomic teams. It will be reviewed before being published on the platform.',

        // Footer
        footer_tagline: 'Data & agronomy at the service of the field for sustainable precision agriculture.',
        footer_platform: 'Platform',
        footer_carto: 'Mapping',
        footer_ia: 'AI Models',
        footer_reports: 'Reports',
        footer_company: 'Company',
        footer_careers: 'Careers',
        footer_help: 'Help',
        footer_doc: 'Documentation',
        footer_status: 'System Status',
        footer_legal: 'Legal Notices',
        footer_privacy: 'Privacy',
        footer_security: 'Security',
        footer_rights: 'All rights reserved.',

        // Settings
        settings: 'Settings',
        settings_desc: 'Configure your Agri Orbit experience.',
        profile: 'My Profile',
        profile_desc: 'Manage your information and view your activities.',
        notifications: 'Notifications',
        notifications_desc: 'Stay informed about the status of your farms.',
        language: 'Interface Language',
        language_desc: 'Choose your preferred language.',
        email_notif: 'Email Notifications',
        email_notif_desc: 'Receive a weekly summary of my plots.',
        privacy: 'Data Privacy',
        privacy_desc: 'Manage who can see your analysis reports.',
        subscription: 'Subscription',
        subscription_desc: 'Expert Plan - Renewal on January 12, 2026.',
        logout: 'Logout',
        change: 'Edit',
        select_lang: 'Select language',
        title_explorer: 'Field Explorer',
        title_analytics: 'Agronomic Analytics',
        title_about: 'About Us',
        title_contact: 'Contact Us',
        title_solutions: 'Solutions Hub',
        title_notifications: 'Your Alerts'
    }
};

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(localStorage.getItem('agri_orbit_lang') || 'fr');

    useEffect(() => {
        localStorage.setItem('agri_orbit_lang', lang);
    }, [lang]);

    const t = (key) => {
        return translations[lang][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage doit être utilisé à l\'intérieur d\'un LanguageProvider');
    }
    return context;
}
