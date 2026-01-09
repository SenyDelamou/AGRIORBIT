import { createContext, useContext, useMemo, useState } from 'react';

const STORAGE_KEY = 'agri_orbit_subscription';
const defaultPlan = {
  tier: 'standard',
  renewalDate: null,
  startedAt: null
};

const SubscriptionContext = createContext(null);

const readStoredPlan = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPlan;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return defaultPlan;
    return {
      ...defaultPlan,
      ...parsed
    };
  } catch (error) {
    console.warn('Impossible de récupérer le plan stocké, retour au plan par défaut.', error);
    return defaultPlan;
  }
};

const persistPlan = (plan) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
  } catch (error) {
    console.warn('Impossible d\'enregistrer le plan premium simulé.', error);
  }
};

export function SubscriptionProvider({ children }) {
  const [plan, setPlan] = useState(() => readStoredPlan());

  const updatePlan = (nextPlan) => {
    setPlan(nextPlan);
    persistPlan(nextPlan);
  };

  const upgradeToPremium = () => {
    const now = new Date();
    const renewal = new Date(now);
    renewal.setMonth(renewal.getMonth() + 1);

    updatePlan({
      tier: 'premium',
      startedAt: now.toISOString(),
      renewalDate: renewal.toISOString()
    });
  };

  const downgradeToStandard = () => {
    updatePlan(defaultPlan);
  };

  const value = useMemo(() => ({
    plan,
    isPremium: plan.tier === 'premium',
    upgradeToPremium,
    downgradeToStandard
  }), [plan]);

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export const useSubscription = () => {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) {
    throw new Error('useSubscription doit être utilisé à l\'intérieur d\'un SubscriptionProvider');
  }
  return ctx;
};
