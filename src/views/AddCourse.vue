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
              v-model="businessName"
              :rules="[rules.required]"
              label="Business name"
              outlined
              dark
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="email"
              :rules="[rules.required, rules.mailValidation]"
              label="E-mail"
              outlined
              dark
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="phone"
              :rules="[rules.required, rules.phoneValidation]"
              label="Phone number"
              outlined
              dark
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="author"
              :rules="[rules.required]"
              label="Author"
              outlined
              dark
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="instructor"
              :rules="[rules.required]"
              label="Instructor"
              outlined
              dark
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="infoForBonus"
              :rules="[rules.required]"
              label="info for bonus"
              outlined
              dark
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="category"
              :rules="[rules.required]"
              label="Category"
              outlined
              dark
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="nameOfCourse"
              :rules="[rules.required]"
              label="Name of course"
              outlined
              dark
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="subtitle"
              :rules="[rules.required]"
              label="Subtitle"
              outlined
              dark
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="access"
              :rules="[rules.required]"
              label="Access (days)"
              outlined
              dark
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="price"
              :rules="[rules.required]"
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
              v-model="file"
              label="Cover picture"
              placeholder="Select your file"
              prepend-icon="mdi-paperclip"
              outlined
              dark
              @change="Preview_image"
              :show-size="1000"
            ></v-file-input>
            <div
              v-for="(textField, i) in courseSuitable"
              :key="i"
              class="d-flex input-container"
            >
              <v-text-field
                :label="labelForSuitable"
                v-model="courseSuitable[i]"
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
              v-model="description"
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
  name: 'personal-data',
  data () {
    return {
      businessName: '',
      email: '',
      phone: '',
      author: '',
      instructor: '',
      category: '',
      nameOfCourse: '',
      subtitle: '',
      access: '',
      price: '',
      infoForBonus: '',
      labelForSuitable: 'This course is suitable for',
      courseSuitable: [''],
      file: [],
      description: '',
      checkbox1: '',
      checkbox2: '',
      url: null,
      rules: {
        required: v => !!v || 'input is required',
        minLengthName: v =>
          v.length <= 15 || 'the maximum number of characters entered',
        mailValidation: v =>
          /^(\w+\.?\w+\.?\w+?|\d+\.?\d+\.?\d+)([@])(\w+|\d+)\.{1}[a-zA-Z]{2,3}$/.test(
            v
          ) || 'invalid email',
        phoneValidation: v =>
          /^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{1}( |-){0,1}[0-9]{3}$/.test(
            v
          ) || 'invalid number'
      }
    }
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('userCourses', ['currentCourseId'])
  },
  watch: {
    currentCourseId (id) {
      if (!id) return
      this.$router.push({
        name: 'add-course-videos',
        params: {
          courseid: id
        }
      })
    }
  },
  methods: {
    Preview_image () {
      try {
        this.url = URL.createObjectURL(this.file)
      } catch (e) {
        console.log('uups')
      }
    },
    sendData () {
      const data = {
        businessName: this.businessName,
        nameOfCourse: this.nameOfCourse,
        idUser: this.user._id,
        subtitle: this.subtitle,
        accessDays: this.access,
        price: this.price,
        email: this.email,
        phone: this.phone,
        author: this.author,
        instructor: this.instructor,
        category: this.category,
        thisCourseIsSuitableFor: this.courseSuitable,
        description: this.description,
        infoForBonus: this.infoForBonus,
        isPublished: false,
        file: this.file
      }
      const fd = new FormData()
      Object.entries(data).forEach(([name, value]) => {
        if (Array.isArray(value)) {
          Object.values(data[name]).forEach(value =>
            fd.append(`${name}[]`, value)
          )
        } else {
          fd.append(name, value)
        }
      })
      this.$store.dispatch('userCourses/CREATE_ONLINE_COURSE', fd)
    },
    checkForm () {
      if (this.$refs.form.validate()) {
        this.sendData()
        // this.$router.push({ name: 'add-course-videos' })
      }
    },
    addField (entryField) {
      return entryField
        ? this.courseSuitable.push('')
        : this.dateOfCourses.push('')
    },
    removeField (index, entryField) {
      return entryField
        ? this.courseSuitable.splice(index, 1)
        : this.dateOfCourses.splice(index, 1)
    }
  }
}
</script>
