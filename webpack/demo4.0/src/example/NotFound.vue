<template>
  <div class="not-found">
    <h1>Page Not Found 404</h1>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class NotFound extends Vue {
}
</script>

<style>
.not-found {
  font-size: 32px;
}
</style>