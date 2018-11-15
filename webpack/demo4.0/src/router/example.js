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
  }
]