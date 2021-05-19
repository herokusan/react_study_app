import React, { useState,useCallback, useContext, useEffect } from "react";
import { useHttp } from "../../Hooks/http.hook.js";
import { AuthContext } from "../../Context/auth.context";
import { Link } from "react-router-dom";
import { Loader } from "../items/loader";
import { useMessageError, useMessageSuccess } from "../../Hooks/message.hook";


function Classes() {
    const [classes, setClasses] = useState([]);
    const { loading, request } = useHttp();
    const auth = useContext(AuthContext);
    const messageError = useMessageError();
    const messageSuccess = useMessageSuccess();

    // const classFeched = useCallback(async () => {
    //     try {
    //       const feched = await request("/api/classes/create_class", "GET", null);
    //       console.log(feched);
    //       setClasses(feched);
    //     } catch (e) {}
    //   }, [request]);
    // const classFeched = useCallback(async () => {
    //     try {
    //       const feched = await request("/api/classes/myclasses", "GET", null);
    //       console.log(feched)
    //       setClasses(feched);
    //     } catch (e) {}
    //   }, [request]);
    // useEffect(() => {
    //     classFeched();
    // }, [classFeched]);
  
    if (loading) {
      return <Loader></Loader>;
    }
    return(
        // <AuthContext.Consumer>
        <div className = "container">
            <div className = "mt-5">
                <h1 className = "text-center">Ваши классы</h1>
                <div className ="mt-2 text-center">
                <Link className = "btn btn-success" to = "/create_classes">
                    Создать новый
                </Link>
                </div>
                <div className="container">
                </div>
            </div>
        </div>
        // </AuthContext.Consumer>
    )
}


export default Classes