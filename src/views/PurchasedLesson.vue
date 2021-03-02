<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" v-if="!loading && video">
        <h2 class="text-center">{{ video.name }}</h2>
      </v-col>
      <v-col cols="12" xs="12" offset-md="2" md="8" class="player-container" v-if="!loading && video">
        <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions"> </video-player>
      </v-col>
      <v-col cols="12" xs="12" offset-md="2" md="8" v-if="!loading && video">
        <v-card flat class="transparent">
          <v-card-text>
            <p v-for="(item, index) in descriptions" :key="index" class="text--text">
              {{ item }}
            </p>
          </v-card-text>
          <!-- <v-card-text>{{ course.infoForBonus }}</v-card-text> -->
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" offset-md="2" md="8" v-if="!loading && video">
        <CoverImage :url="linkCheck(video)" :width="'100%'" :height="'auto'" />
        <v-card flat class="d-flex justify-center mt-16">
          <a v-for="pdf in video.pdfs" :key="pdf._id" :href="pdf.link" target="_blank" class="mx-8"
            ><v-img src="@/assets/images/pdf.svg" width="50px"
          /></a>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { mapState, mapActions } from 'vuex';

import 'video.js/dist/video-js.css';
import { videoPlayer } from 'vue-video-player';

import CoverImage from '@/components/CoverImage.vue';
import checkVideoLink from '@/helpers/checkVideoLink';

export default {
  name: 'UserCourseDetailVideo',
  components: {
    CoverImage,

    videoPlayer,
  },
  data() {
    return {
      loading: false,
      volume: 0,
    };
  },
  computed: {
    ...mapState('purchasedCourses', ['course', 'video']),
    descriptions() {
      return this.video?.description
        ? this.video.description
            .split('\n')
            .map(str => str.trim())
            .filter(str => str)
        : [];
    },
    playerOptions() {
      return {
        // width: '100%',
        // height: '100%',
        // autoplay: true,
        // muted: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: 'video/mp4',
            src: this.video?.link,
          },
        ],
        // poster: this.video?.coverImg?.link,
      };
    },
  },
  watch: {},
  methods: {
    ...mapActions('purchasedCourses', {
      getCourse: 'GET_COURSE',
      getFindVideo: 'GET_FIND_VIDEO',
    }),
    linkCheck(video) {
      return checkVideoLink(video);
    },
    async get() {
      await this.getCourse(this.$route.params.courseid);
      await this.getFindVideo(this.$route.params.lessonid);
    },
  },
  created() {
    this.get();
  },
  mounted() {},
};
</script>

<style>
.vjs_video_3-dimensions {
  height: unset;
  width: unset;
}
.video-js {
  width: 100%;
  height: 500px;
}
.video-js .vjs-big-play-button {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
