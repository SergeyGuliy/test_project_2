import axios from "axios";

const request = (callback) => {
  return new Promise((resolve, reject) => {
    callback
      .then(data => resolve(data))
      .catch(e => {
        reject(e)
      });
  })
}

export default class apiRequest {
  static get(path) {
    return axios({
      method: 'get',
      url: `https://api.quwi.com/v2/${path}`,
    })
  }

  static post(path, data) {
    return axios({
      method: 'post',
      url: `https://api.quwi.com/v2/${path}`,
      data: data,
    })
  }
}
