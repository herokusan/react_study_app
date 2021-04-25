import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";

function Navbar() {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-warning shadow-lg p-3 mb-5">
        <Link to="/" className="navbar-brand" href="#">
          Домой
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Профиль <span className="sr-only"></span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/resume">
                Создать вакансию
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/vacancy">
                Вакансии
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Отклики
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav mr-5">
            <li className="nav-item active">
              <Link
                to="/"
                id="btn-logout"
                className="ml-3 btn btn-outline-dark text-white"
                href="#"
                onClick={logoutHandler}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;