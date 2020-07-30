<template>
  <div id="login">
    <ToolTip :status="toolTipStatus" :text="toolTipMessage"/>
    <form class="auth-box">
      <div class="auth-box-header">LOGIN</div>
      <div class="input">
        <input
          type="text"
          placeholder="Email"
          :class="getEmailStyle"
          v-model="email"
        >
        <div class="input-error" v-if="!$v.email.required">Обязательно к заполнению.</div>
        <div class="input-error" v-else-if="!$v.email.email">Введите коректный Email.</div>
        <div v-else style="height: 12px"></div>
      </div>
      <div class="input">
        <input
          type="password"
          placeholder="Password"
          :class="getPasswordStyle"
          v-model="password"
        >
        <div class="input-error" v-if="!$v.password.required">Обязательно к заполнению.</div>
        <div class="input-error" v-else-if="!$v.password.minLength">Пародь должен иметь 8 знаков и более.</div>
        <div class="input-error" v-else-if="!$v.password.maxLength">Пароль не может быть длинее 12 знаков.</div>
<!--        <div class="input-error" v-else-if="!$v.password.numbersAndLetters">Пароль должен содержать латинсикие буквы и цифры.</div>-->
        <div v-else style="height: 12px"></div>
      </div>
      <button
        @click.prevent="logIn"
        :disabled="this.$v.email.$invalid || this.$v.password.$invalid"
      >
        <span v-if="!loading">LOGIN</span>
        <Spiner v-else/>
      </button>
    </form>
  </div>
</template>

<script>
  import {
    email,
    required,
    minLength,
    maxLength,
    helpers
  } from "vuelidate/lib/validators";

  import apiRequest from "../plugins/apiRequest";
  export default {
    name: "login",
    layout: 'authentication',
    data() {
      return {
        email: 'vitaliibondtest@gmail.com',
        password: 'vitaliibondtest',
        toolTipStatus: 'hide',
        toolTipMessage: 'asdsadsda',
        loading: false,
      }
    },

    components: {
      ToolTip: () => import("../components/layout/ToolTip"),
      Spiner: () => import("../components/UI/Spiner")
    },
    computed: {
      getEmailStyle() {
        if (this.email) {
          return this.$v.email.$invalid ? 'invalid' : 'valid'
        } else {
          return ''
        }
      },
      getPasswordStyle() {
        if (this.password) {
          return this.$v.password.$invalid ? 'invalid' : 'valid'
        } else {
          return ''
        }
      }
    },
    validations: {
      email: { email, required },
      password: {
        minLength: minLength(8),
        maxLength: maxLength(16),
        required,
        // numbersAndLetters: helpers.regex('alpha', /^(?=.*\d)(?=.*[a-zA-Z]).{1,20}$/)
      }
    },

    methods: {
      async logIn(){
        if ((this.$v.email.$invalid || this.$v.password.$invalid)) return
        if (this.loading) return

        this.loading = true
        try {
          // Request to get auth token
          let res = await apiRequest.auth('auth/login', {
            email: this.email,
            password: this.password
          })
          // If status 200 sets data to store and set up token to cookies
          if (res.status === 200){
            this.$cookies.set('token', res.data.token)
            this.$store.commit('setUserData', res.data.app_init)
            this.$router.push('/')
          } else {
            // I dont know can income other data with status 200
            // If can code will be here
          }
        } catch (e) {
          if (e.response.status === 417) {
            // Get error from response
            this.toolTipMessage = Object.values(Object.values(e.response.data)[0])[0]
            this.toolTipStatus = 'show'
            setTimeout(() => {
              this.toolTipStatus = 'hide'
            }, 3000)
          } else {
            console.error(e)
          }
        }
        this.loading = false
        // try {
        //   let res = await apiRequest.get('companies')
        //   console.warn(res)
        // } catch (e) {
        //   console.dir(e)
        // }
      }
    }
  }
</script>

<style lang='scss'>
  #login {
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
      .input{
        width: 100%;
        margin-bottom: 5px;
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
          margin-bottom: 5px;
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
        position: relative;
      }
      button:disabled{
        background-color: #636363;
      }
      .invalid{
        border: 2px solid red !important;
      }
      .valid {
        border: 2px solid green !important;
      }
    }
  }
</style>
