import React, { useState } from "react";
import "../css/Login.css";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [okMsg, setOkMsg] = useState("");
  const expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  const eventName = (e) => {
    setName(e.target.value);
  };

  const eventEmail = (e) => {
    setEmail(e.target.value);
  };
  const eventPass = (e) => {
    setPassword(e.target.value);
  };

  const eventRPass = (e) => {
    setRPassword(e.target.value);
  };

  const eventValidarPass = (e) => {
    if (rpassword !== "" && rpassword !== password) {
      setErrorMsg("Las contraseñas no coinciden");
    } else {
      setErrorMsg("");
    }
  };

  const eventValidarRPass = (e) => {
    if (rpassword === "" || rpassword !== password) {
      setErrorMsg("Las contraseñas no coinciden");
    } else {
      setErrorMsg("");
    }
  };

  const eventValidarEmail = (e) => {
    if (!expr.test(email)) {
      setErrorMsg("El email es invalido");
    } else {
      setErrorMsg("");
    }
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (password !== rpassword) {
      setErrorMsg("Las contraseñas no coinciden, verifique antes de guardar");
    } else if (!expr.test(email)) {
      setErrorMsg("El email es invalido");
    } else {
      const newUser = {
        name: name,
        email: email,
        password: password,
        repeatPassword: rpassword,
      };
      const url = "http://localhost:8088/api/v1/users/register";
      const saveUser = await fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const token = await saveUser.json();
      if (saveUser.status === 201) {
        setOkMsg(
          `Usuario registrado con exito, activa tu cuenta con el codigo de verificación que fue enviado a ${email}`
        );
        setName("");
        setEmail("");
        setPassword("");
        setRPassword("");
        setErrorMsg("");
      } else {
        setErrorMsg("Error al registrar el usuario");
        setErrorMsg(token.error);
        setPassword("");
        setRPassword("");
      }
    }
  };
  return (
    <div id="principal" className="cont_ppal">
      {errorMsg && <span style={{ backgroundColor: "red" }}>{errorMsg}</span>}
      {okMsg && <span style={{ backgroundColor: "pink" }}>{okMsg}</span>}
      <form onSubmit={registerUser}>
        <fieldset className="userInfo">
          <div className="userName">
            <input
              type="text"
              value={name}
              onChange={eventName}
              placeholder="Nombre"
              autoComplete="off"
              name="name"
              id="name"
              required
            />
          </div>
          <div className="userEmail">
            <input
              type="email"
              value={email}
              onChange={eventEmail}
              onBlur={eventValidarEmail}
              placeholder="Email"
              autoComplete="off"
              name="email"
              id="email"
              required
            />
          </div>
          <div className="userPass">
            <input
              type="password"
              value={password}
              onChange={eventPass}
              onKeyUp={eventValidarPass}
              placeholder="Contraseña"
              name="pass"
              id="pass"
              required
            />
          </div>
          <div className="userRPass">
            <input
              type="password"
              value={rpassword}
              onChange={eventRPass}
              onKeyUp={eventValidarRPass}
              placeholder="Repetir contraseña"
              name="rpass"
              id="rpass"
              required
            />
          </div>
        </fieldset>
        <input type="submit" value="Enviar" className="logInButton" />
      </form>
    </div>
  );
};
