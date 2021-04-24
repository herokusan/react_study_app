import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "./components/login/login.js";
import Registration from "./components/registration/registration";

export const useRoutes = () => {
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
};