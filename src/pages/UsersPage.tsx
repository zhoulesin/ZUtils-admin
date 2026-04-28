import { useState, useEffect } from 'react'
import { adminApi } from '@/api/admin.api'
import { UserPlus, CheckCircle, XCircle } from 'lucide-react'

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'DEVELOPER' })

  const load = () => adminApi.users().then(setUsers).catch(() => {})

  useEffect(() => { load() }, [])

  const handleCreate = async () => {
    await adminApi.createUser(form.username, form.email, form.password, form.role)
    setShowForm(false)
    setForm({ username: '', email: '', password: '', role: 'DEVELOPER' })
    load()
  }

  const handleDisable = async (id: number) => { await adminApi.disableUser(id); load() }
  const handleEnable = async (id: number) => { await adminApi.enableUser(id); load() }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">开发者管理</h1>
        <button onClick={() => setShowForm(true)}
          className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700">
          <UserPlus className="h-4 w-4" /> 新建用户
        </button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-xl border bg-white p-4 space-y-3">
          <div className="grid grid-cols-4 gap-3">
            <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="rounded-lg border px-3 py-2 text-sm" placeholder="用户名" />
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="rounded-lg border px-3 py-2 text-sm" placeholder="邮箱" />
            <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
              type="password" className="rounded-lg border px-3 py-2 text-sm" placeholder="密码" />
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="rounded-lg border px-3 py-2 text-sm">
              <option value="DEVELOPER">Developer</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={handleCreate}
              className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm text-white hover:bg-blue-700">创建</button>
            <button onClick={() => setShowForm(false)}
              className="rounded-lg border px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50">取消</button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="w-full text-sm">
          <thead><tr className="border-b bg-gray-50 text-left text-gray-500">
            <th className="px-4 py-3 font-medium">ID</th>
            <th className="px-4 py-3 font-medium">用户名</th>
            <th className="px-4 py-3 font-medium">邮箱</th>
            <th className="px-4 py-3 font-medium">角色</th>
            <th className="px-4 py-3 font-medium">状态</th>
            <th className="px-4 py-3 font-medium">注册时间</th>
            <th className="px-4 py-3 font-medium">操作</th>
          </tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3">{u.id}</td>
                <td className="px-4 py-3 font-medium">{u.username}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${u.role === 'ADMIN' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${u.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {u.enabled ? '启用' : '禁用'}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{u.createdAt?.slice(0, 10)}</td>
                <td className="px-4 py-3">
                  {u.enabled ? (
                    <button onClick={() => handleDisable(u.id)}
                      className="flex items-center gap-1 rounded-lg border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50">
                      <XCircle className="h-3 w-3" /> 禁用
                    </button>
                  ) : (
                    <button onClick={() => handleEnable(u.id)}
                      className="flex items-center gap-1 rounded-lg border border-green-200 px-2 py-1 text-xs text-green-600 hover:bg-green-50">
                      <CheckCircle className="h-3 w-3" /> 启用
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
