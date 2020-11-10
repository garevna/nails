<template>
  <v-container>
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

      <h2 v-if="!videos && ready">you don't have video yet</h2>
      <h2 v-if="!ready">loader</h2>
      <v-col v-if="videos" cols="12" xs="12" offset-sm="3" sm="6">
        <v-card
          class="my-8"
          v-for="(video, index) in videos"
          :key="video._id"
          @click="goToDetailVideo(video._id)"
        >
          <v-card-title class="d-flex justify-center"
            ><h2>
              {{ video.name }}
            </h2></v-card-title
          >
          <!-- <div>
              <vue-core-video-player :src="video.link" :volume.sync="volume" />
          </div> -->

          <v-img :src="coverImage(index)" contain></v-img>
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
      <v-col v-if="showForm" cols="12" xs="12" offset-sm="3" sm="6">
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
          @click="showForm = false"
          >Cansel</v-btn
        >
      </v-col>
      <v-col cols="12" xs="12" class="d-flex justify-center" v-if="!showForm">
        <v-btn @click="showForm = true"> add video</v-btn>
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
export default {
  components: {},
  data () {
    return {
      courseId: this.$route.params.courseid,
      videos: null,
      ready: false,
      showForm: false,
      course: null,
      dialog: false,
      deleteId: null,
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
      'currentCourseVideos'
    ]),
    ...mapState('auth', ['user'])
  },
  watch: {
    user (newVal) {
      if (!newVal) return
      this.fillingInTheFields()
    },
    course (val) {
      if (!val) return
      this.items[2].text = `${val.nameOfCourse}`
    },
    currentCourseVideos (videos) {
      if (!videos) return
      this.course = this.currentCourse
      this.videos = this.currentCourseVideos
      this.showForm = false
      this.ready = true
    }
  },
  methods: {
    canselHandler () {
      this.dialog = false
      this.deleteId = null
    },
    fillingInTheFields () {
      this.items[0].text = `${this.user.firstName} cabinet`
      this.items[1].text = `${this.user.firstName} courses`
    },
    deleteVideo () {
      console.log(this.courseId)
      this.$store.dispatch('userCourses/REMOVE_VIDEO_COURSE', {
        id: this.deleteId,
        courseId: this.courseId
      })
      this.dialog = false
      this.deleteId = null
    },
    coverImage (index) {
      return this.videos[index].coverImg?.link || this.coverImageSrc
    },
    async sendData () {
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
      this.$store.dispatch('userCourses/CREATE_VIDEOS_COURSE', {
        fd,
        id: this.courseId
      })
      this.showForm = false
    },
    goToDetailVideo (id) {
      this.$router.push({
        name: 'user-video',
        params: {
          videoid: id
        }
      })
    }
  },
  mounted () {},
  created () {
    if (this.currentCourseId !== this.courseId) {
      this.$store.dispatch('userCourses/GET_USER_COURSE_ID', this.courseId)
    } else {
      this.fillingInTheFields()
      this.items[2].text = `${this.currentCourse.nameOfCourse}`
      this.course = this.currentCourse
      this.videos = this.currentCourseVideos
      this.ready = true
    }
  }
}
</script>

<style></style>
