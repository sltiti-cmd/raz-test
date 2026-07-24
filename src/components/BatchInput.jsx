import { useState } from 'react'

export default function BatchInput({ totalQuestions, onFill }) {
  const [raw, setRaw] = useState('')
  const [error, setError] = useState('')

  const tokens = raw.toUpperCase().match(/[ABCD]/g) || []
  const count = tokens.length
  const ready = count === totalQuestions

  const parse = () => {
    if (!ready) {
      setError(
        `需要 ${totalQuestions} 个答案，当前识别到 ${count} 个。请检查格式。`
      )
      return
    }
    setError('')
    onFill(tokens)
  }

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 sm:p-5">
      <p className="text-xs text-purple-600 mb-3">
        按题号顺序连续输入 {totalQuestions} 个答案字母（可含空格、逗号或换行）。
        <br />
        示例：BAAABBABABBABAABAAABA
      </p>
      <textarea
        value={raw}
        onChange={(e) => {
          setRaw(e.target.value)
          setError('')
        }}
        rows={3}
        autoFocus
        autoCapitalize="characters"
        autoCorrect="off"
        spellCheck={false}
        placeholder={`连续输入${totalQuestions}个字母，例如：\nBAAAABBABABBABABAAABA`}
        className="w-full border border-purple-300 rounded-xl px-4 py-3 text-base font-mono tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white resize-none"
      />
      <p className={`text-sm mt-2 font-bold ${ready ? 'text-green-600' : 'text-purple-500'}`}>
        {ready ? '✓' : ''} 已识别 {count}/{totalQuestions} 个答案
      </p>
      {error && (
        <p className="text-red-600 text-sm mt-1 font-medium">⚠️ {error}</p>
      )}
      <div className="flex gap-3 mt-3">
        <button
          type="button"
          onClick={parse}
          disabled={!ready}
          className="flex-1 btn-candy-purple min-h-[48px]"
        >
          {ready ? '填入并提交 →' : '批量填入'}
        </button>
        <button
          type="button"
          onClick={() => {
            setRaw('')
            setError('')
          }}
          className="px-4 py-3 rounded-xl bg-white border border-purple-200 text-purple-600 font-medium hover:bg-purple-50 transition-colors"
        >
          清空
        </button>
      </div>
    </div>
  )
}
