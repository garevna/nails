<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" xs="12">
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-col>
      <v-col
        cols="12"
        xs="12"
        offset-md="2"
        md="8"
        class="player-container"
        v-if="!loading && video"
      >
        <vue-core-video-player :src="video.link" />
      </v-col>
      <v-col cols="12" xs="12" offset-md="2" md="8" v-if="!loading && video">
        <v-card-title>{{ video.description }}</v-card-title>
      </v-col>
      <v-col cols="12" xs="12" offset-md="2" md="8" v-if="!loading && video">
        <CoverImage :url="linkCheck(video)" :height="500" />
        <v-card flat class="d-flex justify-center mt-16">
          <VideoPdfs :currentCourseId="courseId" :videoId="videoId" />
        </v-card>
      </v-col>
      <v-col cols="12" v-if="!showForm" xs="12">
        <v-btn
          rounded
          color="buttons"
          large
          min-width="160"
          class="yellow-button"
          @click="showForm = true"
        >
          Edit
        </v-btn>
      </v-col>
      <v-col v-if="showForm" cols="12" xs="12">
        <v-form ref="form">
          <v-text-field label="name of video" v-model="nameOfVideo" outlined />
          <v-textarea label="description" v-model="description" outlined />
          <v-file-input v-model="imgFile" label="add cover image " outlined />
        </v-form>
        <div
          class="d-flex flex-column align-center flex-sm-row justify-sm-center"
        >
          <v-btn
            rounded
            color="buttons"
            large
            min-width="160"
            class="yellow-button my-8 my-sm-0 mr-sm-4"
            @click="closeForm"
            >Cansel</v-btn
          >
          <v-btn
            rounded
            color="buttons"
            large
            min-width="160"
            class="yellow-button"
            @click="sendData"
            >Submit</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

import CoverImage from '@/components/CoverImage.vue'
import VideoPdfs from '@/components/courses/VideoPdfs.vue'
import checkVideoLink from '@/helpers/checkVideoLink'

export default {
  name: 'UserCourseDatailVideo',
  components: {
    CoverImage,
    VideoPdfs
  },
  data () {
    return {
      courseId: this.$route.params.courseid,
      videoId: this.$route.params.videoid,
      // Video: null,
      // course: null,
      loading: false,
      volume: 0,
      showForm: false,
      nameOfVideo: '',
      description: '',
      imgFile: null
    }
  },
  computed: {
    ...mapState('courses', [
      // 'courses',
      'course',
      // 'videos',
      'video'
    ])
    // ...mapState('auth', ['user'])
  },
  watch: {},
  methods: {
    linkCheck (video) {
      return checkVideoLink(video)
    },
    closeForm () {
      // this.nameOfVideo = ''
      // this.videoFile = null
      // this.description = ''
      // this.imgFile = null
      // this.pdfFiles = new Array(3).fill(null)
      this.showForm = false
    },
    sendData () {
      const data = {
        name: this.nameOfVideo,
        description: this.description,
        imgFile: this.imgFile
      }
      const fd = new FormData()
      Object.entries(data).forEach(([name, value]) => {
        if (Array.isArray(value)) {
          Object.values(data[name]).forEach(value => {
            if (value) fd.append('files', value)
          })
        } else {
          if (value instanceof File) fd.append('file', value)
          else {
            if (value) fd.append(name, value)
          }
        }
      })
      this.$store.dispatch('userCourses/PUT_CURRENT_VIDEO', {
        fd,
        id: this.videoId
      })
      // this.clearFormInputs()
      this.showForm = false
    },
    async get () {
      await this.$store.dispatch(
        'courses/GET_COURSE',
        this.$route.params.courseid
      )
      await this.$store.dispatch(
        'courses/GET_FIND_VIDEO',
        this.$route.params.videoid
      ) // ?! <===<===
    }
  },
  created () {
    this.get()
  }
}
</script>

<style scoped>
.pdf-link:not(:last-child) {
  margin-right: 50px;
}
</style>
