const Sequelize = require('sequelize');
const {sequlize} = require('./../middleware/SequlizeConnection');

const modelProp = {
    name: 'Role',
    tableName: 'UP_ROLE'
}

let Role = sequlize.define(modelProp.name, {
    id: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    role: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
        defaultValue:''
    }
}, {
    tableName: modelProp.tableName,
    timestamps: false
});

Role.sync({force: false}).then(() => {
})

module.exports = {
    name: modelProp.name,
    model: Role
};