import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
    values: {
      expand: 'mdi-expand-more',
      home: 'mdi-home-circle',
    },
  },
  theme: {
    themes: {
      light: {
        orange: '#FFC44A',
        primary: '',
        secondary: '#dde',
        accent: '',
        dgrey: '#333333',
        lgrey: '#F4F4F4 ',
        // orange
        // light gray
        darkGrey: '#333333',
        buttons: '#FFC44A',
        homefone: '#ffffff',
        warning: '#FAFF00',
        // shop
        substrate: '#F4F4F4',
        mgrey: '#262624',
        whitefone: '#ffffff',
        shopfont: '#808080',
        // courses
        coursesGray: '#4D4D4D',
        notPaidAndPublished: '#369ab3',
        error: '#f5420d',
      },
      dark: {
        orange: '#FFC44A',
        primary: '#FFC44A',
        // light gray
        secondary: '#dde',
        darkGrey: '#333333',
        buttons: '#FFC44A',
        homefone: '#262624',
        warning: '#FAFF00',
        secondaryGray: '#262624',
        // shop
        substrate: '#F4F4F4',
        lightFont: '#808080',
        // courses
        coursesGray: '#4D4D4D',
        notPaidAndPublised: '#369ab3',
        error: '#f5420d',
      },
    },
  },
});
