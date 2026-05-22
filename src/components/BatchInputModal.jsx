import BatchInput from './BatchInput'

export default function BatchInputModal({ totalQuestions, onFill, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/45 p-3
                 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="批量输入答案"
    >
      <div className="w-full max-w-lg rounded-3xl bg-white p-4 shadow-2xl sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-black text-gray-800">批量输入答案</h3>
            <p className="text-xs font-medium text-gray-500">
              支持 ABCD、A B C D、A,B,C,D 或每5题换行。
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] min-w-[40px] rounded-full bg-gray-100 text-lg
                       font-black text-gray-500 transition-colors hover:bg-gray-200"
            aria-label="关闭批量输入答案"
          >
            ×
          </button>
        </div>
        <BatchInput totalQuestions={totalQuestions} onFill={onFill} />
      </div>
    </div>
  )
}
