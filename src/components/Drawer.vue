<template>
  <v-layout column align-stretch>
    <v-card height="400">
      <v-navigation-drawer v-model="drawer" color="primary lighten-1" absolute dark>
        <v-list dense nav class="py-0">
          <v-list-item two-line>
            <v-list-item-avatar>
              <img
                src="https://i.pinimg.com/originals/26/8d/95/268d9569bc81513305196a24b080f767.jpg"
              />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Yunki</v-list-item-title>
              <v-list-item-subtitle>Programmer</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

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
  </v-layout>
</template>

<script>
export default {
  name: "letfdrawer",
  data () {
    return {
      drawer: true,
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        { title: "Photos", icon: "mdi-image" },
        { title: "About", icon: "mdi-help-box" }
      ],
      colors: [
        "primary",
        "blue",
        "success",
        "red",
        "teal"
      ]
    }
  }
}
</script>
