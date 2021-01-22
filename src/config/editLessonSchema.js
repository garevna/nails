export default {
  name: {
    label: 'Name of video',
    type: 'text',
    required: true
  },
  imgFile: {
    label: 'Image file',
    type: 'file',
    icon: 'mdi-camera',
    accept: 'image/png, image/jpeg, image/bmp',
    size: 5000,
    required: true
  },
  description: {
    label: 'Description',
    type: 'textarea',
    required: true
  }
}
