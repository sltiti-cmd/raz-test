export default function Toast({ toast }) {
  if (!toast) return null

  const colors = {
    success: 'bg-gray-800 text-white',
    error:   'bg-red-600 text-white',
    info:    'bg-teal-600 text-white',
  }

  return (
    <div
      key={toast.key}
      className={`fixed top-5 left-1/2 z-[9999] px-5 py-3 rounded-2xl shadow-xl
                  text-sm font-semibold pointer-events-none animate-toast-in
                  ${colors[toast.type] || colors.success}`}
      style={{ transform: 'translateX(-50%)' }}
    >
      {toast.message}
    </div>
  )
}
