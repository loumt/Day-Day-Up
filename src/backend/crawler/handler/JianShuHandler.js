const cheerio = require('cheerio')
const DateUtil = require('./../../utils/DateUtil')

module.exports = html => {
  // console.log(html)
  let $ = cheerio.load(html)
  let href = $('meta[property="og:url"]').attr('content');
  let title = $('meta[property="og:title"]').attr('content');
  let description = $('meta[property="og:description"]').attr('content');
  let ctime = new Date();
  let author = $('._3t3lfz').find(".qzhJKO").text();
    // console.dir({title,author,href,ctime})

  return {title,author,href,ctime,description}
}