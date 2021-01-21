<template>
  <div>
    <div v-for="(item, name) in localData" :key="name">
      <TextInput
        v-if="schema[name].type === 'text'"
        :value.sync="localData[name]"
        :label="schema[name].label"
        :required="schema[name].required"
      />
      <FileInput
        v-if="schema[name].type === 'file'"
        :value.sync="localData[name]"
        :label="schema[name].label"
        :icon="schema[name].icon"
        :size="schema[name].size"
        :required="schema[name].required"
      />
      <PdfInputs
        v-if="schema[name].type === 'pdfFile'"
        :pdfs.sync="localData[name]"
        :options="schema[name]"
      />
      <TextAreaInput
        v-if="schema[name].type === 'textarea'"
        :value.sync="localData[name]"
        :label="schema[name].label"
        :required="schema[name].required"
      />
    </div>
  </div>
</template>

<script>
import TextInput from '@/components/inputs/TextInput.vue'
import TextAreaInput from '@/components/inputs/TextAreaInput.vue'
import FileInput from '@/components/inputs/FileInput.vue'
import PdfInputs from '@/components/courses/PdfInputs.vue'
const schema = require('@/config/uploadVideosSchema').default
export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  name: 'AddVideoItem',
  components: {
    TextInput,
    TextAreaInput,
    FileInput,
    PdfInputs
  },
  data () {
    return {
      schema: schema.item,
      localData: Object.entries(schema.item).reduce((acc, [key, value]) => {
        console.log(key, value)
        let field = ''
        if (value.type === 'pdfFile') {
          field = new Array(value.count).fill(null)
        }
        if (value.type === 'file') field = null
        return Object.assign(acc, { [key]: field })
      }, {})
    }
  },
  computed: {},
  watch: {
    localData: {
      deep: true,
      handler (val) {
        this.$emit('update:data', val)
      }
    }
  },
  methods: {}
}
</script>
