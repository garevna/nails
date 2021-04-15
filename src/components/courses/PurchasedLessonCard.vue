<template>
  <v-hover v-slot="{ hover }" open-delay="100">
    <v-card
      :elevation="hover ? 16 : 2"
      :class="{ 'on-hover': hover }"
      :width="width"
      class="ma-4"
      @click="$emit('lesson')"
    >
      <h2 class="text-center text-truncate pa-4">
        {{ video.name }}
      </h2>
      <CoverImage :url="linkCheck(video)" />
    </v-card>
  </v-hover>
</template>

<script>
import { mapState } from 'vuex';

import CoverImage from '@/components/CoverImage.vue';
import checkVideoLink from '@/helpers/checkVideoLink';
export default {
  name: 'UserVideoCard',
  props: {
    video: {
      type: Object,
      required: true,
    },
    width: {
      type: String,
      default: '300',
    },
  },
  components: {
    CoverImage,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('courses', ['course']),
  },
  methods: {
    linkCheck(video) {
      return checkVideoLink(video);
    },
  },
};
</script>

<style scoped>
.spacing {
  letter-spacing: unset;
}
</style>
