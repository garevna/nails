<template>
  <v-container>
    <v-row>
      <v-col cols="12" xs="12">
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-col>
      <v-col cols="12" xs="12" offset-md="3" md="6">
        <vue-core-video-player
          v-if="!loading && video"
          :src="video.link"
          :volume.sync="volume"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      videoId: this.$route.params.videoid,
      video: null,
      loading: true,
      volume: 0.5
    }
  },
  methods: {
    async getVideoById () {
      const { video, error } = await (
        await fetch(
          `https://nails-australia-staging.herokuapp.com/course/online/findvideo/${this.videoId}`
        )
      ).json()
      if (!error) {
        this.video = video
        this.loading = false
      }
      console.log(video)
    }
  },
  created () {
    this.getVideoById()
  }
}
</script>

<style>
</style>
