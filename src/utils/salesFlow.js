// 从小麦问卷（xiaomaisales.vocabfun.cn）跳过来的家长：
// 链接带 ?src=sales&name=微信名，记住来源并预填姓名；成绩页按分数给出下一步（继续测 / 介绍陪跑营）。
import { saveStudentName } from './studentName'

const SOURCE_STORAGE_KEY = 'raz-src'
const SURVEY_ID_STORAGE_KEY = 'raz-survey-id'

const RAZ_ORDER = ['AA', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T']
const MAIN_TEST_LEVELS = ['A', 'D', 'G', 'K', 'O', 'R']

export function captureSalesParams() {
  try {
    const params = new URLSearchParams(window.location.search)
    if (params.get('src') === 'sales') {
      localStorage.setItem(SOURCE_STORAGE_KEY, 'sales')
      // 问卷编号：新链接带了就更新；没带（旧链接）就清掉，避免挂到别人的问卷上
      const sid = params.get('sid')
      if (sid && /^\d+$/.test(sid)) localStorage.setItem(SURVEY_ID_STORAGE_KEY, sid)
      else localStorage.removeItem(SURVEY_ID_STORAGE_KEY)
    }
    if (params.get('name')) saveStudentName(params.get('name'))
  } catch {
    /* ignore */
  }
}

export function isFromSales() {
  try {
    return localStorage.getItem(SOURCE_STORAGE_KEY) === 'sales'
  } catch {
    return false
  }
}

// 提交成绩时带上，后台据此把成绩挂到对应问卷
export function getSurveyId() {
  try {
    const sid = localStorage.getItem(SURVEY_ID_STORAGE_KEY)
    return sid ? Number(sid) : null
  } catch {
    return null
  }
}

export function getStageByLevel(level) {
  const idx = Math.max(RAZ_ORDER.indexOf(level), 0)
  if (idx <= RAZ_ORDER.indexOf('C')) return { name: '启蒙阶段', range: 'AA-C' }
  if (idx <= RAZ_ORDER.indexOf('G')) return { name: '认读阶段', range: 'D-G' }
  if (idx <= RAZ_ORDER.indexOf('L')) return { name: '桥梁阶段', range: 'H-L' }
  if (idx <= RAZ_ORDER.indexOf('P')) return { name: '初章阶段', range: 'M-P' }
  return { name: '中章阶段', range: 'Q 以上' }
}

// A/D/G/K/O/R 走升级测试，其余走插班测试
export function getTestForLevel(level) {
  if (MAIN_TEST_LEVELS.includes(level)) {
    return { level, label: `${level} 级阅读测试`, path: `/test/${level.toLowerCase()}` }
  }
  return { level, label: `${level} 级插班测试`, path: `/placement/${level.toLowerCase()}` }
}

// 80 分及以上：介绍产品；65-79 降 1 级；55-64 降 2 级；55 以下降 3 级，继续推测试
export function getSalesNextStep(score, levelId) {
  const level = String(levelId || '').toUpperCase()
  const idx = RAZ_ORDER.indexOf(level)
  if (idx < 0) return null
  if (score >= 80) return { kind: 'product', level, stage: getStageByLevel(level) }

  const drop = score >= 65 ? 1 : score >= 55 ? 2 : 3
  const targetIdx = idx - drop
  // 降到 A 以下没有测试了，直接从 AA 启蒙开始
  if (targetIdx < RAZ_ORDER.indexOf('A')) {
    return { kind: 'product', level: 'AA', stage: getStageByLevel('AA'), dropped: true }
  }
  return { kind: 'retest', drop, test: getTestForLevel(RAZ_ORDER[targetIdx]) }
}
