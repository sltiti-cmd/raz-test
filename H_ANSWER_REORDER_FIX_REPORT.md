# H级别插班测试答案顺序修复报告

## 修改文件
- `src/data/placement/h.js`

## 修改内容
- Q1：B -> C
- Q2：A -> B
- Q4：C -> B
- Q5：C -> A
- Q6：B -> A
- Q8：C -> B
- Q9：B -> C
- Q11：A -> B
- Q13：B -> C
- Q14：C -> B
- Q16：C -> B
- Q17：B -> A
- Q19：B -> C
- Q20：A -> C

## 修复后完整答案
- Passage 1：C B A B A
- Passage 2：A A B C C
- Passage 3：B A C B C
- Passage 4：B A A C C

合并答案：

`C B A B A A A B C C B A C B C B A A C C`

## 修改范围确认
- 只修改 H级别 `answer` 字段。
- 未修改文章正文。
- 未修改题干。
- 未修改选项。
- 未修改 skill。
- 未修改 type。
- 未修改 PDF。
- 未修改其他级别数据。

## 校验结果
- `npm run validate:data`：通过，24 个文件全部通过。
- `npm run build`：成功。
- 剩余 warning：Vite 提示单个 chunk 超过 500 kB，属于构建体积提示，不影响判分。

## H级别批量输入测试
- 测试答案：`C B A B A A A B C C B A C B C B A A C C`
- 解析题数：20
- 正确题数：20
- 分数：100
- 结论：H级别批量输入正确答案可得 100 分。

## 提交状态
- 本轮未 commit。
- 本轮未 push。
- 本轮未部署服务器。
