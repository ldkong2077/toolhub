# syntax=docker/dockerfile:1

# ---------- 构建阶段 ----------
FROM node:20-alpine AS builder
WORKDIR /app

# 先安装依赖（利用层缓存）
COPY package.json package-lock.json ./
RUN npm ci

# 再复制源码并构建静态导出
COPY . .
RUN npm run build:static

# ---------- 运行阶段 ----------
FROM nginx:1.27-alpine
COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# 健康探针：K8s / 容器编排可通过该端点判断存活
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://localhost/healthz >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
