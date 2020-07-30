<template>
  <div id="company_id">
    <div class="card">
      <div class="name">Name</div>
      <div class="input">
        <input
          type="text"
          placeholder="Email"
          v-model="newProjectName"
        >
      </div>
      <button
        @click.prevent="logIn"
        :disabled="this.newProjectName === this.project.name"
      >
        <span v-if="!loading">OK</span>
        <Spiner v-else/>
      </button>

    </div>
  </div>
</template>

<script>
  import apiRequest from "../../plugins/apiRequest";

  export default {
    name: "company_id",
    components: {
      Spiner: () => import("../../components/UI/Spiner"),
    },
    async asyncData ({ store, error, $cookies, redirect, route }) {
      console.log(route.params.id)
      try {
        let res = await apiRequest.get(`projects-manage/${route.params.id}`, $cookies.get('token'))
        if (res.status === 200) {
          return {
            project : res.data.project,
            newProjectName: res.data.project.name,
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
    data(){
      return {
        loading: false,
      }
    },
    methods: {
      async logIn(){
        if (this.newProjectName === this.project.name) return
        if (this.loading) return

        this.loading = true
        try {
          // Request to get auth token
          let res = await apiRequest.put(`projects-manage/update?id=${this.$route.params.id}`, {
            name: this.newProjectName,
          },
            this.$cookies.get('token')
          )
          if (res.status === 200){
            // If status 200 sets response data to this.project
            this.project = {...res.data.project}
            this.$store.commit('app/setError', {
              message: 'Вы успешно сменили имя проэкта!'
            })
          } else {
            // I dont know can income other data with status 200
            // If can code will be here
          }
        } catch (e) {
          if (e.response.status === 417) {
            // Get error from response
            this.$store.commit('app/setError', {
              message: Object.values(Object.values(e.response.data)[0])[0]
            })
          } else if (e.response.status === 404) {
            // Show error page with error data
            this.$store.commit('app/setError', {
              message: e.response.data.message
            })
          } else {
            // Possible unknown error
            this.$store.commit('app/setError', {
              message: 'Unknown Error'
            })
          }

        }
        this.loading = false

      }
    }

  }
</script>

<style lang='scss'>
  #company_id {
    width: 80%;
    max-width: 1000px;
    margin: 0 auto;
    .card{
      background-color: #ffffff;
      padding: 20px;
      border-radius: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    .name{
      margin-right: 30px;
    }
    .input{
      min-width: 200px;
      margin-right: 10px;
      &-error{
        margin-left: 10px;
        font-size: 12px;
        line-height: 12px;
        color: red;
      }
      input{
        width: 100%;
        height: 45px;
        border-radius: 5px;
        padding: 0 10px;
        outline: none;
        border: 2px solid #cccccc;
        font-size: 14px;
      }
      input::placeholder{
        color: #cccccc;
        font-size: 14px;
      }
      input:focus{
        border: 2px solid #395378;
      }
    }
    button{
      cursor: pointer;
      background-color: #395378;
      color: white;
      font-weight: 700;
      outline: none;
      border: 1px solid #395378;
      border-radius: 7px;
      position: relative;
      padding: 5px 10px;
      height: 40px;
      min-width: 50px;
    }
    button:disabled{
      background-color: #636363;
    }
  }
</style>
