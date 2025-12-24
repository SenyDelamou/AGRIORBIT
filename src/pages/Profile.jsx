import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { useDocumentTitle } from '../hooks/useWebLogic';
import '../styles/profile.css';
import { ChartBarIcon, MapIcon, BeakerIcon, UserCircleIcon, LockClosedIcon, PencilSquareIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

function Profile() {
    const { user, updateUser } = useAuth();
    const { t } = useLanguage();
    useDocumentTitle(t('profile'));
    const { showToast } = useToast();

    const [editingName, setEditingName] = useState(false);
    const [newName, setNewName] = useState(user?.name || '');

    const [editingPassword, setEditingPassword] = useState(false);
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

    if (!user) return null;

    const handleUpdateName = (e) => {
        e.preventDefault();
        if (newName.trim()) {
            updateUser({ name: newName });
            setEditingName(false);
            showToast('Nom mis à jour avec succès', 'success');
        }
    };

    const handleUpdatePassword = (e) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            showToast('Les mots de passe ne correspondent pas', 'error');
            return;
        }
        // Simulation de changement de mot de passe
        showToast('Mot de passe mis à jour avec succès', 'success');
        setEditingPassword(false);
        setPasswords({ current: '', new: '', confirm: '' });
    };

    const stats = [
        { label: t('Parcelles suivies'), value: '12', icon: MapIcon },
        { label: t('Analyses effectuées'), value: '48', icon: ChartBarIcon },
        { label: t('Santé moyenne'), value: '94%', icon: BeakerIcon }
    ];

    return (
        <div className="profile-page">
            <div className="user-container">
                <header className="page-header">
                    <h1>{t('profile')}</h1>
                    <p>{t('profile_desc')}</p>
                </header>

                <div className="profile-main-grid">
                    {/* Carte Profil Principale */}
                    <div className="profile-card-large surface-card">
                        <div className="profile-header-ui">
                            <div className="avatar-wrapper-large">
                                <img src={user.picture} alt={user.name} />
                                <button className="edit-avatar-btn">
                                    <PencilSquareIcon style={{ width: '16px' }} />
                                </button>
                            </div>
                            <div className="user-info-ui">
                                {editingName ? (
                                    <form onSubmit={handleUpdateName} className="inline-edit-form">
                                        <input
                                            type="text"
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            autoFocus
                                            className="edit-input"
                                        />
                                        <div className="edit-actions">
                                            <button type="submit" className="action-btn success"><CheckIcon style={{ width: '20px' }} /></button>
                                            <button type="button" onClick={() => setEditingName(false)} className="action-btn cancel"><XMarkIcon style={{ width: '20px' }} /></button>
                                        </div>
                                    </form>
                                ) : (
                                    <h2 className="user-name-display">
                                        {user.name}
                                        <button onClick={() => setEditingName(true)} className="small-edit-btn">
                                            <PencilSquareIcon style={{ width: '20px' }} />
                                        </button>
                                    </h2>
                                )}
                                <p className="user-email-display">{user.email}</p>
                                <span className="badge-expert">Membre Expert</span>
                            </div>
                        </div>
                    </div>

                    {/* Section Sécurité */}
                    <div className="security-section surface-card">
                        <div className="section-header-row">
                            <h3><LockClosedIcon className="icon-sm" style={{ width: '20px' }} /> Sécurité du compte</h3>
                        </div>

                        {user.provider === 'google' ? (
                            <div className="security-summary">
                                <p>Votre compte est sécurisé via <strong>Google</strong>.</p>
                                <p className="small-info" style={{ opacity: 0.6, fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                                    Pour modifier votre mot de passe ou vos paramètres de sécurité, rendez-vous sur votre compte Google.
                                </p>
                                <a
                                    href="https://myaccount.google.com/security"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="button-outline"
                                    style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center' }}
                                >
                                    Gérer mon compte Google
                                </a>
                            </div>
                        ) : !editingPassword ? (
                            <div className="security-summary">
                                <p>Modifier votre mot de passe pour sécuriser votre accès.</p>
                                <button onClick={() => setEditingPassword(true)} className="button-outline">
                                    Changer le mot de passe
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleUpdatePassword} className="password-form-ui">
                                <div className="form-group">
                                    <label>Mot de passe actuel</label>
                                    <input
                                        type="password"
                                        required
                                        value={passwords.current}
                                        onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Nouveau mot de passe</label>
                                    <input
                                        type="password"
                                        required
                                        value={passwords.new}
                                        onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Confirmer le nouveau mot de passe</label>
                                    <input
                                        type="password"
                                        required
                                        value={passwords.confirm}
                                        onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                    />
                                </div>
                                <div className="form-footer">
                                    <button type="button" onClick={() => setEditingPassword(false)} className="btn-cancel">Annuler</button>
                                    <button type="submit" className="btn-save">Enregistrer</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                <div className="stats-grid">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="stat-card reveal-item">
                            <stat.icon className="stat-icon-ui" style={{ width: '24px' }} />
                            <div className="stat-content">
                                <span className="stat-value">{stat.value}</span>
                                <span className="stat-label">{stat.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Profile;
