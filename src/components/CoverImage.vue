<template>
  <div>
    <v-img :src="imgUrl" :width="width" :height="height" @error="error = true"></v-img>
  </div>
</template>

<script>
export default {
  props: ['url', 'height', 'width'],
  data () {
    return {
      // imageUrl: this.url,
      error: false,
      coverImageSrc: require('@/assets/noImage.jpg')
    }
  },
  computed: {
    imgUrl () {
      return this.error || !this.url ? this.coverImageSrc : this.url
    }
  },
  watch: {
    url (val) {
      if (!val) return
      this.error = false
    }
  },
  methods: {
    // checkUrl (card) {
    //   let img
    //   if (card.photo instanceof File) {
    //     img = URL.createObjectURL(card.photo)
    //     return img
    //   }
    //   if (card.photo && Array.isArray(card.photo) && card.photo.length) {
    //     img = card.photo[0].link
    //   }
    //   if (!img) {
    //     img = this.coverImageSrc
    //   }
    //   return img
    // },
    // onError () {
    //   this.error = true
    // }
  }
}
</script>

<style>
</style>
