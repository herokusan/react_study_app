import React, { useState, useEffect } from "react";
import { useHttp } from "../../Hooks/http.hook.js";
import { Link } from "react-router-dom";

function Registration() {

    const { loading, error, request, clearError } = useHttp();

    const [form, setForm] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        sex: "",
        phone:""
      });

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
      };
    
      const registerHandelr = async () => {
        try {
          const data = await request("/api/auth/reg", "POST", { ...form });
          console.log(data)
        } catch (e) {
            console.log(e)
        }
      };

    return(
        <div className = "container mt-5 text-center">
                <div className="mb-3 text-center">
                    <label className="form-label">Email</label>
                    <input onChange = {changeHandler} name = "email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                    <div className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Пароль</label>
                    <input onChange = {changeHandler} name = "password" type="password" className="form-control"></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Имя</label>
                    <input onChange = {changeHandler} name = "name" className="form-control"></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Фамилия</label>
                    <input onChange = {changeHandler} name = "surname" className="form-control"></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Пол</label>
                    <input onChange = {changeHandler} name = "sex" className="form-control"></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Номер телефона</label>
                    <input   name = "phone" className="form-control"></input>
                </div>
                <button onClick={registerHandelr} type="submit" className="btn btn-primary">Регестрация</button>
                <br/>
                <Link to ="/login">Логин</Link>
        </div>
    )
}


export default Registration