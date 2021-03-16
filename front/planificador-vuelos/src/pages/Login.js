import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";
import "../css/Login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useContext(AuthContext);

  const [errorMsg, setErrorMsg] = useState("");
  const [okMsg, setOkMsg] = useState("");

  const eventEmail = (e) => {
    setErrorMsg("");
    setEmail(e.target.value);
  };
  const eventPass = (e) => {
    setPassword(e.target.value);
  };

  const loginUser = async (e) => {
    e.preventDefault();

    const User = {
      email: email,
      password: password,
    };

    const saveUser = await fetch("http://localhost:8088/api/v1/users/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(User),
    });
    const token = await saveUser.json();
    if (saveUser.status === 200) {
      setOkMsg("Bienvenido!!");
      setEmail("");
      setPassword("");
      setErrorMsg("");
      setToken(token.accessToken);
    } else {
      setErrorMsg(`Error: ${token.error}`);
      setEmail("");
      setPassword("");
    }
  };

  const redirect = token ? (
    <Redirect to="/" />
  ) : (
    <div id="principal" className="cont_ppal">
      {errorMsg && <span style={{ backgroundColor: "red" }}>{errorMsg}</span>}
      {okMsg && <span style={{ backgroundColor: "pink" }}>{okMsg}</span>}
      <form onSubmit={loginUser}>
        <fieldset className="userInfo">
          <legend>Login</legend>
          <div className="userEmail">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              value={email}
              onChange={eventEmail}
              name="email"
              id="email"
              required
            />
          </div>
          <div className="userPass">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              value={password}
              onChange={eventPass}
              name="pass"
              id="pass"
              required
            />
          </div>
          <a href="" className="recPass">
            Recuperar contraseña
          </a>
        </fieldset>
        <input type="submit" value="Enviar" className="submitButton" />
      </form>
    </div>
  );

  return redirect;
};
