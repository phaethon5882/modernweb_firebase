<template>
  <div class="animated bounceInLeft delay-1s">
    <div class="title">
      <h1>GitLab</h1>
    </div>
    <div align="center">
      <v-card width="300">
        <v-list two-line>
          <v-list-item v-for="(item, i) in this.gitlabData" :key="i" @click="goToUrl(item.web_url)">
            <v-list-item-avatar>
              <img :src="item.avatar_url" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.name"></v-list-item-title>
              <v-list-item-subtitle v-html="item.username"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
  </div>
</template>

<script>
import GitLabService from "../services/GitlabService.js"

export default {
  name: "GitRepositories",
  data () {
    return {
      gitlabData: []
    }
  },
  mounted () {
    GitLabService.getMembers().then(members => {
      for (let member of members.data) {
        if (member.username === "Heesg") continue // 희성이 삭제함 ㅎㅎ
        this.gitlabData.push(member)
      }
    })
  },
  methods: {
    goToUrl (url) {
      window.location.href = url
    }
  }
}
</script>
