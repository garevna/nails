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
        <!-- <v-img :src="video.coverImg.link" contain></v-img> -->
        <v-img :src="checkUrl(video)" contain></v-img>
        <v-card flat class="d-flex justify-center mt-16">
          <!-- <a
            v-for="pdf in video.pdfs"
            :key="pdf._id"
            :href="pdf.link"
            target="_blank"
            class="pdf-link"
            ><v-img src="@/assets/images/pdf.svg" width="50px"
          /></a> -->
          <VideoPdfs
            :currentCourseId="currentCourseId"
            :videoId="videoId"
            :user="user"
          />
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
        <v-form ref="form" >
            <v-text-field
              label="name of video"
              v-model="nameOfVideo"
              outlined
            />
            <v-textarea label="description" v-model="description" outlined />
            <v-file-input v-model="imgFile" label="add cover image " outlined />
        </v-form>
        <div class="d-flex flex-column align-center flex-sm-row justify-sm-center">
           <v-btn
            rounded
            color="buttons"
            large
            min-width="160"
            class="yellow-button  my-8 my-sm-0 mr-sm-4"
            @click="closeForm"
            >Cansel</v-btn
          >
          <v-btn
            rounded
            color="buttons"
            large
            min-width="160"
            class="yellow-button "
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
      coverImageSrc: require('@/assets/noImage.jpg'),
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
      description: '',
      imgFile: null
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
      this.description = val.description
      // this.imgFile = val.coverImg.link
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
    checkUrl (card) {
      let img
      if (card.coverImg?.link) {
        img = card.coverImg.link
      }
      if (!img) {
        img = this.coverImageSrc
      }
      return img
    },
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
      this.$store.dispatch('userCourses/GET_VIDEO_COURSE_ID', this.videoId)
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
