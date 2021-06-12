import React, { useState,useCallback,useContext, useEffect } from "react";
import { useAuth } from "../../Hooks/auth.hook";
import { useHttp } from "../../Hooks/http.hook.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";
import { Loader } from "../items/loader";
import { useMessageError, uuseCallbackseMessageSuccess } from "../../Hooks/message.hook";
import ConnectedClasses from "../classes/connected_classes"
import CretedClasses from "../classes/created_classes"
// import { useMessageError, useMessageSuccess } from "../../Hooks/message.hook";


function Profile() {
    const auth = useContext(AuthContext);
    const [user, setUser] = useState([]);
    const { loading, request } = useHttp();
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
    return(
        <div className = "container mt-3">
            <Link to = "/user_edit" className = "btn btn-success">Редактировать</Link>
            <div className = "mt-3">
                <p><b>Имя:</b> {user.name}</p>
                <p><b>Фамилия:</b> {user.surname}</p>
                <p><b>Город:</b> {user.city}</p>
                <p><b>Электронная почта:</b> {user.email}</p>
                <p><b>Возраст:</b> {user.age}</p>
            </div>
            <hr></hr>
        </div>
    )
}


export default Profile