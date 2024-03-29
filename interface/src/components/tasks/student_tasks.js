import React, { useState,useCallback, useContext, useEffect } from "react";
import { useHttp } from "../../Hooks/http.hook.js";
import { AuthContext } from "../../Context/auth.context";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Loader } from "../items/loader";
import { useHistory } from "react-router-dom";
import { useMessageError, useMessageSuccess } from "../../Hooks/message.hook";
import './tasks.css';

function StudentTasks() {
    const history = useHistory();
    const [tasks, setTasks] = useState([]);
    const [works, setWorks] = useState([]);
    const { loading, error, request, clearError } = useHttp();
    const auth = useContext(AuthContext);
    const messageError = useMessageError();
    const messageSuccess = useMessageSuccess();
    const taskId = useParams().id;

    const [form, setForm] = useState({
      send_file: "",
    });

    const ClassesNewsFeched = useCallback(async () => {
        try {
          const feched = await request(`/api/classes/get_task_by_id`, "GET", null, {taskId:taskId});
          setTasks(feched);
        } catch (e) {
          console.log(e)
        }
      }, [request, taskId]);

      const UserWorks = useCallback(async () => {
        try {
          const feched = await request(`/api/classes/get_student_work`, "GET", null, {taskId:taskId});
          setWorks(feched);
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
        ClassesNewsFeched();
      }, [ClassesNewsFeched]);

      useEffect(() => {
        messageError(error);
        clearError();
      }, [error, messageError, clearError]);

      if (loading) {
        return <Loader></Loader>;
    }
    return(
        <div>
                <div className="text-center mt-5">
                    <h3>Решение</h3>
                    <div class="form-group mt-3 mb-5">
                        <input onChange = {changeHandler} name = "send_file" type="file" class="form-control-file" id="exampleFormControlFile1"/>
                        <br></br>
                        <button  onClick={SendTasks} disabled={loading} className = "btn btn-success mt-3">Отправить на проверку</button>
                    </div>
            </div>
            </div>
    )
}


export default StudentTasks