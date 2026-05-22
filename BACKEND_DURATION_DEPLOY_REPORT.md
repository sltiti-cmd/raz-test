# Stacey老师 RAZ测试系统后端用时记录部署报告

## 1. 数据库备份
- 已在服务器部署前备份 SQLite 数据库。
- 服务器数据库路径：`/www/wwwroot/raz-test-source/backend/submissions.db`
- 备份文件名：`submissions_backup_20260521_200823.db`
- 备份位置：`/www/wwwroot/raz-test-source/backend/submissions_backup_20260521_200823.db`
- 未删除、未覆盖原数据库。

## 2. 代码与部署
- 本地提交：`3b069e4 feat: add test duration tracking`
- 服务器已拉取该提交并重新构建前端。
- 前端发布目录：`/www/wwwroot/raz-test`
- 后端目录：`/www/wwwroot/raz-test-source/backend`
- 后端服务：`raz-backend.service`
- 后端监听：`127.0.0.1:8001`

## 3. 字段迁移
- `duration_seconds`：已存在
- `duration_text`：已存在
- 迁移方式为启动后端时自动检查字段，不存在才 `ALTER TABLE`。
- 未重建表，未清空旧数据。

## 4. 接口验收
- `/api/submit` 已用测试 payload 验证。
- 测试记录名：`DurationDeployTest_20260521_...`
- 写入结果：
  - `duration_seconds = 125`
  - `duration_text = 2分05秒`
- `/api/submit` 返回 `{"ok": true}`。

## 5. 后台验收
- `/admin` 初次复验发现旧模板使用了 Jinja 不支持的 `prepend` filter，导致后台 500。
- 已在服务器热修复后台错题列表模板。
- 热修复后复验：
  - `/admin` 状态：200
  - 后台可显示测试用时：是
  - 旧数据可继续显示：是

## 6. 导出验收
- `/admin/export` 状态：200
- CSV 已包含“用时”列。
- 导出字段顺序包含：提交时间、微信名、级别、分数、答对题数、用时、错题、是否通过、薄弱能力、虚构错题、非虚构错题、备注。

## 7. 前端线上验收
- `https://benchmark.vocabfun.cn/`：可打开
- `https://benchmark.vocabfun.cn/placement/h`：可打开，显示测试说明和计时
- `https://benchmark.vocabfun.cn/test/a`：可打开，显示测试说明和计时
- `https://benchmark.vocabfun.cn/admin/login`：可打开

## 8. 服务状态
- 后端服务重启成功：active
- Nginx 配置检查通过
- Nginx reload 成功

## 9. 注意事项
- 服务器已做一次直接热修复：后台模板错题列表不再使用 `prepend` filter。
- 本地已提交同样修复：`7747d62 fix: render admin wrong question list`
- 该提交尚未 push 到 GitHub，因为当前环境无法读取 GitHub 凭据。
- 请手动执行 `git push`，让 GitHub 仓库也包含这个后台模板修复。

## 10. 结论
- 数据库已备份。
- 用时字段已迁移。
- `/api/submit` 能写入用时。
- `/admin` 能显示用时。
- `/admin/export` 能导出用时。
- 前端已重新部署。
- 后端已重启成功。
- 可以发给家长正式使用。
