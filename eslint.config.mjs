import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // 构建脚本（Node ESM），不属于前端源码，跳过 lint
    "scripts/**",
    // 本地归档目录（含旧构建产物 / node_modules / .next 副本），不参与源码检查
    "reference/**",
  ]),
]);

export default eslintConfig;
