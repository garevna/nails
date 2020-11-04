<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        xs="12"
        sm="6"
        class="d-flex justify-center justify-sm-end"
      >
        <v-btn
          rounded
          color="buttons"
          large
          dark
          min-width="160"
          class="yellow-button"
          :class="{ 'button-unactive': isActive }"
          @click="toggleBtn"
          >CONFIRM DETAILS</v-btn
        >
      </v-col>
      <v-col
        cols="12"
        xs="12"
        sm="6"
        class="d-flex justify-center justify-sm-start"
      >
        <v-btn
          color="buttons"
          rounded
          large
          dark
          min-width="160"
          class="yellow-button"
          >EDIT DETAILS</v-btn
        >
      </v-col>
      <v-col cols="12" xs="12" sm="6">
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
      <v-col cols="12" xs="12" sm="6">
        <p>Upload video for moderation</p>
        <v-expansion-panels flat :disabled="!isActive">
          <v-expansion-panel v-for="(item, i) in uploadFiles" :key="i">
            <v-expansion-panel-header
              class="btn-open-video"
              :class="{ 'button-unactive': !isActive }"
            >
              + add video {{ i + 1 }}
            </v-expansion-panel-header>
            <v-expansion-panel-content class="mt-8">
              <div class="d-flex">
                <v-text-field
                  label="name of video"
                  v-model="item.nameOfVideo"
                  outlined
                  dark
                  width="50"
                />
              </div>
              <div class="d-flex">
                <v-file-input v-model="item.videoFile" outlined dark />
                <v-progress-linear
                  v-model="skill"
                  color="blue-grey"
                  height="25"
                >
                  <template v-slot="{ value }">
                    <strong>{{ Math.ceil(value) }}%</strong>
                  </template>
                </v-progress-linear>
              </div>
              <div>
                <v-textarea
                  label="description"
                  v-model="item.description"
                  outlined
                  dark
                />
              </div>
              <div>
                <v-file-input v-model="item.imgFile" outlined dark />
              </div>
              <div class="d-flex">
                <v-file-input v-model="item.pdfFiles[0]" outlined dark />
                <v-file-input v-model="item.pdfFiles[1]" outlined dark />
                <v-file-input v-model="item.pdfFiles[2]" outlined dark />
              </div>

              <!-- <v-btn
                color="buttons"
                rounded
                large
                dark
                width="180"
                class="yellow-button"
                :disabled="buttonUnactive"
                @click="upload"
                >UPLOAD VIDEO</v-btn
              > -->
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
          :disabled="!validate"
          class="yellow-button"
          @click="sendData"
          >PROCEED AND CHECKOUT</v-btn
        >
      </v-col>
      <!-- <PaymentDetailsForm/> -->
    </v-row>
  </v-container>
</template>
<style lang="scss">
@import '@/css/variables.scss';

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
  margin-bottom: 15px;
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
// import PaymentDetailsForm from '@/components/forms/PaymentDetailsForm.vue'
import { mapState } from 'vuex'

export default {
  name: 'add-course-payment',
  components: {
    // PaymentDetailsForm
  },
  data () {
    return {
      isActive: false,
      skill: '50',
      uploadFiles: [
        {
          nameOfVideo: '',
          videoFile: null,
          description: '',
          imgFile: null,
          pdfFiles: new Array(3).fill(null)
        },
        {
          nameOfVideo: '',
          videoFile: null,
          description: '',
          imgFile: null,
          pdfFiles: new Array(3).fill(null)
        },
        {
          nameOfVideo: '',
          videoFile: null,
          description: '',
          imgFile: null,
          pdfFiles: new Array(3).fill(null)
        },
        {
          nameOfVideo: '',
          videoFile: null,
          description: '',
          imgFile: null,
          pdfFiles: new Array(3).fill(null)
        },
        {
          nameOfVideo: '',
          videoFile: null,
          description: '',
          imgFile: null,
          pdfFiles: new Array(3).fill(null)
        }
      ]
    }
  },
  computed: {
    validate () {
      const validArray = this.uploadFiles.map((item) =>
        this.validateFile(item)
      )
      return this.validateFiles(validArray)
    },
    ...mapState('auth', ['user'])
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
      return obj.nameOfVideo && obj.videoFile && obj.description
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
    // sendData2 (fd) {
    //   fetch(
    //     'https://ptsv2.com/t/yeu3y-1602246042/post',
    //     {
    //       method: 'POST',
    //       body: fd
    //     }
    //   )
    // },
    sendData () {
      const dataArr = this.filteredData(this.uploadFiles)
      dataArr.forEach((obj) => {
        const fd = new FormData()
        Object.entries(obj).forEach(([name, value]) => {
          if (Array.isArray(obj[name])) {
            Object.values(obj[name]).forEach((value) =>
              fd.append('files[]', value)
            )
          } else {
            if (obj[name] instanceof File) fd.append('files[]', value)
            else fd.append(name, value)
          }
        })
        // this.sendData2(fd)
        this.$store.dispatch('userCourses/GREATE_VIDEO_COURSES ', { id: this.user._id, fd })
      })
    },
    // oldSendData () {
    //   const dataArr = this.filteredData(this.uploadFiles)
    //   dataArr.forEach((obj) => {
    //     const fd = new FormData()
    //     Object.entries(obj).forEach(([name, value]) => {
    //       if (Array.isArray(obj[name])) {
    //         Object.values(obj[name]).forEach((value) =>
    //           fd.append(`${name}[]`, value)
    //         )
    //       } else {
    //         fd.append(name, value)
    //       }
    //     })
    //     this.sendData2(fd)
    //   })
    // },
    toggleBtn () {
      this.isActive = !this.isActive
    }
  }
}
</script>
