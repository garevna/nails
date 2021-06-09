<template>
  <v-footer class="homefone pa-0 pb-6">
    <v-card flat tile class="orange d-flex justify-center" width="100%">
      <v-card flat max-width="1100px" class="transparent d-flex flex-column flex-md-row flex-wrap justify-center my-4">
        <v-card flat class="transparent mr-md-8 order-2 order-md-1 mt-4 mt-md-0" >
          <div class="transparent d-flex justify-center justify-md-start">
            <v-btn icon href="https://www.instagram.com/nailsaustralia" target="_blank" fab>
              <IconInstagram />
            </v-btn>

            <v-btn icon href="https://www.instagram.com/nailsaustralia_shop" target="_blank" fab class="mx-4">
              <IconInstagram />
            </v-btn>

            <v-btn icon href="https://www.facebook.com/nailsaustralia" target="_blank" fab>
              <IconFacebook />
            </v-btn>
          </div>

          <v-card-text class="text-center text-md-start darkGrey--text pa-0">
            <!-- <h2>32 Brewer rd, Bentleigh 3204 VIC</h2> -->

            <a href="mailto:nailsauinfo@gmail.com" class="darkGrey--text">
              <h4 class="gmail">nailsauinfo@gmail.com</h4>
            </a>
          </v-card-text>
        </v-card>

        <v-card v-if="categories.length && $vuetify.breakpoint.mdAndUp" flat class="transparent darkGrey--text mx-8 order-md-2">
          <h4 @click="goToRoute('shop')" class="mb-2 text-center text-decoration-underline route">Shop</h4>
          <div class="d-flex justify-space-between shop-categories-column-container">
            <div v-for="(column, index) in columnsCategories" :key="index" class="mx-4">
              <h4
                class="route mb-1"
                v-for="category in column"
                :key="category._id"
                @click="goToShopRoute(category.slug)"
              >
                {{ category.name }}
              </h4>
            </div>
          </div>
        </v-card>

        <v-card v-if="$vuetify.breakpoint.mdAndUp" flat class="transparent text-center darkGrey--text mx-8 order-md-3">
          <!-- <v-card-text class="darkGrey--text no-wrap text-center text-sm-left pa-2 pa-sm-4"> -->
          <h4 class="route mb-2 text-decoration-underline">Courses</h4>
          <h4 class="route mb-1" @click="goToRoute('courses')">Manicure</h4>
          <h4 class="route mb-1" @click="goToRoute('courses')">Pedicure</h4>
          <h4 class="route mb-1" @click="goToRoute('courses')">Design</h4>
          <!-- </v-card-text> -->
        </v-card>

        <v-card flat class="transparent text-center order-1 order-md-4 text-md-right darkGrey--text ml-md-8">
          <h4
            class="route mb-2 text-decoration-underline"
            @click="goToRoute('payment-and-delivery-terms')"
          >
            Payment and Delivery Terms
          </h4>
          <h4 class="route" @click="goToRoute('add-course')">Add course</h4>
          <h4 class="route" @click="goToRoute('cooperation')">Cooperation</h4>
        </v-card>
      </v-card>
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
    // ...mapState(['viewportWidth']),
    ...mapState('shop', ['categories']),
    // hideOnMobile() {
    //   return this.viewportWidth > 600;
    // },
    columnsCategories() {
      if (!this.categories?.length) return [];
      const len = Math.ceil(this.categories.length / 2);
      return [this.categories.slice(0, len), this.categories.slice(len)];
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

<style scoped>
.route {
  cursor: pointer;
}
.shop-categories-column-container div:last-child h4 {
  text-align: right;
}
</style>
