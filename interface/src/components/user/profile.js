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
            <Link to = "/user_edit" className = "btn btn-light">Редактировать</Link>
            <div className = "mt-3">
                <p>Имя: {user.name}</p>
                <p>Фамилия: {user.surname}</p>
                <p>Город: {user.city}</p>
                <p>Email: {user.email}</p>
                <p>Возраст: {user.age}</p>
            </div>
            <hr></hr>
        </div>
    )
}


export default Profile