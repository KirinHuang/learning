/**
 * Created by sawyer on 2017年2月20日 21:18:55.
 */
 import * as actions from './actions'
 import * as getters from './getters'
 import mutations from './mutations'

const state = {
    isProcess: false,
    totalItem: 0,
    currPage: 1,
    today: '',
    startDate: '',
    endDate: '',
    isSelectShow: false,
    isSnackbarShow: false,
    isSubnameInputShow: false,
    isDataSearchSelectShow: false,
    notice: [],
    subName: '',
    groupByVal: '',
    rebate: '',
    userPoint: '',
    mySalaryInfo: [],
    currLotterySalaryConfig: [],
    teamSalaris: [],
    salaryRecord: [],
    subSalaryConfig: [],
    salaryUserName: '',
    salaryTabName: 'salaryInfo', // 默认选中项为salaryInfo标签页
    salaryVersion: 0,
    subSetStatus: {},
    userBalance: [],
    systemSalary_available: false,
    loading: false,
    salaryInvolve: 0
}

export default{
  state,
  actions,
  getters,
  mutations
}
