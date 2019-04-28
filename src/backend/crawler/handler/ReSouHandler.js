
const cheerio = require('cheerio')
const ReSouService = require('./../../service/ReSouService')
const DateUtil = require('./../../utils/DateUtil')

module.exports = html => {
  let $ = cheerio.load(html)

  let table = $('#pl_top_realtimehot').find('tbody').find('.td-02')

  let rs = []
  table.each((index, note)=>{
    let href = $(note).find('a').attr('href');

    if(!href || href.indexOf('Refer=top') === -1 ){
      return;
    }
    let title = $(note).find('a').text()
    let hotlevel = $(note).find('span').text()

    let model = {title,hotlevel: parseInt(hotlevel) ,href: 'https://s.weibo.com' + href, ctime: DateUtil.now()}

    rs.push(model)
  })

  console.log(rs.length)

  return rs
}