import React, { useState, useContext, useEffect } from "react";
import { useHttp } from "../../Hooks/http.hook.js";
import { AuthContext } from "../../Context/auth.context";
import { Link } from "react-router-dom";
import { Loader } from "../items/loader";
import { useMessageError, useMessageSuccess } from "../../Hooks/message.hook";


function Login() {
  const messageError = useMessageError();
  const messageSuccess = useMessageSuccess();
  const auth = useContext(AuthContext);

  const { loading, error, request, clearError } = useHttp();

    const [form, setForm] = useState({
        email: "",
        password: "",
      });

      useEffect(() => {
        messageError(error);
        clearError();
      }, [error, messageError, clearError]);

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
      };
    
      const loginHandelr = async () => {
        try {
          const data = await request("/api/auth/login", "POST", { ...form });
          console.log(data)
          console.log('1123123131')
          auth.login(data.token, data.email, data.id);
          messageSuccess("Привет " + data.name + " 😃 ");
        } catch (e) {
            console.log(e)
            messageError(e);
        }
      };
    if (loading) {
      return (
        <>
          <Loader></Loader>
        </>
      );
    }


  return (
    <div id="main-login-div" className = "container text-center ">
      <h1>Classroom aplication</h1>
      <label>Created by Lytvynskyi T.V.</label>
          <div className="col mt-5 need-hide">
          </div>
          <div className="col p-3 ">
            <div id="login-form" className="container text-dark">
              <div>
                <div className="d-flex justify-content-center">
                </div>
              </div>
              <div className = "shadow-lg p-3 mb-5 bg-white rounded">
                <div className="form-group mt-3">
                  <label>Ваш email</label>
                  <input
                    onChange = {changeHandler}
                    type="email"
                    className="form-control border border-warning"
                    id="email"
                    name="email"
                    aria-describedby="emailHelp"
                    placeholder="Email"
                  >
                  </input>
                </div>
                <div className="form-group">
                  <label>Ваш пароль:</label>
                  <input
                    onChange = {changeHandler}
                    type="password"
                    className="form-control border border-warning"
                    id="password"
                    name="password"
                    placeholder="Пароль"
                  ></input>
                </div>
                <div className="form-check"></div>
                <button onClick = {loginHandelr} className="btn btn-warning" type="submit" value="Вход">Вход</button>
                <hr></hr>
                <label className="mt-2">Нету аккаунта?</label>
                <br/>
                <Link to="/registration">Зарегестрироваться</Link>
                <p>
                </p>
              </div>
            </div>
        </div>
  </div>
  );
}

export default Login;
