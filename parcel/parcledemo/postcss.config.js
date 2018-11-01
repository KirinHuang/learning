module.exports = {
  "modules": false,
  "plugins": {
    // "postcss-sprites": {
    //   "stylesheetPath": "./dist",
    //   "spritePath": "./dist/images/",
    //   groupBy: function(image) {
    //     console.log(image)
    //     return Promise.resolve('shapes');
    //   }
    // },
    // "postcss-easysprites": {
    //   imagePath: './dist/',
    //   spritePath: './dist/',
    //   stylesheetPath: './dist/'
    // },
    "autoprefixer": {
      "grid": true,
      "flexbox": true
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