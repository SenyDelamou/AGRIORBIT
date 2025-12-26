import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

const DEFAULT_DURATION = 6000;
const ToastContext = createContext(null);

const createId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const timersRef = useRef(new Map());

    const clearTimer = useCallback((id) => {
        const timer = timersRef.current.get(id);
        if (timer) {
            clearTimeout(timer);
            timersRef.current.delete(id);
        }
    }, []);

    const removeNotification = useCallback((id) => {
        clearTimer(id);
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    }, [clearTimer]);

    useEffect(() => {
        return () => {
            timersRef.current.forEach((timer) => clearTimeout(timer));
            timersRef.current.clear();
        };
    }, []);

    const registerAutoDismiss = useCallback((id, duration) => {
        if (!Number.isFinite(duration) || duration <= 0) {
            return;
        }
        const timerId = window.setTimeout(() => {
            timersRef.current.delete(id);
            setNotifications((prev) => prev.filter((notification) => notification.id !== id));
        }, duration);
        timersRef.current.set(id, timerId);
    }, []);

    const pushNotification = useCallback((input, legacyType, legacyDuration) => {
        const payload = typeof input === 'string'
            ? { message: input, type: legacyType, duration: legacyDuration }
            : (input ?? {});

        const id = payload.id ?? createId();
        const type = payload.type ?? 'info';
        const duration = typeof payload.duration === 'number' ? payload.duration : DEFAULT_DURATION;
        const title = payload.title ?? null;
        const message = payload.message ?? '';
        const description = payload.description ?? null;
        const meta = payload.meta ?? undefined;

        const notification = {
            id,
            type,
            title,
            message,
            description,
            duration,
            meta,
            createdAt: Date.now()
        };

        setNotifications((prev) => [...prev, notification]);
        registerAutoDismiss(id, duration);

        return id;
    }, [registerAutoDismiss]);

    const showToast = useCallback((message, type = 'info', options) => {
        if (typeof options === 'number') {
            return pushNotification({ message, type, duration: options });
        }
        return pushNotification({ message, type, ...(options || {}) });
    }, [pushNotification]);

    const addToast = useCallback((message, type = 'info', options) => {
        if (typeof options === 'number') {
            return pushNotification({ message, type, duration: options });
        }
        return pushNotification({ message, type, ...(options || {}) });
    }, [pushNotification]);

    const contextValue = {
        notifications,
        toasts: notifications,
        pushNotification,
        addToast,
        showToast,
        removeNotification,
        removeToast: removeNotification
    };

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
        </ToastContext.Provider>
    );
};
