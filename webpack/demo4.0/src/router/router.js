import Vue from 'vue'
import Router from 'vue-router'
import example from './example'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    ...example,
  ]
})
