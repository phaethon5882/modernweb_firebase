<template>
  <v-app id="inspire">
    <!--드로워-->
    <v-navigation-drawer v-model="drawer" app>
      <v-list flat>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!--툴바-->
    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>오구오구</v-toolbar-title>
    </v-app-bar>

    <!--컨텐츠-->
    <v-content id="content" class="animated fadeIn">
      <v-container fluid>
        <router-view class="animated fadeIn" />
        <!--페이지가 표시되는 부분-->
      </v-container>
    </v-content>

    <!--푸터-->
    <v-footer color="indigo" app style="justify-content:center;">
      <span class="white--text">&copy; 5959 Assistent - SSAFY 1 GJ</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data () {
    return {
      drawer: false,
      items: [
        {
          title: "Home",
          icon: "mdi-home",
          to: "/"
        },
        {
          title: "Post",
          icon: "mdi-file-document",
          to: "/post"
        },
        {
          title: "Portfolio",
          icon: "mdi-file-document-box-outline",
          to: "/portfolio"
        },
        {
          title: "GitGraph",
          icon: "mdi-graphql",
          to: "/gitgraph"
        },
        {
          title: "Trans",
          icon: "mdi-google-translate",
          to: "/trans"
        }
      ]
    }
  },
  methods: {

  }
}
</script>

<style>
</style>
