'use client';

import { Tool, getToolById, getCategoryById } from '@/lib/tools';
import { useEffect } from 'react';

// 工具详情抽屉：展示场景、指引、相关推荐；Esc 关闭，打开时锁定背景滚动。

interface ToolDetailProps {
  toolId: string | null;
  tools: Tool[];
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export default function ToolDetail({ toolId, tools, isFavorite, onToggleFavorite, onOpen, onClose }: ToolDetailProps) {
  const tool = toolId ? getToolById(toolId) : undefined;
  const category = tool ? getCategoryById(tool.category) : undefined;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (toolId) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [toolId, onClose]);

  if (!tool) return null;

  const relatedTools = tools.filter(
    (t) => t.id !== tool.id && (t.category === tool.category || t.tags.some((tag) => tool.tags.includes(tag)))
  ).slice(0, 4);

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500/20 text-blue-400',
    green: 'bg-green-500/20 text-green-400',
    pink: 'bg-pink-500/20 text-pink-400',
    cyan: 'bg-cyan-500/20 text-cyan-400',
    orange: 'bg-orange-500/20 text-orange-400',
    purple: 'bg-purple-500/20 text-purple-400',
  };

  return (
    <>
      {/* 遮罩 */}
      <div
        className="fixed inset-0 bg-black/40 z-50"
        onClick={onClose}
      />

      {/* 面板 */}
      <div className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-slate-900 border-l border-slate-700/50 shadow-2xl overflow-y-auto">
        {/* 头部 */}
        <div className="sticky top-0 bg-slate-900 border-b border-slate-700/50 p-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">工具详情</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* 工具信息 */}
          <div className="flex items-start gap-4">
            <div className="text-4xl">{tool.icon}</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white">{tool.name}</h2>
              <p className="text-slate-400 text-sm mt-1">{tool.description}</p>
              {category && (
                <span className={`inline-block mt-2 px-2 py-0.5 text-xs rounded-full ${colorMap[category.color] || colorMap.blue}`}>
                  {category.icon} {category.name}
                </span>
              )}
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-2">
            <button
              onClick={() => onOpen(tool.id)}
              className="flex-1 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              打开工具
            </button>
            <button
              onClick={() => onToggleFavorite(tool.id)}
              className={`px-4 py-2.5 border text-sm font-medium rounded-lg transition-colors ${
                isFavorite
                  ? 'border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10'
                  : 'border-slate-600 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {isFavorite ? '★ 已收藏' : '☆ 收藏'}
            </button>
          </div>

          {/* 适用场景 */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">适用场景</h4>
            <p className="text-slate-300 text-sm leading-relaxed">{tool.scenario}</p>
          </div>

          {/* 使用指引 */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">使用指引</h4>
            <p className="text-slate-300 text-sm leading-relaxed">{tool.guide}</p>
          </div>

          {/* 标签 */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">标签</h4>
            <div className="flex flex-wrap gap-2">
              {tool.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs bg-slate-700/60 text-slate-300 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 链接 */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">链接</h4>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 text-sm hover:text-blue-300 break-all"
            >
              {tool.url}
            </a>
          </div>

          {/* 相关工具 */}
          {relatedTools.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">相关工具</h4>
              <div className="space-y-2">
                {relatedTools.map((rt) => (
                  <button
                    key={rt.id}
                    onClick={() => onOpen(rt.id)}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors text-left"
                  >
                    <span className="text-lg">{rt.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{rt.name}</p>
                      <p className="text-slate-500 text-xs truncate">{rt.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
