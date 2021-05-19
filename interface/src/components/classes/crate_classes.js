import React, { useState,useCallback,useContext, useEffect } from "react";
import { useHttp } from "../../Hooks/http.hook.js";
import { Link } from "react-router-dom";
import { Loader } from "../items/loader";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";
import { useMessageError, useMessageSuccess } from "../../Hooks/message.hook";


function CreateClasses() {
    const messageError = useMessageError();
    const messageSuccess = useMessageSuccess();
    const auth = useContext(AuthContext);
    const history = useHistory();

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
          const data = await request("/api/classes/create_class", "POST", { ...form }, {user_id:auth.user_id});
          history.push(`/`);
          messageSuccess(data.message);
        } catch (e) {
            console.log(e)
        }
      };

    if (loading) {
      return <Loader></Loader>;
    }
    return(
        <div className = "contaier m-5 text-center">
          <div className = "shadow mb-5 mt-5 p-5">
            <h2>Создание класса</h2>
            <input onChange = {changeHandler} className = "m-3" name = "class_name" type = "text" placeholder ="Имя класса"></input>
            <br></br>
            <input onChange = {changeHandler} className = "m-3" type = "text" name = "subject" placeholder ="Предмет класса"></input>
            <br></br>
            <button className = "mt-3 btn btn-success" onClick={createClassesHandler} disabled={loading} >Создать!</button>
          </div>
        </div>
    )
}


export default CreateClasses