<template>
  <div class="upload-dialog">
    <h1>Upload files</h1>
    <!-- <div v-for="(item, index) in queue" :key="index">
    <p>{{ item.progress }}</p>
  </div> -->
    <v-progress-linear v-for="(item, index) in queue" :key="index" v-model="item.progress" color="blue-grey" height="25">
      <template v-slot:default="{ value }">
        <strong>{{ Math.ceil(value) }}%</strong>
      </template>
    </v-progress-linear>
  </div>
</template>

<style lang="scss">
</style>

<style>
.upload-dialog {
  width: 400px;
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: brown;
  z-index: 20;
}
</style>

<script>
// eslint-disable-next-line no-unused-vars
import { mapState, mapActions } from 'vuex'

export default {
  name: 'UploadFiles',
  components: {},
  data () {
    return {
      queue2: [
        {
          progress: 50,
          error: false
        },
        {
          progress: 0,
          error: false
        },
        {
          progress: 0,
          error: false
        },
        {
          progress: 0,
          error: false
        },
        {
          progress: 0,
          error: false
        }
      ]
    }
  },
  computed: {
    ...mapState('courses', ['queue']),
    filtered () {
      return this.queue.filter(obj => !obj.error)
    }
  },
  watch: {
    queue: {
      // '$store.courses.queue': {
      immediate: true,
      handler: function (newVal, oldVal) {
        console.log('================')
        // console.log(newVal, oldVal)
        console.log('length: ', newVal?.length, oldVal?.length)
        console.log('eqval: ', newVal !== oldVal)
        if (newVal?.length && newVal?.length !== oldVal?.length) {
          this.$store.dispatch('courses/ADD_LESSON', newVal[0])
        }
        console.log()
      }
    }
  },
  methods: {},
  created () {},
  beforeDestroy () {}
}
</script>
