<template>
  <div id="app">
    <div class="list cf">
      <div class="list__item">&nbsp;</div>
      <div class="list__item">&nbsp;</div>
      <div class="list__item">&nbsp;</div>
      <div class="list__item">&nbsp;</div>
      <div class="list__item">&nbsp;</div>
      <div class="list__item">&nbsp;</div>
      <div class="list__item">&nbsp;</div>
      <div class="list__item">&nbsp;</div>
      <div class="list__item">&nbsp;</div>
      <div class="list__item">&nbsp;</div>
      <div class="list__item">&nbsp;</div>
      <div class="list__item">&nbsp;</div>
      <div class="list__item">&nbsp;</div>
      <div class="list__item">&nbsp;</div>
      <div class="list__item">&nbsp;</div>
      <div class="send">
        <input type="text" name="" id="" value="" />
        <button type="submit">send</button>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

body
  padding 0
  margin 0

.list
  text-align center
  background #FF618D
  &__item
    height 50px
    background #F7B0BD
    border 1px dashed #FF91AB
    margin 5px

// Util
.cf
  *zoom 1

  &:before, &:after
    content ' '
    display table
</style>
