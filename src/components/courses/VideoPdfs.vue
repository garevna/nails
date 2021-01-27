<template>
  <div>
    <v-card flat v-if="errors" class="mb-8 pdf-container"
      ><p class="error--text error-text">{{ errors[0] }}</p></v-card
    >
    <v-card flat class="d-flex">
      <div class="pdf-container pt-12" v-for="(pdf, index) in pdfs" :key="pdf._id">
        <span v-if="showRemove[index]" class="error--text show-tooltip-remove-pdf">remove pdf file</span>
        <a :href="pdf.link" target="_blank" class="pdf-link"><v-img src="@/assets/images/pdf.svg" width="50px" /></a>

        <v-icon @mouseover="show(index)" @mouseleave="hide(index)" large class="remove-pdf" @click="removePdf(pdf._id)"
          >mdi-close-circle-outline</v-icon
        >
      </div>
      <v-form ref="form" v-if="!pdfs || pdfs.length < schema.count">
        <div @mouseover="showAdd = true" @mouseleave="showAdd = false" class="pdf-container">
          <FileInput
            class="add-pdf pa-0 ma-0"
            :value.sync="data"
            :icon="schema.icon"
            :size="schema.size"
            :hideInput="schema.hideInput"
          />
          <span v-if="showAdd" class="error--text show-tooltip-add-pdf">add pdf file</span>
        </div>
      </v-form>
    </v-card>
  </div>
</template>
  <style>
.add-pdf .mdi-plus-circle-outline::before {
  content: '\F0419';
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
.show-tooltip-add-pdf {
  position: absolute;
  min-width: 80px;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
}
.show-tooltip-remove-pdf {
  position: absolute;
  min-width: 110px;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
}
.error-text {
  position: absolute;
  min-width: 500px;
  top: -30px;
  left: 50%;
  transform: translateX(-25%);
}
.remove-pdf {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>
<script>
import { mapState, mapActions } from 'vuex';

import FileInput from '@/components/inputs/FileInput.vue';
const schema = require('@/config/addPdfSchema').default;

export default {
  name: 'VideoPdfs',
  components: {
    FileInput,
  },
  data() {
    return {
      schema,
      showAdd: false,
      showRemove: [],
      data: null,
      errors: [],
    };
  },
  computed: {
    ...mapState('courses', ['course', 'video']),
    pdfs() {
      return this.video.pdfs;
    },
  },
  watch: {
    data(val) {
      if (!val) return;
      this.addPdf();
    },
    video(val) {
      if (!val) return;
      this.showRemove = new Array(val?.pdfs?.length).fill(false);
    },
  },
  methods: {
    ...mapActions('courses', {
      removePDF: 'REMOVE_PDF',
      addPDF: 'ADD_PDF',
    }),
    removePdf(id) {
      if (id) {
        this.removePDF({
          id,
          videoId: this.$route.params.videoid,
          currentCourseId: this.$route.params.courseid,
        });
      }
    },
    show(i) {
      this.showRemove = this.showRemove.map((item, index) => (index === i ? !item : item));
    },
    hide(i) {
      this.showRemove = this.showRemove.map((item, index) => (index === i ? !item : item));
    },
    addPdf() {
      if (this.data && this.$refs.form.validate()) {
        const fd = new FormData();
        fd.append('file', this.data);

        this.addPDF({
          fd,
          videoId: this.$route.params.videoid,
          currentCourseId: this.$route.params.courseid,
        });
        this.$refs.form.reset();
      }
      this.errors = this.$refs.form.$children[0].$children[0]?.errorBucket ?? [];
    },
  },
  mounted() {
    this.showRemove = new Array(this.video.pdfs?.length).fill(false);
  },
};
</script>
