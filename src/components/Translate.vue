<template>
  <div justify-end fill-height>
    <v-icon text @click.stop="dialog = true">mdi-google-translate</v-icon>
    <v-dialog v-model="dialog" max-width="250" style="vertical-align: middle;">
      <!--모달내용-->
      <v-card>
        <v-card-title class="headline">번역할 언어 선택</v-card-title>
        <div class="translator" id="google_translate_element"></div>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="refresh()">새로고침</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    refresh () {
      this.dialog = false
      location.reload()
    }
  }
}
</script>

<style>
/* .translator > div > span {
  display: none;
}
.translator > div {
  font-size: 0px;
}
.skiptranslate > iframe {
  display: none;
} */
</style>
