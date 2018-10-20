<template>
    <div class="set-salary a3-padding">
        <div class="set-salary-left">
            <ul>
                <li v-for="(item, idx) in leftMenu" :key="idx"
                  class="side-menu" :class="{on: item.icon === 'salary'}" @click="handle2Url(item.url)">
                    <i :class="['icon', item.icon]"></i>
                    <div class="text">{{item.name}}</div>
                </li>
            </ul>
        </div>

        <div class="set-salary-right">
            <!-- <el-tabs v-model="activeName" @tab-click="handleClick" class="my-tabs">
                <el-tab-pane label="日工资信息" name="salaryInfo"></el-tab-pane>
                <el-tab-pane label="团队工资配置" name="salaryConfig"></el-tab-pane>
                <el-tab-pane label="日工资发放记录" name="salaryRecord"></el-tab-pane>
            </el-tabs> -->
            <ul class="tabar" v-if="activeName !== 'contract'">
                <li class="tab-item" :class="{on: activeName === 'salaryInfo'}" @click="handleClick('salaryInfo')">
                    <span class="text">日工资信息</span>
                </li>
                <li class="tab-item" :class="{on: activeName === 'salaryConfig'}" @click="handleClick('salaryConfig')">
                    <span class="text">团队工资配置</span>
                </li>
                <li class="tab-item" :class="{on: activeName === 'salaryRecord'}" @click="handleClick('salaryRecord')">
                    <span class="text">日工资发放记录</span>
                </li>
            </ul>
            <div class="nav-back" v-else>
              <span class="nav-left" @click="handleClick('salaryConfig')">
                <span class="title">日工资配置</span>
              </span>
              <span class="nav-right">
                <span class="title">签订契约</span>
              </span>
            </div>

            <div class="salary-config-wrap">
                <ul>
                    <li v-show="activeName === 'salaryConfig' || activeName === 'salaryRecord'" class="user-name">
                        <label>用户名</label>
                        <el-input v-model="inputName" name="username" placeholder="用户名" @change="changeUserName" clearable></el-input>
                    </li>
                    <li v-show="activeName === 'salaryConfig'">
                        <label>用户类型</label>
                        <el-select v-model="userTypeValue" placeholder="用户类型" clearable>
                            <el-option
                                v-for="item in userType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li v-show="activeName === 'salaryRecord'" class="date-picker">
                        <label>发放日期</label>
                        <el-date-picker
                            v-model="pickedDate"
                            type="daterange"
                            align="left"
                            unlink-panels
                            :clearable="false"
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            :start-placeholder="defaultDate"
                            :end-placeholder="defaultDate"
                            :picker-options="pickerOptions"
                            @change="pickDate">
                        </el-date-picker>
                    </li>
                    <li v-show="activeName === 'salaryConfig' || activeName === 'salaryRecord'">
                        <label>彩种</label>
                        <el-select v-model="lottery" placeholder="彩种选择" clearable>
                            <el-option
                                v-for="item in onlineLotterys"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </li>
                    <li v-show="activeName === 'salaryConfig'">
                        <label>状态</label>
                        <el-select v-model="status_config" placeholder="请选择" clearable>
                            <el-option
                                v-for="item in status_config_options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li v-show="activeName === 'salaryRecord'">
                        <label>状态</label>
                        <el-select v-model="status_record" placeholder="请选择" clearable>
                            <el-option
                                v-for="item in status_record_options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li v-show="activeName === 'salaryConfig' || activeName === 'salaryRecord'">
                        <el-button class="search-btn" @click="search">查询</el-button>
                    </li>
                </ul>
            </div>
            <transition name="slide-fade" mode="out-in">
                <router-view
                :activeName="activeName"
                :lottery="lottery"
                :userName="userName"
                :userType="userTypeValue"
                :start="startDate"
                :end="endDate"
                :status_config="status_config"
                :status_record="status_record"
                ></router-view>
            </transition>
        </div>
    </div>
</template>
<script>
import salaryInfo from './salaryInfo.vue'
import salaryConfig from './salaryConfig.vue'
import salaryRecord from './salaryRecord.vue'
// import contract from './contract.vue'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            // activeName: 'salaryInfo',
            userName: '',
            userTypeValue: '',
            lottery: '', // 默认查全部彩种
            pageNum: 1,
            pageSize: 10,
            start: new Date().Format("yyyy-MM-dd") + ' 00:00:00',
            end: new Date().Format("yyyy-MM-dd") + ' 23:59:59',
            defaultDate: new Date().Format("yyyy-MM-dd"),
            pickedDate: '',
            pickerOptions: {
              shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
                  // 设置store时间
                  $vue.$store.dispatch('setSearchStartDate', start.Format("yyyy-MM-dd") + ' 00:00:00');
                  $vue.$store.dispatch('setSearchEndDate', end.Format("yyyy-MM-dd") + ' 23:59:59');
                }
              }, {
                text: '最近一个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit('pick', [start, end]);
                  // 设置store时间
                  $vue.$store.dispatch('setSearchStartDate', start.Format("yyyy-MM-dd") + ' 00:00:00');
                  $vue.$store.dispatch('setSearchEndDate', end.Format("yyyy-MM-dd") + ' 23:59:59');
                }
              }, {
                text: '最近三个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                  picker.$emit('pick', [start, end]);
                  // 设置store时间
                  $vue.$store.dispatch('setSearchStartDate', start.Format("yyyy-MM-dd") + ' 00:00:00');
                  $vue.$store.dispatch('setSearchEndDate', end.Format("yyyy-MM-dd") + ' 23:59:59');
                }
              }]
            },
            userType: [
                {
                    label: '会员',
                    value: 0
                },
                {
                    label: '普通代理',
                    value: 1
                },
                // {
                //     label: 'sobet代理',
                //     value: 3
                // }
            ],
            status_config: '',
            status_config_options: [
                {
                    label: '全部',
                    value: -1
                },
                {
                    label: '已签订',
                    value: 0
                },
                {
                    label: '未签订',
                    value: 1
                }
            ],
            status_record: '',
            status_record_options: [
                {
                    label: '全部',
                    value: ''
                },
                {
                    label: '已发放',
                    value: 2
                },
                {
                    label: '已关闭',
                    value: 3
                }
            ],
            leftMenu: [
              {
                name: '游戏记录',
                icon: 'game',
                url: '/hz/mkg/orders.html'
              },
              {
                name: '资金明细',
                icon: 'detail',
                url: '/hz/mkg/statement.html#account_view'
              },
              {
                name: '个人报表',
                icon: 'preport',
                url: '/hz/mkg/dayreport.html'
              },
              {
                name: '契约日工资',
                icon: 'salary',
                url: '/hz/mkg/salaryB'
              },
              {
                name: '团队报表',
                icon: 'treport',
                url: '/hz/mkg/teamreport.html'
              },
              {
                name: '团队总览',
                icon: 'team',
                url: '/hz/mkg/general'
              },
            ]
        }
    },
    mounted() {
        this.$store.dispatch('getUserSingleBalance');
        this.$store.dispatch('fetchSalaryLotteryData');
        this.$store.dispatch('setSearchStartDate', this.start);
        this.$store.dispatch('setSearchEndDate', this.end);
        this.$store.dispatch('setSalaryTabName', this.$route.name);
    },
    methods: {
        handleClick(name) {
            var me = this,
                path
            
            if (typeof name === 'string') {
              path = name
            } else {
              path = name.id
            }
            document.querySelector('.salary-config-wrap input[name=username]').value = '';
            this.$store.dispatch('setSalaryUserName', '');
            document.querySelector('.salary-config-wrap').style.display = 'block'
            this.$router.push({
                path: '/my/' + path + ''
            })
        },
        handle2Url (url) {
          top.window.location.href = url
        },
        pickDate() {
            this.start = this.pickedDate[0] + ' 00:00:00';
            this.end = this.pickedDate[1] + ' 23:59:59';

            $vue.$store.dispatch('setSearchStartDate', this.start);
            $vue.$store.dispatch('setSearchEndDate', this.end);
        },
        search() {
            switch (this.activeName) {
                case 'salaryConfig':
                    this.$store.dispatch('fetchTeamSalaris', [this.salaryUserName, this.userTypeValue, this.lottery, this.status_config, this.pageNum, this.pageSize]);
                    break;
                case 'salaryRecord':
                    this.$store.dispatch('fetchSalaryRecord', [this.salaryUserName, this.startDate, this.endDate, this.lottery, this.status_record, this.pageNum, this.pageSize]);
                    break;
            }
        },
        changeUserName(val) {
            this.$store.dispatch('setSalaryUserName', val);
        }
    },
    computed: {
        ...mapGetters({
            onlineLotterys: 'getOnlineLotteryData',
            currPage: 'getCurrPage',
            startDate: 'getStartDate',
            endDate: 'getEndDate',
            salaryUserName: 'getSalaryQueryUserName',
            version: 'getSalaryVersion'
        }),
        value: function() {
            return this.onlineLotterys[0] && this.onlineLotterys[0].id;
        },
        activeName: {
            get: function() {
                return this.$route.name;
            },
            set: function(val) {
                this.$store.dispatch('setSalaryTabName', val);
            }
        },
        inputName: {
            get: function() {
                return this.userName;
            },
            set: function(val) {
                this.userName = val;
                this.$store.dispatch('setSalaryUserName', val);
            }
        }
    },
    components: {
        salaryInfo,
        salaryConfig,
        salaryRecord,
        // contract
    }
}
</script>
<style>
.set-salary {
    width: 1200px;
    min-height: 930px;
    margin: 0 auto;
    background: #fff;
    padding: 0 0px 16px 0;
    padding-bottom: 0;
    box-sizing: border-box;
    border-radius: 0px 0px 10px 10px;
    overflow: hidden;
}
.set-salary-left,
.set-salary-right {
    float: left;
}

.set-salary-left {
    width: 120px;
    min-height: 930px;
    background-color: #45464b;
}
.set-salary-right {
    width: 1080px;
}
.search-btn {
  background-color: #E43031 !important;
  color: #FFF !important;
  border-color: lighten(rgb(228, 48, 49), 20%) !important;
  &:hover {
    color: #FFF !important;
    background-color: lighten(rgb(228, 48, 49), 20%) !important;
  }
}
.side-menu {
    height: 100px;
    cursor: pointer;
    padding: 16px 0;
    box-sizing: border-box;
}
.side-menu.on {
    background-color: #05b955;
}
.icon {
    display: block;
    width: 44px;
    height: 44px;
    margin: 0 auto;
}
.icon.info {
    background: url(./assets/img/icon-1.png) no-repeat;
}
.icon.setting {
    background: url(./assets/img/icon-2.png) no-repeat;
}
.icon.record {
    background: url(./assets/img/icon-3.png) no-repeat;
}
.icon.game {
    background: url(./assets/img/report_ico.png) no-repeat;
}
.icon.detail {
    background: url(./assets/img/report_ico.png) no-repeat;
    background-position-y: -44px;
}
.icon.preport {
    background: url(./assets/img/report_ico.png) no-repeat;
    background-position-y: -44px*2;
}
.icon.salary {
    background: url(./assets/img/report_ico.png) no-repeat;
    background-position-y: -44px*3;
}
.icon.treport {
    background: url(./assets/img/report_ico.png) no-repeat;
    background-position-y: -44px*4;
}
.icon.team {
    background: url(./assets/img/report_ico.png) no-repeat;
    background-position-y: -44px*5;
}
.side-menu .text {
    font-size: 14px;
    color: #FFF;
    margin-top: 10px;
    text-align: center;
}

.my-salary-row {
}
.set-salary .el-pagination {
    text-align: center;
    margin-top: 23px;
}
.set-salary .el-table .cell {
    text-align: center;
}
.set-salary .el-table th>.cell {
    text-align: center;
}
.set-salary .el-table__body-wrapper {
    overflow-x: hidden;
}
.set-salary .record-title {
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: bold;
}
.set-salary .el-form-item {
    display: inline-block;
    margin-bottom: 2px;
}
.set-salary .salary-list li label {
    width: 131px;
    display: inline-block;
    text-align: right;
    font-size: 14px;
}
.set-salary a {
    color: #ff2121;
    font-size: 14px;
}
.my-tabs .el-tabs__item.is-active {
    color: #016262;
}
.my-tabs .el-tabs__item:hover {
    color: #016262;
}
.my-tabs .el-tabs__active-bar {
    background-color: #016869;
}
ul {
    padding: 0;
    margin: 0;
}
.set-salary .date-picker sp.side-menu .textan.el-range-separator {
    padding: 0;
}
.set-salary .date-picker .el-range-editor.el-input__inner {
    width: 275px;
}

// tabs
.tabar {
  height: 50px;
  line-height: 50px;
  margin-bottom: 16px;
  background-color: #ededed;
}

.tab-item {
  width: 128px;
  height: 100%;
  padding: 0 10px;
  display: inline-block;
  cursor: pointer;
  color: #383838;
  text-align: center;
  box-sizing: border-box;

  &:before {
    position: relative;
    top: 3px;
    content: '';
    display: inline-block;
    width: 2px;
    height: 16px;
    background-color: #05b956;
    visibility: hidden;
  }
  

  .text {
    display: inline-block;
    margin-left: 4px;
    font-size: 14px;
  }

  &.on {
    color: #05b956;

    &:before {
      visibility: visible;
    }
  }
}

// nav
.nav-back {
  position: relative;
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  margin-bottom: 16px;
  background-color: #ededed;

  .nav-left {
    display: inline-block;
    width: 128px;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    background: url(./assets/img/back_bg.png) no-repeat;
    background-position: 5px 10px;
    padding-left: 34px;
  }
  .nav-right {
    position: absolute;
    right: 20px;
    height: 50px;
    line-height: 50px;
  }
}

.nav-right {
  .title {
    position: relative;
    height: 48px;
    display: inline-block;
    box-sizing: border-box;
    cursor: pointer;
    color: #05b956;
    padding: 0 10px;
    font-size: 14px;
    border-bottom: 2px solid #05b956;
  }
}

.nav-left {
  .title {
    height: 50px;
    line-height: 50px;
    display: inline-block;
  }
}
</style>
