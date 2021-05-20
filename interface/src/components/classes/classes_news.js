import React, { useState,useCallback, useContext, useEffect } from "react";
import { useHttp } from "../../Hooks/http.hook.js";
import { AuthContext } from "../../Context/auth.context";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Loader } from "../items/loader";
import { useHistory } from "react-router-dom";
import { useMessageError, useMessageSuccess } from "../../Hooks/message.hook";


function ClassesNews() {
    const history = useHistory();
    const [news, setNews] = useState([]);
    const { loading, error, request, clearError } = useHttp();
    const auth = useContext(AuthContext);
    const messageError = useMessageError();
    const messageSuccess = useMessageSuccess();
    const classId = useParams().id;

    const [form, setForm] = useState({
      content: "",
    });
    const ClassesNewsFeched = useCallback(async () => {
        try {
          const feched = await request(`/api/classes/all_news_classes`, "GET", null, {classId:classId, userid:auth.user_id});
          console.log(feched)
          setNews(feched);
        } catch (e) {
          console.log(e)
        }
      }, [request, classId]);

      const CreateContent = async () => {
        try {
          const data = await request("/api/classes/create_content", "POST", { ...form }, {classId:classId, userid:auth.user_id});
          console.log(classId)
          history.push(`/aboutclass/${classId}`);
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
        <div className = "mt-3 p-2">
         <div class="input-group mb-3">
          <input type="text" onChange = {changeHandler} class="form-control" name = "content" placeholder="Напишите новость..." aria-label="Recipient's username" aria-describedby="basic-addon2"/>
            <div class="input-group-append">
              <button onClick={CreateContent} disabled={loading} class="btn btn-outline-secondary" type="button">Отправить</button>
            </div>
          </div>
          {news.map((n, index, key) => {
            if(n.user_id == auth.user_id){
              return (
                <div className = "mt-3" key = {n.id}>
                  <div class="list-group">
                    <a href="#" class="list-group-item list-group-item-action" aria-current="true">
                      <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">{n.content}</h5>
                        <small>{new Date(n.created_at).toLocaleDateString()} <button className = "btn btn-danger">Х</button> </small>
                      </div>
                      <p class="mb-1">Создатель: {n.name + " " + n.surname}</p>
                      <small></small>
                    </a>
                  </div>
                </div>)
            }else{

            }
                return (
                <div className = "mt-3" key = {n.id}>
                  <div class="list-group">
                    <a href="#" class="list-group-item list-group-item-action" aria-current="true">
                      <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">{n.content}</h5>
                        <small>{new Date(n.created_at).toLocaleDateString()} </small>
                      </div>
                      <p class="mb-1">Создатель: {n.name + " " + n.surname}</p>
                      <small></small>
                    </a>
                  </div>
                </div>
                );
            })}
        </div>
    )
}


export default ClassesNews