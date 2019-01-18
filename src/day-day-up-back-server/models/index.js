const fs = require('fs');
const path = require('path')
const {initErrorHandler} = require('./../middleware/SequlizeConnection')

//db对象
let db = {};

fs.readdirSync(path.join(__dirname)).forEach(pojo => {
  if (pojo !== path.basename(__filename)) {
    let model = require(path.join(__dirname, pojo));

    model.sync({force: require('./../config/server').initTable}).then(() => {
    }).catch(err => {
      initErrorHandler(model.name, err)
    })

    db[model.name] = model;
  }
})

module.exports = db;
