const Sequelize = require('sequelize');
const {sequlize} = require('./../middleware/SequlizeConnection');

const modelProp = {
  name: 'RankRecord',
  tableName: 'UP_RANK_RECORD'
}

let RankRecord = sequlize.define(modelProp.name, {
  id: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: false,
    references : { model: 'UP_USER', key: 'id' },
    comment: '兑换人'
  },
  rank_award_id: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: false,
    references : { model: 'UP_RANK_AWARD', key: 'id' },
    comment: '兑换物品'
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
    comment: '兑换时间'
  }
}, {
  tableName: modelProp.tableName,
  timestamps: false,
  comment: '积分记录表'
});

module.exports = RankRecord