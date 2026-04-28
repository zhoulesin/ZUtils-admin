import { useState, useEffect } from 'react'
import { adminApi } from '@/api/admin.api'

export default function PluginReviewPage() {
  const [versions, setVersions] = useState<any[]>([])
  const [loading, setLoading] = useState('')
  const load = () => adminApi.pendingVersions().then(setVersions).catch(() => {})

  useEffect(() => { load() }, [])

  const handleApprove = async (id: number) => {
    setLoading(`approve-${id}`)
    await adminApi.approve(id)
    setLoading('')
    load()
  }

  const handleReject = async (id: number) => {
    const reason = prompt('驳回原因（可选）:')
    setLoading(`reject-${id}`)
    await adminApi.reject(id, reason || undefined)
    setLoading('')
    load()
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">待审核插件</h1>
      {versions.length === 0 ? (
        <p className="text-gray-400">暂无待审核的插件版本</p>
      ) : (
        <div className="space-y-3">
          {versions.map((v) => (
            <div key={v.versionId} className="rounded-xl border bg-white p-4 flex items-center justify-between">
              <div>
                <div className="font-medium">{v.functionName}</div>
                <div className="text-xs text-gray-500 mt-1">
                  版本 {v.version} · {v.className} · {(v.dexSize / 1024).toFixed(1)}KB
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleApprove(v.versionId)} disabled={loading === `approve-${v.versionId}`}
                  className="rounded-lg bg-green-600 px-3 py-1.5 text-xs text-white hover:bg-green-700 disabled:opacity-50">
                  {loading === `approve-${v.versionId}` ? '...' : '通过'}
                </button>
                <button onClick={() => handleReject(v.versionId)} disabled={loading === `reject-${v.versionId}`}
                  className="rounded-lg bg-red-600 px-3 py-1.5 text-xs text-white hover:bg-red-700 disabled:opacity-50">
                  {loading === `reject-${v.versionId}` ? '...' : '驳回'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
