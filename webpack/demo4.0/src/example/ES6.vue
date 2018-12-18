<template>
  <div class="es6">
    <ul>
      <li>generator</li>
    </ul>

    <div class="panel">
      <button @click="testAsync">test generator</button>
      <div class="result">{{result}}</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { fibonacci } from './module'

@Component
export default class ES6 extends Vue {
  result = 1

  gen = fibonacci()

  mounted () {
    this.testAsync()
  }

  testAsync () {

    this.result += this.gen.next().value
  }
}
</script>

<style>
.panel {
  border: 1px solid red;
  border-radius: 4px;
}
</style>