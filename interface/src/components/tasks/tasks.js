import React, { useState,useCallback, useContext, useEffect } from "react";
import { useHttp } from "../../Hooks/http.hook.js";
import { AuthContext } from "../../Context/auth.context";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Loader } from "../items/loader";
import { useHistory } from "react-router-dom";
import { useMessageError, useMessageSuccess } from "../../Hooks/message.hook";
import './tasks.css';

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
            <div className="row g-0 mt-3">
            <div className="col-sm-6 col-md-8">
            {tasks.map((task, index, key) => {
                    return (
                        <div className = "text-center">
                            <Link to = {`/aboutclass/${task.class_id}`} className = "btn btn-primary mt-3 mb-2 p-3">Вернуться в класс</Link>
                            <hr></hr>
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Задание: <b>{task.title_task}</b>
                                    </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <strong>Описание задания: </strong>{task.tasks}
                                    </div>
                                    </div>
                                </div>
                        </div>
                        </div>
                      );
            })}
            </div>
            <div className ="col-6 col-md-4">
                <div className="vl text-center">
                    <h3>Прикрепить задание</h3>
                    <hr></hr>
                    <div class="form-group">
                        <input type="file" class="form-control-file" id="exampleFormControlFile1"/>
                        <br></br>
                        <button className = "btn btn-success mt-3">Отправить на проверку</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}


export default Tasks