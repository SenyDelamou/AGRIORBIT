import { useEffect, useRef } from 'react';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

const NOTIFICATIONS = [
    { message: "Satellite Sentinel-2 : Nouvelles données disponibles", type: "info" },
    { message: "Alerte Météo : Risque de sécheresse zone nord", type: "error" },
    { message: "Analyse terminée : Parcelle #12A", type: "success" },
    { message: "Marché : Le cours du cacao a augmenté de 1.2%", type: "info" },
    { message: "Maintenance planifiée ce soir à 23h00", type: "info" }
];

function NotificationSimulator() {
    const { addToast } = useToast();
    const { user } = useAuth();
    const timersRef = useRef({ initial: null, loop: null });

    useEffect(() => {
        if (!user) {
            if (timersRef.current.initial) {
                clearTimeout(timersRef.current.initial);
            }
            if (timersRef.current.loop) {
                clearInterval(timersRef.current.loop);
            }
            timersRef.current = { initial: null, loop: null };
            return undefined;
        }

        const welcomeMessage = user?.name
            ? `Heureux de vous revoir, ${user.name} !`
            : 'Bienvenue sur Agri Orbit v2.0';

        const initial = window.setTimeout(() => {
            addToast({
                title: 'Connexion réussie',
                message: welcomeMessage,
                type: 'success'
            });
        }, 800);

        const loop = window.setInterval(() => {
            if (Math.random() > 0.6) { // 40% chance every 15s
                const randomNotif = NOTIFICATIONS[Math.floor(Math.random() * NOTIFICATIONS.length)];
                addToast({
                    title: 'Centre de notifications',
                    message: randomNotif.message,
                    type: randomNotif.type,
                    duration: 7000
                });
            }
        }, 15000);

        timersRef.current = { initial, loop };

        return () => {
            clearTimeout(initial);
            clearInterval(loop);
            timersRef.current = { initial: null, loop: null };
        };
    }, [user, addToast]);

    return null; // Logic only component
}

export default NotificationSimulator;
