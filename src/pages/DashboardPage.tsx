import { useState, useEffect } from 'react'
import { adminApi } from '@/api/admin.api'
import { Package, Clock, CheckCircle, Users } from 'lucide-react'

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null)
  useEffect(() => { adminApi.stats().then(setStats).catch(() => {}) }, [])

  const cards = stats ? [
    { label: '插件总数', value: stats.totalPlugins, icon: Package, color: 'text-blue-600 bg-blue-50' },
    { label: '待审核', value: stats.pendingVersions, icon: Clock, color: 'text-amber-600 bg-amber-50' },
    { label: '已通过', value: stats.approvedVersions, icon: CheckCircle, color: 'text-green-600 bg-green-50' },
    { label: '开发者', value: stats.totalUsers, icon: Users, color: 'text-purple-600 bg-purple-50' },
  ] : []

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">仪表盘</h1>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border bg-white p-4">
            <div className={`mb-3 inline-flex rounded-lg p-2 ${c.color}`}><c.icon className="h-5 w-5" /></div>
            <div className="text-2xl font-bold">{c.value}</div>
            <div className="text-sm text-gray-500">{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
