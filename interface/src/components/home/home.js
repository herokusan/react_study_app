import React, { useState,useCallback,useContext, useEffect } from "react";
import { useAuth } from "../../Hooks/auth.hook";
import { useHttp } from "../../Hooks/http.hook.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";
import { Loader } from "../items/loader";
import { useMessageError, uuseCallbackseMessageSuccess } from "../../Hooks/message.hook";
import ConnectedClasses from "../classes/connected_classes"
import CretedClasses from "../classes/created_classes"


function Home() {
    return(
        <div>
            <ConnectedClasses></ConnectedClasses>
            <hr></hr>
            <CretedClasses></CretedClasses>
        </div>
    )
}


export default Home