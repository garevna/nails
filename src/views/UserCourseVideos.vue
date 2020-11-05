<template>
  <v-container>
    <v-row>
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
      <h2 v-if="!videos && ready">you don't have video yet</h2>
      <h2 v-if="!ready">loader</h2>
      <v-col v-if="videos" cols="12" xs="12" offset-sm="3" sm="6">
        <v-card
          flat
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
            <v-file-input v-model="imgFile" label="add image file" outlined />
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
          class="yellow-button"
          @click="sendData"
          >PROCEED AND CHECKOUT</v-btn
        >
      </v-col>
      <v-btn @click="showForm = true"> add video</v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      courseId: this.$route.params.courseid,
      videos: null,
      ready: false,
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
          href: '/user-cabinet/user-courses'
        },
        {
          text: '',
          disabled: true,
          href: '#'
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
  methods: {
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
      const { updatedonline, error } = await (
        await fetch(
          `https://nails-australia-staging.herokuapp.com/course/online/video/${this.courseId}`,
          {
            method: 'POST',
            body: fd
          }
        )
      ).json()
      if (!error) {
        console.log(updatedonline)
        this.videos = updatedonline.videos
        this.showForm = false
        this.ready = true
      }
    },
    async getCourseVideos () {
      const { onlineCourse, error } = await (
        await fetch(
          `https://nails-australia-staging.herokuapp.com/course/online/${this.courseId}`
        )
      ).json()
      if (!error) {
        this.videos = onlineCourse.videos
        this.ready = true
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
  created () {
    this.getCourseVideos()
  }
}
</script>

<style></style>
