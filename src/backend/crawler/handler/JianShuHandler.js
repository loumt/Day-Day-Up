const cheerio = require('cheerio')

module.exports = html => {
  let $ = cheerio.load(html)

  let href = $('meta[property="twitter:url"]').attr('content')

  let title = $('.article').find('.title').text()

  let content = $('.show-content').find('.show-content-free').find('p').text()

  //2019.03.04 19:41
  let ctime = new Date($('.publish-time').text())

  let author = $('.author').find('.name').find('a').text()

  return {title,author,content,href,ctime}
}