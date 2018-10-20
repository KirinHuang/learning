<template lang="html">
    <div class="salary-config" id="salaryConfig">
        <el-table
          v-loading="loading"
          :data="teamSalaris"
          style="width: 100%"
          empty-text="暂无数据"
          >
          <el-table-column
            prop="userName"
            label="用户名"
            >
          </el-table-column>
          <el-table-column
            :formatter="userTypeFormatter"
            prop="userType"
            label="用户类型"
            >
          </el-table-column>
          <el-table-column
            prop="teamCount"
            label="团队人数">
          </el-table-column>
          <el-table-column
            width="120"
            prop="lotteryName"
            label="	彩种"
            >
          </el-table-column>
          <el-table-column
            :formatter="pointFormatter"
            prop="salaryPoint"
            label="最高日工资比例"
            width="230"
            >
            <template slot-scope="scope">
              <span v-if="scope.row.salaryPoint !== null">
                <div>{{scope.row.salaryPoint}}%</div>
                <span class="color-gray">(团队流水: {{scope.row.minBetAmount}}, 有效投注人数{{scope.row.minUserCount}})</span>
              </span>
              <span v-else>
                -
              </span>
            </template>
          </el-table-column>
          <el-table-column
            width="160"
            prop="creatTimeStr"
            label="契约创建时间"
            >
          </el-table-column>
          <el-table-column
            :formatter="salaryStatusFormatter"
            prop="status"
            label="状态"
            >
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="200">
              <template slot-scope="scope">
                  <a v-if="salaryStatusFormatter(scope.row) === '已签订'" href="javascript:;" class="" @click="showRecord(scope.row.userName)"><i slot="reference" class="el-icon-tickets"></i>查看发放记录</a>
                  <a v-else href="javascript:;" class="" @click="makeIt(scope.row)"><i slot="reference" class="el-icon-edit"></i>签订契约</a>
              </template>
            </el-table-column>
        </el-table>
        <el-pagination
              v-show="typeof teamSalaris == 'undefined' || teamSalaris == '' ? false : true"
              id="my-pagination-user"
              @current-change="pageHandler"
              :current-page="currPage"
              :page-size="pageSize"
              layout="total, prev, pager, next"
              :total="totalItem">
        </el-pagination>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'salaryConfig',
    data() {
        return {
            pageNum: 1,
            pageSize: 10
        }
    },
    props: ['lottery', 'userName', 'userType', 'status_config'],
    mounted() {
        this.$store.dispatch('setSalaryTabName', 'salaryConfig');
        this.$store.dispatch('fetchTeamSalaris', [this.salaryUserName, this.userType, this.lottery, this.status_config, this.pageNum, this.pageSize]);
    },
    methods: {
        pageHandler(page) {
            this.pageNum = page;
            this.$store.dispatch('fetchTeamSalaris', [this.salaryUserName, this.userType, this.lottery, this.status_config, this.pageNum, this.pageSize]);
        },
        pointFormatter(row) {
            return row.salaryPoint === null ? '-' : '' + row.salaryPoint + '%'
        },
        salaryStatusFormatter(row) {
            var obj =  {
                0: '未签订',
                1: '已签订',
                null: '未签订'
            }
            return obj[row.status];
        },
        userTypeFormatter(row) {
            var obj =  {
                0: '会员',
                1: '普通代理',
                2: '总代',
                3: '？？？'
            }
            return obj[row.userType];
        },
        showRecord(name) {
            var me = this;
            me.$store.dispatch('setSalaryTabName', 'salaryRecord');
            me.$store.dispatch('setSalaryUserName', name).then(function() {
                //填充 username input
                document.querySelector('.salary-config-wrap input[name=username]').value = name;
                me.$router.push({
                    path: '/my/salaryRecord'
                });
            });
        },
        makeIt(row) {
            document.querySelector('.salary-config-wrap').style = 'display: none';
            this.$router.push({
                path: '/my/contract/' + row.userName + '/' + row.userId + '/' + row.teamCount + '',
                props: {
                    subName: row.userName,
                    subId: row.userId,
                    teamCount: row.teamCount
                }
            });
        }
    },
    computed: {
        ...mapGetters({
            loading: 'getLoading',
            teamSalaris: 'getTeamSalarisConfig',
            currPage: 'getCurrPage',
            salaryUserName: 'getSalaryQueryUserName',
            totalItem: 'getTotalItem'
        })
    }
}
</script>

<style lang="less">
.salary-config-wrap {
  margin: 0 0 16px 16px;
}
.salary-config-wrap li {
    display: inline-block;
    margin-right: 10px;
    line-height: 40px;
}
.salary-config-wrap li label {
    margin-right: 5px;
}
.salary-config-wrap li .el-input {
    width: 138px;
}

.color-gray {
  color: #A8A8A8;
  font-size: 12px;
}

.el-table td, .el-table th.is-leaf {
  border-bottom: 1px dashed #e6ebf5;
}

.el-pager li {
  color: #9A9A9A;
  border-radius: 5px;
  border: 1px solid #9A9A9A;
  margin-right: 5px;

  &.active {
    color: #FFF;
    background: #24B238;
    border: 1px solid #78CF85;
  }

  
}

.el-pager li.active+li {
  border-left: 1px solid !important;
}
</style>
