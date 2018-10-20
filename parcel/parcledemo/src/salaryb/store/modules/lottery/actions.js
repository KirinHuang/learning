import { axios_get, axios_post, getCookie, setCookie } from '../../modules/axios'

/**
 * Fetch online lottery data
 */
export const fetchOnlineLotteryData = ({
    commit
}) => {
    const url = 'hz/mkg/api/lottery/onlineLotterys'
    return axios_get({url}, commit)
    .then((res) => {
        if(res.code  === 1) {
            return commit('ONLINE_LOTTERY_DATA', res.result)
        }
        return swal(res.msg, '', 'error')
    })
}


export const fetchSalaryLotteryData = ({commit}) => {
    const url = 'hz/mkg/api/salary/salaryLottery'

    return axios_get({ url }, commit)
        .then((res) => {
            if (res.code === 0) {
                return commit('ONLINE_LOTTERY_DATA', res.data)
            }
            return swal(res.msg, '', 'error')
        })
}