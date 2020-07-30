<template>
  <nav id="NavBar">
    <div class="logo" @click="!!$store.state.userData? $router.push('/') : ''">
      <img src="https://quwi.com/img/quwi-logo.png" alt="logo" class="">
      <div class="hover" />
    </div>
    <client-only>
      <div
        class="buttons"
        v-if="!$store.state.userData"
      >
        <button
          class="buttons-lang"
          @click="toggleLang = !toggleLang"
          v-if="$store.state.app.activeLanguage === 'ru'"
        >
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgwIiB3aWR0aD0iNjQwIiBpZD0iZmxhZy1pY29uLWNzcy1ydSI+CiAgPGcgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2Utd2lkdGg9IjFwdCI+CiAgICA8cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAwaDY0MHY0ODBIMHoiLz4KICAgIDxwYXRoIGZpbGw9IiMwMDM5YTYiIGQ9Ik0wIDE2MC4wMDNoNjQwVjQ4MEgweiIvPgogICAgPHBhdGggZmlsbD0iI2Q1MmIxZSIgZD0iTTAgMzE5Ljk5N2g2NDBWNDgwSDB6Ii8+CiAgPC9nPgo8L3N2Zz4K"
            alt=""
            class="lang"
          >
          Русский
          <button
            class="buttons-lang collapsed"
            :class="toggleLang? 'collapsed-active' : ''"
            @click="$store.commit('app/toggleLang', 'en')"
          >
            <img
              src="https://quwi.com/_nuxt/img/us.da1c4f8.svg"
              alt=""
              class="lang"
            >
            English
          </button>
        </button>

        <button
          class="buttons-lang"
          @click="toggleLang = !toggleLang"
          v-if="$store.state.app.activeLanguage === 'en'"
        >
          <img
            src="https://quwi.com/_nuxt/img/us.da1c4f8.svg"
            alt=""
            class="lang"
          >
          English
          <button
            class="buttons-lang collapsed"
            :class="toggleLang? 'collapsed-active' : ''"
            @click="$store.commit('app/toggleLang', 'ru')"
          >
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgwIiB3aWR0aD0iNjQwIiBpZD0iZmxhZy1pY29uLWNzcy1ydSI+CiAgPGcgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2Utd2lkdGg9IjFwdCI+CiAgICA8cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAwaDY0MHY0ODBIMHoiLz4KICAgIDxwYXRoIGZpbGw9IiMwMDM5YTYiIGQ9Ik0wIDE2MC4wMDNoNjQwVjQ4MEgweiIvPgogICAgPHBhdGggZmlsbD0iI2Q1MmIxZSIgZD0iTTAgMzE5Ljk5N2g2NDBWNDgwSDB6Ii8+CiAgPC9nPgo8L3N2Zz4K"
              alt=""
              class="lang"
            >
            Русский
          </button>
        </button>


        <button
          class="buttons-auth"
          v-if="$route.fullPath === '/login'"
          @click="$router.push('/signup')"
        >
          Регистрация
        </button>
        <button
          class="buttons-auth"
          v-if="$route.fullPath === '/signup'"
          @click="$router.push('/login')"
        >
          Логин
        </button>
      </div>
    </client-only>
    <div
      v-if="!!$store.state.userData"
      class="buttons"
    >
      <button
        v-if="$route.path !== '/'"
        class="buttons-auth"
        @click="$router.back()"
      >
        BACK
      </button>
      <button
        class="buttons-auth"
        @click="$router.push('/')"
      >
        PROJECTS
      </button>
      <button
        class="buttons-auth"
        @click="logOut"
      >
        LOGOUT
      </button>
    </div>
  </nav>
</template>

<script>
  export default {
    name: "NavBar",
    data() {
      return {
        toggleLang: false
      }
    },
    methods: {
      async logOut() {
        await this.$store.dispatch('logOut')
        this.$router.push('/login')
      }
    }
  }
</script>

<style lang='scss'>
  #NavBar {
    width: 100%;
    height: 46px;
    background-color: #fafafa;
    padding: 0 20px;
    border-bottom: 1px solid black;
    display: flex;
    justify-content: space-between;
    .logo{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      width: 40px;
      margin: 3px 0;
      position: relative;
      img{
        position: relative;
        z-index: 2;
        height: 25px;
        width: 25px;
      }
      .hover{
        position: absolute;
        border-radius: 50%;
        height: 1px;
        width: 1px;
        background-color: transparent;
        top: 50%;
        right: 50%;
        transition: all ease 0.5s;
      }
      &:hover > .hover{
        width: 36px;
        height: 36px;
        top: calc(50% - 18px);
        right: calc(50% - 18px);
        background-color: #e0e0e0;
      }
    }
    .buttons{
      display: flex;
      &-lang{
        position: relative;
        padding: 0 15px;
        display: flex;
        align-items: center;
        cursor: pointer;
        border: none;
        background-color: #fafafa;
        outline: none;
        color: #636363;
        &:hover{
          background-color: #ececec;
          color: #c44512;
        }
        .lang{
          width: 15px;
          margin-right: 7px;
        }
      }
      &-auth{
        padding: 0 15px;
        display: flex;
        align-items: center;
        cursor: pointer;
        border: none;
        background-color: #fafafa;
        outline: none;
        color: #636363;
        &:hover{
          background-color: #ececec;
          color: #c44512;
        }
      }

      .collapsed {
        width: 100%;
        position: absolute;
        bottom: -36px;
        left: 0;
        height: 0;
        overflow: hidden;
        border: none;
        border: 0;
      }
      .collapsed-active{
        height: 35px;
        border: 1px solid rgba(0, 0, 0, 0.15);
      }
    }
  }
</style>
