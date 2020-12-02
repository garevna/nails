<template>
  <v-container fluid>
    <v-row class="d-flex justify-center">
      <v-col cols="12" xs="12" class="d-flex justify-start">
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
      </v-col>
      <v-col cols="12" xs="12" v-if="loading">
        <Spinner />
      </v-col>
      <v-col cols="12" xs="12" v-if="emtyCourses">
        <h3 align="center">You don't have courses yet</h3>
      </v-col>
      <v-col
        cols="12"
        xs="12"
        md="6"
        lg="4"
        v-for="course in userCourses"
        :key="course._id"
      >
        <v-card @click="goToCourse(course._id)">
          <v-card-title class="d-flex justify-center py-4"
            style="position:relative;"><h2>{{ course.nameOfCourse }}</h2>
            <div v-if="!course.isPaid" class="figure1">
              <h5 class="figure-text1">not paid</h5>
            </div>
            <div v-if="!course.isPublished" class="figure2">
              <h5 class="figure-text2">not published</h5>
            </div></v-card-title
          >
          <CoverImage :url="checkUrl(course)" :height="300" />
          <v-card-actions class="d-flex justify-end">
            <v-btn
              rounded
              color="buttons"
              large
              min-width="160"
              class="yellow-button"
              @click.stop="
                dialog = true;
                deleteId = course._id;
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

import CoverImage from '@/components/CoverImage.vue'
import Spinner from '@/components/Spinner.vue'

export default {
  components: {
    CoverImage,
    Spinner
  },
  data () {
    return {
      dialog: false,
      deleteId: null,
      imageUrl: null,
      errorLoad: false,
      coverImageSrc: require('@/assets/noImage.jpg'),
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
    ...mapState('userCourses', ['userCourses', 'loading']),
    ...mapState('auth', ['user']),
    emtyCourses () {
      return !this.loading && !this.userCourses?.length
    }
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
  mounted () {
  },
  created () {
    this.fillingInTheFields()
  },
  beforeMount () {
  }
}
</script>

<style scoped>
.figure1 {
  position: absolute;
  border: 20px solid #cc5c5c;
  width: 160px;
  border-right: 30px solid transparent;
  bottom: -20px;
  left: 0;
  z-index: 1;
}
.figure-text1 {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}
.figure2 {
  position: absolute;
  border: 20px solid #5c5ccc;
  width: 160px;
  border-left: 30px solid transparent;
  bottom: -20px;
  right: 0;
  z-index: 1;
}
.figure-text2 {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}
</style>
