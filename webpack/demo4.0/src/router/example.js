export default [
  {
    path: '/',
    name: 'home',
    component: () => import('../example/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../example/About.vue')
  },
  {
    path: '/ctx/about',
    name: 'about2',
    component: () => import('../example/About.vue')
  },
  {
    path: '/parent',
    name: 'parent',
    component: () => import('../example/parent.vue'),
    children: [
      {
        path: 'son',
        name: 'son',
        component: () => import('../example/son.vue')
      }
    ]
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../example/NotFound.vue')
  }
]