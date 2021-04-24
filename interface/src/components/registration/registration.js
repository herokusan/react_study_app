import React from "react";
import { Link } from "react-router-dom";

function Registration() {
    return(
        <div className = "container mt-5 text-center">
            <form onSubmit>
                <div class="mb-3 text-center">
                    <label class="form-label">Email</label>
                    <input name = "email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                    <div class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label class="form-label" name = "password">Пароль</label>
                    <input type="password" class="form-control"></input>
                </div>
                <div class="mb-3">
                    <label class="form-label" name = "name">Имя</label>
                    <input class="form-control"></input>
                </div>
                <div class="mb-3">
                    <label class="form-label" name = "surname">Фамилия</label>
                    <input class="form-control"></input>
                </div>
                <div class="mb-3">
                    <label class="form-label" name = "sex">Пол</label>
                    <input class="form-control"></input>
                </div>
                <div class="mb-3">
                    <label class="form-label" name = "phone">Номер телефона</label>
                    <input class="form-control"></input>
                </div>
                <button type="submit" class="btn btn-primary">Регестрация</button>
                </form>
        </div>
    )
}


export default Registration