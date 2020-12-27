<template>
  <v-container>
    <v-row>
      <v-col cols="12" offset-sm="2" sm="8" class="pa-0 mb-4">
        <v-card flat class="transparent" style="color: #fff">
          <v-card-title>Portal terms of use</v-card-title>
          <v-card-text style="color: #fff"
            >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel
            reprehenderit repellendus nesciunt voluptatibus porro saepe dicta
            numquam aliquid aperiam explicabo a nisi sapiente, velit, veritatis
            nobis. Placeat doloremque in inventore.</v-card-text
          >
        </v-card>
      </v-col>
      <v-form ref="form">
        <v-row>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="courseData.businessName"
              :rules="[rules.required]"
              label="Business name"
              outlined
              dark
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="courseData.email"
              :rules="[rules.required, rules.mailValidation]"
              label="E-mail"
              outlined
              dark
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="courseData.phone"
              :rules="[rules.required, rules.phoneValidation]"
              label="Phone number"
              outlined
              dark
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="courseData.author"
              :rules="[rules.required]"
              label="Author"
              outlined
              dark
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="courseData.instructor"
              :rules="[rules.required]"
              label="Instructor"
              outlined
              dark
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="courseData.infoForBonus"
              :rules="[rules.required]"
              label="info for bonus"
              outlined
              dark
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="courseData.category"
              :rules="[rules.required]"
              label="Category"
              outlined
              dark
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="courseData.nameOfCourse"
              :rules="[rules.required]"
              label="Name of course"
              outlined
              dark
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="courseData.subtitle"
              :rules="[rules.required]"
              label="Subtitle"
              outlined
              dark
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="courseData.accessDays"
              :rules="[rules.required,rules.onlyDigits]"
              label="Access (days)"
              outlined
              dark
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="courseData.price"
              :rules="[rules.required,rules.onlyDigits]"
              label="Price"
              outlined
              dark
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <!-- <v-textarea
              v-model="courseSuitable"
              :rules="[rules.required]"
              label="This course is suitable for"
              outlined
              dark
              no-resize
            ></v-textarea> -->
            <v-file-input
              v-model="courseData.photo"
              label="Cover picture"
              :rules="[rules.imageRule]"
              prepend-icon="mdi-camera"
              outlined
              dark
            ></v-file-input>
            <div
              v-for="(textField, i) in courseData.thisCourseIsSuitableFor"
              :key="i"
              class="d-flex input-container"
            >
              <v-text-field
                label="This course is suitable for"
                v-model="courseData.thisCourseIsSuitableFor[i]"
                :rules="[rules.required]"
                outlined
                dark
              ></v-text-field>
              <v-btn
                @click="removeField(i, 'suitable')"
                v-if="i !== 0"
                class="remove"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
            <div class="d-flex justify-end mb-8">
              <v-btn @click="addField('suitable')">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-textarea
              v-model="courseData.description"
              :rules="[rules.required]"
              label="Description"
              outlined
              dark
              no-resize
            ></v-textarea>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-checkbox
              v-model="checkbox1"
              :rules="[rules.required]"
              label="Agree to privacy policy"
              dark
            ></v-checkbox>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-checkbox
              v-model="checkbox2"
              :rules="[rules.required]"
              label="Agree to portal terms of use"
              dark
            ></v-checkbox>
          </v-col>
          <v-col cols="12" style="text-align: center" class="pa-0">
            <v-btn
              color="buttons"
              rounded
              outlined
              small
              dark
              min-width="90"
              class="yellow-button mt-4"
              @click="checkForm"
              >submit</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-row>
  </v-container>
</template>
<style scoped>
.main-content {
  padding-top: 20px !important;
}
</style>
<script>
import { mapState } from 'vuex'
export default {
  name: 'AddCourse',
  data () {
    return {
      courseData: {
        businessName: '',
        nameOfCourse: '',
        idUser: null,
        subtitle: '',
        accessDays: '',
        price: '',
        email: '',
        phone: '',
        author: '',
        instructor: '',
        category: '',
        thisCourseIsSuitableFor: [''],
        description: '',
        infoForBonus: '',
        isPublished: false,
        photo: null
      },
      checkbox1: '',
      checkbox2: '',
      rules: {
        required: v => !!v || 'input is required',
        imageRule: v => !v || v.size < 2000000 || 'Image size should be less than 2 MB!',
        minLengthName: v =>
          v.length <= 15 || 'the maximum number of characters entered',
        mailValidation: v =>
          /^(\w+\.?\w+\.?\w+?|\d+\.?\d+\.?\d+)([@])(\w+|\d+)\.{1}[a-zA-Z]{2,3}$/.test(
            v
          ) || 'invalid email',
        phoneValidation: v =>
          /^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{1}( |-){0,1}[0-9]{3}$/.test(
            v
          ) || 'invalid number',
        onlyDigits: (v) => !/\D/g.test(v) || 'input should consist only of digits'
      }
    }
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('courses', ['course'])
  },
  watch: {
    // course (course) {
    //   if (!course) return
    //   this.$router.push({
    //     name: 'add-course-videos',
    //     params: {
    //       courseid: course._id
    //     }
    //   })
    // }
  },
  methods: {
    async sendData () {
      const fd = new FormData()
      this.courseData.idUser = this.user._id
      Object.entries(this.courseData).forEach(([name, value]) => {
        if (value instanceof File) {
          fd.append('file', value)
          return
        }
        if (Array.isArray(value)) {
          Object.values(this.courseData[name]).forEach(value =>
            fd.append(`${name}[]`, value)
          )
          return
        }
        fd.append(name, value)
      })
      await this.$store.dispatch('courses/POST_COURSE', fd)
      if (this.course) {
        this.$router.push({
          name: 'add-course-videos',
          params: {
            courseid: this.course._id
          }
        })
      }
    },
    checkForm () {
      if (this.$refs.form.validate()) {
        this.sendData()
      }
    },
    addField (entryField) {
      return entryField
        ? this.courseData.thisCourseIsSuitableFor.push('')
        : this.courseData.dateOfCourses.push('')
    },
    removeField (index, entryField) {
      return entryField
        ? this.courseData.thisCourseIsSuitableFor.splice(index, 1)
        : this.courseData.dateOfCourses.splice(index, 1)
    }
  }
}
</script>
