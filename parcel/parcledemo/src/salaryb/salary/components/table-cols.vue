<template>
  <div class="table-cols">
    <el-row>
      <el-col :span="8">
        <MTable>
          <template slot="header">
            <tr>
              <th>比例</th>
              <th>团队流水</th>
              <th>团队有效投注人数</th>
            </tr>
          </template>
          <template slot="body" v-show="colOne">
            <tr v-for="(item, index) in colOne" :key="index" :class="{'border-right': colOne && !colTwo.length}">
              <td>{{item.point}}%</td>
              <td>{{item.minBetAmount}}</td>
              <td>{{item.minUserCount}}</td>
            </tr>
          </template>
        </MTable>
      </el-col>
      <el-col :span="8">
        <MTable>
          <template slot="header">
            <tr>
              <th>比例</th>
              <th>团队流水</th>
              <th>团队有效投注人数</th>
            </tr>
          </template>
          <template slot="body" v-show="colTwo">
            <tr v-for="(item, index) in colTwo" :key="index" :class="{'border-right': colTwo && !colThree.length}">
              <td>{{item.point}}%</td>
              <td>{{item.minBetAmount}}</td>
              <td>{{item.minUserCount}}</td>
            </tr>
          </template>
        </MTable>
      </el-col>
      <el-col :span="8">
        <MTable>
          <template slot="header">
            <tr>
              <th>比例</th>
              <th>团队流水</th>
              <th>团队有效投注人数</th>
            </tr>
          </template>
          <template slot="body" v-show="colThree">
            <tr v-for="(item, index) in colThree" :key="index">
              <td>{{item.point}}%</td>
              <td>{{item.minBetAmount}}</td>
              <td>{{item.minUserCount}}</td>
            </tr>
          </template>
        </MTable>
      </el-col>
    </el-row>

    <el-pagination
      layout="prev, pager, next"
      @current-change="changeIndex"
      :page-size="cols*colRowSize"
      :total="data.length">
    </el-pagination>
  </div>
</template>

<script>
import MTable from './table-fixed.vue'

export default {
  name: 'table-cols',

  data () {
    return {
      cols: 3,
      colRowSize: 6,
      startIndex: 0
    }
  },

  props: {
    data: {
      required: true
    },

    showPagination: {
      type:Boolean
    }
  },

  computed: {
    colOne () {
      return this.data.slice(this.startIndex, this.startIndex + this.colRowSize)
    },

    colTwo () {
      let startIndex = this.startIndex + this.colRowSize*1
      let endIndex = this.startIndex + this.colRowSize*2
      return this.data.slice(startIndex, endIndex)
    },

    colThree () {
      let startIndex = this.startIndex + this.colRowSize*2
      let endIndex = this.startIndex + this.colRowSize*3
      return this.data.slice(startIndex, endIndex)
    },

    totalPage () {
      return Math.ceil(this.data.length/(this.cols * this.colRowSize))
    }
  },

  methods: {
    changeIndex (index) {
      this.startIndex = this.cols * this.colRowSize * (index - 1)
    }
  },

  components: {
    MTable
  }
}
</script>

<style lang="less">
.table-cols .el-pagination {
  background: #FFF;
}

.table-body {
  table {
    border-right: 0 !important;
  }

  .border-right {
    border-right: 1px solid #F1F1F1;
  }
}
</style>
