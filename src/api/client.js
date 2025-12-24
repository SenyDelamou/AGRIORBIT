const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const ACCESS_TOKEN_KEY = 'agri_orbit_token';
const REFRESH_TOKEN_KEY = 'agri_orbit_refresh_token';

function getStoredTokens() {
  return {
    accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
    refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY)
  };
}

function setStoredTokens(accessToken, refreshToken) {
  if (accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
}

function clearStoredTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

async function refreshAccessToken() {
  const { refreshToken } = getStoredTokens();
  if (!refreshToken) {
    clearStoredTokens();
    return null;
  }

  const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ refreshToken })
  });

  if (!response.ok) {
    clearStoredTokens();
    return null;
  }

  const data = await response.json();
  setStoredTokens(data.accessToken, data.refreshToken);
  return data.accessToken;
}

async function request(path, { method = 'GET', headers = {}, body, auth = true } = {}) {
  let finalHeaders = {
    'Content-Type': 'application/json',
    ...headers
  };

  let accessToken;
  if (auth) {
    ({ accessToken } = getStoredTokens());
    if (!accessToken) {
      throw new Error('Missing authentication token');
    }
    finalHeaders = {
      ...finalHeaders,
      Authorization: `Bearer ${accessToken}`
    };
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: finalHeaders,
    body: body ? (body instanceof FormData ? body : JSON.stringify(body)) : undefined
  });

  if (response.status === 401 && auth) {
    const newToken = await refreshAccessToken();
    if (!newToken) {
      throw new Error('Session expirée');
    }

    const retryHeaders = {
      ...finalHeaders,
      Authorization: `Bearer ${newToken}`
    };

    const retryResponse = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: retryHeaders,
      body: body ? (body instanceof FormData ? body : JSON.stringify(body)) : undefined
    });

    if (!retryResponse.ok) {
      const error = await parseError(retryResponse);
      throw error;
    }

    return parseResponse(retryResponse);
  }

  if (!response.ok) {
    const error = await parseError(response);
    throw error;
  }

  return parseResponse(response);
}

async function parseResponse(response) {
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
}

async function parseError(response) {
  try {
    const data = await response.json();
    const message = data.error || data.message || 'Erreur inattendue';
    return new Error(message);
  } catch (_err) {
    return new Error('Erreur inattendue');
  }
}

export {
  API_BASE_URL,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  request,
  getStoredTokens,
  setStoredTokens,
  clearStoredTokens
};
