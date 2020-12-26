<template>
  <div>
    <div class="d-flex">
      <div class="pdf-container pt-12" v-for="pdf in pdfs" :key="pdf._id">
        <a :href="pdf.link" target="_blank" class="pdf-link"
          ><v-img src="@/assets/images/pdf.svg" width="50px"
        /></a>

        <v-icon large class="remove-pdf" @click="removePdf(pdf._id)"
          >mdi-close-circle-outline</v-icon
        >
      </div>
      <div v-if="!pdfs || pdfs.length < 3" class="plus-container">
        <v-file-input
          class="add-pdf pa-0 ma-0"
          hide-input
          v-model="pdfFile"
          @change="addPdf"
          prepend-icon="mdi-plus-circle-outline"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['currentCourseId', 'videoId'],
  data () {
    return {
      pdfFile: null
    }
  },
  computed: {
    ...mapState('courses', [
      // 'courses',
      'course',
      // 'videos',
      'video'
    ]),
    pdfs () {
      return this.video.pdfs
    }
  },
  methods: {
    removePdf (id) {
      if (id) {
        this.$store.dispatch('courses/REMOVE_PDF', { id, videoId: this.videoId, currentCourseId: this.currentCourseId })
      }
    },
    addPdf () {
      if (this.pdfFile) {
        const fd = new FormData()
        fd.append('file', this.pdfFile)

        this.$store.dispatch('courses/ADD_PDF', { fd, videoId: this.videoId, currentCourseId: this.currentCourseId })
      }
    }
  }
}
</script>
<style>
.add-pdf .mdi-plus-circle-outline::before {
  content: "\F0419";
  transform: scale(1.5);
}
</style>
<style scoped>
.pdf-container {
  position: relative;
}
.pdf-container:not(:last-child) {
  margin-right: 50px;
}
.remove-pdf {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>
