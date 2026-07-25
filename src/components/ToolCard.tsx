'use client';

import { Tool } from '@/lib/tools';

// 工具卡片：展示工具信息，提供收藏 / 详情 / 打开操作。

interface ToolCardProps {
  tool: Tool;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpen: (id: string) => void;
  onShowDetail: (id: string) => void;
}

export default function ToolCard({ tool, isFavorite, onToggleFavorite, onOpen, onShowDetail }: ToolCardProps) {
  return (
    <div className="group bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 hover:bg-slate-800 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-200">
      <div className="flex items-start gap-3">
        <div className="text-2xl shrink-0">{tool.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-white font-semibold text-sm group-hover:text-blue-400 transition-colors truncate">
              {tool.name}
            </h3>
          </div>
          <p className="text-slate-400 text-xs mt-1 line-clamp-2 leading-relaxed">
            {tool.description}
          </p>
          {/* 标签 */}
          <div className="flex flex-wrap gap-1 mt-2">
            {tool.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 text-[10px] bg-slate-700/60 text-slate-400 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 操作栏 */}
      <div className="mt-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(tool.id); }}
            className={`p-1.5 rounded-md text-xs transition-colors ${
              isFavorite
                ? 'text-yellow-400 hover:text-yellow-300'
                : 'text-slate-500 hover:text-yellow-400'
            }`}
            title={isFavorite ? '取消收藏' : '收藏'}
          >
            <svg className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.38-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onShowDetail(tool.id); }}
            className="p-1.5 rounded-md text-xs text-slate-500 hover:text-blue-400 transition-colors"
            title="详情"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        <button
          onClick={() => onOpen(tool.id)}
          className="flex items-center gap-1 text-blue-400 text-xs hover:text-blue-300 transition-colors"
        >
          <span>打开</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
