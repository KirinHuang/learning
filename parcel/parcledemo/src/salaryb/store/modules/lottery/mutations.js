import {
    ONLINE_LOTTERY_DATA
} from './mutation-types'

const mutations = {
    //online lottery data
    [ONLINE_LOTTERY_DATA] (state, data) {
        state.onlineLotteryData = data;
    }
}

export default mutations
