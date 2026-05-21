# Netlify 部署报告

## 1. Netlify 网站地址

- 正式网站：`https://harmonious-queijadas-4bf5b5.netlify.app/`
- Netlify 项目后台：`https://app.netlify.com/projects/harmonious-queijadas-4bf5b5`
- Branch deploy：`https://main--harmonious-queijadas-4bf5b5.netlify.app`
- 当前 deploy permalink：`https://6a0d0c04a1488d000824ef60--harmonious-queijadas-4bf5b5.netlify.app`

## 2. 部署是否成功

- 部署状态：成功
- Netlify deploy state：`ready`
- 部署分支：`main`
- 部署 commit：`e8f8261 chore: add Netlify build configuration`
- Deploy source：GitHub main 最新提交已部署

## 3. build 是否成功

本地部署前检查：

- `npm run validate:data`：通过，24 个文件全部通过，0 个问题
- `npm run build`：成功
- build warning：Vite 提示部分 chunk 超过 500 kB，这是体积提示，不影响构建成功

## 4. 路由是否正常

本地构建产物检查：

- `dist/index.html`：存在
- `dist/assets`：存在
- `dist/raw`：存在
- `dist/_redirects`：存在
- `dist/_redirects` 内容：

```text
/*    /index.html   200
```

Netlify deploy 检查：

- Netlify deploy summary 显示：`1 redirect rule processed`
- 说明 SPA 路由回退规则已被 Netlify 正确处理

## 5. PDF 是否正常

本地构建产物检查：

- 共检查 24 个 `printPdf` 路径
- 24 个都能在 `dist/raw` 中找到对应 PDF
- `dist/raw` 已包含 PDF 试卷资源

## 6. 手机端是否正常

本地浏览器验收结果：

- 手机宽度下测试页顶部能看到 `0/20`
- 测试页顶部能看到 `PDF试卷`
- 测试内页保留 `继续在线做题` 和 `下载PDF试卷`
- 文章在上、题目在下的布局保持正常
- 选项按钮清楚可点

线上手机端建议用真机再做最终确认：

- 打开 `https://harmonious-queijadas-4bf5b5.netlify.app/`
- 进入 `/placement/h`
- 进入 `/test/a`
- 点击 PDF 入口确认能打开

## 7. 发现的问题

- 当前 Codex 命令行环境无法直连 `.netlify.app` 域名，`curl` 返回连接失败；但 Netlify 后台接口确认 deploy 为 `ready`
- 因网络限制，线上页面内容和 PDF 打开没有在命令行中完成逐项 HTTP 验收
- 已在本机 Chrome 打开正式站点，建议用户在浏览器和手机端再点一轮关键路径

## 8. 是否建议发给家长试用

建议先小范围发给 1-2 位家长试用。

试用前建议人工点击确认：

- 首页打开正常
- `/placement` 打开正常
- `/placement/h` 能进入 H级插班测试
- `/test/a` 能进入 A级升级测试
- `/test/h` 显示“级别暂未开放”，不回退到 A
- 随机 3 个级别的 `下载PDF打印` 能打开无答案 PDF
- 测试页顶部 `PDF试卷` 能打开无答案 PDF
