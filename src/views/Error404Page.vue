<template>
  <div>
    <section align="center">
      <h1 class="error_title">페이지를 찾을 수 없습니다</h1>
      <v-img
        :src="getImg('404error.gif')"
        max-height="80vw"
      ></v-img>
    </section>
  </div>
</template>
<script>
export default {
  methods: {
    getImg (filename) {
      return require("../../public/img/" + filename)
    }
  }
}
</script>

<style>
.error_title {
  font-size: 2rem;
}
</style>
