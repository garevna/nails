<template>
  <v-hover v-slot="{ hover }" open-delay="100">
    <v-card
      :elevation="hover ? 16 : 2"
      :class="{ 'on-hover': hover }"
      :width="width"
      class="ma-4"
      @click="detailHandler"
    >
      <h2 class="text-center text-truncate pa-4">
        {{ video.name }}
      </h2>
      <CoverImage :url="linkCheck(video)" />
      <v-card-actions class="pa-4">
        <v-spacer />
        <v-btn :disabled="published" rounded color="buttons" class="yellow-button pa-4" @click.stop="removeHandler">Delete</v-btn>
      </v-card-actions>
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
    goToDetailVideo: {
      type: Function,
      required: true,
    },
    removeVideo: {
      type: Function,
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
    published() {
      return this?.course?.isPublished;
    },
  },
  methods: {
    linkCheck(video) {
      return checkVideoLink(video);
    },
    detailHandler() {
      this.goToDetailVideo(this.video._id);
    },
    removeHandler() {
      this.removeVideo(this.video._id);
    },
  },
};
</script>

