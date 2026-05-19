# PDF入口 UI 优化总结

## 修改文件

- `src/components/LevelCard.jsx`
- `src/pages/Home.jsx`
- `src/pages/PlacementHome.jsx`
- `src/pages/TestPage.jsx`
- `src/pages/PlacementPage.jsx`
- `src/utils/printPdf.js`

## 按钮逻辑

- 级别卡片新增两个明确入口：
  - `在线做题`：进入对应测试页
  - `下载PDF打印`：打开该级别 `printPdf`
- 如果级别没有 `printPdf`，卡片显示 `PDF暂未提供`
- 测试页顶部按钮统一改为 `PDF试卷`
- 测试页顶部新增操作条：
  - `继续在线做题`：关闭操作条，继续当前测试
  - `下载PDF试卷`：打开该级别 PDF
  - 已按要求移除说明句，保留按钮显示不变

## PDF打开逻辑

所有 PDF 打开入口统一使用：

```js
openPrintPdf(level)
```

函数行为：

- 如果没有 `printPdf`，提示 `该级别暂未提供PDF试卷`
- 如果存在 `printPdf`，使用 `window.open(encodeURI(level.printPdf), '_blank', 'noopener,noreferrer')`

## 浏览器检查

- 首页升级测试卡片：已显示 `在线做题` 和 `下载PDF打印`
- 插班测试页面卡片：已显示 `在线做题` 和 `下载PDF打印`
- 手机宽度测试页：顶部保留 `0/20`，并能看到 `PDF试卷`
- 测试页操作条：显示 `继续在线做题`、`下载PDF试卷`
- PDF路径检查：
  - A级升级测试 PDF 返回 200
  - H级插班测试 PDF 返回 200

## 命令结果

- `npm run validate:data`：通过，24 个文件全部通过，0 个问题
- `npm run build`：成功
- build warning：Vite 提示部分 chunk 超过 500 kB，这是体积提示，不影响构建成功

## 题库数据

本次没有修改：

- `src/data/levels/`
- `src/data/placement/`
- answer
- skill
- type
- 文章、题干、选项
