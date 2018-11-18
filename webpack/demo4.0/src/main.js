// the hooks before component definition.
import './hooks'
import Vue from 'vue'
// require('./assets/styles/index.css') // import build时会丢失, because fo tree shaking[sideEffects]
import './assets/styles/index.css'
import App from './App.vue'
import router from './router/router'
import store from './store/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
