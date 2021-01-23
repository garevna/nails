<template>
<div>
  <v-card flat v-if="errors"  class="ma-4"><p class="error--text">{{ errors[0] }}</p></v-card>
  <v-card flat class="d-flex"
    >
    <div class="pdf-container pt-12" v-for="pdf in pdfs" :key="pdf._id">
      <a :href="pdf.link" target="_blank" class="pdf-link"
        ><v-img src="@/assets/images/pdf.svg" width="50px"
      /></a>

      <v-icon large class="remove-pdf" @click="removePdf(pdf._id)"
        >mdi-close-circle-outline</v-icon
      >
    </div>

    <v-form
      ref="form"
      v-if="!pdfs || pdfs.length < schema.count"
      class="plus-container"
    >
      <FileInput
        class="add-pdf pa-0 ma-0"
        :value.sync="data"
        :icon="schema.icon"
        :size="schema.size"
        :hideInput="schema.hideInput"
      />
    </v-form>
  </v-card>
</div>

</template>

<script>
import { mapState, mapActions } from 'vuex'

import FileInput from '@/components/inputs/FileInput.vue'
const schema = require('@/config/addPdfSchema').default

export default {
  name: 'VideoPdfs',
  components: {
    FileInput
  },
  data () {
    return {
      schema,
      data: null,
      errors: []
    }
  },
  computed: {
    ...mapState('courses', [
      'course',
      'video'
    ]),
    pdfs () {
      return this.video.pdfs
    }
  },
  watch: {
    data (val) {
      if (!val) return
      this.addPdf()
    }
  },
  methods: {
    ...mapActions('courses', {
      removePDF: 'REMOVE_PDF',
      addPDF: 'ADD_PDF'
    }),
    removePdf (id) {
      if (id) {
        this.removePDF({
          id,
          videoId: this.$route.params.videoid,
          currentCourseId: this.$route.params.courseid
        })
      }
    },
    addPdf () {
      if (this.data && this.$refs.form.validate()) {
        const fd = new FormData()
        fd.append('file', this.data)

        this.addPDF({
          fd,
          videoId: this.$route.params.videoid,
          currentCourseId: this.$route.params.courseid
        })
        this.$refs.form.reset()
      }
      this.errors =
          this.$refs.form.$children[0].$children[0]?.errorBucket ?? []
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
