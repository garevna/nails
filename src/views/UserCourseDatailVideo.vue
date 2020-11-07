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
      <v-col cols="12" xs="12" offset-md="2" md="8">
        <vue-core-video-player
          v-if="!loading && video"
          :src="video.link"
          :volume.sync="volume"
        />
      </v-col>
      <v-col cols="12" xs="12" offset-md="2" md="8">
        <v-card-title>{{ video.description }}</v-card-title>
      </v-col>
      <v-col cols="12" xs="12" offset-md="2" md="8">
        <v-img :src="video.coverImg.link" contain></v-img>
        <v-card  flat class="d-flex justify-center mt-16">
          <a
            v-for="pdf in video.pdfs"
            :key="pdf._id"
            :href="pdf.link"
            target="_blank"
            class="pdf-link"
            ><v-img src="@/assets/images/pdf.svg" width="50px"/></a
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      courseId: this.$route.params.courseid,
      videoId: this.$route.params.videoid,
      video: null,
      course: null,
      loading: true,
      volume: 0,
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
      ]
    }
  },
  computed: {
    // ...mapState('userCourses', ['userCourses']),
    ...mapState('auth', ['user'])
  },
  watch: {
    user (newVal) {
      this.items[0].text = `${newVal.firstName} cabinet`
      this.items[1].text = `${newVal.firstName} courses`
    },
    video (val) {
      if (!val) return
      this.items[4].text = `${val.name}`
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
    async getCourseVideos () {
      const { onlineCourse, error } = await (
        await fetch(
          `https://nails-australia-staging.herokuapp.com/course/online/${this.courseId}`
        )
      ).json()
      if (!error) {
        this.course = onlineCourse
        console.log(onlineCourse)
        // this.videos = onlineCourse.videos
        this.ready = true
      }
    },
    async getVideoById () {
      const { video, error } = await (
        await fetch(
          `https://nails-australia-staging.herokuapp.com/course/online/findvideo/${this.videoId}`
        )
      ).json()
      if (!error) {
        this.video = video
        this.loading = false
      }
      console.log(video)
    }
  },
  created () {
    this.fillingInTheFields()
    this.getVideoById()
    this.getCourseVideos()
  }
}
</script>

<style scoped>
.pdf-link:not(:last-child){
  margin-right: 50px;
}
</style>
