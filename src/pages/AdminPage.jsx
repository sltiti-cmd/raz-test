import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { exportCsv } from '../utils/exportCsv'
import Toast from '../components/Toast'
import { useToast } from '../hooks/useToast'

// ── Score distribution bar ────────────────────────────────────────────────────
function DistBar({ label, count, total, color }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-16 text-right text-xs font-bold text-gray-500 flex-shrink-0">{label}</span>
      <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-8 text-xs font-mono text-gray-500 flex-shrink-0">{count}</span>
    </div>
  )
}

function ScoreDistribution({ records }) {
  if (records.length === 0) return null
  const buckets = [
    { label: '90–100', count: records.filter(r => r.score >= 90).length,             color: 'bg-emerald-400' },
    { label: '80–89',  count: records.filter(r => r.score >= 80 && r.score < 90).length, color: 'bg-teal-400' },
    { label: '60–79',  count: records.filter(r => r.score >= 60 && r.score < 80).length, color: 'bg-amber-400' },
    { label: '0–59',   count: records.filter(r => r.score < 60).length,              color: 'bg-red-400' },
  ]
  return (
    <div className="bg-white rounded-2xl shadow-card p-5">
      <div className="text-xs font-black text-gray-400 uppercase tracking-wide mb-3">分数分布</div>
      <div className="space-y-2">
        {buckets.map(b => (
          <DistBar key={b.label} {...b} total={records.length} />
        ))}
      </div>
    </div>
  )
}

// ── Main admin page ────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [records, setRecords] = useState(() => {
    try { return JSON.parse(localStorage.getItem('raz-submissions') || '[]') }
    catch { return [] }
  })
  const [levelFilter, setLevelFilter] = useState('all')
  const [typeFilter,  setTypeFilter]  = useState('all')
  const [search,      setSearch]      = useState('')
  const [sortField,   setSortField]   = useState('submittedAt')
  const [sortDir,     setSortDir]     = useState('desc')
  const [confirmClear, setConfirmClear] = useState(false)
  const { toast, showToast } = useToast()

  const filtered = useMemo(() => {
    let list = [...records]
    if (levelFilter !== 'all') list = list.filter(r => r.levelId === levelFilter)
    if (typeFilter !== 'all')  list = list.filter(r => (r.testType || 'upgrade') === typeFilter)
    if (search.trim()) list = list.filter(r => r.studentName?.toLowerCase().includes(search.toLowerCase()))
    list.sort((a, b) => {
      let va = a[sortField], vb = b[sortField]
      if (typeof va === 'string') va = va.toLowerCase()
      if (typeof vb === 'string') vb = vb.toLowerCase()
      return sortDir === 'asc' ? (va < vb ? -1 : 1) : (va > vb ? -1 : 1)
    })
    return list
  }, [records, levelFilter, typeFilter, search, sortField, sortDir])

  const levels   = [...new Set(records.map(r => r.levelId))].sort()
  const avgScore = records.length ? Math.round(records.reduce((s, r) => s + r.score, 0) / records.length) : 0
  const passRate = records.length ? Math.round(records.filter(r => r.passed).length / records.length * 100) : 0

  const handleSort = (field) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortField(field); setSortDir('desc') }
  }

  const hasFilters = levelFilter !== 'all' || typeFilter !== 'all' || search

  const handleExport = () => {
    exportCsv(filtered)
    showToast('CSV 已导出 ✓')
  }

  const handleClear = () => {
    localStorage.removeItem('raz-submissions')
    setRecords([])
    setConfirmClear(false)
    showToast('数据已清空')
  }

  const SortArrow = ({ field }) => {
    if (sortField !== field) return <span className="text-gray-200 ml-1">↕</span>
    return <span className="text-teal-400 ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>
  }

  const Th = ({ field, children, center }) => (
    <th
      onClick={() => handleSort(field)}
      className={`px-4 py-3 text-left text-[11px] font-black text-gray-400 uppercase
                  tracking-wider cursor-pointer hover:text-gray-600 select-none
                  whitespace-nowrap ${center ? 'text-center' : ''}`}
    >
      {children}<SortArrow field={field} />
    </th>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Toast toast={toast} />

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-gray-400 hover:text-gray-600 font-bold">←</Link>
            <div className="w-8 h-8 bg-teal-500 rounded-xl flex items-center justify-center
                            text-white font-black text-sm">R</div>
            <h1 className="text-lg font-black text-gray-800">后台统计</h1>
            <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {records.length} 条
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleExport}
              disabled={filtered.length === 0}
              className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white
                         text-sm font-bold disabled:opacity-40 transition-colors shadow-sm"
            >
              ⬇ 导出 CSV
            </button>
            <button
              onClick={() => setConfirmClear(true)}
              disabled={records.length === 0}
              className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600
                         text-sm font-bold border border-red-200 disabled:opacity-40 transition-colors"
            >
              🗑 清空
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-5 py-5">

        {/* Stats cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
          {[
            { label: '总提交数', value: records.length, unit: '份', color: 'text-blue-600' },
            { label: '平均分',  value: avgScore,        unit: '分', color: 'text-teal-600' },
            { label: '通过率',  value: `${passRate}%`,  unit: '',   color: 'text-green-600' },
            { label: '筛选结果', value: filtered.length, unit: '条', color: 'text-purple-600' },
          ].map(c => (
            <div key={c.label} className="bg-white rounded-2xl shadow-card p-5">
              <div className="text-[11px] font-black text-gray-400 uppercase tracking-wide mb-1">
                {c.label}
              </div>
              <div className={`text-3xl font-black font-mono ${c.color}`}>
                {c.value}
                {c.unit && <span className="text-sm font-semibold ml-1 text-gray-400">{c.unit}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Score distribution */}
        <div className="mb-5">
          <ScoreDistribution records={records} />
        </div>

        {/* Filter bar */}
        <div className="bg-white rounded-2xl shadow-card p-4 mb-4 flex flex-wrap gap-3 items-center">
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="border-2 border-gray-100 rounded-xl px-3 py-2 text-sm font-semibold
                       focus:border-purple-400 outline-none bg-gray-50"
          >
            <option value="all">全部类型</option>
            <option value="upgrade">升级测试</option>
            <option value="placement">插班测试</option>
          </select>

          <select
            value={levelFilter}
            onChange={e => setLevelFilter(e.target.value)}
            className="border-2 border-gray-100 rounded-xl px-3 py-2 text-sm font-semibold
                       focus:border-teal-400 outline-none bg-gray-50"
          >
            <option value="all">全部级别</option>
            {levels.map(l => <option key={l} value={l}>{l}级别</option>)}
          </select>

          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="搜索微信名…"
            className="border-2 border-gray-100 rounded-xl px-3 py-2 text-sm font-semibold
                       focus:border-teal-400 outline-none bg-gray-50 w-48"
          />

          {hasFilters && (
            <button
              onClick={() => { setLevelFilter('all'); setTypeFilter('all'); setSearch('') }}
              className="text-sm text-gray-400 hover:text-gray-600 font-semibold"
            >
              清除筛选
            </button>
          )}

          <span className="ml-auto text-xs text-gray-400 font-mono">
            显示 {filtered.length} 条
          </span>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              <div className="text-4xl mb-3">📋</div>
              <div className="font-semibold">暂无记录</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-50">
                <thead className="bg-gray-50">
                  <tr>
                    <Th field="submittedAt">提交时间</Th>
                    <Th field="studentName">微信名</Th>
                    <th className="px-4 py-3 text-left text-[11px] font-black text-gray-400 uppercase tracking-wider whitespace-nowrap">类型</th>
                    <th className="px-4 py-3 text-left text-[11px] font-black text-gray-400 uppercase tracking-wider whitespace-nowrap">级别</th>
                    <Th field="score">分数</Th>
                    <Th field="correctCount">答对</Th>
                    <th className="px-4 py-3 text-left text-[11px] font-black text-gray-400 uppercase tracking-wider whitespace-nowrap">错题</th>
                    <Th field="passed">判断</Th>
                    <th className="px-4 py-3 text-left text-[11px] font-black text-gray-400 uppercase tracking-wider whitespace-nowrap">虚构错题</th>
                    <th className="px-4 py-3 text-left text-[11px] font-black text-gray-400 uppercase tracking-wider whitespace-nowrap">非虚构错题</th>
                    <th className="px-4 py-3 text-left text-[11px] font-black text-gray-400 uppercase tracking-wider whitespace-nowrap">薄弱能力</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map(r => (
                    <tr key={r.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap font-mono">
                        {r.submittedAt}
                      </td>
                      <td className="px-4 py-3 font-extrabold text-gray-800 whitespace-nowrap">
                        {r.studentName}
                      </td>
                      <td className="px-4 py-3">
                        {(r.testType || 'upgrade') === 'placement' ? (
                          <span className="text-xs font-black bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                            插班
                          </span>
                        ) : (
                          <span className="text-xs font-black bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                            升级
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-black bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                          {r.levelId}级
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-base font-black font-mono
                          ${r.score >= 80 ? 'text-green-600' : 'text-red-500'}`}>
                          {r.score}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 font-mono">
                        {r.correctCount}/{r.wrongQuestions ? r.correctCount + r.wrongQuestions.length : '?'}
                      </td>
                      <td className="px-4 py-3 text-xs text-amber-600 font-bold max-w-[160px] truncate">
                        {(r.wrongQuestions || []).length === 0
                          ? <span className="text-green-500">全对</span>
                          : (r.wrongQuestions || []).map(q => `Q${q.id}`).join('、')}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-black px-2 py-0.5 rounded-full whitespace-nowrap
                          ${r.score >= 80 ? 'bg-green-100 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                          {r.score >= 80 ? `可以读${r.levelId}级别` : '建议降级巩固'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs font-mono text-center text-gray-500">
                        {r.fictionWrong ?? '—'}
                      </td>
                      <td className="px-4 py-3 text-xs font-mono text-center text-gray-500">
                        {r.nonfictionWrong ?? '—'}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-400 max-w-[140px] truncate">
                        {(r.weakSkills || []).join(' / ') || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Clear confirm modal */}
      {confirmClear && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center
                        justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-7 max-w-sm w-full animate-fade-in-down">
            <div className="text-3xl text-center mb-3">⚠️</div>
            <h3 className="text-xl font-black text-center text-gray-800 mb-2">确认清空所有数据？</h3>
            <p className="text-sm text-gray-500 text-center mb-5 leading-relaxed">
              将永久删除本地 <strong>{records.length}</strong> 条测试记录，无法恢复。
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmClear(false)}
                className="flex-1 py-3 rounded-xl bg-gray-100 hover:bg-gray-200
                           text-gray-700 font-bold transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleClear}
                className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600
                           text-white font-black transition-colors"
              >
                确认清空
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
