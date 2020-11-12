<template>
  <div>
    <div class="d-flex">
      <!-- <div>
        <div v-if="pdfs && pdfs[0]" class="pdf-container pt-12">
          <a :href="pdfs[0].link" target="_blank" class="mt-8"
            ><v-img src="@/assets/images/pdf.svg" width="50px"
          /></a>

          <v-icon large class="remove-pdf" @click="removePdf(pdfs[0]._id)"
            >mdi-close-circle-outline</v-icon
          >
        </div>
        <div v-else>
          <v-file-input hide-input v-model="pdfFiles[0]" @change="addPdf(0)" />
        </div>
      </div>
      <div>
        <div v-if="pdfs && pdfs[1]" class="pdf-container pt-12 mx-16">
          <a :href="pdfs[1].link" target="_blank" class="pdf-link"
            ><v-img src="@/assets/images/pdf.svg" width="50px"
          /></a>
          <v-icon large class="remove-pdf" @click="removePdf(pdfs[1]._id)"
            >mdi-close-circle-outline</v-icon
          >
        </div>

        <div v-else class="mx-16">
          <v-file-input hide-input v-model="pdfFiles[1]" @change="addPdf(1)" />
        </div>
      </div>
      <div>
        <div v-if="pdfs && pdfs[2]" class="pdf-container pt-12">
          <a :href="pdfs[2].link" target="_blank" class="pdf-link"
            ><v-img src="@/assets/images/pdf.svg" width="50px"
          /></a>
          <v-icon large class="remove-pdf" @click="removePdf(pdfs[2]._id)"
            >mdi-close-circle-outline</v-icon
          >
        </div>

        <div v-else>
          <v-file-input hide-input v-model="pdfFiles[2]" @change="addPdf(2)" />
        </div>
      </div> -->
            <div class="pdf-container pt-12" v-for="pdf in pdfs" :key="pdf._id">
          <a :href="pdf.link" target="_blank" class="pdf-link"
            ><v-img src="@/assets/images/pdf.svg" width="50px"
          /></a>

          <v-icon large class="remove-pdf" @click="removePdf(pdf._id)"
            >mdi-close-circle-outline</v-icon
          >
        </div>
         <div v-if="!pdfs || pdfs.length < 3" class="plus-container">
          <v-file-input class="add-pdf pa-0 ma-0" hide-input v-model="pdfFile" @change="addPdf"  prepend-icon="mdi-plus-circle-outline" />
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['currentCourseId', 'videoId', 'user'],
  data () {
    return {
      pdfFile: null
    }
  },
  computed: {
    ...mapState('userCourses', ['currentVideo']),
    pdfs () {
      return this.currentVideo.pdfs
    }
  },
  methods: {
    removePdf (id) {
      if (id) {
        this.$store.dispatch('userCourses/REMOVE_PDF', { id, videoId: this.videoId, userId: this.user._id, currentCourseId: this.currentCourseId })
      }
    },
    addPdf () {
      if (this.pdfFile) {
        const fd = new FormData()
        fd.append('file', this.pdfFile)

        this.$store.dispatch('userCourses/ADD_PDF', { fd, videoId: this.videoId, userId: this.user._id, currentCourseId: this.currentCourseId })
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
