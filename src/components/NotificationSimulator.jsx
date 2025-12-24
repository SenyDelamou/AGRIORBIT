import { useEffect } from 'react';
import { useToast } from '../context/ToastContext';

const NOTIFICATIONS = [
    { message: "Satellite Sentinel-2 : Nouvelles données disponibles", type: "info" },
    { message: "Alerte Météo : Risque de sécheresse zone nord", type: "error" },
    { message: "Analyse terminée : Parcelle #12A", type: "success" },
    { message: "Marché : Le cours du cacao a augmenté de 1.2%", type: "info" },
    { message: "Maintenance planifiée ce soir à 23h00", type: "info" }
];

function NotificationSimulator() {
    const { addToast } = useToast();

    useEffect(() => {
        // Initial welcome toast
        const t0 = setTimeout(() => {
            addToast("Bienvenue sur Agri Orbit v2.0", "success");
        }, 1000);

        // Random toasts loop
        const interval = setInterval(() => {
            if (Math.random() > 0.6) { // 40% chance every 15s
                const randomNotif = NOTIFICATIONS[Math.floor(Math.random() * NOTIFICATIONS.length)];
                addToast(randomNotif.message, randomNotif.type);
            }
        }, 15000);

        return () => {
            clearTimeout(t0);
            clearInterval(interval);
        };
    }, [addToast]);

    return null; // Logic only component
}

export default NotificationSimulator;
