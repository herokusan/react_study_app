import React, { useState,useCallback,useContext, useEffect } from "react";
import { useHttp } from "../../Hooks/http.hook.js";
import { Link } from "react-router-dom";
import { Loader } from "../items/loader";
import { useMessageError, useMessageSuccess } from "../../Hooks/message.hook";


function CreateClasses() {
    const messageError = useMessageError();
    const messageSuccess = useMessageSuccess();
    

    const [form, setForm] = useState({
        class_name: "",
        subject:""
      });

      const { loading, error, request, clearError } = useHttp();
      useEffect(() => {
        messageError(error);
        clearError();
      }, [error, messageError, clearError]);

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
      };
    
      const createClassesHandler = async () => {
        try {
          const data = await request("/api/classes/create_class", "POST", { ...form });
          messageSuccess(data.message);
        } catch (e) {
            console.log(e)
        }
      };

    if (loading) {
      return <Loader></Loader>;
    }
    return(
        <div className = "contaier">
            <input onChange = {changeHandler} name = "class_name" placeholder ="Имя класса"></input>
            <input onChange = {changeHandler} name = "subject" placeholder ="Предмет класса"></input>
            <button onClick={createClassesHandler} disabled={loading} >Создать!</button>
        </div>
    )
}


export default CreateClasses