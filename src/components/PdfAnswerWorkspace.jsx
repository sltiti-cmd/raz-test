import { useEffect, useMemo, useState } from 'react'

export default function PdfAnswerWorkspace({
  levelData,
  questions,
  currentAnswers,
  onApply,
  onClose,
}) {
  const [draft, setDraft] = useState(() => ({ ...currentAnswers }))
  const pdfSrc = `${import.meta.env.BASE_URL}${levelData.printPdf.replace(/^\//, '')}`
  const filledCount = useMemo(
    () => questions.filter(question => draft[question.id]).length,
    [draft, questions],
  )

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 bg-[#172733]/70 p-2 sm:p-4 backdrop-blur-sm" role="presentation">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="pdf-workspace-title"
        className="mx-auto flex h-full max-w-[1500px] flex-col overflow-hidden rounded-[24px] border border-white/50 bg-[#f4f1e8] shadow-[0_28px_90px_rgba(15,32,43,0.42)]"
      >
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ded8c9] bg-[#fffdf8] px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-[#29465b] text-sm font-black text-white shadow-[0_3px_0_#193245]">
              {levelData.id}
            </span>
            <div className="min-w-0">
              <h2 id="pdf-workspace-title" className="truncate text-base font-black tracking-tight text-[#213747] sm:text-xl">
                PDF 对照答题
              </h2>
              <p className="truncate text-xs font-semibold text-[#78837f] sm:text-sm">
                左侧看原卷 · 右侧填写答案 · 已完成 {filledCount}/{questions.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={pdfSrc}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[40px] items-center rounded-xl border border-[#c9b979] bg-[#f5edcf] px-3 text-xs font-black text-[#655b38] transition-colors hover:bg-[#eee2b7] sm:text-sm"
            >
              下载 / 新窗口打开
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="关闭 PDF 对照答题"
              className="grid h-10 w-10 place-items-center rounded-xl border border-[#d9d5ca] bg-white text-xl font-bold text-[#627079] transition-colors hover:bg-[#f0eee8]"
            >
              ×
            </button>
          </div>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 p-3 sm:grid-cols-[minmax(0,1fr)_300px] lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-h-[44vh] overflow-hidden rounded-2xl border border-[#d8d3c7] bg-[#d8d6d0] shadow-inner sm:min-h-0">
            {levelData.pdfPreviewPages?.length ? (
              <div className="h-full min-h-[44vh] overflow-y-auto p-2 sm:min-h-0 sm:p-3">
                <div className="mx-auto max-w-[850px] space-y-3">
                  {levelData.pdfPreviewPages.map((page, index) => (
                    <figure key={page} className="overflow-hidden rounded-sm bg-white shadow-[0_4px_18px_rgba(20,31,38,0.2)]">
                      <img
                        src={`${import.meta.env.BASE_URL}${page.replace(/^\//, '')}`}
                        alt={`${levelData.id}级原 PDF 第 ${index + 1} 页`}
                        className="block h-auto w-full"
                      />
                      <figcaption className="border-t border-[#eeeae1] py-1.5 text-center text-[10px] font-bold text-[#89918e]">
                        第 {index + 1} / {levelData.pdfPreviewPages.length} 页
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            ) : (
              <iframe
                title={`${levelData.id}级 PDF 原卷`}
                src={pdfSrc}
                className="h-full min-h-[44vh] w-full bg-white sm:min-h-0"
              />
            )}
          </div>

          <aside className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-[#d8d3c7] bg-[#fffdf8] shadow-[0_10px_28px_rgba(41,70,91,0.08)]">
            <div className="border-b border-[#e4dfd3] px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-black text-[#29465b]">快速答题卡</h3>
                  <p className="mt-0.5 text-xs font-semibold text-[#8a918d]">可边滚动原卷边作答</p>
                </div>
                <span className="rounded-full bg-[#edf2ed] px-3 py-1 text-xs font-black text-[#5f7665]">
                  {filledCount}/{questions.length}
                </span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#ebe8df]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#5f7a67] to-[#b7a565] transition-all"
                  style={{ width: `${(filledCount / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-3">
              <div className="grid grid-cols-2 gap-2">
                {questions.map((question) => (
                  <div
                    key={question.id}
                    className={`rounded-xl border p-2.5 transition-colors ${
                      draft[question.id]
                        ? 'border-[#b7c6b8] bg-[#f2f6f1]'
                        : 'border-[#e5e1d7] bg-white'
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-black text-[#53636c]">第 {question.id} 题</span>
                      {draft[question.id] && <span className="text-xs font-black text-[#617b68]">✓</span>}
                    </div>
                    <div className="flex gap-1.5">
                      {question.options.map(option => {
                        const selected = draft[question.id] === option.key
                        return (
                          <button
                            key={option.key}
                            type="button"
                            onClick={() => setDraft(previous => ({ ...previous, [question.id]: option.key }))}
                            className={`min-h-[38px] flex-1 rounded-lg border text-sm font-black transition-all ${
                              selected
                                ? 'border-[#29465b] bg-[#29465b] text-white shadow-[0_2px_0_#173042]'
                                : 'border-[#d9d6cc] bg-[#fbfaf6] text-[#66747a] hover:border-[#9aaa9e] hover:bg-[#f0f4ef]'
                            }`}
                          >
                            {option.key}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <footer className="grid grid-cols-[auto_1fr] gap-2 border-t border-[#e4dfd3] bg-[#faf8f2] p-3">
              <button
                type="button"
                onClick={() => setDraft({})}
                className="min-h-[46px] rounded-xl border border-[#d7d3ca] bg-white px-4 text-sm font-black text-[#778087] hover:bg-[#f0eee8]"
              >
                清空
              </button>
              <button
                type="button"
                onClick={() => onApply(draft)}
                className="min-h-[46px] rounded-xl bg-[#29465b] px-4 text-sm font-black text-white shadow-[0_4px_0_#173042] transition-all hover:bg-[#203a4d] active:translate-y-[2px] active:shadow-none"
              >
                保存答案并返回题目
              </button>
            </footer>
          </aside>
        </div>
      </section>
    </div>
  )
}
