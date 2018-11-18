<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class About extends Vue {
  // The class component now treats beforeRouteEnter
  // and beforeRouteLeave as Vue Router hooks
  beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnter')
    next() // needs to be called to confirm the navigation
  }
}
</script>
