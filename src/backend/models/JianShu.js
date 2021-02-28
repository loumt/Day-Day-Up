const Sequelize = require('sequelize');
const {sequlize} = require('./../middleware/SequlizeConnection');

const modelProp = {
  name: 'JianShu',
  tableName: 'UP_JIANSHU'
}

let JianShu = sequlize.define(modelProp.name, {
  id: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
    comment: '标题'
  },
    author: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
        comment: '作者'
    },
    description: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
        comment: '描述'
    },
  href: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
    comment: 'href'
  },
  ctime: {
    type: Sequelize.DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    comment: '文章创建时间'
  }
}, {
  tableName: modelProp.tableName,
  timestamps: false,
  comment: '简书文章表'
});

module.exports = JianShu