/// <reference types="vitest" />
//上行是為了能在definedConfig中加入test屬性
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: new URL("./src/setupTests.js", import.meta.url).pathname,
  },
  server: {
    watch: {
      usePolling: true,  // 讓 Docker volume 的檔案變更能被偵測
    },
    proxy: {
      "/dev": {
        target: "http://localhost:13000", // 測試機 API
        changeOrigin: true,
        secure: false, // 如果 API 使用 HTTPS，但沒有有效的 SSL 憑證
      },
    },
  },
});
