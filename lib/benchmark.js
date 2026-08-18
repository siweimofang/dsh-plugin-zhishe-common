/**
 * 知设共享模块 - 基准价格库
 *
 * 提供: loadBenchmark / buildKeywordIndex / matchBenchmarkItem
 * 被 zhishe-baojia-shenhe 等插件引用
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 基准价格库缓存
let benchmarkCache = null;

/** 加载基准价格库 (带缓存) */
export function loadBenchmark() {
    if (!benchmarkCache) {
        const data = readFileSync(join(__dirname, 'benchmark.json'), 'utf-8');
        benchmarkCache = JSON.parse(data);
    }
    return benchmarkCache;
}

/** 构建关键词 -> 基准条目索引 (加速匹配) */
export function buildKeywordIndex(benchmark) {
    const index = new Map();
    for (const [category, items] of Object.entries(benchmark.items)) {
        for (const [itemName, spec] of Object.entries(items)) {
            for (const kw of spec.keywords) {
                if (!index.has(kw)) index.set(kw, []);
                index.get(kw).push({ category, name: itemName, spec });
            }
        }
    }
    return index;
}

/**
 * 匹配报价条目到基准条目
 * @param {string} itemName - 报价条目名称
 * @param {Map} keywordIndex - 关键词索引
 * @returns {{category, name, spec} | null}
 */
export function matchBenchmarkItem(itemName, keywordIndex) {
    const lower = itemName.toLowerCase();
    let bestMatch = null;
    let bestScore = 0;

    for (const [kw, entries] of keywordIndex) {
        if (lower.includes(kw)) {
            const score = kw.length;
            if (score > bestScore) {
                bestScore = score;
                bestMatch = entries[0];
            }
        }
    }
    return bestMatch;
}
