/**
 * VUE-ROUTER
 */
import Vue from 'vue'
import axios from 'axios'

export default [{
	path: '/',
	component: () => import ('./salary/index.vue'),
	name: 'entry',
	redirect: {
        name: 'salaryInfo'
    }
}, {
		path: '/my/salaryInfo',
		name: 'salaryInfo',
		component: () => import ('./salary/salaryInfo.vue'),
	},
	{
		path: '/my/salaryConfig',
		name: 'salaryConfig',
		component: () => import ('./salary/salaryConfig.vue'),
	},
	{
		path: '/my/salaryRecord',
		name: 'salaryRecord',
		component: () => import ('./salary/salaryRecord.vue'),
	},
	{
		path: '/my/contract/:subName/:subId/:teamCount',
		name: 'contract',
		component: () => import ('./salary/contract.vue'),
}]
