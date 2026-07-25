'use client';

import { Tool, MAX_FAVORITES } from '@/lib/tools';

interface FavoritesBarProps {
  favoriteTools: Tool[];
  recentTools: Tool[];
  onOpen: (id: string) => void;
  onRemoveFavorite: (id: string) => void;
}

export default function FavoritesBar({ favoriteTools, recentTools, onOpen, onRemoveFavorite }: FavoritesBarProps) {
  if (favoriteTools.length === 0 && recentTools.length === 0) return null;

  return (
    <div className="space-y-4 mb-8">
      {/* 常用工具 */}
      {favoriteTools.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.38-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <h3 className="text-sm font-semibold text-white">常用工具</h3>
            <span className="text-xs text-slate-500">{favoriteTools.length}/{MAX_FAVORITES}</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {favoriteTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => onOpen(tool.id)}
                className="group flex items-center gap-2 shrink-0 px-3 py-2 bg-slate-800/80 border border-yellow-500/20 rounded-lg hover:bg-slate-800 hover:border-yellow-500/40 transition-all"
              >
                <span className="text-lg">{tool.icon}</span>
                <span className="text-sm text-white group-hover:text-yellow-400 transition-colors whitespace-nowrap">
                  {tool.name}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); onRemoveFavorite(tool.id); }}
                  className="p-0.5 text-slate-600 hover:text-slate-300 transition-colors"
                  title="取消收藏"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 最近使用 */}
      {recentTools.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-sm font-semibold text-slate-300">最近使用</h3>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {recentTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => onOpen(tool.id)}
                className="group flex items-center gap-2 shrink-0 px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:bg-slate-800 hover:border-slate-600 transition-all"
              >
                <span className="text-lg">{tool.icon}</span>
                <span className="text-sm text-slate-300 group-hover:text-white transition-colors whitespace-nowrap">
                  {tool.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
