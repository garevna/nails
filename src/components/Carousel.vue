<template>
  <div v-if="data.length">
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

      <v-slide-group v-model="model" center-active dark class="hide-arrow">
        <v-slide-item v-for="(image, index) in data" :key="index" v-slot:default="{}">
          <v-hover v-slot="{ hover }">
            <v-card flat class="ma-4" @click="goToInsta(image.link)">
              <v-img :src="image.display_url" :height="dimension" :width="dimension" cover>
                <v-expand-transition>
                  <div
                    v-if="hover && image.text"
                    class="d-flex transition-fast-in-fast-out orange v-card--reveal pa-4"
                    style="height: 100%"
                  >
                    <p class="textSlider--text text-left items-text">{{ image.text }}</p>
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
      <v-carousel-item v-for="(image, index) in data" :key="index">
        <v-card flat class="ma-4" hover @click="goToInsta(image.link)">
          <v-img :src="image.display_url" contain />
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Carousel',
  data: () => ({
    model: 0,
    mouseover: false,
  }),
  computed: {
    ...mapState(['viewportWidth']),
    ...mapState('instagram', ['data']),
    dimension() {
      let dimension = 640;
      if (this.viewportWidth < 1904) dimension = 300;
      // if (this.viewportWidth < 1264) dimension = 400;
      // if (this.viewportWidth < 960) dimension = 360;
      if (this.viewportWidth < 600) dimension = 240;
      return dimension;
    },
  },
  methods: {
    next() {
      if (this.mouseover) return;
      this.right();
    },
    left() {
      if (this.model) this.model -= 1;
      else this.model = this.data.length - 1;
    },
    right() {
      if (this.model < this.data.length - 1) this.model += 1;
      else this.model = 0;
    },
    goToInsta(link) {
      window.open(link);
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
.items-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
}
</style>
<style>
.hide-arrow.v-slide-group.v-item-group > .v-slide-group__next,
.hide-arrow.v-slide-group.v-item-group > .v-slide-group__prev {
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
