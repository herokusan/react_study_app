import React, { useState,useCallback, useContext, useEffect } from "react";
import { useHttp } from "../../Hooks/http.hook.js";
import { AuthContext } from "../../Context/auth.context";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Loader } from "../items/loader";
import { useMessageError, useMessageSuccess } from "../../Hooks/message.hook";


function ClassesUsers() {

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
           <h1>Учасники Класса!!!!!!!!!!!!</h1>
        </div>
    )
}


export default ClassesUsers