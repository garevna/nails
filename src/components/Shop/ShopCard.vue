<template>
  <v-card
    :width="width"
    :height="height"
    tile
    shaped
    color="lgrey"
    class="ma-4"
    @click="$emit('click', { id: commodity._id, categoryId: commodity.subCategoryId })"
  >
    <CoverImage width="100%" :height="width" :url="checkShopCardLink(commodity)" />

    <v-card-text class="pa-2 pb-0">
      <span>
        <p class="ma-0 pa-0 pb-2 text-truncate dgrey--text text-start" style="font-size: 18px;">
          {{ commodity.name }}
        </p>

        <p class="ma-0 text-truncate dgrey--text text-start">
          {{ commodity.brand }}
        </p>
      </span>

      <p class="text-end ma-0 pa-0 dgrey--text">{{ commodity.price }} AUD</p>
    </v-card-text>
  </v-card>
</template>

<script>
import checkShopCardLink from '@/helpers/checkShopCardLink';

export default {
  name: 'ShopCard',
  props: {
    commodity: {
      type: Object,
      required: true,
    },
    width: {
      type: String,
      default: '250',
    },
    height: {
      type: String,
      default: '400',
    },
  },
  components: {
    CoverImage: () => import('@/components/CoverImage.vue'),
  },
  data() {
    return {
      coverImageSrc: require('@/assets/noImage.jpg'),
      noImage: require('@/assets/no-image.png'),
    };
  },
  computed: {
    // src() {
    //   return (this.commodity.previewImage[0] && this.commodity.previewImage[0].link) || this.coverImageSrc;
    // },
  },

  methods: {
    checkShopCardLink,
  },
};
</script>
