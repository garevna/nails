export default {
  name: {
    label: 'Name of video',
    type: 'text',
    limit: 60,
    required: true,
  },
  videoFile: {
    label: 'Video file',
    type: 'file',
    icon: 'mdi-video',
    accept: 'video/mp4',
    size: 1000000,
    required: true,
    progress: true,
  },
  imgFile: {
    label: 'Image file',
    type: 'file',
    icon: 'mdi-camera',
    accept: 'image/png, image/jpeg, image/bmp',
    size: 10000,
    required: true,
  },
  pdfFiles: {
    count: 3,
    label: 'PDF file',
    type: 'pdfFile',
    icon: 'mdi-file-pdf-box',
    accept: '.pdf',
    size: 50000,
    required: false,
  },
  description: {
    label: 'Description',
    type: 'textarea',
    limit: 2000,
    required: true,
  },
};
