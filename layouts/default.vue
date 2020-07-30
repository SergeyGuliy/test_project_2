<template>
  <div id="default">
    <ToolTip />
    <NavBar />
    <div class="container">
      <Nuxt />
    </div>
  </div>
</template>

<script>
  export default {
    name: "default",
    middleware: 'isNotLoggedIn',

    components: {
      NavBar: () => import("../components/layout/NavBar"),
      ToolTip: () => import("../components/layout/ToolTip"),
    }
  }
</script>

<style lang="scss">
  @import "assets/normalize";
  #default{
    height: 100vh;
    width: 100vw;
    background-color: #f4f4f4;
    .container{
      height: calc(100vh - 46px);
      padding-top: 20px;
    }
  }
</style>
