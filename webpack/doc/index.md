1. npm i -D webpack,如果使用4.0+还需要webpack-cli

# 遇到的问题
1. production mode vue的style会丢失，修改package.json的"sideEffects": ["*.vue"]可以解决[github issue](https://github.com/vuejs/vuepress/issues/718)
2. import './xxx.css' 在build中没有生成，是应为webpack的tree shaking功能认为这是无用的文件，所以配置"sideEffects": ["*.css"]可以解决，参考[issue](https://github.com/webpack-contrib/mini-css-extract-plugin/issues/102)