<template>
  <div id="signup">
    <form class="auth-box">
      <div class="auth-box-header">SING UP</div>
      <input type="text" placeholder="Primary email">
      <input type="text" placeholder="Name">
      <input type="password" placeholder="Password">
      <button @click.prevent="singUp">SING UP</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: "signup",
    data() {
      return {
        login: '',
        name: '',
        password: ''
      }
    },
    layout: 'authentication',
    methods: {
      singUp(){
        console.log('singUp')
      }
    }
  }
</script>

<style lang='scss'>
  #signup {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .auth-box{
      background-color: #f4f4f4;
      width: 430px;
      padding: 30px 50px;
      border: 1px solid #cccccc;
      display: flex;
      flex-direction: column;
      &-header{
        font-weight: 700;
        margin-bottom: 20px;
      }
      input{
        height: 45px;
        border-radius: 5px;
        padding: 0 10px;
        outline: none;
        border: 1px solid #cccccc;
        font-size: 14px;
        margin-bottom: 15px;
      }
      input::placeholder{
        color: #cccccc;
        font-size: 14px;
      }
      input:focus{
        border: 1px solid #395378;
      }
      button{
        margin-top: 10px;
        cursor: pointer;
        width: 33%;
        height: 35px;
        background-color: #395378;
        color: white;
        font-weight: 700;
        outline: none;
        border: 1px solid #395378;
        border-radius: 7px;
      }
    }
  }
</style>
