const cheerio = require('cheerio')
const {scheduleJob} = require('node-schedule')
const pool = require('./../lib/pool')
const https = require('https')
const logger =require('./../../lib/logger.lib').system()
const JianShuHandler =require('./../handler/JianShuHandler')
const JianShuService = require('./../../service/JianShuService')

const pageAddress = 'https://www.jianshu.com'
const type = 'JianShu'

module.exports = scheduleJob('* * */1 * * *', async () => {
//获取网页
  https.get(pageAddress, res => {
    let chunks = []
    let size = 0;
    res.on('data', chunk => {
      chunks.push(chunk)
      size += chunk.length
    })

    res.on('end', () => {
      let data = Buffer.concat(chunks, size)
      let html = data.toString()
      let $ = cheerio.load(html)

      $('.note-list > li').each(async (index, note) => {
        let title = $(note).find('.title').text();
        let href = $(note).find('.title').attr('href');

        let JianShu = await JianShuService.findByAttribute({href: pageAddress + href})

        if(!JianShu){
          logger.info(`Task : ${title} => ${pageAddress + href}`)

          pool.post(type ,{
            address: pageAddress + href,
            combine: JianShuHandler,
            handler: JianShuService.create.bind(JianShuService)
          })
        }
      })
    })
  })
})

