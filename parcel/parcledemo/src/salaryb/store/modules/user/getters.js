export const getUserBalance = state => state.userBalance
export const getIsInProcessOrNot = state => state.isProcess // 是否在提交数据进程中
export const getTotalItem = state => state.totalItem // 获取分页数据-总条数
export const getCurrPage = state => state.currPage // 获取分页数据-当前页
export const getTodayDate = state => state.today // 获取今天日期
export const selectShowOrHide = state => state.isSelectShow // 获取平台筛选下拉框的状态
export const snackbarShowOrHide = state => state.isSnackbarShow // 获取snackbar的状态
export const subNameInputShowOrHide = state => state.isSubnameInputShow // 获取snackbar的状态
export const dataSearchSelectShowOrHide = state => state.isDataSearchSelectShow // 获取snackbar的状态
export const getNoticeList = state => state.notice // 获取公告列表
export const getStartDate = state => state.startDate // 获取起始日期
export const getEndDate = state => state.endDate // 获取结束日期
export const getSubName = state => state.subName // 获取下级名称
export const getDataSelectVal = state => state.groupByVal // 获取
export const getSubRebateData = state => state.rebate // 获取sub user rebate
export const getUserPointData = state => state.userPoint // 获取user point
export const getMySalaryInfo = state => state.mySalaryInfo // 获取当前用户新版日工资信息
export const getCurrLotterySalaryConfig = state => state.currLotterySalaryConfig // 获取指定彩种日工资配置
export const getTeamSalarisConfig = state => state.teamSalaris // 获取下级日工资配置
export const getSalaryRecord = state => state.salaryRecord // 获取指定彩种日工资配置
export const getSubSalaryConfigData = state => state.subSalaryConfig // 获取指定下级用户日工资配置
export const getSalaryQueryUserName = state => state.salaryUserName // 获取查询日工资的时候所填的用户名
export const getSalaryTabName = state => state.salaryTabName // 获取查询日工资的时候所填的用户名
export const getSalaryVersion = state => state.salaryVersion // 获取日工资版本
export const getSubSetStatus = state => state.subSetStatus // 获取下级各种设置状态
export const getLoading = state => state.loading
export const getsystemSalary_available = state => state.systemSalary_available //签订契约状态
export const getSalaryType = state => state.salaryInvolve //全局还是精准
