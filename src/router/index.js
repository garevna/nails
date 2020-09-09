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
    path: '*',
    redirect: '/'
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
    component: () => import(/* webpackChunkName: "courses-offline" */ '../views/OffLineCourses.vue')
  },
  {
    path: '/courses-offline/:id',
    name: 'course-offline',
    component: () => import(/* webpackChunkName: "course-offline" */ '../views/OffLineCourse.vue')
  },
  {
    path: '/courses-online',
    name: 'courses-online',
    component: () => import(/* webpackChunkName: "courses-online" */ '../views/OnlineCourses.vue')
  },
  {
    path: '/courses-online/:id',
    name: 'course-online',
    component: () => import(/* webpackChunkName: "course-online" */ '../views/OnlineCourse.vue')
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
    component: () => import(/* webpackChunkName: "add-course-payment" */ '../views/AddCoursePayment.vue')
  },
  {
    path: '/payment',
    name: 'payment',
    component: () => import(/* webpackChunkName: "payment" */ '../views/Payment.vue')
  },
  {
    path: '/delivery',
    name: 'delivery',
    component: () => import(/* webpackChunkName: "delivery" */ '../views/Delivery.vue')
  },
  {
    path: '/return',
    name: 'return',
    component: () => import(/* webpackChunkName: "return" */ '../views/Return.vue')
  },
  {
    path: '/cooperation',
    name: 'cooperation',
    component: () => import(/* webpackChunkName: "cooperation" */ '../views/Cooperation.vue')
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
