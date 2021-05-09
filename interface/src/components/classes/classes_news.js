import React, { useState,useCallback, useContext, useEffect } from "react";
import { useHttp } from "../../Hooks/http.hook.js";
import { AuthContext } from "../../Context/auth.context";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Loader } from "../items/loader";
import { useMessageError, useMessageSuccess } from "../../Hooks/message.hook";


function ClassesNews() {

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
        <div className = "mt-3 p-2">
         <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Напишите новость..." aria-label="Recipient's username" aria-describedby="basic-addon2"/>
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button">Отправить</button>
            </div>
          </div>
        </div>
    )
}


export default ClassesNews