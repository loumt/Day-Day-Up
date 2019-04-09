"use strict";

/**
 * Server基类
 */
class BaseService {
    constructor(model) {
        this.model = model
    }

    create(mode) {
        return this.model.create(mode);
    }

    bulkCreate(modes){
        return this.model.bulkCreate(modes)
    }

    findById(id) {
        return this.model.findById(id, {raw: true});
    }

    findByIds(ids) {
        return this.model.findAll({
            where: {
                role_id: ids
            },
            raw: true
        })
    }

    findOneByAttribute(attr) {
        return this.model.findOne({
            where: attr,
            raw: true
        })
    }

    findByAttribute(attr) {
        return this.model.findAll({
            where: attr,
            raw: true
        })
    }

    deleteAll(params){
        return this.model.destroy({
            where: params
        })
    }

    deleteById(id) {
        return this.model.destroy({
            where: {
                id: id,
            }
        })
    }

    /**
     * 批量删除
     * @param ids Array
     */
    deleteByIds(ids) {
        return this.model.destroy({
            where: {
                id: ids,
            }
        })
    }

    updateById(id, mode) {
        return this.model.update(mode, {
            where: {
                id: id
            },
        })
    }


    findAll(offset = 0, limit = null, order, params) {
        let conditions = {
            offset: offset,
            limit: limit,
            order: order,
            raw: true
        };
        if (params) {
            Object.assign(conditions,{where: params});
        }
        return this.model.findAndCountAll(conditions);
    }

    count(options){
        return this.model.count({where: options})
    }

    /**
     * 查询其他数据
     * @param id
     * @param params
     * @returns {*}
     */
    getOthers(id, params) {
        let conditions = {
            where: {
                id: {
                    $ne: id
                }
            },
            raw: true
        }
        if (params) {
            Object.assign(conditions.where, params);
        }
        return this.model.findAll(conditions)
    }

}

module.exports = BaseService;

