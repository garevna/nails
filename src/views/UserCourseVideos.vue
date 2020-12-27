<template>
  <v-container fluid>
    <v-row class="d-flex justify-center">
      <v-col cols="12" xs="12">
        <h2 align="center">{{ course && course.nameOfCourse }}</h2>
      </v-col>
      <v-col cols="12" xs="12" v-if="noVideos">
        <h2 align="center">You don't have video yet</h2>
      </v-col>
      <v-col cols="12" xs="12" v-if="!ready">
        <Spinner />
      </v-col>
      <v-col v-if="videos && !showForm" cols="12" xs="12" class="d-flex justify-center flex-wrap">
        <v-card
        width="500"
        height="400"
          v-for="video in videos"
          :key="video._id"
          class="ma-4"
          @click="goToDetailVideo(video._id)"
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
              @click.stop="
                dialog = true;
                deleteId = video._id;
              "
              >Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" v-if="!showForm">
        <h3 align="center">{{ course && course.description }}</h3>
      </v-col>
      <v-col v-if="showForm" cols="12" xs="12" md="6">
        <v-form ref="form">
          <v-text-field
            label="name of video"
            :rules="[rules.required]"
            v-model="nameOfVideo"
            outlined
          />
          <v-file-input
            v-model="videoFile"
            show-size
            label="add video file"
            prepend-icon="mdi-video"
            :rules="[rules.required, rules.videoRule]"
            outlined
          />
          <!-- <v-progress-linear
            v-if="uploading"
            indeterminate
            color="yellow darken-2"
            class="my-4"
          ></v-progress-linear> -->
          <div>
            <v-textarea
              label="description"
              :rules="[rules.required]"
              v-model="description"
              outlined
            />
          </div>
          <div>
            <v-file-input
              v-model="imgFile"
              show-size
              accept="image/png, image/jpeg, image/bmp"
              :rules="[rules.imageRule]"
              prepend-icon="mdi-camera"
              label="add cover image"
              outlined
            />
          </div>
          <div class="d-flex flex-column flex-md-row">
            <v-file-input
              v-model="pdfFiles[0]"
              prepend-icon="mdi-file-pdf-box"
              :rules="[rules.pdfRule]"
              label="add pdf file"
              outlined
            />
            <v-file-input
              v-model="pdfFiles[1]"
              prepend-icon="mdi-file-pdf-box"
              :rules="[rules.pdfRule]"
              class="mx-md-4"
              label="add pdf file"
              outlined
            />
            <v-file-input
              v-model="pdfFiles[2]"
              prepend-icon="mdi-file-pdf-box"
              :rules="[rules.pdfRule]"
              label="add pdf file"
              outlined
            />
          </div>
        </v-form>
        <div
          class="d-flex flex-column align-center flex-sm-row justify-sm-center my-8"
        >
          <v-btn
            rounded
            color="buttons"
            large
            min-width="160"
            class="yellow-button mr-sm-4 mb-8 mb-sm-0"
            @click="clearFormInputs()"
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
      <v-col
        cols="12"
        xs="12"
        class="d-flex justify-center"
        v-if="showBtnAddVideo"
      >
        <v-btn
          rounded
          color="buttons"
          large
          min-width="160"
          class="yellow-button"
          @click="showForm = true"
        >
          add video</v-btn
        >
      </v-col>
      <v-dialog v-model="dialog" persistent max-width="320">
        <v-card>
          <v-card-title> Do you really want to remove video ?</v-card-title>
          <v-card-actions class="justify-center">
            <v-btn
              color="buttons"
              rounded
              large
              class="yellow-button"
              text
              @click="canselHandler"
            >
              Disagree
            </v-btn>
            <v-btn
              color="buttons"
              rounded
              large
              class="yellow-button"
              text
              @click="deleteVideo"
            >
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

import CoverImage from '@/components/CoverImage.vue'
import Spinner from '@/components/Spinner.vue'
import checkVideoLink from '@/helpers/checkVideoLink'

export default {
  components: {
    Spinner,
    CoverImage
  },
  data () {
    return {
      loading: false,
      // courseId: this.$route.params.courseid,
      // videos: null,
      ready: true,
      showForm: false,
      // course: null,
      dialog: false,
      deleteId: null,
      nameOfVideo: '',
      videoFile: null,
      description: '',
      imgFile: null,
      pdfFiles: new Array(3).fill(null),
      rules: {
        videoRule: v =>
          v?.size < 1000000000 || 'Video size should be less than 1 GB!',
        imageRule: v =>
          !v || v.size < 2000000 || 'Image size should be less than 2 MB!',
        pdfRule: v =>
          !v || v.size < 100000000 || 'Video size should be less than 100 MB!',
        required: v => !!v || 'input is required'
      }
    }
  },
  computed: {
    ...mapState('courses', [
      // 'courses',
      'course'
      // 'videos',
      // 'video'
    ]),
    videos () {
      return this.course?.videos ?? []
    },
    noVideos () {
      return !this.videos.length
    },
    showBtnAddVideo () {
      return !this.showForm && this.videos.length < 5
    }
  },
  watch: {},
  methods: {
    linkCheck (video) {
      return checkVideoLink(video)
    },
    clearFormInputs () {
      this.nameOfVideo = ''
      this.videoFile = null
      this.description = ''
      this.imgFile = null
      this.pdfFiles = new Array(3).fill(null)
      this.showForm = false
    },
    canselHandler () {
      this.dialog = false
      this.deleteId = null
    },
    deleteVideo () {
      this.$store.dispatch('courses/DELETE_VIDEO', {
        id: this.deleteId,
        courseId: this.courseId
      })
      this.dialog = false
      this.deleteId = null
    },
    sendData () {
      const data = {
        name: this.nameOfVideo,
        videoFile: this.videoFile,
        description: this.description,
        imgFile: this.imgFile,
        pdfFiles: this.pdfFiles
      }
      const fd = new FormData()
      Object.entries(data).forEach(([name, value]) => {
        if (Array.isArray(value)) {
          Object.values(data[name]).forEach(value => {
            if (value) fd.append('files', value)
          })
        } else {
          if (value instanceof File) fd.append('files', value)
          else {
            if (value) fd.append(name, value)
          }
        }
      })
      if (this.$refs.form.validate()) {
        // this.$store.dispatch('userCourses/CREATE_VIDEOS_COURSE', {
        //   fd,
        //   id: this.courseId
        // })
        this.$store.dispatch('courses/POST_VIDEOS', {
          fd,
          id: this.$route.params.courseid
        })
        this.clearFormInputs()
      }
    },
    goToDetailVideo (id) {
      this.$router.push({
        name: 'user-video',
        params: {
          videoid: id
        }
      })
    },
    async getVideos () {
      this.loading = true
      await this.$store.dispatch(
        'courses/GET_COURSE',
        this.$route.params.courseid
      )
      // await this.$store.dispatch(
      //   'courses/GET_FIND_VIDEO',
      //   this.$route.params.courseid
      // ) // ?! <===
      this.loading = false
    }
  },
  // mounted () {},
  created () {
    this.getVideos()
  }
}
</script>

<style></style>
