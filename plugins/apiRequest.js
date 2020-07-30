import axios from "axios";
import Vue from "vue";


export default {
  auth(path, data) {
    return axios({
      method: 'post',
      url: `https://api.quwi.com/v2/${path}`,
      data: data,
    })
  },
  logOut(path) {
    return axios({
      method: 'post',
      url: `https://api.quwi.com/v2/${path}`,
    })
  },
  get(path, cookies) {
    let cook = process.server ? cookies : Vue.$cookies.get('token')
    try {
      return axios({
        method: 'get',
        url: `https://api.quwi.com/v2/${path}`,
        headers: {
          'Authorization': `Bearer ${cook}`
        }
      })
    } catch (e) {
      console.log(e)
    }
  },

  post(path, data) {
    console.log(Vue.$cookies.get('token'))
    console.log(`https://api.quwi.com/v2/${path}`)
    try {
      return axios({
        method: 'post',
        url: `https://api.quwi.com/v2/${path}`,
        data: data,
        headers: {
          'Authorization': `Bearer ${Vue.$cookies.get('token')}`
        }
      })
    } catch (e) {
      console.log(e)
      return true
    }
  }
}
