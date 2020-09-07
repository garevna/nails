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
        // orange
        primary: '#FFC44A',
        // light gray
        secondary: '#dde',
        darkGrey: '#333333',
        buttons: '#fa0',
        homefone: '#000',
        warning: '#FAFF00',
        // shop
        substrate: '#F4F4F4',
        secondaryGray: '#000',
        whitefone: '#ffffff',
        shopfont: '#808080',
        // courses
        coursesGray: '#4D4D4D'
      },
      dark: {
        // orange
        primary: '#FFC44A',
        // light gray
        secondary: '#dde',
        darkGrey: '#333333',
        buttons: '#fa0',
        homefone: '#000',
        warning: '#FAFF00',
        // shop
        substrate: '#F4F4F4',
        lightFont: '#808080',
        // courses
        coursesGray: '#4D4D4D'
      }
    }
  }
}
)
