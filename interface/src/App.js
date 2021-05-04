import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { AuthContext } from "./Context/auth.context";
import { useAuth } from "./Hooks/auth.hook";
import { ToastContainer } from "react-toastify";
import  Navbar from "./components/items/navbar.js"
import "react-toastify/dist/ReactToastify.css";

import './App.css';

function App() {
  const { token, user_id, login, logout } = useAuth();
  const isAuthenticated = !!token;
  console.log("TTTTTTTTTTTTTTTTTTTTTTTT")
  console.log(user_id)
  const routes = useRoutes(isAuthenticated);
  return (
    <>
    <AuthContext.Provider
    value={{
      token,
      login,
      logout,
      user_id,
      isAuthenticated
    }}
  >
    <Router>
    <div>
      {isAuthenticated && <Navbar></Navbar>}
      {routes}
    </div>
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
    </Router>
    </AuthContext.Provider>
    </>
  );
}

export default App;
