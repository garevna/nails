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
    path: '/shop/:categoryName',
    name: 'shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/Shop.vue')
  },
  {
    path: '/shop/:categoryName/:commodityId',
    name: 'shop-item',
    component: () => import(/* webpackChunkName: "shop-item" */ '../views/ShopItem.vue')
  },
  {
    path: '/courses',
    name: 'courses',
    component: () => import(/* webpackChunkName: "courses" */ '../views/Courses.vue')
  },
  {
    path: '/courses-offline',
    name: 'courses-offline',
    component: () => import(/* webpackChunkName: "" */ '../views/OffLineCourses.vue')
  },
  {
    path: '/courses-offline/:id',
    name: 'course-offline',
    component: () => import(/* webpackChunkName: "" */ '../views/OffLineCourse.vue')
  },
  {
    path: '/courses-online',
    name: 'courses-online',
    component: () => import(/* webpackChunkName: "" */ '../views/OnlineCourses.vue')
  },
  {
    path: '/courses-online/:id',
    name: 'course-online',
    component: () => import(/* webpackChunkName: "" */ '../views/OnlineCourse.vue')
  },
  {
    path: '/personal-data',
    name: 'personal-data',
    component: () => import(/* webpackChunkName: "personal-data" */ '../views/PersonalData.vue')
  },
  {
    path: '/payment-details',
    name: 'payment-details',
    component: () => import(/* webpackChunkName: "payment-details" */ '../views/PaymentDetails.vue')
  },
  {
    path: '/add-course',
    name: 'add-course',
    component: () => import(/* webpackChunkName: "add-course" */ '../views/AddCourse.vue')
  },
  {
    path: '/add-course-payment',
    name: 'add-course-payment',
    component: () => import(/* webpackChunkName: "add-course" */ '../views/AddCoursePayment.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
