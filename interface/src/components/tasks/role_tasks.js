import React, { useState,useCallback, useContext, useEffect } from "react";
import { useHttp } from "../../Hooks/http.hook.js";
import { AuthContext } from "../../Context/auth.context";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Loader } from "../items/loader";
import StudentTasks from "./student_tasks"
import { useHistory } from "react-router-dom";
import UsersTasks from "./users_tasks"
import { useMessageError, useMessageSuccess } from "../../Hooks/message.hook";
import './tasks.css';

function RoleTasks() {
    const history = useHistory();
    const [tasks, setTasks] = useState([]);
    const { loading, error, request, clearError } = useHttp();
    const auth = useContext(AuthContext);
    const messageError = useMessageError();
    const messageSuccess = useMessageSuccess();
    const taskId = useParams().id;

    const [form, setForm] = useState({
      send_file: "",
    });
    var teacher = false
    const TasksFeched = useCallback(async () => {
        try {
          const feched = await request(`/api/classes/get_task_by_id`, "GET", null, {taskId:taskId});
          setTasks(feched);
        } catch (e) {
          console.log(e)
        }
      }, [request, taskId]);

      const SendTasks = async () => {
        try {
          const data = await request("/api/classes/send_task", "POST", { ...form }, {taskId:taskId,userid:auth.user_id});
          console.log(taskId)
          // history.push(`/aboutclass/${taskId}`);
          messageSuccess(data.message);
        } catch (e) {
            console.log(e)
        }
      };
      const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
      };

      useEffect(() => {
        TasksFeched();
      }, [TasksFeched]);

      useEffect(() => {
        messageError(error);
        clearError();
      }, [error, messageError, clearError]);

      if (loading) {
        return <Loader></Loader>;
      }
      if(teacher){
        return(
          <h1>teacher!!!</h1>
        )
      }else{
    return(
        <div>
            {tasks.map((task, index, key) => {
                if(task.user_id === auth.user_id){
                    return(
                        <div className = "contaniner mt-3">
                            <h1>Отправленые задания</h1>
                            <UsersTasks></UsersTasks>
                        </div>
                    )
                }else{
                  return(
                    <StudentTasks></StudentTasks>
                  )
                }
            })}
        </div>
    )
}}


export default RoleTasks