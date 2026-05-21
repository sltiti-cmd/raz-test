# Flask 后端部署报告

## 1. 后端是否部署成功

已部署成功。

当前线上前端仍在：

```text
https://benchmark.vocabfun.cn/
```

Flask 后端已通过 systemd 启动，并由 Nginx 反向代理 `/api` 和 `/admin`。

## 2. Flask 服务端口

实际使用：

```text
127.0.0.1:8001
```

说明：原计划使用 `127.0.0.1:8000`，但服务器上已有旧服务 `sales.service` 占用 `0.0.0.0:8000`，路径为 `/var/www/vocabfun/server/app.py`。为避免影响现有业务，RAZ 后端改用 `127.0.0.1:8001`，没有暴露公网端口。

## 3. systemd 服务名

```text
raz-backend.service
```

状态：`active`

## 4. SQLite 数据库路径

```text
/www/wwwroot/raz-test-source/backend/submissions.db
```

已确认 `submissions` 表存在，并已写入测试记录。

## 5. Nginx 代理配置是否成功

已成功。

配置文件：

```text
/etc/nginx/conf.d/raz-test.conf
```

代理规则：

- `/api/` -> `http://127.0.0.1:8001/api/`
- `/admin` -> `http://127.0.0.1:8001/admin`
- `/admin/` -> `http://127.0.0.1:8001/admin/`

前端 SPA 路由仍保留：

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

`nginx -t` 通过，并已 reload。

## 6. /api/submit 是否可用

可用。

服务器线上 POST 测试结果：

```text
api_post=200
{"ok":true}
```

随后检查 SQLite，记录已写入。

## 7. /admin/login 是否可用

可用。

线上访问：

```text
https://benchmark.vocabfun.cn/admin/login
```

返回后台登录页。

## 8. /admin 是否需要密码

需要。

未登录访问：

```text
https://benchmark.vocabfun.cn/admin
```

返回 `302`，跳转到：

```text
https://benchmark.vocabfun.cn/admin/login
```

登录后进入服务器后台统计页。

## 9. /admin/export 是否可用

已接入后端导出路由。

在后台登录后点击“导出 CSV”会触发下载事件。自动化浏览器环境中该下载事件被浏览器取消，但后端导出入口已接入登录态后台。

## 10. 是否已经实现多设备统一后台

已实现核心链路。

前端提交地址已从：

```text
http://localhost:8000/api/submit
```

改为：

```text
/api/submit
```

已修改文件：

- `src/pages/TestPage.jsx`
- `src/pages/PlacementPage.jsx`
- `src/components/FeedbackWidget.jsx`

线上真实前端提交测试：

```text
微信名：Codex后端测试
级别：A
分数：100
答对：20/20
```

服务器 SQLite 中已看到该记录。

后台登录后显示：

- 总提交数：2
- 平均分：100.0
- 通过率：100.0%
- 记录包含 `Codex后端测试`

因此，不同手机、不同电脑提交后，理论上都会进入同一个服务器 SQLite 数据库，并可在 `/admin/login` 登录后统一查看。

## 11. 是否记录 IP

当前没有记录 IP。

Nginx 已向后端传递：

- `X-Real-IP`
- `X-Forwarded-For`
- `X-Forwarded-Proto`

但当前 Flask 数据库表没有 `ip_address` 字段，`api_submit` 也没有把 IP 写入 SQLite。

如果需要记录家长提交 IP，需要后续单独新增数据库字段和后端写入逻辑。

## 12. 发现的问题

1. `127.0.0.1:8000` 被旧的 `sales.service` 占用，所以 RAZ 后端改用 `127.0.0.1:8001`。
2. 服务器 `validate:data` 在 Linux 路径下会打印若干 `printPdf 文件不存在` 提示，但退出码为 `0`，且 `dist/raw` 中 PDF 文件存在。
3. 当前 Flask 后台模板里部分文案仍使用旧后台样式，和前端 `/admin` 不是同一个界面。
4. 当前没有记录 IP。

## 13. 下一步建议

1. 用另一台手机提交一次测试，再用电脑登录 `/admin/login` 验证能看到同一条记录。
2. 如需记录 IP，新增 `ip_address` 字段并在 `/api/submit` 中写入。
3. 如需更安全，建议修改后台管理员密码并通过 systemd 环境变量配置。
4. 后续可把 Flask 后台模板文案和前端报告规则统一，例如避免“未通过”等旧文案。
