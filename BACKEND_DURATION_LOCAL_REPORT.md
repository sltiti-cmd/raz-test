# Stacey老师 RAZ测试系统后端用时记录本地测试报告

## 修改文件
- `backend/app.py`
- `backend/templates/admin.html`

## 数据库字段
已为 `submissions` 表增加：
- `duration_seconds INTEGER`
- `duration_text TEXT`

## 安全迁移逻辑
- `init_db()` 启动时会先执行 `CREATE TABLE IF NOT EXISTS submissions`。
- 随后通过 `PRAGMA table_info(submissions)` 检查已有字段。
- 如果字段不存在，才执行：
  - `ALTER TABLE submissions ADD COLUMN duration_seconds INTEGER`
  - `ALTER TABLE submissions ADD COLUMN duration_text TEXT`
- 字段已存在时不会重复添加。
- 不重建表，不清空旧数据。
- 老数据允许用时字段为空。

## /api/submit
已支持接收并保存前端 payload：
- `durationSeconds` -> `duration_seconds`
- `durationText` -> `duration_text`

兼容性：
- 前端不传 `durationSeconds` 时不会报错。
- 前端不传 `durationText` 时不会报错。
- 原有字段仍正常保存：微信名、级别、分数、答对、错题、判断、薄弱能力、虚构错题、非虚构错题、备注。

## /admin 后台
后台表格已增加一列：
- `用时`

显示规则：
- 有 `duration_text` 时显示该值。
- 为空时显示 `-`。

后台登录：
- `/admin` 未登录时仍会跳转到 `/admin/login`。
- `/admin/login` 页面可正常打开。

## /admin/export
CSV 导出已增加一列：
- `用时`

对应字段：
- `duration_text`

## 本地测试
测试方式：
- 使用临时 SQLite 数据库，不使用、不生成项目内 `backend/submissions.db`。
- 使用 Flask test client 提交一条测试记录。

测试 payload 用时：
- `durationSeconds: 1112`
- `durationText: 18m32s`

测试结果：
- `duration_seconds` 字段存在：通过
- `duration_text` 字段存在：通过
- `/api/submit` 返回 200：通过
- SQLite 写入 `duration_seconds = 1112`：通过
- SQLite 写入 `duration_text = 18m32s`：通过
- `/admin` 登录后返回 200：通过
- `/admin` 页面包含用时：通过
- `/admin/export` 返回 200：通过
- CSV 第 6 列导出用时：通过
- `/admin` 未登录返回 302 并跳转 `/admin/login`：通过

## 项目检查
- `npm run validate:data`：通过，24/24。
- `npm run build`：成功。
- build warning：Vite 提示 JS chunk 超过 500 kB，这是体积提醒，不影响本次功能。

## 数据安全
- 未修改 `src/data/levels/`
- 未修改 `src/data/placement/`
- 未修改 answer、skill、type、文章、题干、选项
- 未提交、未保留 `submissions.db`
- 未记录 IP
- 未部署服务器

## 结论
后端本地代码已具备保存、后台显示、CSV 导出测试用时的能力，可以进入服务器部署阶段。
