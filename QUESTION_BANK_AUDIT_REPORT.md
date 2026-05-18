# Stacey老师 RAZ测试系统题库审计报告

## 总览
- 检查级别数：17
- 通过级别：3
- 有问题级别：14
- 高风险问题：121
- 中风险问题：9
- 低风险问题：0

审计范围：src/data/levels、src/data/placement、raw PDF、判分/报告/首页/测试页/后台记录逻辑。本轮未修改任何题库数据。PDF 文本解析不稳定的项目已列入“需要人工确认的问题”。

## 分级检查结果

### A级别升级测试
- 文章数：4
- 题目数：20
- 答案完整性：完整
- skill完整性：完整
- PDF路径：/raw/A/A级别-入门-升级-测试.pdf
- 发现问题：P0 answer Q8: PDF answer sheet shows a different correct answer；P0 answer Q16: PDF answer sheet shows a different correct answer；P0 answer Q18: PDF answer sheet shows a different correct answer；P0 answer Q19: PDF answer sheet shows a different correct answer；P0 answer Q20: PDF answer sheet shows a different correct answer
- 建议处理：先按 PDF 修复 P0；修复前不要发布该级别

### D级别升级测试
- 文章数：4
- 题目数：20
- 答案完整性：完整
- skill完整性：完整
- PDF路径：/raw/D/D级别入门测试.pdf
- 发现问题：未发现结构性问题
- 建议处理：处理 P1/P2 后可复核发布

### G级别升级测试
- 文章数：4
- 题目数：20
- 答案完整性：完整
- skill完整性：完整
- PDF路径：/raw/G/G级别入门测试.pdf
- 发现问题：P0 answer Q9: PDF answer sheet shows a different correct answer；P0 answer Q10: PDF answer sheet shows a different correct answer；P0 answer Q11: PDF answer sheet shows a different correct answer；P0 answer Q12: PDF answer sheet shows a different correct answer；P0 answer Q13: PDF answer sheet shows a different correct answer；P0 answer Q14: PDF answer sheet shows a different correct answer；P0 answer Q15: PDF answer sheet shows a different correct answer；P0 answer Q16: PDF answer sheet shows a different correct answer；另有 3 项见 JSON
- 建议处理：先按 PDF 修复 P0；修复前不要发布该级别

### H级别升级测试
- 文章数：0
- 题目数：0
- 答案完整性：-
- skill完整性：-
- PDF路径：-
- 发现问题：未发现结构性问题
- 建议处理：可进入人工抽样复核

### K级别升级测试
- 文章数：4
- 题目数：20
- 答案完整性：完整
- skill完整性：完整
- PDF路径：/raw/K/K级别-测试.pdf
- 发现问题：P0 answer Q6: PDF answer sheet shows a different correct answer；P0 answer Q7: PDF answer sheet shows a different correct answer；P0 answer Q8: PDF answer sheet shows a different correct answer；P0 answer Q9: PDF answer sheet shows a different correct answer；P0 answer Q10: PDF answer sheet shows a different correct answer；P0 answer Q11: PDF answer sheet shows a different correct answer；P0 answer Q12: PDF answer sheet shows a different correct answer；P0 answer Q13: PDF answer sheet shows a different correct answer；另有 5 项见 JSON
- 建议处理：先按 PDF 修复 P0；修复前不要发布该级别

### O级别升级测试
- 文章数：4
- 题目数：20
- 答案完整性：完整
- skill完整性：完整
- PDF路径：/raw/O/O级别-测试.pdf
- 发现问题：P1 answerPdf: raw 目录未找到可识别的答案 PDF，无法核对正确答案/skill
- 建议处理：处理 P1/P2 后可复核发布

### B级别插班测试
- 文章数：4
- 题目数：20
- 答案完整性：完整
- skill完整性：完整
- PDF路径：/raw/B/B级别测试-无答案.pdf
- 发现问题：P0 answer Q2: PDF answer sheet shows a different correct answer；P0 answer Q3: PDF answer sheet shows a different correct answer；P0 answer Q5: PDF answer sheet shows a different correct answer；P0 answer Q6: PDF answer sheet shows a different correct answer；P0 answer Q13: PDF answer sheet shows a different correct answer；P0 answer Q20: PDF answer sheet shows a different correct answer
- 建议处理：先按 PDF 修复 P0；修复前不要发布该级别

### C级别插班测试
- 文章数：4
- 题目数：20
- 答案完整性：完整
- skill完整性：完整
- PDF路径：/raw/C/c passage quiz(2).pdf
- 发现问题：未发现结构性问题
- 建议处理：处理 P1/P2 后可复核发布

### E级别插班测试
- 文章数：4
- 题目数：20
- 答案完整性：完整
- skill完整性：完整
- PDF路径：/raw/E/e级别测试-测试.pdf
- 发现问题：P0 answer Q7: PDF answer sheet shows a different correct answer；P0 answer Q8: PDF answer sheet shows a different correct answer；P0 answer Q9: PDF answer sheet shows a different correct answer；P0 answer Q10: PDF answer sheet shows a different correct answer；P0 answer Q13: PDF answer sheet shows a different correct answer；P0 answer Q14: PDF answer sheet shows a different correct answer；P0 answer Q15: PDF answer sheet shows a different correct answer；P0 answer Q17: PDF answer sheet shows a different correct answer；另有 1 项见 JSON
- 建议处理：先按 PDF 修复 P0；修复前不要发布该级别

### F级别插班测试
- 文章数：4
- 题目数：20
- 答案完整性：完整
- skill完整性：完整
- PDF路径：/raw/placement/F/F级别升级测试-无答案(1).pdf
- 发现问题：P0 answer Q6: PDF answer sheet shows a different correct answer；P0 answer Q9: PDF answer sheet shows a different correct answer；P0 answer Q10: PDF answer sheet shows a different correct answer；P0 answer Q11: PDF answer sheet shows a different correct answer；P0 answer Q12: PDF answer sheet shows a different correct answer；P0 answer Q13: PDF answer sheet shows a different correct answer；P0 answer Q14: PDF answer sheet shows a different correct answer；P0 answer Q15: PDF answer sheet shows a different correct answer；另有 5 项见 JSON
- 建议处理：先按 PDF 修复 P0；修复前不要发布该级别

### I级别插班测试
- 文章数：4
- 题目数：20
- 答案完整性：完整
- skill完整性：完整
- PDF路径：/raw/placement/I/I级别测试-无答案.pdf
- 发现问题：P0 answer Q6: PDF answer sheet shows a different correct answer；P0 answer Q7: PDF answer sheet shows a different correct answer；P0 answer Q8: PDF answer sheet shows a different correct answer；P0 answer Q9: PDF answer sheet shows a different correct answer；P0 answer Q10: PDF answer sheet shows a different correct answer；P0 answer Q11: PDF answer sheet shows a different correct answer；P0 answer Q14: PDF answer sheet shows a different correct answer；P0 answer Q15: PDF answer sheet shows a different correct answer；另有 5 项见 JSON
- 建议处理：先按 PDF 修复 P0；修复前不要发布该级别

### J级别插班测试
- 文章数：4
- 题目数：20
- 答案完整性：完整
- skill完整性：完整
- PDF路径：/raw/placement/J/J级别测试-无答案.pdf
- 发现问题：P0 answer Q6: PDF answer sheet shows a different correct answer；P0 answer Q7: PDF answer sheet shows a different correct answer；P0 answer Q8: PDF answer sheet shows a different correct answer；P0 answer Q10: PDF answer sheet shows a different correct answer；P0 answer Q11: PDF answer sheet shows a different correct answer；P0 answer Q12: PDF answer sheet shows a different correct answer；P0 answer Q13: PDF answer sheet shows a different correct answer；P0 answer Q14: PDF answer sheet shows a different correct answer；另有 4 项见 JSON
- 建议处理：先按 PDF 修复 P0；修复前不要发布该级别

### L级别插班测试
- 文章数：4
- 题目数：20
- 答案完整性：完整
- skill完整性：完整
- PDF路径：/raw/placement/L/L级别测试-无答案.pdf
- 发现问题：P0 answer Q6: PDF answer sheet shows a different correct answer；P0 answer Q7: PDF answer sheet shows a different correct answer；P0 answer Q12: PDF answer sheet shows a different correct answer；P0 answer Q13: PDF answer sheet shows a different correct answer；P0 answer Q14: PDF answer sheet shows a different correct answer；P0 answer Q15: PDF answer sheet shows a different correct answer；P0 answer Q16: PDF answer sheet shows a different correct answer；P0 answer Q17: PDF answer sheet shows a different correct answer；另有 2 项见 JSON
- 建议处理：先按 PDF 修复 P0；修复前不要发布该级别

### M级别插班测试
- 文章数：4
- 题目数：20
- 答案完整性：完整
- skill完整性：完整
- PDF路径：/raw/placement/M/M级别测试-无答案.pdf
- 发现问题：P0 answer Q6: PDF answer sheet shows a different correct answer；P0 answer Q7: PDF answer sheet shows a different correct answer；P0 answer Q8: PDF answer sheet shows a different correct answer；P0 answer Q9: PDF answer sheet shows a different correct answer；P0 answer Q10: PDF answer sheet shows a different correct answer；P0 answer Q12: PDF answer sheet shows a different correct answer；P0 answer Q13: PDF answer sheet shows a different correct answer；P0 answer Q14: PDF answer sheet shows a different correct answer；另有 5 项见 JSON
- 建议处理：先按 PDF 修复 P0；修复前不要发布该级别

### N级别插班测试
- 文章数：4
- 题目数：20
- 答案完整性：完整
- skill完整性：完整
- PDF路径：/raw/placement/N/N级别测试-无答案.pdf
- 发现问题：P0 answer Q6: PDF answer sheet shows a different correct answer；P0 answer Q7: PDF answer sheet shows a different correct answer；P0 answer Q8: PDF answer sheet shows a different correct answer；P0 answer Q9: PDF answer sheet shows a different correct answer；P0 answer Q10: PDF answer sheet shows a different correct answer；P0 answer Q11: PDF answer sheet shows a different correct answer；P0 answer Q12: PDF answer sheet shows a different correct answer；P0 answer Q13: PDF answer sheet shows a different correct answer；另有 6 项见 JSON
- 建议处理：先按 PDF 修复 P0；修复前不要发布该级别

### P级别插班测试
- 文章数：4
- 题目数：20
- 答案完整性：完整
- skill完整性：完整
- PDF路径：/raw/P/P级别测试-无答案.pdf
- 发现问题：未发现结构性问题
- 建议处理：处理 P1/P2 后可复核发布

### Q级别插班测试
- 文章数：4
- 题目数：20
- 答案完整性：完整
- skill完整性：完整
- PDF路径：/raw/placement/Q/Q级别测试-无答案.pdf
- 发现问题：P1 answerPdf: raw 目录未找到可识别的答案 PDF，无法核对正确答案/skill
- 建议处理：处理 P1/P2 后可复核发布

## 高风险问题 P0
这些问题会影响判分或题目正确性：
- 级别：A
  题号：8
  当前数据：B
  PDF原文：A
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/A/A级别-入门-升级-答案.pdf
- 级别：A
  题号：16
  当前数据：A
  PDF原文：B
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/A/A级别-入门-升级-答案.pdf
- 级别：A
  题号：18
  当前数据：A
  PDF原文：B
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/A/A级别-入门-升级-答案.pdf
- 级别：A
  题号：19
  当前数据：B
  PDF原文：A
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/A/A级别-入门-升级-答案.pdf
- 级别：A
  题号：20
  当前数据：A
  PDF原文：B
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/A/A级别-入门-升级-答案.pdf
- 级别：G
  题号：9
  当前数据：B
  PDF原文：C
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/G/g开营测试_带答案.pdf
- 级别：G
  题号：10
  当前数据：C
  PDF原文：A
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/G/g开营测试_带答案.pdf
- 级别：G
  题号：11
  当前数据：C
  PDF原文：A
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/G/g开营测试_带答案.pdf
- 级别：G
  题号：12
  当前数据：C
  PDF原文：B
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/G/g开营测试_带答案.pdf
- 级别：G
  题号：13
  当前数据：B
  PDF原文：C
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/G/g开营测试_带答案.pdf
- 级别：G
  题号：14
  当前数据：B
  PDF原文：C
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/G/g开营测试_带答案.pdf
- 级别：G
  题号：15
  当前数据：B
  PDF原文：A
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/G/g开营测试_带答案.pdf
- 级别：G
  题号：16
  当前数据：B
  PDF原文：A
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/G/g开营测试_带答案.pdf
- 级别：G
  题号：17
  当前数据：C
  PDF原文：B
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/G/g开营测试_带答案.pdf
- 级别：G
  题号：18
  当前数据：A
  PDF原文：C
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/G/g开营测试_带答案.pdf
- 级别：G
  题号：19
  当前数据：B
  PDF原文：C
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/G/g开营测试_带答案.pdf
- 级别：H
  题号：-
  当前数据：-
  PDF原文：src/data/levels/h.js
  建议修复：升级测试指定级别缺少数据文件
  来源：src/data/levels/h.js
- 级别：K
  题号：6
  当前数据：D
  PDF原文：C
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/K/K级别测试-有答案.pdf
- 级别：K
  题号：7
  当前数据：C
  PDF原文：B
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/K/K级别测试-有答案.pdf
- 级别：K
  题号：8
  当前数据：B
  PDF原文：C
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/K/K级别测试-有答案.pdf
- 级别：K
  题号：9
  当前数据：B
  PDF原文：A
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/K/K级别测试-有答案.pdf
- 级别：K
  题号：10
  当前数据：C
  PDF原文：B
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/K/K级别测试-有答案.pdf
- 级别：K
  题号：11
  当前数据：B
  PDF原文：D
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/K/K级别测试-有答案.pdf
- 级别：K
  题号：12
  当前数据：D
  PDF原文：C
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/K/K级别测试-有答案.pdf
- 级别：K
  题号：13
  当前数据：A
  PDF原文：B
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/K/K级别测试-有答案.pdf
- 级别：K
  题号：14
  当前数据：C
  PDF原文：B
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/K/K级别测试-有答案.pdf
- 级别：K
  题号：15
  当前数据：A
  PDF原文：C
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/K/K级别测试-有答案.pdf
- 级别：K
  题号：17
  当前数据：A
  PDF原文：D
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/K/K级别测试-有答案.pdf
- 级别：K
  题号：18
  当前数据：C
  PDF原文：A
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/K/K级别测试-有答案.pdf
- 级别：K
  题号：20
  当前数据：C
  PDF原文：A
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/K/K级别测试-有答案.pdf
- 级别：B
  题号：2
  当前数据：B
  PDF原文：A
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/B/B级别测试-附答案.pdf
- 级别：B
  题号：3
  当前数据：B
  PDF原文：A
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/B/B级别测试-附答案.pdf
- 级别：B
  题号：5
  当前数据：B
  PDF原文：A
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/B/B级别测试-附答案.pdf
- 级别：B
  题号：6
  当前数据：A
  PDF原文：B
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/B/B级别测试-附答案.pdf
- 级别：B
  题号：13
  当前数据：B
  PDF原文：A
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/B/B级别测试-附答案.pdf
- 级别：B
  题号：20
  当前数据：B
  PDF原文：A
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/B/B级别测试-附答案.pdf
- 级别：E
  题号：7
  当前数据：C
  PDF原文：A
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/E/e级别测试-附答案.pdf
- 级别：E
  题号：8
  当前数据：B
  PDF原文：C
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/E/e级别测试-附答案.pdf
- 级别：E
  题号：9
  当前数据：A
  PDF原文：B
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/E/e级别测试-附答案.pdf
- 级别：E
  题号：10
  当前数据：A
  PDF原文：C
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/E/e级别测试-附答案.pdf
- 级别：E
  题号：13
  当前数据：C
  PDF原文：B
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/E/e级别测试-附答案.pdf
- 级别：E
  题号：14
  当前数据：B
  PDF原文：A
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/E/e级别测试-附答案.pdf
- 级别：E
  题号：15
  当前数据：B
  PDF原文：A
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/E/e级别测试-附答案.pdf
- 级别：E
  题号：17
  当前数据：A
  PDF原文：C
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/E/e级别测试-附答案.pdf
- 级别：E
  题号：18
  当前数据：A
  PDF原文：C
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/E/e级别测试-附答案.pdf
- 级别：F
  题号：6
  当前数据：C
  PDF原文：B
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/F/F级别升级测试-答案页.pdf
- 级别：F
  题号：9
  当前数据：C
  PDF原文：A
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/F/F级别升级测试-答案页.pdf
- 级别：F
  题号：10
  当前数据：A
  PDF原文：C
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/F/F级别升级测试-答案页.pdf
- 级别：F
  题号：11
  当前数据：C
  PDF原文：B
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/F/F级别升级测试-答案页.pdf
- 级别：F
  题号：12
  当前数据：B
  PDF原文：A
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/F/F级别升级测试-答案页.pdf
- 级别：F
  题号：13
  当前数据：A
  PDF原文：B
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/F/F级别升级测试-答案页.pdf
- 级别：F
  题号：14
  当前数据：C
  PDF原文：A
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/F/F级别升级测试-答案页.pdf
- 级别：F
  题号：15
  当前数据：B
  PDF原文：C
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/F/F级别升级测试-答案页.pdf
- 级别：F
  题号：16
  当前数据：A
  PDF原文：C
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/F/F级别升级测试-答案页.pdf
- 级别：F
  题号：17
  当前数据：C
  PDF原文：A
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/F/F级别升级测试-答案页.pdf
- 级别：F
  题号：18
  当前数据：C
  PDF原文：B
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/F/F级别升级测试-答案页.pdf
- 级别：F
  题号：19
  当前数据：B
  PDF原文：C
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/F/F级别升级测试-答案页.pdf
- 级别：F
  题号：20
  当前数据：C
  PDF原文：A
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/F/F级别升级测试-答案页.pdf
- 级别：I
  题号：6
  当前数据：A
  PDF原文：C
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/I/I级别测试-有答案.pdf
- 级别：I
  题号：7
  当前数据：B
  PDF原文：C
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/I/I级别测试-有答案.pdf
- 级别：I
  题号：8
  当前数据：A
  PDF原文：B
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/I/I级别测试-有答案.pdf
- 级别：I
  题号：9
  当前数据：C
  PDF原文：B
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/I/I级别测试-有答案.pdf
- 级别：I
  题号：10
  当前数据：A
  PDF原文：B
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/I/I级别测试-有答案.pdf
- 级别：I
  题号：11
  当前数据：B
  PDF原文：A
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/I/I级别测试-有答案.pdf
- 级别：I
  题号：14
  当前数据：B
  PDF原文：C
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/I/I级别测试-有答案.pdf
- 级别：I
  题号：15
  当前数据：B
  PDF原文：A
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/I/I级别测试-有答案.pdf
- 级别：I
  题号：16
  当前数据：A
  PDF原文：B
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/I/I级别测试-有答案.pdf
- 级别：I
  题号：17
  当前数据：A
  PDF原文：B
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/I/I级别测试-有答案.pdf
- 级别：I
  题号：18
  当前数据：C
  PDF原文：A
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/I/I级别测试-有答案.pdf
- 级别：I
  题号：19
  当前数据：C
  PDF原文：B
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/I/I级别测试-有答案.pdf
- 级别：I
  题号：20
  当前数据：A
  PDF原文：B
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/I/I级别测试-有答案.pdf
- 级别：J
  题号：6
  当前数据：B
  PDF原文：C
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/J/J级别测试-有答案.pdf
- 级别：J
  题号：7
  当前数据：C
  PDF原文：B
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/J/J级别测试-有答案.pdf
- 级别：J
  题号：8
  当前数据：B
  PDF原文：C
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/J/J级别测试-有答案.pdf
- 级别：J
  题号：10
  当前数据：A
  PDF原文：B
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/J/J级别测试-有答案.pdf
- 级别：J
  题号：11
  当前数据：C
  PDF原文：B
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/J/J级别测试-有答案.pdf
- 级别：J
  题号：12
  当前数据：A
  PDF原文：C
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/J/J级别测试-有答案.pdf
- 级别：J
  题号：13
  当前数据：A
  PDF原文：B
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/J/J级别测试-有答案.pdf
- 级别：J
  题号：14
  当前数据：C
  PDF原文：A
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/J/J级别测试-有答案.pdf
- 级别：J
  题号：17
  当前数据：C
  PDF原文：A
  建议修复：PDF answer sheet shows a different correct answer
  来源：raw/J/J级别测试-有答案.pdf
- 另有 41 项见 QUESTION_BANK_AUDIT_ISSUES.json。

## 中风险问题 P1
这些问题影响显示、报告或路径：
- 级别：O
  题号：-
  当前数据：-
  PDF原文：answer PDF in raw
  建议修复：raw 目录未找到可识别的答案 PDF，无法核对正确答案/skill
  来源：raw/O
- 级别：Q
  题号：-
  当前数据：-
  PDF原文：answer PDF in raw
  建议修复：raw 目录未找到可识别的答案 PDF，无法核对正确答案/skill
  来源：raw/Q
- 级别：ALL
  题号：-
  当前数据：contains C/E
  PDF原文：A/D/G/H/K/O only
  建议修复：升级测试索引包含非指定级别 C/E
  来源：src/data/levels/index.js
- 级别：H
  题号：-
  当前数据：contains H
  PDF原文：B/C/E/F/I/J/L/M/N/P/Q only
  建议修复：插班测试索引包含非指定级别 H
  来源：src/data/placement/index.js
- 级别：H
  题号：-
  当前数据：missing H
  PDF原文：A/D/G/H/K/O
  建议修复：首页升级级别卡片缺少 H
  来源：src/pages/Home.jsx
- 级别：ALL
  题号：-
  当前数据：-
  PDF原文：upgrade
  建议修复：升级测试提交记录未显式写入 testType，后台只能靠默认值推断
  来源：src/pages/TestPage.jsx
- 级别：ALL
  题号：-
  当前数据：no fiction/nonfiction columns
  PDF原文：show fictionWrong and nonfictionWrong
  建议修复：后台记录中保存了文体错题数，但后台表格未展示/导出这两列需另查
  来源：src/pages/AdminPage.jsx
- 级别：ALL
  题号：-
  当前数据：contains 未通过
  PDF原文：80分以下：建议继续巩固该级别
  建议修复：后台判断文本含“未通过”，不符合报告规则
  来源：src/pages/AdminPage.jsx
- 级别：ALL
  题号：-
  当前数据：contains praise/ability language for full score
  PDF原文：do not force weak ability or random ability analysis
  建议修复：报告满分分支含泛化能力表述，可能超出错题 skill 统计依据
  来源：src/utils/report.js

## 低风险问题 P2
格式、样式、命名建议：
- 未发现。

## 需要人工确认的问题
- 级别：A｜类型：upgrade｜字段：Q2.option.B｜原因：选项文本未稳定匹配 PDF：the boy｜来源：raw/A/A级别-入门-升级-答案.pdf
- 级别：A｜类型：upgrade｜字段：Q2.option.C｜原因：选项文本未稳定匹配 PDF：the girl｜来源：raw/A/A级别-入门-升级-答案.pdf
- 级别：A｜类型：upgrade｜字段：Q4.option.B｜原因：选项文本未稳定匹配 PDF：toys｜来源：raw/A/A级别-入门-升级-答案.pdf
- 级别：A｜类型：upgrade｜字段：Q4.option.C｜原因：选项文本未稳定匹配 PDF：food｜来源：raw/A/A级别-入门-升级-答案.pdf
- 级别：A｜类型：upgrade｜字段：Q5.option.C｜原因：选项文本未稳定匹配 PDF：none｜来源：raw/A/A级别-入门-升级-答案.pdf
- 级别：A｜类型：upgrade｜字段：Q6.option.A｜原因：选项文本未稳定匹配 PDF：a car｜来源：raw/A/A级别-入门-升级-答案.pdf
- 级别：A｜类型：upgrade｜字段：Q6.option.C｜原因：选项文本未稳定匹配 PDF：a train｜来源：raw/A/A级别-入门-升级-答案.pdf
- 级别：A｜类型：upgrade｜字段：Q7.option.B｜原因：选项文本未稳定匹配 PDF：This plane is fun｜来源：raw/A/A级别-入门-升级-答案.pdf
- 级别：A｜类型：upgrade｜字段：Q7.option.C｜原因：选项文本未稳定匹配 PDF：This plane is nice｜来源：raw/A/A级别-入门-升级-答案.pdf
- 级别：A｜类型：upgrade｜字段：Q8.option.C｜原因：选项文本未稳定匹配 PDF：in the water｜来源：raw/A/A级别-入门-升级-答案.pdf
- 级别：A｜类型：upgrade｜字段：Q9.option.C｜原因：选项文本未稳定匹配 PDF：swim｜来源：raw/A/A级别-入门-升级-答案.pdf
- 级别：A｜类型：upgrade｜字段：Q11.option.A｜原因：选项文本未稳定匹配 PDF：animals｜来源：raw/A/A级别-入门-升级-答案.pdf
- 级别：A｜类型：upgrade｜字段：Q11.option.C｜原因：选项文本未稳定匹配 PDF：food｜来源：raw/A/A级别-入门-升级-答案.pdf
- 级别：A｜类型：upgrade｜字段：Q15.option.A｜原因：选项文本未稳定匹配 PDF：cat｜来源：raw/A/A级别-入门-升级-答案.pdf
- 级别：A｜类型：upgrade｜字段：A4.text｜原因：文章正文片段未稳定匹配 PDF：The birds fly high｜来源：raw/A/A级别-入门-升级-测试.pdf
- 级别：A｜类型：upgrade｜字段：Q16.option.B｜原因：选项文本未稳定匹配 PDF：to the tree｜来源：raw/A/A级别-入门-升级-答案.pdf
- 级别：A｜类型：upgrade｜字段：Q16.option.C｜原因：选项文本未稳定匹配 PDF：to the sky｜来源：raw/A/A级别-入门-升级-答案.pdf
- 级别：A｜类型：upgrade｜字段：Q17.option.C｜原因：选项文本未稳定匹配 PDF：they walk｜来源：raw/A/A级别-入门-升级-答案.pdf
- 级别：A｜类型：upgrade｜字段：Q18.option.B｜原因：选项文本未稳定匹配 PDF：Birds fly high｜来源：raw/A/A级别-入门-升级-答案.pdf
- 级别：A｜类型：upgrade｜字段：Q18.option.C｜原因：选项文本未稳定匹配 PDF：Birds go home｜来源：raw/A/A级别-入门-升级-答案.pdf
- 级别：A｜类型：upgrade｜字段：Q20.option.B｜原因：选项文本未稳定匹配 PDF：They are small｜来源：raw/A/A级别-入门-升级-答案.pdf
- 级别：A｜类型：upgrade｜字段：Q20.option.C｜原因：选项文本未稳定匹配 PDF：They are fast｜来源：raw/A/A级别-入门-升级-答案.pdf
- 级别：D｜类型：upgrade｜字段：D1.answers｜原因：未能从答案 PDF 稳定解析 Animals Like to Eat 的 5 个答案/skill｜来源：raw/D/D级别入门测试-答案.pdf
- 级别：D｜类型：upgrade｜字段：D2.answers｜原因：未能从答案 PDF 稳定解析 At the Playground 的 5 个答案/skill｜来源：raw/D/D级别入门测试-答案.pdf
- 级别：D｜类型：upgrade｜字段：D3.answers｜原因：未能从答案 PDF 稳定解析 I See Tall Trees 的 5 个答案/skill｜来源：raw/D/D级别入门测试-答案.pdf
- 级别：D｜类型：upgrade｜字段：D4.answers｜原因：未能从答案 PDF 稳定解析 We Use Our Senses 的 5 个答案/skill｜来源：raw/D/D级别入门测试-答案.pdf
- 级别：G｜类型：upgrade｜字段：Q15.question｜原因：题干未稳定匹配 PDF：She kept running away from me. Which word can replace "kept" and still have the ｜来源：raw/G/g开营测试_带答案.pdf
- 级别：C｜类型：placement｜字段：C1.answers｜原因：未能从答案 PDF 稳定解析 The Moon Can Look Different 的 5 个答案/skill｜来源：raw/C/c passage quiz 附答案.pdf
- 级别：C｜类型：placement｜字段：C2.answers｜原因：未能从答案 PDF 稳定解析 What Will You Have At a Party? 的 5 个答案/skill｜来源：raw/C/c passage quiz 附答案.pdf
- 级别：C｜类型：placement｜字段：C3.answers｜原因：未能从答案 PDF 稳定解析 It Is a Birthday Party 的 5 个答案/skill｜来源：raw/C/c passage quiz 附答案.pdf
- 级别：C｜类型：placement｜字段：C4.answers｜原因：未能从答案 PDF 稳定解析 Monkeys Have Many Feelings 的 5 个答案/skill｜来源：raw/C/c passage quiz 附答案.pdf
- 级别：N｜类型：placement｜字段：Q1.option.D｜原因：选项文本未稳定匹配 PDF：a recycling center｜来源：raw/N/N级别测试-有答案.pdf

## 判分逻辑检查
- 批量录入答案：源码使用 /[ABCD]/g 抽取字母，因此 A B C D、A,B,C,D、ABCD、每5题换行都可解析为连续答案。
- 正确答案 100 分：对 A 级别用当前答案表调用 gradeTest，结果符合 score=100、correctCount=20、wrongQuestions=[]。
- 错题编号：wrongQuestions 使用 q.id，能保留错题编号。
- 正确答案展示：ResultPage/报告使用 wrongQuestions.correctAnswer。
- 未答题识别：未答题进入 wrongQuestions，userAnswer 显示为未作答；不会被算对。

## 报告逻辑检查
- 报告主要输入来自 score、correctCount、wrongQuestions、answer/correctAnswer、skill、passage.type、testType、levelId。
- 发现风险：满分时仍有泛化能力表述；后台页面含“未通过”文案；这些不符合本次规则，已列为 P1。
- 80分阈值：gradeTest 使用 passScore，当前数据 passScore 多为 80；报告页按 passed 展示“可以读/继续巩固”方向。
- 能力分析：来自 wrongQuestions 汇总后的 skillCounts；满分分支不应强行生成薄弱能力。
- 文体表现：来自 fictionWrong/nonfictionWrong 统计。

## 页面功能检查
- 首页：当前不是“只显示两个入口”，而是直接显示升级级别卡片，并用弱链接进入插班测试；不符合本次要求。
- 插班测试级别：首页未显示插班级别大厅，但升级首页错误包含 C/E 且缺 H。
- 升级测试页：当前接入 A/C/D/E/G/K/O，缺 H，多 C/E。
- 插班测试页：当前接入 B/C/E/F/H/I/J/L/M/N/P/Q，多 H。
- 每个级别进入测试页：已接入的数据级别可进入；H 升级缺数据文件/路由映射。
- 打印试卷：依赖 printPdf；多级别 printPdf 路径因乱码或文件名不一致导致不存在，且需确保不指向答案 PDF。
- 提交后报告：ResultPage 可生成报告。
- 后台记录：前端 localStorage/POST 保存微信名、级别、分数、错题、薄弱能力、fictionWrong、nonfictionWrong；插班有 testType，升级未显式写 testType 只能默认推断；后台表格未展示文体错题数。

## 现有检查脚本结果
- validate:data：通过。输出显示共 24 个文件，24 通过，0 有问题。注意：该脚本本身使用的校验规则较宽，未覆盖本报告列出的指定级别清单、PDF答案核对、页面入口规则和乱码显示风险。
- npm test：未通过运行，原因是 package.json 未定义 test 脚本。
- build：通过。Vite 成功构建 dist。
- 剩余 warning：Vite 提示部分 chunk 超过 500 kB，建议后续按需 code-splitting 或调整 chunkSizeWarningLimit。
