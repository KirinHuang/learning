<template>
  <div id="app">
    <router-link to="/">home</router-link>
    <router-link to="/about">about</router-link>
    <router-link to="/ctx/about">sub path about</router-link>
    <router-link to="/parent/son">嵌套路由</router-link>
    <router-link to="/xxxx">404</router-link>
    <p>{{msg}}</p>
    <p>computed msg: {{computedMsg}}</p>
    <button @click="greet">Greet</button>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import Component, { mixins }from 'vue-class-component'
import { MyMixin } from './mixins'
import { NoCache } from './decorator'

@Component({
  props: {
    propMessage: String
  }
})
export default class App extends mixins(MyMixin) {
  msg = 123

  created () {
    console.log(this.mixinValue) // -> Hello
  }

  // lifecycle hook
  mounted () {
    // this.greet()
  }

  // the computed property will not be cached
  @NoCache
  get random () {
    return Math.random()
  }

  // computed
  get computedMsg () {
    return 'computed ' + this.msg
  }

  // method
  greet () {
    alert('greeting: ' + this.msg)
  }
}
</script>

<style>
#app {
  font-family: "Microsoft Yahei","微软雅黑", STXihei, "华文细黑", sans-serif;
  color: var(--primary-color);
  /* background-image: url(./assets/images/logo.big.png);
  background-repeat: no-repeat; */
}
</style>
