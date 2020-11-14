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
          <v-card-title class="d-flex justify-center"
            ><h2>{{ course.nameOfCourse }}</h2></v-card-title
          >
          <v-img :src="checkUrl(course)" contain></v-img>
          <v-card-actions class="d-flex justify-end">
            <v-btn
              rounded
              color="buttons"
              large
              min-width="160"
              class="yellow-button"
              @click.stop="
                dialog = true;
                deleteId = video._id;
              "
              >Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <v-dialog v-model="dialog" persistent max-width="320">
        <v-card>
          <v-card-title> Do you really want to remove course ?</v-card-title>
          <v-card-actions class="justify-center">
            <v-btn
              color="buttons"
              rounded
              large
              class="yellow-button"
              text
              @click="canselHandler"
            >
              Disagree
            </v-btn>
            <v-btn
              color="buttons"
              rounded
              large
              class="yellow-button"
              text
              @click="deleteCourse"
            >
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
      dialog: false,
      deleteId: null,
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
    canselHandler () {
      this.dialog = false
      this.deleteId = null
    },
    fillingInTheFields () {
      if (!this.user) return
      this.items[0].text = `${this.user.firstName} cabinet`
      this.items[1].text = `${this.user.firstName} courses`
      if (!this.userCourses) {
        this.$store.dispatch('userCourses/GET_USER_COURSES', this.user._id)
      }
    },
    checkUrl (card) {
      let img
      if (card.photo && Array.isArray(card.photo) && card.photo.length) {
        img = card.photo[0].link
      }
      if (!img) {
        img = this.coverImageSrc
      }
      return img
    },
    deleteCourse () {
      this.$store.dispatch('userCourses/REMOVE_COURSE', {
        courseId: this.deleteId,
        userId: this.user._id
      })
      this.dialog = false
      this.deleteId = null
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
