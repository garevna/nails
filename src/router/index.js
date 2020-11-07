import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store/modules/auth.store'
import Home from '../views/Home.vue'
import store from '../store/modules/auth.store'

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
    path: '/shop',
    redirect: { name: 'shop' }
  },
  {
    path: '/shop/:categoryName',
    name: 'shop',
    meta: { layout: 'whitefone' },
    component: () => import(/* webpackChunkName: "shop" */ '../views/Shop.vue')
  },
  {
    path: '/shop/:categoryName/:commodityId',
    name: 'shop-item',
    meta: { layout: 'whitefone' },
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
  },
  {
    path: '/shop-payment',
    name: 'shop-payment',
    component: () => import(/* webpackChunkName: "shop-payment" */ '../views/ShopPayment.vue')
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    meta: { layout: 'whitefone' },
    component: () => import(/* webpackChunkName: "sign-in" */ '../views/SignIn.vue')
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    meta: { layout: 'whitefone' },
    component: () => import(/* webpackChunkName: "sign-up" */ '../views/SignUp.vue')
  },
  {
    path: '/user-cabinet',
    name: 'user-cabinet',
    meta: { layout: 'whitefone' },
    component: () => import(/* webpackChunkName: "user-cabinet" */ '../views/UserCabinet.vue'),
    beforeEnter: (to, from, next) => {
      if (store.state.isLogged) {
        return next()
      } else next({ name: 'sign-in' })
    }

  },
  {
    path: '/user-cabinet/courses',
    name: 'user-courses',
    meta: { layout: 'whitefone' },
    component: () => import(/* webpackChunkName: "user-courses" */'../views/UserCourses.vue'),
    beforeEnter: (to, from, next) => {
      if (store.state.isLogged) {
        return next()
      } else next({ name: 'sign-in' })
    }
  },
  {
    path: '/user-cabinet/add-course',
    name: 'add-course',
    component: () => import(/* webpackChunkName: "add-course" */ '../views/AddCourse.vue'),
    beforeEnter: (to, from, next) => {
      if (store.state.isLogged) {
        return next()
      } else {
        next({ name: 'sign-in' })
        Vue.notify({
          group: 'foo',
          type: 'error',
          text: 'Please, sign in or create an account '
        })
      }
    }
  },
  {
    path: '/user-cabinet/courses/:courseid',
    name: 'user-course',
    // meta: { layout: 'whitefone' },
    component: () => import(/* webpackChunkName: "user-course" */'../views/UserCourse.vue'),
    beforeEnter: (to, from, next) => {
      if (store.state.isLogged) {
        return next()
      } else next({ name: 'sign-in' })
    }
  },
  {
    path: '/user-cabinet/courses/:courseid/add-videos',
    name: 'add-course-videos',
    component: () => import(/* webpackChunkName: "add-course-payment" */ '../views/AddCourseVideos.vue'),
    beforeEnter: (to, from, next) => {
      if (store.state.isLogged) {
        return next()
      } else next({ name: 'sign-in' })
    }
  },
  {
    path: '/user-cabinet/courses/:courseid/videos',
    name: 'user-videos',
    meta: { layout: 'whitefone' },
    component: () => import(/* webpackChunkName: "user-videos" */'../views/UserCourseVideos.vue'),
    beforeEnter: (to, from, next) => {
      if (store.state.isLogged) {
        return next()
      } else next({ name: 'sign-in' })
    }
  },
  {
    path: '/user-cabinet/courses/:courseid/videos/:videoid',
    name: 'user-video',
    meta: { layout: 'whitefone' },
    component: () => import(/* webpackChunkName: "user-video" */'../views/UserCourseDatailVideo.vue'),
    beforeEnter: (to, from, next) => {
      if (store.state.isLogged) {
        return next()
      } else next({ name: 'sign-in' })
    }
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
