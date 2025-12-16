// During local development we point the frontend API helper to the backend server.
// If you deploy or change backend port, set NEXT_PUBLIC_API_URL in the environment.
const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

async function request(path: string, opts: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('oopsart_token') : null
  const headers: Record<string,string> = { 'Content-Type': 'application/json', ...(opts.headers || {}) }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${BASE}${path}`, { ...opts, headers })
  const text = await res.text()
  try {
    const data = text ? JSON.parse(text) : null
    if (!res.ok) throw new Error(data?.error || data?.message || res.statusText)
    return data
  } catch (err) {
    if (err instanceof SyntaxError) {
      if (!res.ok) throw new Error(res.statusText)
      return null
    }
    throw err
  }
}

export const api = {
  // Auth
  login: (email: string, password: string) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (name: string, email: string, password: string, role = 'user') =>
    request('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password, role }) }),
  getMe: () => request('/auth/me', { method: 'GET' }),
  updateMe: (payload: any) => request('/auth/me', { method: 'PUT', body: JSON.stringify(payload) }),

  // Items
  getItems: () => request('/items', { method: 'GET' }),
  createItem: (payload: any) => request('/items', { method: 'POST', body: JSON.stringify(payload) }),
  updateItem: (id: string, payload: any) => request(`/items/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteItem: (id: string) => request(`/items/${id}`, { method: 'DELETE' }),

  // Products
  getProducts: () => request('/products', { method: 'GET' }),
  createProduct: (payload: any) => request('/products', { method: 'POST', body: JSON.stringify(payload) }),
  updateProduct: (id: string, payload: any) => request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteProduct: (id: string) => request(`/products/${id}`, { method: 'DELETE' }),
}

export default api
