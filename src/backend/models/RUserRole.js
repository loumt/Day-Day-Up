const Sequelize = require('sequelize');
const {sequlize} = require('./../middleware/SequlizeConnection');

const modelProp = {
  name: 'RUserRole',
  tableName: 'UP_R_USER_ROLE'
}

let RUserRole = sequlize.define(modelProp.name, {
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
  role_id: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'UP_ROLE',
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  tableName: modelProp.tableName,
  timestamps: false,
  comment: '用户角色关联表'
});

module.exports = RUserRole