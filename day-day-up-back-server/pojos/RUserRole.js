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
            model: 'User',
            key: 'id'
        }
    },
    role_id: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'User',
            key: 'id'
        }
    }
}, {
    tableName: modelProp.tableName,
    timestamps: false
});

RUserRole.sync({force: false}).then(() => {})

module.exports = {
    name: modelProp.name,
    model: RUserRole
};