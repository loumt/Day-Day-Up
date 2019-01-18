


module.exports = {
  '/captcha': {
    get: 'auth.captcha'
  },
  '/api': {
    post: 'auth.auth'
  },
  '/':{
    get: 'auth.main'
  }
}