// the hooks before component definition.
import './hooks'
import Vue from 'vue'
import VueRx from 'vue-rx';
Vue.use(VueRx);
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
