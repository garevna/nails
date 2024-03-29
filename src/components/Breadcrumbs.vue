<template>
  <v-container v-if="show">
    <v-row>
      <v-col cols="12" xs="12">
        <v-breadcrumbs :items="items">
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item :disabled="item.disabled">
              <router-link
                :to="item.path"
                class="text-uppercase text-decoration-none"
                :class="{ 'disabledPathBreadcrumbs--text': item.disabled }"
              >
                {{ item.text }}
              </router-link>
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import { routesFactory } from '@/helpers/breadcrumbs';

export default {
  name: 'Breadcrumbs',
  computed: {
    ...mapState('courses', ['course', 'video']),
    ...mapState('purchasedCourses', { purchasedCourse: 'course', purchasedVideo: 'video' }),
    ...mapState('auth', ['user']),
    ...mapState('offlineCourses', ['offlineCourse']),
    courseId() {
      return this.$route.params.courseid ?? '';
    },
    lessonId() {
      return this.$route.params.lessonid ?? '';
    },
    userName() {
      return this?.user?.firstName ?? '';
    },
    courseName() {
      return this?.course?.nameOfCourse ?? '';
    },
    purchasedCourseName() {
      return this?.purchasedCourse?.nameOfCourse ?? '';
    },
    offlineCourseName() {
      return this?.offlineCourse?.nameOfCourse ?? '';
    },
    lessonName() {
      return this?.video?.name ?? '';
    },
    purchasedLessonName() {
      return this?.purchasedVideo?.name ?? '';
    },
    routeName() {
      return this.$route.name;
    },
    show() {
      const paths = ['courses-online', 'courses-offline', 'user-cabinet', 'courses'];
      return paths.some(path => this.$route.path.includes(path));
    },
    items() {
      return this.breadcrumbs.map((route, index) => Object.assign({ disabled: index === 0 }, route)).reverse();
    },
    routes: routesFactory(),
    breadcrumbs() {
      const currentPath = this.routes.find(route => route.name === this.routeName);
      if (!currentPath) return [];

      return this.search(currentPath);
    },
  },
  methods: {
    search(current) {
      if (!current) return [];
      return [current].concat(this.search(this.routes.find(route => route.id === current.parentId)));
    },
  }
};
</script>
