<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" xs="12">
        <v-breadcrumbs :items="items">
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item :disabled="item.disabled">
              <router-link
                :to="item.href"
                :class="{ 'disabled-link': item.disabled }"
              >
                {{ item.text.toUpperCase() }}</router-link
              >
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
      </v-col>
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
        <v-img :src="video.coverImg.link" contain></v-img>
        <v-card flat class="d-flex justify-center mt-16">
          <!-- <a
            v-for="pdf in video.pdfs"
            :key="pdf._id"
            :href="pdf.link"
            target="_blank"
            class="pdf-link"
            ><v-img src="@/assets/images/pdf.svg" width="50px"
          /></a> -->
          <VideoPdfs :pdfs="video.pdfs" :videoId="videoId"/>
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
        <form ref="form">
          <div class="d-flex">
            <v-text-field
              label="name of video"
              v-model="nameOfVideo"
              outlined
              width="50"
            />
          </div>
          <div class="d-flex">
            <v-file-input v-model="videoFile" label="add video file" outlined />
            <!-- <v-progress-linear v-model="skill" color="blue-grey" height="25">
              <template v-slot="{ value }">
                <strong>{{ Math.ceil(value) }}%</strong>
              </template>
            </v-progress-linear> -->
          </div>
          <div>
            <v-textarea label="description" v-model="description" outlined />
          </div>
          <div>
            <v-file-input v-model="imgFile" label="add cover image " outlined />
          </div>
          <div class="d-flex">
            <v-file-input v-model="pdfFiles[0]" label="add pdf file" outlined />
            <v-file-input v-model="pdfFiles[1]" label="add pdf file" outlined />
            <v-file-input v-model="pdfFiles[2]" label="add pdf file" outlined />
          </div>
        </form>
        <v-btn
          rounded
          color="buttons"
          large
          min-width="160"
          class="yellow-button mr-4"
          @click="sendData"
          >PROCEED AND CHECKOUT</v-btn
        >
        <v-btn
          rounded
          color="buttons"
          large
          min-width="160"
          class="yellow-button"
          @click="closeForm"
          >Cansel</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import VideoPdfs from '@/components/Courses/VideoPdfs.vue'
export default {
  components: {
    VideoPdfs
  },
  data () {
    return {
      courseId: this.$route.params.courseid,
      videoId: this.$route.params.videoid,
      video: null,
      course: null,
      loading: true,
      volume: 0,
      showForm: false,
      items: [
        {
          text: '',
          disabled: false,
          href: '/user-cabinet'
        },
        {
          text: '',
          disabled: false,
          href: '/user-cabinet/courses'
        },
        {
          text: '',
          disabled: false,
          href: `/user-cabinet/courses/${this.$route.params.courseid}`
          // href: ''
        },
        {
          text: 'videos',
          disabled: false,
          href: `/user-cabinet/courses/${this.$route.params.courseid}/videos`
        },
        {
          text: '',
          disabled: true,
          href: '#'
        }
      ],
      nameOfVideo: '',
      videoFile: null,
      description: '',
      imgFile: null,
      pdfFiles: new Array(3).fill(null)
    }
  },
  computed: {
    ...mapState('userCourses', [
      'currentCourse',
      'currentCourseId',
      'currentVideoId',
      'currentVideo'
    ]),
    ...mapState('auth', ['user'])
  },
  watch: {
    user (newVal) {
      this.fillingInTheFields()
    },
    currentVideo (val) {
      if (!val) return
      this.video = val
      this.nameOfVideo = val.name
      this.videoFile = val.link
      this.description = val.description
      this.imgFile = val.coverImg.link
      this.pdfFiles = val.pdfs
    },
    video (val) {
      if (!val) return
      this.items[4].text = `${val.name}`
      this.loading = false
      this.ready = true
    },
    currentCourse (val) {
      if (!val) return
      this.course = val
    },
    course (val) {
      if (!val) return
      this.items[2].text = `${val.nameOfCourse}`
    }
  },
  methods: {
    fillingInTheFields () {
      this.items[0].text = `${this.user.firstName} cabinet`
      this.items[1].text = `${this.user.firstName} courses`
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
        videoFile: this.videoFile,
        description: this.description,
        imgFile: this.imgFile,
        pdfFiles: this.pdfFiles
      }
      const fd = new FormData()
      Object.entries(data).forEach(([name, value]) => {
        if (Array.isArray(value)) {
          Object.values(data[name]).forEach((value) => {
            if (value) fd.append('files', value)
          })
        } else {
          if (value instanceof File) fd.append('files', value)
          else {
            if (value) fd.append(name, value)
          }
        }
      })
      this.$store.dispatch('userCourses/PUT_ONLINE_COURSE_ID', {
        fd,
        id: this.videoId
      })
      // this.clearFormInputs()
      this.showForm = false
    }
  },
  created () {
    if (this.user) {
      this.fillingInTheFields()
    }
    if (this.currentCourseId !== this.courseId) {
      this.$store.dispatch('userCourses/GET_USER_COURSE_ID', this.courseId)
    }
    if (this.currentVideoId !== this.videoId) {
      this.$store.dispatch('userCourses/GET_VIDEOS_COURSE_ID', this.videoId)
    }
    if (this.currentCourse && this.currentVideo) {
      this.course = this.currentCourse
      this.video = this.currentVideo
      this.items[2].text = this.course.nameOfCourse
      this.items[4].text = this.video.name
      this.loading = false
      this.ready = true
    }
  }
}
</script>

<style scoped>
.pdf-link:not(:last-child) {
  margin-right: 50px;
}
</style>
