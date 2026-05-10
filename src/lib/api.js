<<<<<<< HEAD
const BASE_URL = 'http://localhost:3000/api';

const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('traveloop_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

export const authApi = {
  login: (credentials) => apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  register: (userData) => apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  getMe: () => apiFetch('/auth/me'),
};

export const tripsApi = {
  getAll: () => apiFetch('/trips'),
  getById: (id) => apiFetch(`/trips/${id}`),
  create: (tripData) => apiFetch('/trips', {
    method: 'POST',
    body: JSON.stringify(tripData),
  }),
  update: (id, tripData) => apiFetch(`/trips/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(tripData),
  }),
  delete: (id) => apiFetch(`/trips/${id}`, {
    method: 'DELETE',
  }),
};

export const citiesApi = {
  getAll: (params) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/cities?${query}`);
  },
  getActivities: (params) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/activities?${query}`);
  },
};

export default {
  auth: authApi,
  trips: tripsApi,
  cities: citiesApi,
};
=======
/**
 * Traveloop API Client
 * Centralised fetch wrapper — attaches JWT, handles 401, parses JSON.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const getToken = () => localStorage.getItem('traveloop_token')

/**
 * Core request helper
 */
async function request(method, endpoint, body, options = {}) {
  const token = getToken()

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  })

  // Auto-logout on 401
  if (res.status === 401) {
    localStorage.removeItem('traveloop_token')
    localStorage.removeItem('traveloop_user')
    localStorage.removeItem('traveloop_auth')
    window.location.href = '/login'
    return
  }

  const data = await res.json()

  if (!res.ok) {
    // Throw with the API error message so the UI can display it
    const err = new Error(data.message || 'Something went wrong')
    err.status = res.status
    err.errors = data.errors || []
    throw err
  }

  return data
}

// ─── Auth ─────────────────────────────────────────────────────
export const authApi = {
  register: (name, email, password) =>
    request('POST', '/auth/register', { name, email, password }),

  login: (email, password) =>
    request('POST', '/auth/login', { email, password }),

  googleAuth: (idToken) =>
    request('POST', '/auth/google', { idToken }),

  refresh: (refreshToken) =>
    request('POST', '/auth/refresh', { refreshToken }),

  logout: () =>
    request('POST', '/auth/logout'),

  me: () =>
    request('GET', '/auth/me'),
}

// ─── Users ────────────────────────────────────────────────────
export const usersApi = {
  getProfile: () => request('GET', '/users/me'),
  updateProfile: (data) => request('PATCH', '/users/me', data),
  changePassword: (data) => request('PATCH', '/users/me/password', data),
}

// ─── Trips ────────────────────────────────────────────────────
export const tripsApi = {
  getAll: (params = '') => request('GET', `/trips${params}`),
  getOne: (id) => request('GET', `/trips/${id}`),
  create: (data) => request('POST', '/trips', data),
  update: (id, data) => request('PATCH', `/trips/${id}`, data),
  delete: (id) => request('DELETE', `/trips/${id}`),
}

// ─── Stops ────────────────────────────────────────────────────
export const stopsApi = {
  getAll: (tripId) => request('GET', `/trips/${tripId}/stops`),
  create: (tripId, data) => request('POST', `/trips/${tripId}/stops`, data),
  update: (tripId, stopId, data) => request('PATCH', `/trips/${tripId}/stops/${stopId}`, data),
  delete: (tripId, stopId) => request('DELETE', `/trips/${tripId}/stops/${stopId}`),
}

// ─── Budget ───────────────────────────────────────────────────
export const budgetApi = {
  getAll: (tripId) => request('GET', `/trips/${tripId}/budget`),
  create: (tripId, data) => request('POST', `/trips/${tripId}/budget`, data),
  update: (tripId, itemId, data) => request('PATCH', `/trips/${tripId}/budget/${itemId}`, data),
  delete: (tripId, itemId) => request('DELETE', `/trips/${tripId}/budget/${itemId}`),
}

// ─── Checklist ────────────────────────────────────────────────
export const checklistApi = {
  getAll: (tripId) => request('GET', `/trips/${tripId}/checklist`),
  create: (tripId, data) => request('POST', `/trips/${tripId}/checklist`, data),
  update: (tripId, itemId, data) => request('PATCH', `/trips/${tripId}/checklist/${itemId}`, data),
  delete: (tripId, itemId) => request('DELETE', `/trips/${tripId}/checklist/${itemId}`),
}

// ─── Notes ────────────────────────────────────────────────────
export const notesApi = {
  getAll: (tripId) => request('GET', `/trips/${tripId}/notes`),
  create: (tripId, data) => request('POST', `/trips/${tripId}/notes`, data),
  update: (tripId, noteId, data) => request('PATCH', `/trips/${tripId}/notes/${noteId}`, data),
  delete: (tripId, noteId) => request('DELETE', `/trips/${tripId}/notes/${noteId}`),
}

// ─── Cities ───────────────────────────────────────────────────
export const citiesApi = {
  search: (q) => request('GET', `/cities?q=${encodeURIComponent(q)}`),
  getAll: () => request('GET', '/cities'),
}

// ─── Activities ───────────────────────────────────────────────
export const activitiesApi = {
  getAll: (params = '') => request('GET', `/activities${params}`),
}

// ─── Saved Destinations ───────────────────────────────────────
export const savedApi = {
  getAll: () => request('GET', '/saved-destinations'),
  save: (cityId) => request('POST', '/saved-destinations', { city_id: cityId }),
  remove: (id) => request('DELETE', `/saved-destinations/${id}`),
}

// ─── Share ────────────────────────────────────────────────────
export const shareApi = {
  getByToken: (token) => request('GET', `/share/${token}`),
}
>>>>>>> 5d49661 (feat: implement Google OAuth2 authentication flow for users)
