<template>
  <v-form ref="form">
    <v-row>
      <v-col cols="12" xs="12" md="6">
        <v-text-field
          v-model="courseData.businessName"
          :rules="[rules.required]"
          label="Business name"
          outlined
          dark
        ></v-text-field>
        <v-text-field
          v-model="courseData.category"
          :rules="[rules.required]"
          label="Category"
          outlined
          dark
        ></v-text-field>
        <v-text-field
          v-model="courseData.nameOfCourse"
          :rules="[rules.required]"
          label="Name of Course"
          outlined
          dark
          :counter="27"
          maxlength="27"
        ></v-text-field>

        <v-text-field
          v-model="courseData.subtitle"
          :rules="[rules.required]"
          label="Subtitle"
          outlined
          dark
          :counter="40"
          maxlength="40"
        ></v-text-field>
        <div v-if="type === 'offline'">
          <div v-for="(textField, i) in courseData.dateOfCourses" :key="i" class="d-flex input-container">
            <v-text-field
              label="date of the course"
              v-model="courseData.dateOfCourses[i]"
              :rules="[rules.required]"
              outlined
              dark
            ></v-text-field>
            <v-btn @click="removeField(i, '')" v-if="i !== 0" class="remove">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
          <div class="d-flex justify-end mb-8">
            <v-btn @click="addField('')">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
          <v-text-field
            label="available spots"
            v-model="courseData.availableSpots"
            :rules="[rules.required, rules.onlyDigits]"
            outlined
            dark
          ></v-text-field>
        </div>

        <v-text-field
          v-model="courseData.accessDays"
          :rules="[rules.required, rules.onlyDigits]"
          label="Access (days)"
          outlined
          dark
        ></v-text-field>
        <v-text-field
          v-model="courseData.price"
          :rules="[rules.required, rules.onlyDigits]"
          label="price"
          outlined
          dark
        ></v-text-field>
      </v-col>
      <v-col cols="12" xs="12" md="6">
        <v-text-field v-model="courseData.author" :rules="[rules.required]" label="Author" outlined dark></v-text-field>
        <v-text-field
          v-model="courseData.instructor"
          :rules="[rules.required]"
          label="Instructor"
          outlined
          dark
        ></v-text-field>
        <v-text-field
          v-model="courseData.infoForBonus"
          :rules="[rules.required]"
          label="Info for bonus"
          outlined
          dark
        ></v-text-field>
        <div v-for="(textField, i) in courseData.thisCourseIsSuitableFor" :key="i" class="d-flex input-container">
          <v-text-field
            label="this course is suitable for"
            v-model="courseData.thisCourseIsSuitableFor[i]"
            :rules="[rules.required]"
            outlined
            dark
          ></v-text-field>
          <v-btn @click="removeField(i, 'suitable')" v-if="i !== 0" class="remove">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
        <div class="d-flex justify-end mb-8">
          <v-btn @click="addField('suitable')">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>

        <v-textarea
          v-model="courseData.description"
          :rules="[rules.required]"
          label="Description"
          outlined
          dark
          no-resize
        ></v-textarea>
        <v-file-input
          v-model="courseData.photo"
          label="Cover picture"
          prepend-icon="mdi-camera"
          outlined
          dark
          :show-size="1000"
        ></v-file-input>
        <v-checkbox
          v-if="!data"
          v-model="checkbox1"
          :rules="[rules.required]"
          label="Agree to privacy policy"
          dark
        ></v-checkbox>
        <v-checkbox
          v-if="!data"
          v-model="checkbox2"
          :rules="[rules.required]"
          label="Agree to portal terms of use"
          dark
        ></v-checkbox>
        <v-btn
          v-if="data"
          color="buttons"
          rounded
          outlined
          large
          dark
          min-width="90"
          class="yellow-button mt-4 mr-8"
          @click="cancelHandler"
          >cancel</v-btn
        >
        <v-btn color="buttons" rounded outlined large dark min-width="90" class="yellow-button mt-4" @click="checkForm"
          >submit</v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AddCourseForm',
  props: ['data', 'type', 'back'],
  data() {
    return {
      courseData: {
        businessName: '',
        category: '',
        nameOfCourse: '',
        subtitle: '',
        accessDays: '',
        price: '',
        author: '',
        instructor: '',
        infoForBonus: '',
        description: '',
        photo: null,
        dateOfCourses: [''],
        availableSpots: '',
        thisCourseIsSuitableFor: [''],
        email: '',
        phone: '',
      },
      checkbox1: '',
      checkbox2: '',
      rules: {
        required: v => !!v || 'input is required',
        imageRule: v => !v || v.size < 2000000 || 'Image size should be less than 2 MB!',
        minLengthName: v => v.length <= 15 || 'the maximum number of characters entered',
        mailValidation: v =>
          /^(\w+\.?\w+\.?\w+?|\d+\.?\d+\.?\d+)([@])(\w+|\d+)\.{1}[a-zA-Z]{2,3}$/.test(v) || 'invalid email',
        phoneValidation: v =>
          /^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{1}( |-){0,1}[0-9]{3}$/.test(
            v
          ) || 'invalid number',
        onlyDigits: v => !/\D/g.test(v) || 'input should consist only of digits',
      },
    };
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('courses', ['course']),
  },
  watch: {
    courseData: {
      deep: true,
      handler() {
        this.$emit('update:data', this.courseData);
      },
    },
  },
  methods: {
    checkForm() {
      if (this.$refs.form.validate()) {
        this.submitHandler();
      }
    },
    addField(entryField) {
      return entryField ? this.courseData.thisCourseIsSuitableFor.push('') : this.courseData.dateOfCourses.push('');
    },
    removeField(index, entryField) {
      return entryField
        ? this.courseData.thisCourseIsSuitableFor.splice(index, 1)
        : this.courseData.dateOfCourses.splice(index, 1);
    },
    cancelHandler() {
      this.back();
    },
    fillingForm() {
      if (this.data) {
        Object.keys(this.data).forEach(key => {
          this.courseData[key] = this.data[key];
        });
      }
    },
    async submitHandler() {
      if (!this.data) {
        this.courseData.idUser = this.user._id;
        this.courseData.isPublished = false;
      }
      const { dateOfCourses, thisCourseIsSuitableFor, ...rest } = this.courseData;
      const fd = new FormData();
      Object.entries(rest).forEach(([name, value]) => {
        if (value !== undefined && value !== null) {
          if (value instanceof File) fd.append('file', value);
          else if (typeof value !== 'object') fd.append(name, value);
        }
      });
      dateOfCourses &&
        dateOfCourses.forEach(str => {
          if (str) {
            fd.append('dateOfCourses[]', str);
          }
        });
      thisCourseIsSuitableFor.forEach(str => {
        if (str) {
          fd.append('thisCourseIsSuitableFor[]', str);
        }
      });
      if (!this.data) {
        if (this.type === 'online') {
          await this.$store.dispatch('courses/POST_COURSE', fd);
          if (this.course) {
            this.$router.push({
              name: 'add-course-videos',
              params: {
                courseid: this.course._id,
              },
            });
          }
        } else {
          await this.$store.dispatch('courses/CREATE_OFFLINE_COURSE', fd);
          if (!this.error) {
            this.$router.push({
              name: 'offline-course',
              params: {
                // eslint-disable-next-line no-underscore-dangle
                courseid: this.newOfflineCourse._id,
              },
            });
          }
        }
      } else {
        await this.$store.dispatch('courses/PUT_COURSE', {
          data: fd,
          // eslint-disable-next-line no-underscore-dangle
          id: this.$route.params.courseid,
        });
      }
    },
  },
  mounted() {
    // if (this.data) this.courseData = this.data
    if (this.data) this.fillingForm();
  },
};
</script>

<style></style>
