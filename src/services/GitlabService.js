import Api from "@/services/Api"
const BASE_URL = "https://lab.ssafy.com/api/v4"

export default {
  getEvents (page) {
    return Api(BASE_URL).get(
      `/projects/7553/events?sort=asc&per_page=100&page=${page}`
    )
  },
  getMerges (page) {
    return Api(BASE_URL).get(
      `/projects/7553/merge_requests?sort=asc&per_page=100&page=${page}`
    )
  },
  getMembers () {
    return Api(BASE_URL).get("/projects/7553/members")
  }
}
