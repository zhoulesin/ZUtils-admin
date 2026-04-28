import { useState, useEffect } from 'react'
import { adminApi } from '@/api/admin.api'
import { Trash2, CheckCircle, XCircle } from 'lucide-react'

export default function PluginListPage() {
  const [plugins, setPlugins] = useState<any[]>([])
  const load = () => adminApi.allPlugins().then(setPlugins).catch(() => {})

  useEffect(() => { load() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('确认删除此插件？将同时删除 GitHub 上的 DEX 文件和 manifest 记录。')) return
    await adminApi.deletePlugin(id)
    load()
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">插件列表</h1>
      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="w-full text-sm">
          <thead><tr className="border-b bg-gray-50 text-left text-gray-500">
            <th className="px-4 py-3 font-medium">ID</th>
            <th className="px-4 py-3 font-medium">函数名</th>
            <th className="px-4 py-3 font-medium">分类</th>
            <th className="px-4 py-3 font-medium">状态</th>
            <th className="px-4 py-3 font-medium">下载量</th>
            <th className="px-4 py-3 font-medium">评分</th>
            <th className="px-4 py-3 font-medium">操作</th>
          </tr></thead>
          <tbody>
            {plugins.map((p) => (
              <tr key={p.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs">{p.id}</td>
                <td className="px-4 py-3 font-medium">{p.functionName}</td>
                <td className="px-4 py-3">{p.category}</td>
                <td className="px-4 py-3">
                  {p.dexExists ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-700">
                      <CheckCircle className="h-3 w-3" /> 已部署
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs text-amber-700">
                      <XCircle className="h-3 w-3" /> 未部署
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">{p.downloads}</td>
                <td className="px-4 py-3">{p.rating}</td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(p.id)}
                    className="flex items-center gap-1 rounded-lg border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50">
                    <Trash2 className="h-3 w-3" /> 删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
