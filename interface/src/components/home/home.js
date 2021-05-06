import React, { useState,useCallback,useContext, useEffect } from "react";
import { useAuth } from "../../Hooks/auth.hook";
import { useHttp } from "../../Hooks/http.hook.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";
import { Loader } from "../items/loader";
import { useMessageError, uuseCallbackseMessageSuccess } from "../../Hooks/message.hook";
function Home() {
    const [classes, setClasses] = useState([]);
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
    }, [classFeched]);
    if (loading) {
      return <Loader></Loader>;
    }
    return(
<div className = "container">
            <div className = "mt-5">
                <h1>ALL CLASSES</h1>
                <div className="container">
                    {classes.map((classes, index, key) => {
                        return (
                        <div className="container shadow mb-5 p-3 mt-5" key={classes.id}>
                            <div className="mt-1">
                            <div className="card-body">
                                {/* <Link to={`/detail/${job._id}`} className="text-warning"> */}
                                <Link to = {`/aboutclass/${classes.id}`}><h5 className="card-title">{classes.class_name}</h5></Link>
                                {/* </Link> */}
                                <p className="card-text">Предмет: {classes.subject}</p>
                                <p className="card-text">
                                Создатель <b>{classes.user_created}</b>
                                </p>
                                <p className="card-text">
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


export default Home