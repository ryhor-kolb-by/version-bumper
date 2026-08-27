import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vercel и GitHub Actions кладут SHA коммита в переменные окружения.
// Пробрасываем его в бандл, чтобы на странице было видно, какой именно
// коммит задеплоен. Локально получаем 'local'.
const commitSha =
  process.env.VERCEL_GIT_COMMIT_SHA ??
  process.env.GITHUB_SHA ??
  'local'

const deployEnv = process.env.VERCEL_ENV ?? 'local'

export default defineConfig({
  plugins: [react()],
  define: {
    __COMMIT_SHA__: JSON.stringify(commitSha.slice(0, 7)),
    __DEPLOY_ENV__: JSON.stringify(deployEnv),
  },
})
