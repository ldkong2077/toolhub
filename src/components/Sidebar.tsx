'use client';

import { categories, tools as allTools, getToolsByCategory } from '@/lib/tools';
import { Category } from '@/lib/tools';

// 分类树侧边栏：一级/二级分类导航；桌面端常驻，移动端抽屉式。

interface SidebarProps {
  activeCategory: string | null;
  activeSubcategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  onSubcategoryChange: (subcategoryId: string | null) => void;
  isOpen: boolean;
  onClose: () => void;
}

const colorMap: Record<string, { active: string; hover: string; text: string; count: string }> = {
  blue: { active: 'bg-blue-500/20 text-blue-400', hover: 'hover:bg-blue-500/10', text: 'text-blue-400', count: 'text-blue-400/70' },
  green: { active: 'bg-green-500/20 text-green-400', hover: 'hover:bg-green-500/10', text: 'text-green-400', count: 'text-green-400/70' },
  pink: { active: 'bg-pink-500/20 text-pink-400', hover: 'hover:bg-pink-500/10', text: 'text-pink-400', count: 'text-pink-400/70' },
  cyan: { active: 'bg-cyan-500/20 text-cyan-400', hover: 'hover:bg-cyan-500/10', text: 'text-cyan-400', count: 'text-cyan-400/70' },
  orange: { active: 'bg-orange-500/20 text-orange-400', hover: 'hover:bg-orange-500/10', text: 'text-orange-400', count: 'text-orange-400/70' },
  purple: { active: 'bg-purple-500/20 text-purple-400', hover: 'hover:bg-purple-500/10', text: 'text-purple-400', count: 'text-purple-400/70' },
};

export default function Sidebar({
  activeCategory,
  activeSubcategory,
  onCategoryChange,
  onSubcategoryChange,
  isOpen,
  onClose,
}: SidebarProps) {
  const totalTools = allTools.length;

  const renderCategory = (cat: Category) => {
    const colors = colorMap[cat.color] || colorMap.blue;
    const catTools = getToolsByCategory(cat.id);
    const isActive = activeCategory === cat.id;
    const isSubActive = activeCategory === cat.id && activeSubcategory !== null;

    return (
      <div key={cat.id}>
        <button
          onClick={() => {
            if (isActive && !activeSubcategory) {
              onCategoryChange(null);
              onSubcategoryChange(null);
            } else {
              onCategoryChange(cat.id);
              onSubcategoryChange(null);
            }
          }}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
            isActive && !isSubActive
              ? colors.active
              : `text-slate-300 ${colors.hover}`
          }`}
        >
          <span className="text-base">{cat.icon}</span>
          <span className="flex-1 text-left font-medium">{cat.name}</span>
          <span className={`text-xs ${isActive ? colors.count : 'text-slate-500'}`}>
            {catTools.length}
          </span>
        </button>

        {/* 二级分类展开 */}
        {isActive && cat.subcategories.length > 1 && (
          <div className="ml-6 mt-1 space-y-0.5">
            {cat.subcategories.map((sub) => {
              const subTools = catTools.filter((t) => t.subcategory === sub.id);
              const isSubSelected = activeSubcategory === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => {
                    if (isSubSelected) {
                      onSubcategoryChange(null);
                    } else {
                      onSubcategoryChange(sub.id);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-xs transition-all ${
                    isSubSelected
                      ? `${colors.active} font-medium`
                      : `text-slate-400 ${colors.hover}`
                  }`}
                >
                  <span>{sub.name}</span>
                  <span className={isSubSelected ? colors.count : 'text-slate-600'}>
                    {subTools.length}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* 移动端遮罩 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* 侧边栏 */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-slate-900 border-r border-slate-700/50 transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo区域 */}
          <div className="p-4 border-b border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">ToolHub</h2>
                <p className="text-slate-500 text-xs mt-0.5">一站式工作工具集合</p>
              </div>
              <button
                onClick={onClose}
                className="lg:hidden p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* 分类导航 */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            {/* 全部 */}
            <button
              onClick={() => {
                onCategoryChange(null);
                onSubcategoryChange(null);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                activeCategory === null
                  ? 'bg-slate-700/50 text-white'
                  : 'text-slate-300 hover:bg-slate-700/30'
              }`}
            >
              <span className="text-base">🌐</span>
              <span className="flex-1 text-left font-medium">全部工具</span>
              <span className="text-xs text-slate-500">{totalTools}</span>
            </button>

            <div className="my-2 border-t border-slate-700/30" />

            {categories.map(renderCategory)}
          </nav>

          {/* 底部统计 */}
          <div className="p-4 border-t border-slate-700/50">
            <p className="text-xs text-slate-500 text-center">
              共 {totalTools} 个工具 · {categories.length} 个分类
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
