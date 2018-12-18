<template>
  <div class="parent">
    <h1>这是父路由</h1>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Parent extends Vue {
}
</script>
