<template>
  <v-hover v-slot="{ hover }" open-delay="100">
    <v-card
      :elevation="hover ? 16 : 2"
      :class="{ 'on-hover': hover }"
      @click="goToCourse(course._id)"
      :width="width"
      class="ma-4"
    >
        <h2 class="text-center items-text pa-4">{{ course.nameOfCourse }}</h2>
      <CoverImage :url="linkCheck(course)" />
      <div class="pa-4 d-flex">
        <v-chip :color="paid ? 'paidAndPublished' : 'notPaidAndPublished'"  text-color="white"> {{paid ? 'paid': 'not paid' }}</v-chip>
        <v-spacer />
        <v-chip :color="published ? 'paidAndPublished' : 'notPaidAndPublished'"  text-color="white"> {{published ? 'published': 'not published' }}</v-chip>
        <v-spacer />
        <v-chip :color="lessonsCounter ? 'paidAndPublished' : 'notPaidAndPublished'" text-color="white">{{lessonsCounter}} lessons </v-chip>
      </div>
      <hr class="mx-4" />
      <v-card-actions class="pa-4">
        <v-spacer />
        <v-btn
          :disabled="published"
          rounded
          color="buttons"
          class="yellow-button pa-4"
          @click.stop="removeCourse(course._id)"
          >Delete</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
import CoverImage from '@/components/CoverImage.vue';
import checkCourseLink from '@/helpers/checkCourseLink';
export default {
  name: 'UserCourseCard',
  props: {
    course: {
      type: Object,
      required: true,
    },
    goToCourse: {
      type: Function,
      required: true,
    },
    removeCourse: {
      type: Function,
      required: true,
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
  computed: {
    published() {
      return this?.course?.isPublished ?? false;
    },
    lessonsCounter() {
      return this?.course?.lessonsCounter ?? 0;
    },
    paid() {
      return this?.course?.isPaid ?? false;
    }
  },
  methods: {
    linkCheck(course) {
      return checkCourseLink(course);
    },
  },
};
</script>

<style scoped>
.items-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.spacing {
  letter-spacing: unset;
}
</style>
