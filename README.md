# zhishe-common

知设 DSH 插件共享基础设施包。

## 模块

- **knowledge.js** — 知识库加载 + 关键词检索 + 分词
- **benchmark.js** — 基准价格库加载 + 关键词索引 + 条目匹配
- **risk.js** — 风险等级判定 + 风险分析

## 使用

```js
import { loadKnowledge, searchKnowledge } from '../zhishe-common/lib/knowledge.js';
import { loadBenchmark, buildKeywordIndex } from '../zhishe-common/lib/benchmark.js';
import { riskLevel, analyzeRisks } from '../zhishe-common/lib/risk.js';
```

## License

MIT
