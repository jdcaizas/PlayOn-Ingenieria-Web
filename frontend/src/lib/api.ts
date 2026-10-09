export const API = 'http://localhost:3000';

export async function api(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  const res = await fetch(API + path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });
  if (res.status === 401) {
    localStorage.removeItem('token');
    location.href = '/login';
    throw new Error('No autorizado');
  }
  return res.json();
}