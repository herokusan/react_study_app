import { createContext } from "react";

function noop() {}

export const AuthContext = createContext({
  token: null,
  user_id: null,
  login: noop,
  logout: noop,
  userRoles:null
});