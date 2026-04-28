import client from './client'
export const adminApi = {
  login: (username: string, password: string) =>
    client.post('/auth/login', { username, password }).then((r) => r.data.data),
  stats: () => client.get('/admin/stats').then((r) => r.data.data),
  pendingVersions: () => client.get('/admin/plugins/pending').then((r) => r.data.data),
  allPlugins: () => client.get('/admin/plugins').then((r) => r.data.data),
  approve: (id: number) => client.post(`/admin/plugins/${id}/approve`),
  reject: (id: number, reason?: string) => client.post(`/admin/plugins/${id}/reject`, { reason }),
  deletePlugin: (id: string) => client.delete(`/admin/plugins/${id}`),
  users: () => client.get('/admin/users').then((r) => r.data.data),
  createUser: (username: string, email: string, password: string, role: string) =>
    client.post('/admin/users', { username, email, password, role }),
  disableUser: (id: number) => client.post(`/admin/users/${id}/disable`),
  enableUser: (id: number) => client.post(`/admin/users/${id}/enable`),
}
