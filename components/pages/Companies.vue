<template>
  <div id="Companies">
    <CompanyCard v-for="(project, index) in projects" :key="index" :project="project" />
  </div>
</template>

<script>
  export default {
    name: "Companies",
    props: {
      projects: {
        required: true,
        type: Array
      }
    },
    components: {
      CompanyCard: () => import('../UI/CompanyCard')
    }
  }
</script>

<style lang='scss'>
  #Companies {

  }
</style>
