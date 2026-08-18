/**
 * 知设共享模块 - 知识库加载与检索
 *
 * 提供: loadKnowledge / searchKnowledge / extractKeywords
 * 被 zhishe-bikeng-qa 等插件引用
 */

/** 加载知识库 JSON 文件 */
export async function loadKnowledge(filePath, loggerPrefix = 'zhishe') {
    try {
        const fs = await import('fs');
        const pathModule = await import('path');
        const fullPath = pathModule.resolve(filePath);
        const content = fs.readFileSync(fullPath, 'utf-8');
        return JSON.parse(content);
    } catch (e) {
        console.warn(`[${loggerPrefix}] 知识库加载失败: ` + e.message);
        return null;
    }
}

/** 关键词搜索知识库 */
export function searchKnowledge(knowledge, question, category, maxResults) {
    const results = [];
    const keywords = extractKeywords(question);
    const entries = Array.isArray(knowledge) ? knowledge : Object.values(knowledge).flat();

    for (const entry of entries) {
        const text = [entry.question || '', entry.answer || '', (entry.tags || []).join(' '), entry.category || '']
            .filter(Boolean)
            .join(' ');
        let score = 0;
        for (const kw of keywords) {
            if (text.includes(kw)) score += kw.length;
        }
        if (category && entry.category && !entry.category.includes(category)) continue;
        if (score > 0) results.push({ ...entry, score });
    }

    results.sort((a, b) => b.score - a.score);
    return results.slice(0, maxResults);
}

/** 从问题提取关键词 (2-4 字滑动窗口) */
export function extractKeywords(question) {
    const stopWords = new Set([
        '怎么', '如何', '什么', '为什么', '是否', '有没有', '能不能',
        '要了', '的吗', '呢吧', '啊哦', '帮我', '你这', '那个', '一个', '是在',
    ]);
    const keywords = [];
    const seen = new Set();
    for (let i = 0; i < question.length - 1; i++) {
        for (let len = 2; len <= 4 && i + len <= question.length; len++) {
            const word = question.substring(i, i + len);
            if (!stopWords.has(word) && !seen.has(word)) {
                seen.add(word);
                keywords.push(word);
            }
        }
    }
    return keywords;
}
