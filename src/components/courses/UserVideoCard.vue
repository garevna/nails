<template>
  <v-card
    width="500"
    height="400"
    class="ma-4"
    @click="detailHandler"
  >
    <v-card-title class="d-flex justify-center"
      ><h2>
        {{ video.name }}
      </h2></v-card-title
    >
    <CoverImage :url="linkCheck(video)" :height="250" />
    <v-card-actions class="d-flex justify-end">
      <v-btn
        rounded
        color="buttons"
        large
        min-width="160"
        class="yellow-button"
        @click.stop="removeHandler"
        >Delete</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import CoverImage from '@/components/CoverImage.vue'
import checkVideoLink from '@/helpers/checkVideoLink'
export default {
  props: ['goToDetailVideo', 'video', 'removeVideo'],
  name: 'UserVideoCard',
  components: {
    CoverImage
  },
  data () {
    return {}
  },
  methods: {
    linkCheck (video) {
      return checkVideoLink(video)
    },
    detailHandler () {
      this.goToDetailVideo(this.video._id)
    },
    removeHandler () {
      this.removeVideo(this.video._id)
    }
  }
}
</script>

<style>
</style>
