<template lang="html">
    <div class="salary-config" id="salaryRecord">
        <el-table
          v-loading="loading"
          :data="salaryRecord"
          style="width: 100%"
          empty-text="暂无数据"
          >
          <el-table-column
            prop="calDateStr"
            label="计算日期"
            >
          </el-table-column>
          <el-table-column
            prop="userName"
            label="用户名"
            >
          </el-table-column>
          <el-table-column
            width="150"
            prop="lotteryName"
            label="彩种"
            >
          </el-table-column>
          <el-table-column
            prop="point"
            label="日工资比例">
          </el-table-column>
          <el-table-column
            prop="teamAmount"
            label="团队流水"
            >
          </el-table-column>
          <el-table-column
            width="145"
            prop="teamUserCount"
            label="团队有效投注人数"
            >
          </el-table-column>
          <el-table-column
            width="160"
            prop="updateTimeStr"
            label="发放时间"
            >
          </el-table-column>
          <el-table-column
            :formatter="bonusFormatter"
            prop="bonus"
            label="日工资发放金额"
            >
          </el-table-column>
          <el-table-column
            prop="statusName"
            label="状态"
            >
          </el-table-column>
        </el-table>
        <el-pagination
              v-show="typeof salaryRecord == 'undefined' || salaryRecord == '' ? false : true"
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
    name: 'salaryRecord',
    data() {
        return {
            pageNum: '1',
            pageSize: 10
        }
    },
    props: ['lottery', 'userName', 'userType', 'status_record', 'start', 'end'],
    mounted() {
        this.$store.dispatch('setSalaryTabName', 'salaryRecord');
        this.$store.dispatch('fetchSalaryRecord', [this.salaryUserName, this.start, this.end, this.lottery, this.status_record, this.pageNum, this.pageSize]);
    },
    methods: {
        pageHandler(page) {
            this.pageNum = page;
            this.$store.dispatch('fetchSalaryRecord', [this.salaryUserName, this.start, this.end, this.lottery, this.status_record, this.pageNum, this.pageSize]);
        },
        bonusFormatter(row) {
            return row.bonus + ' 元'
        }
    },
    computed: {
        ...mapGetters({
            loading: 'getLoading',
            salaryRecord: 'getSalaryRecord',
            currPage: 'getCurrPage',
            salaryUserName: 'getSalaryQueryUserName',
            totalItem: 'getTotalItem'
        })
    }
}
</script>

<style lang="css">
.salary-config-wrap {
  margin: 0 0 16px 16px;
}
.salary-config-wrap li {
    display: inline-block;
    margin-right: 10px;
}
.salary-config-wrap li label {
    margin-right: 5px;
}
</style>
