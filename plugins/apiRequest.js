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
    try {
      return axios({
        method: 'get',
        url: `https://api.quwi.com/v2/${path}`,
        headers: {
          'Authorization': `Bearer ${cookies}`
        }
      })
    } catch (e) {
      console.log(e)
    }
  },

  put(path, data, cookies) {
    try {
      return axios({
        method: 'put',
        url: `https://api.quwi.com/v2/${path}`,
        data: data,
        headers: {
          'Authorization': `Bearer ${cookies}`
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
}
