<template>
  <div>
    <div class="title">
      <h1>About Us</h1>
    </div>
    <v-carousel
      id="carousel"
      cycle
      height="550"
      hide-delimiter-background
      :hide-delimiters="true"
      :show-arrows="false"
    >
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
      >
        <v-card
          class="mx-auto"
          max-width="300"
        >
          <v-img
            class="white--text"
            height="400px"
            :src="getImg(item.imgPath)"
          >
            <v-card-title class="align-end justify-center fill-height carousel-text-shadow display-2">
              <span>{{item.name}}</span>
            </v-card-title>
          </v-img>

          <v-card-text>
            <h2>{{item.position}}</h2>
            <p
              v-html="item.desc"
              class="desc"
            ></p>
          </v-card-text>
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  name: "memberCarousel",
  methods: {
    getImg (fileName) {
      return require("../../public/img/profile/" + fileName)
    }
  },
  data () {
    return {
      items: [
        {
          imgPath: "jin__y.png",
          position: "Developer",
          name: "문은진",
          desc: "낭비하기엔 <br /> 인생이 너무 짧다."
        },
        {
          imgPath: "phaethon.png",
          position: "Developer",
          name: "백윤기",
          desc: "무엇이든 배워두면 <br />쓸모가 있다."
        },
        {
          imgPath: "kimdragon.jpg",
          position: "Leader",
          name: "김용현",
          desc: "열심히 살다보니 조금씩 쌓여가네. <br /> 하상욱 단편 시집 '피로' 中에서"
        },
        {
          imgPath: "godqhr.jpg",
          position: "Developer",
          name: "양명균",
          desc: "'나 하나쯤이야'란 생각을 버리고 <br /> 나부터 먼저가 되도록 열심히하자"
        }
      ]
    }
  }
}
</script>

<style>
.title {
  text-align: center;
  margin: 10vh 0 5vh 0;
}
.carousel-text-shadow {
  text-shadow: 3px 3px 0px #535353, 4px 4px 4px #f54242;
}
.desc {
  padding: 7px;
  font-size: 1.2em;
}
</style>
