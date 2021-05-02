import React, { useState,useCallback,useContext, useEffect } from "react";
import { useHttp } from "../../Hooks/http.hook.js";
import { Link } from "react-router-dom";
import { Loader } from "../items/loader";
import { useMessageError, uuseCallbackseMessageSuccess } from "../../Hooks/message.hook";
function Create_classes() {
    const [classes, setClasses] = useState([]);
    const { loading, request } = useHttp();

    const classFeched = useCallback(async () => {
        try {
          const feched = await request("/api/classes/myclasses", "GET", null);
          console.log(feched)
          setClasses(feched);
        } catch (e) {}
      }, [request]);
  
    useEffect(() => {
        classFeched();
    }, [classFeched]);
  
    if (loading) {
      return <Loader></Loader>;
    }
    return(
        <div className = "container">
            <div className = "mt-5">
                <h1 className = "text-center">Ваши классы</h1>
                <div className ="mt-2 text-center">
                <Link className = "btn btn-success" to = "/create_classes_editor">
                    Создать новый
                </Link>
                </div>
                <div className="container">
                    {classes.map((classes, index, key) => {
                        return (
                        <div className="container shadow mb-5 p-3 mt-5" key={classes.id}>
                            <div className="mt-1">
                            <div className="card-body">
                                {/* <Link to={`/detail/${job._id}`} className="text-warning"> */}
                                <h5 className="card-title">{classes.class_name}</h5>
                                {/* </Link> */}
                                <p className="card-text">Описание: {classes.users}</p>
                                <p className="card-text">
                                Создатель <b>{classes.user_created}</b>
                                </p>
                                <p className="card-text">
                                {/* Дата размещения: {new Date(job.data).toLocaleDateString()} */}
                                </p>
                            </div>
                            </div>
                        </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}


export default Create_classes