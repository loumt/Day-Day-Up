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
        allowNull:false
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull:false
    },
    realname: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
        defaultValue:''
    },
    phone: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
        defaultValue:''
    }
}, {
    tableName: modelProp.tableName,
    timestamps: false
});
User.sync({force: false}).then(() => {})

module.exports = {
    name: modelProp.name,
    model:User
};