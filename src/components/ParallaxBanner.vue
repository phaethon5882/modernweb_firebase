<template xl12 lg12 md12 sm12 xs12>
  <section>
    <v-parallax
      src="https://picsum.photos/1920/1080?random"
      height="600"
      class="animated fadeIn slower"
    >
      <v-layout column align-center justify-center class="white--text">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <img v-on="on" src="../assets/sitelogo.png" height="200" class="animated rotateIn slow" />
          </template>
          <h1>김용현 문은진 백윤기 양명균</h1>
        </v-tooltip>
        <div class="subheading mb-3 text-xs-center animated fast text-shadow">Team No.9</div>
        <div class="white--text my-2 display-1 text-xs-center animated zoomInUp fast text-shadow">
          <div class="greeting">Hi, I'm</div>
          <div class="greeting">오구오구</div>
          <div class="greeting">Assistent!</div>
        </div>
      </v-layout>
    </v-parallax>
    <br />
  </section>
</template>

<script>
export default {
  name: "parallaxImg",
  computed: {
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>

<style>
.text-shadow {
  text-shadow: 3px 3px 0px #1565c0, 4px 4px 0px #42a5f5;
}
/* 반응형-배너인사 메시지 */
.greeting {
  width: auto;
  font-size: 6vh;
  margin: 10px 10px 20px 20px;
  text-align: center;
}
@media (max-width: 375px) {
  .greeting {
    display: block;
  }
}
@media (min-width: 376px) {
  .greeting {
    display: inline-block;
  }
}
</style>
