<template>
  <v-container>
    <v-row>
      <!-- <v-breadcrumbs :items="items" divider="-"></v-breadcrumbs> -->
      <v-breadcrumbs :items="items">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item :disabled="item.disabled">
            <router-link
              :to="item.href"
              :class="{ 'disabled-link': item.disabled }"
            >
              {{ item.text.toUpperCase() }}</router-link
            >
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
      <v-col cols="12" xs="12" class="d-flex justify-center">
        <!-- <v-card-title> hello user courses</v-card-title> -->
      </v-col>
      <v-col cols="12" xs="12" offset-sm="3" sm="6">
        <v-card
          flat
          v-for="course in userCourses"
          :key="course._id"
          @click="goToCourse(course._id)"
        >
        <v-card-title class=" d-flex justify-center"><h2>{{course.nameOfCourse}}</h2></v-card-title>
          <!-- <v-img :src="course.photo[0].link" contain></v-img> -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
</style>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      items: [
        {
          text: '',
          disabled: false,
          href: '/user-cabinet'
        },
        {
          text: '',
          disabled: true,
          href: '/user-courses'
        }
      ]
    }
  },
  computed: {
    ...mapState('userCourses', ['userCourses']),
    ...mapState('auth', ['user'])
  },
  watch: {
    user (newVal) {
      if (!newVal) return
      this.fillingInTheFields()
    }
  },
  methods: {
    fillingInTheFields () {
      if (!this.user) return
      this.items[0].text = `${this.user.firstName} cabinet`
      this.items[1].text = `${this.user.firstName} courses`
      if (!this.userCourses) {
        this.$store.dispatch('userCourses/GET_USER_COURSES', this.user._id)
      }
    },
    goToCourse (id) {
      this.$router.push({
        name: 'user-course',
        params: {
          courseid: id
        }
      })
    }
  },
  created () {
    this.fillingInTheFields()
  },
  beforeMount () {
  }
}
</script>

<style></style>
