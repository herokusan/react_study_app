const query = require('../db/db-connection.js');
const UserModel = require('../models/user.model');

const { multipleColumnSet } = require('../utils/common.utils');
class ContentModel {
    tableName = 'classroom_tasks';

    findAllTasks = async (classid) => {
        let sql = `SELECT * FROM ${this.tableName} WHERE class_id = ${classid}`;
        const result = await query(sql)

        return result
    }

    findById = async(tasksid) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE id = ${tasksid}`
        const result = await query(sql);
        console.log(result)
        return result
    }

    findAllTasksWithoutRating = async(taskid) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE tasks is null and response is not null and task_id = ${taskid}`
        const result = await query(sql)
        return result
    }

    sendTask = async(userid,taskid,file_task) => {
        try{
            const class_id = `SELECT class_id FROM ${this.tableName} WHERE id = ${taskid}`
            const result_id = await query(class_id)
            console.log(userid)
            console.log(taskid)
            console.log(file_task)
            const sql = `INSERT INTO ${this.tableName}
            (user_id,response,task_id, class_id) VALUES (?,?,?,?)`;
            const result = await query(sql, [userid,file_task.send_file,taskid,result_id[0].class_id]);
            return result;
        }catch(e){
            console.log(e)
        }
    }

    create = async (classId,create_task_content,userid) => {
        try{
            const sql = `INSERT INTO ${this.tableName}
            (class_id,title_task,tasks,user_id) VALUES (?,?,?,?)`;
            const result = await query(sql, [classId,create_task_content.tasks,create_task_content.title_task,userid]);
            return result;
        }catch(e){
            console.log(e)
            return false
        }
        
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

module.exports = new ContentModel;