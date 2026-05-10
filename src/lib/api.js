/**
 * Traveloop API Client
 * Centralised fetch wrapper — attaches JWT, handles 401, parses JSON.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

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
  updateMe: (data) => request('PATCH', '/users/me', data),
  getSavedDestinations: () => request('GET', '/users/me/saved'),
  getStats: () => request('GET', '/users/me/stats'),
}

// ─── Trips ────────────────────────────────────────────────────
export const tripsApi = {
  getAll: (params = '') => request('GET', `/trips${params}`),
  getById: (id) => request('GET', `/trips/${id}`),
  create: (data) => request('POST', '/trips', data),
  update: (id, data) => request('PATCH', `/trips/${id}`, data),
  delete: (id) => request('DELETE', `/trips/${id}`),
  
  // Nested resources
  getBudget: (tripId) => request('GET', `/trips/${tripId}/budget`),
  getChecklist: (tripId) => request('GET', `/trips/${tripId}/checklist`),
  getNotes: (tripId) => request('GET', `/trips/${tripId}/notes`),
  getStops: (tripId) => request('GET', `/trips/${tripId}/stops`),
  
  addStop: (tripId, data) => request('POST', `/trips/${tripId}/stops`, data),
  updateChecklistItem: (tripId, itemId, data) => request('PATCH', `/trips/${tripId}/checklist/${itemId}`, data),
  updateNote: (tripId, noteId, data) => request('PATCH', `/trips/${tripId}/notes/${noteId}`, data),
}

// ─── Cities ───────────────────────────────────────────────────
export const citiesApi = {
  search: (q) => request('GET', `/cities?q=${encodeURIComponent(q)}`),
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request('GET', `/cities${query ? '?' + query : ''}`);
  },
}

// ─── Activities ───────────────────────────────────────────────
export const activitiesApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request('GET', `/activities${query ? '?' + query : ''}`);
  },
}

// Default export for unified access
const api = {
  auth: authApi,
  users: usersApi,
  trips: tripsApi,
  cities: citiesApi,
  activities: activitiesApi,
};

export default api;
