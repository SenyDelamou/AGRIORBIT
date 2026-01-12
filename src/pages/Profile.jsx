import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { useDocumentTitle } from '../hooks/useWebLogic';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import '../styles/profile.css';
import {
  ChartBarIcon, MapIcon, BeakerIcon, UserCircleIcon, LockClosedIcon,
  PencilSquareIcon, CheckIcon, XMarkIcon, GlobeAltIcon, BellIcon,
  Cog6ToothIcon, DocumentArrowDownIcon, TrashIcon, ArrowRightOnRectangleIcon,
  SparklesIcon, CalendarIcon, EnvelopeIcon, PhoneIcon, MapPinIcon,
  ClipboardDocumentIcon, ShieldCheckIcon, GlobeAltIcon as GlobeIcon
} from '@heroicons/react/24/outline';
import { LockClosedIcon as LockClosedSolid } from '@heroicons/react/24/solid';

const TABS = ['Profil', 'Abonnement', 'Statistiques', 'Activité', 'Intégrations', 'Préférences', 'Sécurité', 'Données'];

const RECENT_ACTIVITIES = [
  { type: 'analysis', title: 'Analyse de parcelle complétée', time: 'Il y a 2 heures', icon: '' },
  { type: 'alert', title: 'Alerte d\'irrigation créée', time: 'Il y a 5 heures', icon: '' },
  { type: 'login', title: 'Connexion via Google', time: 'Il y a 1 jour', icon: '' },
  { type: 'upgrade', title: 'Passage au plan Premium', time: 'Il y a 7 jours', icon: '' },
  { type: 'export', title: 'Rapport exporté (PDF)', time: 'Il y a 2 semaines', icon: '' }
];

const INTEGRATIONS = [
  { name: 'Sentinel Hub', status: 'Actif', type: 'Satellite', users: '2,450' },
  { name: 'Capteurs IoT', status: 'Actif', type: 'Hardware', users: '1,200' },
  { name: 'Google Weather API', status: 'Actif', type: 'Météo', users: '3,100' },
  { name: 'Export Shapefile', status: 'Inactif', type: 'Export', users: '450' }
];

function Profile() {
  const { user, updateUser } = useAuth();
  const { lang, setLang, t } = useLanguage();
  useDocumentTitle(t('profile'));
  useScrollReveal();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('Profil');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    company: user?.company || '',
    bio: user?.bio || ''
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [show2FA, setShow2FA] = useState(false);

  if (!user) return null;

  const handleSaveProfile = () => {
    updateUser(formData);
    setEditMode(false);
    showToast('Profil mis à jour avec succès', 'success');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      showToast('Les mots de passe ne correspondent pas', 'error');
      return;
    }
    showToast('Mot de passe mis à jour avec succès', 'success');
    setShowPasswordForm(false);
    setPasswords({ current: '', new: '', confirm: '' });
  };

  // Profil Section
  const renderProfileTab = () => (
    <div className="tab-content">
      <div className="section-card">
        <div className="section-header">
          <h2>Informations personnelles</h2>
          {!editMode && (
            <button className="btn-edit" onClick={() => setEditMode(true)}>
              <PencilSquareIcon /> Modifier
            </button>
          )}
        </div>

        {editMode ? (
          <form className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label>Nom complet</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Votre nom"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="votre@email.com"
                  disabled
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Téléphone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+221 XX XXX XXXX"
                />
              </div>
              <div className="form-group">
                <label>Localisation</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Ville, Pays"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Entreprise</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Nom de votre entreprise"
                />
              </div>
              <div className="form-group">
                <label>Biographie</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Parlez-nous de vous..."
                  rows="3"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={() => setEditMode(false)}>
                Annuler
              </button>
              <button type="button" className="btn-save" onClick={handleSaveProfile}>
                Enregistrer les modifications
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-display">
            <div className="info-item">
              <span className="label">Nom</span>
              <span className="value">{formData.name}</span>
            </div>
            <div className="info-item">
              <span className="label">Email</span>
              <span className="value">{formData.email}</span>
            </div>
            <div className="info-item">
              <span className="label">Téléphone</span>
              <span className="value">{formData.phone || 'Non fourni'}</span>
            </div>
            <div className="info-item">
              <span className="label">Localisation</span>
              <span className="value">{formData.location || 'Non fourni'}</span>
            </div>
            <div className="info-item">
              <span className="label">Entreprise</span>
              <span className="value">{formData.company || 'Non fourni'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Subscription Section
  const renderSubscriptionTab = () => (
    <div className="tab-content">
      <div className="section-card">
        <h2>Votre abonnement</h2>
        
        <div className="subscription-display">
          <div className="plan-badge premium">Premium</div>
          <p>Plan Professionnel pour les exploitations de moyenne taille</p>
          
          <div className="subscription-info">
            <div className="info-item">
              <span className="label">Prix mensuel</span>
              <span className="value">59€</span>
            </div>
            <div className="info-item">
              <span className="label">Prochain renouvellement</span>
              <span className="value">15 février 2026</span>
            </div>
            <div className="info-item">
              <span className="label">Statut</span>
              <span className="value status-active"> Actif</span>
            </div>
          </div>

          <div className="plan-features">
            <h3>Inclus dans votre plan</h3>
            <ul>
              <li> 50 parcelles illimitées</li>
              <li> Analyses quotidiennes</li>
              <li> Alertes automatisées</li>
              <li> Export PDF/Shapefile</li>
              <li> Support prioritaire</li>
            </ul>
          </div>

          <div className="subscription-actions">
            <button className="btn-outline">Upgrade vers Enterprise</button>
            <button className="btn-danger">Résilier l'abonnement</button>
          </div>
        </div>
      </div>
    </div>
  );

  // Statistics Section
  const renderStatisticsTab = () => (
    <div className="tab-content">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <MapIcon />
            <span>Parcelles</span>
          </div>
          <div className="stat-value">24</div>
          <div className="stat-change">+3 ce mois</div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <ChartBarIcon />
            <span>Analyses</span>
          </div>
          <div className="stat-value">156</div>
          <div className="stat-change">+48 ce mois</div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <BellIcon />
            <span>Alertes</span>
          </div>
          <div className="stat-value">12</div>
          <div className="stat-change">3 en attente</div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <SparklesIcon />
            <span>Jours Actifs</span>
          </div>
          <div className="stat-value">89</div>
          <div className="stat-change">Depuis l'inscription</div>
        </div>
      </div>

      <div className="section-card" style={{ marginTop: '2rem' }}>
        <h3>Utilisation API</h3>
        <div className="usage-stats">
          <div className="usage-item">
            <span>Requêtes ce mois</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '65%' }}></div>
            </div>
            <span className="usage-text">6,500 / 10,000</span>
          </div>
          <div className="usage-item">
            <span>Stockage</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '42%' }}></div>
            </div>
            <span className="usage-text">42 GB / 100 GB</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Activity Section
  const renderActivityTab = () => (
    <div className="tab-content">
      <div className="section-card">
        <h2>Activité récente</h2>
        <div className="activity-list">
          {RECENT_ACTIVITIES.map((activity, idx) => (
            <div key={idx} className="activity-item">
              <div className="activity-icon">{activity.icon}</div>
              <div className="activity-content">
                <p className="activity-title">{activity.title}</p>
                <p className="activity-time">{activity.time}</p>
              </div>
              <ArrowRightOnRectangleIcon />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Integrations Section
  const renderIntegrationsTab = () => (
    <div className="tab-content">
      <div className="section-card">
        <h2>Intégrations actives</h2>
        <div className="integrations-grid">
          {INTEGRATIONS.map((integration, idx) => (
            <div key={idx} className="integration-card">
              <div className="integration-header">
                <h3>{integration.name}</h3>
                <span className={status ${integration.status.toLowerCase()}}>
                  {integration.status}
                </span>
              </div>
              <p className="integration-type">{integration.type}</p>
              <p className="integration-users">{integration.users} utilisateurs</p>
              <button className="btn-small">Gérer</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Preferences Section
  const renderPreferencesTab = () => (
    <div className="tab-content">
      <div className="section-card">
        <h2>Préférences</h2>
        
        <div className="preference-item">
          <div>
            <h3>Notifications par email</h3>
            <p>Recevez des alertes importantes</p>
          </div>
          <label className="toggle">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </div>

        <div className="preference-item">
          <div>
            <h3>Rapports hebdomadaires</h3>
            <p>Résumé de vos parcelles chaque lundi</p>
          </div>
          <label className="toggle">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </div>

        <div className="preference-item">
          <div>
            <h3>Mode sombre</h3>
            <p>Réduire la fatigue oculaire</p>
          </div>
          <label className="toggle">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </div>

        <div className="preference-item">
          <div>
            <h3>Langue</h3>
            <p>Sélectionnez votre langue préférée</p>
          </div>
          <select>
            <option>Français</option>
            <option>English</option>
            <option>Pulaar</option>
          </select>
        </div>
      </div>
    </div>
  );

  // Security Section
  const renderSecurityTab = () => (
    <div className="tab-content">
      <div className="section-card">
        <h2>Sécurité du compte</h2>

        <div className="security-item">
          <div className="security-header">
            <LockClosedIcon />
            <div>
              <h3>Mot de passe</h3>
              <p>Dernière modification il y a 6 mois</p>
            </div>
          </div>
          {!showPasswordForm ? (
            <button className="btn-small" onClick={() => setShowPasswordForm(true)}>
              Modifier
            </button>
          ) : (
            <form onSubmit={handlePasswordChange} className="security-form">
              <input
                type="password"
                placeholder="Mot de passe actuel"
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Nouveau mot de passe"
                value={passwords.new}
                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Confirmer le mot de passe"
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                required
              />
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowPasswordForm(false)}>
                  Annuler
                </button>
                <button type="submit" className="btn-save">
                  Enregistrer
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="security-item">
          <div className="security-header">
            <ShieldCheckIcon />
            <div>
              <h3>Authentification à deux facteurs</h3>
              <p>Sécurité supplémentaire pour votre compte</p>
            </div>
          </div>
          <label className="toggle">
            <input type="checkbox" onChange={() => setShow2FA(!show2FA)} />
            <span className="slider"></span>
          </label>
        </div>

        <div className="security-item">
          <div className="security-header">
            <MapIcon />
            <div>
              <h3>Sessions actives</h3>
              <p>Appareils connectés à votre compte</p>
            </div>
          </div>
          <button className="btn-small">Voir les sessions</button>
        </div>
      </div>
    </div>
  );

  // Data Section
  const renderDataTab = () => (
    <div className="tab-content">
      <div className="section-card">
        <h2>Gestion des données</h2>

        <div className="data-action">
          <DocumentArrowDownIcon />
          <div>
            <h3>Télécharger mes données</h3>
            <p>Obtenez une copie de toutes vos données personnelles au format JSON</p>
          </div>
          <button className="btn-primary">Télécharger</button>
        </div>

        <div className="data-action">
          <ClipboardDocumentIcon />
          <div>
            <h3>Exporter les rapports</h3>
            <p>Téléchargez tous vos rapports d'analyse en PDF</p>
          </div>
          <button className="btn-primary">Exporter</button>
        </div>

        <div className="data-action delete">
          <TrashIcon />
          <div>
            <h3>Supprimer mon compte</h3>
            <p>Cette action est irréversible. Toutes les données seront supprimées.</p>
          </div>
          <button className="btn-danger">Supprimer</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="profile-page">
      <div className="user-container">
        {/* Header */}
        <div className="profile-header">
          <div className="profile-header-content">
            <img src={user.picture} alt={user.name} className="profile-avatar-large" />
            <div className="profile-header-info">
              <h1>{user.name}</h1>
              <p className="profile-email">{user.email}</p>
              <div className="profile-badges">
                <span className="badge premium">Premium</span>
                <span className="badge verified"> Vérifié</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="tabs-navigation">
          {TABS.map(tab => (
            <button
              key={tab}
              className={	ab-btn ${activeTab === tab ? 'active' : ''}}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="tab-panel">
          {activeTab === 'Profil' && renderProfileTab()}
          {activeTab === 'Abonnement' && renderSubscriptionTab()}
          {activeTab === 'Statistiques' && renderStatisticsTab()}
          {activeTab === 'Activité' && renderActivityTab()}
          {activeTab === 'Intégrations' && renderIntegrationsTab()}
          {activeTab === 'Préférences' && renderPreferencesTab()}
          {activeTab === 'Sécurité' && renderSecurityTab()}
          {activeTab === 'Données' && renderDataTab()}
        </div>
      </div>
    </div>
  );
}

export default Profile;
