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
      <v-col cols="12" xs="12" md="4">
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
      <v-col cols="12" xs="12" md="8">
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
              <h3 class="error-form error--text" v-if="!validates[i]">error</h3>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="mt-8">
              <v-form :ref="`form${i}`">
                <AddVideoItem :data.sync="data[i]"/>
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
          :disabled="disabledSubmit"
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
.error-form {
  position: absolute;
  top:50%;
  right:-50px;
  transform: translateY(-50%);
}
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
  transition: 0.2s;
  box-shadow: inset -1px 2px 2px rgba(255, 255, 255, 0.5),
    inset 1px -2px 2px rgba(0, 0, 0, 0.5);
}
.v-expansion-panel--active > .btn-open-video {
  background: rgb(38 38 36) linear-gradient(rgb(38 38 36) 20%, rgb(18 18 17));
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
import { mapState, mapActions } from 'vuex'

import AddVideoItem from '@/components/courses/AddVideoItem.vue'
const schema = require('@/config/uploadLessonsSchema').default

export default {
  name: 'AddCourseVideos',
  components: {
    AddVideoItem
  },
  data () {
    return {
      noValid: false,
      isActive: false,
      disabledSubmit: false,
      expansionIndex: 0,
      data: new Array(schema.count).fill(null),
      validates: new Array(schema.count).fill(true)
    }
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('courses', ['courses', 'queue']),
    validateFull () {
      return !this.validates.some(item => !item)
    },
    videos () {
      return this?.courses?.videos ?? []
    }
  },
  watch: {
    queue (val) {
      if (val.length) return
      this.goToVideos()
      this.disabledSubmit = false
    }
  },
  methods: {
    ...mapActions('courses', {
      getCourse: 'GET_COURSE',
      addQueue: 'ADD_QUEUE'
    }),
    isEmtyObj (obj) {
      const keys = Object.keys(obj)
      return !keys.reduce(
        (accum, key) => (this.isEmty(obj[key]) ? accum : accum + 1),
        0
      )
    },
    isEmty (item) {
      let emty = !item
      if (Array.isArray(item)) {
        emty = !item.some(item => !!item)
      }
      return emty
    },
    validationForms () {
      this.noValid = false
      return this.data.map((obj, index) => {
        if (!obj || this.isEmtyObj(obj)) {
          this.$refs[`form${index}`] &&
            this.$refs[`form${index}`][0].resetValidation()
          this.validates[index] = true
          return null
        }
        const valid = this.$refs[`form${index}`]
          ? this.$refs[`form${index}`][0].validate()
          : true
        this.noValid = this.noValid || !valid
        if (this.noValid) {
          this.validates[index] = false
          return null
        }
        this.validates[index] = true
        return obj
      })
    },
    async sendData () {
      const objs = this.validationForms()
      this.$forceUpdate()
      if (this.noValid) return
      if (!objs.some(obj => obj)) return
      objs.forEach(obj => {
        if (!obj) return
        obj.description = obj.description.split(' ').filter((str) => str).join(' ')
      })
      this.disabledSubmit = true
      const uploadLessons = []
      objs.forEach(async (obj, index) => {
        if (!obj) return
        const fd = new FormData()
        Object.entries(obj).forEach(([name, value]) => {
          if (Array.isArray(obj[name])) {
            Object.values(obj[name]).forEach(
              value => value && fd.append('files', value)
            )
          } else {
            if (obj[name] instanceof File) fd.append('files', value)
            else fd.append(name, value)
          }
        })
        uploadLessons.push({
          id: this.$route.params.courseid,
          lesson: fd,
          progress: 0,
          error: false,
          index
        })
      })
      this.addQueue(uploadLessons)
    },
    toggleBtn () {
      this.isActive = !this.isActive
    },
    goToUserCourse () {
      this.$router.push({
        name: 'user-course',
        params: {
          courseid: this.$route.params.courseid
        }
      })
    },
    goToVideos () {
      this.$router.push({ name: 'user-videos' })
    }
  },
  created () {
    this.getCourse(this.$route.params.courseid)
  },
  beforeDestroy () {}
}
</script>
