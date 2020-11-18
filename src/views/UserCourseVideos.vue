<template>
  <v-container fluid>
    <v-row class="d-flex justify-center">
      <v-col cols="12" xs="12" class="d-flex justify-start">
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
        <h2 align="center">{{ currentCourse.nameOfCourse }}</h2>
      </v-col>
      <v-col cols="12" xs="12" v-if="noVideos">
        <h2 align="center">You don't have video yet</h2>
      </v-col>
      <v-col cols="12" xs="12" v-if="!ready">
        <Spinner />
      </v-col>
      <v-col
        cols="12"
        xs="12"
        sm="6"
        lg="4"
        v-for="(video, index) in videos"
        :key="video._id"
      >
        <v-card
          v-if="videos && !showForm"
          class="my-8"
          @click="goToDetailVideo(video._id)"
        >
          <v-card-title class="d-flex justify-center"
            ><h2>
              {{ video.name }}
            </h2></v-card-title
          >
          <!-- <v-img :src="coverImage(index)" height="350px"></v-img> -->
          <CoverImage :url="coverImage(index)" :height="350" />
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
      <v-col cols="12" xs="12">
        <h3 align="center">{{ currentCourse.description }}</h3>
      </v-col>
      <v-col
        v-if="showForm"
        cols="12"
        xs="12"
        offset-sm="2"
        sm="8"
        offset-md="3"
        md="6"
      >
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
          <v-progress-linear
            v-if="uploading"
            indeterminate
            color="yellow darken-2"
            class="my-4"
          ></v-progress-linear>
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

export default {
  components: {
    Spinner,
    CoverImage
  },
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
      pdfFiles: new Array(3).fill(null),
      rules: {
        videoRule: v => v?.size < 1000000000 || 'Video size should be less than 1 GB!',
        imageRule: v => !v || v.size < 2000000 || 'Image size should be less than 2 MB!',
        pdfRule: v => !v || v.size < 100000000 || 'Video size should be less than 100 MB!',
        required: (v) => !!v || 'input is required'
      }
    }
  },
  computed: {
    ...mapState('userCourses', [
      'currentCourse',
      'currentCourseId',
      'currentCourseVideos',
      'uploading'
    ]),
    ...mapState('auth', ['user']),
    noVideos () {
      return !this?.videos?.length && this.ready
    },
    showBtnAddVideo () {
      return !this.showForm && this.ready && this?.videos?.length < 5
    }
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
    currentCourse (newVal) {
      if (!newVal) return
      this.course = newVal
      this.fillingInTheFields()
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
    fillingInTheFields () {
      this.items[0].text = `${this.user.firstName} cabinet`
      this.items[1].text = `${this.user.firstName} courses`
    },
    deleteVideo () {
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
      if (this.$refs.form.validate()) {
        this.$store.dispatch('userCourses/CREATE_VIDEOS_COURSE', {
          fd,
          id: this.courseId
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
    }
  },
  // mounted () {},
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
