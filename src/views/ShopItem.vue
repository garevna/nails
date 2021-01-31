<template>
  <v-row v-if="commodity && !isCommodityLoading" flat width="100%" class="pa-0 ma-0">
    <v-col cols="12" md="12" lg="11" offset-lg="1" offset="0">
      <v-row class="pa-0 ma-0">
        <v-col cols="12" md="6" lg="6">
          <v-row class="image-row d-flex justify-center">
            <v-card flat class="px-5">
              <v-img :src="activeCard" :lazy-src="noImage" max-width="100%" max-height="400px" contain></v-img>
            </v-card>
          </v-row>
          <v-row class="justify-center">
            <v-slide-group :model="activeCard" class="px-0 justify-center" center-active mandatory>
              <v-slide-item v-for="img in commodity.images" :key="img._id" v-slot:default="{ active, toggle }">
                <v-img
                  @click="setPhoto(img, toggle)"
                  :src="img.link"
                  :lazy-src="noImage"
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
              <h2 max-width="150px" class="speciﬁcations">{{ commodity.speciﬁcations }}</h2>
            </div>
            <div class="price">
              <h3 class="dark-gray-font">{{ commodity.price }} AUD</h3>
              <div style="width: 200px">
                <v-btn small width="100%" class="pa-2 ma-2 dgrey--text" color="orange">Add to card</v-btn>
                <v-btn small width="100%" class="pa-2 ma-2 white--text" color="dgrey">Buy it now</v-btn>
              </div>
            </div>
          </v-col>
        </v-col>
        <v-row class="mt-10" v-if="alsoViewedCommodities.length">
          <v-col cols="12">
            <h2 class="dark-gray-font text-center">People who viewed this item also viewed</h2>
          </v-col>
        </v-row>
        <v-col cols="12" v-if="alsoViewedCommodities.length">
          <v-sheet elevation="0" width="100%">
            <v-slide-group
              class="pa-2"
              active-class="success"
              show-arrows="desktop"
              next-icon="$next"
              prev-icon="$prev"
            >
              <v-slide-item width="200" class="mx-5 my-10" v-for="card in alsoViewedCommodities" :key="card._id">
                <v-card
                  width="200px"
                  elevation="2"
                  class="d-fex justify-center pa-0 ma-0"
                  rounded="0"
                  shaped
                  color="lgrey"
                  height="350"
                  @click="goToCard(card._id)"
                  link
                >
                  <v-card flat outlined class="d-fex flex-column justify-center align-center ma-0" tile color="lgrey">
                    <v-img
                      :src="card.previewImage[0].link"
                      :lazy-src="noImage"
                      width="100%"
                      height="200"
                      contain
                    ></v-img>
                  </v-card>

                  <v-card
                    elevation="0"
                    height="150"
                    tile
                    color="lgrey"
                    class="ma-0 px-3 d-flex flex-column justify-space-between"
                  >
                    <span>
                      <p class="dgrey--text mb-2 font-weight-bold text-h6">{{ card.name }}</p>
                      <p class="dgrey--text font-weight-medium text-subtitle-1">{{ card.brand }}</p>
                    </span>
                    <p class="dgrey--text text-end text-subtitle-1">{{ card.price }} AUD</p>
                  </v-card>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <v-row v-else class="pa-0 ma-0">
    <v-col cols="12" md="8" lg="11" offset-lg="1" offset-md="4" offset="0">
      <v-row class="pa-0 ma-0">
        <v-col cols="6">
          <v-skeleton-loader height="400px" type="image@2"></v-skeleton-loader>
          <v-row class="pa-10 d-flex justify-space-between">
            <v-skeleton-loader height="100px" width="25%" type="image"></v-skeleton-loader>
            <v-skeleton-loader height="100px" width="25%" type="image"></v-skeleton-loader>
            <v-skeleton-loader height="100px" width="25%" type="image"></v-skeleton-loader>
          </v-row>
        </v-col>
        <v-col cols="12" sm="12" md="5" xl="4" lg="4" class="px-0">
          <v-skeleton-loader height="50px" type="heading"></v-skeleton-loader>
          <v-skeleton-loader height="100px" width="20%" type="text"></v-skeleton-loader>
          <v-skeleton-loader width="100%" type="paragraph@7"></v-skeleton-loader>
          <v-row class="py-10 d-flex justify-end">
            <v-skeleton-loader type="button"></v-skeleton-loader>
            <v-skeleton-loader type="button"></v-skeleton-loader>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" class="px-5 pb-2" v-for="i in 4" :key="i">
          <v-card class="pa-0 pt-0 mt-0" color="lgrey">
            <v-skeleton-loader type="image, list-item-three-line" animation></v-skeleton-loader>
          </v-card>
        </v-col>
      </v-row>
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
      noImage: require('@/assets/no-image.png'),
    };
  },
  watch: {
    commodityId(newVal) {
      this.$store.dispatch('shop/GET_COMMODITY', {
        commodityId: newVal,
      });
    },
  },
  computed: {
    ...mapState(['viewportWidth']),
    ...mapState('shop', ['categories', 'commodities', 'commodity', 'isCommodityLoading', 'fullListOfCategories']),
    mobileMenu() {
      return this.viewportWidth < 960;
    },
    alsoViewedCommodities() {
      return this.$store.getters['shop/alsoViewedCommodities'];
    },
    alsoViewedCommoditiesLink() {
      this.fullListOfCategories;
      if (!this.alsoViewedCommodities.length) return;
      const categoryId = this.alsoViewedCommodities[0].subCategoryId || this.alsoViewedCommodities[0].categoryId;
      const category = this.fullListOfCategories.find(el => el._id === categoryId);
      if (category && category.slug) return category.slug;
      return '';
    },
  },
  methods: {
    goToCard(id) {
      this.$store.dispatch('shop/GET_COMMODITY', {
        commodityId: id,
      });
      this.$router.push({
        name: 'shop-item',
        params: { categoryName: this.alsoViewedCommoditiesLink, commodityId: id },
      });
    },
    setPhoto(val, toggle) {
      toggle();
      this.activeCard = val.link;
    },
    buyNow() {
      this.$router.push({ name: 'shop-payment' });
    },
  },
  async mounted() {
    await this.$store.dispatch('shop/GET_COMMODITY', {
      commodityId: this.commodityId,
    });
    this.activeCard = (await this.commodity.images[0]) && this.commodity.images[0].link;
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
  opacity: 0.4;
}
// This should not be removed
.speciﬁcations {
  white-space: pre-wrap;
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
