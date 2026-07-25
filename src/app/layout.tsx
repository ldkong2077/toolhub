import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020617",
};

export const metadata: Metadata = {
  title: "ToolHub - 一站式工作工具集合",
  description:
    "聚合AI助手、文档处理、设计媒体、协作通讯、行业工具和开发平台，让工作者无需在不同来源间反复寻找所需工具",
  keywords: ["工具聚合", "AI助手", "办公工具", "PDF工具", "开发平台", "一站式"],
  authors: [{ name: "ToolHub" }],
  openGraph: {
    title: "ToolHub - 一站式工作工具集合",
    description: "聚合AI助手、文档处理、设计媒体、协作通讯、行业工具和开发平台",
    type: "website",
    locale: "zh_CN",
  },
};

// 防闪烁(FOUC)内联脚本：在 React 接管前，依据 localStorage 中的主题偏好
// 提前设置 <html data-theme>，避免刷新时出现浅/深主题闪一下。
// 注意：此处读取的存储 key 必须与 useLocalStorage('toolhub_theme') 完全一致。
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-slate-950 text-white">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = JSON.parse(localStorage.getItem('toolhub_theme') || '"system"');
                  if (theme === 'system') {
                    document.documentElement.setAttribute('data-theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  } else {
                    document.documentElement.setAttribute('data-theme', theme);
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
