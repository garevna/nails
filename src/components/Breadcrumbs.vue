<template>
  <v-container fluid v-if="show">
    <v-row>
      <v-col cols="12" xs="12">
        <v-breadcrumbs :items="items">
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item :disabled="item.disabled">
              <router-link
                :to="item.href"
                class="uppercase"
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

export default {
  name: 'Breadcrumbs',
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState('courses', ['courses', 'course', 'videos', 'video']),
    ...mapState('auth', ['user']),
    ...mapState('offlineCourses', ['offlineCourse']),
    courseName() {
      return this?.course?.nameOfCourse ?? '';
    },
    show () {
      if (this.type === 'courses-online' ||
      this.type === 'courses-offline' ||
      this.type === 'user-cabinet') return true;
      return false
    },
    videoId() {
      return this.$route.params.videoid;
    },
    route() {
      return this.$route;
    },
    itemsOption() {
      const option = [
        {
          text: 'Home',
          href: '/',
        },
      ];
      const cabinet = [
        {
          text: `${this.user?.firstName} cabinet`,
          href: '/user-cabinet',
        },
        {
          text: `${this.user?.firstName} courses`,
          href: '/user-cabinet/courses',
        },
        {
          text: this.course?.nameOfCourse,
          href: `/user-cabinet/courses/${this.$route.params.courseid}`,
        },
        {
          text: 'videos',
          href: `/user-cabinet/courses/${this.$route.params.courseid}/videos`,
        },
        {
          text: this?.video?.name ?? '',
          href: '#',
        },
      ];
      const on = [
        {
          text: 'Online Courses',
          href: '/courses-online',
        },
        {
          text: this?.course?.nameOfCourse ?? '',
          href: `/courses-online/${this.$route.params.id}`,
        },
        // {
        //   text: 'videos',
        //   href: `/courses-online/${this.$route.params.courseid}/videos`
        // },
        // {
        //   text: this.currentVideo?.name,
        //   href: '#'
        // }
      ];
      const off = [
        {
          text: 'Offline Courses',
          href: '/courses-offline',
        },
        {
          text: this?.offlineCourse?.nameOfCourse ?? '',
          href: `/courses-offline/${this.$route.params.id}`,
        },
      ];
      if (this.type === 'courses-online') return option.concat(on);
      if (this.type === 'courses-offline') return option.concat(off);
      if (this.type === 'user-cabinet') return option.concat(cabinet);
      return option;
    },
    items() {
      return this.itemsOption.slice(0, this.paths.length).map((item, index, arr) => {
        // eslint-disable-next-line no-param-reassign
        item.disabled = index === arr.length - 1;
        return item;
      });
    },
    type() {
      return this.paths[1];
    },
    paths() {
      const paths = this.$route.fullPath.split('/');
      if (!paths[paths.length-1]) paths.pop()
      return paths
    },
  },
  watch: {},
  methods: {},
  created() {},
};
</script>

<style scoped>
.uppercase {
  text-transform: uppercase;
}
</style>
