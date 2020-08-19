<template>
  <v-container fluid style="padding: 0; margin: 0">
    <MainMenu />
    <v-card flat dark class="transparent mx-auto" max-width="1440">
      <v-row align="center" justify="center">
        <v-col cols="12" md="5">
          <v-card flat class="transparent mx-auto my-auto" max-width="480">
            <v-card-text class="text-center">
              <h1>ABOUT</h1>
            </v-card-text>
            <v-card-text class="text-center">
              <p>{{ aboutText }}</p>
            </v-card-text>
            <v-card-text class="text-center">
              <h1>S H O P</h1>
            </v-card-text>
            <v-card-text class="text-center">
              <p>{{ shopText }}</p>
            </v-card-text>
            <v-card-text class="text-center">
              <v-btn
                  color="buttons"
                  rounded
                  large
                  dark
                  min-width="160"
                  class="yellow-button"
              >
                SHOP
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="7">
          <v-card flat class="transparent mx-auto my-auto" max-width="700">
            <v-img :src="require('@/assets/images/image-1.png')" />
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="7">
          <v-card flat class="transparent mx-auto my-auto" max-width="700">
            <v-img :src="require('@/assets/images/image-2.png')" />
          </v-card>
        </v-col>
        <v-col cols="12" md="5">
          <v-card flat class="transparent mx-auto my-auto" max-width="480">
            <v-card-text class="text-center">
              <h1>C O U R S E S</h1>
            </v-card-text>
            <v-card-text class="text-center">
              <p>{{ coursesText }}</p>
            </v-card-text>
            <v-card-text class="text-center">
              <v-btn
                  color="buttons"
                  rounded
                  large
                  dark
                  min-width="160"
                  class="yellow-button mr-4"
              >
                ALL COURSES
              </v-btn>
              <v-btn
                  color="buttons"
                  rounded
                  outlined
                  large
                  dark
                  min-width="160"
                  class="yellow-button ml-4"
              >
                ADD COURSE
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-card flat class="transparent mx-auto my-10" max-width="940">
        <Slider />
      </v-card>
    </v-card>
    <v-card flat dark class="mx-auto secondary" max-width="1440">
      <Slider />
    </v-card>
  </v-container>
</template>

<style>
p {
  text-align: justify;
  color: #ddf;
  letter-spacing: 0.1rem;
}
.yellow-button {
  color: #000!important;
  font-weight: bold;
  font-size: 16px!important;
}
</style>

<script>

import Slider from '@/components/Slider.vue'
import MainMenu from '@/components/MainMenu.vue'

export default {
  name: 'Home',
  components: {
    Slider,
    MainMenu
  },
  data: () => ({
    aboutText: `fcdjvfnjnbgb gvnfdjnbdfkjbn jfvnfjnvfdjvndfjvn
          fvnfnvfbngfnbdkdkkvkvkfmvkkfjvnfbfb fjnkgfb
          fcdjvfnjnbgb gvnfdjnbdfkjbn jfvnfjnvfdjvndfjvn
          fvnfnvfbngfnbdkdkkvkvkfmvkkfjvnfbfb fjnkgfb
          fcdjvfnjnbgb gvnfdjnbdfkjbn jfvnfjnvfdjvndfjvn
          fvnfnvfbngfnbdkdkkvkvkfmvkkfjvnfbfb fjnkgfb
          fcdjvfnjnbgb gvnfdjnbdfkjbn jfvnfjnvfdjvndfjvn
          fvnfnvfbngfnbdkdkkvkvkfmvkkfjvnfbfb fjnkgfb`,
    coursesText: `fcdjvfnjnbgb gvnfdjnbdfkjbn jfvnfjnvfdjvndfjvn
          fvnfnvfbngfnbdkdkkvkvkfmvkkfjvnfbfb fjnkgfb
          fcdjvfnjnbgb gvnfdjnbdfkjbn jfvnfjnvfdjvndfjvn
          fvnfnvfbngfnbdkdkkvkvkfmvkkfjvnfbfb fjnkgfb
          fcdjvfnjnbgb gvnfdjnbdfkjbn jfvnfjnvfdjvndfjvn
          fvnfnvfbngfnbdkdkkvkvkfmvkkfjvnfbfb fjnkgfb
          fcdjvfnjnbgb gvnfdjnbdfkjbn jfvnfjnvfdjvndfjvn
          fvnfnvfbngfnbdkdkkvkvkfmvkkfjvnfbfb fjnkgfb`,
    shopText: 'Shopping is an activity in which a customer browses the available goods or services presented by one or more retailers with the potential intent to purchase a suitable selection of them. A typology of shopper types has been developed by scholars which identifies one group of shoppers as recreational shoppers, that is, those who enjoy shopping and view it as a leisure activity. Online shopping has become a major disruptor in the retail industry as consumers can now search for product information and place product orders across different regions. Online retailers deliver their products directly to the consumers` home, offices or wherever they want. The B2C (business to consumer) process has made it easy for consumers to select any product online from a retailer`s website and to have it delivered relatively quickly. Using online shopping methods, consumers do not need to consume energy by physically visiting physical stores. This way they save time and the cost of travelling. A retailer or a shop is a business that presents a selection of goods and offers to trade or sell them to customers for money or other goods. Shoppers` shopping experiences may vary. They are based on a variety of factors including how the customer is treated, convenience, the type of goods being purchased, and mood. According to a 2000 report, in New York State, women purchase 80% of all consumer goods.'
  })
}
</script>
