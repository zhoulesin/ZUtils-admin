import { Outlet, Navigate, NavLink } from 'react-router-dom'
import { useAuth } from '@/stores/auth.store'

function Navbar() {
  const { user, logout } = useAuth()
  return (
    <nav className="sticky top-0 z-50 border-b bg-white px-6 py-3 flex items-center justify-between">
      <span className="font-bold text-lg">ZUtils Admin</span>
      <div className="flex items-center gap-4 text-sm">
        <span>{user?.username}</span>
        <button onClick={logout} className="text-red-600 hover:underline">退出</button>
      </div>
    </nav>
  )
}

function Sidebar() {
  const links = [
    { path: '/dashboard', label: '仪表盘' },
    { path: '/plugins', label: '插件列表' },
    { path: '/plugins/review', label: '待审核' },
    { path: '/users', label: '开发者' },
  ]
  return (
    <aside className="w-48 shrink-0 border-r bg-white p-4">
      <nav className="space-y-1">
        {links.map((l) => (
          <NavLink
            key={l.path}
            to={l.path}
            end
            className={({ isActive }) =>
              `block rounded px-3 py-2 text-sm ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default function Layout() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6"><Outlet /></main>
      </div>
    </div>
  )
}
