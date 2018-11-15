<template>
  <div id="app">
    <a href="#/home">home</a>
    <a href="#/about">about</a>
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
  color: var(--primary-color);
  background: url(./assets/images/logo.big.png) no-repeat;
}
</style>
