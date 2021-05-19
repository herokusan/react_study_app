import React, { useState,useCallback, useContext, useEffect } from "react";
import { useHttp } from "../../Hooks/http.hook.js";
import { AuthContext } from "../../Context/auth.context";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Loader } from "../items/loader";
import { useHistory } from "react-router-dom";
import { useMessageError, useMessageSuccess } from "../../Hooks/message.hook";


function Tasks() {
    const history = useHistory();
    const [tasks, setTasks] = useState([]);
    const { loading, error, request, clearError } = useHttp();
    const auth = useContext(AuthContext);
    const messageError = useMessageError();
    const messageSuccess = useMessageSuccess();
    const taskId = useParams().id;

    const [form, setForm] = useState({
      title_task: "",
      tasks: ""
    });
    const ClassesNewsFeched = useCallback(async () => {
        try {
          const feched = await request(`/api/classes/get_task_by_id`, "GET", null, {taskId:taskId});
          console.log("TASKS11111111111111")
          console.log(feched)
          setTasks(feched);
        } catch (e) {
          console.log(e)
        }
      }, [request, taskId]);

    //   const CreateTasks = async () => {
    //     try {
    //       const data = await request("/api/classes/create_task", "POST", { ...form }, {classId:classId, userid:auth.user_id});
    //       console.log(classId)
    //       history.push(`/aboutclass/${classId}`);
    //       messageSuccess(data.message);
    //     } catch (e) {
    //         console.log(e)
    //     }
    //   };
    //   const changeHandler = (event) => {
    //     setForm({ ...form, [event.target.name]: event.target.value });
    //   };

      useEffect(() => {
        ClassesNewsFeched();
      }, [ClassesNewsFeched]);

      useEffect(() => {
        messageError(error);
        clearError();
      }, [error, messageError, clearError]);
    return(
        <div>
            <div>
            </div>

            <div>
            {tasks.map((task, index, key) => {
                    return (
                        <div className = "text-center">
                            <Link to = {`/aboutclass/${task.class_id}`} className = "btn">Вернуться в класс</Link>
                            <h1>{task.title_task}</h1>
                        </div>
                      );
            })}
            </div>
           
        </div>
    )
}


export default Tasks