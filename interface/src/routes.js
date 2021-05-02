import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "./components/login/login.js";
import Registration from "./components/registration/registration";
import Home from "./components/home/home"
import Create_classes from "./components/classes/create_classes"

export const useRoutes = (isAuthenticated) => {
  if(isAuthenticated){
    return(
    <Switch>
      <Route path = "/" exact>
        <Home></Home>
      </Route>
      <Route path = "/create_classses">
        <Create_classes></Create_classes>
      </Route>
      <Redirect to = "/"></Redirect>
    </Switch>
    )}
  else{
  return (
    <Switch>
      <Route path="/" exact>
        <Login></Login>
      </Route>
      <Route path="/registration" exact>
        <Registration></Registration>
      </Route>
      <Redirect to="/"></Redirect>
    </Switch>
  );
}};