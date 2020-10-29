<template>
  <v-card class="homefone" flat height="600px">
    <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent class="primary">
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>{{user.login}}</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'UserCabinet',
  data () {
    return {
      drawer: true,
      items: [
        { title: 'Cabinet', icon: 'mdi-home-city' },
        { title: 'Profile', icon: 'mdi-account' },
        { title: 'Courses', icon: 'mdi-video' },
        { title: 'add Course', icon: 'mdi-video-plus' },
        { title: 'Settings', icon: 'mdi-cog' }
      ],
      mini: true
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}
</script>

<style>
</style>
