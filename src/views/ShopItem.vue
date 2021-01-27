<template>
  <v-row v-if="commodity && !isCommodityLoading" flat width="100%" class="pa-0 ma-0">
    <v-col cols="12" md="8" lg="11" offset-lg="1" offset-md="4" offset="0">
      <v-row class="pa-0 ma-0">
        <v-col cols="12" md="6" lg="6">
          <v-row class="image-row">
            <v-img :src="activeCard" max-width="100%" max-height="400px" contain></v-img>
          </v-row>
          <v-row class="justify-center">
            <v-slide-group :model="activeCard" class="px-0 justify-center" center-active mandatory>
              <v-slide-item v-for="img in commodity.images" :key="img._id" v-slot:default="{ active, toggle }">
                <v-img
                  @click="setPhoto(img, toggle)"
                  :src="img.link"
                  width="60px"
                  height="60px"
                  contain
                  active
                  alt="Commodity image"
                  :class="[active ? 'card-active' : 'card-disabled', 'mx-2']"
                ></v-img>
              </v-slide-item>
            </v-slide-group>
          </v-row>
        </v-col>

        <v-col cols="12" sm="12" md="5" xl="4" lg="4" class="px-0">
          <v-col cols="12" class="px-0">
            <h2 class="dgrey--text">{{ commodity.name }}</h2>
            <h4 class="shopfont--text">{{ commodity.brand }}</h4>
            <div class="caption">
              <h2 class="speciﬁcations">{{ commodity.speciﬁcations }}</h2>
            </div>
            <div class="price">
              <h3 class="dark-gray-font">{{ commodity.price }} AUD</h3>
              <div style="width: 200px">
                <v-btn small width="100%" class="pa-2 ma-2 dgrey--text" color="orange">Add to card</v-btn>
                <v-btn small width="100%" class="pa-2 ma-2 white--text" color="dgrey" @click="buyNow">Buy it now</v-btn>
              </div>
            </div>
          </v-col>
        </v-col>
        <v-row class="mt-10">
          <v-col cols="12">
            <h2 class="dark-gray-font text-center">People who viewed this item also viewed</h2>
          </v-col>
          <v-col cols="12">
            <v-row class="viewed-block">
              <v-card width="150" class="mx-5 my-10" v-for="n in 4" :key="n">
                <v-img :src="commodity.previewImage[0].link" max-width="150px" max-height="150px" contain></v-img>
              </v-card>
            </v-row>
          </v-col>
        </v-row>
      </v-row>
    </v-col>
  </v-row>
  <v-row v-else class="pa-0 ma-0">
    <v-col cols="12">
      <!-- TODO: skeleton loader -->
      <v-skeleton-loader type="image, list-item-three-line" animation></v-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Shop',
  components: {},
  props: ['section'],
  data() {
    return {
      commodityId: this.$route.params.commodityId,
      activeCard: '',
    };
  },
  computed: {
    ...mapState(['viewportWidth']),
    ...mapState('shop', ['categories', 'commodities', 'commodity', 'isCommodityLoading']),
    mobileMenu() {
      return this.viewportWidth < 960;
    },
    alsoViewedCommodities() {
      return this.$store.getters['shop/alsoViewedCommodities'];
    },
  },
  methods: {
    setPhoto(val, toggle) {
      toggle();
      this.activeCard = val.link;
    },
    buyNow() {
      this.$router.push({ name: 'shop-payment' });
    },
  },
  async mounted() {
    if (!this.categories) {
      await this.$store.dispatch('shop/GET_SHOP_CATEGORIES');
    }
    await this.$store.dispatch('shop/GET_COMMODITY', {
      commodityId: this.commodityId,
    });
    console.log(this.alsoViewedCommodities);
  },
  beforeDestroy() {
    this.$store.commit('shop/CLEAR_COMMODITY');
  },
};
</script>

<style lang="scss">
@import '@/css/variables.scss';
.card-active {
  opacity: 1;
}
.image-row {
  height: 430px;
}
.card-disabled {
  cursor: pointer;
  // :before {
  //   content: '';
  //   background: #18171740;
  //   width: 100%;
  //   height: 100%;
  //   position: absolute;
  // }
  opacity: 0.4;
}
.viewed-block {
  justify-content: space-around;
}
.speciﬁcations {
  white-space: pre;
}
.caption {
  margin-top: 50px;
  h2 {
    margin-top: 5px;
  }
}

.price {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  h3 {
    margin: 25px 0;
  }
}
.dark-gray-font {
  color: $darkGrayFont;
}
.gray-font {
  color: $shopGrayFont;
}
.description {
  padding-top: 25px;
}
@media screen and (max-width: 320px) {
  .caption {
    h2 {
      font-size: 14px;
    }
  }
}
</style>
