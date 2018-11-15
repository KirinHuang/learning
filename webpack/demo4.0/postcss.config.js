module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      stage: 0,
      features: {
        'nesting-rules': true
      },
      importFrom: './src/assets/styles/theme.css'
    },
    autoprefixer: { grid: true },
    'postcss-sprites': {
      spritePath: './temp/images'
    },
  }
}