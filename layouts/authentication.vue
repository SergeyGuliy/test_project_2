<template>
  <div id="authentication">
    <NavBar />
    <Nuxt />
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
  }
</style>
