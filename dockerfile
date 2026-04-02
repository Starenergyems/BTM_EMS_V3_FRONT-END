# Stage 1: build
FROM node:20-alpine AS build
WORKDIR /app

# 只複製 package 檔案,利用 cache
COPY package*.json ./

# 使用 BuildKit cache mount 加速 npm 安裝
RUN --mount=type=cache,target=/root/.npm \
    npm ci --prefer-offline --no-audit --progress=false

# 再複製其他原始碼
COPY . .

# 使用 cache mount 加速建置
RUN --mount=type=cache,target=/app/node_modules/.cache \
    npm run build

# Stage 2: serve with nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
