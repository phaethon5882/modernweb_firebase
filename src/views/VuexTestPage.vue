<template>
  <v-layout
    text-lg-center
    text-xs-center
  >
    <v-flex>
      <v-container>
        <h1>Vuex를 테스트해봅시다</h1>
        <p>{{ vuexLorem1 }}</p>
        <v-divider></v-divider>
        <p>{{ vuexLorem2 }}</p>
        <v-divider></v-divider>
        <h2>버튼을 클릭해보세요</h2>
        <v-btn
          icon
          @click="pressed()"
        >
          <v-icon>mdi-comment-plus-outline</v-icon>
        </v-btn>
        <span>{{ vuexCount }}</span>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import store from "../store.js"
export default {
  name: "vuexTest",
  computed: {
    // 재사용성을 위해서 getters에 정의하는 게 좋음
    vuexLorem1 () {
      return store.state.lorem
    },
    vuexLorem2 () {
      return store.getters.getLorem
    },
    vuexCount () {
      return store.getters.getCount
    }
  },
  methods: {
    pressed () {
      // store.commit("속성명" , "인수목록")
      store.commit("countUp", { amount: 10, mult: 2 })
    }
  }
}
</script>

<style>
</style>
