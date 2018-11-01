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
@import './styles/icons.styl'

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--primary-color);
  margin-top: 60px;
  display: flex;
  flex-direction: column;

  &.on {
    color: red;
  }
}
</style>
