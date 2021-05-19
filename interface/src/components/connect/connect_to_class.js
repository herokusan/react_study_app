import React, { useState,useCallback,useContext, useEffect } from "react";
import { useAuth } from "../../Hooks/auth.hook";
import { useHttp } from "../../Hooks/http.hook.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";
import { Loader } from "../items/loader";
import { useHistory } from "react-router-dom";
import { useMessageError, useMessageSuccess } from "../../Hooks/message.hook";

function ConnectedClasses() {
    const messageError = useMessageError();
    const messageSuccess = useMessageSuccess();
    const auth = useContext(AuthContext);
    const history = useHistory();

    const [form, setForm] = useState({
        access_code: "",
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
          const data = await request("/api/classes/connect_to_class", "POST", { ...form }, {user_id:auth.user_id});
          history.push(`/`);
          console.log(data)
          messageSuccess(data.message);
        } catch (e) {
            console.log(e)
        }
      };


    if (loading) {
      return <Loader></Loader>;
    }
    return(
            <div className = "m-3 text-center">
                <h2 className = "mb-4">Подключение к классу</h2>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Идентификатор класса</span>
                    </div>
                        <input onChange = {changeHandler} type="text" name = "access_code" class="form-control" placeholder="Идентификатор" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                <button onClick={createClassesHandler} disabled={loading} className = "btn btn-success">Подключится</button>
            </div>
    )
}


export default ConnectedClasses