import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig((command, mode) => {
  const env = loadEnv(mode, process.cwd(), "")

  console.log(env.VITE_DEBUG)

  return {
    plugins: [vue()],
    server: {
      ...(env.VITE_DEBUG === "true" && {
        proxy: {
          "/api": {
            target: "http://localhost:8000",
            changeOrigin: true,
            secure: false
          }
        }
      })
    }
  }
})