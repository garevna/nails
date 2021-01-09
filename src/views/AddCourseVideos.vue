<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        xs="12"
        md="6"
        class="d-flex justify-center justify-md-end"
      >
        <v-btn
          rounded
          color="buttons"
          large
          dark
          min-width="160"
          class="yellow-button"
          :class="{ 'button-unactive': isActive }"
          :disabled="!courseId"
          @click="toggleBtn"
          >CONFIRM DETAILS</v-btn
        >
      </v-col>
      <v-col
        cols="12"
        xs="12"
        md="6"
        class="d-flex justify-center justify-md-start"
      >
        <v-btn
          color="buttons"
          rounded
          large
          dark
          min-width="160"
          class="yellow-button"
          @click="goToUserCourse"
          >EDIT DETAILS</v-btn
        >
      </v-col>
      <v-col cols="12" xs="12" md="6">
        <v-card flat dark class="secondaryGray">
          <v-card-title>Requirements to the video</v-card-title>
          <v-card-text
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint,
            doloremque. Vel, aliquid illo, adipisci magnam ratione explicabo
            voluptates, aperiam voluptate inventore ea aspernatur veniam fugit
            animi et nihil obcaecati quibusdam!</v-card-text
          >
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" md="6">
        <p>Upload video for moderation</p>
        <v-expansion-panels flat :disabled="!isActive">
          <v-expansion-panel v-for="(item, i) in uploadFiles" :key="i" class="d-flex flex-column align-center align-sm-stretch justify-sm-center ">
            <v-expansion-panel-header
              class="btn-open-video mb-4"
              :class="{ 'button-unactive': !isActive }"
              width="100%"
            >
              + add video {{ i + 1 }}
            </v-expansion-panel-header>
            <v-expansion-panel-content class="mt-8 ">
              <v-form :ref="`form${i}`">
                <div class="d-xl-flex">
                     <v-text-field
                    label="name of video"
                    v-model="item.name"
                    outlined
                    dark
                    class="mr-xl-4"
                  />
                  <v-file-input
                    label="video file"
                    show-size
                    prepend-icon="mdi-video"
                    accept="video/mp4"
                    v-model="item.videoFile"
                    :rules="[rules.videoRule]"
                    outlined
                    dark
                    class="ml-xl-4"
                  />
                </div>
                  <v-progress-linear
                    v-if="uploading"
                    indeterminate
                    color="yellow darken-2"
                    class="my-4"
                  ></v-progress-linear>
                <div class="d-xl-flex">
                  <v-textarea
                     class="mr-xl-4"
                    label="description"
                    v-model="item.description"
                    outlined
                    dark
                  />
                  <v-file-input
                    class="ml-xl-4"
                    v-model="item.imgFile"
                    label="image file"
                    show-size
                    prepend-icon="mdi-camera"
                    accept="image/png, image/jpeg, image/bmp"
                    :rules="[rules.imageRule]"
                    outlined
                    dark
                  />
                </div>
                <div class="d-flex flex-column flex-sm-row flex-md-column flex-lg-row">
                  <v-file-input
                    v-model="item.pdfFiles[0]"
                    prepend-icon="mdi-file-pdf-box"
                    :rules="[rules.pdfRule]"
                    label="pdf file"
                    outlined
                    dark
                  />
                  <v-file-input
                    v-model="item.pdfFiles[1]"
                    class="px-sm-4 px-md-0 px-lg-4"
                    prepend-icon="mdi-file-pdf-box"
                    :rules="[rules.pdfRule]"
                    label="pdf file"
                    outlined
                    dark
                  />
                  <v-file-input
                    v-model="item.pdfFiles[2]"
                    prepend-icon="mdi-file-pdf-box"
                    :rules="[rules.pdfRule]"
                    label="pdf file"
                    outlined
                    dark
                  />
                </div>
              </v-form>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col cols="12" xs="12" class="pa-0 my-8 d-flex justify-center">
        <v-btn
          rounded
          color="buttons"
          large
          dark
          min-width="160"
          :disabled="!validate || loading"
          class="yellow-button"
          @click="sendData"
          >PROCEED AND CHECKOUT</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss">
@import "@/css/variables.scss";

.v-expansion-panel-content__wrap {
  /* GLOBAL  */
  padding: 0 0 0 !important;
}
.theme--dark.v-expansion-panels .v-expansion-panel {
  background-color: $homefoneDark;
}
</style>
<style scoped>
.v-expansion-panels:not(.v-expansion-panels--accordion):not(.v-expansion-panels--tile)
  > .v-expansion-panel--next-active
  .v-expansion-panel-header {
  border-bottom-left-radius: 40px !important;
  border-bottom-right-radius: 40px !important;
}
.theme--light.v-expansion-panels .v-expansion-panel {
  background-color: #262624 !important;
}
.v-expansion-panel--active > .v-expansion-panel-header {
  min-height: unset !important;
}
.btn-open-video {
  width: 150px;
  height: 50px;
  border-radius: 40px;
  color: #fff;
  /* margin-bottom: 15px; */
  /* box-shadow: 0 6px rgb(15 15 15), 0 3px 15px rgba(0,0,0,.4), inset 0 1px rgba(255,255,255,.3), inset 0 0 3px rgba(255,255,255,.5); */
  transition: 0.2s;
  box-shadow: inset -1px 2px 2px rgba(255, 255, 255, 0.5),
    inset 1px -2px 2px rgba(0, 0, 0, 0.5);
}
.v-expansion-panel--active > .btn-open-video {
  background: rgb(38 38 36) linear-gradient(rgb(38 38 36) 20%, rgb(18 18 17));
  /* box-shadow: 0 2px rgb(12 12 12), 0 1px 6px rgba(0,0,0,.4), inset 0 1px rgba(255,255,255,.3), inset 0 0 3px rgba(255,255,255,.5); */
  box-shadow: inset 1px -2px 2px rgba(255, 255, 255, 0.5),
    inset -1px 2px 2px rgba(0, 0, 0, 0.5);
  transform: translate(0, 4px);
}

.button-unactive {
  background-color: rgba(255, 255, 255, 0.12) !important;
  color: rgba(255, 255, 255, 0.3) !important;
}
</style>
<script>
import { mapState } from 'vuex'

export default {
  name: 'add-course-videos',
  components: {
    // PaymentDetailsForm
  },
  data () {
    return {
      isActive: false,
      courseId: this.$route.params.courseid,
      skill: '50',
      uploadFiles: [
        {
          name: '',
          videoFile: null,
          description: '',
          imgFile: null,
          pdfFiles: new Array(3).fill(null)
        },
        {
          name: '',
          videoFile: null,
          description: '',
          imgFile: null,
          pdfFiles: new Array(3).fill(null)
        },
        {
          name: '',
          videoFile: null,
          description: '',
          imgFile: null,
          pdfFiles: new Array(3).fill(null)
        },
        {
          name: '',
          videoFile: null,
          description: '',
          imgFile: null,
          pdfFiles: new Array(3).fill(null)
        },
        {
          name: '',
          videoFile: null,
          description: '',
          imgFile: null,
          pdfFiles: new Array(3).fill(null)
        }
      ],
      rules: {
        videoRule: v => !v || v.size < 1000000000 || 'Video size should be less than 1 GB!',
        imageRule: v => !v || v.size < 2000000 || 'Image size should be less than 2 MB!',
        pdfRule: v => !v || v.size < 100000000 || 'Video size should be less than 100 MB!'
      }
    }
  },
  computed: {
    validate () {
      const validArray = this.uploadFiles.map((item) =>
        this.validateFile(item)
      )
      return this.validateFiles(validArray)
    },
    ...mapState('auth', ['user']),
    ...mapState('userCourses', ['currentCourseVideos', 'loading', 'uploading'])
  },
  watch: {
    currentCourseVideos (videos) {
      if (!videos) return
      this.$router.push({
        name: 'user-course',
        params: {
          courseid: this.courseId
        }
      })
    }
  },
  methods: {
    validateFile (file) {
      if (this.validateObj(file)) {
        return 'required fields are filled'
      }
      if (this.isEmtyObj(file)) {
        return 'all fields emty'
      }
      return 'required fields are not filled'
    },
    validateFiles (arr) {
      return (
        arr.includes('required fields are filled') &&
        !arr.includes('required fields are not filled')
      )
    },
    validateObj (obj) {
      return obj.name && obj.videoFile && obj.description
    },
    filteredData (arr) {
      return arr.filter((item) => !this.isEmtyObj(item)).map(obj => this.clearEmtyFields(obj))
    },
    isEmtyObj (obj) {
      const keys = Object.keys(obj)
      return !keys.reduce(
        (accum, key) => (this.isEmty(obj[key]) ? accum : accum + 1),
        0
      )
    },
    clearEmtyFields (obj) {
      const arr = Object.entries(obj)
      const resObj = Array.isArray(obj) ? [] : {}
      arr.forEach(([key, value]) => {
        if (Array.isArray(obj[key])) {
          const arr = this.clearEmtyFields(obj[key])
          if (arr.length) resObj[key] = arr
        } else {
          if (value) (resObj[key] = value)
        }
      })
      return resObj
    },
    isEmty (item) {
      let emty = !item
      if (Array.isArray(item)) {
        emty = !item.some((item) => !!item)
      }
      return emty
    },
    sendData () {
      const dataArr = this.filteredData(this.uploadFiles)
      dataArr.forEach((obj, index) => {
        const fd = new FormData()
        Object.entries(obj).forEach(([name, value]) => {
          if (Array.isArray(obj[name])) {
            Object.values(obj[name]).forEach((value) =>
              fd.append('files', value)
            )
          } else {
            if (obj[name] instanceof File) fd.append('files', value)
            else fd.append(name, value)
          }
        })
        if (this.$refs[`form${index}`][0].validate()) {
          this.$store.dispatch('userCourses/CREATE_VIDEOS_COURSE', { id: this.courseId, fd, userId: this.user._id })
        }
      })
    },
    toggleBtn () {
      this.isActive = !this.isActive
    },
    goToUserCourse () {
      this.$router.push({
        name: 'user-course',
        params: {
          courseid: this.courseId
        }
      })
    }
  }
}
</script>
