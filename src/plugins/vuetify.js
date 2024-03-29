import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
    values: {
      // expand: 'mdi-expand-more',
      // home: 'mdi-home-circle',
    },
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        //Home
        colorParagraph: '#fff',
        // orange
        primary: '#FFC44A',
        orange: '#FFC44A',
        secondary: '#dde',
        dgrey: '#333333',
        lgrey: '#F4F4F4',
        // light gray
        bgBurgerMenu: '#fafafa',
        darkGrey: '#333333',
        buttons: '#FFC44A',
        homefone: '#ffffff',
        warning: '#FAFF00',
        // shop
        mgrey: '#262624',
        whitefone: '#ffffff',
        shopfont: '#808080',
        secondaryGray: '#262624',
        // courses
        coursesGray: '#4D4D4D',
        notPaidAndPublished: '#369ab3',
        paidAndPublished: '#FFC44A',
        error: '#f5420d',
        onlineCardFone: '#414242',
        disabledPathBreadcrumbs: '#262624',
        text: '#000',
        btnEdit: '#278ed3',
        burgerBg: '#ddd',
        forgotPass: '#a29f9f',
        notAvailable: '#949393',
        paymentTotalInfo: '#d0d0d0'
      },
      dark: {
        //Home
        colorParagraph: '#fff',
        // orange
        orange: '#FFC44A',
        primary: '#FFC44A',
        // light gray
        secondary: '#dde',
        darkGrey: '#333333',
        buttons: '#FFC44A',
        homefone: '#262624',
        warning: '#FAFF00',
        secondaryGray: '#262624',
        bgBurgerMenu: '#fafafa',
        // shop
        lightFont: '#808080',
        // courses
        coursesGray: '#4D4D4D',
        notPaidAndPublished: '#369ab3',
        paidAndPublished: '#FFC44A',
        error: '#f5420d',
        onlineCardFone: '#414242',
        disabledPathBreadcrumbs: '#ffffff',
        text: '#fff',
        textSlider: '#000',
        btnEdit: '#278ed3',
        burgerBg: '#ddd',
        forgotPass: '#a29f9f',
        paymentTotalInfo: '#d9d9d9'
      },
    },
  },
});
