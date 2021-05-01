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
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <Link to="/" className="navbar-brand" href="#">
          Домой
        </Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <Link className="nav-link" to="/vacancy">
                Создать класс
            </Link>
            </li>
            <li class="nav-item">
            <Link className="nav-link" to="/resume">
                Мои классы
              </Link>
            </li>
            <li class="nav-item">
            <Link className="nav-link" to="/profile">
                Профиль <span className="sr-only"></span>
              </Link>
            </li>
          </ul>
          <Link
                to="/"
                id="btn-logout"
                className="ml-3 btn btn-outline-dark text-white"
                href="#"
                onClick={logoutHandler}
              >
                Logout
          </Link>
        </div>
      </div>
    </nav>
    </div>
  );
}
export default Navbar;