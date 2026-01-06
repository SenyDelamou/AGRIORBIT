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

        // Auth
        login_title: 'Connexion',
        login_subtitle: 'Authentification sécurisée',
        email_label: 'Email',
        email_placeholder: 'votre@email.com',
        password_label: 'Mot de passe',
        password_placeholder: '••••••••',
        remember_me: 'Se souvenir de moi',
        forgot_password: 'Mot de passe oublié ?',
        login_submit: 'Se connecter',
        or_continue_with: 'ou continuer avec',
        no_account: 'Pas encore de compte ?',
        create_account_link: 'Créer un compte',
        register_title: 'Inscription',
        register_subtitle: 'Rejoignez la révolution AgriOrbit',
        firstname: 'Prénom',
        lastname: 'Nom',
        confirm_password: 'Confirmer le mot de passe',
        organisation: 'Organisation',
        agree_terms: 'J\'accepte les conditions générales',
        already_member: 'Déjà membre ?',
        login_link: 'Se connecter',
        forgot_password_title: 'Mot de passe oublié',
        forgot_password_subtitle: 'Entrez votre email pour réinitialiser votre mot de passe',
        reset_password_submit: 'Envoyer le lien',
        back_to_login: 'Retour à la connexion',
        resend_code: 'Renvoyer le code',
        otp_title: 'Vérification',
        otp_subtitle: 'Entrez le code envoyé à votre adresse email',
        verification_success: 'Inscription réussie — redirection…',
        create_account_btn: 'Créer mon compte',

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
        title_notifications: 'Vos Alertes',
        local_languages: 'Langues Locales',
        local_languages_desc: 'Sélectionnez les langues locales que vous maîtrisez.',
        select_local_langs: 'Sélectionner vos langues',
        save_prefs: 'Enregistrer les préférences',
        settings_updated: 'Paramètres mis à jour',

        // About & Analytics keys
        about_mission_eyebrow: 'Notre mission',
        about_mission_title: 'Accompagner chaque exploitation vers une agriculture de précision accessible',
        about_mission_subtitle: 'Agri Orbit réunit ingénieurs et agronomes pour rendre l’imagerie satellite actionnable.',
        about_stat_ha: 'Parcelles suivies',
        about_stat_countries: 'Pays répartis',
        about_stat_time: 'Temps moyen d’analyse',
        about_founder_vision: 'La Vision du Dr. Castro',
        analytics_hero_eyebrow: 'Suite analytique',
        analytics_hero_title: 'Des tableaux de bord IA au service de vos cultures',
        analytics_hero_subtitle: 'Fusionnez imagerie satellite, météo et historiques pour générer des projections.',
        analytics_expert_title: 'L’expertise derrière les algorithmes',
        analytics_export_title: 'Automatisez vos exports et reporting',
        footer_cta_heading: 'Prêt à révolutionner votre exploitation ?',
        footer_cta_text: 'Rejoignez les leaders de l’agriculture de précision et boostez vos rendements.',
        footer_cta_button: 'Commencer maintenant',
        footer_blog: 'Blog',
        Personnel: 'Personnel',
        System: 'Système',
        Assistance: 'Assistance',

        why_us_tag: 'Pourquoi nous choisir',
        why_us_title: 'Une plateforme pensée pour les organisations agricoles exigeantes',
        why_us_desc: 'Nous combinons excellence technologique, gouvernance des données et expertise agronomique.',
        why_us_title_1: 'Intégration API ouverte',
        why_us_desc_1: 'Connectez vos ERP agricoles et outils BI via des APIs sécurisées.',
        why_us_title_2: 'Gouvernance des données',
        why_us_desc_2: 'Infrastructure hébergée dans l’UE et conformité RGPD.',
        why_us_title_3: 'Accompagnement agronome',
        why_us_desc_3: 'Équipe d’agronomes data pour cadrer vos cas d’usage.',
        testi_quote: 'Grâce à Agri Orbit, nos équipes terrain anticipent les stress hydriques.',
        testi_role: 'Directrice Innovation, Coopérative AgriSun',
        demo_title: 'Prêt à connecter vos parcelles ?',
        demo_desc: 'Profitez d’une session guidée de 30 minutes avec un agronome.'
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
        cap_desc: 'A unified console that combines mapping, analytics, action plans, and reporting.',
        cap_card1_title: 'Real-time Mapping',
        cap_card1_desc: 'Sync your plots with satellite imagery.',
        cap_card2_title: 'Yield Modeling',
        cap_card2_desc: 'Combine weather and soil data to simulate harvests.',
        cap_card3_title: 'Proactive Health Monitoring',
        cap_card3_desc: 'Detect water stress and diseases before symptoms.',

        // Home - Methodology
        methodo_tag: 'Methodology',
        methodo_title: 'A complete chain, from data to field action',
        methodo_desc: 'Every step is automated and documented.',
        methodo_step1: 'Import a Zone',
        methodo_step1_desc: 'Define your plot boundaries.',
        methodo_step2: 'Analyze Images',
        methodo_step2_desc: 'Our engine merges satellite and weather data.',
        methodo_step3: 'Decide & Act',
        methodo_step3_desc: 'Access agronomic recommendations.',

        // Home - Founder
        founder_tag: 'Project Origin',
        founder_title: 'An idea born from science and passion',
        founder_quote: '"Agri Orbit is a promise made to the agriculture of tomorrow."',
        founder_badge: 'The Visionary',
        founder_signature: 'Founder & Project Director',

        // Home - Impact
        impact_tag: 'Measured Impact',
        impact_title: 'Management based on reliable indicators',
        impact_desc: 'Our dashboards deliver reliable and actionable KPIs.',
        impact_metric1: 'average yield increase',
        impact_metric2: 'satellite detection accuracy',
        impact_metric3: 'health alert precision',

        // Home - Testimonials
        testi_tag: 'Client Testimonial',
        testi_metric1: 'Input Savings',
        testi_metric2: 'Relevant Alerts',
        testi_metric3: 'Field Adoption',
        testi_form_tag: 'Your opinion matters',
        testi_form_title: 'Using Agri Orbit?',
        testi_form_desc: 'Share your experience.',
        testi_form_cta: 'Write a Testimonial',
        testi_form_submit: 'Publish my testimonial',
        testi_form_success_title: 'Thank you!',
        testi_form_success_desc: 'Your testimonial has been sent.',

        // Auth
        login_title: 'Login',
        login_subtitle: 'Secure Authentication',
        email_label: 'Email',
        email_placeholder: 'your@email.com',
        password_label: 'Password',
        password_placeholder: '••••••••',
        remember_me: 'Remember me',
        forgot_password: 'Forgot password?',
        login_submit: 'Login',
        or_continue_with: 'or continue with',
        no_account: 'No account yet?',
        create_account_link: 'Create an account',
        register_title: 'Register',
        register_subtitle: 'Join the AgriOrbit revolution',
        firstname: 'First Name',
        lastname: 'Last Name',
        confirm_password: 'Confirm Password',
        organisation: 'Organization',
        agree_terms: 'I agree to the terms and conditions',
        already_member: 'Already a member?',
        login_link: 'Login',
        forgot_password_title: 'Forgot Password',
        forgot_password_subtitle: 'Enter your email to reset your password',
        reset_password_submit: 'Send link',
        back_to_login: 'Back to login',
        resend_code: 'Resend code',
        otp_title: 'Verification',
        otp_subtitle: 'Enter the code sent to your email',
        verification_success: 'Registration successful — redirecting…',
        create_account_btn: 'Create my account',

        // Footer
        footer_tagline: 'Data & agronomy at the service of the field.',
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
        profile_desc: 'Manage your information.',
        notifications: 'Notifications',
        notifications_desc: 'Stay informed.',
        language: 'Interface Language',
        language_desc: 'Choose your preferred language.',
        email_notif: 'Email Notifications',
        email_notif_desc: 'Receive a weekly summary.',
        privacy: 'Data Privacy',
        privacy_desc: 'Manage visibility.',
        subscription: 'Subscription',
        subscription_desc: 'Expert Plan.',
        logout: 'Logout',
        change: 'Edit',
        select_lang: 'Select language',
        title_explorer: 'Field Explorer',
        title_analytics: 'Agronomic Analytics',
        title_about: 'About Us',
        title_contact: 'Contact Us',
        title_solutions: 'Solutions Hub',
        title_notifications: 'Your Alerts',
        local_languages: 'Local Languages',
        local_languages_desc: 'Select the local languages.',
        select_local_langs: 'Select your languages',
        save_prefs: 'Save Preferences',
        settings_updated: 'Settings updated',

        // About & Analytics keys
        about_mission_eyebrow: 'Our Mission',
        about_mission_title: 'Accompanying every farm towards accessible precision agriculture',
        about_mission_subtitle: 'Agri Orbit brings together engineers and agronomists to make satellite imagery actionable.',
        about_stat_ha: 'Plots monitored',
        about_stat_countries: 'Countries covered',
        about_stat_time: 'Average analysis time',
        about_founder_vision: 'Dr. Castro\'s Vision',
        analytics_hero_eyebrow: 'Analytics Suite',
        analytics_hero_title: 'AI Dashboards at the service of your crops',
        analytics_hero_subtitle: 'Merge satellite imagery, weather and history to generate projections.',
        analytics_expert_title: 'The expertise behind the algorithms',
        analytics_export_title: 'Automate your exports and reporting',
        footer_cta_heading: 'Ready to revolutionize your farm?',
        footer_cta_text: 'Join the leaders in precision agriculture and boost your yields.',
        footer_cta_button: 'Start Now',
        footer_blog: 'Blog',
        Personnel: 'Personal',
        System: 'System',
        Assistance: 'Support',

        why_us_tag: 'Why choose us',
        why_us_title: 'A platform built for demanding agricultural organizations',
        why_us_desc: 'We combine technological excellence, data governance, and agronomic expertise.',
        why_us_title_1: 'Open API Integration',
        why_us_desc_1: 'Connect your tools via secure APIs.',
        why_us_title_2: 'Data Governance',
        why_us_desc_2: 'EU-hosted infrastructure and GDPR compliance.',
        why_us_title_3: 'Agronomic Support',
        why_us_desc_3: 'Data agronomists team to guide your use cases.',
        testi_quote: 'Agri Orbit helps our teams anticipate water stress.',
        testi_role: 'Innovation Director, AgriSun Cooperative',
        demo_title: 'Ready to connect your plots?',
        demo_desc: 'Enjoy a 30-minute guided session with an agronomist.'
    },
    pulaar: {
        // Navbar
        nav_home: 'Gallé on',
        nav_explorer: 'Jiilotooɗo on',
        nav_analytics: 'Kalaas on',
        nav_solutions: 'Pewje ɗen',
        nav_about: 'Fi men',
        nav_contact: 'Heɓe men',
        nav_login: 'Ubbital kont',
        nav_logout: 'Uddugol kont',
        brand_subtitle: 'GANDAL E NDEMA CELLUƊA',

        // Home - Hero
        hero_eyebrow: 'Pewje mawɗe ngam ndema on',
        hero_title: 'Rewinda ndema mon e karallaagal kesal',
        hero_subtitle: 'Agri Orbit no hawra kabaaruuji asamaan e leydi ngam wallude ndema on.',
        hero_cta: 'Ndeer li woni ɗon',
        hero_secondary: 'Holla no ɗum huutorante',
        hero_chip_esa: 'Gollidiiɓe ESA',
        hero_chip_iso: 'ISO 27001 no laawol',
        hero_chip_eu: 'Infrastructure UE',
        hero_ndvi_status: 'Gollal lobbal e gese men.',

        // Home - Capabilities
        cap_tag: 'Ko on mbaawi waɗde',
        cap_title: 'Kureel ngam laamude ndema mon',
        cap_desc: 'Pewje sappo e jowee-nay ngam rewinda gese ɗen e ndema on.',
        cap_card1_title: 'Nataalji e saasi',
        cap_card1_desc: 'Ndaaral gese mon e nataalji asamaan kala saasi.',
        cap_card2_title: 'Miylo e meññeef on',
        cap_card2_desc: 'Hawre gandal e asamaan ngir anndude ko meññata.',
        cap_card3_title: 'Rewinda cellal ndema',
        cap_card3_desc: 'Anndude rafiiji e boneeji hade ɗum hewde.',

        // Home - Methodology
        methodo_tag: 'No men ngollirta',
        methodo_title: 'Gollal timmungal',
        methodo_desc: 'Kala gollal no timmi.',
        methodo_step1: 'Suɓo gesa',
        methodo_step1_desc: 'Winndu ɗo gesa maa woni.',
        methodo_step2: 'Ndaar nataalji',
        methodo_step2_desc: 'Karallaagal men no hawra nataalji e asamaan.',
        methodo_step3: 'Feewnu e gollu',
        methodo_step3_desc: 'Ubit gite maa e wasiyaaji men.',

        // Home - Founder
        founder_tag: 'Ko addi gollal ngal',
        founder_title: 'Miylo ummiingo e gandal',
        founder_quote: '"Agri Orbit wonaa karallaagal tun, ko fii ndema jaŋngo."',
        founder_badge: 'Hooreejo on',
        founder_signature: 'Hooreejo gollal ngal',

        // Home - Impact
        impact_tag: 'Ko men ngolli',
        impact_title: 'Ardungal lobbal e ndema on',
        impact_desc: 'Gollal men no woodi ngam ndema on.',
        impact_metric1: 'yokkuté e ndema on',
        impact_metric2: 'nataalji asamaan',
        impact_metric3: 'anndude rafiiji e saasi',

        // Home - Testimonials
        testi_tag: 'Ko ɓe nattali',
        testi_metric1: 'Dencu alal',
        testi_metric2: 'Habaruuji goonga',
        testi_metric3: 'Ndema gese ɗen',
        testi_form_tag: 'Miylo maa no jogi solo',
        testi_form_title: 'Mbe on ngollida e Agri Orbit?',
        testi_form_desc: 'Nattali ko on nganndi.',
        testi_form_cta: 'Winndu miylo maa',
        testi_form_submit: 'Nul ɗum',
        testi_form_success_title: 'Jaaraama!',
        testi_form_success_desc: 'Men keɓii miylo maa.',

        // Auth
        login_title: 'Ubbital kont',
        login_subtitle: 'Kisatal gollal ngal',
        email_label: 'Email',
        email_placeholder: 'email_maa@ndema.com',
        password_label: 'Sariya',
        password_placeholder: '••••••••',
        remember_me: 'Annditu mi',
        forgot_password: 'Mi yejjitii sariya on?',
        login_submit: 'Ubbital kont',
        or_continue_with: 'walla jokkal e',
        no_account: 'A walaa kont tawo?',
        create_account_link: 'Suɓo kont keso',
        register_title: 'Suɓagol kont',
        register_subtitle: 'Naatu e AgriOrbit ngam ndema mon',
        firstname: 'Innde',
        lastname: 'Yettoode',
        confirm_password: 'Tabitinu sariya on',
        organisation: 'Gollirde',
        agree_terms: 'Mi jaɓii sariyaaji ɗin',
        already_member: 'A ɗon jogii kont?',
        login_link: 'Ubbital kont',
        forgot_password_title: 'Sariya yejjitaaɗo',
        forgot_password_subtitle: 'Winndu email maa ngam heɓude sariya keso',
        reset_password_submit: 'Nul ɗum',
        back_to_login: 'Rutto e ubbital',
        resend_code: 'Nul kadi code on',
        otp_title: 'Tabitinal',
        otp_subtitle: 'Winndu code nul-ɗaa e email maa',
        verification_success: 'Ubbital yoodi — redirection…',
        create_account_btn: 'Suɓo mon kont',

        // Footer
        footer_tagline: 'Karallaagal e ndema ngam ndema kala.',
        footer_platform: 'Ko men ngolli',
        footer_carto: 'Nataalji ɗin',
        footer_ia: 'Karallaagal ngal',
        footer_reports: 'Kabaaruuji ɗin',
        footer_company: 'Suudu ndun',
        footer_careers: 'Gollal',
        footer_help: 'Ballaal',
        footer_doc: 'Kayitaaji ɗin',
        footer_status: 'No gollal ngal yahrata',
        footer_legal: 'Sariyaaji ɗin',
        footer_privacy: 'Sutura',
        footer_security: 'Kisatal',
        footer_rights: 'Foppi ko men njogi.',

        // Settings & Profile
        settings: 'Feewnu mboolo',
        settings_desc: 'Waylu kabaaruuji maa e Agri Orbit.',
        profile: 'Kont am',
        profile_desc: 'Ndaaral mboolo maa e gollal maa.',
        notifications: 'Kabaaruuji ɗin',
        notifications_desc: 'Anndu ko woni e gese ɗen.',
        language: 'Ɗemngal ngal',
        language_desc: 'Suɓo ɗemngal ngal njiɗ-ɗaa.',
        email_notif: 'Kabaaru e email',
        email_notif_desc: 'Heɓe kabaaruuji kala yontere.',
        privacy: 'Sutura mboolo',
        privacy_desc: 'Ndaaral ɓeen ndaarooji kabaaruuji maa.',
        subscription: 'Abonoma',
        subscription_desc: 'Abonoma mawɗo.',
        local_languages: 'Ɗemɗe men',
        local_languages_desc: 'Suɓo ɗemngal ngal nanal-ɗaa.',
        settings_updated: 'Waylaama ko njiɗ-ɗaa',
        logout: 'Uddu kont bi',
        change: 'Waylu',
        select_lang: 'Suɓo ɗemngal',

        // Titles
        title_explorer: 'Jiilotooɗo Gese ɗen',
        title_analytics: 'Kalaas Ndema on',
        title_about: 'Fi men',
        title_contact: 'Heɓe men',
        title_solutions: 'Pewje ɗen',
        title_notifications: 'Kabaaruuji maa',
        why_us_tag: 'Fi ko suɓir-ɗaa men',
        why_us_title: 'Pewje mawɗe ngam mboolo ndema on',
        why_us_desc: 'Men no kawra karallaagal e gandal.',
        why_us_title_1: 'Gollal ubbital',
        why_us_desc_1: 'Gollide e gollirɗe maa.',
        why_us_title_2: 'Rewinda kabaaruuji',
        why_us_desc_2: 'Infrastructure e UE e sutura.',
        why_us_title_3: 'Wallude ndema on',
        why_us_desc_3: 'Hawre e gandal ndema.',
        testi_quote: 'Agri Orbit wallii men e rewinda gese ɗen.',
        testi_role: 'Hooreejo gollal, AgriSun',
        demo_title: 'Mbe on njiɗi gollide e men?',
        demo_desc: 'Waɗu gollal e men e 30 minitu.'
    }
};

export function LanguageProvider({ children }) {
    // Initialisation intelligente de la langue
    const getInitialLanguage = () => {
        const savedLang = localStorage.getItem('agri_orbit_lang');
        if (savedLang) return savedLang;

        // Par défaut, on force le français pour une expérience localisée cohérente
        return 'fr';
    };

    const [lang, setLang] = useState(getInitialLanguage());

    // Synchronisation avec le localStorage et l'attribut 'lang' du document
    useEffect(() => {
        localStorage.setItem('agri_orbit_lang', lang);
        document.documentElement.lang = lang;
    }, [lang]);

    const t = (key) => {
        // Tentative de traduction dans la langue choisie, sinon fallback en français, sinon clé
        return (translations[lang] && translations[lang][key]) ||
            (translations['fr'] && translations['fr'][key]) ||
            key;
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
