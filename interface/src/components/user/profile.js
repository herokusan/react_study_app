import React, { useState,useCallback,useContext, useEffect } from "react";
import { useAuth } from "../../Hooks/auth.hook";
import { useHttp } from "../../Hooks/http.hook.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";
import { Loader } from "../items/loader";
import { useMessageError, uuseCallbackseMessageSuccess } from "../../Hooks/message.hook";
import ConnectedClasses from "../classes/connected_classes"
import CretedClasses from "../classes/created_classes"


function Profile() {
    return(
        <div className = "container mt-3">
            <button className = "btn btn-light">Редактировать</button>
            <div className = "mt-3">
                <p>Имя:</p>
                <p>Фамилия:</p>
                <p>Город:</p>
                <p>Имя:</p>
            </div>
            <hr></hr>
        </div>
    )
}


export default Profile