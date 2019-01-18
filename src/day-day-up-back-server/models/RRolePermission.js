const Sequelize = require('sequelize');
const {sequlize} = require('./../middleware/SequlizeConnection');

const modelProp = {
  name: 'RRolePermission',
  tableName: 'UP_R_ROLE_PERMISSION'
}

let RRolePermission = sequlize.define(modelProp.name, {
  role_id: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'UP_ROLE',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  permission_id: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'UP_PERMISSION',
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  tableName: modelProp.tableName,
  timestamps: false,
  comment: '角色权限关联表'
});

module.exports = RRolePermission