const Sequelize = require('sequelize');
const {sequlize} = require('./../middleware/SequlizeConnection');

const modelProp = {
    name: 'ReSou',
    tableName: 'UP_RESOU'
}

let ReSou = sequlize.define(modelProp.name, {
    id: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    ranking: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
        comment: '排名'
    },
    title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
        comment: '关键词'
    },
    href: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
        comment: 'href'
    },
    hotlevel: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
        comment: '热度'
    },
    ctime: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: '记录时间'
    }
}, {
    tableName: modelProp.tableName,
    timestamps: false,
    comment: '热搜表'
});

module.exports = ReSou