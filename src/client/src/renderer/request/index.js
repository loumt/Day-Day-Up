
import axios from 'axios'

let instance = axios.create({
  baseURL: 'http://192.168.20.91:5000',
  timeout: 3000
})

export default {
  login: function(options){
    return instance.post('/api/auth',options)
  },
  register: function(options){
    return instance.post('/api/register',options)
  },
  userInfo: function(options){
    return instance.get(`/api/users/${options.user_id}`)
  }
}