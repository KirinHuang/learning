<template>
  <div id="app">
    <router-link to="/">home</router-link>
    <router-link to="/about">about</router-link>
    <router-link to="/parent/son">嵌套路由</router-link>
    <router-link to="/xxxx">404</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',

  components: {
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
