import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/Shop.vue')
  },
  {
    path: '/courses',
    name: 'courses',
    component: () => import(/* webpackChunkName: "courses" */ '../views/Courses.vue')
  },
  {
    path: '/course-offline/:id',
    name: 'course-offline',
    component: () => import(/* webpackChunkName: "course-detail" */ '../views/OffLineCourse.vue')
  },
  {
    path: '/course-online/:id',
    name: 'course-online',
    component: () => import(/* webpackChunkName: "course-detail" */ '../views/OnlineCourse.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
