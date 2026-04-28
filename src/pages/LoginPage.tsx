import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/stores/auth.store'

export default function LoginPage() {
  const [u, setU] = useState(''); const [p, setP] = useState('')
  const { login, loading, error } = useAuth()
  const nav = useNavigate()
  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={async (e) => { e.preventDefault(); try { await login(u, p); nav('/dashboard') } catch {} }}
        className="w-full max-w-sm space-y-4 rounded-xl border bg-white p-6">
        <h1 className="text-xl font-bold text-center">管理员登录</h1>
        <input value={u} onChange={(e) => setU(e.target.value)} placeholder="用户名" required
          className="w-full rounded-lg border px-3 py-2 text-sm" />
        <input type="password" value={p} onChange={(e) => setP(e.target.value)} placeholder="密码" required
          className="w-full rounded-lg border px-3 py-2 text-sm" />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <p className="text-xs text-gray-400">仅管理员可登录。管理员: admin / admin123 · 开发者账号将被拒绝</p>
        <button type="submit" disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50">
          {loading ? '登录中...' : '登录'}
        </button>
      </form>
    </div>
  )
}
