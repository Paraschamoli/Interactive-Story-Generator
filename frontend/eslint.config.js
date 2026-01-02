import js from '@eslint/js'
import globals from 'globals'
import vue from 'eslint-plugin-vue'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,vue}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      vue,
    },
    rules: {
      ...js.configs.recommended.rules,
      'vue/no-unused-vars': 'error',
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: require('vue-eslint-parser'),
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
]