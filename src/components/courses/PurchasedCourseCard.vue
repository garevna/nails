<template>
  <v-hover v-slot="{ hover }" open-delay="100">
    <v-card dark :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }" :width="width" class="ma-12">
      <CoverImage :url="linkCheck(course)" />
      <v-card-title class="buttons--text pa-0 pl-4 pt-4">
        {{ course.accessDays }} days | $ {{ course.price }}
      </v-card-title>
      <h3 class="pa-0 pl-4 my-2 text-truncate">{{ course.nameOfCourse }}</h3>
      <p class="pa-0 px-4 text-truncate spacing">{{ course.subtitle }}</p>
      <v-card-actions class="pl-4 pb-4">
        <v-btn
          color="buttons"
          rounded
          small
          min-width="90"
          dark
          class="yellow-button"
          @click="$emit('more')"
          >more</v-btn
        >
        <v-btn
          v-if="type === 'online'"
          color="buttons"
          rounded
          small
          min-width="90"
          dark
          class="yellow-button"
          @click="$emit('lessons')"
          >lessons</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
import CoverImage from '@/components/CoverImage.vue';
import checkCourseLink from '@/helpers/checkCourseLink';
export default {
  name: 'PurchasedCourseCard',
  props: {
    course: {
      type: Object,
      required: true,
    },  
    type: {
      type: String,
      default: 'online',
    },
    width: {
      type: String,
      default: '300',
    },
  },
  components: {
    CoverImage,
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    linkCheck(course) {
      return checkCourseLink(course);
    },
  },
};
</script>

<style scoped>
  .spacing {
    letter-spacing: unset;
  }
</style>