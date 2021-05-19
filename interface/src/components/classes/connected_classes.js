import React, { useState,useCallback,useContext, useEffect } from "react";
import { useAuth } from "../../Hooks/auth.hook";
import { useHttp } from "../../Hooks/http.hook.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";
import { Loader } from "../items/loader";
import { useMessageError, uuseCallbackseMessageSuccess } from "../../Hooks/message.hook";

function ConnectedClasses() {
    const [classes, setClasses] = useState([]);
    const [сonnectedClasses, setConnectedClasses] = useState([]);
    const { loading, request } = useHttp();
    const auth = useContext(AuthContext);

    const classConnectedFeched = useCallback(async() => {
        try{
            const fech = await request("/api/classes/connected_classes", "GET", null, {user_id:auth.user_id});
            console.log(fech)
            setConnectedClasses(fech)
        }catch(e){
            console.log(e)
        }
    },[request])

    useEffect(() => {
        classConnectedFeched();
    }, [classConnectedFeched]);
    if (loading) {
      return <Loader></Loader>;
    }
    if(сonnectedClasses.length > 0){
        return(
        <div>
        <div className = "text-center">
            <h2 className = "mt-3 m-2">Подключенные классы</h2>
        </div>
        <div className = "row row-cols-auto container">
            {сonnectedClasses.map((сonnectedС, index, key) => {
                return (
                <div className = "shadow mb-5 mt-5 p-3 m-2" key = {сonnectedС.id}>
                    <div className = "col">
                        <div className="card-body">
                            <Link to = {`/aboutclass/${сonnectedС.id}`}><h5 className="card-title">{сonnectedС.class_name}</h5></Link>
                            <p className="card-text">Предмет: {сonnectedС.subject}</p>
                            <p className="card-text">
                                Создатель <b>{сonnectedС.user_created}</b>
                            </p>
                        </div>
                    </div>
                </div>
                );
            })}
        </div>
        </div>
        )
    }else{
        return(
            <div className = "m-3 text-center p-2">
                <label>Вы не подключены ни к одному классу</label>
                <br></br>
                <Link to = "/connect_to_class" className = "btn btn-success mt-3">Подключится</Link>
            </div>
        )
    }
}


export default ConnectedClasses