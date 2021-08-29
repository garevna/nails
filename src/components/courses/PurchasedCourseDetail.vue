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
        <v-card v-if="type === 'offline'" flat class="transparent d-flex flex-column align-center" dark>
           <table>
            <tr>
              <th>Date of course</th>
              <!-- <th>Available spots</th> -->
              <th>Purchased dates</th>
            </tr>
            <tr v-for="item in dateOfCourses" :key="item.id">
              <td>{{ item.date }}</td>
              <!-- <td class="text-right">{{ item.availableSpots }}</td> -->
              <td class="text-right"> <v-chip :color="item.paid ? 'paidAndPublished' : 'notPaidAndPublished'"  text-color="white"> {{ item.paid ? 'paid': 'not paid' }}</v-chip></td>
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
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import { datesToString } from '@/helpers/datesToString';

import CoverImage from '@/components/CoverImage.vue';
import checkCourseLink from '@/helpers/checkCourseLink';
export default {
  name: 'PurchasedCourseDetail',
  props: {
    course: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    eventDates: {
      type: Array,
      required: true,
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
    // purchasedDate() {

    // },
    dateOfCourses() {
      return this.course.dateOfCourses.map(item => ({
        date: this.formatedDate(item.date),
        availableSpots: item.availableSpots,
        id: item._id,
        paid: item.vendorCode === this.course.vendorCode
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
  },
};
</script>

<style scoped>
td,th {
  padding: 8px;
}
</style>
