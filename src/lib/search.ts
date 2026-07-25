// 搜索引擎：多维度加权匹配（名称 > 拼音 > 标签 > 场景 > 描述）与分类过滤。

import { Tool } from './tools';

export interface SearchResult {
  tool: Tool;
  score: number;
  matchType: 'name' | 'pinyin' | 'tag' | 'category' | 'scenario' | 'description';
}

function normalize(query: string): string {
  return query.toLowerCase().trim();
}

function calcScore(query: string, text: string, weight: number): number {
  const nq = normalize(query);
  const nt = normalize(text);
  if (nt.startsWith(nq)) return weight * 2;
  if (nt.includes(nq)) return weight;
  return 0;
}

export function searchTools(query: string, allTools: Tool[]): SearchResult[] {
  if (!query.trim()) return allTools.map((t) => ({ tool: t, score: 0, matchType: 'name' }));

  const results: SearchResult[] = [];

  for (const tool of allTools) {
    let bestScore = 0;
    let bestMatch: SearchResult['matchType'] = 'name';

    // 名称匹配 (权重最高)
    const nameScore = calcScore(query, tool.name, 10);
    if (nameScore > bestScore) {
      bestScore = nameScore;
      bestMatch = 'name';
    }

    // 拼音匹配
    const pinyinScore = calcScore(query, tool.pinyin, 8);
    if (pinyinScore > bestScore) {
      bestScore = pinyinScore;
      bestMatch = 'pinyin';
    }

    // 标签匹配
    for (const tag of tool.tags) {
      const tagScore = calcScore(query, tag, 6);
      if (tagScore > bestScore) {
        bestScore = tagScore;
        bestMatch = 'tag';
      }
    }

    // 场景匹配
    const scenarioScore = calcScore(query, tool.scenario, 4);
    if (scenarioScore > bestScore) {
      bestScore = scenarioScore;
      bestMatch = 'scenario';
    }

    // 描述匹配
    const descScore = calcScore(query, tool.description, 2);
    if (descScore > bestScore) {
      bestScore = descScore;
      bestMatch = 'description';
    }

    if (bestScore > 0) {
      results.push({ tool, score: bestScore, matchType: bestMatch });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results;
}

export function filterByCategory(tools: Tool[], categoryId: string | null, subcategoryId: string | null): Tool[] {
  if (!categoryId) return tools;
  if (subcategoryId) return tools.filter((t) => t.category === categoryId && t.subcategory === subcategoryId);
  return tools.filter((t) => t.category === categoryId);
}
