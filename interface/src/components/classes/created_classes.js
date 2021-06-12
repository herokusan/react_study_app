import React, { useState,useCallback,useContext, useEffect } from "react";
import { useAuth } from "../../Hooks/auth.hook";
import { useHttp } from "../../Hooks/http.hook.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";
import { Loader } from "../items/loader";
import { useMessageError, useMessageSuccess } from "../../Hooks/message.hook";

function CretedClasses() {
    const [classes, setClasses] = useState([]);
    const [сonnectedClasses, setConnectedClasses] = useState([]);
    const { loading, request } = useHttp();
    const auth = useContext(AuthContext);


    const classFeched = useCallback(async () => {
        try {
          const feched = await request("/api/classes/myclasses", "GET", null, {user_id:auth.user_id});
          setClasses(feched);
        } catch (e) {}
      }, [request]);

    useEffect(() => {
        classFeched();
    }, [classFeched ]);

    if (loading) {
      return <Loader></Loader>;
    }

    if(classes.length > 0){
        return(
            <div>
            <div className = "text-center">
                <h2 className = "mt-3 m-2">Ваши классы</h2>
            </div>
            <div className = "row row-cols-auto container">
                {classes.map((classes, index, key) => {
                    return (
                    <div className = "shadow mb-5 mt-5 p-3 m-2" key={classes.id}>
                        <div className = "col">
                            <div className="card-body">
                                <Link to = {`/aboutclass/${classes.id}`}><h5 className="card-title">{classes.class_name}</h5></Link>
                                <p className="card-text">Предмет: {classes.subject}</p>
                                <p className="card-text">
                                <small><button className = "btn btn-danger">Удалить класс</button></small>
                                    {/* Создатель: <b>{classes.name + " " + classes.surname}</b> */}
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
                <label>У вас пока что нету созданных классов</label>
                <br></br>
                <Link to = "/classses" className = "btn btn-success mt-3">Создать свой класс</Link>
            </div>
        )
    }
}


export default CretedClasses