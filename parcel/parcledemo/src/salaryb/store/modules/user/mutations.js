import {
    IS_IN_PROCESS,
    GET_TOTAL_ITEM,
    GET_CURR_PAGE,
    GET_TODAY_DATE,
    CHANGE_SEARCH_SELECT_STATUS,
    CHANGE_SNACKBAR_STATUS,
    CHANGE_SUBNAME_INPUT_STATUS,
    CHANGE_DATA_SEARCH_SELECT_STATUS,
    GET_NOTICE_LIST,
    SET_SEARCH_START_DATE,
    SET_SEARCH_END_DATE,
    GET_SUB_NAME,
    GET_SELECTED_DATALIST,
    GET_SUB_REBATE,
    GET_USER_POINT,
    MY_SALARY_INFO,
    CURR_LOTTERY_SALARY_CONFIG,
    TEAM_SALARIS_DATA,
    SALARY_RECORD_DATA,
    SUB_SALARY_CONFIG,
    SALARY_USER_NAME,
    SALARY_TAB_NAME,
    SALARY_VERSION,
    USER_BALANCE,
    SUB_SET_STATUS,
    START_LOADING,
    FINISH_LOADING,
    SALARY_AVAILABLE,
    SALARY_INVOLVE
} from './mutation-types'

const mutations = {
    [START_LOADING](state) {
        state.loading = true
    },
    [FINISH_LOADING](state) {
        state.loading = false
    },
    // 是否在数据提交进程中
    [IS_IN_PROCESS](state, data) {
        state.isProcess = data
    },
    // 获取分页数据-总条数
    [GET_TOTAL_ITEM](state, data) {
        state.totalItem = data
    },
    // 获取分页数据-当前页
    [GET_CURR_PAGE](state, data) {
        state.currPage = data
    },
    // 获取分页数据-当前页
    [GET_TODAY_DATE](state, data) {
        state.today = data.start
        state.todayEnd = data.end
    },
    // 改变查询条件-平台选择下拉框的显示与否
    [CHANGE_SEARCH_SELECT_STATUS](state, isShow) {
        state.isSelectShow = isShow
    },
    // 改变查询下级用户名输入框的显示与否
    [CHANGE_SUBNAME_INPUT_STATUS](state, isShow) {
        state.isSubnameInputShow = isShow
    },
    // 改变总数据、按日、按月查询条件的显示与否
    [CHANGE_DATA_SEARCH_SELECT_STATUS](state, isShow) {
        state.isDataSearchSelectShow = isShow
    },
    // 改变查询成功提示条的显示与否
    [CHANGE_SNACKBAR_STATUS](state, isShow) {
        state.isSnackbarShow = isShow
    },
    // 获取公告列表
    [GET_NOTICE_LIST](state, data) {
        state.notice = data
    },
    // 获取开始日期
    [SET_SEARCH_START_DATE](state, data) {
        state.startDate = data
    },
    // 获取结束日期
    [SET_SEARCH_END_DATE](state, data) {
        state.endDate = data
    },
    // 获取查询时输入的下级名称
    [GET_SUB_NAME](state, data) {
        state.subName = data
    },
    // 获取查询时选择的数据类型
    [GET_SELECTED_DATALIST](state, data) {
        state.groupByVal = data
    },
    // 获取下级奖金组数据
    [GET_SUB_REBATE](state, data) {
        state.rebate = data
    },
    // 获取当前用户返点值（最高返点）
    [GET_USER_POINT](state, data) {
        state.userPoint = data
    },
    // 获取当前用户日工资配置
    [MY_SALARY_INFO](state, data) {
        state.mySalaryInfo = data[0]
    },
    // 获取指定彩种日工资配置
    [CURR_LOTTERY_SALARY_CONFIG](state, data) {
        state.currLotterySalaryConfig = data
    },
    // 获取指定彩种日工资配置
    [TEAM_SALARIS_DATA](state, data) {
        state.teamSalaris = data
    },
    // 获取指定彩种日工资配置
    [SALARY_RECORD_DATA](state, data) {
        state.salaryRecord = data
    },
    // 获取指定下级用户日工资配置
    [SUB_SALARY_CONFIG](state, data) {
        state.subSalaryConfig = data
        if(typeof state.subSalaryConfig.systemSalary.length !== 'undefined') {
            for (var i = 0; i < state.subSalaryConfig.systemSalary.length; i++) {
                if ((state.subSalaryConfig.systemSalary[i].available == null ? true : false) === true) {
                    state.systemSalary_available = true
                }else{
                    return state.systemSalary_available = false
                }
            }
        }else {
            if(state.subSalaryConfig.systemSalary.available !== null) {
                return state.systemSalary_available = false
            }else {
                return state.systemSalary_available = true
            }
        }
    },
    //契约
    [SALARY_AVAILABLE](state, data) {
        state.systemSalary_available = data
    },
    // 获取查询日工资的时候所填的用户名
    [SALARY_USER_NAME](state, data) {
        state.salaryUserName = data
    },
    // 获取查询日工资的时候所填的用户名
    [SALARY_TAB_NAME](state, data) {
        state.salaryTabName = data
    },
    // 获取系统配置 日工资版本
    [SALARY_VERSION](state, data) {
        state.salaryVersion = data
    },
    // 获取下级各种设置状态
    [SUB_SET_STATUS](state, data) {
        state.subSetStatus = data
    },
    // 获取用户余额
    [USER_BALANCE](state, data) {
        state.userBalance = data
    },
    // 获取日工资类型（全局还是精准）
    [SALARY_INVOLVE](state, data) {
        state.salaryInvolve = data
    }
}
export default mutations
