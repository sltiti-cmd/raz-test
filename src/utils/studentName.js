// 小朋友姓名记忆：阅读测试、插班测试、听力测试共用同一个 key，
// 保证同一台设备切换测试类型时姓名自动带出、拼写一致，方便后台按姓名对齐同一个孩子的多次测试。
const NAME_STORAGE_KEY = 'raz-student-name'

export function getSavedStudentName() {
  try {
    return localStorage.getItem(NAME_STORAGE_KEY) || ''
  } catch {
    return ''
  }
}

export function saveStudentName(name) {
  const trimmed = (name || '').trim()
  if (!trimmed) return
  try {
    localStorage.setItem(NAME_STORAGE_KEY, trimmed)
  } catch {
    /* ignore */
  }
}
