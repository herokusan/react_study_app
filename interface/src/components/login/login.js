import React from "react";
// import LoginStyle from "./login.css"
import { Link } from "react-router-dom";


function Login() {
  return (
    <div id="main-login-div" className = "container">
      <h1>Class room aplication</h1>
          <div className="col mt-5 need-hide">
          </div>
          <div className="col p-3">
            <div id="login-form" className="container text-dark">
              <div>
                <div className="d-flex justify-content-center">
                </div>
              </div>
              <div>
                <form action="/login" method="get">
                <div className="form-group mt-3">
                  <label>Ваш email</label>
                  <input
                    type="email"
                    className="form-control border border-warning"
                    id="email"
                    name="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  >
                  </input>
                </div>
                <div className="form-group">
                  <label>Ваш пароль</label>
                  <input
                    type="password"
                    className="form-control border border-warning"
                    id="password"
                    name="password"
                    placeholder="Password"
                  ></input>
                </div>
                <div className="form-check"></div>
                <button className="btn btn-warning" type="submit" value="Вход">Вход</button>
                <hr></hr>
                <label className="mt-2">Нету аккаунта?</label>
                <br/>
                <Link to="/registration">Зарегестрироваться</Link>
                <p>
                </p>
                </form>
              </div>
            </div>
        </div>
  </div>
  );
}

export default Login;
