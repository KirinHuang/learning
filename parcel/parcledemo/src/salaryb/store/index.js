/**
 * Created by Sawyer on 2017年2月16日 13:03:14.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import lottery from './modules/lottery'
import user from './modules/user'
require('es6-promise').polyfill()
// import Promise from 'promise-polyfill';
//
// // To add to window
// if (!window.Promise) {
//   window.Promise = Promise;
// }

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
      lottery,
      user
  },
  // strict: debug
})
