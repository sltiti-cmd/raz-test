# 答案核对报告

## 总览
- 检查级别数：17
- 完全一致级别：16（A / C / D / E / F / G / H / I / J / K / L / M / N / O / P / Q）
- 有差异级别：1（B）
- 高风险差异数量：6

## 差异明细
### B级别
- Q1 当前：A；应为：B；文章：Big and Little；题干：What is the main idea of this passage?
- Q2 当前：B；应为：A；文章：Big and Little；题干：Which names something else that is big?
- Q7 当前：A；应为：B；文章：Near the Pond；题干：Why does the lion most likely go to the pond?
- Q15 当前：A；应为：B；文章：Ted Sees a Pond；题干：Which word in the passage best describes a pond?
- Q16 当前：A；应为：B；文章：We Read About Animals；题干：What do the characters do in the story?
- Q18 当前：A；应为：B；文章：We Read About Animals；题干：Which is not an animal?

## 需要人工确认
- 无。

## 检查说明
- 本报告仅比对当前代码中的 `answer` 与用户提供的答案基准。
- 本轮未修改题库数据、文章、题干、选项、skill、type。
- 每个级别按当前题库顺序检查 20 题，每 5 题对应一篇文章。

## 校验结果
- `npm run validate:data`：通过，24 个文件全部通过。
- `npm run build`：成功。
- 剩余 warning：Vite 提示单个 chunk 超过 500 kB，属于构建体积提示，不影响本次答案核对。
