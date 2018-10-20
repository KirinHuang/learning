import axios from 'axios'
import { axios_get, axios_post, getCookie, setCookie } from '../../modules/axios'

Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
}
// query string 去空
function queryTrim(data) {
    data = data.split('&')
    for (var i = 0; i < data.length; i++) {
        if(data[i].split('=')[1] === '' || typeof data[i].split('=')[1] === null) {
            data.remove(i)
        }
    }
    return data.join('&')
}

export const getLoadingStatus = ({commit}, isLoading) => {
    commit('START_LOADING', isLoading)
}

/**
 *  查账户余额
 */
export const getUserSingleBalance = ({
        commit
}) => {
    const url = 'hz/mkg/api/users/user-monetary-info'
    return axios_get({
		url
	 }, commit)
	.then(function (res) {
			// res = res.data;
			if(typeof res === 'object') {
				let code = res.isSuccess;
	            if (code === 1) {
	                commit('USER_BALANCE', res.data)
	            }
			}else {
				// setCookie('loginSuccess', 'no', 30);
			}
			// setTimeout(function() {
			// 	commit('REFRESH_BUTTON_STATUS', false)
			// }, 1500)
      })
      .catch(function (error) {
        console.log(error);
      });
}

/**
 *  获取IS_IN_PROCESS状态
 */
export const getInProcessState = ({
        commit
    }, isShow) => {
        commit('IS_IN_PROCESS', isShow)
    }

/**
 *  获取UserRebateuser-point
 */
export const getUserRebate = ({
        commit
    }, userId) => {
        const url = 'hz/mkg/api/account/query/getUserRebate/' + userId
        return axios_get({
                url
        }, commit)
        .then((res) => {
            if (res.code === 0) {
                return commit('GET_SUB_REBATE', res.data)
            }
            return swal(res.msg, '', 'error');
        })
    }
/**
 *  获取user-point
 */
export const fetchUserPoint = ({
        commit
    }) => {
        const url = 'hz/mkg/api/users/user-point'
        return axios_get({
                url
        }, commit)
        .then((res) => {
            if (res.isSuccess === 1) {
                return commit('GET_USER_POINT', res.data)
            }
            return swal(res.msg, '', 'error');
        })
    }

/**
 *  获取今日日期，查询用
 */
export const setTodayDate = ({
        commit
    }, data) => {
        Date.prototype.Format = function(fmt) {
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
        var data = {
            start: new Date().Format("yyyy-MM-dd") + ' 00:00:00',
            end: new Date().Format("yyyy-MM-dd") + ' 23:59:59'
        }
        commit('GET_TODAY_DATE', data)
    }

/**
 * 查询模块-获取选择的开始日期
 */
export const setSearchStartDate = ({
        commit
    }, data) => {
        commit('SET_SEARCH_START_DATE', data);
    }
/**
 * 查询模块-获取选择的结束日期
 */
export const setSearchEndDate = ({
        commit
    }, data) => {
        commit('SET_SEARCH_END_DATE', data);
    }
/**
 * 改变select显示与否
 */
export const changeSearchSelectState = ({
        commit
    }, isShow) => {
        commit('CHANGE_SEARCH_SELECT_STATUS', isShow);
    }
/**
 * 改变下级用户input显示与否
 */
export const changeSubNameInputState = ({
        commit
    }, isShow) => {
        commit('CHANGE_SUBNAME_INPUT_STATUS', isShow);
    }
/**
 * 改变总数据、按日、按月查询条件显示与否
 */
export const changeDataSearchSelectState = ({
        commit
    }, isShow) => {
        commit('CHANGE_DATA_SEARCH_SELECT_STATUS', isShow);
    }

/**
 *  查询完毕的提示条 显示与否
 */
export const changeSnackbarState = ({
        commit
    }, isShow) => {
        commit('CHANGE_SNACKBAR_STATUS', isShow);
    }


/**
 *  查询公告信息
 */
export const getNoticeData = ({
    commit
}, pageNum) => {
    const url = 'hz/mkg/adminCommon/getAdminNotice.do'
    const query = `currentPage=${pageNum}`
    return axios_get({
        url,
        query
    }, commit)
    .then((res) => {
        // if (res.code === 200) {
            return commit('GET_NOTICE_LIST', res.items),
            commit('GET_TOTAL_ITEM', res.totalCount)
            commit('GET_CURR_PAGE', res.page.currPage)
        // }
        // return swal(res.msg, '', 'error')
    })
}


/**
 *  subName set方法
 */
export const setSubName = ({
        commit
    }, data) => {
        commit('GET_SUB_NAME', data);
    }

/**
 *  DataSelectVal set方法
 */
export const setDataSelectVal = ({
        commit
    }, data) => {
        commit('GET_SELECTED_DATALIST', data);
    }


/**
 *  获取当前用户日工资配置
 */
export const fetchSalaryData = ({
        commit
    }, lotteryId) => {
        const url = `hz/mkg/api/salary/mySalaryInfo/${lotteryId}`
        return axios_get({url}, commit).then((res) => {
            if (res.code === 0) {
                return commit('MY_SALARY_INFO', res.data.salaryInfos)
            }
            // return swal(res.msg, '', 'error');
            return commit('MY_SALARY_INFO', {})
        })
    }
/**
 *   获取指定彩种日工资配置
 */
export const fetchCurrLotterySalaryConfig = ({
        commit
    }, id) => {
        const url = `hz/mkg/api/salary/systemSalary/${id}`
        return axios_get({url}, commit).then((res) => {
            if (res.code === 0) {
                return commit('CURR_LOTTERY_SALARY_CONFIG', res.data)
                // Notification.success({
                //   title: '',
                //   position: 'bottom-right',
                //   message: '查询成功'
                // })
                // commit('GET_TOTAL_ITEM', res.page.totalItem),
                // commit('GET_CURR_PAGE', res.page.currPage)
            }
            return swal('暂无数据', '', 'error'),
            commit('CURR_LOTTERY_SALARY_CONFIG', [])
        })
    }
/**
 *   获取下级日工资配置
 */
export const fetchTeamSalaris = ({
        commit
    }, [subUserName, userType, lotteryId, status, currPage, pageSize]) => {
        const url = `hz/mkg/api/salary/teamSalaris`
        const query = `subUserName=${subUserName}&userType=${userType}&lotteryId=${lotteryId}&status=${status}&currPage=${currPage}&pageSize=${pageSize}`
        return axios_get({url, query}, commit).then((res) => {
            if (res.code === 0) {
                return commit('TEAM_SALARIS_DATA', res.page.list),
                commit('GET_TOTAL_ITEM', res.page.totalItem),
                commit('GET_CURR_PAGE', res.page.currPage)
            }
            return swal(res.msg, '', 'error');
        })
    }
/**
 *   获取下级日工派发记录
 */
export const fetchSalaryRecord = ({
        commit
    }, [subUserName, start, end, lotteryId, status, currPage, pageSize]) => {
        const url = `hz/mkg/api/salary/salaryRecord`
        const query = `subUserName=${subUserName}&start=${start}&end=${end}&lotteryId=${lotteryId}&status=${status}&currPage=${currPage}&pageSize=${pageSize}`
        return axios_get({url, query}, commit).then((res) => {
            if (res.code === 0) {
                return commit('SALARY_RECORD_DATA', res.page.list),
                commit('GET_TOTAL_ITEM', res.page.totalItem),
                commit('GET_CURR_PAGE', res.page.currPage)
            }else if(res.code === -2) {
				return commit('SALARY_RECORD_DATA', []),
				commit('GET_TOTAL_ITEM', 0),
                commit('GET_CURR_PAGE', 1)
			}
            return swal(res.msg, '', 'error');
        })
    }
/**
 *   获取指定下级用户日工资配置
 */
 export const fetchSubSalaryConfig = ({
         commit
     }, subUserId) => {
         const url = `hz/mkg/api/salary/subUserSalaryInfo/${subUserId}`
         return axios_get({url}, commit).then((res) => {
             if (res.code === 0) {
                 res = res.data
                 return commit('SUB_SALARY_CONFIG', res)
             }else if(res.code === -1) {
                 return swal({
                   title: "温馨提醒",
                   text: "该用户已配置日工资",
                   type: "warning"
                 },
                 function(){
                     $vue.$router.go(-1);
                 });
 			}
             return swal(res.msg, '', 'error');
         })
     }
/**
 *   设置下级日工资配置
 */
export const setSubSalary = ({
        commit
    }, [subUserId, salaryId]) => {
        const url = `hz/mkg/api/salary/setSubUserSalary`
        return axios_post({url}, {
            subUserId: subUserId,
            salaryId: salaryId
        }, commit).then((res) => {
            if (res.code === 0) {
                return swal('设置成功', '', 'success');
            }
            return swal(res.msg, '', 'error');
        })
    }
/**
 *   设置契约日工资页面的TAB-ActiveName
 */
export const setSalaryTabName = ({
        commit
    }, data) => {
        commit('SALARY_TAB_NAME', data);
    }
/**
 *   设置下级日工资配置
 */
export const setSalaryUserName = ({
        commit
    }, data) => {
        commit('SALARY_USER_NAME', data);
    }
/**
 * 设置契约按钮
 */
export const setSystemSalaryAvailable = ({
        commit
    }, data) => {
        commit('SALARY_AVAILABLE', data);
    }
/**
 *   获取日工资版本
 */
export const fetchSalaryVersion = ({
        commit
    }, subUserId) => {
        const url = `hz/mkg/api/salary/version`
        return axios_get({url}, commit).then((res) => {
            if (res.code === 0) {
                return commit('SALARY_VERSION', res.data.version),
				commit('SALARY_INVOLVE', res.data.involve)
            }
            return swal(res.msg, '', 'error');
        })
    }
/**
 *   获取日工资类型
 */
export const fetchSalaryType = ({
        commit
    }, subUserId) => {
        const url = `hz/mkg/api/salary/lotteryInvolve`
        return axios_get({url}, commit).then((res) => {
            if (res.code === 0) {
                return commit('SALARY_INVOLVE', res.data)
            }
            return swal(res.msg, '', 'error');
        })
    }
