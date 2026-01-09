import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Service pour générer et envoyer des rapports agronomiques
 */

/**
 * Génère un rapport PDF avec les données des parcelles
 * @param {Array} parcellesData - Données des parcelles
 * @param {Object} stats - Statistiques globales
 * @param {string} fileName - Nom du fichier PDF
 */
export const generatePDFReport = async (parcellesData, stats, fileName = 'Rapport_AgriOrbit') => {
  try {
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = 15;

    // En-tête du rapport
    pdf.setFontSize(24);
    pdf.setTextColor(56, 189, 248);
    pdf.text('📊 Rapport AgriOrbit', pageWidth / 2, yPosition, { align: 'center' });

    yPosition += 15;
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Généré le: ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}`, pageWidth / 2, yPosition, { align: 'center' });

    // Ligne séparatrice
    yPosition += 8;
    pdf.setDrawColor(200, 200, 200);
    pdf.line(10, yPosition, pageWidth - 10, yPosition);

    // Statistiques Globales
    yPosition += 10;
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text('STATISTIQUES GLOBALES', 10, yPosition);

    yPosition += 10;
    pdf.setFontSize(10);
    const statsText = [
      `• Parcelles actives: ${stats.totalParcelles}`,
      `• Surface totale: ${stats.totalSurface.toFixed(1)} ha`,
      `• Rendement moyen: ${stats.rendementMoyen} q/ha`,
      `• Santé moyenne: ${stats.santeMoyenne}%`,
      `• NDVI moyen: ${stats.ndviMoyen}`,
      `• Stress Nul: ${stats.stressCount.nul} | Faible: ${stats.stressCount.faible} | Modéré: ${stats.stressCount.modere} | Élevé: ${stats.stressCount.eleve}`
    ];

    statsText.forEach(text => {
      pdf.text(text, 10, yPosition);
      yPosition += 6;
    });

    // Tableau des parcelles
    yPosition += 5;
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text('DÉTAIL DES PARCELLES', 10, yPosition);

    yPosition += 8;
    pdf.setFontSize(9);

    // En-têtes du tableau
    const tableHeaders = ['ID', 'Parcelle', 'Culture', 'Stade', 'NDVI', 'Stress', 'Rendement', 'Santé', 'Humidité', 'Température', 'pH', 'Recommandation'];
    const colWidths = [8, 15, 12, 12, 10, 12, 12, 10, 12, 14, 8, 30];
    let xPosition = 10;

    // En-têtes
    pdf.setTextColor(56, 189, 248);
    pdf.setFont(undefined, 'bold');
    tableHeaders.forEach((header, i) => {
      pdf.text(header, xPosition, yPosition);
      xPosition += colWidths[i];
    });

    // Ligne séparatrice
    yPosition += 2;
    pdf.setDrawColor(200, 200, 200);
    pdf.line(10, yPosition, pageWidth - 10, yPosition);

    // Données des parcelles
    yPosition += 5;
    pdf.setTextColor(0, 0, 0);
    pdf.setFont(undefined, 'normal');

    parcellesData.forEach((parcelle, index) => {
      // Vérifier si on doit créer une nouvelle page
      if (yPosition > pageHeight - 15) {
        pdf.addPage();
        yPosition = 15;
      }

      xPosition = 10;
      const rowData = [
        parcelle.id,
        parcelle.nom,
        parcelle.culture,
        parcelle.stade,
        parcelle.ndvi.toFixed(2),
        parcelle.stress,
        `${parcelle.rendement} q/ha`,
        parcelle.sante,
        `${parcelle.humidite}%`,
        `${parcelle.temperature}°C`,
        parcelle.ph.toFixed(1),
        parcelle.recommandation
      ];

      rowData.forEach((data, i) => {
        // Texte réduit pour les colonnes longues
        let displayText = String(data);
        if (i === 11) { // Recommandation
          displayText = displayText.substring(0, 25);
        }
        pdf.text(displayText, xPosition, yPosition, { maxWidth: colWidths[i] - 1 });
        xPosition += colWidths[i];
      });

      yPosition += 6;

      // Ligne séparatrice légère
      if (index % 2 === 0) {
        pdf.setDrawColor(240, 240, 240);
        pdf.line(10, yPosition - 1, pageWidth - 10, yPosition - 1);
      }
    });

    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.text('AgriOrbit - Plateforme d\'analyse agronomique', pageWidth / 2, pageHeight - 5, { align: 'center' });

    // Télécharger le PDF
    pdf.save(`${fileName}_${new Date().toISOString().split('T')[0]}.pdf`);
    return true;
  } catch (error) {
    console.error('Erreur lors de la génération du PDF:', error);
    throw error;
  }
};

/**
 * Envoie le rapport par email
 * @param {string} email - Email du destinataire
 * @param {Array} parcellesData - Données des parcelles
 * @param {Object} stats - Statistiques globales
 */
export const sendReportByEmail = async (email, parcellesData, stats) => {
  try {
    const response = await fetch('/api/send-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        subject: `Rapport AgriOrbit - ${new Date().toLocaleDateString('fr-FR')}`,
        parcelles: parcellesData,
        stats,
        date: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'envoi du rapport');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur lors de l\'envoi du rapport par email:', error);
    throw error;
  }
};

/**
 * Génère un rapport HTML pour aperçu
 * @param {Array} parcellesData - Données des parcelles
 * @param {Object} stats - Statistiques globales
 */
export const generateHTMLReport = (parcellesData, stats) => {
  const now = new Date();
  const dateStr = now.toLocaleDateString('fr-FR');
  const timeStr = now.toLocaleTimeString('fr-FR');

  let html = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Rapport AgriOrbit</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #f5f5f5;
          color: #333;
          line-height: 1.6;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          background: white;
          padding: 40px;
        }
        .header {
          text-align: center;
          margin-bottom: 40px;
          border-bottom: 3px solid #38BDF8;
          padding-bottom: 20px;
        }
        .header h1 {
          color: #38BDF8;
          font-size: 32px;
          margin-bottom: 10px;
        }
        .header p {
          color: #999;
          font-size: 14px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }
        .stat-box {
          background: linear-gradient(135deg, #38BDF8 0%, #22C55E 100%);
          color: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
        }
        .stat-box h3 {
          font-size: 14px;
          opacity: 0.9;
          margin-bottom: 10px;
        }
        .stat-box .value {
          font-size: 28px;
          font-weight: bold;
        }
        .stat-box .detail {
          font-size: 12px;
          opacity: 0.8;
          margin-top: 5px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 30px;
        }
        table h2 {
          margin-bottom: 20px;
          color: #333;
          font-size: 18px;
        }
        thead {
          background: #38BDF8;
          color: white;
        }
        th {
          padding: 12px;
          text-align: left;
          font-weight: 600;
          border: 1px solid #ddd;
        }
        td {
          padding: 10px 12px;
          border: 1px solid #ddd;
          font-size: 13px;
        }
        tbody tr:nth-child(even) {
          background: #f9f9f9;
        }
        tbody tr:hover {
          background: #f0f8ff;
        }
        .badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
        }
        .badge-good {
          background: #D1FAE5;
          color: #065F46;
        }
        .badge-warning {
          background: #FEF3C7;
          color: #92400E;
        }
        .badge-danger {
          background: #FEE2E2;
          color: #7F1D1D;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          text-align: center;
          color: #999;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📊 Rapport AgriOrbit</h1>
          <p>Généré le ${dateStr} à ${timeStr}</p>
        </div>

        <div class="stats-grid">
          <div class="stat-box">
            <h3>Parcelles actives</h3>
            <div class="value">${stats.totalParcelles}</div>
            <div class="detail">Connectées et surveillées</div>
          </div>
          <div class="stat-box">
            <h3>Surface totale</h3>
            <div class="value">${stats.totalSurface.toFixed(1)} ha</div>
            <div class="detail">Exploitée en AgriOrbit</div>
          </div>
          <div class="stat-box">
            <h3>Rendement moyen</h3>
            <div class="value">${stats.rendementMoyen} q/ha</div>
            <div class="detail">Projection à maturité</div>
          </div>
        </div>

        <table>
          <caption style="text-align: left; margin-bottom: 15px; font-size: 16px; font-weight: 600;">DÉTAIL DES PARCELLES</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Parcelle</th>
              <th>Culture</th>
              <th>Stade</th>
              <th>NDVI</th>
              <th>Stress</th>
              <th>Rendement</th>
              <th>Santé</th>
              <th>Humidité</th>
              <th>Température</th>
              <th>Recommandation</th>
            </tr>
          </thead>
          <tbody>
  `;

  parcellesData.forEach(parcelle => {
    const stressClass = parcelle.stress === 'Nul' ? 'badge-good' : 
                       parcelle.stress === 'Faible' ? 'badge-good' :
                       parcelle.stress === 'Modéré' ? 'badge-warning' : 'badge-danger';
    
    html += `
      <tr>
        <td>${parcelle.id}</td>
        <td><strong>${parcelle.nom}</strong></td>
        <td>${parcelle.culture}</td>
        <td>${parcelle.stade}</td>
        <td>${parcelle.ndvi.toFixed(2)}</td>
        <td><span class="badge ${stressClass}">${parcelle.stress}</span></td>
        <td>${parcelle.rendement} q/ha</td>
        <td>${parcelle.sante}</td>
        <td>${parcelle.humidite}%</td>
        <td>${parcelle.temperature}°C</td>
        <td>${parcelle.recommandation}</td>
      </tr>
    `;
  });

  html += `
          </tbody>
        </table>

        <div class="footer">
          <p>AgriOrbit - Plateforme d'analyse agronomique | ${dateStr}</p>
          <p>Rapport confidentiel - Réservé à l'utilisateur</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return html;
};

/**
 * Exporte les données en CSV
 * @param {Array} parcellesData - Données des parcelles
 * @param {string} fileName - Nom du fichier
 */
export const exportToCSV = (parcellesData, fileName = 'rapport_agriOrbit') => {
  const headers = ['ID', 'Parcelle', 'Surface (ha)', 'Culture', 'Stade', 'NDVI', 'EVI', 'Stress', 'Rendement (q/ha)', 'Potentiel (q/ha)', 'Humidité (%)', 'Température (°C)', 'Précipitations (mm)', 'pH', 'Azote (N)', 'Phosphore (P)', 'Potassium (K)', 'Santé', 'Dernier scan', 'Tendance', 'Risque maladie', 'Recommandation'];
  
  let csv = headers.join(',') + '\n';

  parcellesData.forEach(parcelle => {
    const row = [
      parcelle.id,
      parcelle.nom,
      parcelle.surface,
      parcelle.culture,
      parcelle.stade,
      parcelle.ndvi,
      parcelle.evi,
      parcelle.stress,
      parcelle.rendement,
      parcelle.potentiel,
      parcelle.humidite,
      parcelle.temperature,
      parcelle.precipitations,
      parcelle.ph,
      parcelle.azote,
      parcelle.phosphore,
      parcelle.potassium,
      parcelle.sante,
      parcelle.derniereScan,
      parcelle.tendance,
      parcelle.risqueMaladie,
      `"${parcelle.recommandation}"`
    ];
    csv += row.join(',') + '\n';
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${fileName}_${new Date().toISOString().split('T')[0]}.csv`);
  link.click();
};
