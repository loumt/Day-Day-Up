const {scheduleJob} = require('node-schedule')
const pool = require('./lib/pool')
const https = require('https')
const logger =require('./../lib/logger.lib').system()

module.exports = scheduleJob('*/4 * * * * *', async () =>  {
  let tasks = pool.get().filter(task=>{return task})

  if(!tasks.length){
    return;
  }

  tasks.map(task =>{
    https.get(task.address, res => {
      let chunks = []
      let size = 0
      res.on('data', chunk => {
        chunks.push(chunk)
        size += chunk.length
      })

      res.on('end', () => {
        let data = Buffer.concat(chunks, size)
        let html = data.toString()
        const model = task.combine(html)
        task.handler(model)
      })
    })
  })
})