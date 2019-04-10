const Sequelize = require('sequelize');
const {sequlize} = require('./../middleware/SequlizeConnection');

const modelProp = {
  name: 'Message',
  tableName: 'UP_MESSAGE'
}

let Message = sequlize.define(modelProp.name, {
  id: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: Sequelize.DataTypes.TEXT,
    allowNull: true,
    comment: '内容'
  },
  type: {
    type: Sequelize.DataTypes.TINYINT,
    allowNull: true,
    comment: '消息类型'
  },
  from_user_id: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: true,
    comment: '发送者'
  },
  to_user_id: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: true,
    comment: '接收人'
  },
  ctime: {
    type: Sequelize.DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    comment: '创建时间'
  },
  rtime: {
    type: Sequelize.DataTypes.DATE,
    allowNull: true,
    comment: '阅读时间'
  }
}, {
  tableName: modelProp.tableName,
  timestamps: false,
  comment: '消息表'
});

module.exports = Message