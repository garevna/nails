export default {
  offlineCourses: {
    get: 'course/offline',
    post: 'course/new/offline',
    put: 'course/offline',
    delete: 'course/offline',
  },
  onlineCourses: {
    get: 'course/online',
    delete: 'course/online',
    newCourse: 'course/new/online',
    buyCourse: 'course/buy-online',
    video: 'course/online/video',
    findVideo: 'course/online/findvideo',
    pdf: 'course/online/pdf',
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
  },
};
