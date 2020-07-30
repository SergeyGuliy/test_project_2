<template>
  <div id="index">
    <Companies :projects="projects" />
  </div>
</template>

<script>
import apiRequest from "../plugins/apiRequest";

export default {
  name: "index",
  layout: 'default',
  components: {
    Companies: () => import("../components/pages/Companies")
  },
  async asyncData ({ store, error, $cookies, redirect}) {
    try {
      let res = await apiRequest.get('projects-manage/index', $cookies.get('token'))
      if (res.status === 200) {
        return {
          projects : res.data.projects
        }
      } else {
        // Some other logic witch can come with status 200, but i may be dont know about it.
      }
    } catch (e) {
      if (e.response.status === 401) {
        // Log out user if auth error
        store.dispatch('logOut')
        redirect('/login')
      } else if (e.response.status === 404) {
        // Show error page with error data
        error({ message: e.response.message, status: e.response.status })
      } else {
        // Possible unknown error
        error({ message: 'Unknown error' })
      }
    }
  },
}
</script>

<style lang="scss">
#index{
  width: 80%;
  max-width: 1000px;
  margin: 0 auto;
}
</style>
