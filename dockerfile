# Stage 1: build
FROM node:20-alpine AS build
WORKDIR /app

# 只複製 package 檔案,利用 cache
COPY package*.json ./

RUN npm ci --no-audit --progress=false

# 再複製其他原始碼
COPY . .

ARG VITE_API_BASEURL=/api/
ARG VITE_CHATKIT_API_URL=/chatkit

ENV VITE_API_BASEURL=$VITE_API_BASEURL \
    VITE_CHATKIT_API_URL=$VITE_CHATKIT_API_URL

RUN test -n "$VITE_API_BASEURL" || (echo "VITE_API_BASEURL is required for production build" && exit 1)
RUN npm run build

# Stage 2: serve with nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN nginx -t
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
