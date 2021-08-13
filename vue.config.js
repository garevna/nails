module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? process.env.DEPLOY_TYPE === 'for-api'
      ? '/'
      : '/nails/' // for-travis
    : '/'
}
