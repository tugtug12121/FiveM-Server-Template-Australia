import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "node:path"

export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
        propsDestructure: true
      }
    })
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@utils": path.resolve(__dirname, "src/utils")
    }
  },

  server: {
    strictPort: true,
    port: 5173,
    cors: true,
    hmr: {
      overlay: true
    }
  },

  build: {
    target: "esnext",
    sourcemap: false,
    minify: "esbuild",
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/vue')) {
            return 'vue';
          }
          if (id.includes('node_modules/vue-router')) {
            return 'router';
          }
        }
      }
    }
  },

  css: {
    devSourcemap: true
  }
})
