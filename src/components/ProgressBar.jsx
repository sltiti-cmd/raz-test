export default function ProgressBar({ current, total, answered }) {
  const pct = Math.round((answered / total) * 100)

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>
          已答 <span className="font-bold text-teal-600">{answered}</span> / {total}
        </span>
        <span className="ml-3">{pct}%</span>
      </div>
      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-teal-500 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
