import React, { useState,useCallback, useContext, useEffect } from "react";
import { useHttp } from "../../Hooks/http.hook.js";
import { AuthContext } from "../../Context/auth.context";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Loader } from "../items/loader";
import { useHistory } from "react-router-dom";
import { useMessageError, useMessageSuccess } from "../../Hooks/message.hook";

function Users(user_id) {
    const history = useHistory();
    const [user, setUser] = useState([]);
    const { loading, error, request, clearError } = useHttp();
    const messageError = useMessageError();
    const messageSuccess = useMessageSuccess();
    const RatingFeched = useCallback(async () => {
        try {
          const feched = await request(`/api/auth/user`, "GET", null, {userid:user_id.userid});
          console.log(feched)
          setUser(feched);
        } catch (e) {
          console.log(e)
        }
      }, [request, user_id]);

      useEffect(() => {
        RatingFeched();
      }, [RatingFeched]);

      useEffect(() => {
        messageError(error);
        clearError();
      }, [error, messageError, clearError]);

      if (loading) {
        return <Loader></Loader>;
      }
return(
       <b>{user.name} {user.surname}</b>
)   }


export default Users