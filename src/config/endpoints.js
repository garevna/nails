export default {
  offlineCourses: {
    get: 'course/offline',
    post: 'course/new/offline',
    put: 'course/offline',
    delete: 'course/offline',
    buyCourse: 'course/buy-offline',
  },
  onlineCourses: {
    get: 'course/online',
    delete: 'course/online',
    newCourse: 'course/new/online',
    buyCourse: 'course/buy-online',
    buyEndCustomer: 'course/buy-online-by-end-customer',
    video: 'course/online/video',
    findVideo: 'course/online/findvideo',
    pdf: 'course/online/pdf',
  },
  orders: {
    get: 'order'
  },
  auth: {
    signUp: 'auth/signup',
    signIn: 'auth/signin',
    user: 'user',
    checkToken: 'user/findByJwt'
  },
  categories: {
    categories: 'shop/categories',
    category: 'shop/category',
    subcategory: 'shop/subcategory',
    newCategory: 'shop/new/category',
    newSubcategory: 'shop/new/subcategory',
  },
  commodities: {
    commodities: 'shop/commodities',
    commodity: 'shop/commodity',
    subcommodities: 'shop/subcommodities',
    search: 'shop/search',
    newCommodity: 'shop/new/commodity',
    files: 'shop/commodity/files',
    newSubcategory: 'Fshop/file',
    getById: 'shop/commodities-by-ids'
  },
  instagram: {
    get: 'instagram'
  }
};
