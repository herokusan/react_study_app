const query = require('../db/db-connection.js');
const UserModel = require('../models/user.model');

const { multipleColumnSet } = require('../utils/common.utils');
class ClassesModel {
    tableName = 'classroom_classes';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findById = async(params) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE id = ${params.id}`
        const result = await query(sql);
        console.log(result)
        return result[0]
    }
    findUserConnectedClasses = async (params) => {
        const {user_id} = multipleColumnSet(params)
        const sql = `SELECT * FROM ${this.tableName}`
        console.log(sql);
    }
    findByUserCreated = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)
        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;
        const result = await query(sql, [...values]);
        console.log(result[0])
        return result;
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    create = async ({class_name,subject}, user_id) => {
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa")
        console.log(user_id)
        const sql = `INSERT INTO ${this.tableName}
        (class_name,subject,user_created) VALUES (?,?,?)`;

        const result = await query(sql, [class_name,subject,user_id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE user SET ${columnSet} WHERE id = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new ClassesModel;