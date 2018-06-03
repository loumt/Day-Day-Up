import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Role from '@/components/Role'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/role',
      name: 'Role',
      component: Role
    }
  ]
})
