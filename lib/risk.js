/**
 * 知设共享模块 - 风险评估
 *
 * 提供: riskLevel (报价偏差) / analyzeRisks (避坑风险)
 * 被 bikeng / baojia 引擎共用
 */

/**
 * 报价偏差风险等级
 * @param {number} deviation - 偏差百分比
 * @returns {{level, label, color}}
 */
export function riskLevel(deviation) {
    const abs = Math.abs(deviation);
    if (abs <= 10) return { level: 'normal', label: '正常', color: 'green' };
    if (abs <= 20) return { level: 'low', label: '轻微偏离', color: 'yellow' };
    if (abs <= 30) return { level: 'medium', label: '中度偏离', color: 'orange' };
    return { level: 'high', label: '严重偏离', color: 'red' };
}

/**
 * 避坑风险分析 (基于回答文本关键词)
 * @param {string} answer - 回答文本
 * @param {Array} results - 知识库搜索结果
 * @returns {{risk_level, related_pitfalls}}
 */
export function analyzeRisks(answer, results) {
    const high = ['漏水', '漏电', '火灾', '甲醛超标', '结构安全', '承重', '燃气', '防水失败'];
    const medium = ['空鼓', '开裂', '褪色', '变形', '异响', '松动'];
    let riskLevel = '低';
    const lower = answer.toLowerCase();
    for (const kw of high) {
        if (lower.includes(kw)) { riskLevel = '高'; break; }
    }
    if (riskLevel === '低') {
        for (const kw of medium) {
            if (lower.includes(kw)) { riskLevel = '中'; break; }
        }
    }
    const pitfalls = results.slice(0, 3)
        .map((r) => { const q = r.question || r.content || ''; return q.length > 5 ? q.substring(0, 60) : ''; })
        .filter(Boolean);
    return { risk_level: riskLevel, related_pitfalls: pitfalls };
}
