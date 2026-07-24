import { useState } from 'react'

const NAME_STORAGE_KEY = 'raz-student-name'

const ACCENTS = {
  teal: {
    focusBorder: 'focus:border-teal-400',
    goTo: 'bg-teal-500 hover:bg-teal-600',
  },
  purple: {
    focusBorder: 'focus:border-purple-400',
    goTo: 'bg-purple-500 hover:bg-purple-600',
  },
}

// 提交弹窗：合并「未答确认」和「微信名输入」为一步。
// 手机上顶部对齐，避免输入法键盘遮挡输入框。
export default function SubmitModal({ total, unanswered, accent = 'teal', onGoTo, onClose, onSubmit }) {
  const [name, setName] = useState(() => {
    try { return localStorage.getItem(NAME_STORAGE_KEY) || '' } catch { return '' }
  })
  const [nameErr, setNameErr] = useState('')
  const colors = ACCENTS[accent] || ACCENTS.teal
  const hasMissing = unanswered.length > 0

  const submit = () => {
    const trimmed = name.trim()
    if (!trimmed) { setNameErr('请填写微信名'); return }
    try { localStorage.setItem(NAME_STORAGE_KEY, trimmed) } catch { /* ignore */ }
    onSubmit(trimmed)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm">
      <div className="flex min-h-full justify-center p-4 pt-[8vh] sm:items-center sm:pt-4">
        <div className="h-fit w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl animate-fade-in-down sm:p-7">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">{hasMissing ? '⚠️' : '🎯'}</div>
            <h3 className="text-xl font-black text-gray-800">
              {hasMissing ? '有题目未作答' : '全部作答完成！'}
            </h3>
            {hasMissing ? (
              <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
                以下题目还未作答：
                <span className="font-bold text-orange-500"> Q{unanswered.join('、Q')}</span>
              </p>
            ) : (
              <p className="text-sm text-gray-400 mt-1">
                共 {total} 题已全部作答
              </p>
            )}
            <p className="text-xs text-gray-400 mt-1">提交后不可修改</p>
          </div>

          {hasMissing && (
            <button
              onClick={onGoTo}
              className={`w-full mb-4 min-h-[48px] rounded-2xl ${colors.goTo} text-white font-black transition-colors`}
            >
              去补答 →
            </button>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1.5">
                微信名 <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setNameErr('') }}
                placeholder="请输入微信名"
                autoFocus={!name}
                enterKeyHint="done"
                onKeyDown={(e) => e.key === 'Enter' && submit()}
                className={`w-full border-2 border-gray-100 ${colors.focusBorder} rounded-xl
                           px-4 py-3 text-base outline-none transition-colors bg-gray-50
                           focus:bg-white`}
              />
              {nameErr && <p className="text-red-400 text-xs mt-1">{nameErr}</p>}
            </div>
            <button
              onClick={submit}
              className="w-full btn-candy-orange min-h-[54px] text-lg"
            >
              {hasMissing ? '仍要提交，查看报告 →' : '提交，查看报告 →'}
            </button>
            <button
              onClick={onClose}
              className="w-full text-center text-gray-400 text-sm py-1 hover:text-gray-600 transition-colors"
            >
              返回修改答案
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
