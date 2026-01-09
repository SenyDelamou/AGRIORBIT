import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

/**
 * Graphique de tendance NDVI
 */
export const NDVITrendChart = ({ parcelles }) => {
  const data = {
    labels: parcelles.map(p => p.nom),
    datasets: [
      {
        label: 'NDVI',
        data: parcelles.map(p => p.ndvi),
        borderColor: '#22C55E',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: '#22C55E',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      },
      {
        label: 'EVI',
        data: parcelles.map(p => p.evi),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: { size: 12, weight: 'bold' }
        }
      },
      title: {
        display: true,
        text: 'Indices de Végétation par Parcelle',
        font: { size: 16, weight: 'bold' }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
        grid: { color: 'rgba(200, 200, 200, 0.1)' }
      },
      x: {
        grid: { display: false }
      }
    }
  };

  return <Line data={data} options={options} />;
};

/**
 * Graphique de rendement par culture
 */
export const RendementByCultureChart = ({ parcelles }) => {
  const cultureGroups = {};
  parcelles.forEach(p => {
    if (!cultureGroups[p.culture]) {
      cultureGroups[p.culture] = { count: 0, totalRendement: 0, avgSante: 0 };
    }
    cultureGroups[p.culture].count++;
    cultureGroups[p.culture].totalRendement += p.rendement;
    cultureGroups[p.culture].avgSante += parseInt(p.sante);
  });

  Object.keys(cultureGroups).forEach(culture => {
    cultureGroups[culture].avgRendement = Math.round(cultureGroups[culture].totalRendement / cultureGroups[culture].count);
    cultureGroups[culture].avgSante = Math.round(cultureGroups[culture].avgSante / cultureGroups[culture].count);
  });

  const data = {
    labels: Object.keys(cultureGroups),
    datasets: [
      {
        label: 'Rendement moyen (q/ha)',
        data: Object.values(cultureGroups).map(g => g.avgRendement),
        backgroundColor: [
          'rgba(56, 189, 248, 0.7)',
          'rgba(34, 197, 94, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(168, 85, 247, 0.7)'
        ],
        borderColor: [
          '#38BDF8',
          '#22C55E',
          '#F59E0B',
          '#EF4444',
          '#A855F7'
        ],
        borderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Rendement moyen par Culture',
        font: { size: 16, weight: 'bold' }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(200, 200, 200, 0.1)' }
      },
      x: {
        grid: { display: false }
      }
    }
  };

  return <Bar data={data} options={options} />;
};

/**
 * Graphique de distribution stress hydrique (Pie)
 */
export const StressDistributionChart = ({ stats }) => {
  const data = {
    labels: ['Nul', 'Faible', 'Modéré', 'Élevé'],
    datasets: [{
      data: [stats.stressCount.nul, stats.stressCount.faible, stats.stressCount.modere, stats.stressCount.eleve],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)'
      ],
      borderColor: [
        '#22C55E',
        '#3B82F6',
        '#F59E0B',
        '#EF4444'
      ],
      borderWidth: 2
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { padding: 15, font: { size: 11, weight: 'bold' } }
      },
      title: {
        display: true,
        text: 'Distribution du Stress Hydrique',
        font: { size: 16, weight: 'bold' }
      }
    }
  };

  return <Pie data={data} options={options} />;
};

/**
 * Graphique de santé globale (Doughnut)
 */
export const HealthDistributionChart = ({ parcelles }) => {
  const sante90plus = parcelles.filter(p => parseInt(p.sante) >= 90).length;
  const sante70to89 = parcelles.filter(p => parseInt(p.sante) >= 70 && parseInt(p.sante) < 90).length;
  const santeLess70 = parcelles.filter(p => parseInt(p.sante) < 70).length;

  const data = {
    labels: ['Excellent (≥90%)', 'Bon (70-89%)', 'À surveiller (<70%)'],
    datasets: [{
      data: [sante90plus, sante70to89, santeLess70],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)'
      ],
      borderColor: [
        '#22C55E',
        '#F59E0B',
        '#EF4444'
      ],
      borderWidth: 2
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { padding: 15, font: { size: 11, weight: 'bold' } }
      },
      title: {
        display: true,
        text: 'État de Santé des Parcelles',
        font: { size: 16, weight: 'bold' }
      }
    }
  };

  return <Doughnut data={data} options={options} />;
};

/**
 * Graphique de comparaison Rendement vs Potentiel
 */
export const RendementVsPotentialChart = ({ parcelles }) => {
  const data = {
    labels: parcelles.map(p => p.nom),
    datasets: [
      {
        label: 'Rendement actuel',
        data: parcelles.map(p => p.rendement),
        backgroundColor: 'rgba(56, 189, 248, 0.7)',
        borderColor: '#38BDF8',
        borderWidth: 1
      },
      {
        label: 'Potentiel',
        data: parcelles.map(p => p.potentiel),
        backgroundColor: 'rgba(34, 197, 94, 0.7)',
        borderColor: '#22C55E',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: { padding: 15, font: { size: 12, weight: 'bold' } }
      },
      title: {
        display: true,
        text: 'Rendement vs Potentiel par Parcelle',
        font: { size: 16, weight: 'bold' }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(200, 200, 200, 0.1)' }
      },
      x: {
        grid: { display: false }
      }
    }
  };

  return <Bar data={data} options={options} />;
};

/**
 * Graphique de santé par parcelle
 */
export const HealthByParcelleChart = ({ parcelles }) => {
  const data = {
    labels: parcelles.map(p => p.nom),
    datasets: [{
      label: 'Santé (%)',
      data: parcelles.map(p => parseInt(p.sante)),
      backgroundColor: parcelles.map(p => {
        const sante = parseInt(p.sante);
        if (sante >= 90) return 'rgba(34, 197, 94, 0.7)';
        if (sante >= 80) return 'rgba(245, 158, 11, 0.7)';
        return 'rgba(239, 68, 68, 0.7)';
      }),
      borderColor: parcelles.map(p => {
        const sante = parseInt(p.sante);
        if (sante >= 90) return '#22C55E';
        if (sante >= 80) return '#F59E0B';
        return '#EF4444';
      }),
      borderWidth: 2
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Santé générale par Parcelle',
        font: { size: 16, weight: 'bold' }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: { color: 'rgba(200, 200, 200, 0.1)' }
      },
      x: {
        grid: { display: false }
      }
    }
  };

  return <Bar data={data} options={options} />;
};

/**
 * Graphique humidité du sol
 */
export const SoilMoistureChart = ({ parcelles }) => {
  const data = {
    labels: parcelles.map(p => p.nom),
    datasets: [{
      label: 'Humidité du sol (%)',
      data: parcelles.map(p => p.humidite),
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointRadius: 6,
      pointBackgroundColor: '#3B82F6',
      pointBorderColor: '#fff',
      pointBorderWidth: 2
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Humidité du sol',
        font: { size: 16, weight: 'bold' }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: { color: 'rgba(200, 200, 200, 0.1)' }
      },
      x: {
        grid: { display: false }
      }
    }
  };

  return <Line data={data} options={options} />;
};
