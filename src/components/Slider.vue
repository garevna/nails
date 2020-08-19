<template>
  <div>
    <v-sheet
        class="mx-auto transparent"
        max-width="1440"
    >
      <v-slide-group
          v-model="model"
          class="pa-4"
          :show-arrows="true"
          :center-active="true"
      >
        <v-slide-item
            v-for="(image, index) in images"
            :key="index"
            v-slot:default="{ active, toggle }"
        >
          <v-card
                class="ma-4"
                height="280"
                width="200"
                @click="toggle"
          >
            <v-img :src="image" contain />
            <v-row
                class="fill-height"
                align="center"
                justify="center"
            >
              <v-scale-transition>
                <v-icon
                    v-if="active"
                    color="white"
                    size="48"
                ></v-icon>
              </v-scale-transition>
            </v-row>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<style scoped>
</style>

<script>
export default {
  name: 'Slider',
  data: () => ({
    model: null,
    images: [
      require('@/assets/images/1.png'),
      require('@/assets/images/2.png'),
      require('@/assets/images/3.png'),
      'http://lorempixel.com/200/280/sports',
      'http://lorempixel.com/200/280/animals',
      'http://lorempixel.com/200/280/people',
      'http://lorempixel.com/200/280/nature',
      'http://lorempixel.com/200/280/transport'
    ]
  })
}
</script>
