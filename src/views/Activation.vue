<template>
<div>
  <h2>Activation account</h2>
</div>
</template>

<script>
export default {
  name: 'Activation',
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  mounted () {
    this.$store.dispatch('auth/ACTIVATION', this.$route.params.hash)
  }
}
</script>

<style scoped>
</style>
