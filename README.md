# zhishe-common

知设 DSH 插件共享基础设施包 — 为所有知设装修系列插件提供通用的知识库检索、基准价格索引和风险等级评估能力。

## 功能模块

| 模块 | 说明 |
|------|------|
| `knowledge.js` | 知识库加载 + 关键词检索 + 分词，支持数组/对象两种知识库格式 |
| `benchmark.js` | 基准价格库加载 + 关键词索引 + 条目匹配，覆盖 13 城装修分项基准价 |
| `risk.js` | 风险等级判定 + 风险分析，支持高/中/低三级风险输出 |

## 安装

```bash
npm install zhishe-common
```

## 使用

```js
// 知识库检索
import { loadKnowledge, searchKnowledge } from 'zhishe-common/knowledge';

const kb = await loadKnowledge('./data/knowledge.json');
const results = await searchKnowledge(kb, '防水怎么做才不漏水？', { maxResults: 5 });

// 基准价格查询
import { loadBenchmark, buildKeywordIndex } from 'zhishe-common/benchmark';

const benchmark = await loadBenchmark('./data/benchmark.json');
const index = buildKeywordIndex(benchmark);

// 风险评估
import { riskLevel, analyzeRisks } from 'zhishe-common/risk';

const level = riskLevel('报价偏离超过50%');
const analysis = analyzeRisks(quoteItems);
```

## 被依赖的插件

- [dsh-plugin-zhishe-bikeng-qa](https://www.npmjs.com/package/dsh-plugin-zhishe-bikeng-qa) — 装修避坑问答
- [dsh-plugin-zhishe-baojia-shenhe](https://www.npmjs.com/package/dsh-plugin-zhishe-baojia-shenhe) — 装修报价审核
- [dsh-plugin-zhishe-zaojia-gusuan](https://www.npmjs.com/package/dsh-plugin-zhishe-zaojia-gusuan) — 装修造价估算

## License

MIT
