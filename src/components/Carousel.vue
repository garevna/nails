<template>
  <div v-if="images.length">
    <v-card
      v-if="viewportWidth >= 600"
      flat
      class="transparent px-sm-16"
      @mouseover="mouseover = true"
      @mouseleave="mouseover = false"
    >
      <v-btn class="right-arrow orange--text" icon large @click="right">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-btn class="left-arrow orange--text" icon large @click="left">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-slide-group v-model="model" center-active dark>
        <v-slide-item v-for="(image, index) in images" :key="index" v-slot:default="{}">
          <v-hover v-slot="{ hover }">
            <v-card flat class="ma-4" @click="goToInsta(image.shortcode)">
              <v-img :src="image.img.src" :height="image.img.height" :width="image.img.width" contain >
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out orange  v-card--reveal  pa-4"
                  style="height: 100%"
                >
                 <p class="textSlider--text text-left">{{ image.caption }}</p> 
                </div>
              </v-expand-transition>
                </v-img>
            </v-card>
          </v-hover>
        </v-slide-item>
      </v-slide-group>
    </v-card>
    <v-carousel
      v-else
      v-model="model"
      :continuous="true"
      :show-arrows="false"
      hide-delimiters
      light
      class="transparent"
    >
      <v-carousel-item v-for="(image, index) in images" :key="index">
        <v-card flat class="ma-4" hover  @click="goToInsta(image.shortcode)">
          <v-img :src="image.img.src" contain />
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Slider',
  data: () => ({
    model: 0,
    mouseover: false,
  }),
  computed: {
    ...mapState(['viewportWidth']),
    ...mapState('instagram', ['media']),
    widthIndex() {
      let index = 4;
      if (this.viewportWidth < 1904) index = 2;
      if (this.viewportWidth < 1264) index = 1;
      // if (this.viewportWidth < 960) index = 0;
      if (this.viewportWidth < 600) index = 0;
      return index;
    },
    images() {
      return this.media.map(item => ({
        img: item.thumbnails[this.widthIndex],
        caption: item.caption,
        shortcode: item.shortcode,
      }));
    },
  },
  methods: {
    next() {
      if (this.mouseover) return;
      this.right();
    },
    left() {
      if (this.model) this.model -= 1;
      else this.model = this.images.length - 1;
    },
    right() {
      if (this.model < this.images.length - 1) this.model += 1;
      else this.model = 0;
    },
    goToInsta(shortcode) {
      window.open(`${process.env.VUE_APP_INSTA_URL}/p/${shortcode}`);
      // this.model = index;
      // console.log(index);
    },
  },
  mounted() {
    setInterval(this.next, 5000);
  },
};
</script>
<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  /* opacity: 0.5; */
  position: absolute;
  width: 100%;
}

</style>
<style>
.v-slide-group.v-item-group > .v-slide-group__next,
.v-slide-group.v-item-group > .v-slide-group__prev {
  display: none !important;
}
.right-arrow {
  position: absolute;
  width: 50px;
  height: 50px;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
}
.left-arrow {
  position: absolute;
  width: 50px;
  height: 50px;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
}
</style>
