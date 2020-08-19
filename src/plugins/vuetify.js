import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
    values: {
      expand: 'mdi-expand-more',
      home: 'mdi-home-circle'
    }
  },
  theme: {
    themes: {
      light: {
        primary: '#fa0',
        secondary: '#dde',
        buttons: '#fa0',
        homefone: '#000',
        warning: '#FAFF00'
      },
      dark: {
        primary: '#fa0',
        secondary: '#dde',
        buttons: '#fa0',
        homefone: '#000',
        warning: '#FAFF00'
      }
    }
  }
}
)
