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
        return result
    }
    connectToClass = async(res,code,user_id) => {
        const find_class = await query(`SELECT * FROM ${this.tableName} WHERE access_code = ${code.access_code}`)
        if(find_class.length > 0){
            let add_user = true
            if(!find_class[0].users){
                find_class[0].users = []
                find_class[0].users.push(parseInt(user_id))
            }else{
               await find_class[0].users.map((user) => {
                    if(user == parseInt(user_id)){
                         add_user = false
                    }
                })
            await find_class[0].users.push(parseInt(user_id))
            }
            if(add_user){
                await query(`UPDATE ${this.tableName} SET users = "[${find_class[0].users}]" WHERE id = ${find_class[0].id}`)
            }else{
                return 0
            }
            
        }else{
            return 1
        }
    }

    findUserConnectedClasses = async (params) => {
        const {user_id} = multipleColumnSet(params)
        const sql = `SELECT * FROM ${this.tableName}
        WHERE JSON_CONTAINS(users, "${params.user_id}")`
        const result = await query(sql)
        return result
    }


    findUserConnect = async(classid) => {
        try{
            const sql = `SELECT users FROM ${this.tableName} 
            WHERE ${this.tableName}.id = ${classid}`;
            const result = await query(sql);
            return result
        }catch(e){
            console.log(e)
        }
       
        
    }

    findByUserCreated = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)
        const sql = `SELECT * FROM ${this.tableName} 
        WHERE ${columnSet}`;
        const result = await query(sql, [...values]);
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
        const access_code = Math.floor(Math.random() * 1000)
        const sql = `INSERT INTO ${this.tableName}
        (class_name,subject,user_created, access_code) VALUES (?,?,?,?)`;


        const result = await query(sql, [class_name,subject,user_id, access_code]);
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