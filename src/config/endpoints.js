export default {
  offlineCourses: {
    get: 'course/offline',
    post: 'course/offline',
    put: 'course/offline',
    delete: 'course/offline',
    buyCourse: 'course/buy-offline',
  },
  onlineCourses: {
    get: 'course/online',
    delete: 'course/online',
    post: 'course/online',
    buyCourse: 'course/buy-online',
    buyEndCustomer: 'course/buy-online-by-end-customer',
    video: 'course/online/video',
    findVideo: 'course/online/findvideo',
    pdf: 'course/online/pdf',
  },
  orders: {
    get: 'orders',
  },
  auth: {
    registration: 'auth/registration',
    login: 'auth/login',
    logout: 'auth/logout',
    profile: 'auth/profile',
    reset: 'auth/reset-password',
    restore: 'auth/restore-password',
    change: 'auth/change-password',
  },
  categories: {
    categories: 'shop/categories',
    category: 'shop/category',
    subcategory: 'shop/subcategory',
    newCategory: 'shop/category',
    newSubcategory: 'shop/subcategory',
  },
  commodities: {
    commodities: 'shop/commodities',
    commodity: 'shop/commodity',
    subcommodities: 'shop/subcommodities',
    search: 'shop/search',
    newCommodity: 'shop/new/commodity',
    files: 'shop/commodity/files',
    newSubcategory: 'Fshop/file',
    random: 'shop/random',
    getById: 'shop/commodities-by-ids',
  },
  instagram: {
    get: 'instagram',
  },
  delivery: {
    get: 'delivery-prices',
  },
  payment: {
    buyBasket: 'buy-from-basket',
  },
};
