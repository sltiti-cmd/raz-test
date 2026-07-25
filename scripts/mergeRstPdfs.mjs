/**
 * mergeRstPdfs.mjs — 合并 R/S/T 级别的 passage + quiz PDF（用 MuPDF，容错强）。
 * 每级生成两份：
 *   {L}级别测试-无答案.pdf  = 各篇 [文章页 + quiz 题目页]（去掉最后的答案页）
 *   {L}级别测试-附答案.pdf  = 各篇 [文章页 + quiz 全部页（含答案页）]
 * RAZ quiz PDF 的答案页固定是最后一页（已核对全部 12 篇）。
 *
 * 运行：node scripts/mergeRstPdfs.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import * as mupdf from 'mupdf'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')          // raz-test
const RAW = path.resolve(ROOT, '..', 'raw')         // test/raw (原始 PDF)
const PUBLIC_OUT = path.join(ROOT, 'public', 'raw') // 运行时/构建目录
const VALIDATOR_OUT = RAW                            // 校验脚本查找的父级 raw 目录

// 每级按文章顺序（虚构/非虚构交替，同主题成对）
const LEVELS = {
  R: [
    { folder: 'Running With Jennifer',      base: 'running_with_jennifer_lvl_r' },
    { folder: 'Billy Mills, Olympic Star',  base: 'billy_mills_olympic_star_lvl_r' },
    { folder: 'The Rhino Road Stop',        base: 'the_rhino_road_stop_lvl_r' },
    { folder: 'Rhino Rescue',               base: 'rhino_rescue_lvl_r' },
  ],
  S: [
    { folder: 'The Field Day Flash Mob',    base: 'the_field_day_flash_mob_lvl_s' },
    { folder: 'Flash Mobs!',                base: 'flash_mobs_lvl_s' },
    { folder: 'The Hidden House',           base: 'the_hidden_house_lvl_s' },
    { folder: 'Unusual Homes',              base: 'unusual_homes_lvl_s' },
  ],
  T: [
    { folder: 'A Night in the Trees',       base: 'a_night_in_the_trees_lvl_t' },
    { folder: 'Homes High in the Trees',    base: 'homes_high_in_the_trees_lvl_t' },
    { folder: 'The Reading Chair',          base: 'the_reading_chair_lvl_t' },
    { folder: 'Making Cars',                base: 'making_cars_lvl_t' },
  ],
}

function openPdf(p) {
  const bytes = new Uint8Array(fs.readFileSync(p))
  return mupdf.PDFDocument.openDocument(bytes, 'application/pdf')
}

// 把 src 的 [from, to) 页依次追加到 dst 末尾
function graftRange(dst, src, from, to) {
  for (let i = from; i < to; i++) dst.graftPage(-1, src, i)
}

function saveDoc(doc, outPath) {
  const buf = doc.saveToBuffer('compress')
  fs.writeFileSync(outPath, buf.asUint8Array())
}

function buildLevel(level, entries) {
  const noAns = new mupdf.PDFDocument()
  const withAns = new mupdf.PDFDocument()

  for (const { folder, base } of entries) {
    const passagePath = path.join(RAW, level, folder, `${base}_passage.pdf`)
    const quizPath = path.join(RAW, level, folder, `${base}_quiz.pdf`)
    if (!fs.existsSync(passagePath)) throw new Error(`missing ${passagePath}`)
    if (!fs.existsSync(quizPath)) throw new Error(`missing ${quizPath}`)

    const passage = openPdf(passagePath)
    const quiz = openPdf(quizPath)
    const pPages = passage.countPages()
    const qPages = quiz.countPages()
    const lastQuiz = qPages - 1 // 答案页 = 最后一页

    // 文章页 → 两份都要
    graftRange(noAns, passage, 0, pPages)
    graftRange(withAns, passage, 0, pPages)

    // 无答案版：quiz 除最后一页（答案页）外的题目页
    graftRange(noAns, quiz, 0, lastQuiz)
    // 附答案版：quiz 全部页（含答案页）
    graftRange(withAns, quiz, 0, qPages)

    console.log(`  ${level} · ${folder}: 文章${pPages}页, quiz${qPages}页(题目${lastQuiz}/答案1)`)
  }

  const noName = `${level}级别测试-无答案.pdf`
  const waName = `${level}级别测试-附答案.pdf`
  // 无答案版 → public(会部署) + raw(教师/校验)
  for (const outDir of [path.join(PUBLIC_OUT, level), path.join(VALIDATOR_OUT, level)]) {
    fs.mkdirSync(outDir, { recursive: true })
    saveDoc(noAns, path.join(outDir, noName))
  }
  // 附答案版（含答案）→ 只写 raw(教师)，绝不放进 public，避免学生下载到答案
  fs.mkdirSync(path.join(VALIDATOR_OUT, level), { recursive: true })
  saveDoc(withAns, path.join(VALIDATOR_OUT, level, waName))
  console.log(`✓ ${level}: 无答案 ${noAns.countPages()}页 → public+raw；附答案 ${withAns.countPages()}页 → 仅 raw(教师)\n`)
}

for (const [level, entries] of Object.entries(LEVELS)) {
  console.log(`── Level ${level} ──`)
  buildLevel(level, entries)
}
console.log('全部完成。')
