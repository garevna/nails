<template>
  <div>
    <!-- <vue-core-video-player :src="video.link" :volume.sync="volume" /> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      videoId: this.$route.params.videoid,
      video: null
    }
  },
  methods: {
    async getVideoById () {
      const response = await (await fetch(`https://nails-australia-staging.herokuapp.com/course/online/video/${this.videoId}`)).json()
      console.log(response)
    }
  },
  created () {
    this.getVideoById()
  }

}
</script>

<style>
</style>
