import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'

export default [
  { ignores: ['dist/**'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    plugins: { react },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        // Подставляются на этапе сборки через vite.config.js
        __COMMIT_SHA__: 'readonly',
        __DEPLOY_ENV__: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      'no-unused-vars': 'error',
      // Без этого правила eslint не видит, что компонент используется в JSX,
      // и ругается на «неиспользуемый» импорт.
      'react/jsx-uses-vars': 'error',
    },
  },
  {
    // Конфиги и тесты выполняются в Node, а не в браузере
    files: ['vite.config.js', 'eslint.config.js', '**/*.test.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
]
