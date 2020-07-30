<template>
  <div
    id="ToolTip"
    :class="errorStatus ? 'active' : ''"
  >
    {{ errorMessage }}
  </div>
</template>

<script>
  export default {
    name: "ToolTip",
    computed: {
      errorStatus() {
        return this.$store.state.app.errorStatus
      },
      errorType() {
        return this.$store.state.app.errorType
      },
      errorMessage() {
        return this.$store.state.app.errorMessage
      },
    },
    watch: {
      errorStatus(val){
        if (val) {
          setTimeout(() => {
            this.$store.commit('app/closeModal')
          }, 3000)
        }
      }
    }
  }
</script>

<style lang='scss'>
  #ToolTip {
    cursor: pointer;
    position: fixed;
    top: 55px;
    right: 55px;
    padding: 0px;
    background-color: white;
    font-weight: 600;
    letter-spacing: 1px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    height: 0px;
    overflow: hidden;
    opacity: 0;
    transition: all ease 0.3s;
    &.active{
      opacity: 1;
      height: 35px;
      border: 1px solid #47494e;
      padding: 0 8px;
    }
  }
</style>
