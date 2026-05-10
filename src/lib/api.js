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
