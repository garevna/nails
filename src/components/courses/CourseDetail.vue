<template>
  <v-container fluid dark>
    <v-row>
      <v-col
        cols="12"
        xs="12"
        order="2"
        sm="6"
        order-sm="2"
        class="d-flex flex-column justify-space-between align-center align-sm-start"
      >
        <v-card flat class="mb-8 transparent" dark>
          <v-card-title class="pa-0 pl-4">{{ course.category }}</v-card-title>
          <v-card-text class="pa-0 pl-4 buttons--text d-flex">{{ type }} course</v-card-text>
          <v-card-title class="pa-0 pl-4">{{ course.nameOfCourse }}</v-card-title>
          <v-card-text class="pa-0 pl-4 text-start">{{ course.subtitle }}</v-card-text>
          <v-card-title class="pa-0 pl-4 buttons--text"
            >{{ course.accessDays }} days | $ {{ course.price }}</v-card-title
          >
        </v-card>
        <v-card flat class="transparent" dark v-if="type === 'online'">
          <v-card-text v-if="!course.isPaid" class="pa-0 pl-4 pb-4 d-flex notPaidAndPublished--text"
            ><h3>this course has not been paid for yet</h3></v-card-text
          >
          <v-card-text v-if="!course.isPublished" class="pa-0 pl-4 d-flex notPaidAndPublished--text"
            ><h3>this course has not been published yet</h3></v-card-text
          >
        </v-card>
        <v-card v-if="type === 'offline'" flat class="transparent d-flex flex-column align-center" dark>
          <table>
            <tr>
              <th>Date of course</th>
              <th>Available spots</th>
            </tr>
            <tr v-for="item in dateOfCourses" :key="item.id">
              <td>{{ item.date }}</td>
              <td class="text-right">{{ item.availableSpots }}</td>
            </tr>
          </table>
        </v-card>
        <v-card flat class="transparent d-flex flex-column align-center" dark>
          <v-card-title>This course is cuitable for:</v-card-title>
          <ul>
            <li v-for="(item, index) in course.thisCourseIsSuitableFor" :key="index">
              {{ item }}
            </li>
          </ul>
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" order="1" sm="6" order-sm="2" align="center" justify="center">
        <CoverImage :url="linkCheck(course)" />
      </v-col>
      <v-col cols="12" xs="12" order="2">
        <v-card-text class="mt-16 whitefone--text d-flex justify-center justify-sm-start"
          >Author and instructor of the course: {{ course.instructor }}</v-card-text
        >
      </v-col>
      <v-col cols="12" xs="12" order="2">
        <v-card flat dark class="transparent">
          <v-card-title class="d-flex justify-center justify-sm-start">On this course:</v-card-title>
          <v-card-text>
            <p v-for="(item, index) in descriptions" :key="index">
              {{ item }}
            </p>
          </v-card-text>
          <v-card-text>{{ course.infoForBonus }}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" class="d-flex justify-center justify-sm-end" order="2">
        <v-btn
          color="buttons"
          rounded
          small
          outlined
          primary
          min-width="90"
          class="yellow-button mr-4"
          @click="btnHandler"
          >{{ type === 'offline' ? 'Apply' : 'Buy this course' }}</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

import CoverImage from '@/components/CoverImage.vue';
import checkCourseLink from '@/helpers/checkCourseLink';
import { datesToString } from '@/helpers/datesToString';

export default {
  name: 'CourseDetail',
  props: {
    course: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    preview: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    CoverImage,
  },
  data() {
    return {};
  },
  watch: {},
  computed: {
    ...mapState('auth', ['user']),
    descriptions() {
      return this.course?.description
        ? this.course.description
            .split('\n')
            .map(str => str.trim())
            .filter(str => str)
        : [];
    },
    dateOfCourses() {
      return this.course.dateOfCourses.map(item => ({
        date: this.formatedDate(item.date),
        availableSpots: item.availableSpots,
        id: item._id
      }));
    },
  },
  methods: {
    linkCheck(course) {
      return checkCourseLink(course);
    },
    formatedDate(date) {
      let dates = [];
      try {
        dates = JSON.parse(date);
      } catch (e) {
        // console.error(e.message);
      }
      if (!Array.isArray(dates)) dates = [];
      return datesToString(dates);
    },
    btnHandler() {
      if (this.preview) return;
      if (!this.user) {
        this.$router.push({ name: 'sign-in' });
        return;
      }
      this.$router.push({
        name: this.type === 'online' ? 'by-course' : 'by-offline',
        params: {
          courseid: this.course._id,
        },
      });
    },
  },
};
</script>

<style scoped>
td {
  padding: 8px;
}
</style>
