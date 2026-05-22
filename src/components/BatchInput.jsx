import { useState } from 'react'

export default function BatchInput({ totalQuestions, onFill }) {
  const [raw, setRaw] = useState('')
  const [error, setError] = useState('')

  const parse = () => {
    const tokens = (raw.toUpperCase().match(/[ABCD]/g) || [])

    if (tokens.length !== totalQuestions) {
      setError(
        `需要 ${totalQuestions} 个答案，当前识别到 ${tokens.length} 个。请检查格式。`
      )
      return
    }

    setError('')
    onFill(tokens)
  }

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5">
      <h4 className="font-bold text-purple-800 mb-1">📝 批量输入答案</h4>
      <p className="text-xs text-purple-600 mb-3">
        直接输入 {totalQuestions} 个答案字母，连续输入即可。
        <br />
        示例：BAAABBABABBABAABAAABA
      </p>
      <textarea
        value={raw}
        onChange={(e) => {
          setRaw(e.target.value)
          setError('')
        }}
        rows={4}
        placeholder={`连续输入${totalQuestions}个字母，例如：\nBAAAABBABAB\nBABABAAABA`}
        className="w-full border border-purple-300 rounded-xl px-4 py-3 text-base font-mono focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white resize-none"
      />
      {error && (
        <p className="text-red-600 text-sm mt-2 font-medium">⚠️ {error}</p>
      )}
      <div className="flex gap-3 mt-3">
        <button
          type="button"
          onClick={parse}
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-xl transition-colors"
        >
          批量填入
        </button>
        <button
          type="button"
          onClick={() => {
            setRaw('')
            setError('')
          }}
          className="px-4 py-2.5 rounded-xl bg-white border border-purple-200 text-purple-600 font-medium hover:bg-purple-50 transition-colors"
        >
          清空
        </button>
      </div>
    </div>
  )
}
