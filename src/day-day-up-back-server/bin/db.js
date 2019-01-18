const fs = require('fs');
const path = require('path')
const {initErrorHandler} = require('./../middleware/ ')

const TABLE_RESOURCES = path.join(__dirname, '../models')

fs.readdirSync(TABLE_RESOURCES).filter(resource => {
  return resource !== 'index.js'
}).forEach(pojo => {
  // if (pojo !== path.basename(__filename)) {
  //   let model = require(path.join(__dirname, pojo));
  //
  //   model.sync({force: require('./../config/server').initTable}).then(() => {
  //   }).catch(err => {
  //     initErrorHandler(model.name, err)
  //   })
  //
  //   db[model.name] =
  // model;
  // }
  console.log(pojo)
})
 