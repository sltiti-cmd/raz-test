# RAZ测试系统答案核对修复报告

## 本次处理
- 重点问题：L级插班测试第12题，系统原答案为 C，答案页对应正确答案为 B，已修正为 B。
- 核对范围：当前启用的升级测试 A / D / G / K / O；插班测试 B / C / E / F / H / I / J / L / M / N / P / Q。
- 修改范围：仅修改 `answer` 字段。
- 未修改：文章正文、题干、选项、skill、type、PDF 文件。

## 已修正文件
- `src/data/levels/a.js`
- `src/data/levels/g.js`
- `src/data/levels/k.js`
- `src/data/placement/b.js`
- `src/data/placement/e.js`
- `src/data/placement/f.js`
- `src/data/placement/h.js`
- `src/data/placement/i.js`
- `src/data/placement/j.js`
- `src/data/placement/l.js`
- `src/data/placement/m.js`
- `src/data/placement/n.js`

## 已核对但无需修改
- `src/data/levels/d.js`
- `src/data/levels/o.js`
- `src/data/placement/c.js`
- `src/data/placement/p.js`
- `src/data/placement/q.js`

## 说明
- B级答案页的 PDF 文本抽取中字母存在错列，因此 B级按答案页中的正确答案文字与题目选项逐题映射后修正。
- O / P / Q 的 PDF 来源为多个独立 quiz 文件，已按文章标题对应到系统题库顺序核对。

## 验证结果
- `npm run validate:data`：通过，24 个文件全部通过。
- `npm run build`：成功。
- 剩余 warning：Vite 提示单个 chunk 超过 500 kB，属于构建体积提示，不影响答案判分。

## 当前结论
- 当前启用级别的答案串已重新核对并修正。
- L级第12题现在应按 B 判正确。
