import { useState } from 'react';
import { DocumentArrowDownIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import '../styles/download.css';

function TechDownload() {
  const [downloadStatus, setDownloadStatus] = useState('idle'); // idle, downloading, success

  const downloadFile = () => {
    setDownloadStatus('downloading');
    
    // Créer un lien temporaire pour télécharger le fichier
    const link = document.createElement('a');
    link.href = '/fiche-technique-agri-orbit.html';
    link.download = 'Fiche-Technique-Agri-Orbit-2026.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Simuler le succès
    setTimeout(() => {
      setDownloadStatus('success');
      setTimeout(() => setDownloadStatus('idle'), 2000);
    }, 500);
  };

  const downloadPDF = () => {
    setDownloadStatus('downloading');
    
    // Ouvrir le fichier pour impression/export PDF
    const newWindow = window.open('/fiche-technique-agri-orbit.html', '_blank');
    if (newWindow) {
      newWindow.addEventListener('load', () => {
        setTimeout(() => {
          newWindow.print();
          setDownloadStatus('success');
          setTimeout(() => setDownloadStatus('idle'), 2000);
        }, 500);
      });
    }
  };

  return (
    <div className="tech-download-container">
      <div className="download-card glass-panel">
        <div className="download-icon">
          <DocumentArrowDownIcon className="icon" />
        </div>

        <h2>Télécharger une fiche technique</h2>
        <p className="download-subtitle">
          Obtenez tous les détails techniques sur Agri Orbit Analytics
        </p>

        <div className="download-content">
          <div className="feature-list">
            <div className="feature">
              <span className="check">✓</span>
              <span>Architecture technique complète</span>
            </div>
            <div className="feature">
              <span className="check">✓</span>
              <span>Spécifications et performances</span>
            </div>
            <div className="feature">
              <span className="check">✓</span>
              <span>Intégrations disponibles</span>
            </div>
            <div className="feature">
              <span className="check">✓</span>
              <span>Conformité et certifications</span>
            </div>
            <div className="feature">
              <span className="check">✓</span>
              <span>Roadmap et développement</span>
            </div>
            <div className="feature">
              <span className="check">✓</span>
              <span>Contacts support technique</span>
            </div>
          </div>
        </div>

        <div className="download-actions">
          <button
            onClick={downloadFile}
            className={`btn-download btn-html ${downloadStatus}`}
            disabled={downloadStatus !== 'idle'}
          >
            {downloadStatus === 'idle' && (
              <>
                <DocumentArrowDownIcon className="btn-icon" />
                Télécharger (HTML)
              </>
            )}
            {downloadStatus === 'downloading' && (
              <>
                <span className="spinner"></span>
                Téléchargement...
              </>
            )}
            {downloadStatus === 'success' && (
              <>
                <CheckCircleIcon className="btn-icon" />
                Téléchargé ✓
              </>
            )}
          </button>

          <button
            onClick={downloadPDF}
            className={`btn-download btn-pdf ${downloadStatus}`}
            disabled={downloadStatus !== 'idle'}
          >
            {downloadStatus === 'idle' && (
              <>
                <DocumentArrowDownIcon className="btn-icon" />
                Exporter en PDF
              </>
            )}
            {downloadStatus === 'downloading' && (
              <>
                <span className="spinner"></span>
                Préparation...
              </>
            )}
            {downloadStatus === 'success' && (
              <>
                <CheckCircleIcon className="btn-icon" />
                Exporté ✓
              </>
            )}
          </button>
        </div>

        <p className="download-note">
          📄 Fichier complet (10 pages) • PDF imprimable • À jour Janvier 2026
        </p>
      </div>
    </div>
  );
}

export default TechDownload;
