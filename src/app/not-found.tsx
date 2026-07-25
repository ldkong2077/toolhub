import Link from 'next/link';

// 404 页面：静态导出下访问不存在路由时展示。

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">404</div>
        <h1 className="text-xl font-bold text-white mb-2">页面未找到</h1>
        <p className="text-slate-500 text-sm mb-6">你访问的页面不存在</p>
        <Link
          href="/"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
