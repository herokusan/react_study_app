import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { AuthContext } from "./Context/auth.context";
import { useAuth } from "./Hooks/auth.hook";
import { ToastContainer } from "react-toastify";
import  Navbar from "./components/items/navbar.js"
import "react-toastify/dist/ReactToastify.css";

import './App.css';

function App() {
  const { token, userId, login, logout } = useAuth();
  const isAuthenticated = !!token;

  console.log(token)
  const routes = useRoutes(isAuthenticated);
  return (
    <>
    <AuthContext.Provider
    value={{
      token,
      login,
      logout,
      userId,
      isAuthenticated
    }}
  >
    <Router>
    <div>{routes}</div>
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />

    {isAuthenticated && <Navbar></Navbar>}
    </Router>
    </AuthContext.Provider>
    </>
  );
}

export default App;
