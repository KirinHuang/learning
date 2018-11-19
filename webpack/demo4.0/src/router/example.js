export default [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "pages" */ '../example/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "pages" */ '../example/About.vue')
  },
  {
    path: '/ctx/about',
    name: 'about2',
    component: () => import(/* webpackChunkName: "pages" */ '../example/About.vue')
  },
  {
    path: '/parent',
    name: 'parent',
    component: () => import(/* webpackChunkName: "pages" */ '../example/parent.vue'),
    children: [
      {
        path: 'son',
        name: 'son',
        component: () => import(/* webpackChunkName: "pages" */ '../example/son.vue')
      }
    ]
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "pages" */ '../example/NotFound.vue')
  }
]