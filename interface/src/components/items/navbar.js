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
    /*
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </li>
          </ul>
          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
    */
   /*
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
                Классы
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/vacancy">
                Создать класс
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
   */
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