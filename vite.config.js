import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
// https://vite.dev/config/

// set up backend host. If launched locally then use 'localhost', otherwise use server option
const backendHost = process.env.BACKEND_HOST
    ? process.env.BACKEND_HOST
    : "localhost";

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        target: `http://${backendHost}:8081/`,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    host: "0.0.0.0",
    port: 3000,
  },
  build: {
    outDir: 'dist'
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
})
