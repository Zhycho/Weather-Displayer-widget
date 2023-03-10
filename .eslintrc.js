module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'indent': ['error', 4],
    'semi': ['error', 'always'],
    'comma-dangle': 'off',
    'space-before-function-paren': ['error', 'never']
  },
  overrides: [
    {
      files: ['src/components/**/index.vue'],
      rules: {
        'vue/multi-word-component-names': 0,
      },
    },
  ],
}
