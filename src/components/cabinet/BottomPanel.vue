<template>
  <div class="d-flex flex-column flex-sm-row align-center justify-sm-space-around mt-16">
    <v-btn @click="goTo('courses')" color="buttons" rounded class="yellow-button btn-width"
      >All courses</v-btn
    >
    <v-btn @click="$router.push({ name: 'shop', params: { categoryName: 'curticle-nippers' } })" color="buttons" rounded class="yellow-button btn-width my-12 my-sm-0">Shop</v-btn>
    <v-btn @click="goTo('add-course')" color="buttons" rounded class="yellow-button btn-width"
      >Add course</v-btn
    >
  </div>
</template>

<script>
export default {
  name: 'BottomPanel',
  data () {
    return {
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    goTo (name) {
      this.$router.push({ name: name })
    }
  },
  beforeMount () {
  }
}
</script>

<style scoped>
.btn-width {
  width:200px;
}
</style>
