<template>
  <div id="authentication">
    <NavBar />
    <div class="container">
      <Nuxt />
    </div>
  </div>
</template>

<script>
  export default {
    name: "authentication",
    data() {
      return {}
    },
    components: {
      NavBar: () => import("../components/layout/NavBar")
    },
    mounted() {
      if (!localStorage.getItem('lang')){
        this.$store.commit('app/toggleLang', 'ru')
      } else {
        this.$store.commit('app/toggleLang', localStorage.getItem('lang'))
      }
    }
  }
</script>

<style lang='scss'>
  #authentication {
    height: 100vh;
    width: 100vw;
    background: url("https://quwi.com/img/backgrounds/gray_blur.png");
    .container{
      height: calc(100vh - 46px);
    }
  }
</style>
