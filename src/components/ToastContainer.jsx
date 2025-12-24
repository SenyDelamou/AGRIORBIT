import { useToast } from '../context/ToastContext';
import '../styles/global.css'; // Ensure we have base styles or create new ones

function ToastContainer() {
    const { toasts, removeToast } = useToast();

    if (toasts.length === 0) return null;

    return (
        <div style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            zIndex: 2000,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            pointerEvents: 'none'
        }}>
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    style={{
                        background: 'var(--surface-color, rgba(17, 24, 39, 0.85))',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderLeft: `4px solid ${toast.type === 'success' ? '#10b981' :
                                toast.type === 'error' ? '#ef4444' :
                                    '#3b82f6'
                            }`,
                        color: 'white',
                        padding: '1rem 1.2rem',
                        borderRadius: '0.5rem',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        minWidth: '300px',
                        animation: 'slideIn 0.3s ease-out',
                        pointerEvents: 'all',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                        {toast.message}
                    </div>
                    <button
                        onClick={() => removeToast(toast.id)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'rgba(255, 255, 255, 0.5)',
                            cursor: 'pointer',
                            marginLeft: '1rem',
                            padding: '0.2rem'
                        }}
                    >
                        ✕
                    </button>
                </div>
            ))}
            <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
        </div>
    );
}

export default ToastContainer;
