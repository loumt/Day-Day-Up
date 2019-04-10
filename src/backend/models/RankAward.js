const Sequelize = require('sequelize');
const {sequlize,initErrorHandler} = require('./../middleware/SequlizeConnection');

const modelProp = {
  name: 'RankAward',
  tableName: 'UP_RANK_AWARD'
}

let RankAward = sequlize.define(modelProp.name, {
  id: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name:{
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    comment: "物品名"
  },
  pay: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: "需要给予的积分"
  },
  start_time : {
    type: Sequelize.DataTypes.DATE,
    allowNull: true,
    comment: '可兑换开始时间'
  },
  end_time : {
    type: Sequelize.DataTypes.DATE,
    allowNull: true,
    comment: '可兑换结束时间'
  },
  available_days: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
    comment: "物品有效期"
  },
  available_date: {
    type: Sequelize.DataTypes.DATE,
    allowNull: true,
    comment: '物品可用截止日期'
  },
  amount: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: true,
    comment: '可兑换人数'
  },
  limit_level: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: true,
    comment: '可兑换等级限制'
  },
  description: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
    defaultValue: '',
    comment: "描述"
  },
  disabled: {
    type: Sequelize.DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment:'是否禁用'
  },
  destroy: {
    type: Sequelize.DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue: false,
    comment: '是否已删除'
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
  comment: '积分奖励表'
});

module.exports = RankAward