export default {
  state: {
    login: {
      loginCount: 0,
      loginErrorCount: 0,
    },
    loginState: true
  },
  getters: {
    getLoginCount : state => {return state.login.loginCount},
    getLoginErrorCount : state => {return state.login.loginErrorCount}
  },
  action: {

  }
}
