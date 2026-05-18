import { useState } from 'react'

export default function FeedbackWidget() {
  const [open, setOpen]       = useState(false)
  const [content, setContent] = useState('')
  const [phone, setPhone]     = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [err, setErr]         = useState('')

  const handleSubmit = () => {
    if (!content.trim()) { setErr('请描述一下遇到的问题'); return }
    const record = {
      content: content.trim(),
      phone: phone.trim() || null,
      submittedAt: new Date().toLocaleString('zh-CN'),
    }
    const existing = JSON.parse(localStorage.getItem('raz-feedback') || '[]')
    localStorage.setItem('raz-feedback', JSON.stringify([...existing, record]))
    fetch('http://localhost:8000/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    }).catch(() => {})
    setSubmitted(true)
  }

  const handleClose = () => {
    setOpen(false)
    setContent('')
    setPhone('')
    setSubmitted(false)
    setErr('')
  }

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 bg-white border border-gray-200
                   shadow-lg hover:shadow-xl text-gray-400 hover:text-teal-500
                   hover:border-teal-200 rounded-full px-3.5 py-2 text-xs font-bold
                   transition-all duration-200 no-print"
        title="问题反馈"
      >
        问题反馈
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end
                        sm:items-center justify-center z-50 p-4 no-print">
          <div className="bg-white rounded-3xl shadow-2xl p-7 w-full max-w-sm
                          animate-fade-in-down">
            {submitted ? (
              <div className="text-center py-4">
                <div className="text-4xl mb-3">🙏</div>
                <h3 className="text-lg font-black text-gray-800 mb-1">感谢反馈！</h3>
                <p className="text-sm text-gray-400 mb-5">我们会认真查看每一条建议。</p>
                <button
                  onClick={handleClose}
                  className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-600
                             text-white font-black transition-colors"
                >
                  关闭
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-black text-gray-800">问题反馈</h3>
                  <button
                    onClick={handleClose}
                    className="w-7 h-7 flex items-center justify-center rounded-full
                               text-gray-400 hover:text-gray-600 hover:bg-gray-100
                               transition-colors text-lg leading-none"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-600 mb-1.5">
                      遇到了什么问题？<span className="text-red-400">*</span>
                    </label>
                    <textarea
                      value={content}
                      onChange={(e) => { setContent(e.target.value); setErr('') }}
                      placeholder="请描述题目错误、显示异常等问题…"
                      rows={3}
                      className="w-full border-2 border-gray-100 focus:border-teal-400 rounded-xl
                                 px-4 py-3 text-sm outline-none transition-colors resize-none
                                 bg-gray-50 focus:bg-white"
                    />
                    {err && <p className="text-red-400 text-xs mt-1">{err}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-600 mb-1.5">
                      手机号
                      <span className="text-gray-400 font-normal ml-1">（可选，方便回访）</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="选填"
                      className="w-full border-2 border-gray-100 focus:border-teal-400 rounded-xl
                                 px-4 py-3 text-sm outline-none transition-colors bg-gray-50
                                 focus:bg-white"
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full bg-teal-500 hover:bg-teal-600 active:bg-teal-700
                               text-white font-black py-3.5 rounded-xl transition-colors shadow-sm"
                  >
                    提交反馈
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
