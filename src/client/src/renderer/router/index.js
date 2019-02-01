import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      name: 'mainWindow',
      redirect: '/login',
      component: ()=> import('@/components/MainWindow.vue'),
      children: [
        {
          path: '/login',
          name:'Login',
          component: ()=> import('@/components/Login.vue')
        },
        {
          path: '/register',
          name: 'Register',
          component: ()=> import('@/components/Register.vue')
        },
        {
          path: '/personal',
          name: 'Personal',
          component: ()=> import('@/components/Personal.vue')
        },
      ]
    }
  ]
})
