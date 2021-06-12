import React, { useState,useCallback, useContext, useEffect } from "react";
import { useHttp } from "../../Hooks/http.hook.js";
import { AuthContext } from "../../Context/auth.context";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Loader } from "../items/loader";
import { useMessageError, useMessageSuccess } from "../../Hooks/message.hook";


function ClassOptions() {

    const [classes, setClasses] = useState([]);
    const { loading, request } = useHttp();
    const auth = useContext(AuthContext);
    const messageError = useMessageError();
    const messageSuccess = useMessageSuccess();
    const classId = useParams().id;
    console.log(classId)


    const DeleteClass = async () => {
        try {
         const deleted = prompt("Вы собераетесь удалить класс, для подтверждения действия напишите УДАЛИТЬ");
         if(deleted === "УДАЛИТЬ"){
            const data = await request("/api/classes/delete_class", "POST",{classId:classId});
            messageSuccess('Класс успешно удален!');
         }else{
            messageError('Класс не был удален!');
         }
         console.log(deleted)
        //   const data = await request("/api/classes/create_task", "POST", { ...form }, {classId:classId, userid:auth.user_id});
        //   console.log(data)
        } catch (e) {
            console.log(e)
        }
      };
      const ChangeClass = async() => {
          try{

          }catch(e){
            console.log(e)
          }
      }
  
    if (loading) {
      return <Loader></Loader>;
    }
    return(
        <div>
            <div className = "text-center container">
            <h3>Базовые настройки</h3>
                <input class="form-control form-control-lg mt-4" type="text" placeholder="Изменение названия класса"></input>
                <input class="form-control form-control-lg mt-3" type="text" placeholder="Изменение предмета класса"></input>
                <input class="form-control form-control-lg mt-3" type="text" placeholder="Изменение кода доступа класса"></input>
                {/* <input class="form-control form-control-lg mt-3" type="text" placeholder="Изменение названия класса"></input> */}
                <button className = "btn btn-success mt-3">Сохранить изменения</button>
                <hr></hr>
            </div>
            <div className = "border text-center">
                <h3 className = "mt-3">Опасные настройки</h3>
                <small><button className = "btn btn-danger mb-3 " onClick = {DeleteClass}>Удалить класс</button></small>
                <br></br>
                <small><button className = "btn btn-danger mb-3 " onClick = {ChangeClass}>Ограничить доступ к классу</button></small>
            </div>
        </div>
    )
}


export default ClassOptions