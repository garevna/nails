<template>
  <div>
    <v-card flat v-if="errors" class="mb-8"
      ><p class="error--text">{{ errors[0] }}</p></v-card
    >
    <v-card flat class="d-flex">
      <div v-for="pdf in pdfs" :key="pdf._id" class="d-flex flex-column align-center mx-4">
        <v-tooltip top color="primary">
          <template v-slot:activator="{ on, attrs }">
            <v-btn  :disabled="disabled" v-on="on" v-bind="attrs" icon color="primary" @click="removePdf(pdf._id)">
              <v-icon large>mdi-close-circle-outline</v-icon>
            </v-btn>
          </template>
          <span>Remove pdf file</span>
        </v-tooltip>
        <a :href="pdf.link" target="_blank" class="mt-4"><v-img src="@/assets/images/pdf.svg" width="50px" /></a>
      </div>
      <v-form ref="form" v-if="!pdfs || pdfs.length < schema.count" class="mx-4">
        <IconFileInput
          :value.sync="data"
          colorIcon="primary"
          colorText="primary"
          text="Add pdf file"
          icon="mdi-plus-circle-outline"
          :accept="schema.accept"
          :size="5000"
          :disabled="disabled"
        />
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import IconFileInput from '@/components/inputs/IconFileInput.vue';
const schema = require('@/config/addPdfSchema').default;

export default {
  name: 'VideoPdfs',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    IconFileInput,
  },
  data() {
    return {
      schema,
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
          lessonId: this.$route.params.lessonid,
          currentCourseId: this.$route.params.courseid,
        });
      }
    },
    addPdf() {
      if (this.data && this.$refs.form.validate()) {
        const fd = new FormData();
        fd.append('file', this.data);

        this.addPDF({
          fd,
          lessonId: this.$route.params.lessonid,
          currentCourseId: this.$route.params.courseid,
        });
        this.$refs.form.reset();
      }
      this.errors = this.$refs.form.inputs[0]?.errorBucket ?? [];
    },
  },
};
</script>
