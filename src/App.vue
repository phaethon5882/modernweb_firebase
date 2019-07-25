<template>
  <v-app>
    <toolbar></toolbar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import ToolBar from "./components/ToolBar.vue"
export default {
  name: "App",
  components: {
    toolbar: ToolBar
  },
  data: () => ({
    //
  })
}
</script>
