import logo from './logo.svg';
import Login from './components/login/login'

import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";

import './App.css';

function App() {
  const routes = useRoutes();
  return (
    <Router>
    <div className="App">
      <div>{routes}</div>
    </div>
    </Router>
  );
}

export default App;
