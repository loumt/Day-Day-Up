const BaseService =require('./BaseService')
const db = require('./../models')

class MessageService extends BaseService{
  constructor(){
    super(db['Message'])
  }
}

module.exports = new MessageService()
//
// let msgService =  new MessageService()
//
//
// async function test(){
//  let msgs =  await msgService.findAll(0,10,null, {type: 1})
//   console.log(msgs)
// }
//
// test()