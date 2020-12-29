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
      <v-col
        v-if="videos && !showForm"
        cols="12"
        xs="12"
        class="d-flex justify-center flex-wrap"
      >
        <UserVideoCard
          v-for="video in videos"
          :key="video._id"
          :goToDetailVideo="goToDetailVideo"
          :video="video"
          :removeVideo="removeVideo"
        />
      </v-col>
      <v-col cols="12" xs="12" v-if="!showForm">
        <h3 align="center">{{ course && course.description }}</h3>
      </v-col>
      <v-col v-if="showForm" cols="12" xs="12" md="6">
        <AddVideoForm :showForm.sync="showForm"/>
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
      <DeletePopup :canselHandler="canselHandler" :deleteHandler="deleteVideo" name="video" :dialog="dialog"/>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

import UserVideoCard from '@/components/courses/UserVideoCard.vue'
import DeletePopup from '@/components/popups/DeletePopup.vue'
import Spinner from '@/components/Spinner.vue'
import AddVideoForm from '@/components/forms/AddVideoForm.vue'

export default {
  components: {
    Spinner,
    UserVideoCard,
    DeletePopup,
    AddVideoForm
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
      deleteId: null
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
    removeVideo (id) {
      this.dialog = true
      this.deleteId = id
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
