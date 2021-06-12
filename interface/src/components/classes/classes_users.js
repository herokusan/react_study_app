import React, { useState,useCallback, useContext, useEffect } from "react";
import { useHttp } from "../../Hooks/http.hook.js";
import { AuthContext } from "../../Context/auth.context";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Loader } from "../items/loader";
import { useMessageError, useMessageSuccess } from "../../Hooks/message.hook";


function ClassesUsers() {

    const [users, setUsers] = useState([]);
    const { loading, request } = useHttp();
    const auth = useContext(AuthContext);
    const messageError = useMessageError();
    const messageSuccess = useMessageSuccess();
    const classId = useParams().id;
    console.log(classId)

    const UsesrsFeched = useCallback(async () => {
      try{
        const fech = await request("/api/classes/users", "GET", null, {classid:classId});
        console.log(fech)
        setUsers(fech)
      }catch(e){
          console.log(e)
      }
    },[request])
      useEffect(() => {
        UsesrsFeched();
      }, [UsesrsFeched]);
  
    if (loading) {
      return <Loader></Loader>;
    }
    return(
        <div>

        </div>
    )
}


export default ClassesUsers