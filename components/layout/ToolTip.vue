<template>
  <div
    id="ToolTip"
    :class="status === 'show' ? 'active' : ''"
    :style="`color: ${textColor}`"
  >
    {{ text }}
  </div>
</template>

<script>
  export default {
    name: "ToolTip",
    data() {
      return {}
    },
    components: {},
    props: {
      text: {
        type: String,
        default: 'EMPTY TOOLTIP MESSAGE !!!'
      },
      textColor: {
        type: String,
        default: 'orange'
      },
      status: {
        type: String,
        default: 'hide'
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
