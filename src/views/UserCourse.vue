<template>
  <v-container id="edit-form">
    <v-row>
      <v-col cols="12" xs="12" align="right">
        <v-btn
          v-if="course && !course.isPaid"
          @click="payDetail"
          rounded
          color="buttons"
          large
          min-width="160"
          class="yellow-button"
        >
          pay for the course</v-btn
        >
      </v-col>
      <v-col cols="12" xs="12" v-if="course && !editing">
        <CourseDetail :course="course" :type="type" btnTitle="BUY THIS COURSE" :preview="true"/>
      </v-col>
      <v-col cols="12" xs="12" md="7" v-if="editing">
        <AddCourseForm :course.sync="courseData" @submit="submit" @back="back" />
      </v-col>
      <v-col v-if="editing" cols="12" xs="12" md="5" class="d-flex flex-column justify-space-between align-center">
        <CourseCard :course="courseData" :type="type" :preview="true" />
      </v-col>
      <v-col cols="12" xs="12">
        <CourseDetail v-if="editing" :course="courseUpdate" :type="type" btnTitle="BUY THIS COURSE" :preview="true"/>
        <div class="d-flex flex-column align-center flex-sm-row justify-sm-center mt-8">
          <v-btn
            @click="goUploadVideos"
            v-if="!published && addVideos"
            color="buttons"
            rounded
            large
            dark
            min-width="160"
            class="yellow-button my-8 my-sm-0 mr-sm-8"
            >Upload video lessons of this course</v-btn
          >
          <v-btn
            @click="fillingForm"
            v-if="!editing"
            :disabled="published"
            color="buttons"
            rounded
            large
            dark
            min-width="160"
            class="yellow-button my-8 my-sm-0 mr-sm-8"
            >Edit</v-btn
          >
          <v-btn
            @click="goToVideos"
            v-if="addVideo"
            color="buttons"
            rounded
            large
            dark
            min-width="160"
            class="yellow-button"
            > go to all  video lessons of this course</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CourseDetail from '@/components/courses/CourseDetail.vue';
import CourseCard from '@/components/courses/CourseCard.vue';
import AddCourseForm from '@/components/forms/AddCourseForm.vue';
export default {
  components: {
    CourseDetail,
    CourseCard,
    AddCourseForm,
  },
  data() {
    return {
      courseData: null,
      editing: false,
      type: 'online',
    };
  },
  computed: {
    ...mapState('courses', ['courses', 'course']),
    addVideos() {
      return !this?.course?.videos?.length && !this.editing;
    },
    addVideo() {
      return this?.course?.videos?.length && !this.editing;
    },
    published() {
      return this?.course?.isPublished
    },
    courseUpdate() {
      return Object.assign({}, this.course, this.courseData)
    }
  },
  watch: {
    course(val) {
      if (!val) return;
      this.editing = false;
    },
  },
  methods: {
    ...mapActions('courses', {
      putCourse: 'PUT_COURSE',
      getCourse: 'GET_COURSE',
    }),
    submit(data) {
      const { thisCourseIsSuitableFor, ...rest } = data;
      const fd = new FormData();
      Object.entries(rest).forEach(([name, value]) => {
        if (value instanceof File) fd.append('file', value);
        else fd.append(name, value);
      });
      thisCourseIsSuitableFor.forEach(str => {
        fd.append('thisCourseIsSuitableFor[]', str);
      });
      this.putCourse({
        data: fd,
        id: this.course._id,
      });
    },
    fillingForm() {
      if (this.course) {
        this.courseData = this.course;
        this.editing = true;
        this.$vuetify.goTo('#edit-form', {
          duration: 500,
          offset: 80,
          easing: 'easeInOutCubic',
        });
      }
    },
    back() {
      this.editing = false;
    },
    goToVideos() {
      if (this.$route.name !== 'user-videos') {
        this.$router.push({ name: 'user-videos' });
      }
    },
    goUploadVideos() {
      if (this.$route.name !== 'add-course-videos') {
        this.$router.push({
          name: 'add-course-videos',
          params: {
            courseid: this.course._id,
          },
        });
      }
    },
    payDetail() {
      this.$router.push({ name: 'by-course-creator', params: { courseid: this.$route.params.courseid } });
    },
  },
  created() {
    this.getCourse(this.$route.params.courseid);
  },
  mounted() {},
};
</script>
<style scoped>
</style>
