import { useMemo } from 'react';
import { useToast } from '../context/ToastContext';
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import '../styles/notifications.css';

const ICON_MAP = {
    success: CheckCircleIcon,
    error: ExclamationTriangleIcon,
    warning: ExclamationTriangleIcon,
    info: InformationCircleIcon
};

const COLOR_MAP = {
    success: '#22c55e',
    error: '#ef4444',
    warning: '#f97316',
    info: '#38bdf8'
};

const formatTimestamp = (createdAt) => {
    if (!createdAt) return '';
    const diff = Date.now() - createdAt;
    if (diff < 0) return '';
    if (diff < 1000) return "À l'instant";
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return `${seconds}s`; 
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days} j`;
};

function ToastContainer() {
    const { notifications, removeNotification } = useToast();

    const orderedNotifications = useMemo(
        () => notifications.slice(-5).reverse(),
        [notifications]
    );

    if (orderedNotifications.length === 0) return null;

    return (
        <div className="notification-stack" role="status" aria-live="polite">
            {orderedNotifications.map((notification) => {
                const Icon = ICON_MAP[notification.type] ?? InformationCircleIcon;
                const accentColor = COLOR_MAP[notification.type] ?? COLOR_MAP.info;
                const duration = notification.duration ?? 0;

                return (
                    <article
                        key={notification.id}
                        className={`notification-card ${notification.type}`}
                        style={{ '--notification-duration': `${duration}ms` }}
                        data-type={notification.type}
                    >
                        <span
                            className="notification-accent"
                            style={{ background: accentColor }}
                            aria-hidden="true"
                        />
                        <div className="notification-icon-wrapper" style={{ color: accentColor }}>
                            <Icon className="notification-icon" />
                        </div>
                        <div className="notification-content">
                            {notification.title && (
                                <p className="notification-title">{notification.title}</p>
                            )}
                            <p className="notification-message">{notification.message}</p>
                            {notification.description && (
                                <p className="notification-description">{notification.description}</p>
                            )}
                            <span className="notification-timestamp">
                                {formatTimestamp(notification.createdAt)}
                            </span>
                        </div>
                        <button
                            type="button"
                            className="notification-dismiss"
                            aria-label="Fermer la notification"
                            onClick={() => removeNotification(notification.id)}
                        >
                            <XMarkIcon className="notification-dismiss-icon" />
                        </button>
                        {duration > 0 && (
                            <span
                                className="notification-progress"
                                style={{ background: accentColor }}
                                aria-hidden="true"
                            />
                        )}
                    </article>
                );
            })}
        </div>
    );
}

export default ToastContainer;
