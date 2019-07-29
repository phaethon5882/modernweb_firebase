<template>
  <div>
    <section align="center">
      <h1 style="font-size:2.5rem; margin-bottom: 10px;">Git Flow</h1>
    </section>

    <section
      id="gitgraph"
      align="center"
      class="showOnDesktop"
      :class="$mq"
    />

    <section>
      <v-flex
        class="showOnMobile"
        :class="$mq"
        style="margin-bottom:50px;"
      >
        <v-content>
          <h1 style="text-align:center !important;">모바일에선 지원하지 않는 기능이에요!</h1>
          <v-img
            :src="getImg('tube.gif')"
            max-height="80vw"
          />
        </v-content>
      </v-flex>
    </section>
  </div>
</template>

<script>
import { createGitgraph, templateExtend } from "@gitgraph/js"
import service from "../services/GitlabService"

const opts = {
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

const branchMsg = {
  subject: "브런치 생성",
  dotText: "🐣",
  onMessageClick () {
    alert("브런치 생성!")
  }
}

export default {
  name: "gitflow",
  data () {
    return {
    }
  },
  mounted () {
    this.draw()
  },
  methods: {
    async draw () {
      // 1. 그래프 초기화
      const graphContainer = document.getElementById("gitgraph")
      const gitgraph = createGitgraph(graphContainer, opts)

      // 2. 브런치 맵 초기화
      let branchMap = new Map()
      let eventPage = 1

      // 3. 렌더링
      // eslint-disable-next-line
      while(true) {
        // 3-1. 이벤트 목록을 가져옵니다.
        let res = await service.getEvents(eventPage++)
        if (!res.data.length) break

        res.data.forEach(e => {
          // push_data 속성이 있을 경우 브런치로 등록이 가능합니다.
          if (e.hasOwnProperty("push_data")) {
            let targetBranch = e.push_data.ref
            // 해당 브런치가 존재하지 않을 경우에는 객체를 만들어주고
            if (!branchMap.get(targetBranch)) {
              branchMap.set(targetBranch, gitgraph.branch(targetBranch))
            }
            // 브런치를 그리기 위해 필요한 정보를 가져옵니다.
            let branch = branchMap.get(targetBranch)
            let action = e.push_data.action
            let desc = e.push_data.commit_title
            let authorName = e.author.name
            let hash = e.push_data.commit_to

            // 커밋 또는 병합을 할 차례입니다.
            // 1. 단순 브런치 생성의 경우
            if (action === "created" && !desc) {
              branch.commit(branchMsg)
            } else if (action === "pushed" && desc.indexOf("Merge") !== -1) { // 2. 병합의 경우
              let tokens = desc.split("'")
              let source = branchMap.get(tokens[1]) // 소스브런치를
              let target = branchMap.get(tokens[3]) // 타겟브런치로 머지
              target.merge(source, "🐤" + tokens[1] + " ➕ 🐓" + tokens[3])
            } else if ((action === "created" || action === "pushed") && desc) { // 3. 커밋의 경우
              branch.commit({
                subject: desc.length < 20 ? desc : (desc.substr(0, 20) + "..."),
                author: authorName,
                // 메시지 클릭 이벤트 함수를 추가합니다.
                onMessageClick () {
                  window.location.href = `https://lab.ssafy.com/kimyong/webmobile-final/commit/${hash}`
                }
              })
            }
          }
        })
      }
    },
    getImg (fileName) {
      return require("../../public/img/" + fileName)
    }
  }
}
</script>

<style>
.showOnDesktop.mobile {
  display: none;
}
.showOnMobile {
  display: none;
}
.showOnMobile.mobile {
  display: flex;
}
</style>
