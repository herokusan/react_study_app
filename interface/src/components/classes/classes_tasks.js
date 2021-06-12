import React, { useState,useCallback, useContext, useEffect } from "react";
import { useHttp } from "../../Hooks/http.hook.js";
import { AuthContext } from "../../Context/auth.context";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Loader } from "../items/loader";
import { useHistory } from "react-router-dom";
import { useMessageError, useMessageSuccess } from "../../Hooks/message.hook";


function ClassesTasks() {
    const history = useHistory();
    const [tasks, setTasks] = useState([]);
    const { loading, error, request, clearError } = useHttp();
    const auth = useContext(AuthContext);
    const messageError = useMessageError();
    const messageSuccess = useMessageSuccess();
    const classId = useParams().id;

    const [form, setForm] = useState({
      title_task: "",
      tasks: ""
    });

    const deleteTask = async () => {
      try{
        console.log({...form} )
        // const deleted = await request("/api/classes/create_task", "POST", { ...form }, {classId:classId, userid:auth.user_id});
      }catch(e){
        console.log(e)
      }
    }

    const ClassesNewsFeched = useCallback(async () => {
        try {
          const feched = await request(`/api/classes/get_task`, "GET", null, {classId:classId});
          console.log("TASKS")
          console.log(feched)
          setTasks(feched);
        } catch (e) {
          console.log(e)
        }
      }, [request, classId]);

      const CreateTasks = async () => {
        try {
          const data = await request("/api/classes/create_task", "POST", { ...form }, {classId:classId, userid:auth.user_id});
          console.log(data)
          history.push(`/abouttask/${data.id}`);
          messageSuccess(data.message);
        } catch (e) {
            console.log(e)
        }
      };
      const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
      };


      useEffect(() => {
        ClassesNewsFeched();
      }, [ClassesNewsFeched]);

      useEffect(() => {
        messageError(error);
        clearError();
      }, [error, messageError, clearError]);
    return(
        <div>
          <div className = "text-center">
          {/* <!-- Button trigger modal --> */}

            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Добавить задание
            </button>

            {/* <!-- Modal --> */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Новое задание</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <small>Название задания</small>
                    <input onChange = {changeHandler} required name = "title_task" class="form-control" type="text" placeholder="Название" aria-label="default input example"/>
                    <small>Описание задания</small>
                      <textarea onChange = {changeHandler} required name = "tasks"  class="form-control" placeholder="Напишите описание сдесь" id="floatingTextarea2"></textarea>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                    <button onClick={CreateTasks} disabled={loading} type="button" class="btn btn-primary" data-bs-dismiss="modal">Сохранить</button>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <div>
              <h3>Задания класса</h3>
              {tasks.map((task, index, key) => {
                if(task.user_id == auth.user_id){
                  return(
                     <Link to = {`/abouttask/${task.id}`}>
                      <div className = "mt-3" key = {task.id}>
                        <div class="list-group m-3">
                          <div class="list-group-item list-group-item-action" aria-current="true">
                            <div className="d-flex w-100 justify-content-between">
                            
                              <h5 className="mb-1">{task.tasks}</h5>
                          <small>{new Date(task.created_at).toLocaleDateString()} <button onClick={deleteTask} className = "btn btn-danger">Х</button> </small>
                        </div>
                        <p className="mb-3">{task.title_task}</p>
                        {/* <p className ="mb-1">Создатель:</p> */}
                        <small></small>
                      </div>
                    </div>
                  </div>
                    </Link>
                  )
                }else{
                  return (
                    <Link to = {`/abouttask/${task.id}`}>
                    <div className = "mt-3" key = {task.id}>
                      <div class="list-group m-3">
                        <div class="list-group-item list-group-item-action" aria-current="true">
                          <div className="d-flex w-100 justify-content-between">
                         <h5 className="mb-1"> {task.tasks}</h5>
                        
                            <small>{new Date(task.created_at).toLocaleDateString()}</small>
                          </div>
                          <p className="mb-3">{task.title_task}</p>
                          {/* <p className ="mb-1">Создатель:</p> */}
                          <small></small>
                        </div>
                      </div>
                    </div>
                    </Link>
                  );
                }
            })}
            </div>
        </div>
    )
}


export default ClassesTasks