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
          :disabled="!$route.params.courseid"
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
          <v-expansion-panel
            v-for="(field, i) in data"
            :key="i"
            class="d-flex flex-column align-center align-sm-stretch justify-sm-center"
          >
            <v-expansion-panel-header
              class="btn-open-video mb-4"
              :class="{ 'button-unactive': !isActive }"
              width="100%"
              @click="expansionIndex = i"
            >
              + add video {{ i + 1 }}
            </v-expansion-panel-header>
            <v-expansion-panel-content class="mt-8">
              <v-form :ref="`form${i}`">
                <AddVideoItem :data.sync="data[i]" :progress="progress[i]" />
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
          class="yellow-button"
          @click="sendData"
          >PROCEED AND CHECKOUT</v-btn
        >
        <!-- :disabled="!validate || loading" -->
      </v-col>
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
// eslint-disable-next-line no-unused-vars
import { mapState, mapActions } from 'vuex'
import AddVideoItem from '@/components/courses/AddVideoItem.vue'
const schema = require('@/config/uploadVideosSchema').default

export default {
  name: 'AddCourseVideos',
  components: {
    AddVideoItem
  },
  data () {
    return {
      isActive: false,
      expansionIndex: 0,
      data: new Array(schema.count).fill(null)
    }
  },
  computed: {
    // validate () {
    //   const validArray = this.uploadFiles.map(item => this.validateFile(item))
    //   return true || this.validateFiles(validArray)
    // },
    ...mapState('auth', ['user']),
    // ...mapState('userCourses', ['currentCourseVideos', 'loading', 'uploading'])
    ...mapState('courses', ['courses', 'queue']),
    videos () {
      return this?.courses?.videos ?? []
    },
    progress () {
      const arr = new Array(this.data.length).fill({
        progress: 0,
        error: false
      })
      this.queue.forEach(obj => {
        arr[obj.index].progres = obj.progress
        arr[obj.index].error = obj.error
      })
      return arr
    }
  },
  watch: {
    // queue: {
    //   // '$store.courses.queue': {
    //   immediate: true,
    //   handler: function (newVal, oldVal) {
    //     console.log('================')
    //     // console.log(newVal, oldVal)
    //     console.log('length: ', newVal?.length, oldVal?.length)
    //     console.log('eqval: ', newVal !== oldVal)
    //     if (newVal?.length && newVal?.length !== oldVal?.length) { this.$store.dispatch('courses/ADD_FILE', newVal[0]) }
    //     console.log()
    //   }
    // }
    // videos (videos) {
    //   if (!videos) return
    //   this.$router.push({
    //     name: 'user-course',
    //     params: {
    //       // courseid: this.courseId
    //       courseid: this.$route.params.courseid
    //     }
    //   })
    // }
  },
  methods: {
    ...mapActions('courses', {
      appVideos: 'APPEND_VIDEOS',
      appVideo: 'APPEND_VIDEO',
      postVideos: 'POST_VIDEOS'

    }),
    filteredData (arr) {
      return arr
        .filter(item => !this.isEmtyObj(item))
        .map(obj => this.clearEmtyFields(obj))
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
          if (value) resObj[key] = value
        }
      })
      return resObj
    },
    isEmty (item) {
      let emty = !item
      if (Array.isArray(item)) {
        emty = !item.some(item => !!item)
      }
      return emty
    },
    validationForms () {
      //  if (this.$refs[`form${index}`][0].validate()) {}
      return this.data // this.data.filter(obj => obj !== null)
    },
    async sendData () {
      const objs = this.validationForms()
      if (!objs.length) return
      console.log('text')
      const uploades = []

      objs.forEach(async (obj, index) => {
        if (!obj) return
        // eslint-disable-next-line no-unused-vars
        const { videoFile, ...data } = obj
        const fd = new FormData()
        const file = new FormData()
        file.append('file', videoFile)

        Object.entries(data).forEach(([name, value]) => {
          if (Array.isArray(data[name])) {
            Object.values(data[name]).forEach(
              value => value && fd.append('files', value)
            )
          } else {
            if (data[name] instanceof File) fd.append('files', value)
            else fd.append(name, value)
          }
        })

        // const res = await this.$store.dispatch('courses/POST_VIDEOS', {
        //   id: this.$route.params.courseid,
        //   fd
        // })
        const res = await this.$store.dispatch('courses/ADD_LESSON', {
          id: this.$route.params.courseid,
          fd
        })

        res?._id && uploades.push({
        // uploades.push({
          // id: res._id + index + 1,
          id: res._id,
          file,
          progress: 0,
          error: false,
          index
        })
        // if (res?._id) {
        //   uploades = [
        //     ...uploades,
        //     {
        //       id: res._id,
        //       file,
        //       progress: 0,
        //       index
        //     }
        //   ]
        // }
      })

      // this.$store.commit('courses/QUEUE', uploades)
      console.log(uploades)
      this.$store.dispatch('courses/ADD_QUEUE', uploades)
    },
    toggleBtn () {
      this.isActive = !this.isActive
    },
    goToUserCourse () {
      this.$router.push({
        name: 'user-course',
        params: {
          // courseid: this.courseId
          courseid: this.$route.params.courseid
        }
      })
    }
  },
  created () {
    // console.log(this.$store)
    // this.unwatch = this.$store.watch(
    //   (state, getters) => state.courses.queue,
    //   (newValue, oldValue) => {
    //     console.log(`Updating from ${oldValue.length} to ${newValue.length}`)
    //     console.log(`Noequals from ${oldValue !== newValue}`)
    //   }
    // )
  },
  beforeDestroy () {
    // this.unwatch()
  }
}
</script>
