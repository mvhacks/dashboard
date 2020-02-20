import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
  },
  {
    path: '/points',
    name: 'points',
    component: () => import('../views/Points.vue')
  },
  {
    path: '/more',
    name: 'more',
    component: () => import('../views/More.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
