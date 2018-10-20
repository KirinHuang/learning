<template lang="html">
    <div class="salary-info" id="salaryInfo">
        <LotterySelect :data="onlineLotterys"
          :salaryType="salaryType"
          @change="handleSelect"
        ></LotterySelect>

        <el-card class="box-card my-salary">
          <div slot="header" class="clearfix">
            <span class="box-title">我的日工资</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <div class="text item">
              <el-row class="my-salary-row">
                  <el-col :span="5"><div class="grid-content bg-purple">
                    <i class="icon2 icon-bind-name"></i>用户名</div>
                  </el-col>
                  <el-col :span="5"><div class="grid-content bg-purple-light">
                    <i class="icon2 icon-yuan"></i>最高日工资</div>
                  </el-col>
                  <el-col :span="5"><div class="grid-content bg-purple">
                    <i class="icon2 icon-team"></i>团队人数</div>
                  </el-col>
                  <el-col :span="5"><div class="grid-content bg-purple-light">
                    <i class="icon2 icon-time"></i>契约创建时间</div>
                  </el-col>
                  <el-col :span="4"><div class="grid-content bg-purple">
                    <i class="icon2 icon-set"></i>操作</div>
                  </el-col>
              </el-row>
              <el-row class="my-salary-row">
                  <el-col :span="5">
                    <div class="grid-content bg-purple">{{ userBalance.userName }}</div>
                  </el-col>
                  <el-col :span="5">
                    <div class="grid-content bg-purple-light">{{ typeof salaryInfo !== 'undefined' && salaryInfo.point ? salaryInfo.point : '-' }} %</div>
                  </el-col>
                  <el-col :span="5">
                    <div class="grid-content bg-purple">{{ typeof salaryInfo !== 'undefined' && salaryInfo.teamCount ? salaryInfo.teamCount : '-' }}</div>
                  </el-col>
                  <el-col :span="5">
                    <div class="grid-content bg-purple-light">{{ typeof salaryInfo !== 'undefined' && salaryInfo.createTime ? salaryInfo.createTime : '-' }}</div>
                  </el-col>
                  <el-col :span="4">
                    <div class="grid-content bg-purple">
                      <a href="javascript:;" @click="showSalaryRecord(salaryInfo.userName)" v-show="typeof salaryInfo !== 'undefined'">查看发放记录</a>
                    </div>
                  </el-col>
              </el-row>
              <div class="my-salary-bottom">
                  <ul>
                      <li><label>保底日工资比例：</label>{{ typeof salaryInfo !== 'undefined' ? salaryInfo.point : '-' }}%</li>
                      <li><label>保底日工资期限：</label>{{ typeof salaryInfo !== 'undefined' ? salaryInfo.mgStart : '-' }} ~ {{ typeof salaryInfo !== 'undefined' ? salaryInfo.mgEnd : '-' }}</li>
                      <!-- <li><label>状态：</label>{{ salaryInfo.mgStatus === 1 ? '打开' : '关闭' }}</li> -->
                      <li><label>状态：</label>{{ typeof salaryInfo !== 'undefined' ? (salaryInfo.mgStatus === 1 ? '打开' : '关闭') : '-' }}</li>
                  </ul>
              </div>
          </div>
        </el-card>

        <el-card class="box-card salary-details" v-loading="loading">
          <div slot="header" class="clearfix">
            <span class="box-title">日工资比例详情</span>
          </div>
          <!-- <div class="text item">
              <el-row :gutter="20">
                  <el-col :span="24">
                      <div class="grid-content bg-purple">
                          <el-table
                            :data="currLotterySalaryConfig"
                            style="width: 100%"
                            height="423"
                            empty-text="暂无数据"
                            >
                            <el-table-column
                              prop="point"
                              label="比例"
                              >
                            </el-table-column>
                            <el-table-column
                              prop="minBetAmount"
                              label="团队流水"
                              >
                            </el-table-column>
                            <el-table-column
                              prop="minUserCount"
                              label="团队有效投注人数">
                            </el-table-column>
                          </el-table>
                      </div>
                  </el-col>
              </el-row>
          </div> -->

          <!-- 新table -->
          <div class="text item">
            <CTable :data="currLotterySalaryConfig" showPagination></CTable>
          </div>
        </el-card>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LotterySelect from './components/select.vue'
import CTable from './components/table-cols.vue'

export default {
    name: 'salaryInfo',
    data() {
        return {
            lottery: '',
            pageSize: 6
        }
    },
    methods: {
        selectLottery() {
            this.$store.dispatch('fetchSalaryData', this.lottery);
            this.$store.dispatch('fetchCurrLotterySalaryConfig', this.lottery);
        },
        handleSelect (id, name) {
          this.lottery = id
          this.lotteryName = name

          this.selectLottery()
        },
        showSalaryRecord(name) {
            var me = this;
            me.$store.dispatch('setSalaryTabName', 'salaryRecord');
            me.$store.dispatch('setSalaryUserName', name).then(function() {
                //填充 username input
                document.querySelector('.salary-config-wrap input[name=username]').value = name;
                me.$router.push({
                    path: '/my/salaryRecord'
                });
            });
        }
    },
    mounted() {
        this.$store.dispatch('setSalaryTabName', 'salaryInfo');
        var me = this;
        setTimeout(function() {
            me.lottery === '' ? me.lottery = me.value : !0;
        }, 500)
        this.$store.dispatch('fetchSalaryVersion').then(function() {
            // me.$store.dispatch('fetchSalaryData', me.salaryType);
            // me.$store.dispatch('fetchCurrLotterySalaryConfig', me.salaryType);
        });
    },
    computed: {
        ...mapGetters({
            loading: 'getLoading',
            onlineLotterys: 'getOnlineLotteryData',
            salaryInfo: 'getMySalaryInfo',
            salaryType: 'getSalaryType',
            userBalance: 'getUserBalance',
            currLotterySalaryConfig: 'getCurrLotterySalaryConfig'
        }),
        value: function() {
            return this.onlineLotterys && this.onlineLotterys[0] && this.onlineLotterys[0].id;
        }
    },

    watch: {
        value (v, ov) {
            if (v != '') {
                this.$store.dispatch('fetchSalaryData', v);
                this.$store.dispatch('fetchCurrLotterySalaryConfig', v);
            }
        }
    },

    components: {
      LotterySelect,
      CTable
    }
}
</script>

<style lang="less">
#salaryInfo {
  margin-left: 26px;
}
#salaryInfo .el-card__body {
    padding: 0;
}
#salaryInfo .el-card {
    margin-top: 15px;
}
.el-card .grid-content i {
    vertical-align: middle;
    margin-right: 12px;
}
.my-salary-bottom {
    padding: 10px 48px;
    background: #f2fbf6;
}
.my-salary-bottom li {
    display: inline-block;
    min-width: 316px;
    font-size: 12px;
    color: #333333;
}
.my-salary-bottom li:nth-child(2) {
    text-align: center;
}
.my-salary-bottom li:nth-child(3) {
    text-align: right;
}

.my-salary,
.salary-details {
  border: 0px solid #e6ebf5;
  background-color: #fff;
  box-shadow: none;
  color: #333;

  [class*=el-col-] {
    padding: 10px;
    text-align: center;
  }

  .el-card__header {
    border-bottom: none;
    font-size: 14px;
    padding: 10px 10px 10px 0;

    .box-title:before {
      position: relative;
      content: '';
      width: 6px;
      height: 7px;
      border-radius: 50%;
      display: inline-block;
      background-color:#05b955;
      margin-right: 5px;
    }
  }
  
  .el-card__body {
  }

  .el-row:first-child {
    .el-col {
      border-right: none;
      border-bottom: none;
    }

    .el-col:last-child {
      border-right: 1px solid #f1f1f1;
      border-bottom: none;
    }
  }

  .el-row:last-child {
    .el-col {
      border-right: none;
    }

    .el-col:last-child {
      border-right: 1px solid #f1f1f1;
    }
  }
}

.salary-details {
  .el-col {
    padding: 0px;
  }
}

.icon2 {
  display: inline-block;
  width: 28px;
  height: 22px;
  background-image: url(./assets/img/info-icos.png);

  &.icon-bind-name {}

  &.icon-yuan {
    background-position-y: -22px;
  }

  &.icon-team {
    background-position-y: -22px*2;
  }
  &.icon-time {
    background-position-y: -22px*3 - 1px;
  }
  &.icon-set {
    background-position-y: -22px*4 - 4px;
    height: 23px;
  }
}

.el-table thead tr {
  background: #f2fbf6;
}

.el-table td, .el-table th {
  padding: 6px 0;
}
</style>
