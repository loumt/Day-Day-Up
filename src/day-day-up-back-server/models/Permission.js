const Sequelize = require('sequelize')
const {sequlize} = require('./../middleware/SequlizeConnection')

const modelProp = {
  name: 'Permission',
  tableName: 'UP_PERMISSION'
}

let Permission = sequlize.define(modelProp.name, {
  id: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  code: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    comment:"权限代码"
  },
  description: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
    defaultValue: '',
    comment:'权限描述'
  }
}, {
  tableName: modelProp.tableName,
  timestamps: false,
  comment: '权限表'
});


module.exports = Permission