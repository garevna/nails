<template>
  <v-card
    :width="width"
    tile
    shaped
    color="lgrey"
    class="pa-2 ma-4"
    @click="$emit('click', { id: commodity._id, categoryId: commodity.subCategoryId })"
  >
    <v-img :src="src" :lazy-src="noImage" :width="width" :height="width" />

    <v-card-text class="pa-2 pb-0">
      <span>
        <p class="text-h6 ma-0 pa-0 font-weight-bold dgrey--text text-start">
          {{ commodity.name }}
        </p>

        <p class="text-subtitle-1 ma-0 font-weight-medium dgrey--text text-start">
          {{ commodity.brand }}
        </p>
      </span>

      <p class="text-end text-subtitle-1 ma-0 pa-0 font-weight-bold dgrey--text">{{ commodity.price }} AUD</p>
    </v-card-text>
  </v-card>
</template>

<script>
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
  data() {
    return {
      coverImageSrc: require('@/assets/noImage.jpg'),
      noImage: require('@/assets/no-image.png'),
    };
  },
  computed: {
    src() {
      return (this.commodity.previewImage[0] && this.commodity.previewImage[0].link) || this.coverImageSrc;
    },
  },

  methods: {},
};
</script>
