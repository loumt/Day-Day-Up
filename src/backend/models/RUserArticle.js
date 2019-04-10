const Sequelize = require('sequelize');
const {sequlize} = require('./../middleware/SequlizeConnection');

const modelProp = {
  name: 'RUserArticle',
  tableName: 'UP_R_USER_ARTICLE'
}

let RUserArticle = sequlize.define(modelProp.name, {
  user_id: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'UP_USER',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  article_id: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'UP_ARTICLE',
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  tableName: modelProp.tableName,
  timestamps: false,
  comment: '用户文章关联表'
});

module.exports = RUserArticle