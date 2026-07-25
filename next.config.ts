import type { NextConfig } from "next";

/**
 * Next.js 配置
 * - output: 'export'  → 构建为纯静态文件，可部署到任意静态托管，或本地双击打开
 * - assetPrefix: './' → 资源使用相对路径，保证 file:// 协议下也能正常加载
 */
const nextConfig: NextConfig = {
  output: "export",
  assetPrefix: "./",
};

export default nextConfig;
