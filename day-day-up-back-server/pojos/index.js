const fs = require('fs');
const path =require('path')

//db对象
let db = {};

fs.readdirSync(path.join(__dirname,'.')).forEach(pojo=>{
    if(pojo !== path.basename(__filename)){
        let {name,model} = require(path.join(__dirname,pojo));
        db[name] = model;
    }
})

module.exports = db;
