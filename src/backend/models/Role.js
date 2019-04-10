const Sequelize = require('sequelize');
const {sequlize} = require('./../middleware/SequlizeConnection');

const modelProp = {
  name: 'Role',
  tableName: 'UP_ROLE'
}

let Role = sequlize.define(modelProp.name, {
  id: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    comment: "角色名"
  },
  description: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
    defaultValue: '',
    comment: "描述"
  },
  ctime: {
    type: Sequelize.DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    comment: '创建时间'
  },
  cuid: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: true
  }
}, {
  tableName: modelProp.tableName,
  timestamps: false,
  comment: '角色表'
});

module.exports = Role