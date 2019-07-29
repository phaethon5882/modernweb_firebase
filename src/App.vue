<template>
  <v-app
    id="inspire"
    justify-center
    align-center
  >
    <!--드로워-->
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <!--회원정보: 아바타 이미지와 아이디, 직책을 넣어주세요.-->
      <v-list-item two-line>
        <v-list-item-avatar>
          <img src="https://i.pinimg.com/originals/26/8d/95/268d9569bc81513305196a24b080f767.jpg" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>이름</v-list-item-title>
          <v-list-item-subtitle>권한</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <!--목록-->
      <v-list flat>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
        >
          <v-btn icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-btn>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-btn icon>
        <v-icon style="display: inline-block; margin: 0 20px 0 50px;">mdi-google-translate</v-icon>
      </v-btn>
      <div id="google_translate_element">
      </div>

      <v-divider></v-divider>

      <!--날씨위젯-->
      <v-flex
        align-center
        justify-center
        xs12
        my-2
        px-2
      >
        <weather
          xs12
          class="weather"
          api-key="ff143c5600613a89a32e722df13cffc3"
          title="Weather"
          latitude="36.348315"
          longitude="127.390594"
          language="ko"
          units="si"
        ></weather>
      </v-flex>
    </v-navigation-drawer>

    <!--툴바-->
    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link
          :to="{ name: 'home', params: {} }"
          style="color: white; text-decoration: none;"
        >
          <strong>오구오구</strong>
        </router-link>
      </v-toolbar-title>
      <v-btn
        icon
        @click="snackbar = true"
      >
        <v-icon>mdi-star</v-icon>
      </v-btn>
    </v-app-bar>

    <!--컨텐츠-->
    <v-content
      id="content"
      class="animated fadeIn"
    >
      <v-container fluid>
        <router-view class="animated fadeIn" />
        <!--페이지가 표시되는 부분-->
      </v-container>
    </v-content>

    <!--푸터-->
    <v-footer
      color="indigo"
      app
      style="justify-content:center;"
    >
      <span class="white--text">&copy; 5959 Assistent - SSAFY 1 GJ</span>
    </v-footer>

    <!--스낵바-즐겨찾기-->
    <v-snackbar
      v-model="snackbar"
      :right="true"
      :timeout="2000"
    >
      Ctrl + D로 즐겨찾기 해보세요 ^^
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import VueWeatherWidget from "vue-weather-widget"
export default {
  name: "app",
  components: {
    weather: VueWeatherWidget
  },
  props: {
    source: String
  },
  data () {
    return {
      drawer: false,
      snackbar: false,
      dialog: false,
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
          title: "GitFlow",
          icon: "mdi-graphql",
          to: "/gitflow"
        },
        {
          title: "ChatBot",
          icon: "mdi-robot",
          to: "/chatbot"
        }
      ]
    }
  },
  // 드로워가 펼쳐지지 않게 F12 클릭시 예외처리
  created: function () {
    window.addEventListener("keydown", this.onkey)
  },
  beforeDestroy: function () {
    window.removeEventListener("keydown", this.onkey)
  },
  methods: {
    onkey (event) {
      if (event.key === "F12") {
        this.drawer = false
      }
    }
  }
}
</script>
