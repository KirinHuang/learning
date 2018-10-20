<template lang="html">
    <div class="contract">
        <div class="record-tips">{{ tip }}</div>
        <div class="content-in">
            <el-card class="box-card info">
              <div class="text item">
                  <el-row class="my-salary-row">
                      <el-col :span="6"><div class="grid-content bg-purple">{{ subName }}</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple-light">{{ teamCount }}</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">{{ subSalaryData.point }} %</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple-light">{{ subSalaryData.bounsValue }}</div></el-col>
                  </el-row>
                  <el-row class="my-salary-row gray-back">
                      <el-col :span="6"><div class="grid-content bg-purple">用户名称</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple-light">团队人数</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">返点</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple-light">最高奖金</div></el-col>
                  </el-row>
              </div>
            </el-card>
            <el-card class="box-card available-salary" v-loading="loading">
              <div slot="header" class="clearfix">
                <p class="title">签订 {{ subName }} 的契约日工资</p>
                <p class="title small"><small>（设置的比例为日工资最高比例）</small></p>
              </div>

              <div class="contracts">
                <h2>未签订的彩种契约</h2>
                <el-form
                  :status-icon="true"
                  name="setSalary"
                  :inline-message="false"
                  :model="ruleForm_setSalary"
                  ref="ruleForm_setSalary">
                  <div class="text item gray-back">
                      <el-row>
                          <div class="salary-list" v-if="salaryType !== '0'">
                              <ul>
                                  <li v-for="items, index in subSalaryData.systemSalary" v-show="!(subSalaryData.systemSalary[index].available === null)">
                                      <label>{{ items.lotteryName }}</label>
                                      <el-form-item>
                                          <el-select
                                          v-model="subSalaryData.systemSalary[index].point"
                                          size="mini"
                                          placeholder="请选择"
                                          :class="'pointSelect' + index"
                                          :disabled="subSalaryData.systemSalary[index].available === null"
                                          >
                                            <el-option
                                              v-for="item in subSalaryData.systemSalary[index].available"
                                              id="contractSelect"
                                              :data-id="item.salaryId"
                                              :key="item.salaryId"
                                              :label="'' + item.point + '%'"
                                              :value="item.salaryId">
                                            </el-option>
                                          </el-select>
                                      </el-form-item>
                                  </li>
                                  <!-- <li v-else>暂无数据</li> -->
                              </ul>
                          </div>
                          <div class="salary-list" v-else>
                              <ul>
                                  <li v-if="subSalaryData.systemSalary.available !== null">
                                      <label>{{ subSalaryData.systemSalary.lotteryName }}</label>
                                      <el-form-item>
                                          <el-select
                                          v-model="defaultPoint"
                                          size="mini"
                                          placeholder="请选择"
                                          :class="'pointSelect'"
                                          :disabled="subSalaryData.systemSalary.available === null"
                                          >
                                            <el-option
                                              v-for="item in subSalaryData.systemSalary.available"
                                              id="contractSelect"
                                              :data-id="item.salaryId"
                                              :key="item.salaryId"
                                              :label="'' + item.point + ' %'"
                                              :value="item.salaryId">
                                            </el-option>
                                          </el-select>
                                      </el-form-item>
                                  </li>
                              </ul>
                          </div>
                      </el-row>
                  </div>
                  <p class="bottom-tool">
                      <el-button type="info" @click="submit('ruleForm_setSalary')" :disabled="available">签订契约</el-button>
                  </p>
                </el-form>
              </div>


              <div class="contracts signed">
                <h2>已签订的彩种契约</h2>
                <!--精准-->
                <div v-if="salaryType !== '0'">
                    <div class="signed-salary" v-for="items, index in subSalaryData.systemSalary" v-show="items.subUserSystemSalary !== null">
                        <span class="margin-right text" type="info">
                            {{ items.lotteryName }}
                            {{ items.subUserSystemSalary === null ? '-' : items.subUserSystemSalary.salaryPoint }}%
                        </span>
                    </div>
                </div>
                <!--全局-->
                <div v-else>
                    <div class="signed-salary">
                        <el-tag v-show="subSalaryData.systemSalary.subUserSystemSalary !== null" class="margin-right" type="info">
                            {{ subSalaryData.systemSalary.lotteryName }}
                            {{ subSalaryData.systemSalary.subUserSystemSalary === null ? '-' : subSalaryData.systemSalary.subUserSystemSalary.salaryPoint }}%
                        </el-tag>
                    </div>
                </div>
              </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'contract',
    data() {
        return {
            title: '签订契约',
            tip: '',
            contractType: 'unSign',
            canSet: false,
            subName: this.$route.params.subName,
            teamCount: this.$route.params.teamCount,
            accuratePoint: [],
            globalPoint: '',
            defaultPoint: '',
            ruleForm_setSalary: {
                availablePoint: ''
            },
            pointArr: []
        }
    },
    created() {
        var me = this;
        me.$store.dispatch('fetchSubSalaryConfig', me.$route.params.subId);
    },
    methods: {
        submit(formName) {
            event.preventDefault();
            var me = this;
            var valDomList = document.querySelectorAll('#contractSelect');
            // 遍历取到所有所选择的契约的值(点位对应ID)
            var selecteDomList = document.querySelectorAll('#contractSelect.selected');
            for (var i = 0; i < selecteDomList.length; i++) {
                this.pointArr.push(selecteDomList[i].getAttribute('data-id'))
            }
            if(this.pointArr.length <= 0) {
                return swal('未选择任何契约', '', 'warning')
            }else {
                this.$store.dispatch('setSubSalary', [this.$route.params.subId, this.pointArr]).then(function() {
                    me.$store.dispatch('setSystemSalaryAvailable',false);
                    // 设置完之后再次取值
                    setTimeout(function() {
                        me.$store.dispatch('fetchSubSalaryConfig', me.$route.params.subId);
                    }, 300)
                    me.pointArr = [];
                });
            }
        },
        backToQuery() {
            document.querySelector('.salary-config-wrap').style = 'display: block';
            this.$router.go(-1);
        },
        handleClick_contract(val) {
            this.contractType = val.name
        }
    },
    computed: {
        ...mapGetters({
            loading: 'getLoading',
            subSalaryData: 'getSubSalaryConfigData',
            salaryType: 'getSalaryType',
            version: 'getSalaryVersion',
            available :'getsystemSalary_available'
        })
    }
}
</script>

<style lang="less">
.contract {
  margin: 0 0 16px 16px;
}
.contract .grid-content {
    text-align: center;
    color: #FFF;
    font-size: 16px;
}
.contract .salary-list li {
    display: inline-block;
}
.contract .gray-back .grid-content{
  font-size: 12px !important;
  color: #076030 !important;
}
.contract .available-salary {
    margin-top: 15px;
}
.contract .available-salary .el-card__body {
    padding-top: 0;
}
.contract .box-card h2 {
    text-align: center;
    margin-top: 0;
}
.content-in .salary-list .el-input {
    width: 120px;
}
.contract .signed-salary {
    display: inline-block;
    margin-bottom: 12px;
    margin-right: 15px;
    width: 134px;
}
.signed-salary .text {
  font-size: 12px;
  color: #7F7F7F;
}
.separate-salary .el-tag {
    margin-right: 10px;
    min-width: 140px;
    text-align: center;
}
.unsign-wrap {
    max-height: 345px;
    overflow-y: auto;
}

.contract {
  .el-card {
    border: none;
    box-shadow: none; 
  }

  .el-card__header {
    border: none;
  }
}

.box-card.info {
  height: 100px;
  width: 850px;
  margin: 0 auto;
  background: url(./assets/img/ticket.png) no-repeat;

  .el-card__body {
    padding: 30px 20px;
  }
}

.available-salary {
  .el-card__header {
    text-align: center;
  }

  .title {
    margin: 0;
  }

  .title.small {
    color: #666;
  }
}

.contracts {
  background: #F7F7F7;
  padding: 0 0px 30px;

  &.signed {
    padding: 0 60px;
  }

  h2 {
    color: #636363;
    font-size: 16px;
    padding-top: 20px;
  }
}

.bottom-tool {
  text-align: center;
}

.el-button--info {
  padding: 7px 20px;
  color: #fff;
  background-color: #e43030;
  border-color: transparent;
}
.el-button--info:focus, .el-button--info:hover {
  border-color: transparent;
  background-color: lighten(rgb(228, 48, 48), 20%);
}
</style>
