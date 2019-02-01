const Sequelize = require('sequelize');
const {sequlize} = require('./../middleware/SequlizeConnection');

const modelProp = {
  name: 'User',
  tableName: 'UP_USER'
}

let User = sequlize.define(modelProp.name, {
  id: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment:'用户名'
  },
  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
    comment:'用户密码'
  },
  nickname: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    comment:'用户昵称'
  },
  realname: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
    comment:'用户真实姓名'
  },
  phone: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
    comment:'用户手机号'
  },
  qq: {
    type: Sequelize.DataTypes.TEXT,
    allowNull:true,
    comment: '用户QQ号'
  },
  email: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
    comment:'用户邮箱'
  },
  birthday:{
    type: Sequelize.DataTypes.DATEONLY,
    allowNull:true,
    comment: '用户生日'
  },
  signature: {
    type: Sequelize.DataTypes.TEXT,
    allowNull: true,
    default: null,
    comment: '个性签名'
  },
  level: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '用户等级'
  },
  rank:{
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '用户积分'
  },
  icon: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
    comment: '用户头像'
  },
  code: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    comment: '用户码,用于各种邀请识别.'
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
  register_ip: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
    comment: '注册IP地址'
  },
  last_login_ip: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
    comment: '最后登录IP地址'
  },
  ctime: {
    type: Sequelize.DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    comment: "创建时间"
  },
  cuid: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: true,
    comment: '创建人'
  }
}, {
  tableName: modelProp.tableName,
  timestamps: false,
  comment: '用户表'
});

module.exports = User