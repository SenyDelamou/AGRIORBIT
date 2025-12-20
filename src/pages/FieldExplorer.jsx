import Hero from '../components/Hero.jsx';
import { explorerImages } from '../data/heroImages.js';
import '../styles/fieldExplorer.css';

const sampleZones = [
  {
    name: 'Bloc A - Sorgho',
    coordinates: '14.6937° N, 17.4441° W',
    area: '42 ha',
    moisture: '68%',
    ndvi: 0.74
  },
  {
    name: 'Bloc B - Riz irrigé',
    coordinates: '14.7511° N, 17.4670° W',
    area: '27 ha',
    moisture: '61%',
    ndvi: 0.81
  }
];

const spectralLayers = [
  {
    name: 'NDVI',
    description: 'Suivi de la vigueur végétative pour la prise de décision sur l’irrigation et la fertilisation.'
  },
  {
    name: 'NDWI',
    description: 'Mesure de l’humidité foliaire pour détecter le stress hydrique et déclencher les tours d’eau.'
  },
  {
    name: 'Bande thermique',
    description: 'Surveillance des îlots de chaleur et repérage des zones de germination insuffisante.'
  }
];

function FieldExplorer() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.info('Synchronisation de la zone en cours...');
    // Logique de synchronisation ici
  };

  return (
    <div className="field-explorer-page">
      <Hero
        eyebrow="Explorateur de parcelles"
        title="Importez vos zones, laissez les satellites orchestrer la veille"
        subtitle="Importez coordonnées ou fichiers GeoJSON, planifiez les revisites et consultez vos couches multi-spectrales prêtes à analyser."
        ctaLabel="Créer une zone"
        ctaHref="#zone-form"
        images={explorerImages}
      />

      <section className="section explorer-intro">
        <div className="container explorer-intro-card glass-panel" id="zone-form">
          <div className="intro-text">
            <h2>Synchronisez une nouvelle parcelle</h2>
            <p>Renseignez vos informations de contours pour alimenter automatiquement l’analyse satellite et le suivi agronomique.</p>
          </div>
          <form className="zone-form" aria-label="Importer une zone agricole" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="zone-name">Nom de la zone</label>
              <input id="zone-name" name="zone-name" type="text" placeholder="Ex : Parcelle maïs 2025" />
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="lat">Latitude</label>
                <input id="lat" name="lat" type="text" placeholder="14.6937" inputMode="decimal" />
              </div>
              <div className="form-group">
                <label htmlFor="lng">Longitude</label>
                <input id="lng" name="lng" type="text" placeholder="-17.4441" inputMode="decimal" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="file">Importer un contour (GeoJSON/KML)</label>
              <input id="file" name="file" type="file" accept=".geojson,.kml,.json" />
            </div>
            <button type="submit" className="button">
              Synchroniser la zone
            </button>
          </form>
        </div>
      </section>

      <section className="section explorer-content">
        <div className="container grid explorer-grid">
          <div className="map-preview glass-panel" role="img" aria-label="Représentation satellite d’une parcelle">
            <div className="map-overlay">
              <span className="tag">Aperçu multi-spectral</span>
              <strong>NDVI 0.78</strong>
              <p>Détection de zones à vigueur hétérogène - surveillance recommandée.</p>
            </div>
          </div>
          <div className="layers-panel glass-panel">
            <h2>Choisissez les couches d’analyse</h2>
            <p>Combinez des bandes multi-spectrales pour obtenir des vues ciblées selon vos cultures et stades phénologiques.</p>
            <ul className="layer-list">
              {spectralLayers.map((layer) => (
                <li key={layer.name}>
                  <span>{layer.name}</span>
                  <p>{layer.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section zone-summary">
        <div className="container glass-panel">
          <header className="section-header">
            <span className="tag">Zones synchronisées</span>
            <h2>Vue synthétique de vos parcelles</h2>
            <p>Un tableau vivant qui agrège les indicateurs clés pour prioriser les interventions agronomiques.</p>
          </header>
          <div className="zone-table" role="table">
            <div className="table-row header" role="row">
              <span role="columnheader">Zone</span>
              <span role="columnheader">Coordonnées</span>
              <span role="columnheader">Surface</span>
              <span role="columnheader">Humidité</span>
              <span role="columnheader">NDVI</span>
            </div>
            {sampleZones.map((zone) => (
              <div key={zone.name} className="table-row" role="row">
                <span role="cell">{zone.name}</span>
                <span role="cell">{zone.coordinates}</span>
                <span role="cell">{zone.area}</span>
                <span role="cell">{zone.moisture}</span>
                <span role="cell" aria-label={`Indice NDVI ${zone.ndvi}`}>
                  {zone.ndvi}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default FieldExplorer;
