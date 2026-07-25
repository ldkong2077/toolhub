'use client';

import { tools, categories, getToolById, MAX_FAVORITES, Theme } from '@/lib/tools';
import { searchTools, filterByCategory } from '@/lib/search';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Sidebar from '@/components/Sidebar';
import SearchBar from '@/components/SearchBar';
import ToolCard from '@/components/ToolCard';
import ToolDetail from '@/components/ToolDetail';
import FavoritesBar from '@/components/FavoritesBar';
import ThemeToggle from '@/components/ThemeToggle';
import { useState, useCallback, useMemo, useEffect } from 'react';

export default function Home() {
  // 侧边栏
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);

  // 搜索
  const [searchQuery, setSearchQuery] = useState('');

  // 收藏 & 最近使用
  const [favorites, setFavorites] = useLocalStorage<string[]>('toolhub_favorites', []);
  const [recentIds, setRecentIds] = useLocalStorage<string[]>('toolhub_recent', []);

  // 详情面板
  const [detailToolId, setDetailToolId] = useState<string | null>(null);

  // 轻提示（如收藏达上限）
  const [toast, setToast] = useState<string | null>(null);

  // 主题
  const [theme, setTheme] = useLocalStorage<Theme>('toolhub_theme', 'system');

  // 主题应用
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      root.setAttribute('data-theme', mq.matches ? 'dark' : 'light');
      const handler = (e: MediaQueryListEvent) => root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    } else {
      root.setAttribute('data-theme', theme);
    }
  }, [theme]);

  // 轻提示自动消失
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(timer);
  }, [toast]);

  // 收藏工具列表
  const favoriteTools = useMemo(
    () => favorites.map((id) => getToolById(id)).filter(Boolean) as typeof tools,
    [favorites]
  );

  // 最近使用工具列表
  const recentTools = useMemo(
    () => recentIds.map((id) => getToolById(id)).filter(Boolean) as typeof tools,
    [recentIds]
  );

  // 详情工具是否收藏
  const detailIsFavorite = detailToolId ? favorites.includes(detailToolId) : false;

  // 筛选后的工具
  const displayTools = useMemo(() => {
    const categoryFiltered = filterByCategory(tools, activeCategory, activeSubcategory);
    if (!searchQuery.trim()) return categoryFiltered;
    const results = searchTools(searchQuery, categoryFiltered);
    return results.map((r) => r.tool);
  }, [activeCategory, activeSubcategory, searchQuery]);

  // 打开工具
  const handleOpenTool = useCallback((id: string) => {
    const tool = getToolById(id);
    if (!tool) return;
    // 记录最近使用
    setRecentIds((prev) => {
      const next = prev.filter((x) => x !== id);
      return [id, ...next].slice(0, 8);
    });
    window.open(tool.url, '_blank', 'noopener,noreferrer');
  }, [setRecentIds]);

  // 收藏切换
  const handleToggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_FAVORITES) {
        setToast(`收藏已达上限（最多 ${MAX_FAVORITES} 个）`);
        return prev;
      }
      return [id, ...prev];
    });
  }, [setFavorites]);

  // 移除收藏
  const handleRemoveFavorite = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((x) => x !== id));
  }, [setFavorites]);

  // 清空搜索
  const handleClearSearch = useCallback(() => setSearchQuery(''), []);

  // 按分类分组展示
  const groupedTools = useMemo(() => {
    if (activeCategory || searchQuery.trim()) {
      return [{ categoryId: activeCategory || 'search', tools: displayTools }];
    }
    const groups: { categoryId: string; tools: typeof displayTools }[] = [];
    for (const cat of categories) {
      const catTools = displayTools.filter((t) => t.category === cat.id);
      if (catTools.length > 0) groups.push({ categoryId: cat.id, tools: catTools });
    }
    return groups;
  }, [activeCategory, searchQuery, displayTools]);

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* 侧边栏 */}
      <Sidebar
        activeCategory={activeCategory}
        activeSubcategory={activeSubcategory}
        onCategoryChange={(id) => { setActiveCategory(id); setActiveSubcategory(null); }}
        onSubcategoryChange={setActiveSubcategory}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* 主内容 */}
      <div className="flex-1 min-w-0">
        {/* 顶栏 */}
        <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-sm border-b border-slate-800/50">
          <div className="px-4 py-3 flex items-center gap-3">
            {/* 移动端菜单按钮 */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* 标题 (移动端) */}
            <h1 className="lg:hidden text-lg font-bold text-white">ToolHub</h1>

            {/* 面包屑 */}
            <div className="hidden lg:flex items-center gap-1.5 text-sm">
              <span className="text-slate-500">工具</span>
              {activeCategory && (
                <>
                  <svg className="w-3 h-3 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-slate-300">
                    {categories.find((c) => c.id === activeCategory)?.name}
                  </span>
                </>
              )}
              {activeSubcategory && activeCategory && (
                <>
                  <svg className="w-3 h-3 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-slate-300">
                    {categories.find((c) => c.id === activeCategory)?.subcategories.find((s) => s.id === activeSubcategory)?.name}
                  </span>
                </>
              )}
            </div>

            <div className="flex-1" />

            {/* 搜索框 */}
            <div className="w-full max-w-xs sm:max-w-sm">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onClear={handleClearSearch}
              />
            </div>

            {/* 主题切换 */}
            <ThemeToggle theme={theme} onThemeChange={setTheme} />
          </div>
        </header>

        {/* 内容区 */}
        <main className="px-4 sm:px-6 py-6 max-w-6xl mx-auto">
          {/* 常用 + 最近 */}
          {!searchQuery && !activeCategory && (
            <FavoritesBar
              favoriteTools={favoriteTools}
              recentTools={recentTools}
              onOpen={handleOpenTool}
              onRemoveFavorite={handleRemoveFavorite}
            />
          )}

          {/* 工具列表 */}
          {displayTools.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-slate-500 text-lg">未找到匹配的工具</p>
              <p className="text-slate-600 text-sm mt-2">试试其他关键词或切换分类</p>
            </div>
          ) : (
            <div className="space-y-8">
              {groupedTools.map((group) => {
                const cat = categories.find((c) => c.id === group.categoryId);
                return (
                  <section key={group.categoryId}>
                    {cat && !activeCategory && !searchQuery && (
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg">{cat.icon}</span>
                        <h2 className="text-base font-semibold text-white">{cat.name}</h2>
                        <span className="text-xs text-slate-500">{group.tools.length}</span>
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                      {group.tools.map((tool) => (
                        <ToolCard
                          key={tool.id}
                          tool={tool}
                          isFavorite={favorites.includes(tool.id)}
                          onToggleFavorite={handleToggleFavorite}
                          onOpen={handleOpenTool}
                          onShowDetail={setDetailToolId}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}

          {/* 统计 */}
          {!searchQuery && (
            <div className="mt-12 text-center">
              <p className="text-slate-600 text-xs">
                共收录 <span className="text-blue-400/70">{tools.length}</span> 个工具，
                涵盖 <span className="text-purple-400/70">{categories.length}</span> 个分类
              </p>
            </div>
          )}
        </main>

        {/* 底部 */}
        <footer className="border-t border-slate-800/50 py-6">
          <div className="max-w-6xl mx-auto px-4 text-center text-slate-600 text-xs">
            <p>ToolHub - 一站式工作工具集合 · 开源项目</p>
          </div>
        </footer>
      </div>

      {/* 详情面板 */}
      <ToolDetail
        toolId={detailToolId}
        tools={tools}
        isFavorite={detailIsFavorite}
        onToggleFavorite={handleToggleFavorite}
        onOpen={handleOpenTool}
        onClose={() => setDetailToolId(null)}
      />

      {/* 轻提示 */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
