<template>
  <div>
    <v-flex row my-5>
      <h1 my-3 style="text-align:center;">Git Flow</h1>
    </v-flex>

    <!--draw graph here-->
    <div class="animated bounceInDown delay-1s">
      <v-layout row>
        <v-flex id="gitgraph" class="gitGraphHide" :class="$mq" mx-5 px-5 />
        <v-flex id="mobileNotice" class="showWhenMobile" :class="$mq" style="margin-bottom:50px;">
          <v-content>
            <h1 style="text-align:center !important;">모바일에선 볼 수 없는 기능입니다..</h1>
            <v-img :src="getImg('tube.gif')" max-height="80vw" />
          </v-content>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import GitLapService from "../services/GitlabService"

import { createGitgraph, templateExtend } from "@gitgraph/js"

const options = {
  orientation: "vertical-reverse",
  template: templateExtend("metro", {
    colors: [
      "#58C9B9",
      "#519D9E",
      "#c29ed8",
      "#8CD790",
      "#fcc567",
      "#F7AA97",
      "#CB7575",
      "#2b90d9"
    ]
  })
}

export default {
  name: "GitGraph",
  data () {
    return {
      eventsData: [],
      mergesData: [],
      branchNameData: {}
    }
  },
  mounted () {
    this.draw()
  },
  methods: {
    getImg (uri) {
      return require("../../public/img/" + uri)
    },
    async draw () {
      let page = 1
      // eslint-disable-next-line
      while (true) {
        let events = await GitLapService.getEvents(page)

        if (events.data.length == 0) {
          break
        } else {
          for (let event of events.data) {
            this.eventsData.push(event)
          }
          page++
        }
      }

      page = 1
      // eslint-disable-next-line
      while (true) {
        let merges = await GitLapService.getMerges(page)
        if (merges.data.length == 0) {
          break
        } else {
          for (let merge of merges.data) {
            this.mergesData.push(merge)
          }
          page++
        }
      }

      let events = this.eventsData
      let merges = this.mergesData

      const graphContainer = document.getElementById("gitgraph")
      const gitgraph = createGitgraph(graphContainer, options)

      let branch_names = []
      for (let event of events) {
        // eslint-disable-next-line
        if (event.hasOwnProperty("push_data")) {
          let push_target = event.push_data.ref
          let isExist = false
          for (let branch_name of branch_names) {
            if (branch_name === push_target) {
              isExist = true
              break
            }
          }

          if (!isExist) {
            if (
              push_target.indexOf("master") !== -1 ||
              push_target.indexOf("develop") !== -1 ||
              push_target.indexOf("/req") !== -1
            ) {
              branch_names.push(push_target)
            }
          }
        }
      }

      let branches = []
      let master = {}
      let develop = {}
      for (let name of branch_names) {
        if (name === "master") {
          master = gitgraph.branch(name)
          branches.push({
            branch_name: name,
            object: master
          })
        } else if (name === "develop") {
          develop = gitgraph.branch(name)
          branches.push({
            branch_name: name,
            object: develop
          })
        } else {
          branches.push({
            branch_name: name,
            object: gitgraph.branch(name)
          })
        }
      }

      let valid_merges = []
      for (let merge of merges) {
        let isExist = false
        for (let branch of branches) {
          if (branch.branch_name === merge.source_branch) {
            isExist = true
            break
          }
        }
        if (isExist) {
          valid_merges.push({
            name: merge.author.name,
            username: merge.author.username,
            target: merge.target_branch,
            source: merge.source_branch,
            desc: merge.description ? merge.description : "설명없음",
            title: merge.title,
            web_url: merge.web_url
          })
        }
      }

      let idx = 0
      let initMaster = false

      for (let event of events) {
        var action_name = event.action_name
        if (action_name.indexOf("pushed") != -1) {
          let commit_author =
            event.author.name + " <" + event.author.username + ">"
          let commit_title = event.push_data.commit_title
          let commit_ref = event.push_data.ref
          let commit_to = event.push_data.commit_to

          if (!commit_title || commit_title.indexOf("Merge") != -1) continue

          if (!initMaster) {
            for (let branch of branches) {
              if (
                branch.branch_name === "master" &&
                commit_ref === "master" &&
                action_name === "pushed new"
              ) {
                branch.object.commit({
                  author: commit_author,
                  subject: commit_title,
                  onMessageClick () {
                    window.location.href = `https://lab.ssafy.com/kimyong/webmobile-final/commit/${commit_to}`
                  }
                })
                initMaster = true
                develop.commit("develop created!")
                break
              }
            }
            if (initMaster) continue
          }

          for (let branch of branches) {
            if (branch.branch_name === commit_ref) {
              branch.object.commit({
                author: commit_author,
                subject:
                  commit_title.length <= 30
                    ? commit_title
                    : commit_title.substr(0, 30) + "...",

                onMessageClick () {
                  window.location.href = `https://lab.ssafy.com/kimyong/webmobile-final/commit/${commit_to}`
                }
              })
              break
            }
          }
        } else if (event.action_name === "accepted") {
          let desc = valid_merges[idx].desc
          let title = valid_merges[idx].title
          let target = valid_merges[idx].target
          let source = valid_merges[idx].source
          let target_obj = null
          let source_obj = null
          for (let branch of branches) {
            if (branch.branch_name === target) {
              target_obj = branch.object
              break
            }
          }
          for (let branch of branches) {
            if (branch.branch_name === source) {
              source_obj = branch.object
              break
            }
          }
          let subject = title + " " + desc
          subject =
            subject.length < 30 ? subject : subject.substr(0, 30) + "..."
          
          target_obj.merge(source_obj, subject)

          idx++
        }
      }
      if (master && develop) {
        master.merge(develop, "나중에 머지 해주실 거죠?")
      }
    }
  }
}
</script>

<style>
.gitGraphHide.mobile {
  display: none;
}
.showWhenMobile {
  display: none;
}
.showWhenMobile.mobile {
  display: flex;
}
</style>
