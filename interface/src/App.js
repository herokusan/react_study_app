import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { AuthContext } from "./Context/auth.context";
import { useAuth } from "./Hooks/auth.hook";
import  Navbar from "./components/items/navbar.js"

import './App.css';

function App() {
  const { token, userId, login, logout } = useAuth();
  const isAuthenticated = !!token;

  console.log(token)
  const routes = useRoutes(isAuthenticated);
  return (
    <Router>
    <div className="container">
      {isAuthenticated && <Navbar></Navbar>}
      <div>{routes}</div>
    </div>
    </Router>
  );
}

export default App;
