import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { useLocalStorage } from "./components/useLocalStorage";
import logo from "./img/logo.png";

export const AuthContext = React.createContext();
const AuthProvider = (props) => {
  const [token, setToken] = useLocalStorage("accessToken", "");

  return (
    <AuthContext.Provider value={[token, setToken]}>
      {props.children}
    </AuthContext.Provider>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <nav>
            <ul className="navigation">
              <div className="logoLink">
                <li>
                  <Link to="/">
                    <img src={logo} alt="Logo" width="140px" className="logo" />
                  </Link>
                </li>
              </div>
              <div className="noLogoLinks">
                <li className="link-1">
                  <Link to="/register">Registro</Link>
                </li>
                <li className="link-2">
                  <Link to="/login">Iniciar sesión</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
              </div>
            </ul>
          </nav>

          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
