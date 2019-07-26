<template>
  <div>
    <parallaxImg />
    <memberCarousel />
    <gitRepositories />
  </div>
</template>

<script>
export default {
  name: "home",
  components: {
    parallaxImg: () => import("../components/ParallaxBanner.vue"),
    memberCarousel: () => import("../components/MemberCarousel.vue"),
    gitRepositories: () => import("../components/GitRepositories.vue")
  },
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style>
</style>
