module.exports = {
  "presets": [
    ["@babel/preset-env", { "useBuiltIns": "usage" }]
  ],
  "plugins": [
    ["@babel/plugin-transform-runtime", { "corejs": 2 }],
    "@babel/plugin-syntax-dynamic-import",
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    "@babel/plugin-syntax-function-bind",
  ]
}