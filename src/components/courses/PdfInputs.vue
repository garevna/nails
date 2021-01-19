<template>
  <div
    class="d-flex flex-column flex-sm-row flex-md-column flex-lg-row"
  >
    <FileInput
      v-for="(pdf, index) in data"
      :key="index"
      :value.sync="data[index]"
      :label="options.label"
      :icon="options.icon"
      :size="options.size"
      :required="options.required"
    />
  </div>
</template>
<style scoped>
/* .pdf-input:not(:last-child) {
  margin-right: 25px;
} */
</style>
<script>
import FileInput from '@/components/inputs/FileInput.vue'

// const schema = require('@/config/uploadVideosSchema').default

export default {
  props: {
    pdfs: {
      type: Array,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
  name: 'PdfInputs',
  components: {
    FileInput
  },
  data () {
    return {
    }
  },
  computed: {
    data: {
      get () {
        return this.pdfs
      },
      set (val) {
        this.$emit('update:pdfs', val)
      }
    }
  },
  watch: {
    // localData: {
    //   deep: true,
    //   handler (val) {
    //     this.$emit('update:data', val)
    //   }
    // }
  },
  methods: {}
}
</script>
