import { useState, useEffect } from 'react';
import '../styles/loading.css';

/**
 * Simple loading spinner component for auth state checks
 * No auto-redirect - just shows a loading state
 */
function LoadingSpinner() {
    return (
        <div className="loading-page">
            <div className="loading-card glass-panel">
                <div className="loading-indicator" role="status" aria-live="polite">
                    <div className="orbit-ring ring-1"></div>
                    <div className="orbit-ring ring-2"></div>
                    <div className="orbit-ring ring-3"></div>
                    <div className="loading-core">
                        <div className="core-pulse"></div>
                    </div>
                    <div className="satellite-track track-1">
                        <span className="satellite" />
                    </div>
                    <div className="satellite-track track-2">
                        <span className="satellite" />
                    </div>
                </div>
                <p className="loading-note">Chargement en cours...</p>
            </div>
        </div>
    );
}

export default LoadingSpinner;
