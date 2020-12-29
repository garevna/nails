<template>
  <div>
    <v-form ref="form">
      <v-text-field
        label="name of video"
        :rules="[rules.required]"
        v-model="dataVideo.name"
        outlined
      />
      <v-file-input
        v-model="dataVideo.videoFile"
        show-size
        label="add video file"
        prepend-icon="mdi-video"
        :rules="[rules.required, rules.videoRule]"
        outlined
      />
      <!-- <v-progress-linear
            v-if="uploading"
            indeterminate
            color="yellow darken-2"
            class="my-4"
          ></v-progress-linear> -->
      <div>
        <v-textarea
          label="description"
          :rules="[rules.required]"
          no-resize
          rows="6"
          v-model="dataVideo.description"
          outlined
        />
      </div>
      <div>
        <v-file-input
          v-model="dataVideo.imgFile"
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
          v-model="dataVideo.pdfFiles[0]"
          prepend-icon="mdi-file-pdf-box"
          :rules="[rules.pdfRule]"
          label="add pdf file"
          outlined
        />
        <v-file-input
          v-model="dataVideo.pdfFiles[1]"
          prepend-icon="mdi-file-pdf-box"
          :rules="[rules.pdfRule]"
          class="mx-md-4"
          label="add pdf file"
          outlined
        />
        <v-file-input
          v-model="dataVideo.pdfFiles[2]"
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
        @click="clearFormInputs"
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
  </div>
</template>

<script>
export default {
  name: 'AddVideoForm',
  props: ['showForm'],
  data () {
    return {
      dataVideo: {
        name: '',
        videoFile: null,
        description: '',
        imgFile: null,
        pdfFiles: new Array(3).fill(null)
      },
      rules: {
        videoRule: v =>
          v?.size < 1000000000 || 'Video size should be less than 1 GB!',
        imageRule: v =>
          !v || v.size < 2000000 || 'Image size should be less than 2 MB!',
        pdfRule: v =>
          !v || v.size < 100000000 || 'Video size should be less than 100 MB!',
        required: v => !!v || 'input is required'
      }
    }
  },
  methods: {
    clearFormInputs () {
      this.dataVideo.name = ''
      this.dataVideo.videoFile = null
      this.dataVideo.description = ''
      this.dataVideo.imgFile = null
      this.dataVideo.pdfFiles = new Array(3).fill(null)
      this.$emit('update:showForm', false)
    },
    sendData () {
      const fd = new FormData()
      Object.entries(this.dataVideo).forEach(([name, value]) => {
        if (Array.isArray(value)) {
          Object.values(this.dataVideo[name]).forEach(value => {
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
        // this.$store.dispatch('userCourses/CREATE_VIDEOS_COURSE', {
        //   fd,
        //   id: this.courseId
        // })
        this.$store.dispatch('courses/POST_VIDEOS', {
          fd,
          id: this.$route.params.courseid
        })
        this.clearFormInputs()
      }
    }
  }
}
</script>

<style>
</style>
