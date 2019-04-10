const Sequelize = require('sequelize');
const {sequlize} = require('./../middleware/SequlizeConnection');

const modelProp = {
  name: 'PraiseRecord',
  tableName: 'UP_PRAISE_RECORD'
}

let PraiseRecord = sequlize.define(modelProp.name, {
  id: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: false
  },
  article_id: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: false
  },
  article_user_id: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: false
  },
  ctime: {
    type: Sequelize.DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    comment: '创建时间'
  }
}, {
  tableName: modelProp.tableName,
  timestamps: false,
  comment: '点赞记录表'
});

module.exports = PraiseRecord