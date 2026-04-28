import { create } from 'zustand'
import { adminApi } from '@/api/admin.api'

interface User { username: string; email: string }

export const useAuth = create<{
  user: User | null; loading: boolean; error: string | null
  login: (u: string, p: string) => Promise<void>; logout: () => void
}>((set) => ({
  user: JSON.parse(localStorage.getItem('admin_user') ?? 'null'),
  loading: false, error: null,
  login: async (username, password) => {
    set({ loading: true, error: null })
    try {
      const res = await adminApi.login(username, password)
      localStorage.setItem('admin_token', res.token)
      localStorage.setItem('admin_user', JSON.stringify(res.developer))
      set({ user: res.developer, loading: false })
    } catch { set({ loading: false, error: '登录失败' }); throw new Error() }
  },
  logout: () => { localStorage.removeItem('admin_token'); localStorage.removeItem('admin_user'); set({ user: null }) },
}))
