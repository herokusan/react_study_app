import React, { useState,useCallback, useContext, useEffect } from "react";
import { useHttp } from "../../Hooks/http.hook.js";
import { AuthContext } from "../../Context/auth.context";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Loader } from "../items/loader";
import { useMessageError, useMessageSuccess } from "../../Hooks/message.hook";
import ClassNews from "./classes_news"
import ClassTasks from "./classes_tasks"
import ClassUsers from "./classes_users"


function AboutClass() {

    const [classes, setClasses] = useState([]);
    const { loading, request } = useHttp();
    const auth = useContext(AuthContext);
    const messageError = useMessageError();
    const messageSuccess = useMessageSuccess();
    const classId = useParams().id;
    console.log(classId)

    const ClassesFeched = useCallback(async () => {
        try {
          const feched = await request(`/api/classes/about_classes/${classId}`, "GET", null);
          setClasses(feched);
        } catch (e) {}
      }, [request, classId]);

      useEffect(() => {
        ClassesFeched();
      }, [ClassesFeched]);
  
    if (loading) {
      return <Loader></Loader>;
    }
    return(
        <div>
            <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Новости</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Задания</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Учасники</button>
            </li>
            </ul>
            <div>
            <h1 className = "mt-5 mb-5 text-center">Класс {classes.class_name}</h1>
            <label className ="text-center">Код доступа класса: {classes.access_code}</label>
            </div>
            <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <ClassNews></ClassNews>
            </div>
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <ClassTasks></ClassTasks>
            </div>
            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                <ClassUsers></ClassUsers>
            </div>
            </div>
        </div>
    )
}


export default AboutClass