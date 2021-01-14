export default {
  businessName: {
    label: 'Business name',
    type: 'text',
    required: true
  },
  category: {
    label: 'Category',
    type: 'text',
    required: true
  },
  nameOfCourse: {
    label: 'Name of Course',
    type: 'text',
    required: true
  },
  subtitle: {
    label: 'Subtitle',
    type: 'text',
    required: true
  },
  accessDays: {
    label: 'Access (days)',
    type: 'number',
    required: true
  },
  price: {
    label: 'Price',
    type: 'number',
    required: true
  },
  author: {
    label: 'Author',
    type: 'text',
    required: false
  },
  instructor: {
    label: 'Instructor',
    type: 'text',
    required: true
  },
  infoForBonus: {
    label: 'Info for bonus',
    type: 'text',
    required: true
  },
  suitable: {
    type: 'suitable'
  },
  description: {
    label: 'Description',
    type: 'textarea',
    required: true
  },
  photo:{
    label: 'Cover picture',
    type: 'file',
    required: true
  }
}
