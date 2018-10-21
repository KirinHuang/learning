module.exports = {
  "modules": false,
  "plugins": {
    "postcss-sprites": {
      "stylesheetPath": "./dist",
      "spritePath": "./dist/images/"
    },
    "autoprefixer": {
      "grid": true
    },
    "postcss-preset-env": {
      importFrom: [
        'src/styles/variables.css'
      ],
      stage: 0,
      features: {
        'nesting-rules': true
      },
    }
  }
}