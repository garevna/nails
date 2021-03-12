import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/modules/auth.store';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '*',
    redirect: '/',
  },
  {
    path: '/shop',
    name: 'shop-root',
    redirect: { name: 'shop', params:{
      categoryName: 'nail-tools'
    } },
  },
  {
    path: '/shop/:categoryName',
    name: 'shop',
    meta: { layout: 'Whitefone' },
    component: () => import(/* webpackChunkName: "shop" */ '@/views/Shop.vue'),
  },
  {
    path: '/shop/:categoryName/:commodityId',
    name: 'shop-item',
    meta: { layout: 'Whitefone' },
    component: () => import(/* webpackChunkName: "shop-item" */ '@/views/ShopItem.vue'),
  },
  {
    path: '/products-cart',
    name: 'products-cart',
    meta: { layout: 'Whitefone' },
    component: () => import(/* webpackChunkName: "shop-item" */ '@/views/ProductsCart.vue'),
  },
  {
    path: '/courses',
    name: 'courses',
    component: () => import(/* webpackChunkName: "courses" */ '@/views/Courses.vue'),
  },
  {
    path: '/courses-offline',
    name: 'courses-offline',
    component: () => import(/* webpackChunkName: "courses-offline" */ '@/views/OffLineCourses.vue'),
  },
  {
    path: '/courses-offline/:courseid',
    name: 'course-offline',
    component: () => import(/* webpackChunkName: "course-offline" */ '@/views/OffLineCourse.vue'),
  },
  {
    path: '/courses-online',
    name: 'courses-online',
    component: () => import(/* webpackChunkName: "courses-online" */ '@/views/OnlineCourses.vue'),
  },
  {
    path: '/courses-online/:courseid',
    name: 'course-online',
    component: () => import(/* webpackChunkName: "course-online" */ '@/views/OnlineCourse.vue'),
  },
  {
    path: '/courses-online/:courseid/by-course',
    name: 'by-course',
    component: () => import(/* webpackChunkName: "personal-data" */ '@/views/PersonalData.vue'),
  },  {
    path: '/courses-online/:courseid/by-course-creator',
    name: 'by-course-creator',
    component: () => import(/* webpackChunkName: "personal-data" */ '@/views/PersonalData.vue'),
  },
  {
    path: '/courses-offline/:courseid/by-offline',
    name: 'by-offline',
    component: () => import(/* webpackChunkName: "personal-data" */ '@/views/PersonalOfflineData.vue'),
  },
  // {
  //   path: '/payment-details',
  //   name: 'payment-details',
  //   component: () => import(/* webpackChunkName: "payment-details" */ '@/views/PaymentDetails.vue'),
  // },
  // {
  //   path: '/payment',
  //   name: 'payment',
  //   component: () => import(/* webpackChunkName: "payment" */ '@/views/Payment.vue'),
  // },
  {
    path: '/delivery',
    name: 'delivery',
    component: () => import(/* webpackChunkName: "delivery" */ '@/views/Delivery.vue'),
  },
  {
    path: '/return',
    name: 'return',
    component: () => import(/* webpackChunkName: "return" */ '@/views/Return.vue'),
  },
  {
    path: '/cooperation',
    name: 'cooperation',
    component: () => import(/* webpackChunkName: "cooperation" */ '@/views/Cooperation.vue'),
  },
  {
    path: '/shop-payment',
    name: 'shop-payment',
    component: () => import(/* webpackChunkName: "shop-payment" */ '@/views/ShopPayment.vue'),
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    meta: { layout: 'Whitefone' },
    component: () => import(/* webpackChunkName: "sign-in" */ '@/views/SignIn.vue'),
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    meta: { layout: 'Whitefone' },
    component: () => import(/* webpackChunkName: "sign-up" */ '@/views/SignUp.vue'),
  },
  {
    path: '/user-cabinet',
    // name: 'user-cabinet',
    // meta: { layout: 'Whitefone' },
    component: () => import(/* webpackChunkName: "user-home" */ '@/views/UserHome.vue'),
    children: [
      {
        path: '',
        name: 'user-cabinet',
        meta: { layout: 'Whitefone' },
        component: () => import(/* webpackChunkName: "user-cabinet" */ '@/views/UserCabinet.vue'),
      },
      {
        path: 'courses',
        name: 'user-courses',
        meta: { layout: 'Whitefone' },
        component: () => import(/* webpackChunkName: "user-courses" */ '@/views/UserCourses.vue'),
      },
      {
        path: 'purchased-online-courses',
        name: 'purchased-online-courses',
        component: () => import(/* webpackChunkName: "user-courses" */ '@/views/PurchasedCourses.vue'),
      },
      {
        path: 'purchased-online-courses/:courseid',
        name: 'purchased-online-course',
        component: () => import(/* webpackChunkName: "user-courses" */ '@/views/PurchasedCourse.vue'),
      },
      {
        path: 'purchased-online-courses/:courseid/lessons',
        name: 'purchased-lessons',
        meta: { layout: 'Whitefone' },
        component: () => import(/* webpackChunkName: "user-courses" */ '@/views/PurchasedLessons.vue'),
      },
      {
        path: 'purchased-online-courses/:courseid/lessons/:lessonid',
        name: 'purchased-lesson',
        meta: { layout: 'Whitefone' },
        component: () => import(/* webpackChunkName: "user-courses" */ '@/views/PurchasedLesson.vue'),
      },
      {
        path: 'purchased-offline-courses',
        name: 'purchased-offline-courses',
        component: () => import(/* webpackChunkName: "user-courses" */ '@/views/PurchasedCourses.vue'),
      },
      {
        path: 'purchased-offline-courses/:courseid',
        name: 'purchased-offline-course',
        component: () => import(/* webpackChunkName: "user-courses" */ '@/views/PurchasedCourse.vue'),
      },
      {
        path: 'add-course',
        name: 'add-course',
        component: () => import(/* webpackChunkName: "add-course" */ '@/views/AddCourse.vue'),
      },
      {
        path: 'courses/:courseid',
        name: 'user-course',
        component: () => import(/* webpackChunkName: "user-course" */ '@/views/UserCourse.vue'),
      },
      {
        path: 'courses/:courseid/add-videos',
        name: 'add-course-videos',
        component: () => import(/* webpackChunkName: "add-course-videos" */ '@/views/AddCourseVideos.vue'),
      },
      {
        path: 'courses/:courseid/videos',
        name: 'user-videos',
        meta: { layout: 'Whitefone' },
        component: () => import(/* webpackChunkName: "user-videos" */ '@/views/UserCourseVideos.vue'),
      },
      {
        path: 'courses/:courseid/videos/:lessonid',
        name: 'user-video',
        meta: { layout: 'Whitefone' },
        component: () => import(/* webpackChunkName: "user-video" */ '@/views/UserCourseDetailVideo.vue'),
      },
    ],
    beforeEnter: (to, from, next) => {
      if (store.state.isLogged) {
        next();
      } else {
        next({ name: 'sign-in' });
      }
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
