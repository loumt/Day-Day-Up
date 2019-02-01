


module.exports = {
  '/':{
    get: 'auth.main'
  },
  '/api': {
    '/captcha': {
      get: 'auth.captcha'
    },
    '/auth':{
      post: 'auth.auth',
      '/out': {
        delete: 'auth.logout'
      }
    },
    '/register':{
      post: 'user.create'
    },
    '/articles':{
      '/:articleId': {
        get: 'article.one',
        delete: 'article.delete',
        put: 'article.update'
      },
      get: 'article.list',
      post: 'article.create'
    },
    '/users':{
      '/:userId': {
        get: 'user.one',
        delete: 'user.delete',
        put: 'user.update'
      },
      get: 'user.list',
      post: 'user.create'
    },
    '/roles':{
      '/:roleId': {
        get: 'role.one',
        delete: 'role.delete',
        put: 'role.update'
      },
      get: 'role.list',
      post: 'role.create'
    },
    '/permission':{
      '/:permissionId': {
        get: 'permission.one',
        delete: 'permission.delete',
        put: 'permission.update'
      },
      get: 'permission.list',
      post: 'permission.create'
    },
    '/rankrecord':{
      '/:rankrecordId': {
        get: 'rankrecord.one',
      },
      get: 'rankrecord.list'
    }
  }
}