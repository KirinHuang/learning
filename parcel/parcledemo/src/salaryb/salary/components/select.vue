<template>
  <div v-show="salaryType !== '0'">
    <div class="lotterySelect" @click="showDropdown = !showDropdown" @blur="handleBlur" tabindex="1">
      <span class="name">{{lotteryName ? lotteryName : defaultName}}</span>
      <i :class="['caret', {isDown: showDropdown}]">></i>
      <transition name="fade">
        <ul class="dropdown" :style="dropDownStyle" v-if="showDropdown">
          <li v-for="item in data" :key="item.id"
            :class="['drop-item', {on: lottery === item.id}]"
            @click="handleSelect(item.id, item.name)"
          >
            {{item.name}}
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      lottery: null,
      lotteryName: null,
      showDropdown: false
    }
  },

  props: {
    data: {
      type: Array,
      required: true
    },

    salaryType: {
      required: true
    }
  },

  computed: {
    defaultName () {
      if (this.data && this.data.length) {
        this.lottery = this.data[0].id
        let name = this.data[0].name
        this.$emit('change', this.lottery, name)
        return name
      }
    },
    dropDownStyle () {
      if (this.data && this.data.length) {
        return {
          width: Math.ceil(this.data.length/10)*164 + 'px'
        }
      }
    }
  },

  methods: {
    handleSelect (id, name) {
      this.lottery = id
      this.lotteryName = name

      this.$emit('change', id, name)
    },

    handleBlur() {
      this.showDropdown = false
    }
  }
}
</script>

<style lang="less">
.lotterySelect {
  position: relative;
  text-align: center;
  display: inline-block;
  padding: 0 10px;
  height: 34px;
  line-height: 34px;
  margin-top: 16px;
  cursor: pointer;
  background: linear-gradient(45deg,#ff2246,#ff3b8e);
  z-index: 2;
  outline: none;

  .name {
    color: #fff;
    padding: 0 5px;
  }

  .caret {
    display: inline-block;
    font-style: normal;
    color: #FFF;
    transform: rotate(90deg);
    transition: all .2s;
    user-select: none;
  }

  .dropdown {
    position: absolute;
    top: 50px;
    left: 0;
    list-style: none;
    text-align: left;
    background: #3E3F45;
    color: #FFF;
    z-index: 100;
    border-bottom: 2px solid #26B23B;
    max-height: 34px * 10;

    &:before {
      position: absolute;
      top: -16px;
      left: 50px;
      content: ' ';
      display: inline-block;
      width: 0;
      height: 0;
      border: 9px solid #ff2246;
      border-color: #ff2246 transparent transparent;
    }
  }
}

.dropdown {
  .drop-item {
    width: 144px;
    height: 34px;
    line-height: 34px;
    box-sizing: border-box;
    display: inline-block;
    margin: 0 10px;
    text-align: center;
    border-bottom: 1px dashed #385B43;

    &:hover,&.on {
      color: #26B23B;
    }
  }
}

.isDown {
  transform: rotate(-90deg) !important;
}
</style>