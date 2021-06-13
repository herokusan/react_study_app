import React, { useState,useCallback,useContext, useEffect } from "react";
import { useAuth } from "../../Hooks/auth.hook";
import { useHttp } from "../../Hooks/http.hook.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";
import { Loader } from "../items/loader";
import { useHistory } from "react-router-dom";
import { useMessageError, useMessageSuccess } from "../../Hooks/message.hook";
import ConnectedClasses from "../classes/connected_classes"
import CretedClasses from "../classes/created_classes"



function ProfileEditor() {
    const auth = useContext(AuthContext);
    const [user, setUser] = useState([]);
    const messageError = useMessageError();
    const messageSuccess = useMessageSuccess();
    const { loading, error, request, clearError } = useHttp();
    const history = useHistory();
    const [form, setForm] = useState({
        name: "",
        surname:"",
        city:"",
        age:"",
        email:""

      });

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
      };
    
      const editUser = async () => {
        try {
          const data = await request("/api/auth/edit_profile", "POST", { ...form }, {user_id:auth.user_id});
          history.push(`/profile`);
          messageSuccess(data.message);
        } catch (e) {
            console.log(e)
        }
      };



    const userFech =useCallback(async() => {
        try {
          const fech = await request("/api/auth/user", "GET", null, {userId:auth.user_id});
          console.log(fech)
          setUser(fech)
        } catch (e) {
            console.log(e)
        }
      },[request]);

      useEffect(() => {
        userFech();
    }, [userFech]);
    useEffect(() => {
        messageError(error);
        clearError();
      }, [error, messageError, clearError]);
    return(
        <div className = "container mt-3">
            <div className = "mt-3 text-center">
                <label>Имя</label><input 
                type ="text" 
                // value = {user.name}
                onChange = {changeHandler}
                className = "form-control" 
                placeholder = "Имя"
                name = "name"></input>
                <br></br>
                <label>Фамилия</label><input
                onChange = {changeHandler}
                type = "text"
                value = {user.surname}
                className = "form-control"
                placeholder = "Фамилия"
                name = "surname"></input>
                <br></br>
                <label>Город</label> <input
                onChange = {changeHandler}
                value = {user.city}
                readonly = {false}
                className = "form-control"
                placeholder = "Город"
                name = "city"></input>
                <br></br>
                <label>Возраст</label><input
                onChange = {changeHandler}
                value = {user.age}
                className = "form-control"
                placeholder = "Возраст"
                name = "age"></input>
                <br></br>
                <label >Email</label><input
                onChange = {changeHandler}
                value = {user.email}
                className = "form-control"
                placeholder = "Email"
                name = "email"></input>
                <button onClick={editUser} disabled={loading} className  = "btn btn-success mt-3">Сохранить!</button>
            </div>
            <hr></hr>
        </div>
    )
}


export default ProfileEditor