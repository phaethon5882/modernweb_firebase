<template>
  <div>
    <v-alert :type="type[i%(type.length-1)]" :value="true" v-for="i in 10" :key="i">abcde{{i}}</v-alert>
    <v-btn class="ma-2" outlined large fab color="indigo">
      <v-icon>mdi-circle-edit-outline</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "home",
  data () {
    return {
      type: ["success", "error", "warning", "info"]
    }
  }
}
</script>

<style>
</style>
