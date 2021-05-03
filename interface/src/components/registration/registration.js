import React, { useState, useEffect } from "react";
import { useHttp } from "../../Hooks/http.hook.js";
import { useHistory } from "react-router-dom";
import { useMessageError, useMessageSuccess } from "../../Hooks/message.hook";
import { Link } from "react-router-dom";

function Registration() {
    const messageError = useMessageError();
    const messageSuccess = useMessageSuccess();
    const history = useHistory();

    const [form, setForm] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        sex: "",
        phone:""
      });

      const { loading, error, request, clearError } = useHttp();
      useEffect(() => {
        messageError(error);
        clearError();
      }, [error, messageError, clearError]);

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
      };
    
      const registerHandelr = async () => {
        try {
          const data = await request("/api/auth/reg", "POST", { ...form });
          history.push(`/`);
          messageSuccess(data.message);
        } catch (e) {
            console.log(e)
        }
      };

    return(
        <div className = "container mt-5 text-center shadow-lg p-3 mb-5 bg-white rounded">
            <div className = "mb-5">
                <h3>Регистрационная форма</h3>
            </div>
                <div className="mb-3 text-center">
                    <label className="form-label">Email</label>
                    <input onChange = {changeHandler} placeholder = "Электронная почта" name = "email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                    {/* <div className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                    <label className="form-label">Пароль</label>
                    <input onChange = {changeHandler} placeholder = "Пароль" name = "password" type="password" className="form-control"></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Имя</label>
                    <input onChange = {changeHandler} placeholder = "Имя" name = "name" className="form-control"></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Фамилия</label>
                    <input onChange = {changeHandler} placeholder = "Фамилия" name = "surname" className="form-control"></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Пол</label>
                    <input onChange = {changeHandler} placeholder = "Пол" name = "sex" className="form-control"></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Номер телефона</label>
                    <input onChange = {changeHandler} placeholder = "Номер телефона"  name = "phone" className="form-control"></input>
                </div>
                <button onClick={registerHandelr} disabled={loading} type="submit" className="btn btn-primary">Регестрация</button>
                <br/>
                <hr></hr>
                <Link className ="btn" to ="/login">Логин</Link>
        </div>
    )
}


export default Registration