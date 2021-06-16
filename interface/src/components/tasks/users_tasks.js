import React, { useState,useCallback, useContext, useEffect } from "react";
import { useHttp } from "../../Hooks/http.hook.js";
import { AuthContext } from "../../Context/auth.context";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Loader } from "../items/loader";
import StudentTasks from "./student_tasks"
import { useHistory } from "react-router-dom";
import UsersTasks from "./users_tasks"
import Users from "../user/users"
import { useMessageError, useMessageSuccess } from "../../Hooks/message.hook";

function RoleTasks() {
    const history = useHistory();
    const [ratings, setRating] = useState([]);
    const { loading, error, request, clearError } = useHttp();
    const auth = useContext(AuthContext);
    const messageError = useMessageError();
    const messageSuccess = useMessageSuccess();
    const taskId = useParams().id;

    const [form, setForm] = useState({
      send_rating: "",
    });
    const RatingFeched = useCallback(async () => {
        try {
          const feched = await request(`/api/classes/get_all_tasks`, "GET", null, {taskId:taskId});
          console.log("13123123123123123123")
          console.log(feched)
          setRating(feched);
        } catch (e) {
          console.log(e)
        }
      }, [request, taskId]);

      const SendRating = async () => {
        try {
          const data = await request("/api/classes/send_rating", "POST", { ...form }, {taskId:taskId,userid:auth.user_id});
          messageSuccess(data.message);
        } catch (e) {
            console.log(e)
        }
      };
      const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
      };

      useEffect(() => {
        RatingFeched();
      }, [RatingFeched]);

      useEffect(() => {
        messageError(error);
        clearError();
      }, [error, messageError, clearError]);

      if (loading) {
        return <Loader></Loader>;
      }
return(
        <div className = "container">
             <table class="table table-hover">
             <thead>
                          <tr>
                            <th scope="col">№</th>
                            <th scope="col">Имя студента</th>
                            <th scope="col">Ответ</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Подтверждение</th>
                         </tr>
            </thead>
            {ratings.map((rating, index, key) => {
                if(rating || rating.length > 0){
                    return(
                        <tbody>
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td><Users userid = {rating.user_id}></Users></td>
                            <td></td>
                            <td><input></input></td>
                            <td><button>Вернуть</button></td>
                          </tr>
                        </tbody>
                    )
                }else{
                    return(
                        <div>
                            <h3>Пока что никто не прислал задания</h3>
                        </div>
                    )
                }
                
            })}
            </table>
        </div>
    )
}


export default RoleTasks