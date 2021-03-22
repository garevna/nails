<template>
  <v-container fluid v-mutate="updateWidth">
    <v-row v-if="commodities.length">
      <v-col cols="12">
        <h2 class="darkGrey--text text-center">People who viewed this item also viewed</h2>
      </v-col>

      <v-col cols="12">
        <div class="d-flex justify-center flex-wrap">
          <ShopCard
            v-for="commodity in filteredCommodities"
            :key="commodity._id"
            :commodity="commodity"
            :width="width"
            height="320"
            @click="$emit('click', { id: commodity._id, categoryId: commodity.subCategoryId })"
          />
        </div>
      </v-col>
    </v-row>

    <v-row v-if="loading">
      <v-col cols="12" md="8" lg="11" offset-lg="1" offset-md="4" offset="0">
        <v-row>
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
  </v-container>
</template>

<script>
import ShopCard from '@/components/Shop/ShopCard.vue';

const marginCard = 16;
const padding = 12;

export default {
  name: 'AlsoViewed',
  components: { ShopCard },
  props: {
    commodities: {
      type: Array,
      default: new Array(),
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      noImage: require('@/assets/no-image.png'),
      width: '200',
      clientWidth: 600,
    };
  },
  watch: {},
  computed: {
    count() {
      const width = this.clientWidth - padding * 2;
      const cardWidth = +this.width + marginCard * 2;
      return Math.floor(width / cardWidth);
    },
    filteredCommodities() {
      return this.commodities.slice(0, this.count);
    },
  },
  methods: {
    updateWidth() {
      this.clientWidth = this.$el?.clientWidth;
    },
  },
  mounted() {
    this.updateWidth();
  },
  updated() {
    this.updateWidth();
  },
};
</script>

<style lang="scss">
@import '@/css/variables.scss';
.card-active {
  opacity: 1;
}
.card-disabled {
  cursor: pointer;
  opacity: 0.4;
}
// This should not be removed
.speciﬁcations {
  white-space: pre-wrap;
}
// .caption {
// margin-top: 50px;
// h2 {
// margin-top: 5px;
// }
// }

.price {
  width: 100%;
  // display: flex;
  // flex-direction: column;
  // justify-content: flex-end;
  // align-items: flex-end;
  // h3 {
  //   margin: 25px 0;
  // }
}
// .dark-gray-font {
//   color: $darkGrayFont;
// }
// .gray-font {
//   color: $shopGrayFont;
// }
// .description {
//   padding-top: 25px;
// }
@media screen and (max-width: 320px) {
  .caption {
    h2 {
      font-size: 14px;
    }
  }
}
</style>
