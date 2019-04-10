import axios from 'axios'
import {ipcRenderer} from 'electron'

let interceptors = {
  responseHandler: response => {
    return response.data;
  },
  errorHandler: error => {
    if (error && error.response && error.response.data && error.response.data.code) {
      ipcRenderer.send('showErrorModel', error.response.data.message)
      console.log(error.response.data.message)
    } else {
      ipcRenderer.send('showErrorModel', 'Server Error!')
      console.dir(error)
    }
  }
}


let instance = axios.create({
  baseURL: 'http://192.168.20.116:5000',
  timeout: 3000
})

instance.interceptors.response.use(interceptors.responseHandler, interceptors.errorHandler);

export default {
  login: function (options) {
    return instance.post('/api/auth', options)
  },
  register: function (options) {
    return instance.post('/api/register', options)
  },
  userInfo: function (options) {
    return instance.get(`/api/users/${options.user_id}`)
  },
  main: function () {
    return instance.get(`/api/main`)
  }
}