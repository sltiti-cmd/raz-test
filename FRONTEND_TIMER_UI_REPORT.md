# Stacey老师 RAZ测试系统前端计时与报告文案优化报告

## 修改范围
- `src/components/LevelCard.jsx`
  - 级别卡片统一显示：`4篇文章 · 20题 · 每题5分 · 约20分钟`
  - 增加阅读要求说明：
    - A-F：题干个别生词可看中文提示；文章和选项不读、不解释。
    - G级及以上：独立阅读文章和选项，不翻译、不解释。
  - 保留按钮：在线做题、下载PDF打印。
- `src/pages/TestPage.jsx`
  - 答题页顶部改为“测试说明”信息卡片。
  - 增加正计时：`已用时：00:00`。
  - 提交时写入 `durationSeconds` 和 `durationText`。
  - 去掉“继续在线做题”提示按钮。
- `src/pages/PlacementPage.jsx`
  - 插班测试页同步增加测试说明、正计时、用时 payload。
- `src/pages/ResultPage.jsx`
  - 结果页增加：`用时 ➭ {durationText}`。
  - 判断规则改为：`score >= 80` 显示“可以读{levelId}级别”，低于 80 显示“建议降级巩固”。
- `src/components/ResultReport.jsx`
  - 报告截图区域增加用时。
  - 建议文案按 80 分线调整。
- `src/utils/report.js`
  - 复制报告文字增加用时。
  - 移除“优秀 / 良好 / 及格 / 不通过 / 建议继续巩固”等旧判断文案。
- `src/utils/grading.js`
  - `passed` 统一按 `score >= 80` 计算。
- `src/utils/exportCsv.js`、`src/pages/AdminPage.jsx`
  - 前端后台/导出里的阅读判断同步为新文案。
- `src/utils/testTiming.js`
  - 新增计时格式化工具。

## 未修改内容
- 未修改 `src/data/levels/`
- 未修改 `src/data/placement/`
- 未修改 answer、skill、type、文章、题干、选项
- 未修改 PDF 文件

## 验证结果
- `npm run validate:data`：通过，24/24。
- `npm run build`：成功。
- 构建 warning：Vite 提示 JS chunk 超过 500 kB，这是现有体积提醒，不影响本次功能。
- 源码扫描确认：
  - 未出现“继续在线做题”
  - 未出现“优秀 / 良好 / 及格 / 不通过 / 建议继续巩固”
  - 已加入 `durationSeconds`、`durationText`
  - 已显示“测试说明”“已用时”“下载PDF试卷”“批量输入答案”

## 浏览器检查说明
- Codex in-app browser 对本地 `localhost/127.0.0.1` 返回 `ERR_BLOCKED_BY_CLIENT`，无法直接完成插件浏览器检查。
- 已用本地构建和源码扫描完成关键 UI/文案/规则验证。
- 建议在真实浏览器打开本地或线上页面再做一次人工视觉确认：
  - 首页卡片文案是否不挤压按钮
  - 插班页 H/Q 等高等级是否显示独立阅读要求
  - 答题页计时是否每秒递增
  - 提交后报告是否显示用时

## 后端记录用时
- 前端提交 payload 已包含：
  - `durationSeconds`
  - `durationText`
- 当前 Flask 后端提交接口会忽略数据库表中不存在的额外字段，因此不会导致前端报错。
- 如果需要后台数据库和导出文件也永久记录用时，下一步需要单独做后端 SQLite 字段迁移和后台表格展示。

## 结论
- 本轮前端 UI、报告判断规则、提交 payload 已完成。
- 可以进入下一步：后端记录用时字段迁移，或先部署前端体验版本。
