<template>
  <div id="app">
    <About></About>
    <Home></Home>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({

    })
  },

  components: {
    About: () => import('./views/About.vue'),
    Home: () => import('./views/Home.vue')
  }
}
</script>

<style lang="stylus">
#app  {
  background: #FFF;
}
</style>
