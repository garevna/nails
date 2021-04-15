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
