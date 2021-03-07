import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { Register } from "./pages/Register";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul className="navigation">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          {/* <Route path="/login">
                <Login />
              </Route> */}
          <Route path="/register">
            <Register />
          </Route>
          {/* <Route path="/profile">
                <Profile />
              </Route> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
