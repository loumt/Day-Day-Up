const {scheduleJob} = require('node-schedule')
const https = require('https')
const logger = require('./../../lib/logger.lib').system()
const ReSouHandler = require('./../handler/ReSouHandler')
const pool = require('./../lib/pool')
const ReSouService = require('./../../service/ReSouService')

const pageAddress = 'https://s.weibo.com/top/summary?cate=realtimehot'
const type = 'ReSou'


module.exports = scheduleJob('0 0 12 * * *', async () => {
  //直接
  // https.get(pageAddress, res => {
  //   let chunks = []
  //   let size = 0;
  //   res.on('data', chunk => {
  //     chunks.push(chunk)
  //     size += chunk.length
  //   })
  //
  //   res.on('end', () => {
  //     let data = Buffer.concat(chunks, size)
  //     let html = data.toString()
  //
  //     ReSouHandler(html)
  //
  //   })
  // })

  //间接
  pool.post(type ,{
    address: pageAddress,
    combine: ReSouHandler,
    handler: ReSouService.bulkCreate.bind(ReSouService)
  })

})
