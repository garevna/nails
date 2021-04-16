<template>
  <v-footer class="homefone pa-0 pb-6">
    <v-card flat tile class="orange" width="100%">
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4" order="4" order-md="1">
            <v-card flat class="transparent d-flex justify-center justify-sm-start pt-4">
              <v-btn icon x-large href="https://www.instagram.com/nailsaustralia" target="_blank" fab>
                <IconInstagram />
              </v-btn>

              <v-btn icon x-large href="https://www.instagram.com/nailsaustralia_shop" target="_blank" fab class="mx-4">
                <IconInstagram />
              </v-btn>

              <v-btn icon x-large href="https://www.facebook.com/nailsaustralia" target="_blank" fab>
                <IconFacebook />
              </v-btn>
            </v-card>

            <v-card-text class="text-center text-sm-start darkGrey--text pa-0">
              <h2>32 Brewer rd, Bentleigh 3204 VIC</h2>

              <a href="mailto:nailsauinfo@gmail.com" class="darkGrey--text">
                <h3 class="gmail">nailsauinfo@gmail.com</h3>
              </a>
            </v-card-text>
          </v-col>

          <v-col v-if="categories.length && hideOnMobile" cols="12" sm="6" md="2" order="2">
            <v-card-text class="darkGrey--text no-wrap text-center text-sm-left pa-2 pa-sm-4">
              <h3 class="mb-2 mt-sm-2">Shop</h3>

              <h4
                class="route mb-1"
                v-for="category in categories"
                :key="category._id"
                @click="goToShopRoute(category.slug)"
              >
                {{ category.name }}
              </h4>
            </v-card-text>
          </v-col>

          <v-col v-if="hideOnMobile" cols="12" sm="6" md="2" order="3">
            <v-card-text class="darkGrey--text no-wrap text-center text-sm-left pa-2 pa-sm-4">
              <h3 class="route mb-2 mt-sm-2">Courses</h3>
              <h4 class="route mb-1" @click="goToRoute('courses')">Manicure</h4>
              <h4 class="route mb-1" @click="goToRoute('courses')">Pedicure</h4>
              <h4 class="route mb-1" @click="goToRoute('courses')">Design</h4>
            </v-card-text>
          </v-col>

          <v-col cols="12" sm="6" md="4" order="1" order-md="4">
            <v-card-text class="darkGrey--text no-wrap text-center text-sm-start pt-0 pb-2 py-sm-4">
              <h2 class="route mb-4" @click="goToRoute('payment-and-delivery-terms')">Payment and Delivery Terms</h2>
              <h2 class="route" @click="goToRoute('add-course')">Add course</h2>
              <h2 class="route" @click="goToRoute('cooperation')">Cooperation</h2>
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-footer>
</template>

<script>
import { mapState } from 'vuex';

import IconInstagram from '@/components/svg/IconInstagram.vue';
import IconFacebook from '@/components/svg/IconFacebook.vue';

export default {
  name: 'Footer',

  components: {
    IconInstagram,
    IconFacebook,
  },
  data: () => ({}),
  computed: {
    ...mapState(['viewportWidth']),
    ...mapState('shop', ['categories']),
    hideOnMobile() {
      return this.viewportWidth > 600;
    },
  },
  methods: {
    goToShopRoute(route) {
      if (this.$route.params.categoryName !== route) {
        this.$router.push({ name: 'shop', params: { categoryName: route } });
      }
    },
    goToRoute(route) {
      if (this.$route.name !== route) {
        this.$router.push({ name: route });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.route {
  cursor: pointer;
}
</style>
