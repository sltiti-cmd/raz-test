# 题库修复汇总 FIX_SUMMARY

生成时间：2026-05-18

---

## 一、修复文件与级别

### P0 — 答案修复（影响判分）

| 文件 | 级别 | 修复题号 | 修改数 |
|------|------|----------|--------|
| src/data/levels/a.js | A（升级） | Q8、Q16、Q18、Q19、Q20 | 5 |
| src/data/levels/g.js | G（升级） | Q9、Q10、Q11、Q12、Q13、Q14、Q15、Q16、Q17、Q18、Q19 | 11 |
| src/data/levels/k.js | K（升级） | Q6、Q7、Q8、Q9、Q10、Q11、Q12、Q13、Q14、Q15、Q17、Q18、Q20 | 13 |
| src/data/placement/b.js | B（插班） | Q2、Q3、Q5、Q6、Q13、Q20 | 6 |
| src/data/placement/e.js | E（插班） | Q7、Q8、Q9、Q10、Q13、Q14、Q15、Q17、Q18 | 9 |
| src/data/placement/f.js | F（插班） | Q6、Q9、Q10、Q11、Q12、Q13、Q14、Q15、Q16、Q17、Q18、Q19、Q20 | 13 |
| src/data/placement/i.js | I（插班） | Q6、Q7、Q8、Q9、Q10、Q11、Q14、Q15、Q16、Q17、Q18、Q19、Q20 | 13 |
| src/data/placement/j.js | J（插班） | Q6、Q7、Q8、Q10、Q11、Q12、Q13、Q14、Q17、Q18、Q19、Q20 | 12 |
| src/data/placement/l.js | L（插班） | Q6、Q7、Q12、Q13、Q14、Q15、Q16、Q17、Q18、Q20 | 10 |
| src/data/placement/m.js | M（插班） | Q6、Q7、Q8、Q9、Q10、Q12、Q13、Q14、Q15、Q16、Q17、Q18、Q20 | 13 |
| src/data/placement/n.js | N（插班） | Q6、Q7、Q8、Q9、Q10、Q11、Q12、Q13、Q14、Q15、Q16、Q17、Q18、Q20 | 14 |

**P0 答案修复合计：119 处**

所有修复均为 JSON `answer` 字段单字母更改，未触动题干、选项、skill、passage 等其他字段。

---

### P1 — 索引 / 路由 / 后台 / 报告修复

| 文件 | 问题 | 修复内容 |
|------|------|----------|
| src/data/levels/index.js | 升级测试索引含非指定级别 C/E | 移除 C、E 的 import 和导出项 |
| src/data/placement/index.js | 插班测试索引含非指定级别 H | 移除 H 的 import 和导出项 |
| src/pages/TestPage.jsx | 升级测试提交未写 testType | submission 对象加入 `testType: 'upgrade'` |
| src/pages/AdminPage.jsx | 判断列含"未通过"文案 | 改为"可升级" / "建议继续巩固" |
| src/pages/AdminPage.jsx | 后台表未展示文体错题数 | 表头和行新增"虚构错题"和"非虚构错题"两列 |
| src/utils/report.js | 满分分支含泛化能力表述 | 改为"全部答对，非常出色！" |
| src/components/ResultReport.jsx | 同上 | 改为"全部答对，太棒了！" |

---

## 二、按题号汇总（P0）

### 升级测试
- **A 级**：Q8 B→A、Q16 A→B、Q18 A→B、Q19 B→A、Q20 A→B
- **G 级**：Q9 B→C、Q10 C→A、Q11 C→A、Q12 C→B、Q13 B→C、Q14 B→C、Q15 B→A、Q16 B→A、Q17 C→B、Q18 A→C、Q19 B→C
- **K 级**：Q6 D→C、Q7 C→B、Q8 B→C、Q9 B→A、Q10 C→B、Q11 B→D、Q12 D→C、Q13 A→B、Q14 C→B、Q15 A→C、Q17 A→D、Q18 C→A、Q20 C→A

### 插班测试
- **B 级**：Q2 B→A、Q3 B→A、Q5 B→A、Q6 A→B、Q13 B→A、Q20 B→A
- **E 级**：Q7 C→A、Q8 B→C、Q9 A→B、Q10 A→C、Q13 C→B、Q14 B→A、Q15 B→A、Q17 A→C、Q18 A→C
- **F 级**：Q6 C→B、Q9 C→A、Q10 A→C、Q11 C→B、Q12 B→A、Q13 A→B、Q14 C→A、Q15 B→C、Q16 A→C、Q17 C→A、Q18 C→B、Q19 B→C、Q20 C→A
- **I 级**：Q6 A→C、Q7 B→C、Q8 A→B、Q9 C→B、Q10 A→B、Q11 B→A、Q14 B→C、Q15 B→A、Q16 A→B、Q17 A→B、Q18 C→A、Q19 C→B、Q20 A→B
- **J 级**：Q6 B→C、Q7 C→B、Q8 B→C、Q10 A→B、Q11 C→B、Q12 A→C、Q13 A→B、Q14 C→A、Q17 C→A、Q18 B→A、Q19 A→C、Q20 B→A
- **L 级**：Q6 C→B、Q7 C→B、Q12 B→C、Q13 C→D、Q14 C→A、Q15 B→A、Q16 D→C、Q17 D→B、Q18 D→C、Q20 A→B
- **M 级**：Q6 C→A、Q7 A→B、Q8 D→A、Q9 B→C、Q10 B→A、Q12 D→A、Q13 B→D、Q14 A→B、Q15 D→B、Q16 B→C、Q17 B→D、Q18 C→B、Q20 A→D
- **N 级**：Q6 B→C、Q7 C→A、Q8 A→B、Q9 D→B、Q10 A→D、Q11 C→B、Q12 A→C、Q13 D→A、Q14 C→D、Q15 C→A、Q16 B→C、Q17 B→A、Q18 C→D、Q20 D→C

---

## 三、仍需人工确认的问题

以下问题报告标记为"需要人工确认"或因缺少原始内容无法自动修复，**本次未改动**：

### H 级别升级测试（数据缺失）
- `src/data/levels/h.js` 不存在，无法创建（需提供实际题目内容）
- H 未加入升级测试路由（TestPage 的 LEVELS 映射）和首页卡片
- 需等 H 级数据到位后，手动完成导入 → 加入 index.js → 加入 TestPage → 加入 Home.jsx

### O 级别升级测试
- raw/O 目录未找到可识别的答案 PDF，答案无法核对
- 当前 O 级答案保持原样，待提供答案 PDF 后重新核对

### Q 级别插班测试
- raw/Q 目录未找到可识别的答案 PDF，答案无法核对

### A 级别选项文本（PDF 解析不稳定）
共 22 项，覆盖 Q2/Q4/Q5/Q6/Q7/Q8/Q9/Q11/Q15/Q16/Q17/Q18/Q20 的选项文本及 A4 文章正文片段，需人工对照 PDF 原卷逐一确认。

### D 级别答案（PDF 解析不稳定）
D1~D4 全部 4 篇文章的答案未能从答案 PDF 稳定解析，当前数据保持原样，需人工对照原卷确认。

### G 级别 Q15 题干
题干未稳定匹配 PDF，需人工确认题目文字是否正确。

### C 级别插班（PDF 解析不稳定）
C1~C4 全部 4 篇文章的答案未能从答案 PDF 稳定解析，需人工确认。

### N 级别 Q1.option.D
选项文本 "a recycling center" 未稳定匹配 PDF，需人工确认。

---

## 四、validate:data 结果

```
共 24 个文件，24 通过，0 有问题
```
✅ 通过

---

## 五、build 结果

```
vite build ✓ built in 1.70s
```
✅ 通过（chunk 超过 500 kB 的 warning 属于已知情况，非本次修复范围）

---

## 六、未修改的通过级别

以下级别审计未发现结构性问题，本次未改动任何数据：
- D 级别升级测试
- C 级别插班测试
- P 级别插班测试
