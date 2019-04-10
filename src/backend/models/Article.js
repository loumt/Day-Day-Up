const Sequelize = require('sequelize');
const {sequlize} = require('./../middleware/SequlizeConnection');

const modelProp = {
  name: 'Article',
  tableName: 'UP_ARTICLE'
}

let Article = sequlize.define(modelProp.name, {
  id: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.DataTypes.TEXT('tiny')  ,
    allowNull: false,
    comment: "标题"
  },
  sub_title: {
    type: Sequelize.DataTypes.TEXT('tiny'),
    allowNull: false,
    comment: "子标题"
  },
  content: {
    type: Sequelize.DataTypes.TEXT,
    allowNull: true,
    comment: '内容'
  },
  type: {
    type: Sequelize.DataTypes.TINYINT,
    allowNull: true
  },
  description: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
    defaultValue: '',
    comment: "描述"
  },
  comments: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0',
    comment: "评论"
  },
  reward: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0',
    comment: "获赞数"
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
  comment: '文章表'
});

module.exports = Article