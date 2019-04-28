const BaseService = require('./BaseService')
const db = require('./../models')


class ReSouService extends BaseService {
  constructor() {
    super(db['ReSou'])
  }
}


module.exports = new ReSouService()

new ReSouService().create(
  { title: '大学食堂早餐鸡蛋1毛1个',
    hotlevel: 79737,
    href: 'https://s.weibo.com/weibo?q=%23%E5%A4%A7%E5%AD%A6%E9%A3%9F%E5%A0%82%E6%97%A9%E9%A4%90%E9%B8%A1%E8%9B%8B1%E6%AF%9B1%E4%B8%AA%23&Refer=top',
    ctime: new Date()}
)