<template>
  <v-container fluid fill-height class="whitefone shop-layout">
    <v-card flat class="transparent mx-auto" max-width="1440" width="100%">
      <CategoriesSwitcher
        :selectedSection="selectedSection"
        :setSelectedSection="setSelectedSection"
        :mobileMenu="mobileMenu"
      ></CategoriesSwitcher>
      <v-row>
        <v-col cols="12" sm="6" md="3" xl="3" lg="3" v-if="!mobileMenu">
          <LeftSideMenu :setSelectedSection="setSelectedSection"></LeftSideMenu>
        </v-col>
        <v-col cols="12" sm="12" md="9" xl="9" lg="9" v-if="commodity">
          <v-row justify="start" class="description">
            <v-col cols="1" sm="1" md="1" xl="2" lg="2"> </v-col>

            <v-col cols="12" sm="6" md="4" xl="4" lg="4" xs="12" class="px-0">
              <v-row class="image-row">
                <v-img :src="activeCard" max-width="100%" max-height="400px" contain></v-img>
              </v-row>
              <v-row class="justify-center">
                <v-slide-group :model="activeCard" class="px-0 justify-center" center-active mandatory>
                  <v-slide-item v-for="img in commodity.images" :key="img" v-slot:default="{ active, toggle }">
                    <v-img
                      @click="setPhoto(img, toggle)"
                      :src="img"
                      width="60px"
                      height="60px"
                      contain
                      active
                      :class="[active ? 'card-active' : 'card-disabled', 'mx-2']"
                    ></v-img>
                  </v-slide-item>
                </v-slide-group>
              </v-row>
            </v-col>

            <v-col cols="1" md="0"></v-col>

            <v-col cols="12" sm="12" md="5" xl="4" lg="4" class="px-0">
              <v-col cols="12" class="gray-font px-0">
                <h2 class="dark-gray-font">{{ commodity.name }}</h2>
                <h4>{{ commodity.brand }}</h4>
                <div class="caption">
                  <h2 class="speciﬁcations">{{ commodity.speciﬁcations }}</h2>
                </div>
                <div class="price">
                  <h3 class="dark-gray-font">{{ commodity.price }} AUD</h3>
                  <div class="shop-buttons">
                    <v-btn tile small width="100%" class="add" color="#FFC44A">Add to card</v-btn>
                    <v-btn tile small width="100%" class="buy" color="#333333" @click='buyNow'>Buy it now</v-btn>
                  </div>
                </div>
              </v-col>
            </v-col>
          </v-row>
          <v-row class="mt-10">
            <v-col cols="12">
              <h2 class="dark-gray-font text-center">People who viewed this item also viewed</h2>
            </v-col>
            <v-col cols="12">
              <v-row class="viewed-block">
                <v-card width="150" class="mx-5 my-10 " v-for="n in 4" :key="n">
                  <v-img :src="activeCard" max-width="150px" max-height="150px" contain></v-img>
                </v-card>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

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
.shop-buttons {
  width: 100px;
  display: flex;
  flex-direction: column;
  button {
    margin: 4px 0;
  }
  .add {
    color: $darkGrayFont !important;
  }
  .buy {
    color: white !important;
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

<script>
import { mapState } from 'vuex'

import LeftSideMenu from '@/components/Shop/LeftSideMenu.vue'
import CategoriesSwitcher from '@/components/Shop/CategoriesSwitcher.vue'
export default {
  name: 'Shop',
  components: {
    LeftSideMenu,
    CategoriesSwitcher
  },
  props: ['section'],
  data () {
    return {
      selectedBlock: 0,
      selectedSection: {},
      commodityId: this.$route.params.commodityId,
      activeCard: ''
    }
  },
  computed: {
    ...mapState(['viewportWidth']),
    ...mapState('shop', ['categories', 'commodities', 'commodity']),
    mobileMenu () {
      return this.viewportWidth < 960
    }
  },
  methods: {
    setSelectedSection (val) {
      this.selectedSection = val
    },
    setPhoto (val, toggle) {
      toggle()
      this.activeCard = val.link
    },
    buyNow () {
      this.$router.push({ name: 'shop-payment' })
    }
  },
  watch: {
    categories () {
      if (this.categories && this.categories.length && this.commodity) {
        this.selectedSection = this.categories.flat().find((el) => el._id === this.commodity.categoryId)
      }
    },
    commodity (newVal) {
      if (this.categories && this.categories.length && this.commodity) {
        this.selectedSection = this.categories.flat().find((el) => el._id === this.commodity.categoryId)
      }
      if (newVal) this.activeCard = newVal.images[0].link
    }
  },
  mounted () {
    if (!this.categories) {
      this.$store.dispatch('shop/GET_SHOP_CATEGORIES')
    }
    this.$store.dispatch('shop/GET_COMMODITY', { commodityId: this.commodityId })
    this.$vuetify.theme.themes.light.homefone = this.$vuetify.theme.themes.light.whitefone
  },
  beforeDestroy () {
    this.$vuetify.theme.themes.light.homefone = this.$vuetify.theme.themes.light.secondaryGray
    this.$store.commit('shop/CLEAR_COMMODITY')
  }
}
</script>
