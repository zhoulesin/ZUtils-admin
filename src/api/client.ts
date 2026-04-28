import axios from 'axios'
const client = axios.create({ baseURL: '/api/v1', timeout: 10000 })
client.interceptors.request.use((c) => {
  const token = localStorage.getItem('admin_token')
  if (token) c.headers.Authorization = `Bearer ${token}`
  return c
})
client.interceptors.response.use(
  (r) => r,
  (e) => { if (e.response?.status === 401) { localStorage.removeItem('admin_token'); window.location.href = '/login' }; return Promise.reject(e) },
)
export default client
