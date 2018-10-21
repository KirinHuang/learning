<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!-- <router-view/> -->
    <Hello></Hello>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    Hello: () => import('root/components/HelloWorld')
  }
}
</script>

<style lang="stylus">
@import './styles/variables.css'

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--primary-color);
  margin-top: 60px;

  &.on {
    color: red;
  }
}
</style>
