export default {
  state: {
    transition: 'default',
    backGroundImg: 'bg.gif',
    userInfo: {
      icon: '',
      nickname: '',
      signature: ''
    },
    states:  {
      none: {
        appClass: '',
        transitionName: 'none',
        mode: '',
        routerClass: ''
      },
      default: {
        appClass: 'app-default',
        transitionName: 'default',
        mode: 'in-out',
        routerClass: 'content'
      },
      show: {
        appClass: 'app-default',
        transitionName: 'show',
        mode: 'in-out',
        routerClass: 'content'
      },
      flipx: {
        appClass: 'app-default',
        transitionName: 'flipx',
        mode: 'out-in',
        routerClass: ''
      },
      flip: {
        appClass: 'app-default',
        transitionName: 'flip',
        mode: 'out-in',
        routerClass: ''
      },
      slipRight: {
        appClass: 'app-default',
        transitionName: 'slipright',
        mode: '',
        routerClass: 'content'
      },
      slipLeft: {
        appClass: 'app-default',
        transitionName: 'slipleft',
        mode: '',
        routerClass: 'content'
      },
      slipUp: {
        appClass: 'app-default',
        transitionName: 'slipup',
        mode: '',
        routerClass: 'content'
      },
      slipDown: {
        appClass: 'app-default',
        transitionName: 'slipdown',
        mode: '',
        routerClass: 'content'
      }
    }
  },
  getters: {
    transitionGroup: state => {
      const trans = require('@/assets/transform/transform.js')
      return trans[state.transition]
    },
    backGroundParent: state => {
      return {
        'background': 'url("static/background/' + state.backGroundImg + '") center center / cover no-repeat fixed'
      }
    },
    userInfo: state => {
      let user_info =  {
        icon: state.userInfo.icon ? '../../static/imgs/' + state.userInfo.icon : '../../static/imgs/default.jpg',
        nickname: state.userInfo.nickname ? state.userInfo.nickname : '未登录',
        signature: state.userInfo.signature
      }
      return user_info
    }
  },
  mutations: {
    CHANGE_TRANSITION(state, type) {
      state.transition = type
    },
    CHANGE_BACKGROUND_IMG (state, type) {
      state.backGroundImg = type
    },
    COMMIT_USER_USER_INFO (state, userInfo) {
      state.userInfo.icon = userInfo.icon
      state.userInfo.nickname = userInfo.nickname
      state.userInfo.signature = userInfo.signature
    },
    LOGOUT(state){
      state.userInfo.icon = ''
      state.userInfo.nickname = ''
      state.userInfo.signature = ''
    }
  },
  actions: {
    changeTransition({commit}, type) {
      commit('CHANGE_TRANSITION', type)
    },
    changeBackgroundImg ({commit}, type) {
      commit('CHANGE_BACKGROUND_IMG', type)
    },
    changeUserInfo ({commit}, userInfo) {
      commit('COMMIT_USER_USER_INFO',userInfo)
    },
    logout({commit}){
      commit('LOGOUT')
    }
  }
}