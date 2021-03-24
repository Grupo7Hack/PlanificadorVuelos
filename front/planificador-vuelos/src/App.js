import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Profile } from "./pages/Profile";
import { useLocalStorage } from "./components/useLocalStorage";
import Footer from "./components/footer";

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
  const [isLoggedIn, setIsLoggedIn] = useState("");
  const [origin, setOrigin] = useState({});
  const [destination, setDestination] = useState({});
  const [profileImage] = useLocalStorage("imgProfile");

  useEffect(() => {
    const interval = setInterval(() => {
      const tokencito = window.localStorage.getItem("accessToken")
        ? JSON.parse(window.localStorage.getItem("accessToken"))
        : false;
      setIsLoggedIn(tokencito);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div>
          <nav>
            <ul>
              <div>
                <li>
                  <Link to="/">
                    Inicio
                    {/* <img src={logo} alt="Logo" width="140px" className="logo" /> */}
                  </Link>
                </li>
              </div>
              {isLoggedIn && (
                <div>
                  <li>
                    <Link to="/profile">Perfil</Link>
                  </li>
                  <li>
                    <Link to="/logout">Cerrar Sesión</Link>
                  </li>{" "}
                </div>
              )}
              {!isLoggedIn && (
                <div className="noLogoLinks">
                  <li className="link-1">
                    <Link to="/register">Registro</Link>
                  </li>
                  <li className="link-2">
                    <Link to="/login">Iniciar sesión</Link>
                  </li>
                </div>
              )}
              {profileImage && isLoggedIn && (
                <li className="avatarImageLi">
                  <Link to="/profile">
                    <div>
                      <img
                        src={profileImage}
                        alt="imagen"
                        className="avatarImage"
                      ></img>
                    </div>
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          <Switch>
            <Route exact path="/">
              <Homepage
                origen={[origin, setOrigin]}
                destino={[destination, setDestination]}
              />
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
            <Route path="/logout">
              <Logout />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
