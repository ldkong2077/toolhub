# ToolHub - 一站式工作工具集合

聚合 AI 助手、文档处理、设计媒体、协作通讯、行业工具和开发平台，让工作者无需在不同来源间反复寻找所需工具。

## 功能特性

- **二级分类导航** — 左侧分类树支持一级/二级展开，按使用场景组织工具
- **智能搜索** — 支持名称、拼音首字母、标签、场景多维度检索
- **收藏与常用** — 收藏常用工具置顶展示，最多 12 个（可在 `src/lib/tools.ts` 调整 `MAX_FAVORITES`）
- **最近使用** — 自动记录最近使用的 8 个工具，快速回访
- **工具详情面板** — 侧边抽屉展示适用场景、使用指引、相关工具推荐
- **亮色/暗色主题** — 支持浅色、深色、跟随系统三种模式（偏好持久化至 localStorage，刷新无闪烁）
- **键盘快捷键** — 按 `/` 快速聚焦搜索，`Esc` 关闭面板/详情
- **响应式布局** — 桌面端侧边栏常驻，移动端抽屉式导航
- **零服务器 · 零外部构建依赖** — 纯静态导出，构建时不依赖任何外部网络资源（使用系统字体栈），可离线复现

## 工具分类

| 分类 | 子分类 | 工具数 |
|------|--------|--------|
| 🤖 AI 助手 | 通用对话 / 深度推理 | 8 |
| 📄 文档与文件 | PDF 工具 / 格式转换 | 3 |
| 🎨 设计与媒体 | 图片处理 / 在线设计 | 2 |
| 💬 协作与通讯 | 即时通讯 | 3 |
| 🏗️ 行业工具 | 城市更新 | 3 |
| ⚡ 开发工具 | AI 开发平台 / 代码托管 | 5 |

## 技术栈

- **Next.js 16** — React 框架（静态导出 `output: 'export'`）
- **React 19** — UI 构建
- **TypeScript 5** — 类型安全
- **Tailwind CSS 4** — 原子化样式（使用系统字体栈，构建无需联网拉取字体）

## 快速开始

### 环境要求

- Node.js 20 及以上

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建静态版本（可直接打开）

```bash
npm run build:static
```

构建完成后，`out/` 目录即为纯静态站点：

- **本地直接打开** — 双击 `out/index.html` 即可使用，无需任何服务器（`fix-paths.mjs` 已注入 `file://` 兼容脚本）
- **本地预览（推荐）** — `npm start` 使用静态服务器托管 `out/`
- **部署到 GitHub Pages** — 将 `out/` 目录推送到 `gh-pages` 分支
- **打包分发** — `npm run pack` 会额外生成 `toolhub.zip` 压缩包

## 部署与安全响应头

本项目为纯静态站点。静态导出**无法**由应用本身输出 CSP / X-Frame-Options 等安全响应头，需要在托管层补齐：

- **Cloudflare Pages / Netlify** — 已内置 `public/_headers`，构建后会随 `out/` 一并部署生效。
- **Nginx** — 在站点配置中补充：
  ```nginx
  add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'" always;
  add_header X-Frame-Options "DENY" always;
  add_header X-Content-Type-Options "nosniff" always;
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
  ```
- **GitHub Pages** — 暂不支持自定义响应头，建议改用上述支持 `_headers` 的托管或前置 CDN。

## 项目结构

```
src/
├── app/               # Next.js App Router
│   ├── layout.tsx     # 根布局（主题防闪烁脚本、SEO）
│   ├── page.tsx       # 主页（状态管理、收藏/最近、搜索、主题、轻提示）
│   ├── not-found.tsx  # 404 页面
│   └── globals.css    # 全局样式与主题变量（系统字体栈）
├── components/        # UI 组件
│   ├── Sidebar.tsx    # 分类树侧边栏
│   ├── SearchBar.tsx  # 搜索框（含快捷键）
│   ├── ToolCard.tsx   # 工具卡片
│   ├── ToolDetail.tsx # 工具详情面板
│   ├── FavoritesBar.tsx # 常用/最近工具栏
│   └── ThemeToggle.tsx  # 主题切换
├── hooks/
│   └── useLocalStorage.ts # localStorage 响应式 hook（SSR 安全）
└── lib/
    ├── tools.ts       # 工具数据、分类定义、常量（MAX_FAVORITES）
    └── search.ts      # 搜索引擎（名称/拼音/标签/场景）
scripts/
└── fix-paths.mjs      # 构建后路径修正（绝对→相对）+ file:// 兼容脚本注入
public/
└── _headers           # 静态托管安全响应头（Cloudflare/Netlify 生效）
```

## 添加新工具

在 `src/lib/tools.ts` 的 `tools` 数组中添加条目：

```typescript
{
  id: 'my-tool',
  name: '我的工具',
  description: '工具描述',
  url: 'https://example.com',
  icon: '🛠️',
  category: 'document',       // 所属分类 id
  subcategory: 'doc-pdf',     // 所属子分类 id
  tags: ['标签1', '标签2'],
  pinyin: 'wodegongju wdgj',  // 拼音全拼 + 首字母
  scenario: '适用场景描述',
  guide: '使用指引',
}
```

如需新增分类，在 `categories` 数组中添加对应条目即可。调整收藏上限请修改 `MAX_FAVORITES` 常量。

## 开源发布

- 本项目采用 [MIT 协议](./LICENSE)，可自由使用、修改与分发。
- `.gitignore` 已排除 `node_modules/`、`.next/`、`out/`、本地配置 `.claude/`、构建产物 `*.zip` 与项目内部记忆 `.workbuddy/`，避免泄露机器路径与冗余产物。
- 版本管理：建议使用语义化版本标签，例如 `git tag -a v1.0.0 -m "ToolHub v1.0.0"`。

## License

[MIT](./LICENSE)
