<template>
  <div class="animated bounceInLeft delay-1s">
    <div class="title">
      <h1>GitLab Page</h1>
    </div>
    <div align="center">
      <v-card width="300">
        <v-list two-line>
          <v-list-item
            v-for="(item, i) in this.members"
            :key="i"
            @click="goToUrl(item.web_url)"
          >
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
import service from "../services/GitlabService.js"

export default {
  name: "GitRepositories",
  data () {
    return {
      members: []
    }
  },
  mounted () {
    service.getMembers().then(res => {
      res.data.forEach(member => {
        this.members.push(member)
      })
    })
  },
  methods: {
    goToUrl (url) {
      window.location.href = url
    }
  }
}
</script>
